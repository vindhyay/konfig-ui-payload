import { Component, EventEmitter, Input, Output } from "@angular/core";

@Component({
  selector: "app-btn-primary",
  templateUrl: "./btn-primary.component.html",
  styleUrls: []
})
export class BtnPrimaryComponent {
  @Input() isDisabled: boolean = false;
  @Input() label: string;
  @Input() size : 'xxs' | 'xs' | 'sm' | 'md' | 'lg' | 'xlg' = 'sm';
  @Input() roleType = "button";
  @Input() icon = "";
  @Output() btnClick = new EventEmitter();
}
