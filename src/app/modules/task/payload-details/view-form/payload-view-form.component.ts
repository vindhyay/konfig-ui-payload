import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { DataTypes } from '../../model/payload-field.model';
import {getErrorMessages, getValueFromObjectByPath} from "../../../../utils";
import {EditorService} from "../../editor.service";
import {ButtonActions} from '../../model/create-form.models';
import {ActivatedRoute} from "@angular/router";
import {AuthService} from "../../../auth/services/auth.service";

@Component({
  selector: 'app-payload-view-form',
  templateUrl: './payload-view-form.component.html',
  styleUrls: ['./payload-view-form.component.scss']
})
export class PayloadViewFormComponent implements OnInit {
  @Input() payloadFields = [];
  @Input() showActions = false;
  @Output() onSubmit = new EventEmitter();
  @Output() onSave = new EventEmitter();
  _payloadFields = [];

  constructor(private editorService: EditorService, private activatedRoute: ActivatedRoute,
              private authService: AuthService,) {}
  ngOnInit() {
    this._payloadFields = JSON.parse(JSON.stringify(this.payloadFields));
    this.editorService.setContainerHeight(this._payloadFields);
  }
  files: any = [];
  convertPayload(data : any, isArray = false) {
    let payload: any = isArray ? [] : {};
    data.forEach((field : any) => {
      if (field.type === DataTypes.object) {
        if (isArray) {
          payload.push(this.convertPayload(field.children, field.type === DataTypes.array));
        } else {
          payload[field.displayName] = this.convertPayload(field.children, field.type === DataTypes.array);
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
            payload[field.displayName] = this.convertPayload(field.children, field.type === DataTypes.array);
          } else {
            payload[field.displayName] = getValueFromObjectByPath(field, 'value.value') || [];
          }
        }
      }
      if (field.type !== DataTypes.array && field.type !== DataTypes.object) {
        if (isArray) {
          payload.push(getValueFromObjectByPath(field, 'value.value') || '');
        } else if (field.type === DataTypes.file) {
          this.files.push(getValueFromObjectByPath(field, 'value.value') || '');
        } else {
          payload[field.displayName] = getValueFromObjectByPath(field, 'value.value') || '';
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
          field.errorMsg = getErrorMessages(tempFormControl.errors, field?.label || field?.displayName)[0];
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
      this.onSubmit.emit({ payload: this.convertPayload(this._payloadFields), files: this.files });
    }
  }
  saveForLater() {
    this.onSave.emit(this._payloadFields);
  }
  onEditField($event: any) {
    console.log('i got it', $event);
  }

  onBtnClick($event){
    const { type } = $event
    if(type === ButtonActions.submit){
      this.submit();
    }
    if(type === ButtonActions.logout){
      this.authService.logoff(false, this.activatedRoute);
    }
  }
}
