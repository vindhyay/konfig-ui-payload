import { Injectable, OnDestroy } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Subject, Subscription } from "rxjs";
import { ActivatedRoute, Router } from "@angular/router";
import { StorageService } from "src/app/services/storage.service";
import { BaseService } from "../../../services/base.service";
import { LoginDataModel, UserDataModel, UserRole } from "../models";
import { AppConfigService } from "../../../app-config-providers/app-config.service";
import { parseApiResponse } from "../../../utils";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "src/app/state/constants";

@Injectable({
  providedIn: "root",
})
export class AuthService extends BaseService implements OnDestroy {
  private subscription = new Subscription();
  public authSubject = new Subject<UserDataModel>();

  public onAuthChanged$ = this.authSubject.asObservable();

  constructor(
    protected storage: StorageService,
    protected http: HttpClient,
    private router: Router,
    protected config: AppConfigService,
    private activatedRoute: ActivatedRoute
  ) {
    super(http);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.authSubject.complete();
  }

  public logoff(api: boolean = true) {
    if (api) {
      const url = this.config.getApiUrls().logoutURL;
      const refreshToken = this.storage.getToken(REFRESH_TOKEN);
      const data = { refreshToken };
      this.postData(url, data).subscribe(
        (result) => {
          console.log("result", result);
        },
        (error) => {
          console.log(error);
        }
      );
    }
    this.authSubject.next(null);
    this.storage.clear();
    this.activatedRoute.firstChild.queryParams.subscribe((params) => {
      const queryParams = params;
      const pathParams = this.activatedRoute.snapshot.firstChild.params;
      this.router.navigate([pathParams?.applicationId + "/auth"], {
        queryParams: queryParams,
        relativeTo: this.activatedRoute,
      });
    });
  }

  public authenticate(loginData: LoginDataModel) {
    this.storage.clear();
    const url = this.config.getApiUrls().authenticateUrl;
    return this.postData(url, loginData);
  }

  public getAccessToken(refreshTokenData) {
    const url = this.config.getApiUrls().getAccessTokenUrl;
    return this.postData(url, refreshTokenData);
  }

  public getUserDetails(appId) {
    const url = `${this.config.getApiUrls().loginUrl}/${appId}`;
    return this.getData(url);
  }

  public updateUserDetails(appId) {
    this.getUserDetails(appId).subscribe((response) => {
      const { data, error } = parseApiResponse(response);
      if (data && !error) {
        const { userDetails = {} } = data;
        try {
          this.storage.user = userDetails;
        } catch (error) {
          console.log("failed to decode details", error);
        }
      }
    });
  }

  public checkCurrentState() {
    const currentUser: UserDataModel = this.getCurrentUser();
    this.authSubject.next(currentUser);
  }

  public isAuthenticated(): boolean {
    return !!(this.storage.getToken(ACCESS_TOKEN) || this.storage.getToken(REFRESH_TOKEN));
  }

  public getCurrentUser(): UserDataModel {
    if (this.isAuthenticated()) {
      try {
        return JSON.parse(atob(this.storage.user));
      } catch (error) {
        console.log("Failed to parse user details");
      }
    }
    return null;
  }

  getAgentRole() {
    const roles = this.getCurrentUser()?.roles || [];
    return roles.find((role) => role.originalName === UserRole.Agent);
  }
}
