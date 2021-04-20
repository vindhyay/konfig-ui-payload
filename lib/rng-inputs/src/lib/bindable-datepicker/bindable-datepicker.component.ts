import { Component, Optional, Self, Input } from '@angular/core';
import { BindableInputComponent } from '../bindable-input/bindable-input.component';
import { VALUE_TYPE } from '../bindable/bindable.component';
import { NgControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { map } from 'rxjs/operators';

@Component({
  selector: 'rng-bindable-datepicker',
  templateUrl: './bindable-datepicker.component.html',
  styleUrls: []
})
export class BindableDatepickerComponent extends BindableInputComponent {
  @Input() touchUi: boolean | null = false;

  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(map(result => result.matches));

  constructor(@Optional() @Self() public ngControl: NgControl, private breakpointObserver: BreakpointObserver) {
    super(ngControl);
    this.valueType = VALUE_TYPE.DATE;
  }

  protected valueConverter(val: any): any {
    return new Date(val) || val;
  }
}
