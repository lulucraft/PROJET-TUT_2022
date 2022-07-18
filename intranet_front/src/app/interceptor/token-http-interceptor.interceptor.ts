import { Injectable, Injector } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable()
export class TokenHttpInterceptorInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) { }//private inject: Injector) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    // Add token to http request
    const req = request.clone({ headers: request.headers.set('Authorization', 'Bearer ' + this.authService.currentUserValue?.token?.accessToken) })

    return next.handle(req).pipe(
      catchError(error => {
        // If user not authenticated
        if (!this.authService.currentUserValue || !this.authService.currentUserValue.token) {
          this.authService.logout();
        }

        // If token expired
        if (this.authService.isTokenExpired()) {
          // Try to refresh token
          this.authService.refreshToken();
        }

        return throwError(() => console.error(error));
      })
    );
  }
}
