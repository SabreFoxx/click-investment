import { UIAdjustmentService } from 'src/services/ui-adjustment.service';
import { SwalComponent } from '@sweetalert2/ngx-sweetalert2';
import { PaymentTool } from 'src/models/payment-tool';
import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { pluck } from 'rxjs/operators';
import { Plan } from 'src/models/plan';
import Swal from 'sweetalert2';
import { capitalizeFirstLetter } from 'src/adjectives/functions';

@Component({
  selector: 'app-plan-selection',
  templateUrl: './plan-selection.component.html',
  styleUrls: ['./plan-selection.component.scss']
})
export class PlanSelectionComponent implements OnInit, AfterViewInit {
  plans: Observable<Plan[]>;
  navData: any;
  // we need this to get back to start of page when user navigates
  @ViewChild('useAsScrollToTopAnchor') anchor: ElementRef;
  @ViewChild('alertForWithdrawalLimitInfo') swal: SwalComponent;

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
    private ui: UIAdjustmentService) {
    this.navData = router.getCurrentNavigation().extras.state;
    this.navData?.paymentDetails ?? router.navigate(['../'], { relativeTo: this.route });
    this.navData?.to ?? router.navigate(['../'], { relativeTo: this.route });

    this.ui.setBreadcrumbs([{ url: '/app/payments', title: 'Payments' }, {
      url: `/app/payments/${this.navData.to}`,
      title: `${capitalizeFirstLetter(this.navData.to)}`, forceActive: true
    }]);
  }

  ngOnInit(): void {
    this.plans = this.route.data.pipe(pluck('resolvePlans'));
  }

  ngAfterViewInit(): void {
    // this.anchor.nativeElement.scrollIntoView(0); // TODO for all such occurence
  }

  selectPlan(plan: Plan) {
    const paymentDetails: PaymentTool = this.navData.paymentDetails;
    paymentDetails.plan = plan;

    const navigationOptions = {
      relativeTo: this.route,
      queryParams: { // we won't use this data later; we'll use "state" instead
        currency: paymentDetails.medium.name,
        plan: plan.name,
        planId: plan.id // however, we'll use this in our router config
      },
      "state": { paymentDetails }
    }

    if (this.navData.to == 'deposit')
      this.router.navigate(['../', this.navData.to], navigationOptions)
    else if (this.navData.to == 'withdraw')
      this.router.navigate(['../', this.navData.to], navigationOptions)

  }

}
