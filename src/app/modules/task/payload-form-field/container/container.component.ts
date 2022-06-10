import { Component, Input, OnInit } from "@angular/core";
import { BaseWidget, ContainerActions, ContainerMetaData } from "../../model/create-form.models";
import { EditorService } from "../../editor.service";

@Component({
  selector: "app-container",
  templateUrl: "container.component.html",
  styleUrls: ["./container.component.scss"],
})
export class ContainerComponent implements OnInit {
  @Input() item: BaseWidget = {} as BaseWidget;

  ngOnInit() {}

  get metaData(): ContainerMetaData {
    return this.item.metaData as ContainerMetaData;
  }
}
