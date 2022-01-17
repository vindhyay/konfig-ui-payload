import { Component, EventEmitter, Input, OnInit, Optional, Output, Self } from "@angular/core";
import { ControlValueAccessor, NgControl, ValidatorFn, Validators } from "@angular/forms";
import { hasRequiredField } from "../utils";

enum LabelPos {
  Left = "Left",
  Top = "Top",
  Down = "Down",
  Right = "Right",
}

@Component({
  selector: "finlevit-lib-textarea",
  templateUrl: "./textarea.component.html",
  styleUrls: ["./textarea.component.scss"],
})
export class TextareaComponent implements ControlValueAccessor, OnInit {
  constructor(@Optional() @Self() public controlDir: NgControl) {
    if (this.controlDir) {
      this.controlDir.valueAccessor = this;
    }
  }
  @Input() autoResize = false;
  @Input() showErrorBorder = true;
  @Input() isSmall = false;
  @Input() isLarge = false;
  @Input() rows = 3;

  @Input() isDisabled = false;
  @Input() isRequired = false;
  @Input() tooltip = "";
  @Input() label = "";
  @Input() placeholder = "";
  @Input() labelPos: LabelPos;
  @Input() independentBorders: boolean = false;
  @Input() allowLabelWrapping: boolean = false;

  @Input() errorMsg = "";
  @Input() error = false;
  @Input() showErrorMsg: boolean = true;
  @Input() showCharCount: boolean = false;

  @Input() validators: any = [];

  @Output() onBlur = new EventEmitter();

  _value: any = null;
  labelPosTypes = LabelPos;
  STRING = String;

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
    this.onBlur.emit($event);
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
