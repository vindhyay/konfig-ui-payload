import { Component, Input, Optional, Self } from '@angular/core';
import { BindableComponent, VALUE_TYPE } from '../bindable/bindable.component';
import { NgControl } from '@angular/forms';

@Component({
  selector: 'rng-bindable-input',
  templateUrl: './bindable-input.component.html',
  styleUrls: []
})
export class BindableInputComponent extends BindableComponent {
  inputType: string | null = 'text';
  inputPrefix: string | null = '';
  inputMask: string | null = '';
  inputDropSpecialCharacters: boolean | null = true;
  passwordField: boolean | null = false;
  datepickerField: boolean | null = false;

  @Input()
  get password(): boolean {
    return this.inputType === 'password' ? true : false;
  }
  set password(value: boolean) {
    this.inputType = value ? 'password' : 'text';
  }
  @Input()
  get mask(): string {
    return this.inputMask;
  }
  set mask(value: string) {
    this.inputMask = value || '';
  }

  constructor(@Optional() @Self() public ngControl: NgControl) {
    super(ngControl);
  }

  valueTypeSetter(value: VALUE_TYPE) {
    // currency field
    const currency: boolean = value === VALUE_TYPE.CURRENCY;
    this.inputPrefix = currency ? '$ ' : '';
    this.inputMask = currency ? '0*.00' : '';
    this.inputDropSpecialCharacters = !currency;

    // password field
    this.passwordField = value === VALUE_TYPE.PASSWORD;
    this.password = this.passwordField; // initial value

    // datepicker field
    this.datepickerField = value === VALUE_TYPE.DATE;

    super.valueTypeSetter(value);
  }

  valueGetter() {
    const originalValue = super.valueGetter();

    if (!originalValue) {
      return originalValue;
    } // return without modifications

    switch (this.valueType) {
      case VALUE_TYPE.DATE: {
        return this.auxDateFormatter(originalValue);
      }
      case VALUE_TYPE.DURATION: {
        const start = originalValue.start;
        const end = originalValue.end;
        return this.auxDateFormatter(start) + ' - ' + this.auxDateFormatter(end);
      }
      default:
        // no formatting required
        return originalValue;
    }
  }
}
