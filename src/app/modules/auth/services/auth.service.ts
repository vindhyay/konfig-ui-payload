import { Injectable, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject, Subscription } from 'rxjs';
import {ActivatedRoute, Router} from '@angular/router';
import { StorageService } from 'src/app/services/storage.service';
import { BaseService } from '../../../services/base.service';
import { LoginDataModel, UserDataModel, SelectedPreferencesModel, UserRole } from '../models';
import {AppConfigService} from "../../../app-config-providers/app-config.service";
import {UserService} from "../../user/services/user.service";

@Injectable({
  providedIn: 'root'
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
    protected userService: UserService,
    private activatedRoute: ActivatedRoute
  ) {
    super(http);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.authSubject.complete();
  }

  public isAuthenticated(): boolean {
    // Check whether the token is expired and return
    // true or false
    // TODO: implement some authentication engine:
    // return !this.jwtHelper.isTokenExpired(token);

    return !!this.storage.user;
  }

  public logoff(api: boolean = true, activatedRoute?: ActivatedRoute) {
    if (api) {
      const url = this.config.getApiUrls().logoutURL;
      this.getData(url).subscribe(
        result => {
          console.log('result', result);
        },
        error => {
          console.log(error);
        }
      );
    }
    this.userService.selection.next(null);
    this.authSubject.next(null);
    this.storage.clear();
    this.router.navigate(['./auth'], {
      relativeTo: activatedRoute
    });
  }

  public authenticate(loginData: LoginDataModel) {
    this.storage.clear();
    const url = this.config.getApiUrls().authenticateUrl;
    return this.postData(url, loginData);
  }

  public getUserDetails() {
    const url = this.config.getApiUrls().loginURL;
    return this.getData(url);
  }

  public checkCurrentState() {
    const currentUser: UserDataModel = this.getCurrentUser();
    this.authSubject.next(currentUser);
  }

  public getCurrentUser(): UserDataModel {
    if (this.isAuthenticated()) {
      try {
        return JSON.parse(atob(this.storage.user));
      } catch (error) {
        console.log('Failed to parse user details');
      }
    }
    return null;
  }

  public getCurrentPreference(): SelectedPreferencesModel {
    if (this.isAuthenticated()) {
      return this.storage.preference;
    }
    return null;
  }

  getAppAuthToken() {
    const authData = {
      userName: 'AccountOpening',
      passWord: 'acctOpening'
    };
    const url = this.config.getApiUrls().authenticateUrl;
    return this.postData(url, authData, {});
  }

  isAgent(workflowId: any) {
    let id = workflowId;
    let role = UserRole.Agent;
    return this.checkCurrentRole(role) && this.checkResourceAccess(role, id);
  }

  isSupport(workflowId: any) {
    let id = workflowId;
    let role = UserRole.Support;
    return this.checkCurrentRole(role) && this.checkResourceAccess(role, id);
  }

  checkCurrentRole(role: string) {
    let isExists = false;
    const { selectedRole: { originalName = '' } = {} } = this.userService.selection.value || {};
    if (originalName.toLowerCase() === role.toLowerCase()) {
      isExists = true;
    }
    return isExists;
  }

  checkResourceAccess(role: string | number, id: any) {
    let isExists = false;
    const currentUser = this.getCurrentUser() || ({} as UserDataModel);
    const permissions = currentUser.permissions || null;
    if (permissions && permissions[role] && permissions[role].includes(id)) {
      isExists = true;
    }
    return isExists;
  }
}
