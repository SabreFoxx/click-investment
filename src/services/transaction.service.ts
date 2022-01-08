import { Inject, Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Resolve } from '@angular/router';
import { Deposit } from 'src/models/deposit';
import { Withdrawal } from 'src/models/withdrawal';
import { AuthStorageService } from './auth-storage.service';
import { SimpleHttpService } from './simple-post.service';

@Injectable({
  providedIn: 'root'
})
export class TransactionService implements Resolve<[Deposit[], Withdrawal[]]>{

  constructor(private http: SimpleHttpService, private authStore: AuthStorageService,
    @Inject('FETCH_DEPOSIT_HISTORY_URL') private depositEndpoint: string,
    @Inject('FETCH_WITHDRAWAL_HISTORY_URL') private withdrawalEndpoint: string) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    Promise<[Deposit[], Withdrawal[]]> {
    return Promise.all([
      this.http.loadPageData<Deposit[]>(this.depositEndpoint, this.authStore.authorizationHeader)
        .toPromise(),
      this.http.loadPageData<Withdrawal[]>(this.withdrawalEndpoint,
        this.authStore.authorizationHeader)
        .toPromise()]);
  }
}
