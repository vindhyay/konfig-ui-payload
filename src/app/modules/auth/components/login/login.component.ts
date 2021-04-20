import { Component, OnInit } from '@angular/core';
import { BaseComponent } from 'src/app/modules/shared/base/base.component';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { StorageService } from '../../../../services/storage.service';
import { get } from 'lodash';
import { AUTH_LABELS } from '../../state/labels';
import { UserDataModel } from '../../models';
import { NotificationService } from 'src/app/services/notification.service';
import { parseApiResponse } from 'src/app/utils';
import {CustomError} from "../../../../state/model/custom-error";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['../../auth.scss']
})
export class LoginComponent extends BaseComponent implements OnInit {
  LABELS = AUTH_LABELS;
  loginError: string | undefined;
  authForm = this.fb.group({
    userName: ['', [Validators.required]],
    passWord: ['', Validators.required],
    remember: [false]
  });

  constructor(
    private router: Router,
    private authService: AuthService,
    private fb: FormBuilder,
    private storage: StorageService,
    protected notificationService: NotificationService
  ) {
    super();
  }

  ngOnInit() {
    this.subscribeHandleError(
      this.authService.onAuthChanged$,
      data => this.onSuccess(data),
      error => this.handleError(error)
    );
    this.authService.checkCurrentState();
  }

  onSubmit() {
    this.authForm.markAllAsTouched();
    if (this.authForm.valid) {
      this.loading = true;
      this.authService.authenticate(this.authForm.value).subscribe(
        tokenResponse => {
          this.getUserDetails();
        },
        error => this.handleError(error)
      );
    }
  }

  getUserDetails() {
    this.authService.getUserDetails().subscribe(
      response => {
        this.loading = false;
        const { data, error } = parseApiResponse(response);
        if (data && !error) {
          const { userDetails = {} } = data;
          try {
            this.storage.user = userDetails;
            const decodedUserDetails: UserDataModel = JSON.parse(atob(userDetails));
            console.log(decodedUserDetails);
            this.authService.authSubject.next(decodedUserDetails);
          } catch (error) {
            this.loginError = 'Failed to decode user details';
          }
        } else {
          this.notificationService.error(error.errorMessage);
        }
      },
      error => this.handleError(error)
    );
  }

  onSuccess(data: UserDataModel) {
    console.log('on success')
    // this.router.navigate(['../']);
  }

  handleError(error: HttpErrorResponse | CustomError) {
    this.loading = false;
    this.loginError = get(error, 'error.error') || 'Something went wrong, please try again';
  }
}
