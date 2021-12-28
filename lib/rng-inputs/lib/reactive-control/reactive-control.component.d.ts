import { OnDestroy, OnInit } from '@angular/core';
import { ControlValueAccessor, NgControl, FormControl } from '@angular/forms';
import { Subject } from 'rxjs';
export declare class ReactiveControlComponent implements ControlValueAccessor, OnInit, OnDestroy {
  ngControl: NgControl;
  private subscription;
  valueControl: FormControl;
  stateChanges: Subject<void>;
  disabled: boolean;
  value: any | null;
  constructor(ngControl: NgControl);
  onLocalChange: (val: any) => void;
  onChange: (val: any) => void;
  onTouched: () => void;
  ngOnInit(): void;
  ngOnDestroy(): void;
  writeValue(val: string | null): void;
  registerOnChange(fn: any): void;
  registerOnTouched(fn: any): void;
  setDisabledState(isDisabled: boolean): void;
}
