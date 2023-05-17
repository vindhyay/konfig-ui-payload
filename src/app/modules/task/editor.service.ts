import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { ButtonActions, WidgetTypes } from "./model/create-form.models";
import { FormControl } from "@angular/forms";
import {
  UI_ACTIONS,
  getErrorMessages,
  getValidators,
  parseApiResponse,
  getFieldFromFields,
  validateFields,
  scrollTo,
} from "../../utils";
import { NotificationService } from "../../services/notification.service";
import { AuthService } from "../auth/services/auth.service";
import { BaseService } from "../../services/base.service";
import { HttpClient } from "@angular/common/http";
import { AppConfigService } from "../../app-config-providers/app-config.service";
import { resourceType } from "./payload-form-field/payload-form-field.component";
import * as moment from "moment";
import { LoaderService } from "../../services/loader.service";
import { isNull } from "lodash";

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
            paramField.metaData.errorMessage = getErrorMessages(
              tempFormControl.errors,
              paramField?.label || paramField?.widgetName
            )[0];
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
      if (!$event?.data?.metaData?.onClickConfigs?.length) {
        return;
      }
      const {
        data: {
          metaData: { onClickConfigs = [] },
          widgetId,
        },
      } = $event;
      // checking if only action and that is NONE
      const noneAction = onClickConfigs.find((item) => item.action === "none");
      if (noneAction && onClickConfigs.length === 1) {
        return;
      }
      // Filtering out UI actions
      const uiActions = onClickConfigs.filter((item) => UI_ACTIONS.includes(item.action));
      // Check only UI actions
      if (uiActions.length === onClickConfigs.length) {
        this.triggerUIActions(uiActions);
        return;
      }
      const formFields = this.getFormFields();
      this.setHiddenFieldValue(formFields);
      // Checking the first action is populate action if yes validate require params
      const populateActionIndex = onClickConfigs.findIndex((item) => item.action === ButtonActions.populate);
      let error = false;
      if (populateActionIndex === 0) {
        error = this.validatePopulateParams(onClickConfigs[populateActionIndex], formFields);
      }
      if (error) {
        return;
      }
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
                // this.notificationService.error(error.errorMessage, "Error");
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
        metaData: { onChangeConfigs = [], businessRuleIds = [] } = {},
        widgetId,
      },
    } = $event;
    const formFields = this.getFormFields();
    if (isUnique) {
      this.uniqueFieldChange({ widgetId, value });
      this.onRuleTrigger($event);
      return;
    }
    if (onChangeConfigs?.length) {
      const { action: type = "" } = onChangeConfigs[0];
      if (type === ButtonActions.populate) {
        let error = this.validatePopulateParams(onChangeConfigs[0], formFields);
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
  }

  onRuleTrigger($event) {
    const {
      data: {
        value: { value = null },
        metaData: { businessRuleIds = [] } = {},
        widgetId,
      },
    } = $event;
    if (businessRuleIds?.length) {
      let transactionDetails = this.getTransactionDetails();
      const formFields = this.getFormFields();
      this.isTriggerInProgress = true;
      this.showLoader($event?.data?.id);
      this.executeRules({businessRuleIds, conditionalErrorIds: [], showHideIds: [], payload: formFields},
        {applicationVersionId: transactionDetails.applicationVersionId, officeType: "FRONT_OFFICE", transactionId: transactionDetails.transactionId}).subscribe(
          (result) => {
            this.hideLoader();
            const { data } = parseApiResponse(result);
            if (data && data?.payload) {
              transactionDetails.uiPayload = data.payload;
              this.setTransactionDetails(transactionDetails);
              this.isTriggerInProgress = false;
            }
            else {
              this.isTriggerInProgress = false;
            }
          }
        );
    }
  }
  evaluateFilter(filtersLogic, resultArray) {
    const expressionArray = filtersLogic
      .split(/[.\()&&||_]/)
      .filter(function (indexItem) {
        return indexItem != null && indexItem.length;
      })
      .sort()
      .reverse();
    let expression = filtersLogic;

    expressionArray.forEach((item) => {
      if (!isNaN(item)) {
        expression = expression.replaceAll(item, resultArray[item - 1]);
      }
    });
    return eval(expression);
  }
  checkCondition(conditions) {
    const {showHideIds, conditionalErrorIds} = conditions;
    let transactionDetails = this.getTransactionDetails();
    this.isTriggerInProgress = true;
    this.executeRules({businessRuleIds: [], conditionalErrorIds, showHideIds, payload: transactionDetails.uiPayload},
      {applicationVersionId: transactionDetails.applicationVersionId, officeType: "FRONT_OFFICE", transactionId: transactionDetails.transactionId}).subscribe(
        (result) => {
          const { data } = parseApiResponse(result);
          if (data) {
            if (data?.payload) {
              transactionDetails.uiPayload = data?.payload;
              this.setTransactionDetails(transactionDetails);
            }
            if (data?.errors && data?.errors?.length) {
              data?.errors.forEach(error => {
                switch (error?.errorType) {
                  case 'error':
                    this.notificationService.error(error?.message);
                    break;
                  case 'warning':
                    this.notificationService.info(error?.message);
                    break;
                }
              });
            }
          }
          else {
            this.isTriggerInProgress = false;
          }
        }
      );
  }
  onPopulateTriggerCondition = (fields: any[]) => {
    fields.forEach((field: any) => {
      if (field?.children && field?.children?.length) {
        this.onPopulateTriggerCondition(field.children);
      } else if (field) {
        const ifConditionsIds = field.metaData?.conditionRuleIds;
        if (ifConditionsIds?.length) {
          const ifConditions = this.getConditions(ifConditionsIds);
          if (ifConditions?.length) {
            this.checkCondition(ifConditions);
          } else if (ifConditions && !ifConditions?.length) {
            this.checkCondition([{ ...ifConditions }]);
          }
        }
      }
    });
  };
  conditionValidation = (rule, fieldValue, targetField = null): boolean => {
    let result = false;
    let ruleArray = [];
    let testCondition = false;
    if (
      (fieldValue === undefined || fieldValue === null) &&
      rule.operator != "isNull" &&
      rule.operator != "isNotNull"
    ) {
      return false;
    }
    if (rule.operator === "isNull" || rule.operator === "isNotNull") {
      return fieldValue === undefined || fieldValue === null;
    }
    if (rule?.fnsName) {
      const calcValue = this.getFormulaValue(
        targetField ? targetField?.value?.value : fieldValue,
        rule.fnsName,
        rule?.factorValue
      );
      if (rule?.fnsName === "TODAY") {
        rule.value = calcValue;
        fieldValue = new Date(fieldValue);
        fieldValue.setHours(0, 0, 0, 0);
      } else if (!!targetField) {
        rule.value = calcValue;
      } else {
        fieldValue = calcValue;
      }
    }
    if (rule.value === undefined || rule.value === null) {
      return false;
    }
    if (rule.field.dataType === "string") {
      fieldValue = this.rulesConditionEvaluation.convertCase(fieldValue);
      if (!rule.operator.includes("length")) {
        rule.value = this.rulesConditionEvaluation.convertCase(rule?.value);
      }
    }
    switch (rule.operator) {
      case "includes":
      case "contains":
        ruleArray = rule?.value?.split(",");
        testCondition = ruleArray.every((r) => (fieldValue || []).includes(r));
        if (testCondition) {
          result = true;
        }
        break;
      case "startsWith":
        result = String(fieldValue).startsWith(String(rule.value));
        break;
      case "endsWith":
        result = String(fieldValue).endsWith(String(rule.value));
        break;
      case "notIncludes":
        ruleArray = rule?.value?.split(",");
        testCondition = ruleArray.some((r) => (fieldValue || []).includes(r));
        if (!testCondition) {
          result = true;
        }
        break;
      case "excludes":
        if (!(fieldValue || []).includes(rule.value)) {
          result = true;
        }
        break;
      case "greaterThan":
        result = this.rulesConditionEvaluation.isGreaterThan(fieldValue, rule.value);
        break;
      case "greaterthanEquals":
        result = this.rulesConditionEvaluation.isGreaterThanEqual(fieldValue, rule.value);
        break;
      case "lessthan":
        result = this.rulesConditionEvaluation.isLessThan(fieldValue, rule.value);
        break;
      case "lessthanEquals":
        result = this.rulesConditionEvaluation.isLessThanEqual(fieldValue, rule.value);
        break;
      case "equalsIgnoreCase":
        result = String(fieldValue).toLowerCase() == String(rule.value).toLowerCase();
        break;
      case "lengthEquals":
        result = String(fieldValue).length == rule.value;
        break;
      case "lengthGreater":
        result = this.rulesConditionEvaluation.isGreaterThan(String(fieldValue).length, rule.value);
        break;
      case "lengthLess":
        result = this.rulesConditionEvaluation.isLessThan(String(fieldValue).length, rule.value);
        break;
      case "lengthGreaterAndEquals":
        result = this.rulesConditionEvaluation.isGreaterThanEqual(String(fieldValue).length, rule.value);
        break;
      case "lengthLessAndEquals":
        result = this.rulesConditionEvaluation.isLessThanEqual(String(fieldValue).length, rule.value);
        break;
      case "notEquals":
        if ((isNull(fieldValue) && String(rule.value) === "none") || String(fieldValue) !== String(rule.value)) {
          result = true;
        }
        break;
      case "isNotNull":
        if (!isNull(fieldValue) && String(rule.value) === "none") {
          result = true;
        }
        break;
      default:
        if ((isNull(fieldValue) && String(rule.value) === "none") || String(fieldValue) == String(rule.value)) {
          result = true;
        }
        break;
    }
    return result;
  };
  getDataListValues = (payload): Observable<any> => {
    const url = `${this.config.getApiUrls().getDataListValuesURL}`;
    return this.postData(url, payload);
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
  executeRules = (payload, params) : Observable<any> => {
    const url = `${this.config.getApiUrls().executeRulesURL}`;
    return this.postData(url, payload, params);
  }

  //Updating hidden field values based on formula --- work around
  setHiddenFieldValue(payloadFields) {
    payloadFields?.forEach((field) => {
      if (field?.metaData?.isHidden && field?.metaData?.isFormulaField) {
        this.calculateFormulaValue(field, payloadFields);
      }
      if (field?.children && field?.children?.length) {
        this.setHiddenFieldValue(field.children);
      }
    });
  }

  getConditions(ifConditionsIds: any): any {
    return this.getConditionDetails()?.filter((item: any) => ifConditionsIds.includes(item?.id)) || [];
  }
  calcDate(date1, date2) {
    const diff = Math.floor(date1.getTime() - date2.getTime());
    const day = 1000 * 60 * 60 * 24;
    const days = Math.floor(diff / day);
    const months = Math.floor(days / 31);
    const years = Math.floor(months / 12);
    return { days: days, months: months, years: years };
  }
  addMonths(dateValue, months = 0) {
    const result = new Date(dateValue);
    result.setMonth(result.getMonth() + Number(months));
    return result;
  }
  addDays(date, days) {
    const result = new Date(date);
    result.setDate(result.getDate() + parseInt(days));
    return result;
  }
  trim(stringToTrim) {
    return stringToTrim.replace(/^\s+|\s+$/g, "");
  }
  ltrim(stringToTrim) {
    return stringToTrim.replace(/^\s+/, "");
  }
  rtrim(stringToTrim) {
    return stringToTrim.replace(/\s+$/, "");
  }
  getFormulaValue(targetFieldValue, fnsName, factor = 0) {
    if (!targetFieldValue) {
      return null;
    }
    const value = targetFieldValue;
    switch (fnsName) {
      case "getValue":
        return value;
      case "getNoYear":
        return this.calcDate(new Date(), new Date(value)).years;
      case "getNoDays":
        return this.calcDate(new Date(), new Date(value)).days;
      case "getNoMonths":
        return this.calcDate(new Date(), new Date(value)).months;
      case "YEARDIFF":
        return this.calcDate(new Date(factor), new Date(value)).years;
      case "DATEDIFF":
        return this.calcDate(new Date(factor), new Date(value)).days;
      case "MONTHDIFF":
        return this.calcDate(new Date(factor), new Date(value)).months;
      case "DATEVALUE":
        return new Date(value).toDateString();
      case "ADDMONTHS":
        return this.addMonths(value, factor);
      case "ADDDAYS":
        return this.addDays(value, factor);
      case "WEEKDAY":
        return new Date(value).getDay();
      case "TODAY":
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        return today;
      case "strLength":
        return value?.length;
      case "toLowerCase":
        return value?.toLowerCase();
      case "toUpperCase":
        return value?.toUpperCase();
      case "toString":
        return value?.toString();
      case "LTRIM":
        return this.ltrim(value);
      case "RTRIM":
        return this.rtrim(value);
      case "TRIM":
        return this.trim(value);
      case "toNumber":
        return Number(value);
      case "ABS":
        return Math.abs(value);
      case "CEILING":
        return Math.ceil(value);
      case "EXP":
        return Math.exp(value);
      case "FLOOR":
        return Math.floor(value);
      case "LOG":
        return Math.log(value);
      case "MOD":
        return Math.log(value % factor);
      case "POWER":
        return Math.pow(value, factor);
      case "ROUND":
        return Math.round(value);
      case "SQRT":
        return Math.sqrt(value);
      case "TRUNC":
        return Math.trunc(value);
    }
  }
  rulesConditionEvaluation = {
    convertCase: (stringValue): string => {
      return stringValue ? stringValue?.toLowerCase() : isNull(stringValue) ? stringValue : "";
    },
    isGreaterThan: (fieldValue: number, value: number): boolean => {
      return fieldValue > value;
    },
    isGreaterThanEqual: (fieldValue: number, value: number): boolean => {
      return fieldValue >= value;
    },
    isLessThan: (fieldValue: number, value: number): boolean => {
      return fieldValue < value;
    },
    isLessThanEqual: (fieldValue: number, value: number): boolean => {
      return fieldValue <= value;
    },
  };

  calculateFormulaValue(item, payloadFields) {
    let formulaValue;
    let formula = [];
    if (item?.metaData?.formula?.length > 0) {
      item?.metaData?.formula.forEach((field) => {
        if (field?.resourceType === resourceType.PAYLOAD_FIELD) {
          formula.push(getFieldFromFields(payloadFields, field?.widgetId));
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
          let evaluate;
          try {
            evaluate = eval(expression);
          } catch (e) {
            console.log(e);
          }
          if (evaluate === Infinity) {
            formulaValue = "∞";
          } else if (isNaN(evaluate)) {
            formulaValue = undefined;
          } else {
            formulaValue = eval(expression) || null;
          }
        } else {
          formulaValue = values[0]?.value?.value || null;
        }
        item.value.value = formulaValue;
        return formulaValue;
      case "string":
        formulaValue = "";
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
        }
        item.value.value = formulaValue;
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
  }

  checkIfTriggerInProgress() {
    return this.isTriggerInProgress;
  }
  async waitTillTriggerIsComplete() {
    while (this.checkIfTriggerInProgress()) {
      await new Promise((resolve) => setTimeout(resolve, 100));
    }
  }
}
