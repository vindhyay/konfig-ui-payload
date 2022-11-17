import { Component, Input } from "@angular/core";
import { BtnPrimaryComponent } from "../btn-primary/btn-primary.component";

@Component({
  selector: "app-btn-common",
  templateUrl: "./btn-common.component.html",
  styleUrls: []
})
export class BtnCommonComponent extends BtnPrimaryComponent {}
