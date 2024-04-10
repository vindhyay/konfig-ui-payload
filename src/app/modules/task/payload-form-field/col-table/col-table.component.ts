import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { BaseComponent } from "../../../shared/base/base.component";
import { BaseStyle, BaseWidget, TableMetaData } from "../../model/create-form.models";
import { EditorService } from "../../editor.service";

@Component({
  selector: "app-col-table",
  templateUrl: "./col-table.component.html",
  styleUrls: ["./col-table.component.scss"],
})
export class ColTableComponent extends BaseComponent implements OnInit {
  JSON = JSON;
  @Input() item: BaseWidget = {} as BaseWidget;
  @Input() itemStyleProperties = {} as BaseStyle;
  @Input() modalStyleProperties = {} as BaseStyle;
  @Input() viewMode = false;
  @Output() onBtnClick = new EventEmitter();
  @Input() allStyles = [];
  @Input() isDisabled: boolean = false;
  modalStatus = false;
  get metaData(): TableMetaData<BaseWidget> {
    return this.item.metaData as TableMetaData<BaseWidget>;
  }

  constructor(private editorService: EditorService) {
    super();
  }

  ngOnInit(): void {
    this.modalStatus = this.editorService.modalStatus[this.item.widgetId];
  }
  toggleModal() {
    this.modalStatus = !this.modalStatus;
    this.editorService.modalStatus[this.item.widgetId] = this.modalStatus;
  }
  onShow($event) {
    window.dispatchEvent(new Event("resize"));
  }
  onHide($event) {
    this.editorService.modalStatus[this.item.widgetId] = false;
  }

  onResizeEnd($event: any) {
    window.dispatchEvent(new Event("resize"));
    const element: any = document.getElementsByClassName(this.item?.widgetId)[0];
    this.metaData.height = element?.style?.height || "400px";
    this.metaData.width = element?.style?.width || "300px";
    const modal: any = element.querySelector(".modalcontent");
    if (modal.clientHeight < modal.parentElement.clientHeight) {
      modal.style.height = modal.parentElement.clientHeight + "px";
    }
  }
}
