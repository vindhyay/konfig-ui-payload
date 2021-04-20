import { EventEmitter } from '@angular/core';
export declare class SimpleSearchComponent {
  dataVal: string;
  opened: boolean;
  focused: boolean;
  data: string | null;
  closeButton: boolean | null;
  placeholder: string;
  searchChange: EventEmitter<any>;
  searchClick: EventEmitter<any>;
  openSearch: (e: any, el: any) => boolean;
  changeFunction: (data: string) => void;
  backData: (data: any) => void;
  onFocus(): void;
  onKeydownHandler(event: KeyboardEvent): void;
  cancelFunction(): void;
  onBlur(): void;
  clickFunction: () => void;
}
