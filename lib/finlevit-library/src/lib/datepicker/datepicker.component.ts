import { Component, Input, OnInit, Optional, Self, ViewChild } from "@angular/core";
import { ControlValueAccessor, NgControl, ValidatorFn, Validators } from "@angular/forms";
import { hasRequiredField } from "../utils";

@Component({
  selector: "finlevit-lib-datepicker",
  templateUrl: "./datepicker.component.html",
  styleUrls: ["./datepicker.component.css"]
})
export class DatepickerComponent implements ControlValueAccessor, OnInit {
  constructor(@Optional() @Self() public controlDir: NgControl) {
    if (this.controlDir) {
      this.controlDir.valueAccessor = this;
    }
  }
  @Input() isRequired = false;
  @Input() validators: any = [];
  @Input() placeholder = "";
  @Input() viewDateFormat = "dd/mm/yy";
  @Input() returnDateFormat = "isoTimestamp";
  @Input() isSmall = false;
  @Input() isLarge = false;
  @Input() tooltip = "";
  @Input() label = "";
  @Input() error = false;
  @Input() showErrorBorder = true;
  @Input() showIcon = true;
  @Input() isDisabled = false;
  @Input() errorMsg = "";
  _minDate: Date;
  _maxDate: Date;
  @Input()
  get minDate() {
    return this._minDate;
  }
  set minDate(value) {
    this._minDate = value ? new Date(value) : value;
  }
  @Input()
  get maxDate() {
    return this._maxDate;
  }
  set maxDate(value) {
    this._maxDate = value ? new Date(value) : value;
  }
  @Input() yearNavigator: boolean = true;
  @Input() monthNavigator: boolean = true;
  @Input() showTime: boolean = false;
  @Input() hourFormat: number = 12;
  @Input() stepHour: number = 1;
  @Input() stepMinute: number = 1;

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
    let value = obj;
    if (obj) {
      value = new Date(obj);
    }
    this.setInputValue(value);
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
    const returnValue = this.getReturnDateValue(value);
    this.onChange(returnValue);
  }
  getReturnDateValue(value) {
    return new Date(value).getTime();
  }
  checkError() {
    return (this.controlDir && !this.controlDir.control?.valid && this.controlDir.control?.touched) || this.error;
  }

  getErrorMessages() {
    const errors = this.controlDir.control?.errors;
    const errorMessages: string[] = [];
    Object.keys(errors || {}).forEach(error => {
      switch (error) {
        case "required":
          errorMessages.push(`${this.label} is required`);
          break;
        case "custom":
          if (errors) {
            errorMessages.push(errors[error]);
          }
          break;
      }
    });
    return errorMessages;
  }
}
