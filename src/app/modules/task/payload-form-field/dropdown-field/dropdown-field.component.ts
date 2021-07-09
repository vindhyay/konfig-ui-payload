import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { BaseWidget, DropdownMetaData } from '../../model/create-form.models';
import {TaskService} from "../../services/task.service";
import {getErrorMessages, parseApiResponse} from '../../../../utils';
import {FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-dropdown-field',
  templateUrl: './dropdown-field.component.html',
  styleUrls: ['./dropdown-field.component.scss']
})
export class DropdownFieldComponent implements OnInit {
  @Input() item: BaseWidget = {} as BaseWidget;
  @Input() viewMode: boolean = false;
  @Input() editMode: boolean = false;
  @Input()
  set dataListId(listId: string) {
    if (listId) {
      this.getValues(listId, this.metaData.parameters);
    }
  }
  @Output() optionChange = new EventEmitter();
  dynamicOptions = [];
  constructor(private taskService: TaskService) {}
  get metaData(): DropdownMetaData {
    return this.item.metaData as DropdownMetaData;
  }
  ngOnInit(): void {}
  getValues(listId: any, params) {
    const payload = { dataListId: listId, parameters: params };
    this.taskService.getDataListValues(payload).subscribe(result => {
      const { data, error } = parseApiResponse(result);
      if (data && !error) {
        if (typeof data === "string") {
          try {
            this.dynamicOptions = JSON.parse(data);
          } catch (error) {
            console.log("Failed to parse options data");
          }
        } else {
          this.dynamicOptions = data;
        }
      } else {
        // TODo error handling
      }
    });
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
  onOptionChange($event:any){
    this.optionChange.emit($event)
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
}
