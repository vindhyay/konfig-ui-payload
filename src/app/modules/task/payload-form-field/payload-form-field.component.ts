import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {FieldData} from '../model/field-data.model';
import {DataTypes} from '../model/payload-field.model';
import {BaseWidget, NESTED_MIN_COLUMNS, TableMetaData, WidgetTypes} from '../model/create-form.models';
import {getErrorMessages} from '../../../utils';

@Component({
  selector: 'app-payload-form-field',
  templateUrl: './payload-form-field.component.html',
  styleUrls: ['./payload-form-field.component.scss']
})
export class PayloadFormFieldComponent implements OnInit {

  tabActiveIndex = 0;

  _item: BaseWidget = {} as BaseWidget;
  Text: WidgetTypes = WidgetTypes.Text;
  Table: WidgetTypes = WidgetTypes.Table;
  Button: WidgetTypes = WidgetTypes.Button;
  Container: WidgetTypes = WidgetTypes.Container;
  TabContainer: WidgetTypes = WidgetTypes.TabContainer;
  Dropdown: WidgetTypes = WidgetTypes.Dropdown;
  RadioGroup: WidgetTypes = WidgetTypes.RadioGroup;
  DatePicker: WidgetTypes = WidgetTypes.DatePicker;
  Header: WidgetTypes = WidgetTypes.Header;
  Footer: WidgetTypes = WidgetTypes.Footer;
  Image: WidgetTypes = WidgetTypes.Image;
  TextInput: WidgetTypes = WidgetTypes.TextInput;
  TextArea: WidgetTypes = WidgetTypes.TextArea;
  Number: WidgetTypes = WidgetTypes.Number;
  Checkbox: WidgetTypes = WidgetTypes.Checkbox;
  CheckboxGroup: WidgetTypes = WidgetTypes.CheckboxGroup;
  NESTED_MIN_COLUMNS: number = NESTED_MIN_COLUMNS;
  @Input()
  get item() {
    return this._item;
  }
  set item(data: BaseWidget) {
    if (typeof data.value != 'object') {
      data.value = { id: '', value: data.value || '' };
    }
    if(data?.metaData?.widgetType === WidgetTypes.Table){
      const metaData = data.metaData as TableMetaData
      if(metaData.configure){
        metaData.options = metaData.options || [];
      }else{
        data.value = {id: '', value: []}
      }
    }
    this._item = data;
  }
  @Input() parent: FieldData = {} as FieldData;
  @Input() fieldIndex: number = 0;
  @Input() addMode = true;
  @Input() showEdit = true;
  @Input() viewMode = true;
  @Input() showDelete = true;
  @Input() restrictHeight = true;
  @Input() list = null;
  @Input() customClass = '';
  dataTypes = DataTypes;
  @Output() edit = new EventEmitter();
  @Output() onBtnClick = new EventEmitter();
  ngOnInit() {}
  showControls: boolean = false;
  editMode: boolean = false;
  originalValue: any = '';

  onEdit($event: any, item: any) {
    const {
      value: { value = '' },
      metaData: {}
    } = item;
    this.originalValue = JSON.parse(JSON.stringify(value));
    this.editMode = true;
  }

  onCancel() {
    this.item.errorMsg = '';
    this.item.error = false;
    this.item.value.value = this.originalValue;
    this.editMode = false;
  }

  onSave(item: BaseWidget) {
    const {
      value: { value = '' },
      metaData: {}
    } = item;
    const tempFormControl = new FormControl(value, this.getValidators(item.validators));
    if (tempFormControl.valid) {
      this.originalValue = JSON.parse(JSON.stringify(value));
      this.editMode = false;
      this.edit.emit(item);
    }
  }

  toggleControls(status: boolean) {
    this.showControls = this.editMode ? true : status;
  }

  addNew(field: any, children: any) {
    const child = JSON.parse(JSON.stringify(children[0]));
    this.clearValue(child);
    children.push(child);
  }
  clearValue(child: any) {
    if (child && (child.type === DataTypes.object || child.type === DataTypes.array)) {
      child.children.forEach((child: any) => {
        this.clearValue(child);
      });
    } else {
      child.value = { id: null, value: '' };
    }
  }
  remove(parent: any) {
    parent.children.splice(this.fieldIndex, 1);
  }
  validateField($event: any, field: any) {
    const { validators = {}, label = '' } = field;
    const tempFormControl = new FormControl($event, this.getValidators(validators));
    if (tempFormControl.valid) {
      field.value.value = $event;
      field.error = false;
      field.errorMsg = '';
    } else {
      field.error = true;
      field.errorMsg = getErrorMessages(tempFormControl.errors, label);
    }
  }
  getValidators = (validators : any) => {
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
  btnClick($event, data){
    this.onBtnClick.emit({event: $event, data})
  }

  onTabChange($event){
    const { index = 0 } = $event;
    this.tabActiveIndex = index;
    window.dispatchEvent(new Event("resize"));
  }
}
