import { EventEmitter } from '@angular/core';
export declare class MenuButtonComponent {
  items: string[] | null;
  light: boolean | null;
  itemClick: EventEmitter<string>;
}
