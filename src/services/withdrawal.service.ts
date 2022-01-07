import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthStorageService } from './auth-storage.service';
import { SimpleHttpService } from './simple-post.service';
import { Deposit } from 'src/models/deposit';

@Injectable({
  providedIn: 'root'
})
export class WithdrawalService implements Resolve<any> {
  constructor(private authStore: AuthStorageService,
    private http: SimpleHttpService,
    @Inject('FETCH_WITHDRAWAL_AVAILABILITY_URL') private endpoint: string) { }

  // Deposit is here because we typically withdraw from profits and deposits
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Deposit[]> {
    return this.http.loadPageData<Deposit[]>(this.endpoint, this.authStore.authorizationHeader);
  }
}
