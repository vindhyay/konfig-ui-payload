import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { DataTypes } from '../../model/payload-field.model';
import {getErrorMessages, getValueFromObjectByPath} from "../../../../utils";
import {EditorService} from "../../editor.service";
import {ButtonActions, WidgetTypes} from '../../model/create-form.models';
import {ActivatedRoute} from "@angular/router";
import {AuthService} from "../../../auth/services/auth.service";
import {NotificationService} from '../../../../services/notification.service';

@Component({
  selector: 'app-payload-view-form',
  templateUrl: './payload-view-form.component.html',
  styleUrls: ['./payload-view-form.component.scss']
})
export class PayloadViewFormComponent implements OnInit {
  @Input()
  get payloadFields(){
    return this._payloadFields
  }
  set payloadFields(fields){
    this._payloadFields = fields;
    this.editorService.setContainerHeight(this._payloadFields);
  }
  @Input() showActions = false;
  @Output() onSubmit = new EventEmitter();
  @Output() onSave = new EventEmitter();
  @Output() onPopulate = new EventEmitter();
  _payloadFields = [];

  constructor(private editorService: EditorService, private activatedRoute: ActivatedRoute,
              private authService: AuthService, private notificationService: NotificationService) {}
  ngOnInit() {}
  files: any = [];
  convertPayload(data : any, isArray = false) {
    let payload: any = isArray ? [] : {};
    data.forEach((field : any) => {
      if (field.type === DataTypes.object) {
        if (isArray) {
          payload.push(this.convertPayload(field.children, field.type === DataTypes.array));
        } else {
          payload[field.widgetName] = this.convertPayload(field.children, field.type === DataTypes.array);
        }
      }
      if (field.type === DataTypes.array) {
        if (isArray) {
          if (field?.children?.length) {
            payload.push(this.convertPayload(field.children, field.type === DataTypes.array));
          } else {
            payload.push(getValueFromObjectByPath(field, 'value.value') || []);
          }
        } else {
          if (field?.children?.length) {
            payload[field.widgetName] = this.convertPayload(field.children, field.type === DataTypes.array);
          } else if(field?.metaData?.widgetType === WidgetTypes.Table){
            payload[field.widgetName] = field?.metaData?.configure ? (getValueFromObjectByPath(field, 'metaData.options') || []) : (getValueFromObjectByPath(field, 'value.value') || []);
          } else {
            payload[field.widgetName] = getValueFromObjectByPath(field, 'value.value') || [];
          }
        }
      }
      if (field.type !== DataTypes.array && field.type !== DataTypes.object) {
        if (isArray) {
          payload.push(getValueFromObjectByPath(field, 'value.value') || '');
        } else {
          payload[field.widgetName] = getValueFromObjectByPath(field, 'value.value') || '';
        }
      }
    });
    return payload;
  }
  validateFields(fields: any[]) {
    let result = true;
    fields.forEach((field: any) => {
      if (field.children && field.children.length) {
        if (!this.validateFields(field.children)) {
          result = false;
        }
      } else {
        const tempFormControl = new FormControl(field.value.value, this.getValidators(field.validators));
        if (tempFormControl.valid) {
          field.error = false;
          field.errorMsg = '';
        } else {
          field.error = true;
          field.errorMsg = getErrorMessages(tempFormControl.errors, field?.label || field?.widgetName)[0];
          result = false;
        }
      }
    });
    return result;
  }
  getValidators = (validators: any) => {
    const _validators: any = [];
    Object.keys(validators).forEach(validator => {
      switch (validator) {
        case 'minValue':
          validators[validator] && _validators.push(Validators.min(validators[validator]));
          break;
        case 'minLength':
          validators[validator] && _validators.push(Validators.minLength(validators[validator]));
          break;
        case 'maxValue':
          validators[validator] && _validators.push(Validators.max(validators[validator]));
          break;
        case 'maxLength':
          validators[validator] && _validators.push(Validators.maxLength(validators[validator]));
          break;
        case 'required':
          validators[validator] && _validators.push(Validators.required);
          break;
      }
    });
    return _validators;
  };
  submit() {
    if (this.validateFields(this._payloadFields)) {
      this.onSubmit.emit({ payload: this.convertPayload(this._payloadFields) });
    }else{
      this.notificationService.error('Failed to validate','Submit Error')
    }
  }
  saveForLater() {
    this.onSave.emit({ payload: this.convertPayload(this._payloadFields) });
  }
  onEditField($event: any) {
    console.log('i got it', $event);
  }

  onOptionChange($event){
    const { data: {metaData: { onChangeAction: type = '', changeActionParameters:parameters = []} ={}}, data :{ id} } = $event
    if(type === ButtonActions.populate){
      let error = false;
      parameters.map(parameter => {
        const { value } = parameter;
        const paramField = this.getValueFromField(this._payloadFields, value);
        const inputValue = paramField?.value?.value
        if(!inputValue){
          error = true;
          const tempFormControl = new FormControl(inputValue, this.getValidators({...paramField?.validators, required: true}));
          if (tempFormControl.valid) {
            paramField.error = false;
            paramField.errorMsg = '';
          } else {
            paramField.error = true;
            paramField.errorMsg = getErrorMessages(tempFormControl.errors, paramField?.label || paramField?.widgetName)[0];
          }
        }else{
          parameter.value = inputValue
        }
      })
      if(!error){
        this.onPopulate.emit({triggerId: id, parameters, payloadFields: this._payloadFields})
      }
    }
  }

  onBtnClick($event){
    const { data: {metaData: { clickAction: type = '', parameters = []} ={}}, data :{ id} } = $event
    if(type === ButtonActions.submit){
      this.submit();
    }
    if(type === ButtonActions.save){
      this.saveForLater();
    }
    if(type === ButtonActions.logout){
      this.authService.logoff(false, this.activatedRoute);
    }
    if(type === ButtonActions.populate){
      let error = false;
      const reqParams  = JSON.parse(JSON.stringify(parameters))
      reqParams.map(parameter => {
        const { value, valueType } = parameter;
        if(valueType === 'ref'){
          const paramField = this.getValueFromField(this._payloadFields, value);
          const inputValue = paramField?.value?.value
          if(!inputValue && paramField){
            error = true;
            const tempFormControl = new FormControl(inputValue, this.getValidators({...paramField?.validators, required: true}));
            if (tempFormControl.valid) {
              paramField.error = false;
              paramField.errorMsg = '';
            } else {
              paramField.error = true;
              paramField.errorMsg = getErrorMessages(tempFormControl.errors, paramField?.label || paramField?.widgetName)[0];
            }
          }else{
            parameter.value = inputValue
          }
        }
      })
      if(!error){
        this.onPopulate.emit({triggerId: id, parameters: reqParams, payloadFields: this._payloadFields})
      }
    }
  }

  getValueFromField(fields, fieldId){
    let paramField = null;
    fields.forEach(field => {
      if(field.children && field.children.length){
        const nestedParamField = this.getValueFromField(field.children, fieldId);
        paramField = nestedParamField || paramField
      }else{
        if(field?.id === fieldId){
          paramField = field;
        }
      }
    })
    return paramField;
  }
}
