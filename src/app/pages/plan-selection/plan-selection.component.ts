import { DepositDetails } from 'src/models/payment-details';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { pluck } from 'rxjs/operators';
import { Plan } from 'src/models/plan';

@Component({
  selector: 'app-plan-selection',
  templateUrl: './plan-selection.component.html',
  styleUrls: ['./plan-selection.component.scss']
})
export class PlanSelectionComponent implements OnInit {
  plans: Observable<Plan[]>;
  paymentInfo: DepositDetails;
  navData: any;

  constructor(private router: Router, private route: ActivatedRoute) {
    this.navData = router.getCurrentNavigation().extras.state;
    this.paymentInfo = this.navData?.paymentDetails
      ?? router.navigate(['../'], { relativeTo: this.route });
    this.navData?.to ?? router.navigate(['../'], { relativeTo: this.route });
  }

  ngOnInit(): void {
    this.plans = this.route.data.pipe(pluck('resolvePlans'));
  }

  selectPlan(plan: Plan) {
    this.router.navigate(['../', this.navData?.to], {
      relativeTo: this.route,
      queryParams: {
        currency: this.paymentInfo.currency.name,
        plan: plan.name
      }
    });
  }

}
