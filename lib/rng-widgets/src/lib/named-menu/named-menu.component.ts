import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'rng-named-menu',
  templateUrl: './named-menu.component.html',
  styleUrls: []
})
export class NamedMenuComponent {
  @Input() items: string[];
  @Input() disabled: boolean = false;
  @Input() currentItem: any = { name: '', value: '' };
  showKey: string = 'name';
  @Output() itemClick = new EventEmitter();

  onItemClick = (item: string) => {
    this.currentItem = item;
    this.itemClick.emit(item);
  };
}
