import { Directive, HostListener } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[appPhoneMask]'
})
export class PhoneMaskDirective {
  constructor(public ngControl: NgControl) {}

  @HostListener("ngModelChange", ["$event"])
  onModelChange(event) {
    this.onInputChange(event, false);
  }

  @HostListener("keydown.backspace", ["$event"])
  keydownBackspace(event) {
    this.onInputChange(event.target.value, true);
  }

  onInputChange(event, backspace) {
    if (event == null) {
      return "";
    }
    let newVal = event.replace(/\D/g, "");  
    if (newVal.length === 0) {
      newVal = "";
    } else if (newVal.length <= 3) {
      newVal = newVal.replace(/^(\d{0,3})/, "$1");
    } else if (newVal.length <= 6) {
      newVal = newVal.replace(/^(\d{0,3})(\d{0,3})/, "$1-$2");
    } else {
      newVal = newVal.replace(/^(\d{0,3})(\d{0,3})(\d{0,4})/, "$1-$2-$3");
    }
    if (newVal === "") {
      this.ngControl.valueAccessor.writeValue('');
    } else {
      this.ngControl.valueAccessor.writeValue(newVal);
    }
  }
}
