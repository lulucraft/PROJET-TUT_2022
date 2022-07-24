import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient, @Inject('API_BASE_URL') private apiBaseUrl: string, private authService: AuthService) { }

  // USER
  // getCongesAcquis(): Observable<number> {
  //   let params: HttpParams = new HttpParams().set('username', this.authService.currentUserValue!.username);

  //   return this.http.get<number>(this.apiBaseUrl + 'api/user/congesacquis', { params: params });
  // }

  // deleteCongeRequest(congeId: number): Observable<string> {
  //   return this.http.post<string>(this.apiBaseUrl + 'api/user/deletecongesrequest', congeId);
  // }

  // getNewUsers(): Observable<User[]> {
  //   return this.http.get<User[]>(this.apiBaseUrl + 'api/user/newusers');
  // }

  // getNewsletter(newsletterType: NewsletterType): Observable<Newsletter> {
  //   return this.http.get<Newsletter>(this.apiBaseUrl + 'api/user/newsletter', { params: new HttpParams().set('newsletterType', newsletterType.toString()) });
  // }

  // ADMIN
  // getCongesAdmin(): Observable<{user: Conge[]}> {
  //   return this.http.get<{user: Conge[]}>(this.apiBaseUrl + 'api/admin/conges');
  // }

  // sendCongeValidation(conge: Conge): Observable<any> {
  //   return this.http.post(this.apiBaseUrl + 'api/admin/validateconge', conge)
  // }

}
