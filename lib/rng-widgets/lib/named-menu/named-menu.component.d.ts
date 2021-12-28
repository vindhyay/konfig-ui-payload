import { EventEmitter } from '@angular/core';
export declare class NamedMenuComponent {
  items: string[];
  currentItem: string;
  showKey: string;
  itemClick: EventEmitter<{}>;
  onItemClick: (item: string) => void;
}
