import { Component, Input, OnInit } from "@angular/core";
import { BaseWidget, MetaData } from "../../model/create-form.models";
import { EditorService } from "../../editor.service";

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
  onChange($event) {
    setTimeout(()=> {
      const ifConditions = this.item.metaData.conditions;
      if (ifConditions?.length) {
        this.editorService.checkCondition(ifConditions);
      } else if (ifConditions && !ifConditions?.length) {
        this.editorService.checkCondition([{ ...ifConditions }]);
      }
      if (this.item?.metaData?.businessRuleIds?.length) {
        this.editorService.onRuleTrigger({ event: $event, data: this.item });
      }
    },0)
  }
}
