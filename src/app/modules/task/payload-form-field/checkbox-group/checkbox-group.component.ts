import { Component, Input, OnInit } from "@angular/core";
import { BaseWidget, MetaData } from "../../model/create-form.models";
import { EditorService } from "../../editor.service";
import { validateFields } from "../../../../utils";

@Component({
  selector: "app-checkbox-group",
  templateUrl: "./checkbox-group.component.html",
  styleUrls: ["./checkbox-group.component.scss"],
})
export class CheckboxGroupComponent implements OnInit {
  _value = [];
  @Input() item: BaseWidget = {} as BaseWidget;
  @Input() isDisabled = false;
  @Input() columns: number;
  constructor(private editorService: EditorService) {}
  get metaData(): MetaData {
    return this.item.metaData as MetaData;
  }
  ngOnInit(): void {}
  onChange($event: any) {
    setTimeout(() => {
      if (this.item?.metaData?.businessRuleIds?.length) {
        this.editorService.onRuleTrigger({ event: $event, data: this.item });
      }
      else {
        const conditionalErrorIds = this.item.metaData?.conditionalErrorIds;
        const showHideIds = this.item.metaData?.showHideIds;
        if (conditionalErrorIds?.length || showHideIds?.length) {
          this.editorService.checkCondition({conditionalErrorIds, showHideIds});
        }
      }
    }, 0);
  }
  validateField($event: any, field: any) {
    validateFields([field]);
  }
}
