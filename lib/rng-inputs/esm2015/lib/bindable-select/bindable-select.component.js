/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input } from '@angular/core';
import { BindableComponent } from '../bindable/bindable.component';
export class BindableSelectComponent extends BindableComponent {
    constructor() {
        super(...arguments);
        // default returns selected object
        this.valueKey = 'value'; // default search items by "value" key if they are objects
        // default search items by "value" key if they are objects
        this.items = [];
        this.disableOptionCentering = true;
        this.nameKey = 'name';
        this.disabled = false;
        this.multiple = false;
    }
    /**
     * @return {?}
     */
    get valueName() {
        /** @type {?} */
        const currentValue = this.value;
        return this.valueNameGetter(currentValue);
    }
    /**
     * @protected
     * @param {?} currentValue
     * @return {?}
     */
    valueNameGetter(currentValue) {
        return currentValue ? currentValue.name ? currentValue.name : (/** @type {?} */ ((/** @type {?} */ (currentValue)))) : this.placeholder;
    }
    /**
     * @protected
     * @return {?}
     */
    fieldCSSGetter() {
        /** @type {?} */
        const baseCSS = super.fieldCSSGetter();
        baseCSS.push('single-select');
        return baseCSS;
    }
    /**
     * @protected
     * @return {?}
     */
    valueGetter() {
        /** @type {?} */
        const oldValue = super.valueGetter();
        return this.currentValue(oldValue); // gets one of current items (if still present) by valueKey
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
        const value = oldValue[this.valueKey];
        if (!value) {
            return oldValue;
        } // values are strings, no search required
        return this.items.find((/**
         * @param {?} item
         * @return {?}
         */
        item => item[this.valueKey] === value));
    }
}
BindableSelectComponent.decorators = [
    { type: Component, args: [{
                selector: 'rng-bindable-select',
                template: "<mat-form-field [ngClass]=\"fieldCSS\"\n  [appearance]=\"appearance\"\n  [floatLabel]=\"floatLabel\"\n  color=\"accent\">\n  <mat-label *ngIf=\"label\">{{label}}</mat-label>\n  <mat-select\n    [disabled]=\"disabled\"\n    [multiple]=\"multiple\"\n    [formControl]=\"valueControl\"\n    [placeholder]=\"valueName\"\n    [disableOptionCentering]=\"disableOptionCentering\">\n    <mat-option\n      *ngFor=\"let item of items\"\n      [value]=\"returnKey ? item[returnKey] : item\">\n      <div *ngIf=\"item.color\" class=\"complex-option\">\n        <rng-type-label [data]=\"item\"></rng-type-label><span class=\"value\">{{item.name}}</span>\n      </div>\n      <span *ngIf=\"!item.color && item[nameKey]\">{{item[nameKey]}} </span>\n      <span *ngIf=\"!item[nameKey]\"> {{item}}</span>\n    </mat-option>\n  </mat-select>\n</mat-form-field>\n"
            }] }
];
BindableSelectComponent.propDecorators = {
    returnKey: [{ type: Input }],
    valueKey: [{ type: Input }],
    items: [{ type: Input }],
    disableOptionCentering: [{ type: Input }],
    nameKey: [{ type: Input }],
    disabled: [{ type: Input }]
};
if (false) {
    /** @type {?} */
    BindableSelectComponent.prototype.returnKey;
    /** @type {?} */
    BindableSelectComponent.prototype.valueKey;
    /** @type {?} */
    BindableSelectComponent.prototype.items;
    /** @type {?} */
    BindableSelectComponent.prototype.disableOptionCentering;
    /** @type {?} */
    BindableSelectComponent.prototype.nameKey;
    /** @type {?} */
    BindableSelectComponent.prototype.disabled;
    /** @type {?} */
    BindableSelectComponent.prototype.multiple;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmluZGFibGUtc2VsZWN0LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BybmcvaW5wdXRzLyIsInNvdXJjZXMiOlsibGliL2JpbmRhYmxlLXNlbGVjdC9iaW5kYWJsZS1zZWxlY3QuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNqRCxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxnQ0FBZ0MsQ0FBQztBQU9uRSxNQUFNLE9BQU8sdUJBQXdCLFNBQVEsaUJBQWlCO0lBTDlEOzs7UUFRVyxhQUFRLEdBQWtCLE9BQU8sQ0FBQyxDQUFDLDBEQUEwRDs7UUFDN0YsVUFBSyxHQUFpQixFQUFFLENBQUM7UUFDekIsMkJBQXNCLEdBQW1CLElBQUksQ0FBQztRQUM5QyxZQUFPLEdBQWtCLE1BQU0sQ0FBQztRQUNoQyxhQUFRLEdBQUcsS0FBSyxDQUFDO1FBRTFCLGFBQVEsR0FBRyxLQUFLLENBQUM7SUFnQ25CLENBQUM7Ozs7SUE5QkMsSUFBSSxTQUFTOztjQUNMLFlBQVksR0FBRyxJQUFJLENBQUMsS0FBSztRQUMvQixPQUFPLElBQUksQ0FBQyxlQUFlLENBQUMsWUFBWSxDQUFDLENBQUM7SUFDNUMsQ0FBQzs7Ozs7O0lBRVMsZUFBZSxDQUFDLFlBQVk7UUFDcEMsT0FBTyxZQUFZLENBQUMsQ0FBQyxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLG1CQUFBLG1CQUFBLFlBQVksRUFBVyxFQUFVLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUM7SUFDckgsQ0FBQzs7Ozs7SUFFUyxjQUFjOztjQUNoQixPQUFPLEdBQUcsS0FBSyxDQUFDLGNBQWMsRUFBRTtRQUN0QyxPQUFPLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDO1FBQzlCLE9BQU8sT0FBTyxDQUFDO0lBQ2pCLENBQUM7Ozs7O0lBRVMsV0FBVzs7Y0FDYixRQUFRLEdBQUcsS0FBSyxDQUFDLFdBQVcsRUFBRTtRQUNwQyxPQUFPLElBQUksQ0FBQyxZQUFZLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQywyREFBMkQ7SUFDakcsQ0FBQzs7Ozs7O0lBRVMsWUFBWSxDQUFDLFFBQVE7UUFDN0IsSUFBSSxDQUFDLFFBQVEsRUFBRTtZQUFFLE9BQU8sUUFBUSxDQUFDO1NBQUUsQ0FBQywrQ0FBK0M7Ozs7Y0FHN0UsS0FBSyxHQUFHLFFBQVEsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDO1FBRXJDLElBQUksQ0FBQyxLQUFLLEVBQUU7WUFBRSxPQUFPLFFBQVEsQ0FBQztTQUFFLENBQUMseUNBQXlDO1FBRTFFLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJOzs7O1FBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLEtBQUssRUFBQyxDQUFDO0lBQ2hFLENBQUM7OztZQTdDRixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLHFCQUFxQjtnQkFDL0IseTFCQUErQzthQUVoRDs7O3dCQUdFLEtBQUs7dUJBQ0wsS0FBSztvQkFDTCxLQUFLO3FDQUNMLEtBQUs7c0JBQ0wsS0FBSzt1QkFDTCxLQUFLOzs7O0lBTE4sNENBQTJCOztJQUMzQiwyQ0FBMkM7O0lBQzNDLHdDQUFrQzs7SUFDbEMseURBQXVEOztJQUN2RCwwQ0FBeUM7O0lBQ3pDLDJDQUEwQjs7SUFFMUIsMkNBQWlCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQmluZGFibGVDb21wb25lbnQgfSBmcm9tICcuLi9iaW5kYWJsZS9iaW5kYWJsZS5jb21wb25lbnQnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdybmctYmluZGFibGUtc2VsZWN0JyxcbiAgdGVtcGxhdGVVcmw6ICcuL2JpbmRhYmxlLXNlbGVjdC5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogW11cbn0pXG5leHBvcnQgY2xhc3MgQmluZGFibGVTZWxlY3RDb21wb25lbnQgZXh0ZW5kcyBCaW5kYWJsZUNvbXBvbmVudCB7XG5cbiAgQElucHV0KCkgcmV0dXJuS2V5OiBzdHJpbmc7IC8vIGRlZmF1bHQgcmV0dXJucyBzZWxlY3RlZCBvYmplY3RcbiAgQElucHV0KCkgdmFsdWVLZXk6IHN0cmluZyB8IG51bGwgPSAndmFsdWUnOyAvLyBkZWZhdWx0IHNlYXJjaCBpdGVtcyBieSBcInZhbHVlXCIga2V5IGlmIHRoZXkgYXJlIG9iamVjdHNcbiAgQElucHV0KCkgaXRlbXM6IGFueVtdIHwgbnVsbCA9IFtdO1xuICBASW5wdXQoKSBkaXNhYmxlT3B0aW9uQ2VudGVyaW5nOiBib29sZWFuIHwgbnVsbCA9IHRydWU7XG4gIEBJbnB1dCgpIG5hbWVLZXk6IHN0cmluZyB8IG51bGwgPSAnbmFtZSc7XG4gIEBJbnB1dCgpIGRpc2FibGVkID0gZmFsc2U7XG5cbiAgbXVsdGlwbGUgPSBmYWxzZTtcblxuICBnZXQgdmFsdWVOYW1lKCk6IHN0cmluZyB7XG4gICAgY29uc3QgY3VycmVudFZhbHVlID0gdGhpcy52YWx1ZTtcbiAgICByZXR1cm4gdGhpcy52YWx1ZU5hbWVHZXR0ZXIoY3VycmVudFZhbHVlKTtcbiAgfVxuXG4gIHByb3RlY3RlZCB2YWx1ZU5hbWVHZXR0ZXIoY3VycmVudFZhbHVlKTogc3RyaW5nIHtcbiAgICByZXR1cm4gY3VycmVudFZhbHVlID8gY3VycmVudFZhbHVlLm5hbWUgPyBjdXJyZW50VmFsdWUubmFtZSA6IGN1cnJlbnRWYWx1ZSBhcyB1bmtub3duIGFzIHN0cmluZyA6IHRoaXMucGxhY2Vob2xkZXI7XG4gIH1cblxuICBwcm90ZWN0ZWQgZmllbGRDU1NHZXR0ZXIoKSB7XG4gICAgY29uc3QgYmFzZUNTUyA9IHN1cGVyLmZpZWxkQ1NTR2V0dGVyKCk7XG4gICAgYmFzZUNTUy5wdXNoKCdzaW5nbGUtc2VsZWN0Jyk7XG4gICAgcmV0dXJuIGJhc2VDU1M7XG4gIH1cblxuICBwcm90ZWN0ZWQgdmFsdWVHZXR0ZXIoKSB7XG4gICAgY29uc3Qgb2xkVmFsdWUgPSBzdXBlci52YWx1ZUdldHRlcigpO1xuICAgIHJldHVybiB0aGlzLmN1cnJlbnRWYWx1ZShvbGRWYWx1ZSk7IC8vIGdldHMgb25lIG9mIGN1cnJlbnQgaXRlbXMgKGlmIHN0aWxsIHByZXNlbnQpIGJ5IHZhbHVlS2V5XG4gIH1cblxuICBwcm90ZWN0ZWQgY3VycmVudFZhbHVlKG9sZFZhbHVlKSB7XG4gICAgaWYgKCFvbGRWYWx1ZSkgeyByZXR1cm4gb2xkVmFsdWU7IH0gLy8gdmFsdWUgbm90IHlldCBzZXQuIGNhbiBiZSB1bmRlZmluZWQgb3IgbnVsbC5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyB3ZSBjYW4ndCBjaGFuZ2UgaXQgaWYgaXQgaXMgbnVsbCBvciB1bmRlZmluZWQgc28ganVzdCByZXR1cm4gaXQgXCJhcyBpc1wiLlxuXG4gICAgY29uc3QgdmFsdWUgPSBvbGRWYWx1ZVt0aGlzLnZhbHVlS2V5XTtcblxuICAgIGlmICghdmFsdWUpIHsgcmV0dXJuIG9sZFZhbHVlOyB9IC8vIHZhbHVlcyBhcmUgc3RyaW5ncywgbm8gc2VhcmNoIHJlcXVpcmVkXG5cbiAgICByZXR1cm4gdGhpcy5pdGVtcy5maW5kKGl0ZW0gPT4gaXRlbVt0aGlzLnZhbHVlS2V5XSA9PT0gdmFsdWUpO1xuICB9XG59XG4iXX0=