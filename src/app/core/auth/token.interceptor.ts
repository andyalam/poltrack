import {
    HttpEvent,
    HttpHandler,
    HttpInterceptor,
    HttpRequest
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as hello from 'hellojs';
import { Observable } from 'rxjs/Observable';

// import { AuthService } from './auth.service';
import AuthConfig from '@app/core/auth/auth.config';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
    constructor() { }
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        const authResponse = hello(AuthConfig.HelloJsB2CSignInNetwork).getAuthResponse();

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
