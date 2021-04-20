import { BindableComponent, VALUE_TYPE } from '../bindable/bindable.component';
import { NgControl } from '@angular/forms';
export declare class BindableInputComponent extends BindableComponent {
  ngControl: NgControl;
  inputType: string | null;
  inputPrefix: string | null;
  inputMask: string | null;
  inputDropSpecialCharacters: boolean | null;
  passwordField: boolean | null;
  datepickerField: boolean | null;
  password: boolean;
  mask: string;
  constructor(ngControl: NgControl);
  valueTypeSetter(value: VALUE_TYPE): void;
  valueGetter(): any;
}
