import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { BaseWidget, ModalMetaData } from "../../model/create-form.models";
import { EditorService } from "../../editor.service";

@Component({
  selector: "app-modal",
  templateUrl: "./modal.component.html",
  styleUrls: ["./modal.component.scss"]
})
export class ModalComponent implements OnInit {
  @Input() item: BaseWidget = {} as BaseWidget;
  @Input() viewMode = false;
  @Input() showEdit = false;
  @Input() isDisabled: boolean = false;
  @Input() editMode: boolean = false;
  @Output() onBtnClick = new EventEmitter();
  @Output() onOptionChange = new EventEmitter();
  @Output() onTableDataChange = new EventEmitter();
  modalStatus = false;
  get metaData(): ModalMetaData {
    return this.item.metaData as ModalMetaData;
  }
  constructor(private editorService: EditorService) {}
  ngOnInit(): void {
    this.modalStatus = this.editorService.modalStatus[this.item.metaData.widgetId];
  }
  toggleModal() {
    this.modalStatus = !this.modalStatus;
    this.editorService.modalStatus[this.item.metaData.widgetId] = this.modalStatus;
  }
  onShow($event) {
    window.dispatchEvent(new Event("resize"));
  }
  onHide($event){
    this.editorService.modalStatus[this.item.metaData.widgetId] = false;
  }
  optionChange($event, data) {
    this.onOptionChange.emit({ event: $event, data });
  }
}
