import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { BehaviorSubject, finalize, Observable } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private currentUserSubject: BehaviorSubject<User> | undefined;
  private currentUser: Observable<User> | undefined;

  constructor(private http: HttpClient, @Inject('API_BASE_URL') private apiBaseUrl: string) {
    let currentUser = localStorage.getItem('currentUser');
    if (currentUser) {
      this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(currentUser));
      this.currentUser = this.currentUserSubject.asObservable();
    }
  }

  login(user: { username: string, password: string }): any {
    let params: HttpParams = new HttpParams()
      .set('username', user.username)
      .set('password', user.password);

    let headers: HttpHeaders = new HttpHeaders()
      .set('Content-Type', 'application/x-www-form-urlencoded');

    this.http.post(this.apiBaseUrl + 'api/auth/login', { headers: headers, params: params }).pipe(
      finalize(() => {
        //console.log(resp['accessToken']);
      })
    ).subscribe((resp: any) => {
      console.log(resp['accessToken']);
    });
  }

  logout(): void {
    this.http.post('logout', {}).pipe(
      finalize(() => {
      })
    ).subscribe();
  }

  isAuthenticated(): boolean {
    return !!this.currentUserSubject;
  }

}
