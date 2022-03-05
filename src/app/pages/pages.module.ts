import { ReactiveFormsModule } from '@angular/forms';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule, CurrencyPipe, DatePipe } from '@angular/common';
import { SwiperModule } from 'swiper/angular';
import { NgApexchartsModule } from 'ng-apexcharts';

import { WithdrawalService } from 'src/services/withdrawal.service';
import { DepositValidationService } from 'src/services/deposit-validation.service';
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
import { TransactionService } from 'src/services/transaction.service';
import { DisbursalComponent } from './disbursal/disbursal.component';
import { DisbursalValidationService } from 'src/services/disbursal-validation.service';
import { AdminGuardService } from 'src/services/admin-guard.service';

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
    resolve: { withdrawalAvailabilityBlocks: WithdrawalService },
    // helps me reload data when I call withDrawComponent.reloadView. See reloadView
    runGuardsAndResolvers: 'always',
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
    resolve: { resolveTransactions: TransactionService },
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
    data: { animation: 'Validations' },
    canActivate: [AdminGuardService]
  },
  {
    path: 'disbursals', component: DisbursalComponent,
    resolve: { resolveDisbursalsForValidation: DisbursalValidationService },
    // helps me reload data when I call validationComponent.reloadView. See reloadView
    runGuardsAndResolvers: 'always',
    data: { animation: 'Disbursals' },
    canActivate: [AdminGuardService]
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
    ValidationComponent,
    DisbursalComponent
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
    CurrencyPipe, // CurrencyPipe provider was provided here for use in TypeScript
    {
      provide: 'API_PREFIX', useFactory() {
        return (environment.production) ? apiPrefix.prod : apiPrefix.dev
      }
    }, {
      provide: 'FETCH_DEPOSIT_HISTORY_URL',
      deps: ['API_PREFIX'],
      useFactory(prefix: string) {
        return `${prefix}${ApiEndpoints.DEPOSITS}`
      }
    }, {
      provide: 'FETCH_WITHDRAWAL_HISTORY_URL',
      deps: ['API_PREFIX'],
      useFactory(prefix: string) {
        return `${prefix}${ApiEndpoints.WITHDRAWALS}`
      }
    }, {
      provide: 'CREATE_DEPOSIT_TRANSACTION_URL',
      deps: ['API_PREFIX'],
      useFactory(prefix: string) {
        return `${prefix}${ApiEndpoints.DEPOSIT_TRANSACTION}`
      }
    }, {
      provide: 'FETCH_DEPOSITS_FROM_PLAN_URL_PREFIX',
      deps: ['API_PREFIX'],
      useFactory(prefix: string) {
        return `${prefix}${ApiEndpoints.DEPOSITS}`
      }
    }, {
      provide: 'CREATE_WITHDRAWAL_TRANSACTION_URL',
      deps: ['API_PREFIX'],
      useFactory(prefix: string) {
        return `${prefix}${ApiEndpoints.WITHDRAWAL_TRANSACTION}`
      }
    }, {
      provide: 'SEND_DEPOSIT_FOR_VERIFICATION_URL',
      deps: ['API_PREFIX'],
      useFactory(prefix: string) {
        return `${prefix}${ApiEndpoints.DEPOSIT_TRANSACTION}`
      }
    }, {
      provide: 'FETCH_UNVERIFIED_DEPOSITS_URL',
      deps: ['API_PREFIX'],
      useFactory(prefix: string) {
        return `${prefix}${ApiEndpoints.DEPOSIT_TRANSACTION}`
      }
    }, {
      provide: 'ADMIN_FETCH_DEPOSITS_FOR_VERIFICATION_URL',
      deps: ['API_PREFIX'],
      useFactory(prefix: string) {
        return `${prefix}${ApiEndpoints.DEPOSIT_FOR_VERIFICATION}`
      }
    }, {
      provide: 'ADMIN_VERIFY_DEPOSIT_URL',
      deps: ['API_PREFIX'],
      useFactory(prefix: string) {
        return `${prefix}${ApiEndpoints.DEPOSIT_FOR_VERIFICATION}`
      }
    }, {
      provide: 'ADMIN_HIDE_DEPOSIT_URL_PREFIX',
      deps: ['API_PREFIX'],
      useFactory(prefix: string) {
        return `${prefix}${ApiEndpoints.DEPOSIT_FOR_VERIFICATION}`
      }
    }, {
      provide: 'ADMIN_WITHDRAWAL_FOR_DISBURSAL_URL',
      deps: ['API_PREFIX'],
      useFactory(prefix: string) {
        return `${prefix}${ApiEndpoints.WITHDRAWAL_FOR_DISBURSAL}`
      }
    }, {
      provide: 'NOTIFICATION',
      deps: ['API_PREFIX'],
      useFactory(prefix: string) {
        return `${prefix}${ApiEndpoints.NOTIFICATION}`
      }
    }
  ]
})
export class PageModule { }
