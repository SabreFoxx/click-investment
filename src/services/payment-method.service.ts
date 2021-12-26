import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { PaymentMethod } from 'src/models/payment-method';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaymentMethodService implements Resolve<any> {
  methods: PaymentMethod[];

  constructor() {
    this.methods = [
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
        type: 'fiat'
      },
      {
        name: 'Bank wire', cssClass: 'wire',
        description: "Wire transfer, bank transfer, or credit transfer, is a method "
          + "of electronic funds transfer from one person or entity to another. "
          + "A wire transfer can be made from one bank account to another bank account, "
          + "or through a transfer of cash at a cash office.",
        type: 'fiat'
      }
    ]
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<PaymentMethod[]> {
    return new Observable<PaymentMethod[]>(subscriber => {
      subscriber.next(this.methods);
      subscriber.complete();
    })
  }
}
