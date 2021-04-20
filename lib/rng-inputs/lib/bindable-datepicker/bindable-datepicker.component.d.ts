import { BindableInputComponent } from '../bindable-input/bindable-input.component';
import { NgControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { BreakpointObserver } from '@angular/cdk/layout';
export declare class BindableDatepickerComponent extends BindableInputComponent {
  ngControl: NgControl;
  private breakpointObserver;
  touchUi: boolean | null;
  isHandset$: Observable<boolean>;
  constructor(ngControl: NgControl, breakpointObserver: BreakpointObserver);
  protected valueConverter(val: any): any;
}
