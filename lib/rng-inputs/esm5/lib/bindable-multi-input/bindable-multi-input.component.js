/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Component, Input, Optional, Self } from '@angular/core';
import { BindableComponent } from '../bindable/bindable.component';
import { NgControl } from '@angular/forms';
var BindableMultiInputComponent = /** @class */ (function (_super) {
    tslib_1.__extends(BindableMultiInputComponent, _super);
    function BindableMultiInputComponent(ngControl) {
        var _this = _super.call(this, ngControl) || this;
        _this.ngControl = ngControl;
        _this.inputType = 'text';
        _this.inputPrefix = '';
        _this.inputMask = '';
        _this.inputDropSpecialCharacters = true;
        _this.passwordField = false;
        _this.datepickerField = false;
        return _this;
    }
    Object.defineProperty(BindableMultiInputComponent.prototype, "password", {
        get: /**
         * @return {?}
         */
        function () {
            return this.inputType === 'password' ? true : false;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this.inputType = value ? 'password' : 'text';
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?} value
     * @return {?}
     */
    BindableMultiInputComponent.prototype.valueTypeSetter = /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        // currency field
        /** @type {?} */
        var currency = (value === "currency" /* CURRENCY */);
        this.inputPrefix = currency ? '$ ' : '';
        this.inputMask = currency ? '0*.00' : '';
        this.inputDropSpecialCharacters = !currency;
        // password field
        this.passwordField = (value === "password" /* PASSWORD */);
        this.password = this.passwordField; // initial value
        // datepicker field
        this.datepickerField = (value === "date" /* DATE */);
        _super.prototype.valueTypeSetter.call(this, value);
    };
    /**
     * @return {?}
     */
    BindableMultiInputComponent.prototype.valueGetter = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var originalValue = _super.prototype.valueGetter.call(this);
        if (!originalValue) {
            return originalValue;
        } // return without modifications
        switch (this.valueType) {
            case "date" /* DATE */: {
                return this.auxDateFormatter(originalValue);
            }
            case "duration" /* DURATION */: {
                /** @type {?} */
                var start = originalValue.start;
                /** @type {?} */
                var end = originalValue.end;
                return this.auxDateFormatter(start) + ' - ' + this.auxDateFormatter(end);
            }
            default: // no formatting required
                return originalValue;
        }
    };
    BindableMultiInputComponent.decorators = [
        { type: Component, args: [{
                    selector: 'rng-bindable-multi-input',
                    template: "<mat-form-field [ngClass]=\"fieldCSS\"\n  [appearance]=\"appearance\"\n  color=\"accent\">\n  <mat-label>{{label}}</mat-label>\n  <!-- value has input mask (currency) -->\n  <input\n    matInput\n    [placeholder]=\"placeholder\"\n    [type]=\"inputType\"\n    [prefix]=\"inputPrefix\"\n    [mask]=\"inputMask\"\n    [showMaskTyped]=\"false\"\n    [dropSpecialCharacters]=\"inputDropSpecialCharacters\"\n    [formControl]=\"valueControl\"\n    [errorStateMatcher]=\"matcher\"\n    (blur)=\"onTouch()\">\n  <!-- value type is Password-->\n  <i *ngIf=\"passwordField\" \n    matSuffix\n    (click)=\"password = !password\"\n    class=\"pass-btn rng-icon {{password ? 'rng-icon-visibility_off' : 'rng-icon-visibility'}}\"></i>\n  <mat-error *ngIf=\"valueControl.invalid\">{{getErrorMessage()}}</mat-error>\n</mat-form-field>"
                }] }
    ];
    /** @nocollapse */
    BindableMultiInputComponent.ctorParameters = function () { return [
        { type: NgControl, decorators: [{ type: Optional }, { type: Self }] }
    ]; };
    BindableMultiInputComponent.propDecorators = {
        password: [{ type: Input }]
    };
    return BindableMultiInputComponent;
}(BindableComponent));
export { BindableMultiInputComponent };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmluZGFibGUtbXVsdGktaW5wdXQuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHJuZy9pbnB1dHMvIiwic291cmNlcyI6WyJsaWIvYmluZGFibGUtbXVsdGktaW5wdXQvYmluZGFibGUtbXVsdGktaW5wdXQuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNqRSxPQUFPLEVBQUUsaUJBQWlCLEVBQWMsTUFBTSxnQ0FBZ0MsQ0FBQztBQUMvRSxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFFM0M7SUFLaUQsdURBQWlCO0lBZ0JoRSxxQ0FBdUMsU0FBb0I7UUFBM0QsWUFDRSxrQkFBTSxTQUFTLENBQUMsU0FDakI7UUFGc0MsZUFBUyxHQUFULFNBQVMsQ0FBVztRQWYzRCxlQUFTLEdBQWtCLE1BQU0sQ0FBQztRQUNsQyxpQkFBVyxHQUFrQixFQUFFLENBQUM7UUFDaEMsZUFBUyxHQUFrQixFQUFFLENBQUM7UUFDOUIsZ0NBQTBCLEdBQW1CLElBQUksQ0FBQztRQUNsRCxtQkFBYSxHQUFtQixLQUFLLENBQUM7UUFDdEMscUJBQWUsR0FBbUIsS0FBSyxDQUFDOztJQVl4QyxDQUFDO0lBVkQsc0JBQ00saURBQVE7Ozs7UUFEZDtZQUVJLE9BQU8sSUFBSSxDQUFDLFNBQVMsS0FBSyxVQUFVLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDO1FBQ3RELENBQUM7Ozs7O1FBQ0QsVUFBYSxLQUFjO1lBQ3pCLElBQUksQ0FBQyxTQUFTLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQztRQUMvQyxDQUFDOzs7T0FIQTs7Ozs7SUFTSCxxREFBZTs7OztJQUFmLFVBQWdCLEtBQWlCOzs7WUFFekIsUUFBUSxHQUFZLENBQUMsS0FBSyw4QkFBd0IsQ0FBQztRQUN6RCxJQUFJLENBQUMsV0FBVyxHQUFHLFFBQVEsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7UUFDeEMsSUFBSSxDQUFDLFNBQVMsR0FBRyxRQUFRLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO1FBQ3pDLElBQUksQ0FBQywwQkFBMEIsR0FBRyxDQUFDLFFBQVEsQ0FBQztRQUU1QyxpQkFBaUI7UUFDakIsSUFBSSxDQUFDLGFBQWEsR0FBRyxDQUFDLEtBQUssOEJBQXdCLENBQUMsQ0FBQztRQUNyRCxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQyxnQkFBZ0I7UUFFcEQsbUJBQW1CO1FBQ25CLElBQUksQ0FBQyxlQUFlLEdBQUcsQ0FBQyxLQUFLLHNCQUFvQixDQUFDLENBQUM7UUFFbkQsaUJBQU0sZUFBZSxZQUFDLEtBQUssQ0FBQyxDQUFDO0lBQy9CLENBQUM7Ozs7SUFFRCxpREFBVzs7O0lBQVg7O1lBQ1EsYUFBYSxHQUFHLGlCQUFNLFdBQVcsV0FBRTtRQUV6QyxJQUFJLENBQUMsYUFBYSxFQUFFO1lBQUUsT0FBTyxhQUFhLENBQUM7U0FBRSxDQUFDLCtCQUErQjtRQUU3RSxRQUFRLElBQUksQ0FBQyxTQUFTLEVBQUU7WUFDdEIsc0JBQW9CLENBQUMsQ0FBQztnQkFDcEIsT0FBTyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsYUFBYSxDQUFDLENBQUM7YUFDN0M7WUFDRCw4QkFBd0IsQ0FBQyxDQUFDOztvQkFDbEIsS0FBSyxHQUFHLGFBQWEsQ0FBQyxLQUFLOztvQkFDM0IsR0FBRyxHQUFHLGFBQWEsQ0FBQyxHQUFHO2dCQUM3QixPQUFPLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxLQUFLLENBQUMsR0FBRyxLQUFLLEdBQUcsSUFBSSxDQUFDLGdCQUFnQixDQUFDLEdBQUcsQ0FBQyxDQUFDO2FBQzFFO1lBQ0QsU0FBUyx5QkFBeUI7Z0JBQ2hDLE9BQU8sYUFBYSxDQUFDO1NBQ3hCO0lBQ0gsQ0FBQzs7Z0JBM0RGLFNBQVMsU0FBQztvQkFDVCxRQUFRLEVBQUUsMEJBQTBCO29CQUNwQyxpMEJBQW9EO2lCQUVyRDs7OztnQkFOUSxTQUFTLHVCQXVCSCxRQUFRLFlBQUksSUFBSTs7OzJCQVI1QixLQUFLOztJQStDUixrQ0FBQztDQUFBLEFBNURELENBS2lELGlCQUFpQixHQXVEakU7U0F2RFksMkJBQTJCOzs7SUFDdEMsZ0RBQWtDOztJQUNsQyxrREFBZ0M7O0lBQ2hDLGdEQUE4Qjs7SUFDOUIsaUVBQWtEOztJQUNsRCxvREFBc0M7O0lBQ3RDLHNEQUF3Qzs7SUFVNUIsZ0RBQStDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCwgT3B0aW9uYWwsIFNlbGYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEJpbmRhYmxlQ29tcG9uZW50LCBWQUxVRV9UWVBFIH0gZnJvbSAnLi4vYmluZGFibGUvYmluZGFibGUuY29tcG9uZW50JztcbmltcG9ydCB7IE5nQ29udHJvbCB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAncm5nLWJpbmRhYmxlLW11bHRpLWlucHV0JyxcbiAgdGVtcGxhdGVVcmw6ICcuL2JpbmRhYmxlLW11bHRpLWlucHV0LmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbXVxufSlcbmV4cG9ydCBjbGFzcyBCaW5kYWJsZU11bHRpSW5wdXRDb21wb25lbnQgZXh0ZW5kcyBCaW5kYWJsZUNvbXBvbmVudCB7XG4gIGlucHV0VHlwZTogc3RyaW5nIHwgbnVsbCA9ICd0ZXh0JztcbiAgaW5wdXRQcmVmaXg6IHN0cmluZyB8IG51bGwgPSAnJztcbiAgaW5wdXRNYXNrOiBzdHJpbmcgfCBudWxsID0gJyc7XG4gIGlucHV0RHJvcFNwZWNpYWxDaGFyYWN0ZXJzOiBib29sZWFuIHwgbnVsbCA9IHRydWU7XG4gIHBhc3N3b3JkRmllbGQ6IGJvb2xlYW4gfCBudWxsID0gZmFsc2U7XG4gIGRhdGVwaWNrZXJGaWVsZDogYm9vbGVhbiB8IG51bGwgPSBmYWxzZTtcblxuICBASW5wdXQoKVxuICAgIGdldCBwYXNzd29yZCgpOiBib29sZWFuIHtcbiAgICAgIHJldHVybiB0aGlzLmlucHV0VHlwZSA9PT0gJ3Bhc3N3b3JkJyA/IHRydWUgOiBmYWxzZTtcbiAgICB9XG4gICAgc2V0IHBhc3N3b3JkKHZhbHVlOiBib29sZWFuKSB7XG4gICAgICB0aGlzLmlucHV0VHlwZSA9IHZhbHVlID8gJ3Bhc3N3b3JkJyA6ICd0ZXh0JztcbiAgICB9XG5cbiAgY29uc3RydWN0b3IoQE9wdGlvbmFsKCkgQFNlbGYoKSBwdWJsaWMgbmdDb250cm9sOiBOZ0NvbnRyb2wpIHtcbiAgICBzdXBlcihuZ0NvbnRyb2wpO1xuICB9XG5cbiAgdmFsdWVUeXBlU2V0dGVyKHZhbHVlOiBWQUxVRV9UWVBFKSB7XG4gICAgLy8gY3VycmVuY3kgZmllbGRcbiAgICBjb25zdCBjdXJyZW5jeTogYm9vbGVhbiA9ICh2YWx1ZSA9PT0gVkFMVUVfVFlQRS5DVVJSRU5DWSk7XG4gICAgdGhpcy5pbnB1dFByZWZpeCA9IGN1cnJlbmN5ID8gJyQgJyA6ICcnO1xuICAgIHRoaXMuaW5wdXRNYXNrID0gY3VycmVuY3kgPyAnMCouMDAnIDogJyc7XG4gICAgdGhpcy5pbnB1dERyb3BTcGVjaWFsQ2hhcmFjdGVycyA9ICFjdXJyZW5jeTtcblxuICAgIC8vIHBhc3N3b3JkIGZpZWxkXG4gICAgdGhpcy5wYXNzd29yZEZpZWxkID0gKHZhbHVlID09PSBWQUxVRV9UWVBFLlBBU1NXT1JEKTtcbiAgICB0aGlzLnBhc3N3b3JkID0gdGhpcy5wYXNzd29yZEZpZWxkOyAvLyBpbml0aWFsIHZhbHVlXG5cbiAgICAvLyBkYXRlcGlja2VyIGZpZWxkXG4gICAgdGhpcy5kYXRlcGlja2VyRmllbGQgPSAodmFsdWUgPT09IFZBTFVFX1RZUEUuREFURSk7XG5cbiAgICBzdXBlci52YWx1ZVR5cGVTZXR0ZXIodmFsdWUpO1xuICB9XG5cbiAgdmFsdWVHZXR0ZXIoKSB7XG4gICAgY29uc3Qgb3JpZ2luYWxWYWx1ZSA9IHN1cGVyLnZhbHVlR2V0dGVyKCk7XG5cbiAgICBpZiAoIW9yaWdpbmFsVmFsdWUpIHsgcmV0dXJuIG9yaWdpbmFsVmFsdWU7IH0gLy8gcmV0dXJuIHdpdGhvdXQgbW9kaWZpY2F0aW9uc1xuXG4gICAgc3dpdGNoICh0aGlzLnZhbHVlVHlwZSkge1xuICAgICAgY2FzZSBWQUxVRV9UWVBFLkRBVEU6IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuYXV4RGF0ZUZvcm1hdHRlcihvcmlnaW5hbFZhbHVlKTtcbiAgICAgIH1cbiAgICAgIGNhc2UgVkFMVUVfVFlQRS5EVVJBVElPTjoge1xuICAgICAgICBjb25zdCBzdGFydCA9IG9yaWdpbmFsVmFsdWUuc3RhcnQ7XG4gICAgICAgIGNvbnN0IGVuZCA9IG9yaWdpbmFsVmFsdWUuZW5kO1xuICAgICAgICByZXR1cm4gdGhpcy5hdXhEYXRlRm9ybWF0dGVyKHN0YXJ0KSArICcgLSAnICsgdGhpcy5hdXhEYXRlRm9ybWF0dGVyKGVuZCk7XG4gICAgICB9XG4gICAgICBkZWZhdWx0OiAvLyBubyBmb3JtYXR0aW5nIHJlcXVpcmVkXG4gICAgICAgIHJldHVybiBvcmlnaW5hbFZhbHVlO1xuICAgIH1cbiAgfVxufVxuIl19