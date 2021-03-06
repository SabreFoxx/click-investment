import { SimpleHttpService } from './simple-http.service';
import { AuthStorageService } from './auth-storage.service';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Plan } from 'src/models/plan';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlanRepositoryService implements Resolve<Plan[]> {
  constructor(private authStore: AuthStorageService,
    private http: SimpleHttpService, @Inject('DASHBOARD') private endpoint: string) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Plan[]> {
    return this.http.loadPageData<Plan[]>(this.endpoint, this.authStore.authorizationHeader);
  }
}
