import { Component, EventEmitter, Input, Output } from "@angular/core";
import { ButtonVariants, Sizes } from "finlevit-library";

@Component({
  selector: "app-icon-btn",
  templateUrl: "./btn-icon.component.html",
  styleUrls: [],
})
export class BtnIconComponent {
  @Input() isDisabled: boolean = false;
  @Input() iconOnly: boolean = false;
  @Input() fullWidth = false;
  @Input() label: string;
  @Input() size: Sizes = Sizes.sm;
  @Input() variant: ButtonVariants = null;
  @Input() roleType = "button";
  @Input() icon = "";
  @Input() type = "";
  @Output() btnClick = new EventEmitter();
}
