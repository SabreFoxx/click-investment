import { SwalComponent } from '@sweetalert2/ngx-sweetalert2';
import { DepositDetails } from 'src/models/payment-details';
import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { pluck } from 'rxjs/operators';
import { Plan } from 'src/models/plan';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-plan-selection',
  templateUrl: './plan-selection.component.html',
  styleUrls: ['./plan-selection.component.scss']
})
export class PlanSelectionComponent implements OnInit, AfterViewInit {
  plans: Observable<Plan[]>;
  paymentInfo: DepositDetails;
  navData: any;
  // we need this to get back to start of page when user navigates
  @ViewChild('useAsScrollToTopAnchor') anchor: ElementRef;
  @ViewChild('alertForWithdrawalLimitInfo') swal: SwalComponent;

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

  constructor(private router: Router, private route: ActivatedRoute) {
    this.navData = router.getCurrentNavigation().extras.state;
    this.paymentInfo = this.navData?.paymentDetails
      ?? router.navigate(['../'], { relativeTo: this.route });
    this.navData?.to ?? router.navigate(['../'], { relativeTo: this.route });
  }

  ngOnInit(): void {
    this.plans = this.route.data.pipe(pluck('resolvePlans'), pluck('plans'));
  }

  ngAfterViewInit(): void {
    this.anchor.nativeElement.scrollIntoView(0);
  }

  selectPlan(plan: Plan) {
    if (this.navData?.to == 'deposit')
      this.router.navigate(['../', this.navData?.to], {
        relativeTo: this.route,
        queryParams: {
          currency: this.paymentInfo.currency.name,
          plan: plan.name
        }
      })
    else if (this.navData?.to == 'withdraw') {
      const currency = 'GBP'.toUpperCase(); // TODO
      const planName = plan.name.toUpperCase();
      this.alertMixin.fire({
        title: `Selected: ${plan.name} Plan`,
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
                <input class="input" placeholder="${currency}" type="type">
              </div>
              <div class="input-container" style="flex-basis: 0%; margin: 1em">
                <svg class="svg-icon">
                  <use xlink:href="#arrow-right-bold"></use>
                </svg>
              </div>
              <div class="control">
                <div class="select" style="width: 100%; height: 100%">
                  <select style="width: 100%">
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
                <input class="input" placeholder="Your wallet address" type="type">
              </div>
            </div>
          </article>`,
        confirmButtonText: `Withdraw from ${planName}`,
        confirmButtonAriaLabel: `Use ${planName}`,
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
          return true;
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

}
