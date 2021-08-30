import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { BaseWidget, DropdownMetaData } from "../../model/create-form.models";

@Component({
  selector: "app-dropdown-field",
  templateUrl: "./dropdown-field.component.html",
  styleUrls: ["./dropdown-field.component.scss"]
})
export class DropdownFieldComponent implements OnInit {
  @Input() item: BaseWidget = {} as BaseWidget;
  @Input() viewMode: boolean = false;
  @Input() isDisabled: boolean = false;
  @Input() editMode: boolean = false;
  @Output() optionChange = new EventEmitter();
  get metaData(): DropdownMetaData {
    return this.item.metaData as DropdownMetaData;
  }
  ngOnInit(): void {}
  onOptionChange($event: any) {
    this.optionChange.emit($event);
  }
}
