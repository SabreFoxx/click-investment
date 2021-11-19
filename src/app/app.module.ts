import { NgScrollbarModule } from 'ngx-scrollbar';
import { DashboardModule } from './dashboards/dashboard.module';
import { ComponentModule } from './components/component.module';
import { AuthModule } from './auths/auth.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';

import { AppComponent } from './app.component';
import { LandingComponent } from './landing/landing.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { SvgComponent } from './svg/svg.component';
import { ToastComponent } from './toast/toast.component';
import { NgProgressModule } from 'ngx-progressbar';

@NgModule({
  declarations: [
    AppComponent,
    LandingComponent,
    NotFoundComponent,
    SvgComponent,
    ToastComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AuthModule,
    ComponentModule,
    DashboardModule,
    NgScrollbarModule,
    BrowserAnimationsModule,
    SweetAlert2Module.forRoot(),
    NgProgressModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
