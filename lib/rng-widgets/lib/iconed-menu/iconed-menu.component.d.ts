import { EventEmitter } from '@angular/core';
import { IAvatarData, IAvatarEnabled } from '../../model/common-types';
export declare class IconedMenuComponent {
  changeItem: EventEmitter<{}>;
  items: IAvatarData[] | IAvatarEnabled[];
  placeholderItem: IAvatarData;
  showName: boolean | null;
  currentItem: IAvatarData | IAvatarEnabled;
  readonly currentName: string;
  itemAvatar(item: IAvatarData | IAvatarEnabled): IAvatarData;
  itemName(item: IAvatarData | IAvatarEnabled): string;
  clickFunction(item: any): void;
}
