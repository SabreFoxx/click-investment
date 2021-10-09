import { Component, OnInit } from '@angular/core';
import { Plan } from 'src/models/plan';
import { PlanRepositoryService } from 'src/services/plan-repository.service';

@Component({
  selector: 'app-plan',
  templateUrl: './plan.component.html',
  styleUrls: ['./plan.component.scss']
})
export class PlanComponent implements OnInit {
  plans: Plan[];

  constructor(private plans_: PlanRepositoryService) { }

  ngOnInit(): void {
    this.plans = this.plans_.plans;
  }

}
