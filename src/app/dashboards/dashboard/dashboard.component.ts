import { Plan } from 'src/models/plan';
import { PlanRepositoryService } from './../../../services/plan-repository.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  plans: Plan[];

  constructor(private plans_: PlanRepositoryService) { }

  ngOnInit(): void {
    this.plans = this.plans_.plans;
  }

}
