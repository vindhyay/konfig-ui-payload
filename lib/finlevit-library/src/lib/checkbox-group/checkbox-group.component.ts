import { Component, ElementRef, Input, OnInit, Optional, Self, ViewChild } from '@angular/core';
import { ControlValueAccessor, NgControl, ValidatorFn, Validators } from '@angular/forms';
import { getUniqueId, hasRequiredField } from '../utils';

enum LabelPos {
  Left = "Left",
  Top = "Top",
  Down = "Down",
  Right = "Right"
}

@Component({
  selector: 'finlevit-lib-checkbox-group',
  templateUrl: './checkbox-group.component.html',
  styleUrls: ['./checkbox-group.component.scss']
})
export class CheckboxGroupComponent implements OnInit, ControlValueAccessor {
  _id: string;
  constructor(@Optional() @Self() public controlDir: NgControl) {
    if (this.controlDir) {
      this.controlDir.valueAccessor = this;
    }
    this._id = getUniqueId('checkbox');
  }
  @Input() alignOptions: "Horizontal" | "Vertical" = "Horizontal";

  @ViewChild('input', { static: true }) input: ElementRef | undefined;
  @Input() showErrorBorder = true;
  @Input() isSmall = false;
  @Input() isLarge = false;
  @Input() items: any[] = [];
  @Input() optionValue: string = '';
  @Input() optionLabel: any = '';
  @Input() isDisabled = false;
  @Input() isRequired = false;
  @Input() tooltip = '';
  @Input() label = '';
  @Input() labelPos: LabelPos = LabelPos.Right;
  @Input() placeholder = '';
  @Input() errorMsg = '';
  @Input() showErrorMsg: boolean = true;
  @Input() error = false;
  @Input() validators: any = [];
  @Input() columns: number = 1;
  @Input() allowLabelWrapping: boolean = false;
  optionTooltip: any = 'tooltip'
  _selectedValues: any[] = ['Salary'];
  labelPosTypes = LabelPos;

  ngOnInit(): void {
    const control = this.controlDir && this.controlDir.control;
    if (control) {
      const validators: ValidatorFn[] = control.validator ? [control.validator] : [];
      if (this.isRequired) {
        validators.push(Validators.required);
      }
      if (this.validators && this.validators.length) {
        this.validators.forEach((validator: ValidatorFn) => {
          validators.push(validator);
        });
      }
      control.setValidators(validators);
      control.updateValueAndValidity();
      this.isRequired = hasRequiredField(control);
    }
  }

  writeValue(value: any): void {
    console.log('value from coed', value);
    this._selectedValues = value || [];
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
  onLocalChange() {
    this.onChange(this._selectedValues);
  }
  onLocalFocus($event: any) {}
  onChange(event: any) {}
  onTouched() {}

  checkError() {
    return (this.controlDir && !this.controlDir.control?.valid && this.controlDir.control?.touched) || this.error;
  }

  getErrorMessages() {
    const errors = this.controlDir.control?.errors;
    const errorMessages: string[] = [];
    Object.keys(errors || {}).forEach(error => {
      switch (error) {
        case 'required':
          errorMessages.push(`${this.label} is required`);
          break;
        case 'custom':
          if (errors) {
            errorMessages.push(errors[error]);
          }
          break;
      }
    });
    return errorMessages;
  }
}
