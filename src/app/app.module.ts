import { NgScrollbarModule } from 'ngx-scrollbar';
import { DashboardModule } from './dashboards/dashboard.module';
import { ComponentModule } from './components/component.module';
import { AuthModule } from './auths/auth.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { LandingComponent } from './landing/landing.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { SvgComponent } from './svg/svg.component';

@NgModule({
  declarations: [
    AppComponent,
    LandingComponent,
    NotFoundComponent,
    SvgComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AuthModule,
    ComponentModule,
    DashboardModule,
    NgScrollbarModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
