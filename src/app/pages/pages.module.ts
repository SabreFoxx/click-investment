import { NgScrollbarModule } from 'ngx-scrollbar';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SwiperModule } from 'swiper/angular';
import { NgApexchartsModule } from 'ng-apexcharts';

import { PlanRepositoryService } from 'src/services/plan-repository.service';
import { StatComponent } from './stat/stat.component';
import { PlanComponent } from './plan/plan.component';
import { BasePanelComponent } from './base-panel/base-panel.component';
import { ComponentModule } from '../components/component.module';
import { TransactionComponent } from './transaction/transaction.component';
import { ProfileComponent } from './profile/profile.component';
import { PaymentComponent } from './payment/payment.component';
import { PaymentMethodService } from 'src/services/payment-method.service';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { PlanSelectionComponent } from './plan-selection/plan-selection.component';
import { DepositComponent } from './deposit/deposit.component';
import { AboutComponent } from './about/about.component';

export const pageRoutes: Routes = [
  { path: '', redirectTo: 'stats', pathMatch: 'full' },
  {
    path: 'payments',
    component: PaymentComponent,
    resolve: { paymentMethods: PaymentMethodService },
    data: { animation: 'Payments' }
  },
  {
    path: 'payments/plan-selection',
    component: PlanSelectionComponent,
    resolve: { resolvePlans: PlanRepositoryService },
    data: { animation: 'Payments' }
  },
  {
    path: 'payments/deposit',
    component: DepositComponent,
    data: { animation: 'Payments' }
  },
  {
    path: 'stats',
    component: StatComponent,
    resolve: { resolvePlans: PlanRepositoryService },
    data: { animation: 'HomePage' }
  },
  {
    path: 'transactions',
    component: TransactionComponent,
    data: { animation: 'Transactions' }
  },
  {
    path: 'plans', component: PlanComponent,
    resolve: { resolvePlans: PlanRepositoryService },
    data: { animation: 'Plans' }
  },
  {
    path: 'profile',
    component: ProfileComponent,
    data: { animation: 'Profile' }
  },
  {
    path: 'about',
    component: AboutComponent,
    data: { animation: 'AboutPage' }
  }
]

@NgModule({
  declarations: [
    StatComponent,
    PlanComponent,
    BasePanelComponent,
    TransactionComponent,
    ProfileComponent,
    PaymentComponent,
    PlanSelectionComponent,
    DepositComponent,
    AboutComponent
  ],
  imports: [
    CommonModule,
    NgScrollbarModule,
    ComponentModule,
    RouterModule,
    SwiperModule,
    SweetAlert2Module,
    NgApexchartsModule
  ]
})
export class PageModule { }
