import { DatePipe } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, pluck } from 'rxjs/operators';
import { Withdrawal } from 'src/models/withdrawal';
import { AuthStorageService } from 'src/services/auth-storage.service';
import { SimpleHttpService } from 'src/services/simple-http.service';
import { UIAdjustmentService } from 'src/services/ui-adjustment.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-payback',
  templateUrl: './disbursal.component.html',
  styleUrls: ['./disbursal.component.scss']
})
export class DisbursalComponent implements OnInit {
  disbursalsForValidation: Observable<Withdrawal[]>;
  // userWalletAddr of Withdrawal will be renamed to walletAddr
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
    private authStore: AuthStorageService,
    @Inject('ADMIN_WITHDRAWAL_FOR_DISBURSAL_URL') private apiEndpoint: string) {
    ui.setBreadcrumbs([{ url: '/app/validations', title: 'Validations' }]);
  }

  ngOnInit(): void {
    this.disbursalsForValidation = this.route.data.pipe(pluck('resolveDisbursalsForValidation'));
    this.viewData = this.disbursalsForValidation.pipe(
      map(withdrawals => {
        return withdrawals.map(withdrawal => {
          // rename userWalletAddr to walletAddr
          const oldKey = 'userWalletAddr'
          const newKey = 'walletAddr'

          const { [oldKey]: replaceByKey, ...rest } = withdrawal
          return { ...rest, [newKey]: replaceByKey }
        })
      })
    );
  }

  acceptTransaction(block: Withdrawal) {
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
        this.http.update<Withdrawal>(this.apiEndpoint, {
          withdrawalId: block.id
        }, this.authStore.authorizationHeader)
          .subscribe(res => this.reloadView());
    });
  }

  rejectTransaction(block: Withdrawal) {
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
        this.http.discard(`${this.apiEndpoint}/${block.id}`, this.authStore.authorizationHeader)
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