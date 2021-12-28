import { Component, Optional, Self } from '@angular/core';
import { BindableComponent } from '../bindable/bindable.component';
import { NgControl } from '@angular/forms';

@Component({
  selector: 'rng-bindable-checkbox',
  templateUrl: './bindable-checkbox.component.html',
  styleUrls: []
})
export class BindableCheckboxComponent extends BindableComponent {
  constructor(@Optional() @Self() public ngControl: NgControl) {
    super(ngControl);
  }
}
