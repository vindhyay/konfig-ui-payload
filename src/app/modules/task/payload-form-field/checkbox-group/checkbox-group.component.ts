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
  @Input() dataListId = "";
  @Input() checkedBorderColor: string;
  @Input() uncheckedBorderColor: string;
  @Input() checkedBackgroundColor: string;
  @Input() uncheckedBackgroundColor: string;
  @Input() checkIconColor: string;
  @Input() labelFontWeight: string;
  @Input() labelStyle: string;
  @Input() labelTextDecoration: string;
  @Input() labelColor: string;
  @Input() labelFontStyle: string;
  @Input() labelFontSize: string;
  @Input() wordSpacing: string;
  @Input() letterSpacing: string;
  @Input() checkboxAlign: string;
  @Input() textColor: string;
  @Input() labelWidth: string;
  @Input() textFontStyle: string;
  @Input() fontSize: string;
  @Input() lineSpacing: string;
  @Input() fontWeight: string;
  @Input() fontStyle: string;
  @Input() textDecoration: string;
  @Input() labelPosition: any;
  @Input() allowLabelWrapping: boolean;
  @Input() errorMessage: string;
  @Input() showErrorMessage: boolean;
  @Input() labelAlignment: string;
  @Input() checkboxSize: string;
  @Input() optionPaddingBottom: string
  @Input() columns: number;
  constructor(private editorService: EditorService) {}
  get metaData(): MetaData {
    return this.item.metaData as MetaData;
  }
  ngOnInit(): void {}
  onChange($event) {
    const ifConditions = this.item.metaData.conditions;
    if (ifConditions?.length) {
      this.editorService.checkCondition(ifConditions);
    } else if (ifConditions && !ifConditions?.length) {
      this.editorService.checkCondition([{ ...ifConditions }]);
    }
  }
}
