import { Component, Input, OnInit } from "@angular/core";
import { BaseWidget, TabContainerMetaData } from "../../model/create-form.models";
import { EditorService } from "../../editor.service";
import { getBorderStyle } from "src/app/utils";

@Component({
  selector: "app-tab-container",
  templateUrl: "./tab-container.component.html",
  styleUrls: ["./tab-container.component.scss"],
})
export class AppTabContainerComponent implements OnInit {
  constructor(private editorService: EditorService) {}

  tabActiveIndex = 0;
  @Input() item: BaseWidget = null;
  @Input() metaData: TabContainerMetaData;

  containerBodyStyle;
  @Input() set style(styleObj) {
    this.containerBodyStyle = getBorderStyle(styleObj);
  }

  ngOnInit() {
    this.tabActiveIndex = this.editorService.activeTabIndexes[this.item.metaData.widgetId];
  }

  onTabChange($event) {
    const { index = 0 } = $event;
    this.editorService.activeTabIndexes[this.item.metaData.widgetId] = index;
    this.tabActiveIndex = index;
    window.dispatchEvent(new Event("resize"));
  }
}