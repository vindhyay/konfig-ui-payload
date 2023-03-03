import { Injectable } from "@angular/core";
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { EMPTY, Observable } from "rxjs";
import { StorageService } from "src/app/services/storage.service";
import { AuthService } from "../modules/auth/services/auth.service";
import { AppConfigService } from "../app-config-providers/app-config.service";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../state/constants";
import { switchMap } from "rxjs/operators";

/**
 * To add token to every http request except config.json URL
 */

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  apiUrls: any;
  constructor(private storage: StorageService, private authService: AuthService, private config: AppConfigService) {}
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.apiUrls = this.config.getApiUrls();
    const refreshToken = this.storage.getToken(REFRESH_TOKEN);
    const accessToken = this.storage.getToken(ACCESS_TOKEN);
    if (
      accessToken ||
      request.url.indexOf("/assets/config/config.json") > -1 ||
      request.url === this.apiUrls.authenticateUrl ||
      request.url === this.apiUrls.getAccessTokenUrl
    ) {
      return next.handle(this.injectToken(request));
    } else if (refreshToken) {
      return this.authService.getAccessToken({ refreshToken }).pipe(
        switchMap((authResponse) => {
          this.storage.saveTokensData(authResponse);
          this.authService.checkCurrentState();
          return next.handle(this.injectToken(request));
        })
      );
    } else {
      this.authService.logoff(false);
      return EMPTY;
    }
  }
  injectToken(request: HttpRequest<any>) {
    const token = this.storage.getToken(ACCESS_TOKEN);
    const { id = "" } = this.authService.getAgentRole() || {};
    return request.clone({
      setHeaders: {
        "Cache-Control": "no-cache, no-store, must-revalidate, post-check=0, pre-check=0",
        Pragma: "no-cache",
        Expires: "0",
        ...(id && { rId: id }),
        Authorization: `Bearer ${token}`,
      },
    });
  }
}
