import { Component, Input, OnInit } from '@angular/core';
import { BaseWidget, DropdownMetaData } from '../../model/create-form.models';
import {parseApiResponse} from "../../../../utils";
import {TaskService} from "../../services/task.service";

@Component({
  selector: 'app-checkbox-group',
  templateUrl: './checkbox-group.component.html',
  styleUrls: ['./checkbox-group.component.scss']
})
export class CheckboxGroupComponent implements OnInit {
  _value = [];
  @Input() item: BaseWidget = {} as BaseWidget;
  @Input() viewMode = false;
  @Input() editMode = false;
  @Input()
  set dataListId(listId: string) {
    if (listId) {
      this.getValues(listId);
    }
  }
  constructor(private taskService: TaskService) {}
  get metaData(): DropdownMetaData {
    return this.item.metaData as DropdownMetaData;
  }
  ngOnInit(): void {}
  getValues(listId: any) {
    const params = { fieldConfigId: listId };
    this.taskService.getDataListValues(params).subscribe(result => {
      const { data, error } = parseApiResponse(result);
      if (data && !error) {
        this.metaData.options = data;
      } else {
        // TODo error handling
      }
    });
  }
}
