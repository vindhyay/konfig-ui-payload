import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { ButtonActions } from "./model/create-form.models";
import { FormControl } from "@angular/forms";
import {
  UI_ACTIONS,
  getErrorMessages,
  getValidators,
  parseApiResponse,
  getFieldFromFields,
  validateFields,
  scrollTo,
  dynamicEvaluation,
} from "../../utils";
import { NotificationService } from "../../services/notification.service";
import { AuthService } from "../auth/services/auth.service";
import { BaseService } from "../../services/base.service";
import { HttpClient } from "@angular/common/http";
import { AppConfigService } from "../../app-config-providers/app-config.service";
import { LoaderService } from "../../services/loader.service";

@Injectable({
  providedIn: "root",
})
export class EditorService extends BaseService {
  constructor(
    protected http: HttpClient,
    private notificationService: NotificationService,
    private authService: AuthService,
    protected config: AppConfigService,
    protected loaderService: LoaderService
  ) {
    super(http);
  }
  activeTabIndexes = {};
  isTriggerInProgress: boolean = false;

  public widgetChange = new BehaviorSubject<any>(null);
  public widgetChange$ = this.widgetChange.asObservable();

  public loaderField = new BehaviorSubject<any>(false);
  public loaderField$ = this.loaderField.asObservable();

  public modalStatus = new BehaviorSubject<any>([]);
  public modalStatus$ = this.modalStatus.asObservable();

  //Add Typings
  private transactionDetails = new BehaviorSubject(null);
  public transactionDetails$ = this.transactionDetails.asObservable();
  private conditionDetails = new BehaviorSubject(null);
  private formFields = new BehaviorSubject(null);

  public setTransactionDetails(transactionDetails: any) {
    this.transactionDetails.next(transactionDetails);
  }
  public getTransactionDetails() {
    return this.transactionDetails.getValue();
  }

  public setConditionDetails(conditionDetails: any) {
    this.conditionDetails.next(conditionDetails);
  }
  public getConditionDetails(): any {
    return this.conditionDetails.getValue();
  }

  public setFormFields(fields: any) {
    this.formFields.next(fields);
  }
  public getFormFields() {
    return this.formFields.value || [];
  }
  public showLoader(fieldId?) {
    //show loader if no response after 600 milli seconds
    this.loaderService.start(600);
    this.loaderField.next(fieldId);
  }
  public hideLoader() {
    this.loaderService.complete();
    this.loaderField.next(null);
  }

  public setAdjustableHeight(items, containerName = ".gridster-container") {
    const container: any = document.querySelector(containerName);
    if (container && container.getClientRects().length) {
      let rows = container.offsetHeight;
      items.forEach((item) => {
        rows = Math.max(rows, (item.y + item.rows) * 10);
      });
      container.style.height = container.offsetHeight + (rows - container.offsetHeight) + "px";
    }
  }

  public setContainerHeight(items: any) {
    const container: any = document.querySelector(".gridster-container");
    if (container && container.getClientRects().length) {
      let rows = 30;
      const filterItems = items.filter((item) => !item?.metaData?.isHidden);
      filterItems.forEach((item) => {
        rows = Math.max(rows, item.y + item.rows);
      });
      container.style.height = rows * 10 + 50 + "px";
    }
  }

  uniqueFieldChange(uniqueField: { widgetId: string; value: string }) {
    const { transactionId = "", screenId = "" } = this.getTransactionDetails();
    this.uniqueKeyTransaction(transactionId, { uniqueField }, { screenId }).subscribe(
      (result) => {
        const { data } = parseApiResponse(result);
        this.showLoader(uniqueField?.widgetId);
        if (data) {
          this.setTransactionDetails(data);
        }
      },
      (error) => {
        this.hideLoader();
        this.notificationService.error(error?.error?.error);
      }
    );
  }

  validatePopulateParams(onConfigs, fields) {
    const { action: type = "", parameters = [] } = onConfigs;
    const reqParams = JSON.parse(JSON.stringify(parameters));
    let error = false;
    reqParams.map((parameter) => {
      const { value, valueType } = parameter;
      if (valueType === "ref") {
        const paramField = getFieldFromFields(fields, value);
        const inputValue = paramField?.value?.value;
        if (!inputValue && paramField) {
          error = true;
          const tempFormControl = new FormControl(
            inputValue,
            getValidators({ ...paramField?.validators, required: true }, paramField)
          );
          if (tempFormControl.valid) {
            paramField.error = false;
            paramField.errorMessage = "";
          } else {
            paramField.error = true;
            if(paramField.metaData){
              paramField.metaData.errorMessage = getErrorMessages(
                tempFormControl.errors,
                paramField?.label || paramField?.widgetName
              )[0];
            }
          }
        } else {
          parameter.value = inputValue;
        }
      }
    });
    return error;
  }

  async onBtnClick($event) {
    if (this.checkIfTriggerInProgress()) {
      await this.waitTillTriggerIsComplete();
    } else {
      if (!$event?.data?.metaData?.onClickConfigs?.length && !$event?.data?.metaData?.widgetEvent?.length) {
        return;
      }
      const {
        data: {
          metaData: { onClickConfigs = [], widgetEvent = [] },
          widgetId,
        },
      } = $event;
      // Filtering out UI actions
      const uiActions = onClickConfigs.filter((item) => UI_ACTIONS.includes(item.action));
      const backendActions = onClickConfigs.filter((item) => !UI_ACTIONS.includes(item.action));
      if (uiActions.length) {
        this.triggerUIActions(uiActions);
      }
      if (!widgetEvent?.length && !backendActions.length) {
        return;
      }
      const formFields = this.getFormFields();
      const triggerData = { triggerId: widgetId, data: $event?.data, uiActions: uiActions };
      // If first action either submit or next screen action need to validate fields
      const isValidationRequired =
        onClickConfigs.length &&
        (onClickConfigs[0].action === ButtonActions.submit || onClickConfigs[0].action === ButtonActions.next);
      if (isValidationRequired) {
        const { result, errorFields } = validateFields(formFields, true);
        if (!result) {
          let errorMsg = "Failed to validate: ";
          if (errorFields.length) {
            errorMsg = errorMsg + " " + errorFields[0]?.label;
          }
          this.notificationService.error(errorMsg, "Validation error");
          return;
        }
      }
      this.triggerButtonActionEvents(triggerData);
    }
  }

  triggerButtonActionEvents(triggerData: { triggerId: string; data: any; uiActions: any[]; businessRuleIds?: [] }) {
    const {
      transactionId = "",
      screenId = "",
      application: { appId = "" },
    } = this.getTransactionDetails();
    const formFields = this.getFormFields();
    const {
      data: { metaData: { toastMsg = "", onClickConfigs = [] } = {} },
      triggerId,
      uiActions,
      businessRuleIds = [],
    } = triggerData;
    if (!appId) {
      this.notificationService.error("Application not found", "Failed to submit");
      return;
    }
    this.isTriggerInProgress = true;
    const isSubmit = onClickConfigs?.filter((item) => item.action === ButtonActions.submit)?.length > 0;
    const isNext = onClickConfigs?.filter((item) => item.action === ButtonActions.next)?.length > 0;
    const isPrev = onClickConfigs?.filter((item) => item.action === ButtonActions.previous)?.length > 0;
    this.showLoader(triggerData?.data?.id);
    this.saveTransaction({ transactionId, screenId }, formFields).subscribe(
      (result) => {
        const { data } = parseApiResponse(result);
        if (data) {
          this.submitMultipleAction(
            data?.transactionId,
            {
              triggerId,
              screenId,
            },
            { businessRuleIds }
          ).subscribe(
            (result) => {
              this.hideLoader();
              const { data } = parseApiResponse(result);
              if (data) {
                if (toastMsg) {
                  this.notificationService.success(toastMsg, "Success");
                }
                if (!toastMsg && isSubmit)
                  this.notificationService.success(
                    `This transaction - ${data?.transactionId} is in progress, Modifications not allowed`,
                    "Success"
                  );
                this.setTransactionDetails(data);
                this.triggerUIActions(uiActions);
                //On page change scroll to top
                if (isNext || isPrev) {
                  scrollTo();
                }
                this.isTriggerInProgress = false;
              } else {
                this.isTriggerInProgress = false;
              }
            },
            (error) => {
              this.isTriggerInProgress = false;
              this.hideLoader();
              this.notificationService.error(error?.error?.error);
            }
          );
        } else {
          this.isTriggerInProgress = false;
          this.setTransactionDetails(data);
          this.hideLoader();
          this.notificationService.error("Failed to save");
        }
      },
      (error) => {
        this.isTriggerInProgress = false;
        this.hideLoader();
        this.notificationService.error(error?.error?.error);
      }
    );
  }

  triggerUIActions(uiActions = []) {
    if (uiActions?.length) {
      uiActions.forEach((item) => {
        if (item.action === ButtonActions.logout) {
          this.authService.logoff(false);
        }
        if (item.action === ButtonActions.openModals) {
          this.setOpenModals(item.fields);
        }
        if (item.action === ButtonActions.closeModals) {
          this.setClosedModals(item.fields);
        }
        if (item.action === ButtonActions.externalLink) {
          window.open(item.externalLink, "_blank");
        }
      });
    }
  }

  setOpenModals(fields) {
    this.modalStatus.next(fields.map((field) => ({ widgetId: field, type: ButtonActions.openModals })));
  }

  setClosedModals(fields) {
    this.modalStatus.next(fields.map((field) => ({ widgetId: field, type: ButtonActions.closeModals })));
  }

  onOptionChange($event) {
    const {
      data: {
        isUnique = false,
        value: { value = null },
        metaData: { widgetEvent = [], businessRuleIds = [] } = {},
        widgetId,
      },
    } = $event;
    const formFields = this.getFormFields();
    if (isUnique) {
      this.uniqueFieldChange({ widgetId, value });
      this.onRuleTrigger($event);
      return;
    }

    if (widgetEvent?.length) {
      let error = this.validatePopulateParams(widgetEvent[0], formFields);
      if (!error) {
        this.triggerButtonActionEvents({
          triggerId: widgetId,
          data: $event?.data,
          uiActions: [],
          businessRuleIds: businessRuleIds,
        });
      }
    }
  }

  onRuleTrigger($event) {
    const {
      data: { metaData: { ruleIds = [] } = {} },
    } = $event;
    if (ruleIds?.length) {
      let transactionDetails = this.getTransactionDetails();
      const formFields = this.getFormFields();
      this.isTriggerInProgress = true;
      this.showLoader($event?.data?.id);
      this.executeRules(
        { screenId: transactionDetails.screenId, ruleIds, currentScreenPayload: formFields },
        {
          applicationVersionId: transactionDetails.applicationVersionId,
          officeType: "FRONT_OFFICE",
          transactionId: transactionDetails.transactionId,
        }
      ).subscribe(
        (result) => {
          const { data } = parseApiResponse(result);
          if (data) {
            if (data?.currentScreenPayload) {
              transactionDetails.uiPayload = data.currentScreenPayload;
              this.setTransactionDetails(transactionDetails);
              this.executeShowHides(transactionDetails.uiPayload);
              this.isTriggerInProgress = false;
              this.hideLoader();
            }
            if (data?.errors && data?.errors?.length) {
              data?.errors.forEach((error) => {
                switch (error?.type) {
                  case "PAGE_ERROR":
                    this.notificationService.error(error?.message);
                    break;
                  case "PAGE_WARNING":
                    this.notificationService.warn(error?.message);
                    break;
                }
              });
            }
          } else {
            this.isTriggerInProgress = false;
            this.hideLoader();
          }
        },
        (error) => {
          this.isTriggerInProgress = false;
          this.hideLoader();
        }
      );
    }
  }
  executeShowHides(widgetList) {
    widgetList.forEach((widget) => {
      this.widgetChange.next(widget);
      if (widget?.children && widget.children?.length) {
        this.executeShowHides(widget?.children);
      }
    });
  }
  onPopulateTriggerCondition(fields: any[]) {
    fields.forEach((field: any) => {
      if (field?.children && field?.children?.length) {
        this.onPopulateTriggerCondition(field.children);
      }
    });
  };
  uploadFile = (formData, transactionId): Observable<any> => {
    const url = `${this.config.getApiUrls().uploadFile}`.replace("{transactionId}", transactionId);
    return this.postData(url, formData);
  };
  getTransactionTableData = (params): Observable<any> => {
    const url = `${this.config.getApiUrls().transactionTableURL}`;
    return this.getData(url, params);
  };
  getImageUrl = (): string => {
    return this.config.getApiUrls().getImageURL;
  };
  uniqueKeyTransaction = (transactionId: any, payload: any, params: { screenId: string }): Observable<any> => {
    const url = `${this.config.getApiUrls().uniqueKeyTransactionURL}/${transactionId}`;
    return this.postData(url, payload, params);
  };
  saveTransaction = (params, payload: any): Observable<any> => {
    const url = `${this.config.getApiUrls().saveTransactionURL}`;
    return this.putData(url, payload, params);
  };
  // submit Action
  submitMultipleAction = (transactionId, params, data = {}): Observable<any> => {
    const url = `${this.config.getApiUrls().submitMultipleAction}`.replace("{transactionId}", transactionId);
    return this.putData(url, data, params);
  };
  // Create Transaction
  createTransaction = (params, payload): Observable<any> => {
    const url = `${this.config.getApiUrls().createTransactionURL}`;
    return this.postData(url, payload, params);
  };
  // fetch Transaction details
  fetchTransactionDetails = (transactionDbId: any): Observable<any> => {
    const url = `${this.config.getApiUrls().getTransactionURL}/${transactionDbId}`;
    return this.getData(url);
  };

  // update table row
  updateTableRowData = (payload, params): Observable<any> => {
    const { transactionId = "", screenId = "" } = this.getTransactionDetails();
    const url = `${this.config.getApiUrls().updateTableRowDataURL}/${transactionId}/advance-table-action`;
    return this.putData(url, payload, params);
  };

  //Executing BRs, CEMs and SNH
  executeRules = (payload, params): Observable<any> => {
    const url = `${this.config.getApiUrls().executeRulesURL}`;
    return this.postData(url, payload, params);
  };

  checkIfTriggerInProgress() {
    return this.isTriggerInProgress;
  }
  async waitTillTriggerIsComplete() {
    while (this.checkIfTriggerInProgress()) {
      await new Promise((resolve) => setTimeout(resolve, 100));
    }
  }
}
