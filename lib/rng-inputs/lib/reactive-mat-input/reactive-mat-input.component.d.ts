import { ReactiveControlComponent } from '../reactive-control/reactive-control.component';
import { NgControl } from '@angular/forms';
export declare class ReactiveMatInputComponent extends ReactiveControlComponent {
  ngControl: NgControl;
  label: string | null;
  appearance: string | null;
  constructor(ngControl: NgControl);
}
