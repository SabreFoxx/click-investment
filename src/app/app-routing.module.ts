import { authRoutes } from './auths/auth.module';
import { dashboardRoutes } from './dashboards/dashboard/dashboard.module';
import { AuthRootComponent } from './auths/root/root.component';
import { LandingComponent } from './landing/landing.component';
import { NotFoundComponent } from './not-found/not-found.component';

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'home', component: LandingComponent },
  { path: 'auth', component: AuthRootComponent, children: authRoutes },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  ...dashboardRoutes,
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
