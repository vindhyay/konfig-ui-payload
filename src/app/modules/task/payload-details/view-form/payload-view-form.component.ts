import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { FormControl, Validators } from "@angular/forms";
import { DataTypes } from "../../model/payload-field.model";
import { Action_Config_UI, getErrorMessages, getValidators, getValueFromObjectByPath } from "../../../../utils";
import { EditorService } from "../../editor.service";
import { ButtonActions, WidgetTypes } from "../../model/create-form.models";
import { ActivatedRoute } from "@angular/router";
import { AuthService } from "../../../auth/services/auth.service";
import { NotificationService } from "../../../../services/notification.service";

@Component({
  selector: "app-payload-view-form",
  templateUrl: "./payload-view-form.component.html",
  styleUrls: ["./payload-view-form.component.scss"]
})
export class PayloadViewFormComponent implements OnInit {
  @Input()
  get payloadFields() {
    return this._payloadFields;
  }
  set payloadFields(fields) {
    this._payloadFields = fields;
    this.editorService.setContainerHeight(this._payloadFields);
  }
  @Input() showActions = false;
  @Output() onSubmit = new EventEmitter();
  @Output() onSave = new EventEmitter();
  @Output() onPopulate = new EventEmitter();
  @Output() onUniqueFieldChange = new EventEmitter();
  @Output() onGetScreen = new EventEmitter();
  _payloadFields = [];

  constructor(
    private editorService: EditorService,
    private activatedRoute: ActivatedRoute,
    private authService: AuthService,
    private notificationService: NotificationService
  ) {}
  ngOnInit() {}
  files: any = [];
  convertPayload(data: any, isArray = false) {
    let payload: any = isArray ? [] : {};
    data.forEach((field: any) => {
      if (field?.type === DataTypes.object) {
        if (isArray) {
          payload.push(this.convertPayload(field.children, field.type === DataTypes.array));
        } else {
          payload[field.widgetName] = this.convertPayload(field.children, field.type === DataTypes.array);
        }
      }
      if (field?.type === DataTypes.array) {
        if (isArray) {
          if (field?.children?.length) {
            payload.push(this.convertPayload(field.children, field.type === DataTypes.array));
          } else {
            payload.push(getValueFromObjectByPath(field, "value.value") || []);
          }
        } else {
          if(field?.metaData?.widgetType === WidgetTypes.AdvTable){
            const advTableData = [];
            field?.children.forEach(rowData => {
              const rowObject = this.convertPayload(rowData);
              advTableData.push(rowObject)
            })
            payload[field.widgetName] = advTableData;
          }else if (field?.children?.length) {
            payload[field.widgetName] = this.convertPayload(field.children, field.type === DataTypes.array);
          } else if (field?.metaData?.widgetType === WidgetTypes.Table) {
            payload[field.widgetName] = field?.value?.value?.length
              ? getValueFromObjectByPath(field, "value.value") || []
              : getValueFromObjectByPath(field, "metaData.options") || [];
          } else {
            payload[field.widgetName] = getValueFromObjectByPath(field, "value.value") || [];
          }
        }
      }
      if (!!field && field?.type !== DataTypes.array && field?.type !== DataTypes.object) {
        if (isArray) {
          payload.push(getValueFromObjectByPath(field, "value.value") || "");
        } else {
          const defaultValue = field?.metaData?.widgetType === WidgetTypes.Upload ? {} : "";
          payload[field.widgetName] = getValueFromObjectByPath(field, "value.value") || defaultValue;
        }
      }
    });
    return payload;
  }
  validateFields(fields: any[]) {
    let result = true;
    let errorFields = [];
    fields.forEach((field: any) => {
      if (field?.children && field?.children?.length) {
        const {result:validationStatus, errorFields: errorFieldsData} = this.validateFields(field.children)
        if (!validationStatus) {
          result = false;
          errorFields = errorFields.concat(errorFieldsData)
        }
      } else if(field) {
        const tempFormControl = new FormControl(field?.value?.value, getValidators(field?.validators || {}));
        if (tempFormControl.valid || field?.rows === 0 || field?.metaData?.isHidden) {
          field.error = false;
          field.errorMsg = "";
        } else {
          field.error = true;
          field.errorMsg = getErrorMessages(
            tempFormControl.errors,
            field?.label || field?.displayName || field?.widgetName
          )[0];
          errorFields.push(field);
          result = false;
        }
      }
    });
    return { result, errorFields }
  }
  triggerClicksAll(data,isValidate) {
    if(!isValidate){
      this.onSubmit.emit({ payload: this.convertPayload(this._payloadFields), itemData:data, payloadFields: this.updateValuesFromOptions(this._payloadFields) });
    }else{
      const {result, errorFields} =  this.validateFields(this._payloadFields)
      if (result) {
        this.onSubmit.emit({ payload: this.convertPayload(this._payloadFields), itemData:data, payloadFields: this.updateValuesFromOptions(this._payloadFields) });
      } else {
        let errorMsg = "Failed to validate: "
        if(errorFields.length){
          errorMsg = errorMsg + ' ' + errorFields[0]?.label;
        }
        this.notificationService.error(errorMsg, "Validation error");
      }
    }
  }
  updateValuesFromOptions(data: any) {
    let payload = [];
    data.forEach(field => {
      if (field?.metaData?.widgetType === WidgetTypes.Table) {
        if (field?.value) {
          field.value.value = field.value?.value?.length ? field.value.value : field.metaData.options;
        } else {
          field.value = { id: null, value: field.metaData.options };
        }
      }
      if (field?.children?.length && field?.metaData?.widgetType !== WidgetTypes.AdvTable) {
        field.children = this.updateValuesFromOptions(field.children);
      }
      payload.push(field);
    });
    return payload;
  }
  saveForLater(data) {
    this.onSave.emit({ payloadFields: this.updateValuesFromOptions(this._payloadFields), data });
  }
  onOptionChange($event) {
    const {
      data: {
        isUnique = false,
        value: { value = null },
        metaData: { onChangeConfigs: [{ action: type = "", parameters = [] }] = [] , } = {},
        id
      }
    } = $event;
    if (isUnique) {
      this.onUniqueFieldChange.emit({ id, value });
      return;
    }
    if (type === ButtonActions.populate) {
      let error = false;
      const reqParams = JSON.parse(JSON.stringify(parameters));
      reqParams.map(parameter => {
        const { value, valueType } = parameter;
        if (valueType === "ref") {
          const paramField = this.getValueFromField(this._payloadFields, value);
          const inputValue = paramField?.value?.value;
          if (!inputValue && paramField) {
            error = true;
            const tempFormControl = new FormControl(
              inputValue,
              getValidators({ ...paramField?.validators, required: true })
            );
            if (tempFormControl.valid) {
              paramField.error = false;
              paramField.errorMsg = "";
            } else {
              paramField.error = true;
              paramField.errorMsg = getErrorMessages(
                tempFormControl.errors,
                paramField?.label || paramField?.widgetName
              )[0];
            }
          } else {
            parameter.value = inputValue;
          }
        }
      });
      if (!error) {
        this.onPopulate.emit({ isUnique, triggerId: id, parameters: reqParams, payloadFields: this._payloadFields });
      }
    }
  }

  getScreen(data){
    const {result, errorFields} =  this.validateFields(this._payloadFields)
    if (result) {
      this.onGetScreen.emit({ payloadFields: this.updateValuesFromOptions(this._payloadFields), data });
    } else {
      let errorMsg = "Failed to validate: "
      if(errorFields.length){
        errorMsg = errorMsg + ' ' + errorFields[0]?.label;
      }
      this.notificationService.error(errorMsg, "Validation error");
    }
  }

  onBtnClick($event) {
    const {
      data: {
        metaData: { onClickConfigs = [] },
        id
      },
    } = $event;
    const uiAction= onClickConfigs.filter(item=>Action_Config_UI.includes(item.action));
    const populateActionIndex= onClickConfigs.findIndex(item=>item.action===ButtonActions.populate) || null;
    let error = false;
    const isValidate= onClickConfigs.length && (onClickConfigs[0].action === ButtonActions.submit || onClickConfigs[0].action === ButtonActions.next)
    if (populateActionIndex === 0) {
      const { action: type = "", parameters = [] } = onClickConfigs[populateActionIndex];
      const reqParams = JSON.parse(JSON.stringify(parameters));
      reqParams.map(parameter => {
        const { value, valueType } = parameter;
        if (valueType === "ref") {
          const paramField = this.getValueFromField(this._payloadFields, value);
          const inputValue = paramField?.value?.value;
          if (!inputValue && paramField) {
            error = true;
            const tempFormControl = new FormControl(
              inputValue,
              getValidators({ ...paramField?.validators, required: true })
            );
            if (tempFormControl.valid) {
              paramField.error = false;
              paramField.errorMsg = "";
            } else {
              paramField.error = true;
              paramField.errorMsg = getErrorMessages(
                tempFormControl.errors,
                paramField?.label || paramField?.widgetName
              )[0];
            }
          } else {
            parameter.value = inputValue;
          }
        }
      });
    }
    if(!error){
      this.triggerClicksAll({triggerId: id,data:$event?.data,uiAction:uiAction},isValidate);
    }
  }

  getValueFromField(fields, fieldId) {
    let paramField = null;
    fields.forEach(field => {
      if (field.children && field.children.length) {
        const nestedParamField = this.getValueFromField(field.children, fieldId);
        paramField = nestedParamField || paramField;
      } else {
        if (field?.id === fieldId) {
          paramField = field;
        }
      }
    });
    return paramField;
  }

  onTableDataChange($event) {
    const {
      event: { column: { columnId = "", onChange = "", resultField = "" } = {} },
      tableData: {
        value: { value = [] } = {},
        metaData: { optionPopulateConfig = [], options = [] }
      }
    } = $event;
    const valueData = value ? value : optionPopulateConfig.length ? options : value;
    if (onChange === "sum" && resultField) {
      const resultFieldData = this.getValueFromField(this._payloadFields, resultField);
      let sum = 0;
      valueData.forEach(column => {
        if (column[columnId]) {
          sum = sum + column[columnId];
        }
      });
      resultFieldData.value.value = sum;
    }
  }
}
