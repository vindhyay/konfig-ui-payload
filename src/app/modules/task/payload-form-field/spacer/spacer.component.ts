import { Component, Input } from "@angular/core";
import { BaseWidget, DividerMetaData } from "../../model/create-form.models";

@Component({
  selector: "app-spacer",
  templateUrl: "./spacer.component.html",
  styleUrls: [],
})
export class SpacerComponent {
  @Input() item: BaseWidget = {} as BaseWidget;

  get metaData(): DividerMetaData {
    return this.item.metaData as DividerMetaData;
  }
}
