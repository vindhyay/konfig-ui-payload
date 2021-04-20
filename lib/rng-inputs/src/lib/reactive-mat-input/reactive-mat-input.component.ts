import { Component, Optional, Self, Input } from '@angular/core';
import { ReactiveControlComponent } from '../reactive-control/reactive-control.component';
import { NgControl } from '@angular/forms';

@Component({
  selector: 'rng-reactive-mat-input',
  templateUrl: './reactive-mat-input.component.html',
  styleUrls: ['./reactive-mat-input.component.scss']
})
export class ReactiveMatInputComponent extends ReactiveControlComponent {
  @Input() label: string | null;
  @Input() appearance: string | null;

  constructor(@Optional() @Self() public ngControl: NgControl) {
    super(ngControl);
  }
}
