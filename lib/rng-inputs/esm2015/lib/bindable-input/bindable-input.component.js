/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input, Optional, Self } from '@angular/core';
import { BindableComponent } from '../bindable/bindable.component';
import { NgControl } from '@angular/forms';
export class BindableInputComponent extends BindableComponent {
    /**
     * @param {?} ngControl
     */
    constructor(ngControl) {
        super(ngControl);
        this.ngControl = ngControl;
        this.inputType = 'text';
        this.inputPrefix = '';
        this.inputMask = '';
        this.inputDropSpecialCharacters = true;
        this.passwordField = false;
        this.datepickerField = false;
    }
    /**
     * @return {?}
     */
    get password() {
        return this.inputType === 'password' ? true : false;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set password(value) {
        this.inputType = value ? 'password' : 'text';
    }
    /**
     * @return {?}
     */
    get mask() {
        return this.inputMask;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set mask(value) {
        this.inputMask = value || '';
    }
    /**
     * @param {?} value
     * @return {?}
     */
    valueTypeSetter(value) {
        // currency field
        /** @type {?} */
        const currency = (value === "currency" /* CURRENCY */);
        this.inputPrefix = currency ? '$ ' : '';
        this.inputMask = currency ? '0*.00' : '';
        this.inputDropSpecialCharacters = !currency;
        // password field
        this.passwordField = (value === "password" /* PASSWORD */);
        this.password = this.passwordField; // initial value
        // datepicker field
        this.datepickerField = (value === "date" /* DATE */);
        super.valueTypeSetter(value);
    }
    /**
     * @return {?}
     */
    valueGetter() {
        /** @type {?} */
        const originalValue = super.valueGetter();
        if (!originalValue) {
            return originalValue;
        } // return without modifications
        switch (this.valueType) {
            case "date" /* DATE */: {
                return this.auxDateFormatter(originalValue);
            }
            case "duration" /* DURATION */: {
                /** @type {?} */
                const start = originalValue.start;
                /** @type {?} */
                const end = originalValue.end;
                return this.auxDateFormatter(start) + ' - ' + this.auxDateFormatter(end);
            }
            default: // no formatting required
                return originalValue;
        }
    }
}
BindableInputComponent.decorators = [
    { type: Component, args: [{
                selector: 'rng-bindable-input',
                template: "<mat-form-field [ngClass]=\"fieldCSS\"\n  [appearance]=\"appearance\"\n  color=\"accent\">\n  <mat-label>{{label}}</mat-label>\n  <!-- value has input mask (currency) -->\n  <input\n    matInput\n    [placeholder]=\"placeholder\"\n    [type]=\"inputType\"\n    [prefix]=\"inputPrefix\"\n    [mask]=\"inputMask\"\n    [showMaskTyped]=\"false\"\n    [dropSpecialCharacters]=\"inputDropSpecialCharacters\"\n    [formControl]=\"valueControl\"\n    [errorStateMatcher]=\"matcher\"\n    (blur)=\"onTouch()\">\n  <!-- value type is Password-->\n  <i *ngIf=\"passwordField\" \n    matSuffix\n    (click)=\"password = !password\"\n    class=\"pass-btn rng-icon {{password ? 'rng-icon-visibility_off' : 'rng-icon-visibility'}}\"></i>\n  <mat-error *ngIf=\"valueControl.invalid\">{{getErrorMessage()}}</mat-error>\n</mat-form-field>"
            }] }
];
/** @nocollapse */
BindableInputComponent.ctorParameters = () => [
    { type: NgControl, decorators: [{ type: Optional }, { type: Self }] }
];
BindableInputComponent.propDecorators = {
    password: [{ type: Input }],
    mask: [{ type: Input }]
};
if (false) {
    /** @type {?} */
    BindableInputComponent.prototype.inputType;
    /** @type {?} */
    BindableInputComponent.prototype.inputPrefix;
    /** @type {?} */
    BindableInputComponent.prototype.inputMask;
    /** @type {?} */
    BindableInputComponent.prototype.inputDropSpecialCharacters;
    /** @type {?} */
    BindableInputComponent.prototype.passwordField;
    /** @type {?} */
    BindableInputComponent.prototype.datepickerField;
    /** @type {?} */
    BindableInputComponent.prototype.ngControl;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmluZGFibGUtaW5wdXQuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHJuZy9pbnB1dHMvIiwic291cmNlcyI6WyJsaWIvYmluZGFibGUtaW5wdXQvYmluZGFibGUtaW5wdXQuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ2pFLE9BQU8sRUFBRSxpQkFBaUIsRUFBYyxNQUFNLGdDQUFnQyxDQUFDO0FBQy9FLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQU8zQyxNQUFNLE9BQU8sc0JBQXVCLFNBQVEsaUJBQWlCOzs7O0lBdUIzRCxZQUF1QyxTQUFvQjtRQUN6RCxLQUFLLENBQUMsU0FBUyxDQUFDLENBQUM7UUFEb0IsY0FBUyxHQUFULFNBQVMsQ0FBVztRQXRCM0QsY0FBUyxHQUFrQixNQUFNLENBQUM7UUFDbEMsZ0JBQVcsR0FBa0IsRUFBRSxDQUFDO1FBQ2hDLGNBQVMsR0FBa0IsRUFBRSxDQUFDO1FBQzlCLCtCQUEwQixHQUFtQixJQUFJLENBQUM7UUFDbEQsa0JBQWEsR0FBbUIsS0FBSyxDQUFDO1FBQ3RDLG9CQUFlLEdBQW1CLEtBQUssQ0FBQztJQW1CeEMsQ0FBQzs7OztJQWpCRCxJQUNNLFFBQVE7UUFDVixPQUFPLElBQUksQ0FBQyxTQUFTLEtBQUssVUFBVSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQztJQUN0RCxDQUFDOzs7OztJQUNELElBQUksUUFBUSxDQUFDLEtBQWM7UUFDekIsSUFBSSxDQUFDLFNBQVMsR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDO0lBQy9DLENBQUM7Ozs7SUFDSCxJQUNJLElBQUk7UUFDTixPQUFPLElBQUksQ0FBQyxTQUFTLENBQUM7SUFDeEIsQ0FBQzs7Ozs7SUFDRCxJQUFJLElBQUksQ0FBQyxLQUFhO1FBQ3BCLElBQUksQ0FBQyxTQUFTLEdBQUcsS0FBSyxJQUFJLEVBQUUsQ0FBQztJQUMvQixDQUFDOzs7OztJQU1ELGVBQWUsQ0FBQyxLQUFpQjs7O2NBRXpCLFFBQVEsR0FBWSxDQUFDLEtBQUssOEJBQXdCLENBQUM7UUFDekQsSUFBSSxDQUFDLFdBQVcsR0FBRyxRQUFRLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO1FBQ3hDLElBQUksQ0FBQyxTQUFTLEdBQUcsUUFBUSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztRQUN6QyxJQUFJLENBQUMsMEJBQTBCLEdBQUcsQ0FBQyxRQUFRLENBQUM7UUFFNUMsaUJBQWlCO1FBQ2pCLElBQUksQ0FBQyxhQUFhLEdBQUcsQ0FBQyxLQUFLLDhCQUF3QixDQUFDLENBQUM7UUFDckQsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUMsZ0JBQWdCO1FBRXBELG1CQUFtQjtRQUNuQixJQUFJLENBQUMsZUFBZSxHQUFHLENBQUMsS0FBSyxzQkFBb0IsQ0FBQyxDQUFDO1FBRW5ELEtBQUssQ0FBQyxlQUFlLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDL0IsQ0FBQzs7OztJQUVELFdBQVc7O2NBQ0gsYUFBYSxHQUFHLEtBQUssQ0FBQyxXQUFXLEVBQUU7UUFFekMsSUFBSSxDQUFDLGFBQWEsRUFBRTtZQUFFLE9BQU8sYUFBYSxDQUFDO1NBQUUsQ0FBQywrQkFBK0I7UUFFN0UsUUFBUSxJQUFJLENBQUMsU0FBUyxFQUFFO1lBQ3RCLHNCQUFvQixDQUFDLENBQUM7Z0JBQ3BCLE9BQU8sSUFBSSxDQUFDLGdCQUFnQixDQUFDLGFBQWEsQ0FBQyxDQUFDO2FBQzdDO1lBQ0QsOEJBQXdCLENBQUMsQ0FBQzs7c0JBQ2xCLEtBQUssR0FBRyxhQUFhLENBQUMsS0FBSzs7c0JBQzNCLEdBQUcsR0FBRyxhQUFhLENBQUMsR0FBRztnQkFDN0IsT0FBTyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsS0FBSyxDQUFDLEdBQUcsS0FBSyxHQUFHLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxHQUFHLENBQUMsQ0FBQzthQUMxRTtZQUNELFNBQVMseUJBQXlCO2dCQUNoQyxPQUFPLGFBQWEsQ0FBQztTQUN4QjtJQUNILENBQUM7OztZQWxFRixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLG9CQUFvQjtnQkFDOUIsaTBCQUE4QzthQUUvQzs7OztZQU5RLFNBQVMsdUJBOEJILFFBQVEsWUFBSSxJQUFJOzs7dUJBZjVCLEtBQUs7bUJBT0wsS0FBSzs7OztJQWROLDJDQUFrQzs7SUFDbEMsNkNBQWdDOztJQUNoQywyQ0FBOEI7O0lBQzlCLDREQUFrRDs7SUFDbEQsK0NBQXNDOztJQUN0QyxpREFBd0M7O0lBaUI1QiwyQ0FBK0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0LCBPcHRpb25hbCwgU2VsZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQmluZGFibGVDb21wb25lbnQsIFZBTFVFX1RZUEUgfSBmcm9tICcuLi9iaW5kYWJsZS9iaW5kYWJsZS5jb21wb25lbnQnO1xuaW1wb3J0IHsgTmdDb250cm9sIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdybmctYmluZGFibGUtaW5wdXQnLFxuICB0ZW1wbGF0ZVVybDogJy4vYmluZGFibGUtaW5wdXQuY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFtdXG59KVxuZXhwb3J0IGNsYXNzIEJpbmRhYmxlSW5wdXRDb21wb25lbnQgZXh0ZW5kcyBCaW5kYWJsZUNvbXBvbmVudCB7XG4gIGlucHV0VHlwZTogc3RyaW5nIHwgbnVsbCA9ICd0ZXh0JztcbiAgaW5wdXRQcmVmaXg6IHN0cmluZyB8IG51bGwgPSAnJztcbiAgaW5wdXRNYXNrOiBzdHJpbmcgfCBudWxsID0gJyc7XG4gIGlucHV0RHJvcFNwZWNpYWxDaGFyYWN0ZXJzOiBib29sZWFuIHwgbnVsbCA9IHRydWU7XG4gIHBhc3N3b3JkRmllbGQ6IGJvb2xlYW4gfCBudWxsID0gZmFsc2U7XG4gIGRhdGVwaWNrZXJGaWVsZDogYm9vbGVhbiB8IG51bGwgPSBmYWxzZTtcblxuICBASW5wdXQoKVxuICAgIGdldCBwYXNzd29yZCgpOiBib29sZWFuIHtcbiAgICAgIHJldHVybiB0aGlzLmlucHV0VHlwZSA9PT0gJ3Bhc3N3b3JkJyA/IHRydWUgOiBmYWxzZTtcbiAgICB9XG4gICAgc2V0IHBhc3N3b3JkKHZhbHVlOiBib29sZWFuKSB7XG4gICAgICB0aGlzLmlucHV0VHlwZSA9IHZhbHVlID8gJ3Bhc3N3b3JkJyA6ICd0ZXh0JztcbiAgICB9XG4gIEBJbnB1dCgpXG4gIGdldCBtYXNrKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMuaW5wdXRNYXNrO1xuICB9XG4gIHNldCBtYXNrKHZhbHVlOiBzdHJpbmcpIHtcbiAgICB0aGlzLmlucHV0TWFzayA9IHZhbHVlIHx8ICcnO1xuICB9XG5cbiAgY29uc3RydWN0b3IoQE9wdGlvbmFsKCkgQFNlbGYoKSBwdWJsaWMgbmdDb250cm9sOiBOZ0NvbnRyb2wpIHtcbiAgICBzdXBlcihuZ0NvbnRyb2wpO1xuICB9XG5cbiAgdmFsdWVUeXBlU2V0dGVyKHZhbHVlOiBWQUxVRV9UWVBFKSB7XG4gICAgLy8gY3VycmVuY3kgZmllbGRcbiAgICBjb25zdCBjdXJyZW5jeTogYm9vbGVhbiA9ICh2YWx1ZSA9PT0gVkFMVUVfVFlQRS5DVVJSRU5DWSk7XG4gICAgdGhpcy5pbnB1dFByZWZpeCA9IGN1cnJlbmN5ID8gJyQgJyA6ICcnO1xuICAgIHRoaXMuaW5wdXRNYXNrID0gY3VycmVuY3kgPyAnMCouMDAnIDogJyc7XG4gICAgdGhpcy5pbnB1dERyb3BTcGVjaWFsQ2hhcmFjdGVycyA9ICFjdXJyZW5jeTtcblxuICAgIC8vIHBhc3N3b3JkIGZpZWxkXG4gICAgdGhpcy5wYXNzd29yZEZpZWxkID0gKHZhbHVlID09PSBWQUxVRV9UWVBFLlBBU1NXT1JEKTtcbiAgICB0aGlzLnBhc3N3b3JkID0gdGhpcy5wYXNzd29yZEZpZWxkOyAvLyBpbml0aWFsIHZhbHVlXG5cbiAgICAvLyBkYXRlcGlja2VyIGZpZWxkXG4gICAgdGhpcy5kYXRlcGlja2VyRmllbGQgPSAodmFsdWUgPT09IFZBTFVFX1RZUEUuREFURSk7XG5cbiAgICBzdXBlci52YWx1ZVR5cGVTZXR0ZXIodmFsdWUpO1xuICB9XG5cbiAgdmFsdWVHZXR0ZXIoKSB7XG4gICAgY29uc3Qgb3JpZ2luYWxWYWx1ZSA9IHN1cGVyLnZhbHVlR2V0dGVyKCk7XG5cbiAgICBpZiAoIW9yaWdpbmFsVmFsdWUpIHsgcmV0dXJuIG9yaWdpbmFsVmFsdWU7IH0gLy8gcmV0dXJuIHdpdGhvdXQgbW9kaWZpY2F0aW9uc1xuXG4gICAgc3dpdGNoICh0aGlzLnZhbHVlVHlwZSkge1xuICAgICAgY2FzZSBWQUxVRV9UWVBFLkRBVEU6IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuYXV4RGF0ZUZvcm1hdHRlcihvcmlnaW5hbFZhbHVlKTtcbiAgICAgIH1cbiAgICAgIGNhc2UgVkFMVUVfVFlQRS5EVVJBVElPTjoge1xuICAgICAgICBjb25zdCBzdGFydCA9IG9yaWdpbmFsVmFsdWUuc3RhcnQ7XG4gICAgICAgIGNvbnN0IGVuZCA9IG9yaWdpbmFsVmFsdWUuZW5kO1xuICAgICAgICByZXR1cm4gdGhpcy5hdXhEYXRlRm9ybWF0dGVyKHN0YXJ0KSArICcgLSAnICsgdGhpcy5hdXhEYXRlRm9ybWF0dGVyKGVuZCk7XG4gICAgICB9XG4gICAgICBkZWZhdWx0OiAvLyBubyBmb3JtYXR0aW5nIHJlcXVpcmVkXG4gICAgICAgIHJldHVybiBvcmlnaW5hbFZhbHVlO1xuICAgIH1cbiAgfVxufVxuIl19