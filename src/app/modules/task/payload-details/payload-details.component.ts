import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { QUEUE_TYPES } from "../../../state/model/queue-types-model";
import { UserService } from "../../user/services/user.service";
import { AuthService } from "../../auth/services/auth.service";
import { BaseComponent } from "../../shared/base/base.component";
import { NotificationService } from "../../../services/notification.service";
import { UserDataModel } from "../../auth/models";
import { addOriginalPosition, getValueFromObjectByPath, parseApiResponse } from "../../../utils";
import { TaskService } from "../services/task.service";
import { BaseWidget, DATA_TYPES, WidgetTypes } from "../model/create-form.models";
import { EditorService } from "../editor.service";

@Component({
  selector: "app-payload-details",
  templateUrl: "./payload-details.component.html",
  styleUrls: ["./payload-details.component.scss"]
})
export class PayloadDetailsComponent extends BaseComponent implements OnInit {
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private userService: UserService,
    private authService: AuthService,
    private notificationService: NotificationService,
    private taskService: TaskService,
    private editorService: EditorService
  ) {
    super();
  }
  screenHeight: number;
  screenWidth: number;
  applicationId: string | null = "";
  transactionDetails: any = {};
  id: any;
  formFields: any = [];
  currentUser: UserDataModel | undefined;
  showActions: boolean = true;
  queueType: QUEUE_TYPES = QUEUE_TYPES.NEW;
  sessionFields = {};
  ngOnInit(): void {
    this.currentUser = this.authService.getCurrentUser();
    this.queueType = getValueFromObjectByPath(this.activatedRoute, "snapshot.data.queueType");
    this.activatedRoute.queryParamMap.subscribe((queryParams: any) => {
      this.sessionFields = Object.keys(queryParams.params).length
        ? queryParams.params
        : { name: this.currentUser?.name, userId: this.currentUser?.userId, email: this.currentUser?.emailId };
    });
    this.applicationId = this.activatedRoute.snapshot?.params?.applicationId
    if (this.applicationId) {
      this.authService.updateUserDetails(this.applicationId);
      this.createTransaction(this.applicationId, this.id);
    }
    this.taskService.transactionDetailsSubject.subscribe(value => {
      if (value) {
        this.transactionDetails = value;
        this.formFields = value?.uiPayload || [];
        this.formFields = this.formFields.sort((a,b)=> a?.y - b?.y);
        const header = this.formFields.find(item => item?.metaData?.widgetType === WidgetTypes.Header);
        const errorContainer = this.formFields.find(item => item?.metaData?.widgetType === WidgetTypes.ErrorContainer);
        if (header && value?.errorMessage?.length && !errorContainer) {
          const errorRows = value?.errorMessage.length * 3 + 5;
          const errorContainer = new BaseWidget({
            label: "Container",
            description: "To hold error components",
            widgetType: WidgetTypes.ErrorContainer,
            cols: header.cols,
            rows: 2,
            x: header.x,
            y: header.y + header.rows,
            minItemCols: 20,
            minItemRows: 0,
            hideRows: 2,
            defaultRows: errorRows,
            defaultMinItemRows: 0,
            defaultMinItemCols: 20,
            dataType: DATA_TYPES.OBJECT,
            movement: null,
            value: { value: this.transactionDetails.errorMessage }
          });
          this.formFields.push(errorContainer);
          setTimeout(() => {
            errorContainer.rows = errorRows;
            errorContainer.metaData.movement = "DOWN";
            this.editorService.widgetChange.next(errorContainer);
          });
        }
      }
    });
  }
  createTransaction(applicationId: string, id = "") {
    this.loading = true;
    this.userService
      .createTransaction({ applicationId, ...(id && { id }) }, { sessionData: this.sessionFields })
      .subscribe(
        result => {
          const { data: transactionDetails, error } = parseApiResponse(result);
          if (transactionDetails && !error) {
            this.transactionDetails = transactionDetails;
            const payloadFields = this.transactionDetails?.uiPayload || [];
            addOriginalPosition(payloadFields);
            this.transactionDetails.uiPayload = payloadFields;
            this.taskService.setTransactionDetails(transactionDetails);
            this.id = transactionDetails.id;
          } else {
            this.notificationService.error(error.errorMessage);
          }
          this.loading = false;
        },
        error => {
          this.loading = false;
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

  uniqueFieldChange($event) {
    this.userService.uniqueKeyTransaction(this.transactionDetails.transactionId, { uniqueField: $event }, {screenId:  this.transactionDetails?.screenId}).subscribe(
      result => {
        const { data, error } = parseApiResponse(result);
        this.loading = false;
        if (data) {
          this.transactionDetails = data;
          this.taskService.setTransactionDetails(data);
        }
      },
      error => {
        this.loading = false;
        this.notificationService.error(error.errorMessage);
      }
    );
  }

  async populateTransaction($event) {
    const { triggerId, parameters, isUnique = false } = $event;
    this.loading = true;
    if (!isUnique) {
      const saveResult = await this.userService
        .saveTransaction({ transactionId: this.transactionDetails?.transactionId, screenId: this.transactionDetails?.screenId }, this.formFields)
        .toPromise();
    }
    this.userService.populateTransaction(this.id, { triggerId }, { parameters }).subscribe(
      result => {
        const { data, error } = parseApiResponse(result);
        this.loading = false;
        if (data) {
          this.transactionDetails = data;
          this.taskService.setTransactionDetails(data);
        }
      },
      error => {
        this.loading = false;
        this.notificationService.error(error.errorMessage);
      }
    );
  }
  getScreenData(event: any){
    const { payloadFields: payloadMetaData, data: { metaData: { widgetId = '', status: statusId = "" } = {} } = {} } = event;
    this.loading = true;
    this.userService.saveAndValidateScreen({ statusId, screenId: this.transactionDetails?.screenId, transactionId: this.transactionDetails.transactionId }, payloadMetaData)
      .subscribe(result => {
      const { data, error } = parseApiResponse(result);
      if (data && !error) {
        this.userService.getScreenData(this.transactionDetails.id, {screenId: this.transactionDetails?.screenId, actionId: widgetId }).subscribe(result => {
          this.loading = false;
          const { data, error } = parseApiResponse(result);
          if (data && !error) {
            this.transactionDetails = data;
            this.taskService.setTransactionDetails(data);
          }else{
            this.notificationService.error(error?.errorMessage || 'Failed', error?.errorCode)
          }
        }, error => {
          this.loading = false;
          this.notificationService.error(error?.error?.error?.errorMessage);
        })
      } else {
        this.notificationService.error(error.errorMessage);
      }
    },error => {
        this.loading = false;
        this.notificationService.error(error?.error?.error?.errorMessage);
      })
  }

  saveTransaction(event: any) {
    const { payloadFields: payloadMetaData, data: { metaData: { status: statusId = "" } = {} } = {} } = event;
    this.loading = true;
    this.userService
      .saveTransaction({ statusId, screenId: this.transactionDetails?.screenId, transactionId: this.transactionDetails.transactionId }, payloadMetaData)
      .subscribe(
        result => {
          this.loading = false;
          const { data, error } = parseApiResponse(result);
          if (data && !error) {
            this.taskService.setTransactionDetails(data);
            this.notificationService.success("Transaction Saved Successfully", "Success");
          } else {
            this.notificationService.error(error.errorMessage);
          }
        },
        error => {
          this.loading = false;
          this.notificationService.error(error?.error?.error?.errorMessage);
        }
      );
  }

  submitTransaction(payloadData: any) {
    const { payloadFields: payloadMetaData, payload: screenDataJson, files = [], data: { metaData: { status: statusId = "" } = {} } = {} } = payloadData;
    const params = {
      userId: this.currentUser?.userId,
      statusId,
      screenId: this.transactionDetails.screenId,
      transactionId: this.transactionDetails.transactionId || ""
    };
    const appId = this.transactionDetails?.application?.appId;
    if (!appId) {
      this.notificationService.error("Application not found", "Failed to submit");
      return;
    }
    this.userService.saveAndValidateScreen({ statusId, screenId: this.transactionDetails?.screenId, transactionId: this.transactionDetails.transactionId }, payloadMetaData)
      .subscribe(result => {
          this.loading = false;
          const { data, error } = parseApiResponse(result);
          if (data && !error) {
            this.taskService.setTransactionDetails(data);
            const payload = new FormData();
            const allScreenData = {...this.transactionDetails.dataPayload, [this.transactionDetails.screenAlias]: screenDataJson}
            payload.append("payload", JSON.stringify(allScreenData));
            files.forEach((file: any) => {
              payload.append("files", file);
            });
            this.loading = true;
            this.userService.submitTransaction(appId, params, payload).subscribe(
              result => {
                this.loading = false;
                const { data, error } = parseApiResponse(result);
                if (data && !error) {
                  this.notificationService.success("Transaction Submitted Successfully", "Success");
                  this.transactionDetails = data;
                  this.taskService.setTransactionDetails(data);
                  this.id = data.id;
                } else {
                  this.notificationService.error(error.errorMessage, "Error");
                }
              },
              error => {
                this.loading = false;
                this.notificationService.error(error?.error?.error?.errorMessage);
              }
            );
          }else{
            this.loading = false;
            this.notificationService.error(error.errorMessage);
          }
        }, error => {
          this.loading = false;
        })
  }

  redirectTo(QUEUE_TYPE?: any) {
    this.router.navigate(["../../"], {
      relativeTo: this.activatedRoute
    });
  }
}
