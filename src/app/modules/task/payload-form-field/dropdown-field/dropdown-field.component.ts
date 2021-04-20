import { Component, Input, OnInit } from '@angular/core';
import { BaseWidget, DropdownMetaData } from '../../model/create-form.models';
import {TaskService} from "../../services/task.service";
import {parseApiResponse} from "../../../../utils";

@Component({
  selector: 'app-dropdown-field',
  templateUrl: './dropdown-field.component.html',
  styleUrls: ['./dropdown-field.component.scss']
})
export class DropdownFieldComponent implements OnInit {
  @Input() item: BaseWidget = {} as BaseWidget;
  @Input() viewMode: boolean = false;
  @Input() editMode: boolean = false;
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
        //TODo error handling
      }
    });
  }
}
