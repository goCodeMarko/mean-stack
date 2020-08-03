import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";

import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { IUser } from "../interfaces/IUser";
import { JwtHelperService } from "@auth0/angular-jwt";


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public authToken: any;
  public account: any;
  // public baseUrl: string = "http://localhost:5444";

  constructor(private _httpClient: HttpClient) { }

  getUser() {
    return this._httpClient.get(`/users/list`)
      .pipe(catchError(this.handleError))
  }

  addUser(user) {
    return this._httpClient.post(`/users/register`, user, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    })
      .pipe(catchError(this.handleError))
  }

  authenticateUser(user) {
    return this._httpClient.post(`/users/authenticate`, user, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    })
      .pipe(catchError(this.handleError))
  }

  getProfile() {
    this.loadToken();
    return this._httpClient.get(`/users/profile`, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': this.authToken
      })
    })
      .pipe(catchError(this.handleError))
  }

  loadToken() {
    const token = localStorage.getItem('id_token');
    this.authToken = token;
  }

  storeUserData(token, account) {
    localStorage.setItem('id_token', token);
    localStorage.setItem('account', JSON.stringify(account));
    this.authToken = token;
    this.account = account;
  }

  loggedIn() {
    if (localStorage.id_token != null) {
      return true;
    } else {
      const helper = new JwtHelperService();

      return !helper.isTokenExpired(localStorage.id_token);
    }
  }

  logout() {
    this.authToken = null;
    this.account = null;
    localStorage.clear();
  }

  private handleError(errorResponse: HttpErrorResponse) {
    if (errorResponse.error instanceof ErrorEvent) {
      console.error('Client Side Error:', errorResponse.error.message);
    } else {
      console.log('Server Side Error: ', errorResponse)
    }
    return throwError('There is a problem with the service. We\'re notified & working on it. Please try again later.')
  }
}
