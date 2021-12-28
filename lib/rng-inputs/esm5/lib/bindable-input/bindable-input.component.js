/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Component, Input, Optional, Self } from '@angular/core';
import { BindableComponent } from '../bindable/bindable.component';
import { NgControl } from '@angular/forms';
var BindableInputComponent = /** @class */ (function (_super) {
    tslib_1.__extends(BindableInputComponent, _super);
    function BindableInputComponent(ngControl) {
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
    Object.defineProperty(BindableInputComponent.prototype, "password", {
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
    Object.defineProperty(BindableInputComponent.prototype, "mask", {
        get: /**
         * @return {?}
         */
        function () {
            return this.inputMask;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this.inputMask = value || '';
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?} value
     * @return {?}
     */
    BindableInputComponent.prototype.valueTypeSetter = /**
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
    BindableInputComponent.prototype.valueGetter = /**
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
    BindableInputComponent.decorators = [
        { type: Component, args: [{
                    selector: 'rng-bindable-input',
                    template: "<mat-form-field [ngClass]=\"fieldCSS\"\n  [appearance]=\"appearance\"\n  color=\"accent\">\n  <mat-label>{{label}}</mat-label>\n  <!-- value has input mask (currency) -->\n  <input\n    matInput\n    [placeholder]=\"placeholder\"\n    [type]=\"inputType\"\n    [prefix]=\"inputPrefix\"\n    [mask]=\"inputMask\"\n    [showMaskTyped]=\"false\"\n    [dropSpecialCharacters]=\"inputDropSpecialCharacters\"\n    [formControl]=\"valueControl\"\n    [errorStateMatcher]=\"matcher\"\n    (blur)=\"onTouch()\">\n  <!-- value type is Password-->\n  <i *ngIf=\"passwordField\" \n    matSuffix\n    (click)=\"password = !password\"\n    class=\"pass-btn rng-icon {{password ? 'rng-icon-visibility_off' : 'rng-icon-visibility'}}\"></i>\n  <mat-error *ngIf=\"valueControl.invalid\">{{getErrorMessage()}}</mat-error>\n</mat-form-field>"
                }] }
    ];
    /** @nocollapse */
    BindableInputComponent.ctorParameters = function () { return [
        { type: NgControl, decorators: [{ type: Optional }, { type: Self }] }
    ]; };
    BindableInputComponent.propDecorators = {
        password: [{ type: Input }],
        mask: [{ type: Input }]
    };
    return BindableInputComponent;
}(BindableComponent));
export { BindableInputComponent };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmluZGFibGUtaW5wdXQuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHJuZy9pbnB1dHMvIiwic291cmNlcyI6WyJsaWIvYmluZGFibGUtaW5wdXQvYmluZGFibGUtaW5wdXQuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNqRSxPQUFPLEVBQUUsaUJBQWlCLEVBQWMsTUFBTSxnQ0FBZ0MsQ0FBQztBQUMvRSxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFFM0M7SUFLNEMsa0RBQWlCO0lBdUIzRCxnQ0FBdUMsU0FBb0I7UUFBM0QsWUFDRSxrQkFBTSxTQUFTLENBQUMsU0FDakI7UUFGc0MsZUFBUyxHQUFULFNBQVMsQ0FBVztRQXRCM0QsZUFBUyxHQUFrQixNQUFNLENBQUM7UUFDbEMsaUJBQVcsR0FBa0IsRUFBRSxDQUFDO1FBQ2hDLGVBQVMsR0FBa0IsRUFBRSxDQUFDO1FBQzlCLGdDQUEwQixHQUFtQixJQUFJLENBQUM7UUFDbEQsbUJBQWEsR0FBbUIsS0FBSyxDQUFDO1FBQ3RDLHFCQUFlLEdBQW1CLEtBQUssQ0FBQzs7SUFtQnhDLENBQUM7SUFqQkQsc0JBQ00sNENBQVE7Ozs7UUFEZDtZQUVJLE9BQU8sSUFBSSxDQUFDLFNBQVMsS0FBSyxVQUFVLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDO1FBQ3RELENBQUM7Ozs7O1FBQ0QsVUFBYSxLQUFjO1lBQ3pCLElBQUksQ0FBQyxTQUFTLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQztRQUMvQyxDQUFDOzs7T0FIQTtJQUlILHNCQUNJLHdDQUFJOzs7O1FBRFI7WUFFRSxPQUFPLElBQUksQ0FBQyxTQUFTLENBQUM7UUFDeEIsQ0FBQzs7Ozs7UUFDRCxVQUFTLEtBQWE7WUFDcEIsSUFBSSxDQUFDLFNBQVMsR0FBRyxLQUFLLElBQUksRUFBRSxDQUFDO1FBQy9CLENBQUM7OztPQUhBOzs7OztJQVNELGdEQUFlOzs7O0lBQWYsVUFBZ0IsS0FBaUI7OztZQUV6QixRQUFRLEdBQVksQ0FBQyxLQUFLLDhCQUF3QixDQUFDO1FBQ3pELElBQUksQ0FBQyxXQUFXLEdBQUcsUUFBUSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztRQUN4QyxJQUFJLENBQUMsU0FBUyxHQUFHLFFBQVEsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7UUFDekMsSUFBSSxDQUFDLDBCQUEwQixHQUFHLENBQUMsUUFBUSxDQUFDO1FBRTVDLGlCQUFpQjtRQUNqQixJQUFJLENBQUMsYUFBYSxHQUFHLENBQUMsS0FBSyw4QkFBd0IsQ0FBQyxDQUFDO1FBQ3JELElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDLGdCQUFnQjtRQUVwRCxtQkFBbUI7UUFDbkIsSUFBSSxDQUFDLGVBQWUsR0FBRyxDQUFDLEtBQUssc0JBQW9CLENBQUMsQ0FBQztRQUVuRCxpQkFBTSxlQUFlLFlBQUMsS0FBSyxDQUFDLENBQUM7SUFDL0IsQ0FBQzs7OztJQUVELDRDQUFXOzs7SUFBWDs7WUFDUSxhQUFhLEdBQUcsaUJBQU0sV0FBVyxXQUFFO1FBRXpDLElBQUksQ0FBQyxhQUFhLEVBQUU7WUFBRSxPQUFPLGFBQWEsQ0FBQztTQUFFLENBQUMsK0JBQStCO1FBRTdFLFFBQVEsSUFBSSxDQUFDLFNBQVMsRUFBRTtZQUN0QixzQkFBb0IsQ0FBQyxDQUFDO2dCQUNwQixPQUFPLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxhQUFhLENBQUMsQ0FBQzthQUM3QztZQUNELDhCQUF3QixDQUFDLENBQUM7O29CQUNsQixLQUFLLEdBQUcsYUFBYSxDQUFDLEtBQUs7O29CQUMzQixHQUFHLEdBQUcsYUFBYSxDQUFDLEdBQUc7Z0JBQzdCLE9BQU8sSUFBSSxDQUFDLGdCQUFnQixDQUFDLEtBQUssQ0FBQyxHQUFHLEtBQUssR0FBRyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsR0FBRyxDQUFDLENBQUM7YUFDMUU7WUFDRCxTQUFTLHlCQUF5QjtnQkFDaEMsT0FBTyxhQUFhLENBQUM7U0FDeEI7SUFDSCxDQUFDOztnQkFsRUYsU0FBUyxTQUFDO29CQUNULFFBQVEsRUFBRSxvQkFBb0I7b0JBQzlCLGkwQkFBOEM7aUJBRS9DOzs7O2dCQU5RLFNBQVMsdUJBOEJILFFBQVEsWUFBSSxJQUFJOzs7MkJBZjVCLEtBQUs7dUJBT0wsS0FBSzs7SUErQ1IsNkJBQUM7Q0FBQSxBQW5FRCxDQUs0QyxpQkFBaUIsR0E4RDVEO1NBOURZLHNCQUFzQjs7O0lBQ2pDLDJDQUFrQzs7SUFDbEMsNkNBQWdDOztJQUNoQywyQ0FBOEI7O0lBQzlCLDREQUFrRDs7SUFDbEQsK0NBQXNDOztJQUN0QyxpREFBd0M7O0lBaUI1QiwyQ0FBK0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0LCBPcHRpb25hbCwgU2VsZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQmluZGFibGVDb21wb25lbnQsIFZBTFVFX1RZUEUgfSBmcm9tICcuLi9iaW5kYWJsZS9iaW5kYWJsZS5jb21wb25lbnQnO1xuaW1wb3J0IHsgTmdDb250cm9sIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdybmctYmluZGFibGUtaW5wdXQnLFxuICB0ZW1wbGF0ZVVybDogJy4vYmluZGFibGUtaW5wdXQuY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFtdXG59KVxuZXhwb3J0IGNsYXNzIEJpbmRhYmxlSW5wdXRDb21wb25lbnQgZXh0ZW5kcyBCaW5kYWJsZUNvbXBvbmVudCB7XG4gIGlucHV0VHlwZTogc3RyaW5nIHwgbnVsbCA9ICd0ZXh0JztcbiAgaW5wdXRQcmVmaXg6IHN0cmluZyB8IG51bGwgPSAnJztcbiAgaW5wdXRNYXNrOiBzdHJpbmcgfCBudWxsID0gJyc7XG4gIGlucHV0RHJvcFNwZWNpYWxDaGFyYWN0ZXJzOiBib29sZWFuIHwgbnVsbCA9IHRydWU7XG4gIHBhc3N3b3JkRmllbGQ6IGJvb2xlYW4gfCBudWxsID0gZmFsc2U7XG4gIGRhdGVwaWNrZXJGaWVsZDogYm9vbGVhbiB8IG51bGwgPSBmYWxzZTtcblxuICBASW5wdXQoKVxuICAgIGdldCBwYXNzd29yZCgpOiBib29sZWFuIHtcbiAgICAgIHJldHVybiB0aGlzLmlucHV0VHlwZSA9PT0gJ3Bhc3N3b3JkJyA/IHRydWUgOiBmYWxzZTtcbiAgICB9XG4gICAgc2V0IHBhc3N3b3JkKHZhbHVlOiBib29sZWFuKSB7XG4gICAgICB0aGlzLmlucHV0VHlwZSA9IHZhbHVlID8gJ3Bhc3N3b3JkJyA6ICd0ZXh0JztcbiAgICB9XG4gIEBJbnB1dCgpXG4gIGdldCBtYXNrKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMuaW5wdXRNYXNrO1xuICB9XG4gIHNldCBtYXNrKHZhbHVlOiBzdHJpbmcpIHtcbiAgICB0aGlzLmlucHV0TWFzayA9IHZhbHVlIHx8ICcnO1xuICB9XG5cbiAgY29uc3RydWN0b3IoQE9wdGlvbmFsKCkgQFNlbGYoKSBwdWJsaWMgbmdDb250cm9sOiBOZ0NvbnRyb2wpIHtcbiAgICBzdXBlcihuZ0NvbnRyb2wpO1xuICB9XG5cbiAgdmFsdWVUeXBlU2V0dGVyKHZhbHVlOiBWQUxVRV9UWVBFKSB7XG4gICAgLy8gY3VycmVuY3kgZmllbGRcbiAgICBjb25zdCBjdXJyZW5jeTogYm9vbGVhbiA9ICh2YWx1ZSA9PT0gVkFMVUVfVFlQRS5DVVJSRU5DWSk7XG4gICAgdGhpcy5pbnB1dFByZWZpeCA9IGN1cnJlbmN5ID8gJyQgJyA6ICcnO1xuICAgIHRoaXMuaW5wdXRNYXNrID0gY3VycmVuY3kgPyAnMCouMDAnIDogJyc7XG4gICAgdGhpcy5pbnB1dERyb3BTcGVjaWFsQ2hhcmFjdGVycyA9ICFjdXJyZW5jeTtcblxuICAgIC8vIHBhc3N3b3JkIGZpZWxkXG4gICAgdGhpcy5wYXNzd29yZEZpZWxkID0gKHZhbHVlID09PSBWQUxVRV9UWVBFLlBBU1NXT1JEKTtcbiAgICB0aGlzLnBhc3N3b3JkID0gdGhpcy5wYXNzd29yZEZpZWxkOyAvLyBpbml0aWFsIHZhbHVlXG5cbiAgICAvLyBkYXRlcGlja2VyIGZpZWxkXG4gICAgdGhpcy5kYXRlcGlja2VyRmllbGQgPSAodmFsdWUgPT09IFZBTFVFX1RZUEUuREFURSk7XG5cbiAgICBzdXBlci52YWx1ZVR5cGVTZXR0ZXIodmFsdWUpO1xuICB9XG5cbiAgdmFsdWVHZXR0ZXIoKSB7XG4gICAgY29uc3Qgb3JpZ2luYWxWYWx1ZSA9IHN1cGVyLnZhbHVlR2V0dGVyKCk7XG5cbiAgICBpZiAoIW9yaWdpbmFsVmFsdWUpIHsgcmV0dXJuIG9yaWdpbmFsVmFsdWU7IH0gLy8gcmV0dXJuIHdpdGhvdXQgbW9kaWZpY2F0aW9uc1xuXG4gICAgc3dpdGNoICh0aGlzLnZhbHVlVHlwZSkge1xuICAgICAgY2FzZSBWQUxVRV9UWVBFLkRBVEU6IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuYXV4RGF0ZUZvcm1hdHRlcihvcmlnaW5hbFZhbHVlKTtcbiAgICAgIH1cbiAgICAgIGNhc2UgVkFMVUVfVFlQRS5EVVJBVElPTjoge1xuICAgICAgICBjb25zdCBzdGFydCA9IG9yaWdpbmFsVmFsdWUuc3RhcnQ7XG4gICAgICAgIGNvbnN0IGVuZCA9IG9yaWdpbmFsVmFsdWUuZW5kO1xuICAgICAgICByZXR1cm4gdGhpcy5hdXhEYXRlRm9ybWF0dGVyKHN0YXJ0KSArICcgLSAnICsgdGhpcy5hdXhEYXRlRm9ybWF0dGVyKGVuZCk7XG4gICAgICB9XG4gICAgICBkZWZhdWx0OiAvLyBubyBmb3JtYXR0aW5nIHJlcXVpcmVkXG4gICAgICAgIHJldHVybiBvcmlnaW5hbFZhbHVlO1xuICAgIH1cbiAgfVxufVxuIl19