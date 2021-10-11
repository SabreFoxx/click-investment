import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Plan } from 'src/models/plan';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlanRepositoryService implements Resolve<any> {
  plans: Plan[];

  constructor() {
    this.plans = [
      {
        name: "Platinum",
        image: "card-platinum.svg",
        icon: "rhombus",
        currency: "USD",
        amount: "20,500"
      }, {
        name: "Gold plan",
        image: "card-gold.svg",
        icon: "gold",
        currency: "USD",
        amount: "15,732"
      }, {
        name: "Diamond plan",
        image: "card-diamond.svg",
        icon: "diamond",
        currency: "USD",
        amount: "72,850"
      }, {
        name: "Emerald",
        image: "card-emerald.svg",
        icon: "diamond-outline",
        currency: "USD",
        amount: "42,600"
      }, {
        name: "Gold plan",
        image: "card-gold.svg",
        icon: "gold",
        currency: "USD",
        amount: "15,732"
      }, {
        name: "Platinum",
        image: "card-platinum.svg",
        icon: "rhombus",
        currency: "USD",
        amount: "20,500"
      }, {
        name: "Gold plan",
        image: "card-gold.svg",
        icon: "gold",
        currency: "USD",
        amount: "15,732"
      }
    ]
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Plan[]> {
    let plansObservable = new Observable<Plan[]>(subscriber => {
      subscriber.next(this.plans);
      subscriber.complete();
    });
    return plansObservable;
  }
}
