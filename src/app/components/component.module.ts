import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { NgApexchartsModule } from 'ng-apexcharts';

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
    ChartComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    NgScrollbarModule,
    SweetAlert2Module,
    NgApexchartsModule
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
    ProfileCardComponent
  ]
})
export class ComponentModule { }
