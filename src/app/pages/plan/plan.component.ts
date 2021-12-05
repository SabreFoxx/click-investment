import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map, pluck } from 'rxjs/operators';
import { Plan } from 'src/models/plan';

@Component({
  selector: 'app-plan',
  templateUrl: './plan.component.html',
  styleUrls: ['./plan.component.scss']
})
export class PlanComponent implements OnInit {
  plans: Observable<Plan[]>;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.plans = this.route.data.pipe(pluck('resolvePlans'), pluck('plans'));
  }

}
