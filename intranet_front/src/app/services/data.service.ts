import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient, @Inject('API_BASE_URL') private apiBaseUrl: string, private authService: AuthService) { }

  getCongesAcquis(): Observable<number> {
    let params: HttpParams = new HttpParams().set('username', this.authService.currentUserValue!.username);

    return this.http.get<number>(this.apiBaseUrl + 'api/user/congesacquis', { params: params });
  }

  getConges(): Observable<any[]> {
    let params: HttpParams = new HttpParams().set('username', this.authService.currentUserValue!.username);

    return this.http.get<any[]>(this.apiBaseUrl + 'api/user/conges', { params: params });
  }

}
