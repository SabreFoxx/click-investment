import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthStorageService } from './auth-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuardService implements CanActivate {

  constructor(private authStore: AuthStorageService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (!this.authStore.currentUser.value.isAdmin) {
      alert('Only Admin is allowed to view this page');
      return false
    }
    return true;
  }
}
