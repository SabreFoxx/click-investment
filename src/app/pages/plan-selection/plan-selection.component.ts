import { SwalComponent } from '@sweetalert2/ngx-sweetalert2';
import { DepositDetails } from 'src/models/payment-details';
import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { pluck } from 'rxjs/operators';
import { Plan } from 'src/models/plan';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-plan-selection',
  templateUrl: './plan-selection.component.html',
  styleUrls: ['./plan-selection.component.scss']
})
export class PlanSelectionComponent implements OnInit, AfterViewInit {
  plans: Observable<Plan[]>;
  paymentInfo: DepositDetails;
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

  constructor(private router: Router, private route: ActivatedRoute) {
    this.navData = router.getCurrentNavigation().extras.state;
    this.paymentInfo = this.navData?.paymentDetails
      ?? router.navigate(['../'], { relativeTo: this.route });
    this.navData?.to ?? router.navigate(['../'], { relativeTo: this.route });
  }

  ngOnInit(): void {
    this.plans = this.route.data.pipe(pluck('resolvePlans'), pluck('plans'));
  }

  ngAfterViewInit(): void {
    this.anchor.nativeElement.scrollIntoView(0);
  }

  selectPlan(plan: Plan) {
    if (this.navData?.to == 'deposit')
      this.router.navigate(['../', this.navData?.to], {
        relativeTo: this.route,
        queryParams: {
          currency: this.paymentInfo.currency.name,
          plan: plan.name
        }
      })
    else if (this.navData?.to == 'withdraw') {
      const planName = plan.name.toUpperCase();
      this.alertMixin.fire({
        title: planName,
        text: plan.description,
        confirmButtonText: `Withdraw from ${planName}`,
        confirmButtonAriaLabel: `Use ${planName}`,
      }).then(result => {
        if (result.isConfirmed)
          return true;
      });
    }
  }

}
