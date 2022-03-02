import { Injectable } from '@angular/core';
import { User } from 'src/models/user';
import { BehaviorSubject } from 'rxjs';
import jwtDecode from 'jwt-decode';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthStorageService {
  currentUser: BehaviorSubject<User>;
  private httpHeader: HttpHeaders;

  constructor() {
    this.httpHeader = new HttpHeaders;
    const emptyUser: User = {
      name: null,
      email: null,
      currency: null,
      phoneNumber: null
    }
    this.currentUser = new BehaviorSubject(emptyUser);
  }

  /**
   * Is the user logged in?
   */
  get isLoggedIn(): boolean {
    // Check whether the token is expired and return true or false
    return !this.isJwtTokenExpired();
  }

  get userJwtToken() {
    return localStorage.getItem('auth-token');
  }

  set userJwtToken(token: string) {
    localStorage.setItem('auth-token', token);
  }

  public isJwtTokenExpired(): boolean {
    try {
      const decodedToken = jwtDecode(this.userJwtToken);
      if (decodedToken['exp'])
        return (Date.now() >= decodedToken['exp'] * 1000) ? true : false;
    } catch (e) {
      return true;
    }
  }

  get authorizationHeader() {
    return this.httpHeader.set("Authorization", `Bearer ${this.userJwtToken}`);
  }

}
