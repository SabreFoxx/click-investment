import { Inject, Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { Deposit } from 'src/models/deposit';
import { AuthStorageService } from './auth-storage.service';
import { SimpleHttpService } from './simple-http.service';

@Injectable({
  providedIn: 'root'
})
export class PaybackValidationService implements Resolve<Deposit[]> {

  constructor(private http: SimpleHttpService, private authStore: AuthStorageService,
    @Inject('ADMIN_FETCH_DEPOSITS_FOR_VERIFICATION_URL') private endpoint: string) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Deposit[]> {
    return this.http.loadPageData<Deposit[]>(this.endpoint, this.authStore.authorizationHeader);
  }
}
