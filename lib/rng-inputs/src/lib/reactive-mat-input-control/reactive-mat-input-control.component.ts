// this is just a pilot, not tested, WIP

import { FocusMonitor } from '@angular/cdk/a11y';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { Component, ElementRef, Input, OnDestroy, Optional, Self, HostBinding } from '@angular/core';
import { FormBuilder, FormGroup, ControlValueAccessor, NgControl } from '@angular/forms';
import { MatFormFieldControl } from '@angular/material/form-field';
import { ReactiveControlComponent } from '../reactive-control/reactive-control.component';

@Component({
  selector: 'rng-reactive-mat-input-control',
  templateUrl: 'reactive-mat-input-control.component.html',
  styleUrls: ['reactive-mat-input-control.component.scss'],
  providers: [
    {
      provide: MatFormFieldControl,
      useExisting: ReactiveMatInputControlComponent
    }
  ]
})
export class ReactiveMatInputControlComponent extends ReactiveControlComponent
  implements ControlValueAccessor, MatFormFieldControl<string>, OnDestroy {
  static nextId = 0;

  get empty() {
    const { value } = this.parts;
    return !value || value.length === 0;
  }

  @HostBinding('class.floating')
  get shouldLabelFloat() {
    return this.focused || !this.empty;
  }

  @HostBinding('attr.aria-describedby') describedBy = '';

  @HostBinding('id') id = `rng-rmff-input-${ReactiveMatInputControlComponent.nextId++}`;

  @Input()
  get placeholder(): string {
    return this._placeholder;
  }
  set placeholder(value: string) {
    this._placeholder = value;
    this.stateChanges.next();
  }

  @Input()
  get required(): boolean {
    return this._required;
  }
  set required(value: boolean) {
    this._required = coerceBooleanProperty(value);
    this.stateChanges.next();
  }

  constructor(
    formBuilder: FormBuilder,
    // tslint:disable-next-line: variable-name
    private _focusMonitor: FocusMonitor,
    // tslint:disable-next-line: variable-name
    private _elementRef: ElementRef<HTMLElement>,
    @Optional() @Self() public ngControl: NgControl
  ) {
    super(ngControl);

    this.parts = formBuilder.group({
      value: ''
    });

    _focusMonitor.monitor(_elementRef, true).subscribe(origin => {
      if (this.focused && !origin) {
        this.onTouched();
      }
      this.focused = !!origin;
      this.stateChanges.next();
    });
  }

  parts: FormGroup;
  focused = false;
  errorState = false;
  controlType = 'rng-rmff-input';

  // tslint:disable-next-line: variable-name
  private _placeholder: string;
  // tslint:disable-next-line: variable-name
  private _required = false;

  ngOnDestroy() {
    super.ngOnDestroy();
    this._focusMonitor.stopMonitoring(this._elementRef);
  }

  setDescribedByIds(ids: string[]) {
    this.describedBy = ids.join(' ');
  }

  onContainerClick(event: MouseEvent) {
    if ((event.target as Element).tagName.toLowerCase() !== 'input') {
      this._elementRef.nativeElement.querySelector('input').focus();
    }
  }

  _handleInput(): void {
    this.onChange(this.parts.value);
  }
}
