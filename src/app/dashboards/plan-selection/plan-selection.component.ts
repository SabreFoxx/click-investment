import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.plans = this.route.data.pipe(pluck('resolvePlans'));
  }

}
