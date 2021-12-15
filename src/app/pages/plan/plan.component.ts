import { UIAdjustmentService } from 'src/services/ui-adjustment.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { pluck } from 'rxjs/operators';
import { Plan } from 'src/models/plan';

@Component({
  selector: 'app-plan',
  templateUrl: './plan.component.html',
  styleUrls: ['./plan.component.scss']
})
export class PlanComponent implements OnInit {
  plans: Observable<Plan[]>;

  constructor(private route: ActivatedRoute, private ui: UIAdjustmentService) {
    ui.setBreadcrumbs([{ url: '/app/plans', title: 'Plans' }]);
  }

  ngOnInit(): void {
    this.plans = this.route.data.pipe(pluck('resolvePlans'), pluck('plans'));
  }

}
