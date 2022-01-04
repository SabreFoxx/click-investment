import { DepositValidationService } from './../../services/deposit-validation.service';
import { ReactiveFormsModule } from '@angular/forms';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
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
import { PaymentService } from 'src/services/payment.service';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { PlanSelectionComponent } from './plan-selection/plan-selection.component';
import { DepositComponent } from './deposit/deposit.component';
import { AboutComponent } from './about/about.component';
import { apiPrefix, ApiEndpoints } from 'src/adjectives/constants';
import { environment } from 'src/environments/environment';
import { WithdrawComponent } from './withdraw/withdraw.component';
import { ValidationComponent } from './validation/validation.component';

export const pageRoutes: Routes = [
  { path: '', redirectTo: 'stats', pathMatch: 'full' },
  {
    path: 'payments',
    component: PaymentComponent,
    resolve: { 'unverifiedPayments': PaymentService },
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
    path: 'payments/withdraw',
    component: WithdrawComponent,
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
    path: 'validations', component: ValidationComponent,
    resolve: { resolveDepositsForValidation: DepositValidationService },
    // helps me reload data when I call validationComponent.reloadView. See reloadView
    runGuardsAndResolvers: 'always',
    data: { animation: 'Validations' }
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
    AboutComponent,
    WithdrawComponent,
    ValidationComponent
  ],
  imports: [
    CommonModule,
    NgScrollbarModule,
    ComponentModule,
    RouterModule,
    SwiperModule,
    SweetAlert2Module,
    NgApexchartsModule,
    ReactiveFormsModule
  ],
  providers: [
    DatePipe, // DatePipe provider was provided here for use in TypeScript
    {
      provide: 'API_PREFIX', useFactory() {
        return (environment.production) ? apiPrefix.prod : apiPrefix.dev
      }
    },
    {
      provide: 'CREATE_DEPOSIT_TRANSACTION_URL',
      deps: ['API_PREFIX'],
      useFactory(prefix: string) {
        return `${prefix}${ApiEndpoints.DEPOSIT_TRANSACTION}`
      }
    },
    {
      provide: 'CREATE_WITHDRAWAL_TRANSACTION_URL',
      deps: ['API_PREFIX'],
      useFactory(prefix: string) {
        return `${prefix}${ApiEndpoints.CREATE_WITHDRAWAL_TRANSACTION}`
      }
    },
    {
      provide: 'SEND_DEPOSIT_FOR_VERIFICATION_URL',
      deps: ['API_PREFIX'],
      useFactory(prefix: string) {
        return `${prefix}${ApiEndpoints.DEPOSIT_TRANSACTION}`
      }
    },
    {
      provide: 'FETCH_UNVERIFIED_DEPOSITS_URL',
      deps: ['API_PREFIX'],
      useFactory(prefix: string) {
        return `${prefix}${ApiEndpoints.DEPOSIT_TRANSACTION}`
      }
    },
    {
      provide: 'ADMIN_FETCH_DEPOSITS_FOR_VERIFICATION_URL',
      deps: ['API_PREFIX'],
      useFactory(prefix: string) {
        return `${prefix}${ApiEndpoints.DEPOSIT_FOR_VERIFICATION}`
      }
    },
    {
      provide: 'ADMIN_VERIFY_DEPOSIT_URL',
      deps: ['API_PREFIX'],
      useFactory(prefix: string) {
        return `${prefix}${ApiEndpoints.DEPOSIT_FOR_VERIFICATION}`
      }
    },
    {
      provide: 'ADMIN_HIDE_DEPOSIT_URL',
      deps: ['API_PREFIX'],
      useFactory(prefix: string) {
        return `${prefix}${ApiEndpoints.DEPOSIT_FOR_VERIFICATION}`
      }
    },
  ]
})
export class PageModule { }
