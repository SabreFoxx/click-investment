import { NgScrollbarModule } from 'ngx-scrollbar';
import { PageModule } from './pages/pages.module';
import { ComponentModule } from './components/component.module';
import { AuthModule } from './auths/auth.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';

import { AppComponent } from './app.component';
import { LandingComponent } from './landing/landing.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { SvgComponent } from './svg/svg.component';
import { ToastComponent } from './toast/toast.component';
import { NgProgressModule } from 'ngx-progressbar';
import { apiPrefix, ApiEndpoints } from 'src/adjectives/constants';
import { environment } from 'src/environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    LandingComponent,
    NotFoundComponent,
    SvgComponent,
    ToastComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AuthModule,
    ComponentModule,
    PageModule,
    NgScrollbarModule,
    BrowserAnimationsModule,
    SweetAlert2Module.forRoot(),
    NgProgressModule
  ],
  providers: [
    {
      provide: 'API_PREFIX', useFactory() {
        return (environment.production) ? apiPrefix.prod : apiPrefix.dev
      }
    },
    {
      provide: 'DASHBOARD',
      deps: ['API_PREFIX'],
      useFactory(prefix: string) {
        return `${prefix}${ApiEndpoints.DASHBOARD}`
      }
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
