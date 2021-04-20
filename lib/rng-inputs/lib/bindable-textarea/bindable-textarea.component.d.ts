import { EventEmitter } from '@angular/core';
import { BindableComponent } from '../bindable/bindable.component';
export declare class BindableTextareaComponent extends BindableComponent {
  btnClick: EventEmitter<{}>;
  btnIconCSS: string | null;
  autosize: boolean | null;
  minRows: number | null;
  maxRows: number | null;
}
