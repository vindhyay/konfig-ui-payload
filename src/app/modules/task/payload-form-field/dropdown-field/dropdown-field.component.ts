import { Component, EventEmitter, Input, Output } from "@angular/core";
import { BaseWidget, DropdownMetaData } from "../../model/create-form.models";

@Component({
  selector: "app-dropdown-field",
  templateUrl: "./dropdown-field.component.html",
  styleUrls: [],
})
export class DropdownFieldComponent {
  @Input() item: BaseWidget = {} as BaseWidget;
  @Input() isDisabled: boolean = false;
  @Output() optionChange = new EventEmitter();
  get metaData(): DropdownMetaData {
    return this.item.metaData as DropdownMetaData;
  }

  onOptionChange($event: any) {
    this.optionChange.emit($event);
  }
}
