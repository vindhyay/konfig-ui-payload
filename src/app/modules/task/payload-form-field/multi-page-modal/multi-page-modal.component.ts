import { Component, Input, OnInit } from "@angular/core";
import { BaseStyle, BaseWidget, ButtonActions, MultiPageModalMetaData } from "../../model/create-form.models";
import { EditorService } from "../../editor.service";
import { validateFields } from "../../../../utils";

@Component({
  selector: "app-multi-page-modal",
  templateUrl: "./multi-page-modal.component.html",
  styleUrls: ["./multi-page-modal.component.scss"],
})
export class MultiPageModalComponent implements OnInit {
  @Input() item: BaseWidget = {} as BaseWidget;
  @Input() itemStyleProperties = {} as BaseStyle;
  @Input() modalId: string = null;
  @Input() isDisabled: boolean = false;
  completedSteps = {};
  selectedIndex = 0;
  modalStatus = false;
  get metaData(): MultiPageModalMetaData {
    return this.item.metaData as MultiPageModalMetaData;
  }
  onFooterClick($event: any) {
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
  onPrevClick($event: any) {
    let index = Number(this.selectedIndex || 0);
    if (index > 0) {
      index -= 1;
    }
    this.selectedIndex = index;
    this.editorService.onBtnClick($event);
  }
  onNextClick($event: any) {
    let index = this.selectedIndex;
    const child = this.item.children[index];
    const { result: validate } = validateFields(child.children);
    if (validate) {
      this.completedSteps[child?.widgetId] = true;
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
    this.editorService.modalStatus$.subscribe((modalsStatus) => {
      if (modalsStatus && modalsStatus.length) {
        const modalStatus: { id: string; type: ButtonActions } = modalsStatus.find(
          (modal) => modal.widgetId === this.item.widgetId
        );
        if (modalStatus) {
          this.modalStatus = modalStatus.type === ButtonActions.openModals;
          this.selectedIndex = 0;
        }
      }
    });
    if (!this.modalId) {
      this.modalId = this.item.widgetId;
    }
    setTimeout(() => {
      this.checkHeight();
    });
  }
  toggleModal() {
    this.modalStatus = !this.modalStatus;
    if (!this.modalStatus) {
      this.editorService.setClosedModals([this.item.widgetId]);
    }
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
        ".modal" + this.item?.widgetId
      );
    }
  }
}
