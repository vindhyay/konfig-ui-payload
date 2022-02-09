import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { TabContainerMetaData } from "../../model/create-form.models";
import { EditorService } from "../../editor.service";

@Component({
  selector: "app-tab-container",
  templateUrl: "./tab-container.component.html",
  styleUrls: ["./tab-container.component.scss"],
})
export class AppTabContainerComponent implements OnInit {
  constructor(private editorService: EditorService) {}
  @Input() item;
  @Input() viewMode = false;
  @Input() showEdit = false;
  _tabActiveIndex = 0;
  @Input() metaData: TabContainerMetaData;
  @Output() tabChangeEvent = new EventEmitter();
  @Output() btnClick = new EventEmitter();
  @Output() tableDataChange = new EventEmitter();
  @Output() optionChange = new EventEmitter();
  ngOnInit() {}
  @Input() set tabActiveIndex(number) {
    this._tabActiveIndex = number;
  }
  checkHeight(child?) {
    if (child.children?.length) {
      this.editorService.setAdjustableHeight(child?.children, ".nested-grid-container");
    }
  }
  onOptionChange($event) {
    this.optionChange.emit($event);
  }
}
