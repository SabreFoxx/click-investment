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
  }

  /**
   * Is the user logged in?
   */
  get isLoggedIn(): boolean {
    // Check whether the token is expired and return true or false
    return !this.isJwtTokenExpired(this.userJwtToken);
  }

  get userJwtToken() {
    return localStorage.getItem('auth-token');
  }

  set userJwtToken(token: string) {
    localStorage.setItem('auth-token', token);
  }

  public isJwtTokenExpired(token: string): boolean {
    const decodedToken = jwtDecode(token);
    if (decodedToken['exp'])
      return (Date.now() >= decodedToken['exp'] * 1000) ? true : false
    return false
  }

  get authorizationHeader() {
    return this.httpHeader.set("Authorization", `Bearer ${this.userJwtToken}`);
  }

}
