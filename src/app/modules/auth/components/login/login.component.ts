import { Component, OnInit } from "@angular/core";
import { BaseComponent } from "src/app/modules/shared/base/base.component";
import { FormBuilder, Validators } from "@angular/forms";
import { AuthService } from "../../services/auth.service";
import { ActivatedRoute, Router } from "@angular/router";
import { HttpErrorResponse } from "@angular/common/http";
import { StorageService } from "../../../../services/storage.service";
import { UserDataModel } from "../../models";
import { NotificationService } from "src/app/services/notification.service";
import { parseApiResponse } from "src/app/utils";
import { AppConfigService } from "src/app/app-config-providers/app-config.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent extends BaseComponent implements OnInit {
  loginError: string;
  authForm = this.fb.group({
    userName: ["", [Validators.required]],
    passWord: ["", Validators.required],
    remember: [false],
  });
  queryParams = {};
  appId = null;

  constructor(
    private router: Router,
    private authService: AuthService,
    private fb: FormBuilder,
    private storage: StorageService,
    protected notificationService: NotificationService,
    private activatedRoute: ActivatedRoute,
    private config: AppConfigService
  ) {
    super();
  }

  ngOnInit() {
    this.subscribeHandleError(
      this.authService.onAuthChanged$,
      (data) => this.onSuccess(data),
      (error) => this.handleError(error)
    );
    this.authService.checkCurrentState();
    this.activatedRoute.params.subscribe((params) => {
      this.appId = params?.applicationId;
    });
    this.activatedRoute.queryParams.subscribe((params) => {
      this.queryParams = params;
    });
  }

  onSubmit() {
    this.authForm.markAllAsTouched();
    if (this.authForm.valid) {
      this.loading = true;
      this.authService.authenticate(this.authForm.value).subscribe(
        (tokenResponse) => {
          this.storage.saveTokensData(tokenResponse);
          this.getUserDetails();
        },
        (error) => this.handleError(error)
      );
    }
  }

  getUserDetails() {
    this.authService.getUserDetails(this.appId).subscribe(
      (response) => {
        this.loading = false;
        const { data } = parseApiResponse(response);
        if (data) {
          const { userDetails = {} } = data;
          try {
            this.storage.user = userDetails;
            const decodedUserDetails: UserDataModel = JSON.parse(atob(userDetails));
            this.authService.authSubject.next(decodedUserDetails);
          } catch (error) {
            this.loginError = "Failed to decode user details";
          }
        }
      },
      (error) => this.handleError(error)
    );
  }

  onSuccess(data: UserDataModel) {
    if (data != null) {
      this.router.navigate(["../"], {
        relativeTo: this.activatedRoute,
        queryParams: this.queryParams,
      });
    }
  }

  handleError(error: HttpErrorResponse) {
    this.loading = false;
    this.loginError = error?.error?.error || "Something went wrong, please try again";
  }
}
