import { SimpleHttpService } from 'src/services/simple-http.service';
import { AuthStorageService } from 'src/services/auth-storage.service';
import { Component, OnInit, AfterViewInit, ElementRef, ViewChild, Inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { WithdrawBlockComponent } from 'src/app/components/withdraw-block/withdraw-block.component';
import { PaymentTool } from 'src/models/payment-tool';
import { UIAdjustmentService } from 'src/services/ui-adjustment.service';
import { pluck, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { calculateCurrentAmount, calculateCurrentGross } from 'src/adjectives/functions';
import { Deposit } from 'src/models/deposit';
import { WithdrawalBlock } from 'src/models/withdrawal-block';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { DateTime } from 'luxon';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-withdraw',
  templateUrl: './withdraw.component.html',
  styleUrls: ['./withdraw.component.scss']
})
export class WithdrawComponent implements OnInit {
  withdrawDetails: PaymentTool;
  blocks: Observable<WithdrawalBlock[]>;
  // withdrawals are made from deposits or profits
  // that's why we have "deposit" allover the place
  withdrawalBlockToUse: WithdrawalBlock;
  isToDepositFromProfit = false;
  userCurrency: string;

  @ViewChild('profitRadio') profitRadioButton: ElementRef;

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
    private ui: UIAdjustmentService, private datePipe: DatePipe,
    private authStorage: AuthStorageService, private http: SimpleHttpService,
    @Inject('CREATE_WITHDRAWAL_TRANSACTION_URL') private endpoint: string,
    private currencyPipe: CurrencyPipe) {
    this.withdrawDetails = this.router.getCurrentNavigation().extras.state?.paymentDetails;
    this.withdrawDetails ?? router.navigate(['../'], { relativeTo: this.route });

    this.ui.setBreadcrumbs([{ url: '/app/payments', title: 'Payments' },
    { url: '/app/payments/deposit', title: 'Withdraw', forceActive: true }]);

    this.withdrawalBlockToUse = null;
  }

  ngOnInit(): void {
    this.blocks = this.route.data.pipe(
      pluck('withdrawalAvailabilityBlocks'),
      map((deposits: Deposit[]): WithdrawalBlock[] => {
        return deposits.map((deposit: Deposit | any) => {
          let status = 'available'
          let statusMessage = 'Available'
          let cssClass = 'success'
          if (DateTime.fromISO(deposit.lockedTill) > DateTime.local()) {
            status = 'unavailable'
            statusMessage = `Unavailable till ${this.datePipe.transform(deposit.lockedTill, 'medium')}`
            cssClass = 'pending'
          }
          if (deposit['Withdrawal.id']) {
            status = 'withdrawn'
            statusMessage = 'Withdrawn on '
              + `${this.datePipe.transform(deposit['Withdrawal.createdAt'], 'medium')}`
            cssClass = 'failure'
          }

          return {
            depositId: deposit.id,
            description: `Deposit made on ${this.datePipe.transform(deposit.createdAt, 'medium')}`,
            amount: deposit.fiatAmount,
            status,
            statusMessage,
            cssClass
          }
        })
      })
    );

    this.userCurrency = this.authStorage.currentUser.getValue().currency.toUpperCase();
  }

  withdraw(): void {
    if (!this.isToDepositFromProfit && this.withdrawalBlockToUse == null) {
      this.alertMixin.fire({
        title: 'Please choose a block to withdraw from',
        icon: 'warning',
        iconHtml: null,
        iconColor: '#f7b654',
        footer: null,
        showCancelButton: false
      })
      return;
    }

    const paymentDetails: PaymentTool = this.withdrawDetails;
    const planName = paymentDetails.plan.name.toUpperCase();
    const fixedWithdrawAmount = this.withdrawalBlockToUse?.amount ?? '';
    const disabled = +fixedWithdrawAmount > 0 ? 'disabled' : '';

    this.alertMixin.fire({
      title: `Selected: ${paymentDetails.plan.name} Plan`,
      html: `<article class="withdraw-info" style="text-align: left">
          <div style="font-size: 1em">
            <p>Total Value: <span style="font-weight: bold">
              ${this.currencyPipe.transform(this.planCurrentGross, this.userCurrency)}
            </span></p>
            <p>Total Profit: <span style="font-weight: bold">
              ${this.currencyPipe.transform(this.planCurrentGross - this.planCurrentAmount,
        this.userCurrency)}
            </span></p>
            <p>Withdrawing from: <span style="font-weight: bold">
              ${this.withdrawalBlockToUse?.description ?? 'Profit'}
            </span></p>
            <p style="font-size: 0.9em">
              You can withdraw from your <em>Profit</em> at anytime, but you can only withdraw
              from your <em>Deposit</em> after a certain period of timeframe as specified in
              its availability.
            </p>
            <br>
            <h3>Request for Withdrawal</h3>
            <p style="font-size: 0.9em">
              If withdrawal from <em>Deposit</em> is currently unavailable, you can
              only withdraw from your profit and amount should not exceed total profit.
            </p>
            <br>
            <p style="font-size: 0.9em; font-weight: bold">
              Enter value to withdraw in your local currency, ${this.userCurrency}, and
              we'll payout in your selected crypto currency below.
            </p>
            <p style="font-size: 0.9em; font-weight: bold"><em>
              <span style="color: #fb6962">Ensure you select the right crypto currency, and provide
                the correct wallet address for that currency, or you might lose your funds</span>
            </em></p>
          </div>

          <div class="input-row">
            <div class="input-box">
              <input class="input" id="withdraw-amount" value="${fixedWithdrawAmount}"
                placeholder="${this.userCurrency}" type="text" ${disabled}>
            </div>
            <div class="input-container" style="flex-basis: 0%; margin: 1em">
              <svg class="svg-icon">
                <use xlink:href="#arrow-right-bold"></use>
              </svg>
            </div>
            <div class="control">
              <div class="select" style="width: 100%; height: 100%">
                <select style="width: 100%" id="withdrawal-medium">
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
                placeholder="Your wallet address" type="text">
            </div>
          </div>
        </article>`,
      confirmButtonText: `Withdraw from ${planName}`,
      confirmButtonAriaLabel: `Use ${planName}`,
      preConfirm: () => {
        return [
          (document.getElementById('withdraw-amount') as any).value,
          (document.getElementById('withdrawal-medium') as any).value,
          (document.getElementById('wallet-address') as any).value
        ]
      },
      footer: 'After you click the Withdraw button, wait a couple of minutes '
        + "for us to verify the transaction on our end. We'll credit your wallet soon."
    }).then(result => {
      if (result.isConfirmed) {
        const [fiatAmount, withdrawalMedium, userWalletAddr] = result.value;

        this.http.send<any>(this.endpoint, {
          fiatAmount,
          withdrawalMedium,
          userWalletAddr,
          planId: this.withdrawDetails.plan.id,
          depositId: this.withdrawalBlockToUse.depositId
        }, this.authStorage.authorizationHeader)
          .subscribe(res => {
            this.alertMixin.fire({
              title: 'Success',
              icon: 'success',
              iconHtml: null,
              text: 'Your withdrawal is being processed!',
              footer: 'Check your transaction log for the status.',
              showCancelButton: false
            })
            this.reloadView();
          });
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

  setSelection(blockComponent: WithdrawBlockComponent): void {
    if (blockComponent.block.status != 'unavailable') {
      this.isToDepositFromProfit = false;
      blockComponent.selectRadio();
      this.withdrawalBlockToUse = blockComponent.block;
    }
  }

  setToWithdrawFromProfit(): void {
    this.isToDepositFromProfit = true;
    this.withdrawalBlockToUse = null;
    const radio = this.profitRadioButton.nativeElement;
    radio.click();
    radio.checked = true;
  }

  get planCurrentGross(): number {
    return calculateCurrentGross(this.withdrawDetails?.plan);
  }

  get planCurrentAmount(): number {
    return calculateCurrentAmount(this.withdrawDetails?.plan);
  }

  /**
   * Reload our view, and thus its data
   */
  reloadView(): void {
    this.router.navigated = false;
    this.router.navigate(['./'], { relativeTo: this.route });
  }

}
