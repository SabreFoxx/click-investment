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
        design: "card-platinum.svg",
        description: "A good plan",
        icon: "rhombus",
        currency: "USD",
        amount: "20,500"
      }, {
        name: "Gold",
        design: "card-gold.svg",
        description: "A good plan",
        icon: "gold",
        currency: "USD",
        amount: "15,732"
      }, {
        name: "Diamond",
        design: "card-diamond.svg",
        description: "A good plan",
        icon: "diamond",
        currency: "USD",
        amount: "72,850"
      }, {
        name: "Emerald",
        design: "card-emerald.svg",
        description: "A good plan",
        icon: "diamond-outline",
        currency: "USD",
        amount: "42,600"
      }, {
        name: "Gold plan",
        design: "card-gold.svg",
        description: "A good plan",
        icon: "gold",
        currency: "USD",
        amount: "15,732"
      }, {
        name: "Platinum",
        design: "card-platinum.svg",
        description: "A good plan",
        icon: "rhombus",
        currency: "USD",
        amount: "20,500"
      }, {
        name: "Gold plan",
        design: "card-gold.svg",
        description: "A good plan",
        icon: "gold",
        currency: "USD",
        amount: "15,732"
      }
    ]
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Plan[]> {
    return new Observable<Plan[]>(subscriber => {
      subscriber.next(this.plans);
      subscriber.complete();
    });
  }

}
