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
          { provide: Router, useValue: mockRouter },
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
    expect(userId.valid).toBeFalsy();
    errors = userId.errors || {};
    // @ts-ignore
    expect(errors["required"]).toBeTruthy();
    userId.setValue("sdale");
    errors = userId.errors || {};
    // @ts-ignore
    expect(errors["required"]).toBeFalsy();
  });
  it("Password field validity", () => {
    let errors = {};
    let password = component.authForm.controls[authControls.password];
    expect(password.valid).toBeFalsy();
    errors = password.errors || {};
    // @ts-ignore
    expect(errors["required"]).toBeTruthy();
    password.setValue("sdale");
    errors = password.errors || {};
    // @ts-ignore
    expect(errors["required"]).toBeFalsy();
  });
  it("Form should be valid if user enter userId and password", () => {
    updateAuthForm("sdale", "sdale");
    expect(component.authForm.valid).toBeTruthy();
  });
  it("On Submission Of Form , Validate and redirect to groups", () => {
    updateAuthForm("sdale", "sdale");
    expect(component.authForm.valid).toBeTruthy();
    component.onSubmit();
    expect(storageService.user).toEqual({ userId: "sdale", roles: ["Admin", "Manager"] });
  });
  it("On Success It should Redirect to groups", () => {
    component.onSuccess({} as UserDataModel);
    expect(router._route).toEqual(["/groups"]);
  });
  // it('Should return true if not logged in', () => {
  //   expect(authService.getCurrentUser()).toBeFalsy();
  // });
  // it('Should return user if logged in', inject([StorageService], (service: StorageService) => {
  //   service.user = { userId: 'vijay' } as UserDataModel;
  //   expect(authService.getCurrentUser()).toEqual({ userId: 'vijay' });
  // }));
});
