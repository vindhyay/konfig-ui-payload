import { Component, Input } from "@angular/core";
import { BaseWidget, URLMetaData } from "../../model/create-form.models";

@Component({
  selector: "app-url",
  templateUrl: "./url.component.html",
  styleUrls: [],
})
export class UrlComponent {
  @Input() item: BaseWidget = {} as BaseWidget;
  @Input() viewMode = false;
  get metaData(): URLMetaData {
    return this.item.metaData as URLMetaData;
  }
}
