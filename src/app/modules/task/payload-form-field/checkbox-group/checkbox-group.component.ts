import { Component, Input } from "@angular/core";
import { BaseWidget, MetaData } from "../../model/create-form.models";
import { EditorService } from "../../editor.service";
import { validateFields } from "../../../../utils";

@Component({
  selector: "app-checkbox-group",
  templateUrl: "./checkbox-group.component.html",
  styleUrls: [],
})
export class CheckboxGroupComponent {
  _value = [];
  @Input() item: BaseWidget = {} as BaseWidget;
  @Input() isDisabled = false;
  @Input() columns: number;
  constructor(private editorService: EditorService) {}
  get metaData(): MetaData {
    return this.item.metaData as MetaData;
  }

  onChange($event: any) {
    setTimeout(() => {
      if (this.item?.metaData?.ruleIds?.length) {
        this.editorService.onRuleTrigger({ event: $event, data: this.item });
      }
    }, 0);
  }
  validateField($event: any, field: any) {
    validateFields([field]);
  }
}
