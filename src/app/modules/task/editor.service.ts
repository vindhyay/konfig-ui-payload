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
import { ActivatedRoute } from "@angular/router";
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
    private activatedRoute: ActivatedRoute,
    protected config: AppConfigService,
    protected loaderService: LoaderService
  ) {
    super(http);
  }
  activeTabIndexes = {};
  activeStepperIndexes = {};
  unsavedChanges: boolean = false;

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
  public conditionDetails$ = this.conditionDetails.asObservable();

  private formFields = new BehaviorSubject(null);
  public formFields$ = this.formFields.asObservable();

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

  uniqueFieldChange(uniqueField: { id: string; value: string }) {
    const { transactionId = "", screenId = "" } = this.getTransactionDetails();
    this.uniqueKeyTransaction(transactionId, { uniqueField }, { screenId }).subscribe(
      (result) => {
        const { data, error } = parseApiResponse(result);
        this.showLoader(uniqueField?.id);
        if (data) {
          this.setTransactionDetails(data);
        }
      },
      (error) => {
        this.hideLoader();
        this.notificationService.error(error.errorMessage);
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
            getValidators({ ...paramField?.validators, required: true })
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

  onBtnClick($event) {
    const {
      data: {
        metaData: { onClickConfigs = [] },
        id,
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
    const triggerData = { triggerId: id, data: $event?.data, uiActions: uiActions };
    // If first action either submit or next screen action need to validate fields
    const isValidationRequired =
      onClickConfigs.length &&
      (onClickConfigs[0].action === ButtonActions.submit || onClickConfigs[0].action === ButtonActions.next);
    if (isValidationRequired) {
      const { result, errorFields } = validateFields(formFields);
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
    const isSubmit = onClickConfigs?.filter((item) => item.action === ButtonActions.submit)?.length > 0;
    const isNext = onClickConfigs?.filter((item) => item.action === ButtonActions.next)?.length > 0;
    const isPrev = onClickConfigs?.filter((item) => item.action === ButtonActions.previous)?.length > 0;
    this.showLoader(triggerData?.data?.id);
    this.saveTransaction({ transactionId, screenId }, formFields).subscribe(
      (result) => {
        const { data, error } = parseApiResponse(result);
        if (data && !error) {
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
              const { data, error } = parseApiResponse(result);
              if (data && !error) {
                if (toastMsg) {
                  this.notificationService.success(toastMsg, "Success");
                }
                if (!toastMsg && isSubmit)
                  this.notificationService.success(
                    "This transaction is in progress, Modifications not allowed",
                    "Success"
                  );
                this.setTransactionDetails(data);
                this.triggerUIActions(uiActions);
                //On page change scroll to top
                if (isNext || isPrev) {
                  scrollTo();
                }
              } else {
                this.notificationService.error(error.errorMessage, "Error");
              }
            },
            (error) => {
              this.hideLoader();
              this.notificationService.error(error?.error?.error?.errorMessage);
            }
          );
        } else {
          this.setTransactionDetails(data);
          this.hideLoader();
          this.notificationService.error(error.errorMessage);
        }
      },
      (error) => {
        this.hideLoader();
      }
    );
  }

  triggerUIActions(uiActions = []) {
    if (uiActions?.length) {
      uiActions.forEach((item) => {
        if (item.action === ButtonActions.logout) {
          this.authService.logoff(false, this.activatedRoute);
        }
        if (item.action === ButtonActions.openModals) {
          this.setOpenModals(item.fields);
        }
        if (item.action === ButtonActions.closeModals) {
          this.setClosedModals(item.fields);
        }
      });
    }
  }

  setOpenModals(fields) {
    this.modalStatus.next(fields.map((field) => ({ id: field, type: ButtonActions.openModals })));
  }

  setClosedModals(fields) {
    this.modalStatus.next(fields.map((field) => ({ id: field, type: ButtonActions.closeModals })));
  }

  onOptionChange($event) {
    const {
      data: {
        isUnique = false,
        value: { value = null },
        metaData: { onChangeConfigs = [], businessRuleIds = [] } = {},
        id,
      },
    } = $event;
    const formFields = this.getFormFields();
    if (isUnique) {
      this.uniqueFieldChange({ id, value });
      this.onRuleTrigger($event);
      return;
    }
    if (onChangeConfigs?.length) {
      const { action: type = "" } = onChangeConfigs[0];
      if (type === ButtonActions.populate) {
        let error = this.validatePopulateParams(onChangeConfigs[0], formFields);
        if (!error) {
          this.triggerButtonActionEvents({
            triggerId: id,
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
        id,
      },
    } = $event;
    if (businessRuleIds?.length) {
      this.triggerButtonActionEvents({
        triggerId: id,
        data: $event?.data,
        uiActions: [],
        businessRuleIds: businessRuleIds,
      });
    }
  }

  checkCondition(conditionsArray) {
    const allFields = this.getFormFields();
    conditionsArray.forEach((element) => {
      let result = null;
      let conditions = element?.ifConditions;
      const isShowError = element?.type === "ShowError";
      if (!!conditions)
        for (let condition of conditions) {
          let condMatched = false;
          condition.rules.forEach((rule, index) => {
            const field = getFieldFromFields(allFields, rule?.field?.fieldId);
            const fieldValue = field?.value?.value;
            // let result = this.conditionValidation(rule, fieldValue);
            const targetField = isShowError ? getFieldFromFields(allFields, rule?.targetField?.fieldId) : null;
            let result = this.conditionValidation(rule, fieldValue, targetField);
            condMatched =
              index === 0 ? result : rule.condition === "and" ? condMatched && result : condMatched || result;
          });
          if (condMatched) {
            // result = condition.mappingField;
            result = { ...condition.mappingField };
            console.log("Success", result);
            break;
          } else if (isShowError && condition?.mappingField?.targetField) {
            const removeErrorObj = getFieldFromFields(allFields, condition?.mappingField?.targetField?.fieldId);
            if (
              removeErrorObj &&
              removeErrorObj?.error &&
              ((condition?.mappingField?.messageType === "fieldError" &&
                removeErrorObj.errorMessage == condition?.mappingField?.message) ||
                removeErrorObj.errorMessage?.length === 0)
            ) {
              removeErrorObj.error = false;
              removeErrorObj.errorMessage = "";
              console.log(removeErrorObj, condition?.mappingField);
            }
          }
        }
      if (result && !result.messageType) {
        const showFields = result?.showFields || [];
        const hideFields = result?.hideFields || [];
        showFields.forEach((showField) => {
          const showFieldRef = getFieldFromFields(allFields, showField?.fieldId);
          if (showFieldRef) {
            showFieldRef.rows = showFieldRef.metaData?.defaultRows;
            showFieldRef.minItemRows = showFieldRef.metaData?.defaultMinItemRows;
            showFieldRef.minItemCols = showFieldRef.metaData?.defaultMinItemCols;
            showFieldRef.metaData.movement = "DOWN";
            // showFieldRef.y = showFieldRef.metaData.originalY;
            showFieldRef.metaData.hidden = false;
            this.widgetChange.next(showFieldRef);
          }
        });
        hideFields.forEach((hideField) => {
          const hideFieldRef = getFieldFromFields(allFields, hideField?.fieldId);
          if (hideFieldRef && !hideFieldRef.metaData.hidden) {
            hideFieldRef.rows = hideFieldRef?.metaData?.hideRows || 0;
            hideFieldRef.minItemRows = hideFieldRef?.metaData?.hideRows || 0;
            hideFieldRef.metaData.movement = "UP";
            hideFieldRef.metaData.hidden = true;
            this.widgetChange.next(hideFieldRef);
          }
        });
        this.setContainerHeight(allFields);
      } else if (result && result.messageType) {
        const showMessageFieldRef = result?.targetField?.fieldId
          ? getFieldFromFields(allFields, result.targetField.fieldId)
          : null;
        switch (result.messageType) {
          case "fieldError":
            if (showMessageFieldRef) {
              showMessageFieldRef.errorMessage = result.message;
              showMessageFieldRef.error = true;
            }
            break;
          case "pageError":
            if (showMessageFieldRef) {
              showMessageFieldRef.error = true;
            }
            this.notificationService.error(result.message, null, { disableTimeOut: true });
            break;
          case "pageWarning":
            this.notificationService.info(result.message);
            break;
        }
      }
    });
  }
  conditionValidation = (rule, fieldValue, targetField = null): boolean => {
    let result = false;
    let ruleArray = [];
    let testCondition = false;
    if (!fieldValue) {
      return false;
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
      } else if (!!targetField && targetField?.value?.value) {
        rule.value = calcValue;
      } else {
        fieldValue = calcValue;
      }
    }
    if (rule.field.dataType === "string") {
      fieldValue = this.convertCase(fieldValue);
      rule.value = this.convertCase(rule.value);
    }
    switch (rule.operator) {
      case "includes":
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
        result = this.isGreaterThan(fieldValue, rule.value);
        break;
      case "greaterthanEquals":
        result = this.isGreaterThanEqual(fieldValue, rule.value);
        break;
      case "lessthan":
        result = this.isLessThan(fieldValue, rule.value);
        break;
      case "lessthanEquals":
        result = this.isLessThanEqual(fieldValue, rule.value);
        break;
      case "equalsIgnoreCase":
        result = String(fieldValue).toLowerCase() == String(rule.value).toLowerCase();
        break;
      case "lengthEquals":
        result = !!fieldValue && String(fieldValue).length == rule.value;
        break;
      case "lengthGreater":
        result = !!fieldValue && this.isGreaterThan(String(fieldValue).length, rule.value);
        break;
      case "lengthLess":
        result = !!fieldValue && this.isLessThan(String(fieldValue).length, rule.value);
        break;
      case "lengthGreaterAndEquals":
        result = !!fieldValue && this.isGreaterThanEqual(String(fieldValue).length, rule.value);
        break;
      case "lengthLessAndEquals":
        result = !!fieldValue && this.isLessThanEqual(String(fieldValue).length, rule.value);
        break;
      case "notEquals":
        if ((isNull(fieldValue) && String(rule.value) === "None") || String(fieldValue) !== String(rule.value)) {
          result = true;
        }
        break;
      default:
        if ((isNull(fieldValue) && String(rule.value) === "None") || String(fieldValue) == String(rule.value)) {
          result = true;
        }
        break;
    }
    return result;
  };
  convertCase = (stringValue): string => {
    return stringValue.toLowerCase();
  };
  isGreaterThan = (fieldValue: number, value: number): boolean => {
    return fieldValue > value;
  };
  isGreaterThanEqual = (fieldValue: number, value: number): boolean => {
    return fieldValue >= value;
  };
  isLessThan = (fieldValue: number, value: number): boolean => {
    return fieldValue < value;
  };
  isLessThanEqual = (fieldValue: number, value: number): boolean => {
    return fieldValue <= value;
  };
  getDataListValues = (payload): Observable<any> => {
    const url = `${this.config.getApiUrls().getDataListValuesURL}`;
    return this.postData(url, payload);
  };
  uploadFile = (formData, params): Observable<any> => {
    const url = `${this.config.getApiUrls().uploadFile}`;
    return this.postData(url, formData, params);
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
    return this.postData(url, payload, params);
  };
  //  Save and validate screen
  saveAndValidateScreen = (params, payload: any): Observable<any> => {
    const url = `${this.config.getApiUrls().saveAndValidateScreenURL}`;
    return this.postData(url, payload, params);
  };
  // Get screen details based on action id
  getScreenData = (transactionId, params): Observable<any> => {
    const url = `${this.config.getApiUrls().getScreenDataURL}/${transactionId}`;
    return this.getData(url, params);
  };
  // submit Action
  submitMultipleAction = (transactionId, params, data = {}): Observable<any> => {
    const url = `${this.config.getApiUrls().submitMultipleAction}/${transactionId}`;
    return this.postData(url, data, params);
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
    const url = `${this.config.getApiUrls().updateTableRowDataURL}`;
    return this.putData(url, payload, params);
  };

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
  calculateFormulaValue(item, payloadFields): any {
    let formulaValue = "";
    let formula = [];
    if (item?.metaData?.formula?.length > 0) {
      item?.metaData?.formula.forEach((field) => {
        if (field?.resourceType === resourceType.PAYLOAD_FIELD) {
          formula.push(getFieldFromFields(payloadFields, field?.id));
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
    const currField = getFieldFromFields(payloadFields, item?.id);
    currField.value.value = formulaValue;
    return formulaValue;
  }
  getCoditions(ifConditionsIds: any): any {
    return this.getConditionDetails()?.filter((item: any) => ifConditionsIds.includes(item?.id)) || [];
  }
  calcDate(date1, date2) {
    var diff = Math.floor(date1.getTime() - date2.getTime());
    var day = 1000 * 60 * 60 * 24;
    var days = Math.floor(diff / day);
    var months = Math.floor(days / 31);
    var years = Math.floor(months / 12);
    return { days: days, months: months, years: years };
  }
  addMonths(dateValue, months = 0) {
    const result = new Date(dateValue);
    result.setMonth(result.getMonth() + Number(months));
    return result;
  }
  addDays(date, days) {
    var result = new Date(date);
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
}
