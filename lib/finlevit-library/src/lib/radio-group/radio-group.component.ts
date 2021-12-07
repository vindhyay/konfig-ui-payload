import {Component, Input, OnInit, Optional, Self} from "@angular/core";
import {ControlValueAccessor, NgControl, ValidatorFn, Validators} from "@angular/forms";
import {getUniqueId, hasRequiredField} from "../utils";

enum RadioType {
  Outline = "Outline",
  Filled = "Filled"
}

enum LabelPos {
  Left = "Left",
  Top = "Top",
  Down = "Down",
  Right = "Right"
}


@Component({
  selector: "finlevit-radio-group",
  templateUrl: "./radio-group.component.html",
  styleUrls: ["./radio-group.component.scss"]
})
export class RadioGroupComponent implements OnInit, ControlValueAccessor {
  _id: string;
  constructor(@Optional() @Self() public controlDir: NgControl) {
    if (this.controlDir) {
      this.controlDir.valueAccessor = this;
    }
    this._id = getUniqueId("radio");
  }

  @Input() alignOptions: "Horizontal" | "Vertical" = "Horizontal";
  @Input() radioType: RadioType = RadioType.Filled;
  @Input() showErrorBorder = true;
  @Input() isSmall = false;
  @Input() isLarge = false;
  @Input() items: any[] = [];
  @Input() optionLabel = "";
  @Input() optionValue: any = "";
  @Input() labelPos: LabelPos;
  @Input() isDisabled = false;
  @Input() isRequired = false;
  @Input() tooltip = "";
  @Input() label = "";
  @Input() placeholder = "";
  @Input() errorMsg = "";
  @Input() error = false;
  @Input() validators: any = [];
  @Input() showErrorMsg: boolean = true;
  @Input() columns: number = 1;
  @Input() allowLabelWrapping: boolean = false;

  _value: any = null;
  optionTooltip: any = 'tooltip'
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

  writeValue(obj: any): void {
    this._value = obj;
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
  onLocalChange(value: any) {
    this._value = value;
    this.onChange(value);
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
