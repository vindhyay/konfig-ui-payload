import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { AuthService } from "../../auth/services/auth.service";
import { BaseComponent } from "../../shared/base/base.component";
import { NotificationService } from "../../../services/notification.service";
import { UserDataModel } from "../../auth/models";
import { addOriginalPosition, getFieldFromFields, parseApiResponse } from "../../../utils";
import { EditorService } from "../editor.service";

@Component({
  selector: "app-payload-details",
  templateUrl: "./payload-details.component.html",
  styleUrls: ["./payload-details.component.scss"],
})
export class PayloadDetailsComponent extends BaseComponent implements OnInit {
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private authService: AuthService,
    private notificationService: NotificationService,
    private editorService: EditorService
  ) {
    super();
  }
  applicationId: string | null = "";
  transactionDetails: any = {};
  formFields: any = [];
  currentUser: UserDataModel | undefined;
  showActions: boolean = true;
  sessionFields = {};
  ngOnInit(): void {
    this.currentUser = this.authService.getCurrentUser();
    this.activatedRoute.queryParamMap.subscribe((queryParams: any) => {
      this.sessionFields = Object.keys(queryParams.params).length
        ? queryParams.params
        : { name: this.currentUser?.name, userId: this.currentUser?.userId, email: this.currentUser?.emailId };
    });
    this.applicationId = this.activatedRoute.snapshot?.params?.applicationId;
    if (this.applicationId) {
      this.authService.updateUserDetails(this.applicationId);
      this.createTransaction(this.applicationId, this.transactionDetails?.id);
    }
    this.subscribe(this.editorService.loaderStatus$, (loader) => {
      this.loading = loader;
    });
    this.subscribe(this.editorService.transactionDetails$, (transactionDetails) => {
      if (transactionDetails) {
        if (this.formFields.length) {
          if (
            this.formFields?.length !== transactionDetails?.uiPayload?.length ||
            this.transactionDetails?.screenId !== transactionDetails?.screenId
          ) {
            // Directly updating form fields
            this.formFields = transactionDetails?.uiPayload || [];
          } else {
            // indirectly updating form fields
            const newFormFields = transactionDetails.uiPayload || [];
            this.recursiveUpdateFieldProperties(this.formFields, newFormFields);
          }
        } else {
          this.formFields = transactionDetails?.uiPayload || [];
        }
        addOriginalPosition(this.formFields);
        this.transactionDetails = transactionDetails;
        this.editorService.setFormFields(this.formFields);
        this.formFields = this.formFields.sort((a, b) => a?.y - b?.y);
      }
    });
  }
  createTransaction(applicationId: string, id = "") {
    this.editorService.showLoader();
    this.editorService
      .createTransaction({ applicationId, ...(id && { id }) }, { sessionData: this.sessionFields })
      .subscribe(
        (result) => {
          const { data: transactionDetails, error } = parseApiResponse(result);
          if (transactionDetails && !error) {
            this.editorService.setTransactionDetails(transactionDetails);
          } else {
            this.notificationService.error(error.errorMessage);
          }
          this.editorService.hideLoader();
        },
        (error) => {
          this.editorService.hideLoader();
          if (error.status === 401) {
            this.authService.logoff(false, this.activatedRoute);
          }
          if (error.status === 500) {
            this.notificationService.error(error?.error?.error?.errorMessage);
            this.authService.logoff(false, this.activatedRoute);
          }
        }
      );
  }

  recursiveUpdateFieldProperties(formFields = [], newFormFields = []) {
    newFormFields.forEach((newField) => {
      const findField = getFieldFromFields(formFields, newField.id);
      if (findField) {
        for (const prop in newField) {
          if (prop !== "children") {
            findField[prop] = newField[prop];
          } else {
            this.recursiveUpdateFieldProperties(findField?.children, newField?.children);
          }
        }
      } else {
        formFields.push(newField);
      }
    });
  }
}
