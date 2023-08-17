import {
  Component,
  EventEmitter,
  Input,
  NgZone,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
} from "@angular/core";
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
export class PayloadFormFieldComponent extends BaseComponent implements OnInit, OnDestroy, OnChanges {
  _item: BaseWidget = {} as BaseWidget;
  Text: WidgetTypes = WidgetTypes.Text;
  URL: WidgetTypes = WidgetTypes.URL;
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
  submissionStatus = "";
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
  @Input() value: any = { id: null, value: "" };
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
        this.submissionStatus = value?.submissionStatus || "";
        this.readonlyMode = this.readonlyMode || this.submissionStatus === "SUBMITTED";
        this.getAllAvailableFields(this.payloadFields);
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

  ngOnChanges(changes: SimpleChanges): void {
    if (!changes.value.firstChange) {
      if (changes.value.currentValue?.value != changes.value.previousValue?.value) {
        validateFields([this._item]);
      }
    }
  }
  ngAfterViewInit() {
    // Apply conditions based on default value and validate using on load value
    setTimeout(() => {
      if (this.item?.value?.value) {
        this.checkForConditions();
        this.validateField(null, this.item);
      }
    });
  }
  editMode: boolean = false;

  btnClick($event: any, data: any) {
    if (!data?.metaData?.widgetType.includes("Container")) {
      $event.stopPropagation();
    }
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

  optionChange($event: any, data: any) {
    const metaData = this.item.metaData;
    if (!!metaData.widgetEvent && metaData.widgetEvent?.length) {
      this.editorService.onOptionChange({ event: $event, data });
    } else if (metaData?.ruleIds?.length) {
      this.editorService.onRuleTrigger({ event: $event, data });
    }
  }

  onCollapse(status: boolean, item: any) {
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

  checkForConditions() {
    const ruleIds = this.item?.metaData?.ruleIds;
    if (ruleIds?.length) {
      this.editorService.onRuleTrigger({ event: {}, data: this.item });
    }
  }

  validateField($event: any, field: any) {
    validateFields([field]);
  }

  visitedFields = [];

  getAllAvailableFields(fields: any) {
    fields.forEach((field) => {
      this.allAvailableFields.push(field);
      if (field.children && field.children.length) {
        this.getAllAvailableFields(field.children);
      }
    });
  }

  checkVisitedField(field: any): boolean {
    if (this.visitedFields.indexOf(field) < 0) {
      return false;
    }
    if (this.visitedFields.indexOf(field) > -1) {
      return true;
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
    let postalCode = $event?.postalCode ? String($event?.postalCode) : "";

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
