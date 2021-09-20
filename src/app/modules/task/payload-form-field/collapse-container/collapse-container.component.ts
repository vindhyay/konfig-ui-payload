import { Component, OnInit, Input, AfterViewInit } from "@angular/core";
import { EditorService } from "../../editor.service";
import { BaseWidget, CollapseContainerMetaData } from "../../model/create-form.models";

@Component({
  selector: "app-collapse-container",
  templateUrl: "./collapse-container.component.html",
  styleUrls: ["./collapse-container.component.scss"]
})
export class CollapseContainerComponent implements OnInit, AfterViewInit {
  collapseContainerStatus = true;
  @Input() item: BaseWidget = {} as BaseWidget;
  @Input() viewMode = false;
  @Input() showEdit = false;
  @Input() isDisabled: boolean = false;
  @Input() editMode: boolean = false;
  ngOnInit() {}

  ngAfterViewInit() {
    if (this.metaData?.movement === "UP") {
      this.collapseContainerStatus = false;
    }
  }
  constructor(private editorService: EditorService) {}
  get metaData(): CollapseContainerMetaData {
    return this.item.metaData as CollapseContainerMetaData;
  }
  onCollapse(status, item) {
    if (!status) {
      this.item.rows = item?.metaData?.hideRows || 0;
      this.item.minItemRows = item?.metaData?.hideRows || 0;
      this.item.metaData.movement = "UP";
    } else {
      this.item.rows = item.metaData?.defaultRows;
      this.item.minItemRows = item.metaData?.defaultMinItemRows;
      this.item.minItemCols = item.metaData?.defaultMinItemCols;
      this.item.metaData.movement = "DOWN";
    }
    this.editorService.widgetChange.next(item);
  }
}
