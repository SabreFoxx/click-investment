import { PreSignupComponent } from './pre-signup/pre-signup.component';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignUpComponent } from './sign-up/sign-up.component';
import { SigninFormComponent } from './signin-form/signin-form.component';
import { AuthModuleRootComponent } from './auth-module-root/auth-module-root.component';
import { Routes, RouterModule } from '@angular/router';

export const authRoutes: Routes = [
  { path: 'signin', component: SigninFormComponent },
  { path: 'signup', component: SignUpComponent }
]

@NgModule({
  declarations: [
    AuthModuleRootComponent,
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
