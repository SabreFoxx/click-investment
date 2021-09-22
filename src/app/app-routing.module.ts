import { SigninFormComponent } from './components/signin-form/signin-form.component';
import { BasePanelComponent } from './dashboards/base-panel/base-panel.component';
import { authRoutes } from './auths/auth.module';
import { dashboardRoutes } from './dashboards/dashboard.module';
import { LandingComponent } from './landing/landing.component';
import { NotFoundComponent } from './not-found/not-found.component';

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { infoRoutes } from './infos/info.module';

const routes: Routes = [
  { path: 'home', component: LandingComponent },
  { path: 'auth', children: authRoutes },
  { path: 'info', children: infoRoutes },
  { path: 'popup', component: SigninFormComponent, outlet: 'extra' }, // e.g /home(extra:popup)
  { path: '', component: BasePanelComponent, children: dashboardRoutes },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
