import { authRoutes } from './auth/auth.module';
import { AuthModuleRootComponent } from './auth/auth-module-root/auth-module-root.component';
import { LandingComponent } from './landing/landing.component';
import { PreSignupComponent } from './auth/pre-signup/pre-signup.component';
import { SignUpComponent } from './auth/sign-up/sign-up.component';
import { NotFoundComponent } from './not-found/not-found.component';

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'home', component: LandingComponent },
  { path: 'pre-signup', component: PreSignupComponent },
  { path: 'sign-up', component: SignUpComponent },
  { path: 'auth', component: AuthModuleRootComponent, children: authRoutes },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
