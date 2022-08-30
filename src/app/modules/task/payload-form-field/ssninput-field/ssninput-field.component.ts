import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { BaseWidget, SSNInputMetaData } from "../../model/create-form.models";

@Component({
  selector: "app-ssninput-field",
  templateUrl: "./ssninput-field.component.html",
  styleUrls: ["./ssninput-field.component.scss"],
})
export class ssnInputFieldComponent implements OnInit {
  _type_mask: string = "000-00-0000";
  @Input() item: BaseWidget = {} as BaseWidget;
  @Input() isDisabled = false;
  @Output() onValueChange = new EventEmitter();
  @Output() onBlurChange = new EventEmitter();

  constructor() {}
  get metaData(): SSNInputMetaData {
    return this.item.metaData as SSNInputMetaData;
  }

  @Input() set value(value: any) {
    if (value && this._type_mask === this.metaData.showMask) {
      this.changeIcon(this.metaData);
    }
  }
  ngOnInit(): void {
    if (!this.metaData.rightIcon) {
      this.metaData.rightIcon = this.metaData.showIcon ? this.metaData.showIcon : null;
    }
    if (this._type_mask === this.metaData.showMask) {
      this.changeIcon(this.metaData);
    }
  }

  onRightIconClick(metaData: any) {
    this.changeIcon(metaData);
  }
  changeIcon(metaData) {
    if (this._type_mask === metaData.showMask) {
      metaData.rightIcon = metaData?.hideIcon;
      this._type_mask = metaData.hideMask;
    } else {
      metaData.rightIcon = metaData?.showIcon;
      this._type_mask = metaData.showMask;
    }
  }
  validateField($event: any) {
    this.item.value.value = $event;
    // this._type_mask = this.metaData.hideMask;
    // this.changeIcon(this.metaData);
    this.onValueChange.emit($event);
  }
  optionChange($event: any) {
    setTimeout(() => {
      this._type_mask = this.metaData.showMask;
      this.changeIcon(this.metaData);
      this.onBlurChange.emit($event);
    }, 0);
  }
}
