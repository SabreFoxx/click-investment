import { SimpleHttpService } from 'src/services/simple-post.service';
import { FormGroup, AbstractControl, FormControl } from '@angular/forms';
import { AuthStorageService } from 'src/services/auth-storage.service';
import { DepositDetails } from 'src/models/payment-details';
import { UIAdjustmentService } from 'src/services/ui-adjustment.service';
import { Component, OnInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/models/user';
import { Subject } from 'rxjs';
import { map, filter, debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { getCurrencySymbol } from '@angular/common';

@Component({
  selector: 'app-deposit',
  templateUrl: './deposit.component.html',
  styleUrls: ['./deposit.component.scss']
})
export class DepositComponent implements OnInit {
  @ViewChild('addr') addr: ElementRef;
  depositDetails: DepositDetails;
  user: User;

  form: FormGroup;
  fiatField: AbstractControl;
  cryptoField: AbstractControl;
  computedCryptoValue = 0;
  formTextChanged = new Subject<InputEvent>();
  get isOkayToDepositMoney() {
    return this.computedCryptoValue > 0
  }

  constructor(private router: Router, private route: ActivatedRoute, private renderer: Renderer2,
    private ui: UIAdjustmentService, private authStore: AuthStorageService,
    private http: SimpleHttpService) {
    this.depositDetails = this.router.getCurrentNavigation().extras.state?.paymentDetails;
    this.depositDetails ?? router.navigate(['../'], { relativeTo: this.route });

    this.ui.setBreadcrumbs([{ url: '/app/payments', title: 'Payments' },
    { url: '/app/payments/deposit', title: 'Deposit', forceActive: true }]);

    this.form = new FormGroup({
      'fiat': this.fiatField = new FormControl,
      'crypto': this.cryptoField = new FormControl
    })
  }

  ngOnInit(): void {
    this.authStore.currentUser.subscribe(user => this.user = user);

    // debounce pattern to prevent calling api for each input change
    this.formTextChanged.pipe(
      map(e => (e.target as HTMLInputElement).value),
      filter(text => text.length > 2),
      debounceTime(300),
      distinctUntilChanged(),
      // http.receive returns a Subject, so switchMap allows us subscribe to that Subject instead
      switchMap(textValue => {
        return this.http.receive<any>(
          'https://min-api.cryptocompare.com/data/price?fsym='
          + `${this.depositDetails.currency.name.toUpperCase()}`
          + `&tsyms=${this.user.currency.toUpperCase()}`
        )
      })
    ).subscribe(data => {
      this.computedCryptoValue = parseFloat(data[this.user.currency.toUpperCase()]);
    });
  }

  deposit() {
    this.renderer.setStyle(this.addr.nativeElement, 'opacity', '1');
  }

  get moneySymbol() {
    return getCurrencySymbol(this.user.currency.toUpperCase(), 'wide')
  }

  inputChanged(inputChangeEvent: InputEvent) {
    this.formTextChanged.next(inputChangeEvent);
  }

}
