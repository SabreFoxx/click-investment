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
      { name: 'xrp', cssClass: 'xrp' },
      { name: 'btc', cssClass: 'btc' },
      { name: 'ltc', cssClass: 'ltc' },
      { name: 'abc', cssClass: 'abc' },
      { name: 'eth', cssClass: 'eth' },
      { name: 'xrp', cssClass: 'xrp' },
    ]
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<PaymentMethod[]> {
    return new Observable<PaymentMethod[]>(subscriber => {
      subscriber.next(this.methods);
      subscriber.complete();
    })
  }
}
