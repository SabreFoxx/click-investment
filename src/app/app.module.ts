import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LandingComponent } from './landing/landing.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { NavComponent } from './header/nav/nav.component';
import { SvgComponent } from './svg/svg.component';
import { HeaderComponent } from './header/header.component';
import { SignInComponent } from './landing/sign-in/sign-in.component';
import { FooterComponent } from './footer/footer.component';
import { SignUpComponent } from './sign-up/sign-up.component';

@NgModule({
  declarations: [
    AppComponent,
    LandingComponent,
    NotFoundComponent,
    NavComponent,
    SvgComponent,
    HeaderComponent,
    SignInComponent,
    FooterComponent,
    SignUpComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
