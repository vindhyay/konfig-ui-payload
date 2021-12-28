import { Component, Input, Optional, Self, OnInit, OnDestroy } from '@angular/core';
import { formatCurrency, formatDate } from '@angular/common';
import { FormControl, NgControl, ControlValueAccessor, FormGroupDirective, NgForm } from '@angular/forms';
import { Subject, Subscription } from 'rxjs';
import { ErrorStateMatcher } from '@angular/material';

const DEFAULT_APPEARANCE = 'fill';

export const enum VALUE_TYPE {
  CURRENCY = 'currency',
  DATE = 'date',
  DURATION = 'duration',
  PASSWORD = 'password',
  DEFAULT = 'default'
}

/** Error when invalid control is dirty, touched, or submitted. */
export class RngErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'rng-bindable',
  template: 'NO BASE TEMPLATE',
  styleUrls: []
})
export class BindableComponent implements ControlValueAccessor, OnInit, OnDestroy {
  private localappearance: string | null;
  private localReadonly: boolean;
  private valType: string; // to format output

  protected subscription = new Subscription();
  private onLocalChange: (val: any) => void; // host's hook to track local changes
  private onLocalTouch: () => void; // host's hook to track local touches

  public valueControl = new FormControl();
  public stateChanges = new Subject<void>(); // this will mostly be used with custom controls for material inputs

  public matcher = new RngErrorStateMatcher();

  @Input() label: string;
  @Input() customErrorMatcher = null;
  @Input() errorMatcher: boolean;
  @Input() placeholder: string | null = '';
  @Input() name: string | null = '';
  @Input() errorMessages: { [key: string]: string } | null = {
    required: 'Field is required',
    email: 'Email is invalid',
    pattern: 'Incorrect value',
    maxlength: 'Value is too long',
    minlength: 'Value is too short'
  };
  @Input() disabled = false;

  @Input()
  get appearance(): string {
    return this.localappearance ? this.localappearance : DEFAULT_APPEARANCE;
  }
  set appearance(value: string) {
    this.localappearance = value;
  }

  @Input()
  get valueType(): string {
    return this.valType;
  }
  set valueType(value: string) {
    this.valueTypeSetter(value);
  }

  @Input()
  get value(): any {
    return this.valueGetter();
  }
  set value(value: any) {
    this.valueSetter(value);
  }

  @Input()
  get readonly(): boolean {
    return this.localReadonly;
  }
  set readonly(value: boolean) {
    this.localReadonly = value !== undefined && value !== false ? true : false;
  }

  @Input() disabledInput: boolean | null = false;

  get floatLabel(): string {
    return this.label && this.label.length ? 'auto' : 'never';
  }

  get fieldCSS(): string[] {
    return this.fieldCSSGetter();
  }

  protected fieldCSSGetter() {
    const css = ['full-width'];

    if (this.readonly) {
      css.push('readonly');
    }

    if (this.disabledInput) {
      css.push('disabledInput');
    }

    return css;
  }

  constructor(@Optional() @Self() public ngControl: NgControl) {
    if (this.ngControl != null) {
      this.ngControl.valueAccessor = this;
    }
  }

  ngOnInit() {
    // TODO: add common validators or some other logic to simplify or deserialise validators, etc.
    if (this.ngControl && this.valueControl) {
      this.valueControl.setValidators(this.ngControl.control.validator);
      this.valueControl.setAsyncValidators(this.ngControl.control.asyncValidator);
      this.valueControl.setValue(this.valueConverter(this.ngControl.value));
      this.valueControl.updateValueAndValidity();
      this.subscription.add(this.valueControl.valueChanges.subscribe(this.onChange));
    }
  }

  public ngOnDestroy() {
    this.subscription.unsubscribe();
    this.stateChanges.complete();
  }

  onChange = (val: any) => {
    this.value = val;
  };

  onTouch = () => {
    this.onLocalTouch();
  };

  protected valueGetter() {
    return this.valueControl.value;
  }

  protected valueSetter(val: any) {
    this.onLocalChange(val);
    this.onLocalTouch();
    this.stateChanges.next();
  }

  protected valueTypeSetter(value: string) {
    this.valType = value;
  }

  protected valueConverter(val: any): any {
    return val;
  }

  public auxDateFormatter(date: Date): string {
    return formatDate(date, 'dd MMM yyyy', 'en_US');
  }

  public auxCurrencyFormatter(amount: number): string {
    return formatCurrency(amount, 'en_US', '$', '1.2-2');
  }

  getErrorMessage() {
    const errors: { [key: string]: { invalid: object; message?: string | null } } | null = this.valueControl.errors;
    const keys = Object.keys(errors) as Array<any>;
    return !errors
      ? null
      : this.valueControl.hasError('required')
      ? this.errorMessages.required
      : this.valueControl.hasError('email')
      ? this.errorMessages.email
      : this.valueControl.hasError('maxlength')
      ? this.errorMessages.maxlength
      : this.valueControl.hasError('minlength')
      ? this.errorMessages.minlength
      : this.valueControl.hasError('pattern')
      ? this.errorMessages.pattern
      : errors[keys[0]].message;
  }
  // control value accessor interface implementation:

  public writeValue(val: any | null): void {
    this.valueControl.setValue(this.valueConverter(val)); // initial value or model updates for the view
  }

  public registerOnChange(fn: any): void {
    this.onLocalChange = fn;
  }

  public registerOnTouched(fn: any): void {
    this.onLocalTouch = fn;
  }

  public setDisabledState(isDisabled: boolean): void {
    if (isDisabled) {
      this.valueControl.disable();
    } else {
      this.valueControl.enable();
    }
  }

  // end of control value accessor interface implementation
}
