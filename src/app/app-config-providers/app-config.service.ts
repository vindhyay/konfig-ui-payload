import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConfigUrlsModel } from '../state/model/config-urls-model';
import { CONFIG_FILE_PATH } from '../state/constants';

@Injectable({
  providedIn: 'root'
})
export class AppConfigService {
  private apiUrls: Object = {};
  private _envDisabledFields: any = [];

  constructor(private http: HttpClient) {}

  public loadAppConfig(): Promise<any> {
    return this.getConfigFile().then(config => {
      this.apiUrls = this.appendBaseUrls(config);
      return this.apiUrls;
    });
  }

  private getConfigFile(): Promise<ConfigUrlsModel> {
    return this.http
      .get(CONFIG_FILE_PATH)
      .toPromise()
      .then((config: any) => {
        return config;
      });
  }

  public getApiUrls(): any {
    return this.apiUrls;
  }

  public get envDisabledFields() {
    return this._envDisabledFields;
  }

  private appendBaseUrls(config: ConfigUrlsModel = {} as ConfigUrlsModel) {
    const WORKFLOW_ADMIN_BASE_URL = config.workflowAdminBaseURL || '';
    const AUTH_BASE_URL = config.authBaseUrl || '';
    const TRANSFORMATIONS_UI_URL = config.transformationsUiURL;
    return {
      transformationsUiURL: TRANSFORMATIONS_UI_URL,
      authenticateUrl: AUTH_BASE_URL + '/authenticate',
      logoutURL: AUTH_BASE_URL + '/logout',
      loginURL: WORKFLOW_ADMIN_BASE_URL + '/rest/permissions',

    };
  }

}
