import { DatePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
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

  constructor(private datePipe: DatePipe) { }

  ngOnInit(): void {
  }

  accept() {
    this.alertMixin.fire({
      title: 'Are you sure you want to confirm this payment?',
      text: `This payment was made by ${this.block["User.firstName"]} ${this.block["User.lastName"]} `
        + `on ${this.datePipe.transform(this.block.createdAt, 'medium')}`,
      confirmButtonText: 'Yes, confirm payment',
      confirmButtonAriaLabel: 'Yes',
      cancelButtonText: 'No'
    }).then(result => {
      if (result.isConfirmed)
        console.log('proceed')
    });
  }

  reject() {
    this.alertMixin.fire({
      title: 'Do you really want to reject this payment?',
      text: `This payment was made by ${this.block["User.firstName"]} ${this.block["User.lastName"]} `
        + `on ${this.datePipe.transform(this.block.createdAt, 'medium')}`,
      confirmButtonText: 'Yes, reject payment',
      confirmButtonAriaLabel: 'Yes',
      cancelButtonText: 'No'
    }).then(result => {
      if (result.isConfirmed)
        console.log('proceed')
    });
  }

  trimLength(string) {
    return getMaxLetters(string, 12);
  }

}
