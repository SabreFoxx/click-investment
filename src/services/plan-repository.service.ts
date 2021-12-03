import { AuthStorageService } from './auth-storage.service';
import { HttpClient } from '@angular/common/http';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Plan } from 'src/models/plan';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlanRepositoryService implements Resolve<any> {
  constructor(private authStore: AuthStorageService,
    private http: HttpClient, @Inject('DASHBOARD') private endpoint: string) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Plan[]> {
    return this.http.get<Plan[]>(this.endpoint, { headers: this.authStore.authorizationHeader })
  }

}
