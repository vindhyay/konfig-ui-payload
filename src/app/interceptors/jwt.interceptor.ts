import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { EMPTY, Observable } from 'rxjs';
import { StorageService } from 'src/app/services/storage.service';
import { AuthService } from '../modules/auth/services/auth.service';
import { AppConfigService } from '../app-config-providers/app-config.service';

/**
 * To add token to every http request except config.json URL
 */

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  apiUrls: any;
  constructor(private storage: StorageService, private authService: AuthService, private config: AppConfigService) {}
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.apiUrls = this.config.getApiUrls();
    if (
      this.authService.isAuthenticated() ||
      request.url.indexOf('/assets/config/config.json') > -1 ||
      request.url === this.apiUrls.logoutURL ||
      request.url === this.apiUrls.authenticateUrl ||
      request.url === this.apiUrls.loginURL
    ) {
      const cloneRequest = request.clone({
        setHeaders: {
          'Cache-Control': 'no-cache, no-store, must-revalidate, post-check=0, pre-check=0',
          Pragma: 'no-cache',
          Expires: '0'
        }
      });
      return next.handle(cloneRequest);
    } else {
      this.authService.logoff(false);
      return EMPTY;
    }
  }
}
