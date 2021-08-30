import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { BaseWidget, ModalMetaData } from "../../model/create-form.models";

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
  constructor() {}
  ngOnInit(): void {}
  toggleModal() {
    this.modalStatus = !this.modalStatus;
  }
  onShow($event) {
    window.dispatchEvent(new Event("resize"));
  }
  optionChange($event, data) {
    this.onOptionChange.emit({ event: $event, data });
  }
}
