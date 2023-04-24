import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { AuthService } from "../../auth/services/auth.service";
import { BaseComponent } from "../../shared/base/base.component";
import { NotificationService } from "../../../services/notification.service";
import { UserDataModel } from "../../auth/models";
import { addOriginalPosition, getFieldFromFields, parseApiResponse, validateFields } from "../../../utils";
import { EditorService } from "../editor.service";
import { LoaderService } from "../../../services/loader.service";
import { IStyleConfig, WidgetTypes } from "../model/create-form.models";

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
    private editorService: EditorService,
    private loaderService: LoaderService
  ) {
    super();
  }
  applicationId: string | null = "";
  transactionDetails: any = {};
  formFields: any = [];
  currentUser: UserDataModel | undefined;
  styleConfig: IStyleConfig = {} as IStyleConfig;
  sessionFields = {};
  ngOnInit(): void {
    this.editorService.setTransactionDetails({});
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
    this.subscribe(this.loaderService.getLoadingStatus(), (loader) => {
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
            this.editorService.onPopulateTriggerCondition(this.formFields);
            // setTimeout(() => {
            //   this.editorService.onPopulateTriggerCondition(this.formFields);
            // }, 0);
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
  createTransaction(applicationId: string, id: string = "") {
    this.loading = true;
    this.editorService
      .createTransaction({ applicationId, ...(id && { id }) }, { sessionData: this.sessionFields })
      .subscribe(
        (result) => {
          const { data: transactionDetails } = parseApiResponse(result);
          if (transactionDetails) {
            this.editorService.setTransactionDetails(transactionDetails);
            this.styleConfig = transactionDetails?.application?.styleConfig;
            this.editorService.setConditionDetails(transactionDetails?.conditionRules);
          }
          this.loading = false;
        },
        (error) => {
          this.loading = false;
          if (error.status === 401) {
            this.authService.logoff(false);
          }
          if (error.status === 500) {
            this.notificationService.error(error?.error?.error);
            this.authService.logoff(false);
          }
        }
      );
  }

  recursiveUpdateFieldProperties(formFields = [], newFormFields = []) {
    newFormFields.forEach((newField) => {
      const findField = getFieldFromFields(formFields, newField.widgetId);
      if (findField) {
        for (const prop in newField) {
          // value and children are special properties need to handle differently
          // check key is children if yes add all child properties recursively
          if (prop !== "children" || findField?.metaData?.widgetType === WidgetTypes.AdvTable) {
            findField[prop] = newField[prop];
          } else {
            this.recursiveUpdateFieldProperties(findField?.children, newField?.children);
          }
          // check if key is value if yes check for value structure {id, value} if not add default value
          if (prop === "value") {
            findField[prop] = Object(newField[prop] || {}).hasOwnProperty("value")
              ? newField[prop]
              : { id: null, value: null };
          }
        }
      } else {
        formFields.push(newField);
      }
    });
  }
}
