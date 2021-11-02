import { NgScrollbarModule } from 'ngx-scrollbar';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SwiperModule } from 'swiper/angular';

import { PlanRepositoryService } from 'src/services/plan-repository.service';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PlanComponent } from './plan/plan.component';
import { BasePanelComponent } from './base-panel/base-panel.component';
import { ComponentModule } from '../components/component.module';
import { TransactionComponent } from './transaction/transaction.component';
import { LoanComponent } from './loan/loan.component';
import { ProfileComponent } from './profile/profile.component';
import { SettingComponent } from './setting/setting.component';
import { ChartsModule } from 'ng2-charts';
import { PaymentComponent } from './payment/payment.component';

export const dashboardRoutes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'payment', component: PaymentComponent },
  {
    path: 'dashboard',
    component: DashboardComponent,
    resolve: { resolvePlans: PlanRepositoryService },
    data: { animation: 'HomePage' }
  },
  { path: 'transactions', component: TransactionComponent },
  {
    path: 'plans', component: PlanComponent,
    resolve: { resolvePlans: PlanRepositoryService },
    data: { animation: 'AboutPage' }
  },
  { path: 'loans', component: LoanComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'settings', component: SettingComponent }
]

@NgModule({
  declarations: [
    DashboardComponent,
    PlanComponent,
    BasePanelComponent,
    TransactionComponent,
    LoanComponent,
    ProfileComponent,
    SettingComponent,
    PaymentComponent
  ],
  imports: [
    CommonModule,
    NgScrollbarModule,
    ComponentModule,
    RouterModule,
    SwiperModule,
    ChartsModule
  ]
})
export class DashboardModule { }
