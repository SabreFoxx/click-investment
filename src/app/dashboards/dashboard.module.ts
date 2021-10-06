import { NgScrollbarModule } from 'ngx-scrollbar';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardComponent } from './dashboard/dashboard.component';
import { PlanComponent } from './plan/plan.component';
import { BasePanelComponent } from './base-panel/base-panel.component';
import { ComponentModule } from '../components/component.module';

export const dashboardRoutes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: 'plans', component: PlanComponent }
]

@NgModule({
  declarations: [
    DashboardComponent,
    PlanComponent,
    BasePanelComponent
  ],
  imports: [
    CommonModule,
    NgScrollbarModule,
    ComponentModule
  ]
})
export class DashboardModule { }
