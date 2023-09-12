import { Component, Input } from "@angular/core";
import { ngxLoadingAnimationTypes } from "ngx-loading";

@Component({
  selector: "app-loader",
  templateUrl: "./loader.component.html",
  styleUrls: ["./loader.component.scss"],
})
export class LoaderComponent {
  @Input() loading = false;
  ngxLoadingAnimationTypes = ngxLoadingAnimationTypes;
}
