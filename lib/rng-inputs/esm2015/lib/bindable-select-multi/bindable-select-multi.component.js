/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component } from '@angular/core';
import { BindableSelectComponent } from '../bindable-select/bindable-select.component';
export class BindableSelectMultiComponent extends BindableSelectComponent {
    constructor() {
        super(...arguments);
        this.multiple = true;
    }
    /**
     * @return {?}
     */
    get selectionCount() {
        /** @type {?} */
        const value = this.value;
        return value ? value.length : 0;
    }
    /**
     * @return {?}
     */
    get valueName() {
        /** @type {?} */
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
    /**
     * @protected
     * @return {?}
     */
    fieldCSSGetter() {
        /** @type {?} */
        const baseCSS = super.fieldCSSGetter();
        baseCSS.push('multi-select');
        return baseCSS;
    }
    /**
     * @protected
     * @param {?} oldValue
     * @return {?}
     */
    currentValue(oldValue) {
        if (!oldValue) {
            return oldValue;
        } // value not yet set. can be undefined or null.
        // value not yet set. can be undefined or null.
        // we can't change it if it is null or undefined so just return it "as is".
        /** @type {?} */
        const values = oldValue.reduce((/**
         * @param {?} vals
         * @param {?} oldval
         * @return {?}
         */
        (vals, oldval) => {
            // re-checking items
            /** @type {?} */
            const oldKeyValue = oldval[this.valueKey];
            if (!oldKeyValue) {
                vals.push(oldval); // values are string, so just return a value
            }
            else {
                /** @type {?} */
                const objVal = this.items.find((/**
                 * @param {?} item
                 * @return {?}
                 */
                item => item[this.valueKey] === oldKeyValue));
                if (objVal) {
                    vals.push(objVal);
                }
            }
            return vals;
        }), []);
        return values;
    }
}
BindableSelectMultiComponent.decorators = [
    { type: Component, args: [{
                selector: 'rng-bindable-select-multi',
                template: "<mat-form-field [ngClass]=\"fieldCSS\"\n  [appearance]=\"appearance\"\n  [floatLabel]=\"floatLabel\"\n  color=\"accent\">\n  <mat-label *ngIf=\"label\">{{label}}</mat-label>\n  <mat-select\n    [disabled]=\"disabled\"\n    [multiple]=\"multiple\"\n    [formControl]=\"valueControl\"\n    [placeholder]=\"valueName\"\n    [disableOptionCentering]=\"disableOptionCentering\">\n    <mat-option\n      *ngFor=\"let item of items\"\n      [value]=\"returnKey ? item[returnKey] : item\">\n      <div *ngIf=\"item.color\" class=\"complex-option\">\n        <rng-type-label [data]=\"item\"></rng-type-label><span class=\"value\">{{item.name}}</span>\n      </div>\n      <span *ngIf=\"!item.color && item[nameKey]\">{{item[nameKey]}} </span>\n      <span *ngIf=\"!item[nameKey]\"> {{item}}</span>\n    </mat-option>\n  </mat-select>\n</mat-form-field>\n"
            }] }
];
if (false) {
    /** @type {?} */
    BindableSelectMultiComponent.prototype.multiple;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmluZGFibGUtc2VsZWN0LW11bHRpLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BybmcvaW5wdXRzLyIsInNvdXJjZXMiOlsibGliL2JpbmRhYmxlLXNlbGVjdC1tdWx0aS9iaW5kYWJsZS1zZWxlY3QtbXVsdGkuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzFDLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxNQUFNLDhDQUE4QyxDQUFDO0FBT3ZGLE1BQU0sT0FBTyw0QkFBNkIsU0FBUSx1QkFBdUI7SUFMekU7O1FBT0UsYUFBUSxHQUFHLElBQUksQ0FBQztJQTRDbEIsQ0FBQzs7OztJQTFDQyxJQUFJLGNBQWM7O2NBQ1YsS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLO1FBQ3hCLE9BQU8sS0FBSyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDbEMsQ0FBQzs7OztJQUVELElBQUksU0FBUzs7Y0FDTCxHQUFHLEdBQUcsSUFBSSxDQUFDLGNBQWM7UUFDL0IsUUFBUSxHQUFHLEVBQUU7WUFDWCxLQUFLLENBQUM7Z0JBQ0osT0FBTyxJQUFJLENBQUMsV0FBVyxDQUFDO1lBQzFCLEtBQUssQ0FBQztnQkFDSixPQUFPLEtBQUssQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzlDO2dCQUNFLE9BQU8sSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLEdBQUcsR0FBRyxHQUFHLEdBQUcsQ0FBQztTQUM5QztJQUNILENBQUM7Ozs7O0lBRVMsY0FBYzs7Y0FDaEIsT0FBTyxHQUFHLEtBQUssQ0FBQyxjQUFjLEVBQUU7UUFDdEMsT0FBTyxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQztRQUM3QixPQUFPLE9BQU8sQ0FBQztJQUNqQixDQUFDOzs7Ozs7SUFFUyxZQUFZLENBQUMsUUFBZTtRQUNwQyxJQUFJLENBQUMsUUFBUSxFQUFFO1lBQUUsT0FBTyxRQUFRLENBQUM7U0FBRSxDQUFDLCtDQUErQzs7OztjQUc3RSxNQUFNLEdBQUcsUUFBUSxDQUFDLE1BQU07Ozs7O1FBQUMsQ0FBQyxJQUFJLEVBQUUsTUFBTSxFQUFFLEVBQUU7OztrQkFDeEMsV0FBVyxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDO1lBQ3pDLElBQUksQ0FBQyxXQUFXLEVBQUU7Z0JBQ2hCLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyw0Q0FBNEM7YUFDaEU7aUJBQU07O3NCQUNDLE1BQU0sR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUk7Ozs7Z0JBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLFdBQVcsRUFBQztnQkFDM0UsSUFBSSxNQUFNLEVBQUU7b0JBQ1YsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztpQkFDbkI7YUFDRjtZQUNELE9BQU8sSUFBSSxDQUFDO1FBQ2QsQ0FBQyxHQUFFLEVBQUUsQ0FBQztRQUVOLE9BQU8sTUFBTSxDQUFDO0lBQ2hCLENBQUM7OztZQWxERixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLDJCQUEyQjtnQkFDckMseTFCQUFnRTthQUVqRTs7OztJQUdDLGdEQUFnQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQmluZGFibGVTZWxlY3RDb21wb25lbnQgfSBmcm9tICcuLi9iaW5kYWJsZS1zZWxlY3QvYmluZGFibGUtc2VsZWN0LmNvbXBvbmVudCc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ3JuZy1iaW5kYWJsZS1zZWxlY3QtbXVsdGknLFxuICB0ZW1wbGF0ZVVybDogJy4uL2JpbmRhYmxlLXNlbGVjdC9iaW5kYWJsZS1zZWxlY3QuY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFtdXG59KVxuZXhwb3J0IGNsYXNzIEJpbmRhYmxlU2VsZWN0TXVsdGlDb21wb25lbnQgZXh0ZW5kcyBCaW5kYWJsZVNlbGVjdENvbXBvbmVudCB7XG5cbiAgbXVsdGlwbGUgPSB0cnVlO1xuXG4gIGdldCBzZWxlY3Rpb25Db3VudCgpOiBudW1iZXIge1xuICAgIGNvbnN0IHZhbHVlID0gdGhpcy52YWx1ZTtcbiAgICByZXR1cm4gdmFsdWUgPyB2YWx1ZS5sZW5ndGggOiAwO1xuICB9XG5cbiAgZ2V0IHZhbHVlTmFtZSgpOiBzdHJpbmcge1xuICAgIGNvbnN0IGNudCA9IHRoaXMuc2VsZWN0aW9uQ291bnQ7XG4gICAgc3dpdGNoIChjbnQpIHtcbiAgICAgIGNhc2UgMDpcbiAgICAgICAgcmV0dXJuIHRoaXMucGxhY2Vob2xkZXI7XG4gICAgICBjYXNlIDE6XG4gICAgICAgIHJldHVybiBzdXBlci52YWx1ZU5hbWVHZXR0ZXIodGhpcy52YWx1ZVswXSk7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICByZXR1cm4gdGhpcy5wbGFjZWhvbGRlciArICcgKCcgKyBjbnQgKyAnKSc7XG4gICAgfVxuICB9XG5cbiAgcHJvdGVjdGVkIGZpZWxkQ1NTR2V0dGVyKCkge1xuICAgIGNvbnN0IGJhc2VDU1MgPSBzdXBlci5maWVsZENTU0dldHRlcigpO1xuICAgIGJhc2VDU1MucHVzaCgnbXVsdGktc2VsZWN0Jyk7XG4gICAgcmV0dXJuIGJhc2VDU1M7XG4gIH1cblxuICBwcm90ZWN0ZWQgY3VycmVudFZhbHVlKG9sZFZhbHVlOiBhbnlbXSkge1xuICAgIGlmICghb2xkVmFsdWUpIHsgcmV0dXJuIG9sZFZhbHVlOyB9IC8vIHZhbHVlIG5vdCB5ZXQgc2V0LiBjYW4gYmUgdW5kZWZpbmVkIG9yIG51bGwuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gd2UgY2FuJ3QgY2hhbmdlIGl0IGlmIGl0IGlzIG51bGwgb3IgdW5kZWZpbmVkIHNvIGp1c3QgcmV0dXJuIGl0IFwiYXMgaXNcIi5cblxuICAgIGNvbnN0IHZhbHVlcyA9IG9sZFZhbHVlLnJlZHVjZSgodmFscywgb2xkdmFsKSA9PiB7IC8vIHJlLWNoZWNraW5nIGl0ZW1zXG4gICAgICBjb25zdCBvbGRLZXlWYWx1ZSA9IG9sZHZhbFt0aGlzLnZhbHVlS2V5XTtcbiAgICAgIGlmICghb2xkS2V5VmFsdWUpIHtcbiAgICAgICAgdmFscy5wdXNoKG9sZHZhbCk7IC8vIHZhbHVlcyBhcmUgc3RyaW5nLCBzbyBqdXN0IHJldHVybiBhIHZhbHVlXG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb25zdCBvYmpWYWwgPSB0aGlzLml0ZW1zLmZpbmQoaXRlbSA9PiBpdGVtW3RoaXMudmFsdWVLZXldID09PSBvbGRLZXlWYWx1ZSk7XG4gICAgICAgIGlmIChvYmpWYWwpIHtcbiAgICAgICAgICB2YWxzLnB1c2gob2JqVmFsKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIHZhbHM7XG4gICAgfSwgW10pO1xuXG4gICAgcmV0dXJuIHZhbHVlcztcbiAgfVxufVxuIl19