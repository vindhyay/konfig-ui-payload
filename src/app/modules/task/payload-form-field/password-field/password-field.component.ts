import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { BaseWidget, PasswordInputMetaData } from "../../model/create-form.models";

@Component({
  selector: "app-password-field",
  templateUrl: "./password-field.component.html",
  styleUrls: [],
})
export class PasswordFieldComponent implements OnInit {
  _type: string = "password";
  @Input() item: BaseWidget = {} as BaseWidget;
  @Input() isDisabled = false;
  @Output() onValueChange = new EventEmitter();
  @Output() onBlurChange = new EventEmitter();

  get metaData(): PasswordInputMetaData {
    return this.item.metaData as PasswordInputMetaData;
  }
  ngOnInit(): void {
    if (!this.metaData.rightIcon) {
      this.metaData.rightIcon = this.metaData.showIcon ? this.metaData.showIcon : null;
    }
  }

  onRightIconClick(metaData: any) {
    if (metaData?.rightIcon === metaData?.showIcon) {
      metaData.rightIcon = metaData?.hideIcon;
      this._type = "text";
    } else {
      metaData.rightIcon = metaData?.showIcon;
      this._type = "password";
    }
  }
  validateField($event: any) {
    this.onValueChange.emit($event);
  }
  optionChange($event: any) {
    this.onBlurChange.emit($event);
  }
}
