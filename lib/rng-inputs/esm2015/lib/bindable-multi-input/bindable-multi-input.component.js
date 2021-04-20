/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input, Optional, Self } from '@angular/core';
import { BindableComponent } from '../bindable/bindable.component';
import { NgControl } from '@angular/forms';
export class BindableMultiInputComponent extends BindableComponent {
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
BindableMultiInputComponent.decorators = [
    { type: Component, args: [{
                selector: 'rng-bindable-multi-input',
                template: "<mat-form-field [ngClass]=\"fieldCSS\"\n  [appearance]=\"appearance\"\n  color=\"accent\">\n  <mat-label>{{label}}</mat-label>\n  <!-- value has input mask (currency) -->\n  <input\n    matInput\n    [placeholder]=\"placeholder\"\n    [type]=\"inputType\"\n    [prefix]=\"inputPrefix\"\n    [mask]=\"inputMask\"\n    [showMaskTyped]=\"false\"\n    [dropSpecialCharacters]=\"inputDropSpecialCharacters\"\n    [formControl]=\"valueControl\"\n    [errorStateMatcher]=\"matcher\"\n    (blur)=\"onTouch()\">\n  <!-- value type is Password-->\n  <i *ngIf=\"passwordField\" \n    matSuffix\n    (click)=\"password = !password\"\n    class=\"pass-btn rng-icon {{password ? 'rng-icon-visibility_off' : 'rng-icon-visibility'}}\"></i>\n  <mat-error *ngIf=\"valueControl.invalid\">{{getErrorMessage()}}</mat-error>\n</mat-form-field>"
            }] }
];
/** @nocollapse */
BindableMultiInputComponent.ctorParameters = () => [
    { type: NgControl, decorators: [{ type: Optional }, { type: Self }] }
];
BindableMultiInputComponent.propDecorators = {
    password: [{ type: Input }]
};
if (false) {
    /** @type {?} */
    BindableMultiInputComponent.prototype.inputType;
    /** @type {?} */
    BindableMultiInputComponent.prototype.inputPrefix;
    /** @type {?} */
    BindableMultiInputComponent.prototype.inputMask;
    /** @type {?} */
    BindableMultiInputComponent.prototype.inputDropSpecialCharacters;
    /** @type {?} */
    BindableMultiInputComponent.prototype.passwordField;
    /** @type {?} */
    BindableMultiInputComponent.prototype.datepickerField;
    /** @type {?} */
    BindableMultiInputComponent.prototype.ngControl;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmluZGFibGUtbXVsdGktaW5wdXQuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHJuZy9pbnB1dHMvIiwic291cmNlcyI6WyJsaWIvYmluZGFibGUtbXVsdGktaW5wdXQvYmluZGFibGUtbXVsdGktaW5wdXQuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ2pFLE9BQU8sRUFBRSxpQkFBaUIsRUFBYyxNQUFNLGdDQUFnQyxDQUFDO0FBQy9FLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQU8zQyxNQUFNLE9BQU8sMkJBQTRCLFNBQVEsaUJBQWlCOzs7O0lBZ0JoRSxZQUF1QyxTQUFvQjtRQUN6RCxLQUFLLENBQUMsU0FBUyxDQUFDLENBQUM7UUFEb0IsY0FBUyxHQUFULFNBQVMsQ0FBVztRQWYzRCxjQUFTLEdBQWtCLE1BQU0sQ0FBQztRQUNsQyxnQkFBVyxHQUFrQixFQUFFLENBQUM7UUFDaEMsY0FBUyxHQUFrQixFQUFFLENBQUM7UUFDOUIsK0JBQTBCLEdBQW1CLElBQUksQ0FBQztRQUNsRCxrQkFBYSxHQUFtQixLQUFLLENBQUM7UUFDdEMsb0JBQWUsR0FBbUIsS0FBSyxDQUFDO0lBWXhDLENBQUM7Ozs7SUFWRCxJQUNNLFFBQVE7UUFDVixPQUFPLElBQUksQ0FBQyxTQUFTLEtBQUssVUFBVSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQztJQUN0RCxDQUFDOzs7OztJQUNELElBQUksUUFBUSxDQUFDLEtBQWM7UUFDekIsSUFBSSxDQUFDLFNBQVMsR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDO0lBQy9DLENBQUM7Ozs7O0lBTUgsZUFBZSxDQUFDLEtBQWlCOzs7Y0FFekIsUUFBUSxHQUFZLENBQUMsS0FBSyw4QkFBd0IsQ0FBQztRQUN6RCxJQUFJLENBQUMsV0FBVyxHQUFHLFFBQVEsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7UUFDeEMsSUFBSSxDQUFDLFNBQVMsR0FBRyxRQUFRLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO1FBQ3pDLElBQUksQ0FBQywwQkFBMEIsR0FBRyxDQUFDLFFBQVEsQ0FBQztRQUU1QyxpQkFBaUI7UUFDakIsSUFBSSxDQUFDLGFBQWEsR0FBRyxDQUFDLEtBQUssOEJBQXdCLENBQUMsQ0FBQztRQUNyRCxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQyxnQkFBZ0I7UUFFcEQsbUJBQW1CO1FBQ25CLElBQUksQ0FBQyxlQUFlLEdBQUcsQ0FBQyxLQUFLLHNCQUFvQixDQUFDLENBQUM7UUFFbkQsS0FBSyxDQUFDLGVBQWUsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUMvQixDQUFDOzs7O0lBRUQsV0FBVzs7Y0FDSCxhQUFhLEdBQUcsS0FBSyxDQUFDLFdBQVcsRUFBRTtRQUV6QyxJQUFJLENBQUMsYUFBYSxFQUFFO1lBQUUsT0FBTyxhQUFhLENBQUM7U0FBRSxDQUFDLCtCQUErQjtRQUU3RSxRQUFRLElBQUksQ0FBQyxTQUFTLEVBQUU7WUFDdEIsc0JBQW9CLENBQUMsQ0FBQztnQkFDcEIsT0FBTyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsYUFBYSxDQUFDLENBQUM7YUFDN0M7WUFDRCw4QkFBd0IsQ0FBQyxDQUFDOztzQkFDbEIsS0FBSyxHQUFHLGFBQWEsQ0FBQyxLQUFLOztzQkFDM0IsR0FBRyxHQUFHLGFBQWEsQ0FBQyxHQUFHO2dCQUM3QixPQUFPLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxLQUFLLENBQUMsR0FBRyxLQUFLLEdBQUcsSUFBSSxDQUFDLGdCQUFnQixDQUFDLEdBQUcsQ0FBQyxDQUFDO2FBQzFFO1lBQ0QsU0FBUyx5QkFBeUI7Z0JBQ2hDLE9BQU8sYUFBYSxDQUFDO1NBQ3hCO0lBQ0gsQ0FBQzs7O1lBM0RGLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsMEJBQTBCO2dCQUNwQyxpMEJBQW9EO2FBRXJEOzs7O1lBTlEsU0FBUyx1QkF1QkgsUUFBUSxZQUFJLElBQUk7Ozt1QkFSNUIsS0FBSzs7OztJQVBOLGdEQUFrQzs7SUFDbEMsa0RBQWdDOztJQUNoQyxnREFBOEI7O0lBQzlCLGlFQUFrRDs7SUFDbEQsb0RBQXNDOztJQUN0QyxzREFBd0M7O0lBVTVCLGdEQUErQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQsIE9wdGlvbmFsLCBTZWxmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBCaW5kYWJsZUNvbXBvbmVudCwgVkFMVUVfVFlQRSB9IGZyb20gJy4uL2JpbmRhYmxlL2JpbmRhYmxlLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBOZ0NvbnRyb2wgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ3JuZy1iaW5kYWJsZS1tdWx0aS1pbnB1dCcsXG4gIHRlbXBsYXRlVXJsOiAnLi9iaW5kYWJsZS1tdWx0aS1pbnB1dC5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogW11cbn0pXG5leHBvcnQgY2xhc3MgQmluZGFibGVNdWx0aUlucHV0Q29tcG9uZW50IGV4dGVuZHMgQmluZGFibGVDb21wb25lbnQge1xuICBpbnB1dFR5cGU6IHN0cmluZyB8IG51bGwgPSAndGV4dCc7XG4gIGlucHV0UHJlZml4OiBzdHJpbmcgfCBudWxsID0gJyc7XG4gIGlucHV0TWFzazogc3RyaW5nIHwgbnVsbCA9ICcnO1xuICBpbnB1dERyb3BTcGVjaWFsQ2hhcmFjdGVyczogYm9vbGVhbiB8IG51bGwgPSB0cnVlO1xuICBwYXNzd29yZEZpZWxkOiBib29sZWFuIHwgbnVsbCA9IGZhbHNlO1xuICBkYXRlcGlja2VyRmllbGQ6IGJvb2xlYW4gfCBudWxsID0gZmFsc2U7XG5cbiAgQElucHV0KClcbiAgICBnZXQgcGFzc3dvcmQoKTogYm9vbGVhbiB7XG4gICAgICByZXR1cm4gdGhpcy5pbnB1dFR5cGUgPT09ICdwYXNzd29yZCcgPyB0cnVlIDogZmFsc2U7XG4gICAgfVxuICAgIHNldCBwYXNzd29yZCh2YWx1ZTogYm9vbGVhbikge1xuICAgICAgdGhpcy5pbnB1dFR5cGUgPSB2YWx1ZSA/ICdwYXNzd29yZCcgOiAndGV4dCc7XG4gICAgfVxuXG4gIGNvbnN0cnVjdG9yKEBPcHRpb25hbCgpIEBTZWxmKCkgcHVibGljIG5nQ29udHJvbDogTmdDb250cm9sKSB7XG4gICAgc3VwZXIobmdDb250cm9sKTtcbiAgfVxuXG4gIHZhbHVlVHlwZVNldHRlcih2YWx1ZTogVkFMVUVfVFlQRSkge1xuICAgIC8vIGN1cnJlbmN5IGZpZWxkXG4gICAgY29uc3QgY3VycmVuY3k6IGJvb2xlYW4gPSAodmFsdWUgPT09IFZBTFVFX1RZUEUuQ1VSUkVOQ1kpO1xuICAgIHRoaXMuaW5wdXRQcmVmaXggPSBjdXJyZW5jeSA/ICckICcgOiAnJztcbiAgICB0aGlzLmlucHV0TWFzayA9IGN1cnJlbmN5ID8gJzAqLjAwJyA6ICcnO1xuICAgIHRoaXMuaW5wdXREcm9wU3BlY2lhbENoYXJhY3RlcnMgPSAhY3VycmVuY3k7XG5cbiAgICAvLyBwYXNzd29yZCBmaWVsZFxuICAgIHRoaXMucGFzc3dvcmRGaWVsZCA9ICh2YWx1ZSA9PT0gVkFMVUVfVFlQRS5QQVNTV09SRCk7XG4gICAgdGhpcy5wYXNzd29yZCA9IHRoaXMucGFzc3dvcmRGaWVsZDsgLy8gaW5pdGlhbCB2YWx1ZVxuXG4gICAgLy8gZGF0ZXBpY2tlciBmaWVsZFxuICAgIHRoaXMuZGF0ZXBpY2tlckZpZWxkID0gKHZhbHVlID09PSBWQUxVRV9UWVBFLkRBVEUpO1xuXG4gICAgc3VwZXIudmFsdWVUeXBlU2V0dGVyKHZhbHVlKTtcbiAgfVxuXG4gIHZhbHVlR2V0dGVyKCkge1xuICAgIGNvbnN0IG9yaWdpbmFsVmFsdWUgPSBzdXBlci52YWx1ZUdldHRlcigpO1xuXG4gICAgaWYgKCFvcmlnaW5hbFZhbHVlKSB7IHJldHVybiBvcmlnaW5hbFZhbHVlOyB9IC8vIHJldHVybiB3aXRob3V0IG1vZGlmaWNhdGlvbnNcblxuICAgIHN3aXRjaCAodGhpcy52YWx1ZVR5cGUpIHtcbiAgICAgIGNhc2UgVkFMVUVfVFlQRS5EQVRFOiB7XG4gICAgICAgIHJldHVybiB0aGlzLmF1eERhdGVGb3JtYXR0ZXIob3JpZ2luYWxWYWx1ZSk7XG4gICAgICB9XG4gICAgICBjYXNlIFZBTFVFX1RZUEUuRFVSQVRJT046IHtcbiAgICAgICAgY29uc3Qgc3RhcnQgPSBvcmlnaW5hbFZhbHVlLnN0YXJ0O1xuICAgICAgICBjb25zdCBlbmQgPSBvcmlnaW5hbFZhbHVlLmVuZDtcbiAgICAgICAgcmV0dXJuIHRoaXMuYXV4RGF0ZUZvcm1hdHRlcihzdGFydCkgKyAnIC0gJyArIHRoaXMuYXV4RGF0ZUZvcm1hdHRlcihlbmQpO1xuICAgICAgfVxuICAgICAgZGVmYXVsdDogLy8gbm8gZm9ybWF0dGluZyByZXF1aXJlZFxuICAgICAgICByZXR1cm4gb3JpZ2luYWxWYWx1ZTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==