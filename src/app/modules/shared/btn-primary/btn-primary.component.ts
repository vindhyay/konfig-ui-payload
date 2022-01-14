import { Component, EventEmitter, Input, Output } from "@angular/core";

@Component({
  selector: "app-btn-primary",
  templateUrl: "./btn-primary.component.html",
  styleUrls: []
})
export class BtnPrimaryComponent {
  @Input() disabled: boolean | null = false;
  @Input() class: string = "";
  @Input() routerLink: string | undefined;
  @Input() label: string;
  @Input() isSmall = false;
  @Input() isLarge = false;
  @Input() icon: string;
  @Output() btnClick = new EventEmitter();
}
