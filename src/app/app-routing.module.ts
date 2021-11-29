import { RouteGuardService } from './../services/route-guard.service';
import { LibraryComponent } from './components/library/library.component';
import { BasePanelComponent } from './pages/base-panel/base-panel.component';
import { authRoutes } from './auths/auth.module';
import { pageRoutes } from './pages/pages.module';
import { LandingComponent } from './landing/landing.component';
import { NotFoundComponent } from './not-found/not-found.component';

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { infoRoutes } from './infos/info.module';

const routes: Routes = [
  { path: 'home', component: LandingComponent },
  { path: 'auth', children: authRoutes },
  { path: 'info', children: infoRoutes },
  // e.g /home(extra:component-lib)
  { path: 'component-lib', component: LibraryComponent, outlet: 'extra' },
  {
    path: 'app',
    component: BasePanelComponent,
    children: pageRoutes,
    canActivate: [RouteGuardService],
    canActivateChild: [RouteGuardService]
  },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
