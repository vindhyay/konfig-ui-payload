import { Component, EventEmitter, Input, Output } from "@angular/core";
import { BaseWidget, PhonenumberInputMetaData } from "../../model/create-form.models";

@Component({
  selector: "app-phonenumber-field",
  templateUrl: "./phonenumber-field.component.html",
  styleUrls: [],
})
export class PhonenumberFieldComponent {
  @Input() item: BaseWidget = {} as BaseWidget;
  @Input() isDisabled = false;
  @Output() onValueChange = new EventEmitter();
  @Output() onBlurChange = new EventEmitter();

  get metaData(): PhonenumberInputMetaData {
    return this.item.metaData as PhonenumberInputMetaData;
  }

  validateField($event: any) {
    this.item.value.value = $event;
    this.onValueChange.emit($event);
  }
  optionChange($event: any) {
    this.onBlurChange.emit($event);
  }

  setCursor() {
    let tempValue = this.item.value.value;
    this.item.value.value = "";
    setTimeout(() => {
      this.item.value.value = tempValue;
    }, 0);
  }
}
