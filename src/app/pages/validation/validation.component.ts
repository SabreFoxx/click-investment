import { map, pluck } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, Inject, OnInit } from '@angular/core';
import { UIAdjustmentService } from 'src/services/ui-adjustment.service';
import { Observable } from 'rxjs';
import { Deposit } from 'src/models/deposit';
import Swal from 'sweetalert2';
import { DatePipe } from '@angular/common';
import { AuthStorageService } from 'src/services/auth-storage.service';
import { SimpleHttpService } from 'src/services/simple-http.service';

@Component({
  selector: 'app-validation',
  templateUrl: './validation.component.html',
  styleUrls: ['./validation.component.scss']
})
export class ValidationComponent implements OnInit {
  depositsForValidation: Observable<Deposit[]>;
  // storageWalletAddr of Deposit will be renamed to walletAddr
  viewData: Observable<any>;

  alertMixin = Swal.mixin({
    icon: 'question',
    iconColor: '#0cc078',
    heightAuto: false,
    showCancelButton: true,
    cancelButtonAriaLabel: 'Abort',
    focusCancel: true,
    buttonsStyling: false,
    customClass: {
      confirmButton: 'button is-rounded is-link mgn',
      cancelButton: 'button is-rounded mgn'
    }
  });

  constructor(private route: ActivatedRoute, private ui: UIAdjustmentService,
    private router: Router, private datePipe: DatePipe, private http: SimpleHttpService,
    private authStore: AuthStorageService, @Inject('ADMIN_VERIFY_DEPOSIT_URL') private acceptPayment: string,
    @Inject('ADMIN_HIDE_DEPOSIT_URL_PREFIX') private hidePayment: string) {
    ui.setBreadcrumbs([{ url: '/app/validations', title: 'Validations' }]);
  }

  ngOnInit(): void {
    this.depositsForValidation = this.route.data.pipe(pluck('resolveDepositsForValidation'));
    this.viewData = this.depositsForValidation.pipe(
      map(deposits => {
        return deposits.map(deposit => {
          // rename storageWalletAddr to walletAddr
          const oldKey = 'storageWalletAddr'
          const newKey = 'walletAddr'

          const { [oldKey]: replaceByKey, ...rest } = deposit
          return { ...rest, [newKey]: replaceByKey } as Deposit
        })
      })
    );
  }

  acceptTransaction(block: Deposit) {
    this.alertMixin.fire({
      title: 'Are you sure you want to confirm this payment?',
      text: `This payment was made by ${block["User.name"]} `
        + `${block["User.lastName"]} `
        + `on ${this.datePipe.transform(block.createdAt, 'medium')}`,
      confirmButtonText: 'Yes, confirm payment',
      confirmButtonAriaLabel: 'Yes',
      cancelButtonText: 'No',
      footer: 'Confirming this means the user will be credited with money.'
    }).then(result => {
      if (result.isConfirmed)
        this.http.update<Deposit>(this.acceptPayment, {
          depositId: block.id
        }, this.authStore.authorizationHeader)
          .subscribe(res => this.reloadView());
    });
  }

  hideTransaction(block: Deposit) {
    this.alertMixin.fire({
      title: 'Do you really want to hide this payment?',
      text: `This payment was made by ${block["User.name"]} `
        + `${block["User.lastName"]} `
        + `on ${this.datePipe.transform(block.createdAt, 'medium')}`,
      confirmButtonText: 'Yes, hide payment',
      confirmButtonAriaLabel: 'Yes',
      cancelButtonText: 'No',
      footer: 'Hiding this means the user can send it back for verification.'
    }).then(result => {
      if (result.isConfirmed)
        this.http.discard(`${this.hidePayment}/${block.id}`,
          this.authStore.authorizationHeader)
          .subscribe(res => this.reloadView());
    });
  }

  rejectTransaction(block: Deposit) {
    this.alertMixin.fire({
      title: 'Read this twice! Do you really want to reject this payment?',
      text: `This payment was made by ${block["User.name"]} ${block["User.lastName"]} `
        + `on ${this.datePipe.transform(block.createdAt, 'medium')}`,
      icon: 'warning',
      iconColor: '#fb6962',
      confirmButtonText: 'Yes, reject payment',
      confirmButtonAriaLabel: 'Yes',
      cancelButtonText: 'No',
      footer: "Rejecting this mean the user didn't make the payment, "
        + "and this will cause the user to lose money if he/she did. Better to hide first."
    }).then(result => {
      if (result.isConfirmed)
        this.http.update<Deposit>(`${this.hidePayment}/${block.id}`, null,
          this.authStore.authorizationHeader)
          .subscribe(res => this.reloadView());
    });
  }

  /**
   * Reload our view, and thus its data
   */
  reloadView(): void {
    this.router.navigated = false;
    this.router.navigate(['./'], { relativeTo: this.route });
  }
}
