import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardComponent } from './dashboard/dashboard.component';
import { PlanComponent } from './plan/plan.component';

export const dashboardRoutes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: 'plans', component: PlanComponent }
]

@NgModule({
  declarations: [
    DashboardComponent,
    PlanComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    DashboardComponent
  ]
})
export class DashboardModule { }
