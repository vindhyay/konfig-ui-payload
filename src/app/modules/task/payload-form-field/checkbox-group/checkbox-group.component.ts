import { Component, Input, OnInit } from '@angular/core';
import {BaseWidget, MetaData} from '../../model/create-form.models';
import { TaskService } from "../../services/task.service";

@Component({
  selector: 'app-checkbox-group',
  templateUrl: './checkbox-group.component.html',
  styleUrls: ['./checkbox-group.component.scss']
})
export class CheckboxGroupComponent implements OnInit {
  _value = [];
  @Input() item: BaseWidget = {} as BaseWidget;
  @Input() isDisabled = false;
  @Input() viewMode = false;
  @Input() editMode = false;
  @Input() dataListId = "";
  constructor(private taskService: TaskService) {}
  get metaData(): MetaData {
    return this.item.metaData as MetaData;
  }
  ngOnInit(): void {}
  onChange($event) {
    const ifConditions = this.item.metaData?.conditions?.ifConditions || [];
    this.taskService.checkCondition(ifConditions);
  }
}
