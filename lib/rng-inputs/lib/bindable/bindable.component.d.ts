import { OnInit, OnDestroy } from '@angular/core';
import { FormControl, NgControl, ControlValueAccessor, FormGroupDirective, NgForm } from '@angular/forms';
import { Subject, Subscription } from 'rxjs';
import { ErrorStateMatcher } from '@angular/material';
export declare const enum VALUE_TYPE {
  CURRENCY = 'currency',
  DATE = 'date',
  DURATION = 'duration',
  PASSWORD = 'password',
  DEFAULT = 'default'
}
/** Error when invalid control is dirty, touched, or submitted. */
export declare class RngErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean;
}
export declare class BindableComponent implements ControlValueAccessor, OnInit, OnDestroy {
  ngControl: NgControl;
  private localappearance;
  private localReadonly;
  private valType;
  protected subscription: Subscription;
  private onLocalChange;
  private onLocalTouch;
  valueControl: FormControl;
  stateChanges: Subject<void>;
  matcher: RngErrorStateMatcher;
  label: string;
  placeholder: string | null;
  errorMessages: {
    [key: string]: string;
  } | null;
  appearance: string;
  valueType: string;
  value: any;
  readonly: boolean;
  disabledInput: boolean | null;
  readonly floatLabel: string;
  readonly fieldCSS: string[];
  protected fieldCSSGetter(): string[];
  constructor(ngControl: NgControl);
  ngOnInit(): void;
  ngOnDestroy(): void;
  onChange: (val: any) => void;
  onTouch: () => void;
  protected valueGetter(): any;
  protected valueSetter(val: any): void;
  protected valueTypeSetter(value: string): void;
  protected valueConverter(val: any): any;
  auxDateFormatter(date: Date): string;
  auxCurrencyFormatter(amount: number): string;
  getErrorMessage(): string;
  writeValue(val: any | null): void;
  registerOnChange(fn: any): void;
  registerOnTouched(fn: any): void;
  setDisabledState(isDisabled: boolean): void;
}
