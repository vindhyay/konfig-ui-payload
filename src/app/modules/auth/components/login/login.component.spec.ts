import { ComponentFixture, fakeAsync, flushMicrotasks, TestBed, tick, waitForAsync } from "@angular/core/testing";
import { HttpClientTestingModule } from "@angular/common/http/testing";

import { LoginComponent } from "./login.component";
import { SharedModule } from "../../../shared/shared.module";
import { AuthService } from "../../services/auth.service";
import { StorageService } from "../../../../services/storage.service";
import { RouterTestingModule } from "@angular/router/testing";
import { Router } from "@angular/router";
import { of, Subject } from "rxjs";
import { APP_BASE_HREF, LocationStrategy, PathLocationStrategy } from "@angular/common";
import { UserDataModel } from "../../models";
import { FormBuilder } from "@angular/forms";
import { AppConfigService } from "src/app/app-config-providers/app-config.service";
import { NotificationService } from "src/app/services/notification.service";
import { HttpErrorResponse } from "@angular/common/http";
import { ActiveToast, IndividualConfig, ToastrService } from "ngx-toastr";

export class MockToastrService extends ToastrService {
  toasts: ActiveToast<any>[] = [];
 
  constructor() {
    super(null, null, null, null, null);
  }
 
  show(message?: string, title?: string, override?: Partial<IndividualConfig>, type?: string): ActiveToast<any> {
    return;
  }
}

describe("LoginComponent", () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let compiled: HTMLElement;
  let authService: AuthService;
  let storageService: { user: any };
  let router: { _route: any };
  const authControls = { userId: "userId", password: "password" };
  function updateAuthForm(userIdValue: string, passwordValue: string) {
    let userId = component.authForm.controls[authControls.userId];
    let password = component.authForm.controls[authControls.password];
    userId.setValue(userIdValue);
    password.setValue(passwordValue);
  }
  beforeEach(
    waitForAsync(() => {
      const mockStorageService = {
        get user() {
          return "";
        },
        set user(value) {},
      };
      const mockRouter = {
        _route: "",
        navigate: function (url: string) {
          this._route = url;
        },
      };
      const authSubject = new Subject<UserDataModel>();
      const mockAuthService = {
        authenticate: () => of({ data: { userId: "sdale", roles: ["Admin", "Manager"] } }),
        authSubject: authSubject,
        onAuthChanged$: authSubject.asObservable(),
        checkCurrentState: () => authSubject.next({} as UserDataModel),
      };
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule, SharedModule, RouterTestingModule],
        providers: [
          { provide: APP_BASE_HREF, useValue: "/" },
          Location,
          { provide: LocationStrategy, useClass: PathLocationStrategy },
          { provide: AuthService, useValue: mockAuthService },
          { provide: StorageService, useValue: mockStorageService },
          // { provide: Router, useValue: mockRouter },
          FormBuilder,
          NotificationService,
          { provide: ToastrService, useValue: MockToastrService },
          AppConfigService,
        ],
        declarations: [LoginComponent],
      }).compileComponents();
      authService = TestBed.get(AuthService);
      storageService = TestBed.get(StorageService);
      router = TestBed.get(Router);
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    spyOn(component, "onSuccess").and.callThrough();
    spyOn(component, "handleError").and.callThrough();
    compiled = fixture.debugElement.nativeElement;
  });
  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("ON Init Check for Auth Status", () => {
    component.ngOnInit();
    expect(component.onSuccess).toHaveBeenCalledTimes(1);
  });
  it("Auth form invalid when empty", () => {
    expect(component.authForm.valid).toBeFalsy();
  });

  it("user Id field validity", () => {
    let errors = {};
    let userId = component.authForm.controls[authControls.userId];
    expect(userId?.valid).toBeFalsy();
    errors = userId?.errors || {};
    userId?.setValue("sdale");
    errors = userId?.errors || {};
    expect(errors["required"]).toBeFalsy();
  });

  it("Password field validity", () => {
    let errors = {};
    let password = component.authForm.controls[authControls.password];
    expect(password?.valid).toBeFalsy();
    errors = password?.errors || {};
    password?.setValue("sdale");
    errors = password?.errors || {};
    expect(errors["required"]).toBeFalsy();
  });

  // it("Form should be valid if user enter userId and password", () => {
  //   updateAuthForm("sdale", "sdale");
  //   expect(component.authForm.valid).toBeTruthy();
  // });
  // it("On Submission Of Form , Validate and redirect to groups", () => {
  //   updateAuthForm("sdale", "sdale");
  //   expect(component.authForm.valid).toBeTruthy();
  //   component.onSubmit();
  //   expect(storageService.user).toEqual({ userId: "sdale", roles: ["Admin", "Manager"] });
  // });
  // it("On Success It should Redirect to groups", () => {
  //   component.onSuccess({} as UserDataModel);
  //   expect(router._route).toEqual(["/groups"]);
  // });
  // it('Should return true if not logged in', () => {
  //   expect(authService.getCurrentUser()).toBeFalsy();
  // });
  // it('Should return user if logged in', inject([StorageService], (service: StorageService) => {
  //   service.user = { userId: 'vijay' } as UserDataModel;
  //   expect(authService.getCurrentUser()).toEqual({ userId: 'vijay' });
  // }));

  it("should set loading to false and set the loginError message from the error object", () => {
    const mockError = new HttpErrorResponse({
      error: { error: "Custom error message" },
    });

    component.handleError(mockError);

    expect(component.loading).toBe(false);
    expect(component.loginError).toBe("Custom error message");
  });

  it("should set loading to false and provide a default message when error object is not available", () => {
    const mockError = new HttpErrorResponse({});

    component.handleError(mockError);

    expect(component.loading).toBe(false);
    expect(component.loginError).toBe("Something went wrong, please try again");
  });
});
