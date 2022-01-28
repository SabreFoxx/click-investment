import { AuthStorageService } from 'src/services/auth-storage.service';
import { SimpleHttpService } from 'src/services/simple-http.service';
import { DatePipe } from '@angular/common';
import { Component, Inject, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { getMaxLetters } from 'src/adjectives/functions';
import { Deposit } from 'src/models/deposit';
import Swal from 'sweetalert2';

@Component({
  selector: 'tr[app-verify-block]',
  templateUrl: './verify-block.component.html',
  styleUrls: ['./verify-block.component.scss']
})
export class VerifyBlockComponent implements OnInit {
  @Input() block: Deposit;
  @Output() reloadList = new EventEmitter();

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

  constructor(private datePipe: DatePipe, private http: SimpleHttpService,
    private authStore: AuthStorageService,
    @Inject('ADMIN_VERIFY_DEPOSIT_URL') private acceptPayment: string,
    @Inject('ADMIN_HIDE_DEPOSIT_URL_PREFIX') private hidePayment: string) { }

  ngOnInit(): void {
  }

  accept() {
    this.alertMixin.fire({
      title: 'Are you sure you want to confirm this payment?',
      text: `This payment was made by ${this.block["User.firstName"]} ${this.block["User.lastName"]} `
        + `on ${this.datePipe.transform(this.block.createdAt, 'medium')}`,
      confirmButtonText: 'Yes, confirm payment',
      confirmButtonAriaLabel: 'Yes',
      cancelButtonText: 'No',
      footer: 'Confirming this means the user will be credited with money.'
    }).then(result => {
      if (result.isConfirmed)
        this.http.update<Deposit>(this.acceptPayment, {
          depositId: this.block.id
        }, this.authStore.authorizationHeader)
          .subscribe(res => this.reloadList.emit());
    });
  }

  hide() {
    this.alertMixin.fire({
      title: 'Do you really want to hide this payment?',
      text: `This payment was made by ${this.block["User.firstName"]} ${this.block["User.lastName"]} `
        + `on ${this.datePipe.transform(this.block.createdAt, 'medium')}`,
      confirmButtonText: 'Yes, hide payment',
      confirmButtonAriaLabel: 'Yes',
      cancelButtonText: 'No',
      footer: 'Hiding this means the user can send it back for verification.'
    }).then(result => {
      if (result.isConfirmed)
        this.http.discard(`${this.hidePayment}/${this.block.id}`, this.authStore.authorizationHeader)
          .subscribe(res => this.reloadList.emit());
    });
  }

  reject() {
    this.alertMixin.fire({
      title: 'Read this twice! Do you really want to reject this payment?',
      text: `This payment was made by ${this.block["User.firstName"]} ${this.block["User.lastName"]} `
        + `on ${this.datePipe.transform(this.block.createdAt, 'medium')}`,
      icon: 'warning',
      iconColor: '#fb6962',
      confirmButtonText: 'Yes, reject payment',
      confirmButtonAriaLabel: 'Yes',
      cancelButtonText: 'No',
      footer: "Rejecting this mean the user didn't make the payment, "
        + "and this will cause the user to lose money if he/she did. Better to hide first."
    }).then(result => {
      if (result.isConfirmed)
        this.http.update<Deposit>(`${this.hidePayment}/${this.block.id}`, null,
          this.authStore.authorizationHeader)
          .subscribe(res => this.reloadList.emit());
    });
  }

  trimLength(string) {
    return getMaxLetters(string, 12);
  }

}
