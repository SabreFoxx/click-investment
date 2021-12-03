import { AuthStorageService } from './auth-storage.service';
import { Inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/models/user';
import { SimplePostService } from 'src/services/simple-post.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private post: SimplePostService, private router: Router,
    private authStorage: AuthStorageService,
    @Inject('LOGIN_URL') private loginEndpoint: string,
    @Inject('LOGIN_REFRESH_URL') private loginRefreshEndpoint: string) {
    // always refresh login when app starts
    this.refreshLogin();
  }

  public login(credentials: { email: string, password: string }, endpoint = this.loginEndpoint) {
    this.post.fullResponseBody.subscribe(response => {
      if (response?.token)
        this.authStorage.userJwtToken = response['token'];
    });
    this.post.send<User>(endpoint, credentials)
      .subscribe(user => {
        this.authStorage.currentUser.next(user);
        this.router.navigate(['/app/stats']);
      })
  }

  public refreshLogin() {
    if (this.authStorage.isLoggedIn)
      this.post.send<User>(this.loginRefreshEndpoint, null,
        this.authStorage.authorizationHeader, false, false)
        .subscribe(user => this.authStorage.currentUser.next(user),
          () => this.router.navigate(['/auth/login']));
  }

}

