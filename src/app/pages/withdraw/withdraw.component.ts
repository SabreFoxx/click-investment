import { Component, OnInit, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { PaymentTools } from 'src/models/payment-details';
import { UIAdjustmentService } from 'src/services/ui-adjustment.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-withdraw',
  templateUrl: './withdraw.component.html',
  styleUrls: ['./withdraw.component.scss']
})
export class WithdrawComponent implements OnInit, AfterViewInit {
  withdrawDetails: PaymentTools;
  blocks: any;

  // we need this to get back to start of page when user navigates
  @ViewChild('useAsScrollToTopAnchor') anchor: ElementRef;

  alertMixin = Swal.mixin({
    icon: 'info',
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

  constructor(private router: Router, private route: ActivatedRoute,
    private ui: UIAdjustmentService) {
    this.withdrawDetails = this.router.getCurrentNavigation().extras.state?.paymentDetails;
    // this.withdrawDetails ?? router.navigate(['../'], { relativeTo: this.route }); // TODO

    this.ui.setBreadcrumbs([{ url: '/app/payments', title: 'Payments' },
    { url: '/app/payments/deposit', title: 'Withdraw', forceActive: true }]);

    this.blocks = [
      {
        description: 'Deposit made on Aug 27, 2020 4:53pm',
        amount: '1000',
        status: 'available',
        statusMessage: 'Available'
      },
      {
        description: 'Deposit made on Aug 27, 2020 4:53pm',
        amount: '1000',
        status: 'unavailable',
        statusMessage: 'Unavailable till Aug 27, 2020 4:53pm'
      },
      {
        description: 'Deposit made on Aug 27, 2020 4:53pm',
        amount: '1000',
        status: 'withdrawn',
        statusMessage: 'Withdrawn on Aug 27, 2020 4:53pm'
      }
    ]
  }

  ngOnInit(): void {
    console.log(this.withdrawDetails)
  }

  ngAfterViewInit(): void {
    this.anchor.nativeElement.scrollIntoView(0);
  }

  withdraw(): void {
    const paymentDetails: PaymentTools = this.withdrawDetails;

    const currency = 'GBP'.toUpperCase(); // TODO remove static
    const planName = paymentDetails.plan.name.toUpperCase();
    this.alertMixin.fire({
      title: `Selected: ${paymentDetails.plan.name} Plan`,
      html: `<article class="withdraw-info" style="text-align: left">
          <div style="font-size: 1em">
            <p>Total Value: <span style="font-weight: bold">$1, 080</span></p>
            <p>Current Deposit: <span style="font-weight: bold">$1, 000</span></p>
            <p>Total Profit: <span style="font-weight: bold">$950</span></p>
            <p>Withdrawal from Deposit available from: 
              <span style="font-weight: bold">27th Nov, 2018</span></p>
            <br>
            <p style="font-size: 0.9em">
              You can withdraw from your <em>Profit</em> at anytime, but you can only withdraw
              from your <em>Deposit</em> after a certain period of timeframe as specified in
              the Plan you deposited into.
            </p>
            <br>
            <h3>Request for Withdrawal</h3>
            <p style="font-size: 0.9em">
              If withdrawal from <em>Deposit</em> is currently unavailable, you can
              only withdraw from your profit and amount should not exceed total profit.
            </p>
            <br>
            <p style="font-size: 0.9em; font-weight: bold">
              <em>Enter value to withdraw in your local currency, GBP, and
              we'll convert to your selected crypto currency.</em>
            </p>
          </div>


          <div class="input-row">
            <div class="input-box">
              <input class="input" id="withdraw-amount" placeholder="${currency}" type="type">
            </div>
            <div class="input-container" style="flex-basis: 0%; margin: 1em">
              <svg class="svg-icon">
                <use xlink:href="#arrow-right-bold"></use>
              </svg>
            </div>
            <div class="control">
              <div class="select" style="width: 100%; height: 100%">
                <select style="width: 100%" id="select-currency">
                  <option>XLM</option>
                  <option>XRP</option>
                </select>
              </div>
            </div>
          </div>

          <div style="font-size: 1em">
            <br>
            <p style="font-size: 0.9em; font-weight: bold">
              <em>Enter the wallet address to transfer money to.</em>
            </p>
            <div class="input-box">
              <input class="input" id="wallet-address"
                placeholder="Your wallet address" type="type">
            </div>
          </div>
        </article>`,
      confirmButtonText: `Withdraw from ${planName}`,
      confirmButtonAriaLabel: `Use ${planName}`,
      preConfirm: () => {
        return [
          (document.getElementById('withdraw-amount') as any).value,
          (document.getElementById('select-currency') as any).value,
          (document.getElementById('wallet-address') as any).value
        ]
      },
      footer: 'After you click the Withdraw button, wait a couple of minutes '
        + 'for us to verify the transaction on our end.'
    }).then(result => {
      if (result.isConfirmed) {
        this.alertMixin.fire({
          title: 'Success',
          icon: 'success',
          iconHtml: null,
          text: 'Your withdrawal is being processed!',
          footer: 'Check your transaction log for the status.',
          showCancelButton: false
        });
        console.log(result.value);
      } else if (result.isDismissed && result.dismiss == Swal.DismissReason.cancel)
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

}
