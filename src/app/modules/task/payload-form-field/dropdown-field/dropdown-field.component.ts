import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { AlignTypes, BaseWidget, DropdownMetaData } from "../../model/create-form.models";

@Component({
  selector: "app-dropdown-field",
  templateUrl: "./dropdown-field.component.html",
  styleUrls: ["./dropdown-field.component.scss"],
})
export class DropdownFieldComponent implements OnInit {
  @Input() item: BaseWidget = {} as BaseWidget;
  @Input() isDisabled: boolean = false;
  @Output() optionChange = new EventEmitter();
  @Input() borderColor: string;
  @Input() backgroundColor: string;
  @Input() textColor: string;
  @Input() labelColor: string;
  @Input() textFontFamily: string;
  @Input() labelFontFamily: string;
  @Input() errorMessage: string;
  @Input() labelPos: any;
  @Input() labelHorizontalAlign: AlignTypes;
  @Input() validationMessageColor: string;
  @Input() showErrorMessage: boolean;
  @Input() textHorizontalAlign: string;
  @Input() borderRadius: string;
  @Input() fontSize: string;
  @Input() wordSpacing: string;
  @Input() letterSpacing: string;
  @Input() lineSpacing: string;
  @Input() fontWeight: string;
  @Input() fontStyle: string;
  @Input() textDecoration: string;
  @Input() borderStyle: string;
  @Input() adornmentBackgroundColor: string;
  @Input() borderWidth: string;
  @Input() labelFontSize: string;
  @Input() labelWidth: string;
  @Input() borderTopStyle: string;
  @Input() borderTopLeftRadius: string;
  @Input() borderTopColor: string;
  @Input() borderTopWidth: string;
  @Input() borderRightStyle: string;
  @Input() borderTopRightRadius: string;
  @Input() borderRightColor: string;
  @Input() borderRightWidth: string;
  @Input() borderBottomStyle: string;
  @Input() borderBottomRightRadius: string;
  @Input() borderBottomColor: string;
  @Input() borderBottomWidth: string;
  @Input() borderLeftStyle: string;
  @Input() borderBottomLeftRadius: string;
  @Input() borderLeftColor: string;
  @Input() borderLeftWidth: string;
  @Input() independentBorder: boolean;
  @Input() allowLabelWrapping: boolean;
  @Input() labelFontWeight: string;
  @Input() labelFontStyle: string;
  @Input() labelTextDecoration: string;
  @Input() labelmarginBottom: string;
  @Input() labelmarginTop: string;
  @Input() labelmarginLeft: string;
  @Input() labelmarginRight: string;
  get metaData(): DropdownMetaData {
    return this.item.metaData as DropdownMetaData;
  }
  ngOnInit(): void {}
  onOptionChange($event: any) {
    this.optionChange.emit($event);
  }
}
