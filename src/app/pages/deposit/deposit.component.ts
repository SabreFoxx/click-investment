import { CryptoWallet } from 'src/models/crypto-wallet';
import { SimpleHttpService } from 'src/services/simple-http.service';
import { FormGroup, AbstractControl, FormControl } from '@angular/forms';
import { AuthStorageService } from 'src/services/auth-storage.service';
import { PaymentTool } from 'src/models/payment-tool';
import { UIAdjustmentService } from 'src/services/ui-adjustment.service';
import { Component, OnInit, ViewChild, ElementRef, Renderer2, Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/models/user';
import { BehaviorSubject, Subject } from 'rxjs';
import { map, filter, debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { getCurrencySymbol } from '@angular/common';
import { cryptoWallets } from 'src/adjectives/constants';

@Component({
  selector: 'app-deposit',
  templateUrl: './deposit.component.html',
  styleUrls: ['./deposit.component.scss']
})
export class DepositComponent implements OnInit {
  @ViewChild('instruction') instruction: ElementRef;
  depositDetails: PaymentTool;
  user: BehaviorSubject<User>;
  disableDepositSubmitButton: boolean = true;
  cryptoWalletToDepositMoney: CryptoWallet;

  form: FormGroup;
  fiatField: AbstractControl;
  cryptoField: AbstractControl;
  rxjsDebouncedFiatAmount = 0;
  computedCryptoValue = 0;
  formTextChanged = new Subject<InputEvent>();
  get isOkayToDepositMoney(): boolean {
    return this.computedCryptoValue > 0 && !this.disableDepositSubmitButton
  }

  constructor(private router: Router, private route: ActivatedRoute,
    private renderer: Renderer2, private http: SimpleHttpService,
    @Inject('CREATE_DEPOSIT_TRANSACTION_URL') private endpoint: string,
    private ui: UIAdjustmentService, private authStore: AuthStorageService) {
    this.depositDetails = this.router.getCurrentNavigation().extras.state?.paymentDetails;
    this.depositDetails ?? router.navigate(['../'], { relativeTo: this.route });

    this.ui.setBreadcrumbs([{ url: '/app/payments', title: 'Payments' },
    { url: '/app/payments/deposit', title: 'Deposit', forceActive: true }]);

    this.form = new FormGroup({
      'fiat': this.fiatField = new FormControl,
      'CRYPTO': this.cryptoField = new FormControl
    })
  }

  ngOnInit(): void {
    this.user = this.authStore.currentUser;

    // debounce pattern to prevent calling api for each input change
    this.formTextChanged.pipe(
      map(e => (e.target as HTMLInputElement).value),
      filter(text => text.length > 1),
      debounceTime(300),
      distinctUntilChanged(),
      // http.receive returns a Subject, so switchMap allows us subscribe to that Subject instead
      switchMap(formValue => {
        this.rxjsDebouncedFiatAmount = parseFloat(formValue);

        this.http.receive<any>(
          'https://min-api.cryptocompare.com/data/price?fsym='
          + `${this.depositDetails.medium.name.toUpperCase()}`
          + `&tsyms=${this.userCurrency.toUpperCase()}`
        )
        return this.http.fullResponseBody;
      })
    ).subscribe(data => {
      // no need to unsubscribe bcos complete() is called in receive<T>
      this.disableDepositSubmitButton = false;
      this.computedCryptoValue = parseFloat(data[this.userCurrency.toUpperCase()])
        * this.rxjsDebouncedFiatAmount;
    });
  }

  deposit() {
    this.disableDepositSubmitButton = true;
    const cryptoCurrency = this.depositDetails.medium.type == 'CARD' ?
      null : this.depositDetails.medium.name.toUpperCase();

    this.http.send<any>(this.endpoint, {
      planId: this.depositDetails.plan.id,
      fiatAmount: this.form.get('fiat').value,
      cryptoAmount: this.computedCryptoValue,
      cryptoCurrency,
      paymentMedium: this.depositDetails.medium.type,
      storageWalletAddr: this.depositDetails.medium.type == 'CARD' ?
        cryptoWallets['ON_RAMP_WALLET'].walletAddress : cryptoWallets[cryptoCurrency].walletAddress
    }, this.authStore.authorizationHeader)
      .subscribe(res => {
        // no need to unsubscribe bcos complete() is called in send<T>
        if (this.depositDetails.medium.type == 'CARD')
          return window.location.href
            = `https://buy.ramp.network/?userAddress=${cryptoWallets['ON_RAMP_WALLET'].walletAddress}`
        this.cryptoWalletToDepositMoney = cryptoWallets[cryptoCurrency];
        this.renderer.setStyle(this.instruction.nativeElement, 'opacity', 1);
      }, error => {
        this.disableDepositSubmitButton = false;
      });
  }

  get moneySymbol() {
    return getCurrencySymbol(this.userCurrency?.toUpperCase(), 'wide')
  }

  get userCurrency() {
    return this.user.getValue().currency;
  }

  inputChanged(inputChangeEvent: InputEvent) {
    this.formTextChanged.next(inputChangeEvent);
  }

}
