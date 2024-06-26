import { Component, Input, OnInit } from "@angular/core";
import { ngxLoadingAnimationTypes } from "ngx-loading";

@Component({
  selector: "app-loader",
  templateUrl: "./loader.component.html",
  styleUrls: ["./loader.component.scss"]
})
export class LoaderComponent implements OnInit {
  @Input() loading = false;
  ngxLoadingAnimationTypes = ngxLoadingAnimationTypes;
  constructor() {}
  ngOnInit() {}
}
