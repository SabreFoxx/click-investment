import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthStorageService } from './auth-storage.service';
import { SimpleHttpService } from './simple-http.service';
import { Deposit } from 'src/models/deposit';

@Injectable({
  providedIn: 'root'
})
export class WithdrawalService implements Resolve<Deposit[]> {
  constructor(private authStore: AuthStorageService,
    private http: SimpleHttpService,
    @Inject('FETCH_DEPOSITS_FROM_PLAN_URL_PREFIX') private endpoint: string) { }

  // Deposit is here because we typically withdraw from profits and deposits
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Deposit[]> {
    return this.http.loadPageData<Deposit[]>(this.endpoint
      + `/${route.queryParamMap.get('planId')}`,
      this.authStore.authorizationHeader);
  }
}
