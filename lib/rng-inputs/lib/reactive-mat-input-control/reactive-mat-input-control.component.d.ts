import { FocusMonitor } from '@angular/cdk/a11y';
import { ElementRef, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, ControlValueAccessor, NgControl } from '@angular/forms';
import { MatFormFieldControl } from '@angular/material/form-field';
import { ReactiveControlComponent } from '../reactive-control/reactive-control.component';
export declare class ReactiveMatInputControlComponent extends ReactiveControlComponent
  implements ControlValueAccessor, MatFormFieldControl<string>, OnDestroy {
  private _focusMonitor;
  private _elementRef;
  ngControl: NgControl;
  static nextId: number;
  readonly empty: boolean;
  readonly shouldLabelFloat: boolean;
  describedBy: string;
  id: string;
  placeholder: string;
  required: boolean;
  constructor(
    formBuilder: FormBuilder,
    _focusMonitor: FocusMonitor,
    _elementRef: ElementRef<HTMLElement>,
    ngControl: NgControl
  );
  parts: FormGroup;
  focused: boolean;
  errorState: boolean;
  controlType: string;
  private _placeholder;
  private _required;
  ngOnDestroy(): void;
  setDescribedByIds(ids: string[]): void;
  onContainerClick(event: MouseEvent): void;
  _handleInput(): void;
}
