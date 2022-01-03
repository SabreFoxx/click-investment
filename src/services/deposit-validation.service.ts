import { AuthStorageService } from 'src/services/auth-storage.service';
import { SimpleHttpService } from 'src/services/simple-post.service';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Deposit } from 'src/models/deposit';

@Injectable({
  providedIn: 'root'
})
export class DepositValidationService implements Resolve<any> {

  constructor(private http: SimpleHttpService, private authStore: AuthStorageService,
    @Inject('ADMIN_FETCH_DEPOSITS_FOR_VERIFICATION_URL') private endpoint: string) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Deposit[]> {
    return this.http.loadPageData<Deposit[]>(this.endpoint, this.authStore.authorizationHeader);
  }
}
