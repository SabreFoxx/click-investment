import { Inject, Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { Withdrawal } from 'src/models/withdrawal';
import { AuthStorageService } from './auth-storage.service';
import { SimpleHttpService } from './simple-http.service';

@Injectable({
  providedIn: 'root'
})
export class DisbursalValidationService implements Resolve<Withdrawal[]> {

  constructor(private http: SimpleHttpService, private authStore: AuthStorageService,
    @Inject('ADMIN_WITHDRAWAL_FOR_DISBURSAL_URL') private endpoint: string) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Withdrawal[]> {
    return this.http.loadPageData<Withdrawal[]>(this.endpoint, this.authStore.authorizationHeader);
  }
}
