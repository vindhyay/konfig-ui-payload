import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { QUEUE_TYPES } from "../../../state/model/queue-types-model";
import { UserService } from "../../user/services/user.service";
import { AuthService } from "../../auth/services/auth.service";
import { BaseComponent } from "../../shared/base/base.component";
import { NotificationService } from "../../../services/notification.service";
import { UserDataModel } from "../../auth/models";
import { addOriginalPosition, getFieldFromFields, getValueFromObjectByPath, parseApiResponse } from "../../../utils";
import { TaskService } from "../services/task.service";
import { BaseWidget, ButtonActions, DATA_TYPES, WidgetTypes } from "../model/create-form.models";
import { EditorService } from "../editor.service";
import * as moment from "moment";
import { resourceType } from "../payload-form-field/payload-form-field.component";

@Component({
  selector: "app-payload-details",
  templateUrl: "./payload-details.component.html",
  styleUrls: ["./payload-details.component.scss"],
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
    this.applicationId = this.activatedRoute.snapshot?.params?.applicationId;
    if (this.applicationId) {
      this.authService.updateUserDetails(this.applicationId);
      this.createTransaction(this.applicationId, this.id);
    }
    this.taskService.transactionDetailsSubject.subscribe((value) => {
      if (value) {
        if (this.formFields.length) {
          if (
            this.formFields?.length !== value?.uiPayload?.length ||
            this.transactionDetails?.screenId !== value?.screenId
          ) {
            this.formFields = value?.uiPayload || [];
            addOriginalPosition(this.formFields);
          } else {
            this.formFields.forEach((element, index) => {
              for (const prop in element) {
                if (prop === "children") {
                  this.formFields[index][prop].forEach((subelement, subindex) => {
                    for (const subprop in subelement) {
                      this.formFields[index][prop][subindex][subprop] = value.uiPayload[index][prop][subindex][subprop];
                    }
                  });
                } else if (prop === "value") {
                  if (!element[prop] || typeof element[prop] != "object" || !element[prop]?.value) {
                    this.formFields[index][prop] = {
                      ...value.uiPayload[index][prop],
                      value: value.uiPayload[index][prop].value ? value.uiPayload[index][prop].value : null,
                    };
                  }
                } else if (this.formFields[index][prop] !== value.uiPayload[index][prop]) {
                  this.formFields[index][prop] = value.uiPayload[index][prop];
                }
              }
            });
          }
        } else {
          this.formFields = value?.uiPayload || [];
          addOriginalPosition(this.formFields);
        }
        this.transactionDetails = value;
        this.formFields = this.formFields.sort((a, b) => a?.y - b?.y);
        const header = this.formFields.find((item) => item?.metaData?.widgetType === WidgetTypes.Header);
        const errorContainer = this.formFields.find(
          (item) => item?.metaData?.widgetType === WidgetTypes.ErrorContainer
        );
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
            value: { value: this.transactionDetails.errorMessage },
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
        (result) => {
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
        (error) => {
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
    this.userService
      .uniqueKeyTransaction(
        this.transactionDetails.transactionId,
        { uniqueField: $event },
        { screenId: this.transactionDetails?.screenId }
      )
      .subscribe(
        (result) => {
          const { data, error } = parseApiResponse(result);
          this.loading = false;
          if (data) {
            this.transactionDetails = data;
            this.taskService.setTransactionDetails(data);
          }
        },
        (error) => {
          this.loading = false;
          this.notificationService.error(error.errorMessage);
        }
      );
  }

  async populateTransaction($event) {
    const { triggerId, parameters, isUnique = false } = $event;
    this.loading = true;
    this.setHiddenFieldValue(this.formFields);
    if (!isUnique) {
      const saveResult = await this.userService
        .saveTransaction(
          { transactionId: this.transactionDetails?.transactionId, screenId: this.transactionDetails?.screenId },
          this.formFields
        )
        .toPromise();
    }
    this.userService
      .populateTransaction(this.id, { triggerId, screenId: this.transactionDetails?.screenId }, { parameters })
      .subscribe(
        (result) => {
          const { data, error } = parseApiResponse(result);
          this.loading = false;
          if (data) {
            this.transactionDetails = data;
            this.taskService.setTransactionDetails(data);
          }
        },
        (error) => {
          this.loading = false;
          this.notificationService.error(error.errorMessage);
        }
      );
  }
  getScreenData(event: any) {
    const { payloadFields: payloadMetaData, data: { metaData: { widgetId = "", status: statusId = "" } = {} } = {} } =
      event;
    this.loading = true;
    this.userService
      .saveAndValidateScreen(
        { statusId, screenId: this.transactionDetails?.screenId, transactionId: this.transactionDetails.transactionId },
        payloadMetaData
      )
      .subscribe(
        (result) => {
          const { data, error } = parseApiResponse(result);
          if (data && !error) {
            this.userService
              .getScreenData(this.transactionDetails.id, {
                screenId: this.transactionDetails?.screenId,
                actionId: widgetId,
              })
              .subscribe(
                (result) => {
                  this.loading = false;
                  const { data, error } = parseApiResponse(result);
                  if (data && !error) {
                    this.transactionDetails = data;
                    this.taskService.setTransactionDetails(data);
                  } else {
                    this.notificationService.error(error?.errorMessage || "Failed", error?.errorCode);
                  }
                },
                (error) => {
                  this.loading = false;
                  this.notificationService.error(error?.error?.error?.errorMessage);
                }
              );
          } else {
            this.notificationService.error(error.errorMessage);
          }
        },
        (error) => {
          this.loading = false;
          this.notificationService.error(error?.error?.error?.errorMessage);
        }
      );
  }

  saveTransaction(event: any) {
    const { payloadFields: payloadMetaData, data: { metaData: { status: statusId = "" } = {} } = {} } = event;
    this.setHiddenFieldValue(payloadMetaData);
    this.loading = true;
    this.userService
      .saveTransaction(
        { statusId, screenId: this.transactionDetails?.screenId, transactionId: this.transactionDetails.transactionId },
        payloadMetaData
      )
      .subscribe(
        (result) => {
          this.loading = false;
          const { data, error } = parseApiResponse(result);
          if (data && !error) {
            this.taskService.setTransactionDetails(data);
            this.notificationService.success("Transaction Saved Successfully", "Success");
          } else {
            this.notificationService.error(error.errorMessage);
          }
        },
        (error) => {
          this.loading = false;
          this.notificationService.error(error?.error?.error?.errorMessage);
        }
      );
  }

  setHiddenFieldValue(payloadFields) {
    payloadFields?.forEach((field) => {
      if (field?.metaData?.isHidden && field?.metaData?.isFormulaField) {
        this.calculateFormulaValue(field);
      }
      if (field?.children && field?.children?.length) {
        this.setHiddenFieldValue(field.children);
      }
    });
  }

  triggerUIAction(uiAction) {
    if (uiAction?.length) {
      uiAction.forEach((item) => {
        if (item.action === ButtonActions.logout) {
          this.authService.logoff(false, this.activatedRoute);
        }
      });
    }
  }
  triggerClicksAll(payloadData: any) {
    this.setHiddenFieldValue(this.formFields);
    const {
      payloadFields: payloadMetaData,
      payload: screenDataJson,
      files = [],
      itemData: {
        data: { metaData: { status: statusId = "", toastMsg = "" } = {} },
        triggerId,
        uiAction,
      },
    } = payloadData;
    const params = {
      triggerId,
      screenId: this.transactionDetails.screenId,
    };
    const appId = this.transactionDetails?.application?.appId;
    if (!appId) {
      this.notificationService.error("Application not found", "Failed to submit");
      return;
    }
    const isSubmit =
      payloadData?.itemData?.data?.metaData?.onClickConfigs?.filter((item) => item.action === ButtonActions.submit)
        ?.length > 0;
    this.userService
      .saveTransaction(
        { transactionId: this.transactionDetails?.transactionId, screenId: this.transactionDetails?.screenId },
        this.formFields
      )
      .subscribe(
        (result) => {
          this.loading = false;
          const { data, error } = parseApiResponse(result);
          if (data && !error) {
            this.taskService.setTransactionDetails(data);
            const payload = new FormData();
            const allScreenData = {
              ...this.transactionDetails.dataPayload,
              [this.transactionDetails.screenAlias]: screenDataJson,
            };
            payload.append("payload", JSON.stringify(allScreenData));
            files.forEach((file: any) => {
              payload.append("files", file);
            });
            this.setHiddenFieldValue(payload);
            this.loading = true;
            this.userService.submitMuliplAction(this.transactionDetails.transactionId, params, payload).subscribe(
              (result) => {
                this.loading = false;
                const { data, error } = parseApiResponse(result);
                if (data && !error) {
                  if (isSubmit) this.notificationService.success("Transaction Submitted Successfully", "Success");
                  if (toastMsg) {
                    this.notificationService.success(toastMsg, "Success");
                  }
                  this.taskService.setTransactionDetails(data);
                  this.id = data.id;
                  this.triggerUIAction(uiAction);
                } else {
                  this.notificationService.error(error.errorMessage, "Error");
                }
              },
              (error) => {
                this.loading = false;
                this.notificationService.error(error?.error?.error?.errorMessage);
              }
            );
          } else {
            this.loading = false;
            this.notificationService.error(error.errorMessage);
          }
        },
        (error) => {
          this.loading = false;
        }
      );
  }

  redirectTo(QUEUE_TYPE?: any) {
    this.router.navigate(["../../"], {
      relativeTo: this.activatedRoute,
    });
  }

  calculateFormulaValue(item): any {
    let formulaValue = "";
    let formula = [];
    if (item?.metaData?.formula?.length > 0) {
      item?.metaData?.formula.forEach((field) => {
        if (field?.resourceType === resourceType.PAYLOAD_FIELD) {
          formula.push(getFieldFromFields(this.formFields, field?.id));
        } else {
          formula.push(field);
        }
      });
    }
    let firstField = formula.find((field) => field?.resourceType === resourceType.PAYLOAD_FIELD);
    switch (firstField?.dataType) {
      case "number":
        let expression = "";
        let values = formula.filter((field) => {
          if (field?.resourceType === resourceType.PAYLOAD_FIELD) {
            return field?.value?.value;
          }
        });
        if (values.length > 0) {
          formula.forEach((field) => {
            if (field?.resourceType === resourceType.PAYLOAD_FIELD) {
              expression = expression + " " + field?.value?.value;
            }
            if (field?.resourceType === resourceType.BRACKET) {
              expression = expression + " " + field?.displayName;
            }
            if (field?.resourceType === resourceType.FUNCTION) {
              expression = expression + " " + field?.expression;
            }
          });
          if (eval(expression) === Infinity) {
            formulaValue = "∞";
          } else {
            formulaValue = eval(expression);
          }
        } else {
          formulaValue = values[0]?.value?.value || null;
        }
        item.value.value = formulaValue;
        return formulaValue;
      case "string":
        formula.forEach((field) => {
          if (field?.resourceType === resourceType.PAYLOAD_FIELD) {
            if (field?.value?.value) {
              formulaValue = formulaValue + field.value.value;
            }
          }
          if (field?.resourceType === resourceType.FUNCTION) {
            if (field?.separateBy && formulaValue) {
              formulaValue = formulaValue + field.separateBy;
            }
          }
        });
        item.value.value = formulaValue;
        return formulaValue;
      case "date":
        const dateFunc = formula.filter((field) => {
          return field?.resourceType === resourceType.FUNCTION;
        });
        let date1;
        let date2;
        const dateIndex = formula.indexOf(dateFunc[0]);
        if (formula[dateIndex - 1].displayName === "Current Date") {
          date1 = new Date();
        } else {
          if (formula[dateIndex - 1]?.value?.value) {
            date1 = moment.utc(formula[dateIndex - 1]?.value?.value).toDate();
          }
        }
        if (formula[dateIndex + 1]?.displayName === "Current Date") {
          date2 = new Date();
        } else {
          if (formula[dateIndex + 1]?.value?.value) {
            date2 = moment.utc(formula[dateIndex + 1]?.value?.value).toDate();
          }
        }
        let d = moment(date2);
        let years = d.diff(date1, "years");
        d.add(-years, "years");
        let months = d.diff(date1, "months");
        d.add(-months, "months");
        let days = d.diff(date1, "days");
        if (years) {
          formulaValue = years + "";
          item.value.value = formulaValue;
        }
        return formulaValue;
      case "array":
        switch (firstField.metaData.widgetType) {
          case WidgetTypes.CheckboxGroup:
            if (firstField?.value?.value) {
              formulaValue = firstField?.value?.value.join(" ");
            }
            break;
          case WidgetTypes.Table:
            const values = [];
            if (formula[1]?.column?.colType === "Number" || formula[1]?.column?.colType === "number") {
              if (formula[0]?.value?.value) {
                formula[0]?.value?.value.forEach((value) => {
                  if (value[formula[1]?.column?.columnId] !== "" && value[formula[1]?.column?.columnId] !== null) {
                    values.push(value[formula[1]?.column?.columnId]);
                  }
                });
                if (values.length > 1) {
                  if (formula[1].id === "Sigma") {
                    formulaValue = eval(values.join(" + "));
                  }
                  if (formula[1].id === "Pi") {
                    formulaValue = eval(values.join(" * "));
                  }
                } else {
                  formulaValue = values[0] || null;
                }
              }
            }
            break;
          case WidgetTypes.AdvTable:
            const advTableValues = [];
            if (
              formula[1]?.column?.metaData?.widgetType === "Number" ||
              formula[1]?.column?.metaData?.widgetType === "number"
            ) {
              if (formula[0]?.children?.length > 0) {
                formula[0]?.children?.forEach((value) => {
                  value.forEach((val) => {
                    if (val.id === formula[1]?.column?.id) {
                      advTableValues.push(val);
                    }
                  });
                });
                if (advTableValues?.length > 0) {
                  let advValues = [];
                  advTableValues.forEach((value) => {
                    if (value?.value?.value) {
                      advValues.push(value?.value?.value);
                    }
                  });
                  if (advValues?.length > 0) {
                    if (formula[1].id === "Sigma") {
                      formulaValue = eval(advValues.join(" + "));
                    }
                    if (formula[1].id === "Pi") {
                      formulaValue = eval(advValues.join(" * "));
                    }
                  }
                } else {
                  formulaValue = advTableValues[0] || "";
                }
              }
            }
            break;
        }
        item.value.value = formulaValue;
        return formulaValue;
    }
    const currField = getFieldFromFields(this.formFields, item?.id);
    currField.value.value = formulaValue;
    return formulaValue;
  }
}
