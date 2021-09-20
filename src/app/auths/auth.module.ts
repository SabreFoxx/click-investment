import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { PreSignupComponent } from './pre-signup/pre-signup.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { SigninFormComponent } from '../components/signin-form/signin-form.component';
import { AuthRootComponent } from './root/root.component';

export const authRoutes: Routes = [
  { path: 'signin', component: SigninFormComponent },
  { path: 'signup', component: SignUpComponent },
  { path: 'signup_', component: PreSignupComponent },
]

@NgModule({
  declarations: [
    AuthRootComponent,
    PreSignupComponent,
    SignUpComponent,
    SigninFormComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    SigninFormComponent
  ]
})
export class AuthModule { }
