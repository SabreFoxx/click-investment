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

export const authRoutes: Routes = [
  { path: 'signup', component: SignUpComponent },
  { path: 'signup_', component: PreSignupComponent },
  { path: 'login', component: LoginComponent }
]

@NgModule({
  declarations: [
    PreSignupComponent,
    SignUpComponent,
    LoginComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    HttpClientModule
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
