import { Component, Input } from '@angular/core';
import { BindableComponent } from '../bindable/bindable.component';

@Component({
  selector: 'rng-bindable-select',
  templateUrl: './bindable-select.component.html',
  styleUrls: []
})
export class BindableSelectComponent extends BindableComponent {
  @Input() returnKey: string; // default returns selected object
  @Input() valueKey: string | null = 'value'; // default search items by "value" key if they are objects
  @Input() items: any[] | null = [];
  @Input() disableOptionCentering: boolean | null = true;
  @Input() nameKey: string | null = 'name';

  multiple = false;

  get valueName(): string {
    const currentValue = this.value;
    return this.valueNameGetter(currentValue);
  }

  protected valueNameGetter(currentValue): string {
    return currentValue
      ? currentValue.name
        ? currentValue.name
        : ((currentValue as unknown) as string)
      : this.placeholder;
  }

  protected fieldCSSGetter() {
    const baseCSS = super.fieldCSSGetter();
    baseCSS.push('single-select');
    return baseCSS;
  }

  protected valueGetter() {
    const oldValue = super.valueGetter();
    return this.currentValue(oldValue); // gets one of current items (if still present) by valueKey
  }

  protected currentValue(oldValue) {
    if (!oldValue) {
      return oldValue;
    } // value not yet set. can be undefined or null.
    // we can't change it if it is null or undefined so just return it "as is".

    const value = oldValue[this.valueKey];

    if (!value) {
      return oldValue;
    } // values are strings, no search required

    return this.items.find(item => item[this.valueKey] === value);
  }
}
