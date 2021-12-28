import {Component, Input, OnInit, Optional, Self} from '@angular/core';
import {ControlValueAccessor, NgControl, ValidatorFn, Validators} from "@angular/forms";
import {hasRequiredField} from "../utils";

@Component({
  selector: 'finlevit-lib-multi-select',
  templateUrl: './multi-select.component.html',
  styleUrls: ['./multi-select.component.scss']
})
export class MultiSelectComponent implements OnInit, ControlValueAccessor {

  constructor(@Optional() @Self() public controlDir: NgControl) {
    if (this.controlDir) {
      this.controlDir.valueAccessor = this;
    }}
  @Input() filter : boolean  = false;
  @Input() showClear : boolean  = false;
  @Input() showHeader : boolean  = true;
  @Input() options: any[] = [];
  @Input() optionLabel : string = '';
  @Input() optionValue : string = '';
  @Input() isRequired = false;
  @Input() validators: any = [];
  @Input() placeholder: string = '';
  @Input() isSmall = false;
  @Input() isLarge = false;
  @Input() tooltip = '';
  @Input() label = '';
  @Input() error = false;
  @Input() showErrorBorder = true;
  @Input() isDisabled = false;
  @Input() maxSelectedLabels : number = 100;
  @Input() chip : boolean = false;
  @Input() errorMsg = '';

  _value: any = null;

  ngOnInit() {
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
  setInputValue(value: any) {
    this._value = value;
  }

  writeValue(obj: any): void {
    this.setInputValue(obj);
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  onLocalFocus($event: any) {}

  onLocalTouched($event: any) {
    this.onTouched();
  }
  onTouched() {}
  onChange(event: any) {}

  onLocalChange($event: any) {
    const value = $event.value;
    this.setInputValue(value);
    this.onChange(value);
  }
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
