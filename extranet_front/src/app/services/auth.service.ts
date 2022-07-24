import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpHeaders, HttpParams } from '@angular/common/http';
import { BehaviorSubject, finalize, Observable, Subscription } from 'rxjs';
import jwt_decode from 'jwt-decode';
import { User } from '../models/user';
import { JWTToken } from '../models/jwt-token';
import { Router } from '@angular/router';
import { Role } from '../models/role';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private currentUserSubject: BehaviorSubject<User | null>;

  constructor(
    private http: HttpClient,
    @Inject('API_BASE_URL') private apiBaseUrl: string,
    private router: Router
  ) {
    let currentUser = localStorage.getItem('currentUser');
    let user = null;

    if (currentUser) {
      user = JSON.parse(currentUser);
    }

    this.currentUserSubject = new BehaviorSubject<User | null>(user);
  }

  login(user: User, redirect: boolean = true): void {
    let params: HttpParams = new HttpParams()
      .set('username', user.username)
      .set('password', user.password);

    this.http.post<JWTToken>(this.apiBaseUrl + 'api/auth/login', null, { params: params })
      .subscribe({
        next: (resp: JWTToken) => {
          user.token = resp;
          // Reset password to hide it in localStorage
          user.password = '';

          // User roles
          user.roles = [];
          for (let role of this.getUserRolesFromToken(user)) {
            user.roles.push({ name: role });
          }

          localStorage.setItem('currentUser', JSON.stringify(user));
          this.currentUserSubject.next(user);
          console.log(resp['accessToken']);

          if (redirect) {
            if (!this.isUserAdmin()) {
              // Redirect to home page
              this.router.navigate(['/']);
            } else {
              this.router.navigate(['/admin']);
            }
          }
        },
        error: (error) => {
          console.error(error);
        }
      });
  }

  logout(): void {
    let headers = new HttpHeaders({
      'Authorization': 'Bearer ' + this.currentUserValue?.token?.accessToken
    });
    this.http.post(this.apiBaseUrl + 'api/auth/logout', null, { headers: headers })
      .subscribe({
        next: (resp: any) => {
          console.log(resp);
        }
      });
    this.currentUserSubject.next(null);
    localStorage.removeItem('currentUser');
    this.router.navigate(['/login']);
  }

  saveRefreshToken(token: JWTToken): void {
    let user = this.currentUserValue;
    if (!user || !token) {
      // Fail to refresh token
      this.logout();
      return;
    }

    user.token = token;
    localStorage.setItem('currentUser', JSON.stringify(user));
    this.currentUserSubject.next(user);// = new BehaviorSubject<User | null>(user);
  }

  refreshTokenRequest(): Observable<JWTToken> {
    let headers = new HttpHeaders().set('Authorization', 'Bearer ' + this.currentUserValue?.token?.refreshToken);
    console.log('refreshToken to send: ' + this.currentUserValue?.token?.refreshToken);

    return this.http.get<JWTToken>(this.apiBaseUrl + 'api/auth/refreshtoken', { headers: headers });
  }

  isAuthenticated(): boolean {
    return !!this.currentUserValue && !!this.currentUserValue.token;
  }

  isTokenExpired(): boolean {
    if (!this.currentUserValue || !this.currentUserValue.token) return true;

    const decoded: any = jwt_decode(this.currentUserValue.token.accessToken);
    if (!decoded || !decoded.exp) return true;

    const date = new Date(0);
    date.setUTCSeconds(decoded.exp);
    return !(date.valueOf() > new Date().valueOf());
  }

  private getUserRolesFromToken(user: User): string[] {
    let roles: string[] = [];

    const decoded: any = jwt_decode(user.token!.accessToken);
    // console.log(decoded);
    if (!decoded || !decoded.roles) return roles;

    return decoded.roles;
  }

  isUserAdmin(): boolean {
    if (!this.currentUserValue || !this.currentUserValue.roles) return false;

    let roles = this.currentUserValue.roles;
    return !!roles.length && !!roles.find(r => r.name === 'ADMIN');
  }

  isUser(): boolean {
    let roles = this.currentUserValue!.roles!;
    return !!roles.length && !!roles.find(r => r.name === 'USER');
  }

  get currentUserValue(): User | null {
    if (!this.currentUserSubject) return null;

    return this.currentUserSubject.value;
  }

}
