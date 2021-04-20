import { Component } from '@angular/core';
import { BindableSelectComponent } from '../bindable-select/bindable-select.component';

@Component({
  selector: 'rng-bindable-select-multi',
  templateUrl: '../bindable-select/bindable-select.component.html',
  styleUrls: []
})
export class BindableSelectMultiComponent extends BindableSelectComponent {
  multiple = true;

  get selectionCount(): number {
    const value = this.value;
    return value ? value.length : 0;
  }

  get valueName(): string {
    const cnt = this.selectionCount;
    switch (cnt) {
      case 0:
        return this.placeholder;
      case 1:
        return super.valueNameGetter(this.value[0]);
      default:
        return this.placeholder + ' (' + cnt + ')';
    }
  }

  protected fieldCSSGetter() {
    const baseCSS = super.fieldCSSGetter();
    baseCSS.push('multi-select');
    return baseCSS;
  }

  protected currentValue(oldValue: any[]) {
    if (!oldValue) {
      return oldValue;
    } // value not yet set. can be undefined or null.
    // we can't change it if it is null or undefined so just return it "as is".

    const values = oldValue.reduce((vals, oldval) => {
      // re-checking items
      const oldKeyValue = oldval[this.valueKey];
      if (!oldKeyValue) {
        vals.push(oldval); // values are string, so just return a value
      } else {
        const objVal = this.items.find(item => item[this.valueKey] === oldKeyValue);
        if (objVal) {
          vals.push(objVal);
        }
      }
      return vals;
    }, []);

    return values;
  }
}
