import { Component, Input, OnInit } from "@angular/core";
import { BaseWidget } from "../../model/create-form.models";
import { EditorService } from "../../editor.service";

@Component({
  selector: "app-tab-container",
  templateUrl: "./tab-container.component.html",
  styleUrls: ["./tab-container.component.scss"],
})
export class AppTabContainerComponent implements OnInit {
  constructor(private editorService: EditorService) {}

  tabActiveIndex = 0;
  @Input() item: BaseWidget = null;
  ngOnInit() {
    this.tabActiveIndex = this.editorService.activeTabIndexes[this.item?.widgetId];
  }

  onTabChange($event: any) {
    const { index = 0 } = $event;
    this.editorService.activeTabIndexes[this.item?.widgetId] = index;
    this.tabActiveIndex = index;
    window.dispatchEvent(new Event("resize"));
  }
}
