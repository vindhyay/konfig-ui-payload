import { Component, EventEmitter, Input, Output } from "@angular/core";
import { BtnPrimaryComponent } from "../btn-primary/btn-primary.component";

@Component({
  selector: "app-btn-options",
  templateUrl: "./btn-options.component.html",
  styleUrls: ["./btn-options.component.scss"]
})
export class BtnOptionsComponent extends BtnPrimaryComponent {
  @Output() primaryClick = new EventEmitter();
  @Output() itemClick = new EventEmitter();

  @Input() nameKey: string = "name";
  @Input() valueKey: string = "value";
  @Input() itemDisableKey: string = null;
  @Input() iconKey: string = "iconClass";
  @Input() primaryTitle: string | number;
  @Input() items: any[];
  @Input() isDisabled: boolean = false;
  @Input() variant;
  @Input() iconPath: string = "";
  onPrimaryClick = () => this.primaryClick.emit();
  onItemClick = (item: any) => this.itemClick.emit(item);
}
