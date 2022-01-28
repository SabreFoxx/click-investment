import { AuthStorageService } from './auth-storage.service';
import { SimpleHttpService } from './simple-http.service';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Inject, Injectable } from '@angular/core';
import { PaymentMethod } from 'src/models/payment-method';
import { Observable, BehaviorSubject } from 'rxjs';
import { Deposit } from 'src/models/deposit';

@Injectable({
  providedIn: 'root'
})
export class PaymentService implements Resolve<Deposit[]> {
  methods: BehaviorSubject<PaymentMethod[]>;

  constructor(@Inject('FETCH_UNVERIFIED_DEPOSITS_URL') private endpoint: string,
    private http: SimpleHttpService, private authStore: AuthStorageService) {
    this.methods = new BehaviorSubject([
      {
        name: 'xrp',
        cssClass: 'xrp',
        description: "The RippleNet payment platform is a real-time gross settlement "
          + "(RTGS) system that aims to enable instant monetary transactions globally.",
        type: 'crypto'
      },
      {
        name: 'xlm', cssClass: 'xlm',
        description: "Stellar, or Stellar Lumens, is a decentralized "
          + "protocol for digital currency to fiat money, low-cost transfers, which allows "
          + "cross-border transactions between any pair of currencies.",
        type: 'crypto'
      },
      {
        name: 'Credit/Debit', cssClass: 'c-card',
        description: "Debit cards allow you to spend money by drawing on funds you "
          + "have deposited at the bank. Credit cards allow you to borrow money from the "
          + "card issuer up to a certain limit in order to purchase items or withdraw cash.",
        type: 'card'
      },
      {
        name: 'Bank wire', cssClass: 'wire',
        description: "Wire transfer, bank transfer, or credit transfer, is a method "
          + "of electronic funds transfer from one person or entity to another. "
          + "A wire transfer can be made from one bank account to another bank account, "
          + "or through a transfer of cash at a cash office.",
        type: 'wire'
      }
    ]);
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Deposit[]> {
    return this.http.loadPageData<Deposit[]>(this.endpoint, this.authStore.authorizationHeader);
  }
}
