import { Injectable } from '@angular/core';
import { AuthService } from '../modules/auth/services/auth.service';
import { StorageService } from './storage.service';
import { AppConfigService } from '../app-config-providers/app-config.service';
import { ACCESS_TOKEN, REFRESH_TOKEN } from '../state/constants';

@Injectable({
  providedIn: 'root'
})
export class TokenRefreshService {
  private timerID: any;

  constructor(private auth: AuthService, private storage: StorageService, private config: AppConfigService) { }

  scheduleTokenRefresh() {
    const accessExpiration = this.storage.getTimeToExpiration(ACCESS_TOKEN);
    if (this.timerID) {
      clearTimeout(this.timerID);
      this.timerID = null;
    }
    this.timerID = setTimeout(() => {
      const refreshToken = this.storage.getToken(REFRESH_TOKEN);
      this.auth.getAccessToken({ refreshToken })
      .subscribe(data => {
        this.storage.saveTokensData(data, this.config.getDomain())
        this.auth.checkCurrentState();
      });
    }, accessExpiration);
  }

  cancelTokenRefresh() {
    if(this.timerID) {
      clearTimeout(this.timerID);
      this.timerID = null;
    }
  }
}
