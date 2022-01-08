import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { NgApexchartsModule } from 'ng-apexcharts';

import { apiPrefix, ApiEndpoints } from 'src/adjectives/constants';
import { environment } from 'src/environments/environment';

import { NavComponent } from './header/nav/nav.component';
import { SigninFormComponent } from './signin-form/signin-form.component';
import { InputBoxComponent } from './input-box/input-box.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { MenuComponent } from './menu/menu.component';
import { LibraryComponent } from './library/library.component';
import { SideMenuItemComponent } from './side-menu-item/side-menu-item.component';
import { PlanCardComponent } from './plan-card/plan-card.component';
import { TopBarComponent } from './top-bar/top-bar.component';
import { PaymentCardComponent } from './payment-card/payment-card.component';
import { ProfileCardComponent } from './profile-card/profile-card.component';
import { ChartComponent } from './chart/chart.component';
import { NotificationPaneComponent } from './notification-pane/notification-pane.component';
import { ReactiveFormsModule } from '@angular/forms';
import { WithdrawBlockComponent } from './withdraw-block/withdraw-block.component';
import { VerifyBlockComponent } from './verify-block/verify-block.component';
import { SettingsCardComponent } from './settings-card/settings-card.component';
import { DepositTransactionComponent } from './deposit-transaction/deposit-transaction.component';
import { WithdrawTransactionComponent } from './withdraw-transaction/withdraw-transaction.component';
import { StatusToCssClassPipe } from 'src/pipes/status-to-css-class.pipe';

@NgModule({
  declarations: [
    HeaderComponent,
    NavComponent,
    FooterComponent,
    InputBoxComponent,
    SigninFormComponent,
    MenuComponent,
    LibraryComponent,
    SideMenuItemComponent,
    PlanCardComponent,
    TopBarComponent,
    PaymentCardComponent,
    ProfileCardComponent,
    ChartComponent,
    NotificationPaneComponent,
    WithdrawBlockComponent,
    VerifyBlockComponent,
    SettingsCardComponent,
    DepositTransactionComponent,
    WithdrawTransactionComponent,
    StatusToCssClassPipe
  ],
  imports: [
    CommonModule,
    RouterModule,
    NgScrollbarModule,
    NgApexchartsModule,
    ReactiveFormsModule
  ],
  exports: [
    HeaderComponent,
    NavComponent,
    FooterComponent,
    InputBoxComponent,
    SigninFormComponent,
    SideMenuItemComponent,
    PlanCardComponent,
    TopBarComponent,
    PaymentCardComponent,
    ProfileCardComponent,
    NotificationPaneComponent,
    WithdrawBlockComponent,
    VerifyBlockComponent,
    SettingsCardComponent
  ],
  providers: [
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
    }
  ]
})
export class ComponentModule { }
