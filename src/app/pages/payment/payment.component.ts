import { PaymentMethodService } from 'src/services/payment-method.service';
import { UIAdjustmentService } from 'src/services/ui-adjustment.service';
import { PaymentTool } from 'src/models/payment-tool';
import { Component, ElementRef, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SwalComponent } from '@sweetalert2/ngx-sweetalert2';
import { BehaviorSubject, Observable } from 'rxjs';
import { pluck } from 'rxjs/operators';
import { PaymentMethod } from 'src/models/payment-method';
import Swal from 'sweetalert2';
import { Deposit } from 'src/models/deposit';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit, AfterViewInit {
  paymentMethods: BehaviorSubject<PaymentMethod[]>;
  unverifiedDeposits: Observable<Deposit[]>;
  isDepositListVisible: boolean;
  // we need this to get back to start of page when user navigates
  @ViewChild('useAsScrollToTopAnchor') anchor: ElementRef;
  @ViewChild(SwalComponent) alert: SwalComponent;

  alertMixin = Swal.mixin({
    iconHtml: `
      <svg class="svg-icon-for-sweet-alert" style="fill: #0cc078">
        <use xlink:href="#circle-multiple-outline"></use>
      </svg>`,
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

  constructor(private route: ActivatedRoute, private payMthServ: PaymentMethodService,
    private router: Router, private ui: UIAdjustmentService) {
    ui.setBreadcrumbs([{ url: '/app/payments', title: 'Payments' }]);
  }

  ngOnInit(): void {
    this.paymentMethods = this.payMthServ.methods;
    this.unverifiedDeposits = this.route.data.pipe(pluck('unverifiedPayments'));
  }

  ngAfterViewInit(): void {
    this.anchor.nativeElement.scrollIntoView(0);
  }

  showAlert(card: PaymentMethod, muchLaterNavigateTo: 'withdraw' | 'deposit') {
    const footer = muchLaterNavigateTo == 'deposit' ?
      'Select this payment method for use in funding your plan'
      : 'Receive your funds using this payment method';

    const cardName = card.name.toUpperCase();
    this.alertMixin.fire({
      title: cardName,
      text: card.description,
      confirmButtonText: `Proceed with ${cardName}`,
      confirmButtonAriaLabel: `Use ${cardName}`,
      footer
    }).then(result => {
      const paymentDetails: PaymentTool = { medium: card };

      if (result.isConfirmed)
        this.router.navigate(['plan-selection'], {
          relativeTo: this.route,
          state: { paymentDetails, to: muchLaterNavigateTo }
        })
      else if (result.isDismissed && result.dismiss == Swal.DismissReason.cancel)
        this.alertMixin.fire({
          title: 'Cancelled',
          icon: 'error',
          iconHtml: null,
          iconColor: '#fb6962',
          footer: null,
          showCancelButton: false
        });
    });
  }

  toggleDepositList() {
    this.isDepositListVisible = !this.isDepositListVisible;
  }

  selectForVerification(deposit: Deposit) { }

  removeFromListOfUnverified(deposit: Deposit) { }

}
