import { PreSignupComponent } from './pre-signup/pre-signup.component';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignUpComponent } from './sign-up/sign-up.component';
import { SigninFormComponent } from './signin-form/signin-form.component';

@NgModule({
  declarations: [
    PreSignupComponent,
    SignUpComponent,
    SigninFormComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    SigninFormComponent
  ]
})
export class AuthModule { }
