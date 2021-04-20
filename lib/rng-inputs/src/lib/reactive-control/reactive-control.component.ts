import { Component, Input, Optional, Self, OnDestroy, OnInit, Output, EventEmitter } from '@angular/core';
import { ControlValueAccessor, NgControl, FormControl } from '@angular/forms';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { Subject, Subscription } from 'rxjs';

@Component({
  selector: 'rng-reactive-control',
  template: 'NO BASE TEMPLATE',
  styleUrls: []
})
export class ReactiveControlComponent implements ControlValueAccessor, OnInit, OnDestroy {
  private subscription: Subscription;
  public valueControl = new FormControl();
  public stateChanges = new Subject<void>(); // this will mostly be used with custom controls for material inputs

  @Input()
  get disabled(): boolean {
    return this.valueControl.disabled;
  }
  set disabled(value: boolean) {
    const disabled: boolean = coerceBooleanProperty(value);
    if (disabled) {
      this.valueControl.disable();
    } else {
      this.valueControl.enable();
    }
    this.stateChanges.next();
  }

  @Input()
  get value(): any | null {
    return this.valueControl.value;
  }
  set value(val: any | null) {
    this.onChange(val);
    this.stateChanges.next();
  }

  constructor(@Optional() @Self() public ngControl: NgControl) {
    if (this.ngControl != null) {
      this.ngControl.valueAccessor = this;
      this.valueControl = new FormControl();
    }
  }

  public onLocalChange = (val: any) => {
    console.log('onLocalChange', val);
    this.value = val;
  };

  onChange = (val: any) => {
    console.log('onChange', val);
  };

  onTouched = () => {
    console.log('onTouched');
  };

  ngOnInit() {
    console.log('ngOnInit');
    // TODO: add common validators or some other logic to simplify or deserialise validators, etc.
    if (this.ngControl && this.valueControl) {
      console.log('ngOnInit: setting up');
      // TODO: check for existing "default" validators
      this.valueControl.setValidators(this.ngControl.validator);
      this.valueControl.setAsyncValidators(this.ngControl.asyncValidator);
      this.valueControl.setValue(this.ngControl.value);
      this.valueControl.updateValueAndValidity();
      this.subscription = this.valueControl.valueChanges.subscribe(this.onLocalChange);
    }
  }

  public ngOnDestroy() {
    this.stateChanges.complete();
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  public writeValue(val: string | null): void {
    this.value = val; // initial value or model updates for the view
  }

  public registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  public registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  public setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
}
