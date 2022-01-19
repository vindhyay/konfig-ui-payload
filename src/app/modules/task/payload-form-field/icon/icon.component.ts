import { Component, Input, OnInit } from "@angular/core";
import { BaseWidget, IconMetaData } from "../../model/create-form.models";

@Component({
  selector: "app-icon",
  templateUrl: "./icon.component.html",
  styleUrls: ["./icon.component.scss"],
})
export class IconComponent implements OnInit {
  constructor() {}

  ngOnInit() {}

  @Input() item: BaseWidget = {} as BaseWidget;

  get metaData(): IconMetaData {
    return this.item.metaData as IconMetaData;
  }
}
