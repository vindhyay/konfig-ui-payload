import { Component, EventEmitter, Input, NgZone, OnDestroy, OnInit, Output } from "@angular/core";
import { FieldData } from "../model/field-data.model";
import { BaseWidget, Column, TableMetaData, WidgetTypes } from "../model/create-form.models";
import { AddressDetails, DeepCopy, getFieldFromFields, parseApiResponse, validateFields } from "../../../utils";
import { AuthService } from "../../auth/services/auth.service";
import { EditorService } from "../editor.service";
import * as moment from "moment";
import { LoaderService } from "../../../services/loader.service";
import { BaseComponent } from "../../shared/base/base.component";
import { NotificationService } from "../../../services/notification.service";

@Component({
  selector: "app-payload-form-field",
  templateUrl: "./payload-form-field.component.html",
  styleUrls: ["./payload-form-field.component.scss"],
})
export class PayloadFormFieldComponent extends BaseComponent implements OnInit, OnDestroy {
  _item: BaseWidget = {} as BaseWidget;
  Text: WidgetTypes = WidgetTypes.Text;
  Table: WidgetTypes = WidgetTypes.Table;
  AdvTable: WidgetTypes = WidgetTypes.AdvTable;
  TransactionTable: WidgetTypes = WidgetTypes.TransactionTable;
  Button: WidgetTypes = WidgetTypes.Button;
  CollapseContainer: WidgetTypes = WidgetTypes.CollapseContainer;
  Container: WidgetTypes = WidgetTypes.Container;
  TabContainer: WidgetTypes = WidgetTypes.TabContainer;
  StepperContainer: WidgetTypes = WidgetTypes.StepperContainer;
  Dropdown: WidgetTypes = WidgetTypes.Dropdown;
  RadioGroup: WidgetTypes = WidgetTypes.RadioGroup;
  DatePicker: WidgetTypes = WidgetTypes.DatePicker;
  Header: WidgetTypes = WidgetTypes.Header;
  Footer: WidgetTypes = WidgetTypes.Footer;
  Image: WidgetTypes = WidgetTypes.Image;
  TextInput: WidgetTypes = WidgetTypes.TextInput;
  PasswordInput: WidgetTypes = WidgetTypes.PasswordInput;
  SSNInput: WidgetTypes = WidgetTypes.SSNInput;
  Email: WidgetTypes = WidgetTypes.Email;
  PhonenumberInput: WidgetTypes = WidgetTypes.PhonenumberInput;
  ErrorContainer: WidgetTypes = WidgetTypes.ErrorContainer;
  TextArea: WidgetTypes = WidgetTypes.TextArea;
  Number: WidgetTypes = WidgetTypes.Number;
  Checkbox: WidgetTypes = WidgetTypes.Checkbox;
  Modal: WidgetTypes = WidgetTypes.Modal;
  CheckboxGroup: WidgetTypes = WidgetTypes.CheckboxGroup;
  Upload: WidgetTypes = WidgetTypes.Upload;
  Divider: WidgetTypes = WidgetTypes.Divider;
  Spacer: WidgetTypes = WidgetTypes.Spacer;
  Icon: WidgetTypes = WidgetTypes.Icon;
  Avatar: WidgetTypes = WidgetTypes.Avatar;
  Address: WidgetTypes = WidgetTypes.Address;

  transactionStatus = null;
  hide = false;
  disable = false;
  readonlyMode = false;

  constructor(
    private authService: AuthService,
    private editorService: EditorService,
    private loaderService: LoaderService,
    private notificationService: NotificationService,
    private zone: NgZone
  ) {
    super();
  }

  @Input() emitButtonEvent: boolean = false;
  @Output() onBtnClick = new EventEmitter();

  @Input()
  set options(optionsData: any) {
    if (this.item?.metaData?.widgetType === WidgetTypes.Table) {
      this.item.value = {
        id: this.item?.value?.id,
        value: optionsData?.length ? optionsData : this.item?.value?.value?.length ? this.item.value.value : [],
      };
    }
  }
  @Input()
  get item() {
    return this._item;
  }
  set item(data: BaseWidget) {
    if (!data.value || typeof data.value != "object" || !data.value.value) {
      data.value = { id: data?.value?.id, value: data?.value?.value ? data.value : null };
    }
    if (data?.metaData?.widgetType === WidgetTypes.Table) {
      const metaData = data.metaData as TableMetaData<Column>;
      data.value = {
        id: data?.value?.id,
        value: metaData?.options?.length ? metaData.options : data?.value?.value?.length ? data.value.value : [],
      };
    }
    if (data?.metaData?.widgetType === WidgetTypes.Checkbox) {
      data.value = { id: data?.value?.id, value: data?.value?.value || false };
    }
    if (data?.validators?.minDate) {
      data.validators.minDate = new Date(data?.validators?.minDate);
    }
    if (data?.validators?.maxDate) {
      data.validators.maxDate = new Date(data?.validators?.maxDate);
    }
    this._item = data;
  }
  @Input() parent: FieldData = {} as FieldData;
  @Input() fieldIndex: number = 0;
  @Input() addMode = true;
  @Input() showEdit = true;
  @Input() viewMode = false;
  @Input() showDelete = true;
  @Output() edit = new EventEmitter();
  allAvailableFields = [];
  private _payloadFields: any;
  get payloadFields(): any {
    return this._payloadFields;
  }
  transactionDetailsSubscription = null;
  ngOnDestroy() {
    if (this.transactionDetailsSubscription) {
      this.transactionDetailsSubscription.unsubscribe();
    }
  }

  isError(item) {
    return item?.errorMessage?.length > 0 || item.error === true;
  }

  ngOnInit() {
    this.transactionDetailsSubscription = this.editorService.transactionDetails$.subscribe((value) => {
      if (value) {
        this._payloadFields = value.uiPayload;
        this.transactionStatus = value?.transactionStatus || null;
        this.getAllAvailableFields(this.payloadFields);
        this.allAvailableFields.forEach((field) => {
          if (field?.value?.value && field?.metaData?.usedInFormula) {
            this.calculateFormulaValue(this.item, true);
          }
        });
        const { id = "" } = this.authService.getAgentRole() || {};
        if (this.item.permissions && this.item?.permissions[id]) {
          this.hide = this.item?.permissions[id].hide
            ? this.item?.permissions[id].hide.indexOf(this.transactionStatus) > -1
            : false;
          this.disable = this.item?.permissions[id].disable
            ? this.item?.permissions[id].disable.indexOf(this.transactionStatus) > -1
            : false;
          if (this.hide) {
            if (this.item.rows) {
              setTimeout(() => {
                this.onCollapse(false, this.item);
              });
            }
          } else {
            if (!this.item?.metaData?.isHidden && !this.item.rows) {
              setTimeout(() => {
                this.onCollapse(true, this.item);
              });
            }
          }
        }
        setTimeout(() => {
          this.editorService.setContainerHeight(this._payloadFields);
        });
      }
    });
    this.readonlyMode = this.item?.metaData?.readOnly;
    this.subscribe(this.editorService.loaderField$, (fieldId) => {
      this.loading = fieldId === this.item?.widgetId;
    });
  }

  ngAfterViewInit() {
    // Apply conditions based on default value
    setTimeout(() => {
      this.onChange(this.item?.value?.value);
    });
  }
  editMode: boolean = false;

  btnClick($event, data) {
    $event.stopPropagation();
    if (this.readonlyMode || this.disable) {
      return;
    }
    if (this.emitButtonEvent) {
      this.onBtnClick.emit({ event: $event, data });
    } else {
      this.editorService.onBtnClick({ event: $event, data });
    }
  }
  onRowEdit = (data) => {
    return new Promise((resolve, reject) => {
      const params = { action: "update" };
      const payload = DeepCopy.copy(this.item);
      payload.children = [data];
      this.editorService.updateTableRowData(payload, params).subscribe(
        (result) => {
          const { data, error } = parseApiResponse(result);
          if (data && !error) {
            this.item.children = data?.children;
            resolve(result);
          } else {
            this.notificationService.error("Failed to update row", "Error");
            reject(error);
          }
        },
        (error) => {
          this.notificationService.error("Failed to update row", "Error");
          reject(error);
        }
      );
    });
  };

  onRowDelete = (data) => {
    return new Promise((resolve, reject) => {
      const params = { action: "delete" };
      const payload = DeepCopy.copy(this.item);
      payload.children = [data];
      this.editorService.updateTableRowData(payload, params).subscribe(
        (result) => {
          const { data, error } = parseApiResponse(result);
          if (data && !error) {
            this.item.children = data?.children;
            resolve(result);
          } else {
            this.notificationService.error("Failed to delete row", "Error");
            reject(error);
          }
        },
        (error) => {
          this.notificationService.error("Failed to delete row", "Error");
          reject(error);
        }
      );
    });
  };

  optionChange($event, data) {
    const metaData = this.item.metaData;
    if (!!metaData["onChangeConfigs"] && metaData["onChangeConfigs"]?.length) {
      this.editorService.onOptionChange({ event: $event, data });
    } else if (metaData?.businessRuleIds?.length) {
      this.editorService.onRuleTrigger({ event: $event, data });
    }
    this.onChange($event);
  }

  onCollapse(status, item) {
    if (!status) {
      this.item.rows = item?.metaData?.hideRows || 0;
      this.item.minItemRows = item?.metaData?.hideRows || 0;
      this.item.metaData.movement = "UP";
    } else {
      this.item.rows = item.metaData?.defaultRows;
      this.item.minItemRows = item.metaData?.defaultMinItemRows;
      this.item.minItemCols = item.metaData?.defaultMinItemCols;
      this.item.metaData.movement = "DOWN";
    }
    this.editorService.widgetChange.next(item);
    this.editorService.setContainerHeight(this.editorService.getFormFields());
  }

  onChange($event) {
    const ifConditionsIds = this.item.metaData?.conditionRuleIds;
    if (ifConditionsIds?.length) {
      const ifConditions = this.editorService.getCoditions(ifConditionsIds);
      if (ifConditions?.length) {
        this.editorService.checkCondition(ifConditions);
      } else if (ifConditions && !ifConditions?.length) {
        this.editorService.checkCondition([{ ...ifConditions }]);
      }
    }
  }

  validateField($event: any, field: any) {
    validateFields([field]);
  }

  visitedFields = [];

  calculateFormulaValue(field, callingFirst) {
    if (callingFirst) {
      this.visitedFields = [];
    }
    this.visitedFields.push(field);
    this.allAvailableFields.forEach((fld) => {
      if (fld?.metaData?.isFormulaField) {
        let fieldUsedInFormula = fld?.metaData?.formula.find(
          (formulaField) => formulaField?.widgetId === field?.widgetId
        );
        if (fieldUsedInFormula) {
          this.computeFormula(fld, this.payloadFields);
          if (fld?.metaData?.usedInFormula && !this.checkVisitedField(fld)) {
            this.calculateFormulaValue(fld, false);
          }
        }
      }
    });
  }

  getAllAvailableFields(fields) {
    fields.forEach((field) => {
      this.allAvailableFields.push(field);
      if (field.children && field.children.length) {
        this.getAllAvailableFields(field.children);
      }
    });
  }

  checkVisitedField(field): boolean {
    if (this.visitedFields.indexOf(field) < 0) {
      return false;
    }
    if (this.visitedFields.indexOf(field) > -1) {
      return true;
    }
  }

  computeFormula(item, payloadFields): any {
    let formulaValue;
    let formula = [];
    if (item?.metaData?.formula?.length > 0) {
      item?.metaData?.formula.forEach((field) => {
        if (field?.resourceType === resourceType.PAYLOAD_FIELD) {
          let formulaField = this.allAvailableFields.find((fld) => fld?.widgetId === field?.widgetId);
          formula.push(getFieldFromFields(payloadFields, formulaField?.widgetId));
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
        this.editorService.onPopulate_TriggerCondition([item]);
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
        this.editorService.onPopulate_TriggerCondition([item]);
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
        this.editorService.onPopulate_TriggerCondition([item]);
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
        this.editorService.onPopulate_TriggerCondition([item]);
        item.value.value = formulaValue;
        return formulaValue;
    }
  }

  checkHeight(child?) {
    if (child.children?.length) {
      this.editorService.setAdjustableHeight(child?.children, ".nested-grid-container");
    }
  }

  onAutocompleteSelected($event: AddressDetails) {
    let streetNumber = $event?.streetNumber ? $event?.streetNumber : "";
    let streetName = $event?.streetName ? $event?.streetName : "";
    let locality = $event.locality?.value ? $event.locality?.value : "";
    let state = $event.state?.value ? $event.state?.value : "";
    let postalCode = $event?.postalCode ? $event?.postalCode : "";

    let address = {
      streetNumber: streetNumber,
      streetName: streetName,
      locality: locality,
      state: state,
      postalCode: postalCode,
    };
    let details = {
      widget: this.item,
      address: address,
    };
    this.zone.run(() => {
      this.item.value.value = "";
    });
    this.notificationService.addressAutoComplete.next(details);
  }
}

export enum resourceType {
  PAYLOAD_FIELD = "payload-field",
  FUNCTION = "function",
  BRACKET = "bracket",
}
