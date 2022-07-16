import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { BehaviorSubject, finalize, Observable } from 'rxjs';
import jwt_decode from 'jwt-decode';
import { User } from '../models/user';
import { JWTToken } from '../models/jwt-token';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private currentUserSubject: BehaviorSubject<User | null>;
  private currentUser: Observable<User | null>;

  constructor(private http: HttpClient, @Inject('API_BASE_URL') private apiBaseUrl: string, private router: Router) {
    let currentUser = localStorage.getItem('currentUser');
    console.log(currentUser);

    let user = null;
    if (currentUser) {
      //currentUser = '{}';
      user = JSON.parse(currentUser);
    }

    this.currentUserSubject = new BehaviorSubject<User | null>(user);
    this.currentUser = this.currentUserSubject.asObservable();
  }

  onTimeOut() {
    if (this.currentUserValue !== null) {
      if (this.isTokenExpired()) {
        this.logout();
      } else {
        setTimeout(() => {
          this.onTimeOut();
        }, 1000);
      }
    }
  }

  login(user: User, redirect: boolean = true): void {
    let params: HttpParams = new HttpParams()
      .set('username', user.username)
      .set('password', user.password);

    // let headers: HttpHeaders = new HttpHeaders({
    //   'Content-Type': 'application/x-www-form-urlencoded',
    //   'Access-Control-Allow-Origin': '*',
    //   // 'Origin': 'http://localhost:4200',
    //   // 'responseType': 'text'
    //   'Accept': '*/*'
    // })
    // headers = headers.set('Accept', '*/*');
    // headers = headers.set('Content-Type', 'application/x-www-form-urlencoded');

    this.http.post<JWTToken>(this.apiBaseUrl + 'api/auth/login', null, { params: params })
      .subscribe({
        next: (resp: JWTToken) => {
          user.token = resp;
          // Reset password to hide it in localStorage
          user.password = '';
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.currentUserSubject.next(user);
          console.log(resp['accessToken']);
          // console.log(this.currentUserSubject);
          // console.log(localStorage.getItem('currentUser'));
          if (redirect)
            // Redirect to home page
            this.router.navigate(['/']);
        },
        error: (error) => {
          console.error(error);
        }
      });
  }

  logout(): void {
    // this.http.post(this.apiBaseUrl + 'api/auth/logout', {}).pipe(
    //   finalize(() => {
    //   })
    // ).subscribe();
    // this.currentUser = null;
    this.currentUserSubject.next(null);
    localStorage.removeItem('currentUser');
    this.router.navigate(['/login']);
  }

  isAuthenticated(): boolean {
    // console.log(this.currentUserSubject);
    // return !!this.currentUserSubject;
    return !!this.currentUserValue;
    // let isTokenExpired = this.isTokenExpired();
    // if (isTokenExpired) {
    //   this.http.post<JWTToken>(this.apiBaseUrl + 'api/auth/refreshtoken', this.currentUserValue?.token)
    //     .subscribe({
    //       next: (resp: JWTToken) => {
    //         console.log(resp)
    //       },
    //       error: (error) => {
    //         console.error(error);
    //       }
    //     })
    // }
    // return !isTokenExpired;
  }

  isTokenExpired(): boolean {
    if (!this.currentUserValue || !this.currentUserValue.token) return true;

    const decoded: any = jwt_decode(this.currentUserValue.token.accessToken);
    if (!decoded || !decoded.exp) return true;

    const date = new Date(0);
    date.setUTCSeconds(decoded.exp);
    return !(date.valueOf() > new Date().valueOf());
  }

  get currentUserValue(): User | null {
    if (!this.currentUserSubject) return null;

    return this.currentUserSubject.value;
  }

}
