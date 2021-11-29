import { DepositDetails } from 'src/models/payment-details';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SwalComponent } from '@sweetalert2/ngx-sweetalert2';
import { Observable } from 'rxjs';
import { pluck } from 'rxjs/operators';
import { PaymentMethod } from 'src/models/payment-method';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {
  paymentMethods: Observable<PaymentMethod[]>;
  @ViewChild(SwalComponent) alert: SwalComponent;
  isDepositListVisible: boolean;

  alertMixin = Swal.mixin({
    iconHtml: `
      <svg class="svg-icon-for-sweet-alert" style="fill: #0cc078">
        <use xlink:href="#circle-multiple-outline"></use>
      </svg>`,
    iconColor: '#0cc078',
    footer: 'Select this payment method for use in funding your plan',
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

  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.paymentMethods = this.route.data.pipe(pluck('paymentMethods'));
  }

  showAlert(card: PaymentMethod) {
    const cardName = card.name.toUpperCase();
    this.alertMixin.fire({
      title: cardName,
      text: card.description,
      confirmButtonText: `Proceed with ${cardName}`,
      confirmButtonAriaLabel: `Use ${cardName}`,
    }).then(result => {
      const paymentDetails: DepositDetails = { currency: card };

      if (result.isConfirmed)
        this.router.navigate(['plan-selection'], {
          relativeTo: this.route,
          state: { paymentDetails, to: 'deposit' }
        })
    })
  }

  toggleDepositList() {
    this.isDepositListVisible = !this.isDepositListVisible;
  }

}
