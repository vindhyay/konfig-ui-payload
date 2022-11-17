import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { BtnPrimaryComponent } from "../btn-primary/btn-primary.component";

@Component({
  selector: "app-icon-btn",
  templateUrl: "./btn-icon.component.html",
  styleUrls: ["./btn-icon.component.scss"]
})
export class BtnIconComponent extends BtnPrimaryComponent implements OnInit {
  @Input() icon = "";
  @Input() type = "";
  @Output() btnClick = new EventEmitter();
  ngOnInit() {}
}
