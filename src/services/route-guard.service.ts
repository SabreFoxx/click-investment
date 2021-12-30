import { AuthService } from './auth.service';
import { AuthStorageService } from 'src/services/auth-storage.service';
import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateChild,
  Router,
  RouterStateSnapshot
} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RouteGuardService implements CanActivate, CanActivateChild {

  constructor(private authStore: AuthStorageService,
    private router: Router, private auth: AuthService) {
    // injecting AuthService here, and making sure AuthService starts
    // so we can refresh our login, and user cannot use app with a network connection
    auth.refreshLogin();
  }

  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return this.canActivate(childRoute, state);
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (!this.authStore.isLoggedIn) {
      this.router.navigate(['/auth/login']);
      return false
    }
    return true;
  }
}
