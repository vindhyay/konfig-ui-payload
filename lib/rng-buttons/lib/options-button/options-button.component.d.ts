import { EventEmitter } from '@angular/core';
import { IButtonMenuItem } from '../../public-api';
export declare class OptionsButtonComponent {
  primaryClick: EventEmitter<{}>;
  itemClick: EventEmitter<{}>;
  primaryTitle: string;
  items: IButtonMenuItem[];
  color: string | null;
  onPrimaryClick: () => void;
  onItemClick: (item: IButtonMenuItem) => void;
  toggleChange(event: any): void;
}
