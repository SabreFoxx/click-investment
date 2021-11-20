import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { PreSignupComponent } from './pre-signup/pre-signup.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { ApiEndpoints, apiPrefix } from 'src/adjectives/constants';
import { environment } from 'src/environments/environment';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';

export const authRoutes: Routes = [
  { path: 'signup', component: SignUpComponent },
  { path: 'signup_', component: PreSignupComponent },
  { path: 'login', component: LoginComponent },
  { path: 'logout', component: LogoutComponent }
]

@NgModule({
  declarations: [
    PreSignupComponent,
    SignUpComponent,
    LoginComponent,
    LogoutComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    HttpClientModule,
    SweetAlert2Module
  ],
  providers: [
    {
      provide: 'API_PREFIX', useFactory() {
        return (environment.production) ? apiPrefix.prod : apiPrefix.dev
      }
    },
    {
      provide: 'REGISTRATION_URL',
      deps: ['API_PREFIX'],
      useFactory(prefix: string) {
        return `${prefix}${ApiEndpoints.REGISTRATION}`
      }
    },
    {
      provide: 'LOGIN_URL',
      deps: ['API_PREFIX'],
      useFactory(prefix: string) {
        return `${prefix}${ApiEndpoints.LOGIN}`
      }
    },
    {
      provide: 'LOGIN_REFRESH_URL',
      deps: ['API_PREFIX'],
      useFactory(prefix: string) {
        return `${prefix}${ApiEndpoints.REFRESH_LOGIN}`
      }
    }
  ]
})
export class AuthModule { }
