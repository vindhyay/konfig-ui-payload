import { Component, EventEmitter, Input, Output } from "@angular/core";
import { Sizes } from "finlevit-library";
import { ButtonVariants } from "finlevit-library";

@Component({
  selector: "app-btn-primary",
  templateUrl: "./btn-primary.component.html",
  styleUrls: []
})
export class BtnPrimaryComponent {
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
