import { Component, ElementRef, EventEmitter, Input, OnInit, Optional, Output, Self, ViewChild } from '@angular/core';
import { ControlValueAccessor, NgControl, ValidatorFn, Validators } from '@angular/forms';
import { hasRequiredField } from '../utils';

@Component({
  selector: 'finlevit-text',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss']
})
export class InputComponent implements ControlValueAccessor, OnInit {
  constructor(@Optional() @Self() public controlDir: NgControl) {
    if (this.controlDir) {
      this.controlDir.valueAccessor = this;
    }
  }

  @ViewChild('input', { static: true }) input: ElementRef | undefined;
  @Input() isDisabled: boolean = false;
  @Input() type = 'text';
  @Input() noSpaces: boolean = false;
  @Input() isRequired: boolean = false;
  @Input() toCapital: boolean = false;
  @Input() toLower: boolean = false;
  @Input() toCapitalize: boolean = false;
  @Input() toNumber: boolean = false;
  @Input() tooltip: string = '';
  @Input() pattern: string = '';
  @Input() label: string = '';
  @Input() placeholder: string = '';
  @Input() errorMsg: string = '';
  @Input() error: boolean = false;
  @Input() validators: any = [];
  @Input() maxCharLimit: number = 200;
  @Input() showMaxCharLimit: boolean = false;
  @Input() isSmall: boolean = false;
  @Input() isLarge: boolean = false;
  @Input() rightIcon: string = '';
  @Input() leftIcon: string = '';
  @Output() onBlur = new EventEmitter();
  _value: any = null;
  iconClass: any = '';
  STRING = String;

  getInputType():string{
    if(this.type==='PasswordInput'){
      return 'password';
    }
    return this.type;
  }
  ngOnInit() {
    const control = this.controlDir && this.controlDir.control;
    if (control) {
      const validators: ValidatorFn[] = control.validator ? [control.validator] : [];
      if (this.isRequired) {
        validators.push(Validators.required);
      }
      if (this.pattern) {
        validators.push(Validators.pattern(this.pattern));
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
    this.onBlur.emit($event);
  }
  onTouched() {}
  onChange(event: any) {}

  onLocalChange($event: any) {
    let value = $event.target.value;
    if (this.toCapital) {
      value = value.toUpperCase();
    }
    if (this.toLower) {
      value = value.toLowerCase();
    }
    if (this.toCapitalize) {
      value = this.capitalLetter(value);
    }
    if (this.noSpaces) {
      value = value.replace(/\s+/g, '');
    }
    if (this.toNumber) {
      value = value ? Number(value) : null;
    }
    this.setInputValue(value);
    this.onChange(value);
  }

  capitalLetter(str: any) {
    str = str.split(' ');
    for (var i = 0, x = str.length; i < x; i++) {
      if (str[i][0]) {
        str[i] = str[i][0].toUpperCase() + str[i].substr(1);
      }
    }
    return str.join(' ');
  }

  checkError() {
    return (this.controlDir && !this.controlDir.control?.valid && this.controlDir.control?.touched) || this.error;
  }

  getErrorMessages() {
    const errors = this.controlDir.control?.errors;
    const errorMessages: string[] = [];
    console.log(errors);
    Object.keys(errors || {}).forEach(error => {
      switch (error) {
        case 'required':
          errorMessages.push(`${this.label} is required`);
          break;
        case 'pattern':
          errorMessages.push(`${this.label} is not valid`);
          break;
        case 'minlength':
        case 'maxlength':
          if (errors) {
            errorMessages.push(
              `Expected atleast length ${errors[error].requiredLength} but got ${errors[error].actualLength}`
            );
          }
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
