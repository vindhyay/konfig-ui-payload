import { Component, Input, OnInit } from "@angular/core";
import { BaseWidget, ModalMetaData } from "../../model/create-form.models";
import { EditorService } from "../../editor.service";
import { validateFields } from "../../../../utils";

@Component({
  selector: "app-modal",
  templateUrl: "./modal.component.html",
  styleUrls: ["./modal.component.scss"],
})
export class ModalComponent implements OnInit {
  @Input() item: BaseWidget = {} as BaseWidget;
  @Input() modalId: string = null;
  @Input() isDisabled: boolean = false;
  styles = null;
  completedSteps = {};
  selectedIndex = 0;
  modalStatus = false;
  get metaData(): ModalMetaData {
    return this.item.metaData as ModalMetaData;
  }
  onFooterClick($event) {
    const indexObj = $event?.data.metaData["onClickConfigs"].filter(
      (subitem) => subitem.action === "previousStep" || subitem.action === "nextStep" || subitem.action === "submit"
    );
    switch (indexObj[0]?.action) {
      case "previousStep":
        this.onPrevClick($event);
        break;
      case "nextStep":
        this.onNextClick($event);
        break;
      default:
        this.editorService.onBtnClick($event);
        break;
    }
  }
  onPrevClick($event) {
    let index = Number(this.selectedIndex || 0);
    if (index > 0) {
      index -= 1;
    }
    this.selectedIndex = index;
    this.editorService.onBtnClick($event);
  }
  onNextClick($event) {
    let index = this.selectedIndex;
    const child = this.item.children[index];
    const { result: validate } = validateFields(child.children);
    if (validate) {
      this.completedSteps[child?.metaData?.widgetId] = true;
      index += 1;
      if (index > this.item.children.length - 1) {
        index = this.item.children.length - 1;
      }
      this.selectedIndex = index;
      this.editorService.onBtnClick($event);
    }
  }
  constructor(private editorService: EditorService) {}
  ngOnInit(): void {
    this.styles = this.item?.metaData?.styleProperties;
    if (!this.modalId) {
      this.modalId = this.item.metaData.widgetId;
    }
    this.modalStatus = this.editorService.modalStatus[this.modalId];
    setTimeout(() => {
      this.checkHeight();
    });
  }
  toggleModal() {
    this.modalStatus = !this.modalStatus;
    this.editorService.modalStatus[this.modalId] = this.modalStatus;
  }
  onShow($event) {
    window.dispatchEvent(new Event("resize"));
    setTimeout(() => {
      this.checkHeight();
    });
  }
  checkHeight(containerName?) {
    if (this.item.children?.length && this.item.children[this.selectedIndex]) {
      this.editorService.setAdjustableHeight(
        this.item.children[this.selectedIndex]?.children,
        ".modal" + this.item?.metaData?.widgetId
      );
    }
  }
  onHide($event) {
    this.editorService.modalStatus[this.modalId] = false;
  }
}
