import { Component, Input, OnInit, Optional, Self } from "@angular/core";
import { ControlValueAccessor, NgControl, ValidatorFn, Validators } from "@angular/forms";
import { getUniqueId, hasRequiredField } from "../utils";

@Component({
  selector: "finlevit-lib-checkbox",
  templateUrl: "./checkbox.component.html",
  styleUrls: ["./checkbox.component.scss"]
})
export class CheckboxComponent implements ControlValueAccessor, OnInit {
  _id: string;
  constructor(@Optional() @Self() public controlDir: NgControl) {
    if (this.controlDir) {
      this.controlDir.valueAccessor = this;
    }
    this._id = getUniqueId("checkbox");
  }
  _value: boolean = false;
  @Input() isDisabled: boolean = false;
  @Input() showErrorBorder: boolean = true;
  @Input() isRequired: boolean = false;
  @Input() label: string = "";
  @Input() errorMsg: string = "";
  @Input() isSmall: boolean = false;
  @Input() isLarge: boolean = false;
  @Input() error: boolean = false;
  @Input() showErrorMsg: boolean = true;
  @Input() tooltip: string = "";
  ngOnInit(): void {
    const control = this.controlDir && this.controlDir.control;
    if (control) {
      const validators: ValidatorFn[] = control.validator ? [control.validator] : [];
      if (this.isRequired) {
        validators.push(Validators.required);
      }
      control.setValidators(validators);
      control.updateValueAndValidity();
      this.isRequired = hasRequiredField(control);
    }
  }
  writeValue(obj: any): void {
    this._value = !!obj;
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
  onLocalChange($event: any) {
    const value = $event.value;
    this._value = value;
    this.onChange(value);
  }
  onLocalFocus($event: any) {}
  onChange(event: any) {}
  onTouched() {}
  checkError() {
    return (this.controlDir && !this.controlDir?.control?.valid && this.controlDir?.control?.touched) || this.error;
  }
}
