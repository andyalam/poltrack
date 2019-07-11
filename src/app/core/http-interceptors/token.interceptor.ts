import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as hello from 'hellojs';
import { Observable } from 'rxjs';

// import { AuthService } from './auth.service';
import AuthConfig from '@app/core/auth/auth.config';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor() {}
  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const authResponse = hello(
      AuthConfig.HelloJsB2CSignInNetwork
    ).getAuthResponse();

    if (authResponse && authResponse.access_token) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${authResponse.access_token}`
        }
      });
    }
    return next.handle(request);
  }
}
