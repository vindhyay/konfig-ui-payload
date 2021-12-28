import { BindableComponent } from '../bindable/bindable.component';
import { NgControl } from '@angular/forms';
export declare class BindableCheckboxComponent extends BindableComponent {
  ngControl: NgControl;
  constructor(ngControl: NgControl);
}
