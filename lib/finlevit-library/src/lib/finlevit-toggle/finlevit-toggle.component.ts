import { Component, ElementRef, Input, OnInit, Optional, Self, ViewChild } from "@angular/core";
import { ControlValueAccessor, NgControl, ValidatorFn, Validators } from "@angular/forms";
import { hasRequiredField } from "../utils";

@Component({
  selector: "finlevit-toggle",
  templateUrl: "./finlevit-toggle.component.html",
  styleUrls: ["./finlevit-toggle.component.scss"]
})
export class FinlevitToggleComponent implements ControlValueAccessor, OnInit {
  constructor(@Optional() @Self() public controlDir: NgControl) {
    if (this.controlDir) {
      this.controlDir.valueAccessor = this;
    }
  }
  @ViewChild("input", { static: true }) input: ElementRef;

  @Input() disabled: boolean = false;
  @Input() showErrorBorder: boolean = true;
  @Input() isRequired: boolean = false;
  @Input() label: string = "";
  @Input() errorMsg: string = "";
  @Input() isSmall: boolean = false;
  _value: boolean = false;
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
    this._value = obj;
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
  onLocalChange($event) {
    let value = $event.target.checked;
    this._value = value;
    this.onChange(value);
  }
  onLocalFocus($event) {}
  onChange(event) {}
  onTouched() {}
}
