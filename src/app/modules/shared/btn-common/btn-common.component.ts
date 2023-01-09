import { Component, Input, EventEmitter, Output } from "@angular/core";
import { ButtonVariants, Sizes } from "finlevit-library";

@Component({
  selector: "app-btn-common",
  templateUrl: "./btn-common.component.html",
  styleUrls: [],
})
export class BtnCommonComponent {
  @Input() isDisabled: boolean = false;
  @Input() iconOnly: boolean = false;
  @Input() fullWidth = false;
  @Input() label: string;
  @Input() size: Sizes = Sizes.sm;
  @Input() variant: ButtonVariants = null;
  @Input() roleType = "button";
  @Input() icon = "";
  @Output() btnClick = new EventEmitter();
}
