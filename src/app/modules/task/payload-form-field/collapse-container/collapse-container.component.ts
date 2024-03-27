import { Component, Input, AfterViewInit } from "@angular/core";
import { EditorService } from "../../editor.service";
import { BaseStyle, BaseWidget, CollapseContainerMetaData } from "../../model/create-form.models";

@Component({
  selector: "app-collapse-container",
  templateUrl: "./collapse-container.component.html",
  styleUrls: ["./collapse-container.component.scss"],
})
export class CollapseContainerComponent implements AfterViewInit {
  collapseContainerStatus = true;
  JSON = JSON;
  @Input() itemStyleProperties = {} as BaseStyle;
  @Input() item: BaseWidget = {} as BaseWidget;

  ngAfterViewInit() {
    if (this.metaData?.movement === "UP") {
      this.collapseContainerStatus = false;
    }
  }
  constructor(private editorService: EditorService) {}
  get metaData(): CollapseContainerMetaData {
    return this.item.metaData as CollapseContainerMetaData;
  }
  onCollapse(status: boolean, item: any) {
    if (!status) {
      this.item.rows = item?.metaData?.hideRows || 0;
      this.item.minItemRows = item?.metaData?.hideRows || 0;
      if (this.item.metaData) {
        this.item.metaData.movement = "UP";
      }
    } else {
      this.item.rows = item.metaData?.defaultRows;
      this.item.minItemRows = item.metaData?.defaultMinItemRows;
      this.item.minItemCols = item.metaData?.defaultMinItemCols;
      if (this.item.metaData) {
        this.item.metaData.movement = "DOWN";
      }
    }
    this.editorService.widgetChange.next(item);
    this.editorService.setContainerHeight(this.editorService.getFormFields());
  }
}
