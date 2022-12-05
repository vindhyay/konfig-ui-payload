import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { BtnPrimaryComponent } from "../btn-primary/btn-primary.component";

@Component({
  selector: "app-btn-danger",
  templateUrl: "./btn-danger.component.html",
  styleUrls: ["./btn-danger.component.scss"]
})
export class BtnDangerComponent implements OnInit {
  @Input() isDisabled: boolean = false;
  @Input() label: string;
  @Input() roleType = "button";
  @Input() icon = "";
  @Output() btnClick = new EventEmitter();
  ngOnInit(): void {}
  _hoverSize = "12px";
  _size: "xxs" | "xs" | "sm" | "md" | "lg" | "xlg" = 'xs';
  @Input()
  set size(value: "xxs" | "xs" | "sm" | "md" | "lg" | "xlg") {
    this._size = value || 'xs';
    switch (this._size) {
      case "xxs":
        this._hoverSize = "11px";
        break;
      case "xs":
        this._hoverSize = "10px";
        break;
      case "sm":
        this._hoverSize = "11px";
        break;
      case "md":
        this._hoverSize = "12px";
        break;
      case "lg":
        this._hoverSize = "14px";
        break;
      case "xlg":
        this._hoverSize = "16px";
        break;
    }
  }
  get size(): "xxs" | "xs" | "sm" | "md" | "lg" | "xlg" {
    return this._size;
  }
}
