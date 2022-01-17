import { Component, Input, OnInit, Optional, Self } from "@angular/core";
import { ControlValueAccessor, NgControl, ValidatorFn, Validators } from "@angular/forms";
import { hasRequiredField } from "../utils";

enum LabelPos {
  Left = "Left",
  Top = "Top",
  Down = "Down",
  Right = "Right",
}

@Component({
  selector: "finlevit-lib-select",
  templateUrl: "./select.component.html",
  styleUrls: ["./select.component.scss"],
})
export class SelectComponent implements ControlValueAccessor, OnInit {
  constructor(@Optional() @Self() public controlDir: NgControl) {
    if (this.controlDir) {
      this.controlDir.valueAccessor = this;
    }
  }
  @Input() iconOptions: boolean = false;
  @Input() filter: boolean = false;
  @Input() showClear: boolean = false;
  @Input() independentBorders: boolean = false;
  @Input() allowLabelWrapping: boolean = false;
  @Input() optionDisabled: string = "";
  @Input()
  set options(data) {
    this._options = data;
    if (data && Array.isArray(data) && data.length && typeof data[0] !== "object") {
      this._options = this._options.map((option) => {
        return {
          name: option,
          value: option,
        };
      });
      if (!this.optionValue) {
        this.optionValue = "value";
      }
    }
  }
  get options() {
    return this._options;
  }

  @Input() optionLabel: string = "name";
  @Input() optionValue: string = "";
  @Input() isRequired = false;
  @Input() validators: any = [];
  @Input() placeholder: string = "";
  @Input() isSmall = false;
  @Input() isMedium = false;
  @Input() isLarge = false;
  @Input() tooltip = "";
  @Input() label = "";
  @Input() error = false;
  @Input() showErrorBorder = true;
  @Input() isDisabled = false;
  @Input() errorMsg = "";
  @Input() labelPos: LabelPos;
  @Input() showErrorMsg: boolean = true;

  _options = [];
  _value: any = null;
  labelPosTypes = LabelPos;

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
    Object.keys(errors || {}).forEach((error) => {
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
