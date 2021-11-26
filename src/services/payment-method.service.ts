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
          + "(RTGS) system that aims to enable instant monetary transactions globally."
      },
      {
        name: 'btc', cssClass: 'btc',
        description: "The RippleNet payment platform is a real-time gross settlement "
          + "(RTGS) system that aims to enable instant monetary transactions globally."
      },
      {
        name: 'ltc', cssClass: 'ltc',
        description: "The RippleNet payment platform is a real-time gross settlement "
          + "(RTGS) system that aims to enable instant monetary transactions globally."
      },
      {
        name: 'abc', cssClass: 'abc',
        description: "The RippleNet payment platform is a real-time gross settlement "
          + "(RTGS) system that aims to enable instant monetary transactions globally."
      },
      {
        name: 'eth', cssClass: 'eth',
        description: "The RippleNet payment platform is a real-time gross settlement "
          + "(RTGS) system that aims to enable instant monetary transactions globally."
      },
      {
        name: 'xrp', cssClass: 'xrp',
        description: "The RippleNet payment platform is a real-time gross settlement "
          + "(RTGS) system that aims to enable instant monetary transactions globally."
      },
    ]
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<PaymentMethod[]> {
    return new Observable<PaymentMethod[]>(subscriber => {
      subscriber.next(this.methods);
      subscriber.complete();
    })
  }
}
