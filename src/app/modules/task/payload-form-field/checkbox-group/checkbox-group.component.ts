import { Component, Input, OnInit } from '@angular/core';
import { BaseWidget, DropdownMetaData } from '../../model/create-form.models';

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
  @Input() dataListId = "";
  constructor() {}
  get metaData(): DropdownMetaData {
    return this.item.metaData as DropdownMetaData;
  }
  ngOnInit(): void {}
}
