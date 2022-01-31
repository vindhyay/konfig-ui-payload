import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { BaseWidget, ModalMetaData } from "../../model/create-form.models";
import { EditorService } from "../../editor.service";
import { TaskService } from "../../services/task.service";

@Component({
  selector: "app-modal",
  templateUrl: "./modal.component.html",
  styleUrls: ["./modal.component.scss"],
})
export class ModalComponent implements OnInit {
  @Input() item: BaseWidget = {} as BaseWidget;
  @Input() modalId: string = null;
  @Input() viewMode = false;
  @Input() showEdit = false;
  @Input() isDisabled: boolean = false;
  @Input() editMode: boolean = false;
  @Output() onBtnClick = new EventEmitter();
  @Output() onOptionChange = new EventEmitter();
  @Output() onTableDataChange = new EventEmitter();
  @Output() onNext = new EventEmitter();
  @Output() onPrev = new EventEmitter();
  @Input() styles;
  @Input() selectionChange;
  _selectedIndex = 1;
  modalStatus = false;
  get metaData(): ModalMetaData {
    return this.item.metaData as ModalMetaData;
  }
  @Input() set selectedIndex(number) {
    this._selectedIndex = number;
    this.checkVisibility();
    setTimeout(() => {
      this.checkHeight();
    });
  }
  onFooterClick(item: any) {
    const indexObj = item.data.metaData["onClickConfigs"].filter(
      (subitem) => subitem.action === "previousStep" || subitem.action === "nextStep" || subitem.action === "submit"
    );
    switch (indexObj[0]?.action) {
      case "previousStep":
        this.onPrev.emit(this._selectedIndex);
        // this.onBtnClick.emit(item);
        break;
      case "nextStep":
        this.onNext.emit(this._selectedIndex);
        // this.onBtnClick.emit(item);
        break;
      default:
        this.onBtnClick.emit(item);
        break;
    }
  }
  constructor(private editorService: EditorService, private taskService: TaskService) {}
  ngOnInit(): void {
    if (!this.modalId) {
      this.modalId = this.item.metaData.widgetId;
    }
    this.modalStatus = this.editorService.modalStatus[this.modalId];
    setTimeout(() => {
      this.checkHeight();
      this.checkVisibility();
    });
    this.taskService.transactionDetailsSubject.subscribe((value) => {
      setTimeout(() => {
        this.checkVisibility();
      });
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
  checkVisibility() {
    if (this.item.children[0].children.length && this.item.metaData["modalType"] === "MultiPage")
      this.item.children[0].children = this.item.children[0].children.map((item) => {
        const index = item?.metaData["onClickConfigs"].findIndex(
          (subitem) => subitem.action === "previousStep" || subitem.action === "nextStep" || subitem.action === "submit"
        );
        if (index >= 0) {
          switch (item.metaData["onClickConfigs"][index]?.action) {
            case "previousStep":
              return { ...item, metaData: { ...item.metaData, isHidden: this._selectedIndex <= 1 } };
            case "nextStep":
              return {
                ...item,
                metaData: { ...item.metaData, isHidden: this._selectedIndex === this.item.children.length - 1 },
              };
            case "submit":
              return {
                ...item,
                metaData: { ...item.metaData, isHidden: this._selectedIndex !== this.item.children.length - 1 },
              };
            default:
              return item;
          }
        } else {
          return item;
        }
      });
  }
  checkHeight(containerName?) {
    if (this.item.children?.length && this.item.children[this._selectedIndex]) {
      this.editorService.setAdjustableHeight(
        this.item.children[this._selectedIndex]?.children,
        ".modal" + this.item?.metaData?.widgetId
      );
    }
  }
  onHide($event) {
    this.editorService.modalStatus[this.modalId] = false;
  }
  optionChange($event, data) {
    this.onOptionChange.emit({ event: $event, data });
  }
}
