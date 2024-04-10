import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { BaseStyle, BaseWidget, ModalMetaData } from "../../model/create-form.models";
import { BaseComponent } from "../../../shared/base/base.component";
import { EditorService } from "../../editor.service";

@Component({
  selector: "app-modal",
  templateUrl: "./modal.component.html",
  styleUrls: ["./modal.component.scss"],
})
export class ModalComponent extends BaseComponent implements OnInit {
  JSON = JSON;
  @Input() item: BaseWidget = {} as BaseWidget;
  @Input() itemStyleProperties = {} as BaseStyle;
  @Input() viewMode = false;
  @Output() onBtnClick = new EventEmitter();
  @Input() isDisabled: boolean = false;
  modalStatus = false;

  get metaData(): ModalMetaData {
    return this.item.metaData as ModalMetaData;
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

  checkHeight(containerName?) {
    if (this.item.children?.length) {
      this.editorService.setAdjustableHeight(this.item?.children, ".modal" + this.item?.widgetId);
    }
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
