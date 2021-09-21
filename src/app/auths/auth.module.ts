import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { PreSignupComponent } from './pre-signup/pre-signup.component';
import { SignUpComponent } from './sign-up/sign-up.component';

export const authRoutes: Routes = [
  { path: 'signup', component: SignUpComponent },
  { path: 'signup_', component: PreSignupComponent },
]

@NgModule({
  declarations: [
    PreSignupComponent,
    SignUpComponent,
  ],
  imports: [
    CommonModule,
    RouterModule
  ]
})
export class AuthModule { }
