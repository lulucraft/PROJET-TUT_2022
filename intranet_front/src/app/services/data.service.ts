import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  // private headers: HttpHeaders = new HttpHeaders().set('Authorization', 'Bearer ' + this.authService.currentUserValue!.token?.accessToken);

  constructor(private http: HttpClient, @Inject('API_BASE_URL') private apiBaseUrl: string, private authService: AuthService) { }

  getCongesAcquis(): Observable<number> {
    let params: HttpParams = new HttpParams().set('username', this.authService.currentUserValue!.username);

    return this.http.get<number>(this.apiBaseUrl + 'api/user/congesacquis', { params: params });//headers: this.headers,
  }

  getConges(): Observable<any[]> {
    // if (!await this.authService.onCheckAuth()) return null;

    let params: HttpParams = new HttpParams().set('username', this.authService.currentUserValue!.username);

    return this.http.get<any[]>(this.apiBaseUrl + 'api/user/conges', { params: params });//headers: this.headers,
  }

}
