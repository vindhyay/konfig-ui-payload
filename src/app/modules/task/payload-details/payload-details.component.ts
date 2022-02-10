import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { AuthService } from "../../auth/services/auth.service";
import { BaseComponent } from "../../shared/base/base.component";
import { NotificationService } from "../../../services/notification.service";
import { UserDataModel } from "../../auth/models";
import { addOriginalPosition, parseApiResponse } from "../../../utils";
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
            this.formFields = transactionDetails?.uiPayload || [];
            addOriginalPosition(this.formFields);
          } else {
            this.formFields.forEach((element, index) => {
              for (const prop in element) {
                if (prop === "children") {
                  this.formFields[index][prop].forEach((subelement, subindex) => {
                    for (const subprop in subelement) {
                      this.formFields[index][prop][subindex][subprop] =
                        transactionDetails.uiPayload[index][prop][subindex][subprop];
                    }
                  });
                } else if (prop === "value") {
                  if (!element[prop] || typeof element[prop] != "object" || !element[prop]?.value) {
                    this.formFields[index][prop] = {
                      ...transactionDetails.uiPayload[index][prop],
                      value: transactionDetails.uiPayload[index][prop].value
                        ? transactionDetails.uiPayload[index][prop].value
                        : null,
                    };
                  }
                } else if (this.formFields[index][prop] !== transactionDetails.uiPayload[index][prop]) {
                  this.formFields[index][prop] = transactionDetails.uiPayload[index][prop];
                }
              }
            });
          }
        } else {
          this.formFields = transactionDetails?.uiPayload || [];
          addOriginalPosition(this.formFields);
        }
        this.transactionDetails = transactionDetails;
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
}
