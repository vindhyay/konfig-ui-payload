/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input, Optional, Self } from '@angular/core';
import { formatCurrency, formatDate } from '@angular/common';
import { FormControl, NgControl } from '@angular/forms';
import { Subject, Subscription } from 'rxjs';
/** @type {?} */
const DEFAULT_APPEARANCE = 'fill';
/** @enum {string} */
const VALUE_TYPE = {
    CURRENCY: 'currency',
    DATE: 'date',
    DURATION: 'duration',
    PASSWORD: 'password',
    DEFAULT: 'default',
};
export { VALUE_TYPE };
/**
 * Error when invalid control is dirty, touched, or submitted.
 */
export class RngErrorStateMatcher {
    /**
     * @param {?} control
     * @param {?} form
     * @return {?}
     */
    isErrorState(control, form) {
        /** @type {?} */
        const isSubmitted = form && form.submitted;
        return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
    }
}
export class BindableComponent {
    /**
     * @param {?} ngControl
     */
    constructor(ngControl) {
        this.ngControl = ngControl;
        // to format output
        this.subscription = new Subscription();
        // host's hook to track local touches
        this.valueControl = new FormControl();
        this.stateChanges = new Subject(); // this will mostly be used with custom controls for material inputs
        // this will mostly be used with custom controls for material inputs
        this.matcher = new RngErrorStateMatcher();
        this.placeholder = '';
        this.errorMessages = {
            required: 'Field is required',
            email: 'Email is invalid',
            pattern: 'Incorrect value',
            maxlength: 'Value is too long',
            minlength: 'Value is too short',
        };
        this.disabledInput = false;
        this.onChange = (/**
         * @param {?} val
         * @return {?}
         */
        (val) => {
            this.value = val;
        });
        this.onTouch = (/**
         * @return {?}
         */
        () => {
            this.onLocalTouch();
        });
        if (this.ngControl != null) {
            this.ngControl.valueAccessor = this;
        }
    }
    /**
     * @return {?}
     */
    get appearance() {
        return this.localappearance ? this.localappearance : DEFAULT_APPEARANCE;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set appearance(value) {
        this.localappearance = value;
    }
    /**
     * @return {?}
     */
    get valueType() {
        return this.valType;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set valueType(value) {
        this.valueTypeSetter(value);
    }
    /**
     * @return {?}
     */
    get value() {
        return this.valueGetter();
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set value(value) {
        this.valueSetter(value);
    }
    /**
     * @return {?}
     */
    get readonly() {
        return this.localReadonly;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set readonly(value) {
        this.localReadonly = value !== undefined && value !== false ? true : false;
    }
    /**
     * @return {?}
     */
    get floatLabel() {
        return this.label && this.label.length ? 'auto' : 'never';
    }
    /**
     * @return {?}
     */
    get fieldCSS() {
        return this.fieldCSSGetter();
    }
    /**
     * @protected
     * @return {?}
     */
    fieldCSSGetter() {
        /** @type {?} */
        const css = ['full-width'];
        if (this.readonly) {
            css.push('readonly');
        }
        if (this.disabledInput) {
            css.push('disabledInput');
        }
        return css;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        // TODO: add common validators or some other logic to simplify or deserialise validators, etc.
        if (this.ngControl && this.valueControl) {
            this.valueControl.setValidators(this.ngControl.control.validator);
            this.valueControl.setAsyncValidators(this.ngControl.control.asyncValidator);
            this.valueControl.setValue(this.valueConverter(this.ngControl.value));
            this.valueControl.updateValueAndValidity();
            this.subscription.add(this.valueControl.valueChanges.subscribe(this.onChange));
        }
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.stateChanges.complete();
    }
    /**
     * @protected
     * @return {?}
     */
    valueGetter() {
        return this.valueControl.value;
    }
    /**
     * @protected
     * @param {?} val
     * @return {?}
     */
    valueSetter(val) {
        this.onLocalChange(val);
        this.onLocalTouch();
        this.stateChanges.next();
    }
    /**
     * @protected
     * @param {?} value
     * @return {?}
     */
    valueTypeSetter(value) {
        this.valType = value;
    }
    /**
     * @protected
     * @param {?} val
     * @return {?}
     */
    valueConverter(val) {
        return val;
    }
    /**
     * @param {?} date
     * @return {?}
     */
    auxDateFormatter(date) {
        return formatDate(date, 'dd MMM yyyy', 'en_US');
    }
    /**
     * @param {?} amount
     * @return {?}
     */
    auxCurrencyFormatter(amount) {
        return formatCurrency(amount, 'en_US', '$', '1.2-2');
    }
    /**
     * @return {?}
     */
    getErrorMessage() {
        /** @type {?} */
        const errors = this.valueControl.errors;
        /** @type {?} */
        const keys = (/** @type {?} */ (Object.keys(errors)));
        return !errors ? null :
            this.valueControl.hasError('required') ? this.errorMessages.required :
                this.valueControl.hasError('email') ? this.errorMessages.email :
                    this.valueControl.hasError('maxlength') ? this.errorMessages.maxlength :
                        this.valueControl.hasError('minlength') ? this.errorMessages.minlength :
                            this.valueControl.hasError('pattern') ? this.errorMessages.pattern :
                                errors[keys[0]].message;
    }
    // control value accessor interface implementation:
    /**
     * @param {?} val
     * @return {?}
     */
    writeValue(val) {
        this.valueControl.setValue(this.valueConverter(val)); // initial value or model updates for the view
    }
    /**
     * @param {?} fn
     * @return {?}
     */
    registerOnChange(fn) {
        this.onLocalChange = fn;
    }
    /**
     * @param {?} fn
     * @return {?}
     */
    registerOnTouched(fn) {
        this.onLocalTouch = fn;
    }
    /**
     * @param {?} isDisabled
     * @return {?}
     */
    setDisabledState(isDisabled) {
        if (isDisabled) {
            this.valueControl.disable();
        }
        else {
            this.valueControl.enable();
        }
    }
}
BindableComponent.decorators = [
    { type: Component, args: [{
                selector: 'rng-bindable',
                template: 'NO BASE TEMPLATE'
            }] }
];
/** @nocollapse */
BindableComponent.ctorParameters = () => [
    { type: NgControl, decorators: [{ type: Optional }, { type: Self }] }
];
BindableComponent.propDecorators = {
    label: [{ type: Input }],
    placeholder: [{ type: Input }],
    errorMessages: [{ type: Input }],
    appearance: [{ type: Input }],
    valueType: [{ type: Input }],
    value: [{ type: Input }],
    readonly: [{ type: Input }],
    disabledInput: [{ type: Input }]
};
if (false) {
    /**
     * @type {?}
     * @private
     */
    BindableComponent.prototype.localappearance;
    /**
     * @type {?}
     * @private
     */
    BindableComponent.prototype.localReadonly;
    /**
     * @type {?}
     * @private
     */
    BindableComponent.prototype.valType;
    /**
     * @type {?}
     * @protected
     */
    BindableComponent.prototype.subscription;
    /**
     * @type {?}
     * @private
     */
    BindableComponent.prototype.onLocalChange;
    /**
     * @type {?}
     * @private
     */
    BindableComponent.prototype.onLocalTouch;
    /** @type {?} */
    BindableComponent.prototype.valueControl;
    /** @type {?} */
    BindableComponent.prototype.stateChanges;
    /** @type {?} */
    BindableComponent.prototype.matcher;
    /** @type {?} */
    BindableComponent.prototype.label;
    /** @type {?} */
    BindableComponent.prototype.placeholder;
    /** @type {?} */
    BindableComponent.prototype.errorMessages;
    /** @type {?} */
    BindableComponent.prototype.disabledInput;
    /** @type {?} */
    BindableComponent.prototype.onChange;
    /** @type {?} */
    BindableComponent.prototype.onTouch;
    /** @type {?} */
    BindableComponent.prototype.ngControl;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmluZGFibGUuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHJuZy9pbnB1dHMvIiwic291cmNlcyI6WyJsaWIvYmluZGFibGUvYmluZGFibGUuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFxQixNQUFNLGVBQWUsQ0FBQztBQUNwRixPQUFPLEVBQUUsY0FBYyxFQUFFLFVBQVUsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQzdELE9BQU8sRUFBRSxXQUFXLEVBQUUsU0FBUyxFQUFvRCxNQUFNLGdCQUFnQixDQUFDO0FBQzFHLE9BQU8sRUFBRSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sTUFBTSxDQUFDOztNQUd2QyxrQkFBa0IsR0FBRyxNQUFNOzs7SUFHL0IsVUFBVyxVQUFVO0lBQ3JCLE1BQU8sTUFBTTtJQUNiLFVBQVcsVUFBVTtJQUNyQixVQUFXLFVBQVU7SUFDckIsU0FBVSxTQUFTOzs7Ozs7QUFJckIsTUFBTSxPQUFPLG9CQUFvQjs7Ozs7O0lBQy9CLFlBQVksQ0FBQyxPQUEyQixFQUFFLElBQXdDOztjQUMxRSxXQUFXLEdBQUcsSUFBSSxJQUFJLElBQUksQ0FBQyxTQUFTO1FBQzFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsT0FBTyxJQUFJLE9BQU8sQ0FBQyxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxJQUFJLE9BQU8sQ0FBQyxPQUFPLElBQUksV0FBVyxDQUFDLENBQUMsQ0FBQztJQUM3RixDQUFDO0NBQ0Y7QUFPRCxNQUFNLE9BQU8saUJBQWlCOzs7O0lBa0Y1QixZQUF1QyxTQUFvQjtRQUFwQixjQUFTLEdBQVQsU0FBUyxDQUFXOztRQTNFakQsaUJBQVksR0FBRyxJQUFJLFlBQVksRUFBRSxDQUFDOztRQUlyQyxpQkFBWSxHQUFHLElBQUksV0FBVyxFQUFFLENBQUM7UUFDakMsaUJBQVksR0FBRyxJQUFJLE9BQU8sRUFBUSxDQUFDLENBQUMsb0VBQW9FOztRQUV4RyxZQUFPLEdBQUcsSUFBSSxvQkFBb0IsRUFBRSxDQUFDO1FBR25DLGdCQUFXLEdBQWtCLEVBQUUsQ0FBQztRQUNoQyxrQkFBYSxHQUFxQztZQUN6RCxRQUFRLEVBQUUsbUJBQW1CO1lBQzdCLEtBQUssRUFBRSxrQkFBa0I7WUFDekIsT0FBTyxFQUFFLGlCQUFpQjtZQUMxQixTQUFTLEVBQUUsbUJBQW1CO1lBQzlCLFNBQVMsRUFBRSxvQkFBb0I7U0FDaEMsQ0FBQztRQWtDTyxrQkFBYSxHQUFtQixLQUFLLENBQUM7UUFnRC9DLGFBQVE7Ozs7UUFBRyxDQUFDLEdBQVEsRUFBRSxFQUFFO1lBQ3RCLElBQUksQ0FBQyxLQUFLLEdBQUcsR0FBRyxDQUFDO1FBQ25CLENBQUMsRUFBQTtRQUVELFlBQU87OztRQUFHLEdBQUcsRUFBRTtZQUNiLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztRQUN0QixDQUFDLEVBQUE7UUE3QkMsSUFBSSxJQUFJLENBQUMsU0FBUyxJQUFJLElBQUksRUFBRTtZQUMxQixJQUFJLENBQUMsU0FBUyxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUM7U0FDckM7SUFDSCxDQUFDOzs7O0lBNURELElBQ00sVUFBVTtRQUNaLE9BQU8sSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUMsa0JBQWtCLENBQUM7SUFDMUUsQ0FBQzs7Ozs7SUFDRCxJQUFJLFVBQVUsQ0FBQyxLQUFhO1FBQzFCLElBQUksQ0FBQyxlQUFlLEdBQUcsS0FBSyxDQUFDO0lBQy9CLENBQUM7Ozs7SUFFSCxJQUNNLFNBQVM7UUFDWCxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUM7SUFDdEIsQ0FBQzs7Ozs7SUFDRCxJQUFJLFNBQVMsQ0FBQyxLQUFhO1FBQ3pCLElBQUksQ0FBQyxlQUFlLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDOUIsQ0FBQzs7OztJQUVILElBQ00sS0FBSztRQUNQLE9BQU8sSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO0lBQzVCLENBQUM7Ozs7O0lBQ0QsSUFBSSxLQUFLLENBQUMsS0FBVTtRQUNsQixJQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQzFCLENBQUM7Ozs7SUFFSCxJQUNNLFFBQVE7UUFDVixPQUFPLElBQUksQ0FBQyxhQUFhLENBQUM7SUFDNUIsQ0FBQzs7Ozs7SUFDRCxJQUFJLFFBQVEsQ0FBQyxLQUFjO1FBQ3pCLElBQUksQ0FBQyxhQUFhLEdBQUcsS0FBSyxLQUFLLFNBQVMsSUFBSSxLQUFLLEtBQUssS0FBSyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQztJQUM3RSxDQUFDOzs7O0lBSUgsSUFBSSxVQUFVO1FBQ1osT0FBTyxJQUFJLENBQUMsS0FBSyxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQztJQUM1RCxDQUFDOzs7O0lBRUQsSUFBSSxRQUFRO1FBQ1YsT0FBTyxJQUFJLENBQUMsY0FBYyxFQUFFLENBQUM7SUFDL0IsQ0FBQzs7Ozs7SUFFUyxjQUFjOztjQUNoQixHQUFHLEdBQUcsQ0FBQyxZQUFZLENBQUM7UUFFMUIsSUFBSSxJQUFJLENBQUMsUUFBUSxFQUFFO1lBQ2pCLEdBQUcsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7U0FDdEI7UUFFRCxJQUFJLElBQUksQ0FBQyxhQUFhLEVBQUU7WUFDdEIsR0FBRyxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQztTQUMzQjtRQUVELE9BQU8sR0FBRyxDQUFDO0lBQ2IsQ0FBQzs7OztJQVFELFFBQVE7UUFDTiw4RkFBOEY7UUFDOUYsSUFBSSxJQUFJLENBQUMsU0FBUyxJQUFJLElBQUksQ0FBQyxZQUFZLEVBQUU7WUFDdkMsSUFBSSxDQUFDLFlBQVksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUM7WUFDbEUsSUFBSSxDQUFDLFlBQVksQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxjQUFjLENBQUMsQ0FBQztZQUM1RSxJQUFJLENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztZQUN0RSxJQUFJLENBQUMsWUFBWSxDQUFDLHNCQUFzQixFQUFFLENBQUM7WUFDM0MsSUFBSSxDQUFDLFlBQVksQ0FBQyxHQUFHLENBQ25CLElBQUksQ0FBQyxZQUFZLENBQUMsWUFBWSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQ3hELENBQUM7U0FDSDtJQUNILENBQUM7Ozs7SUFFTSxXQUFXO1FBQ2hCLElBQUksQ0FBQyxZQUFZLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDaEMsSUFBSSxDQUFDLFlBQVksQ0FBQyxRQUFRLEVBQUUsQ0FBQztJQUMvQixDQUFDOzs7OztJQVVTLFdBQVc7UUFDbkIsT0FBTyxJQUFJLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQztJQUNqQyxDQUFDOzs7Ozs7SUFFUyxXQUFXLENBQUMsR0FBUTtRQUM1QixJQUFJLENBQUMsYUFBYSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ3hCLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztRQUNwQixJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksRUFBRSxDQUFDO0lBQzNCLENBQUM7Ozs7OztJQUVTLGVBQWUsQ0FBQyxLQUFhO1FBQ3JDLElBQUksQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDO0lBQ3ZCLENBQUM7Ozs7OztJQUVTLGNBQWMsQ0FBQyxHQUFRO1FBQy9CLE9BQU8sR0FBRyxDQUFDO0lBQ2IsQ0FBQzs7Ozs7SUFFTSxnQkFBZ0IsQ0FBQyxJQUFVO1FBQ2hDLE9BQU8sVUFBVSxDQUNmLElBQUksRUFDSixhQUFhLEVBQ2IsT0FBTyxDQUNSLENBQUM7SUFDSixDQUFDOzs7OztJQUVNLG9CQUFvQixDQUFDLE1BQWM7UUFDeEMsT0FBTyxjQUFjLENBQ25CLE1BQU0sRUFDTixPQUFPLEVBQ1AsR0FBRyxFQUNILE9BQU8sQ0FDUixDQUFDO0lBQ0osQ0FBQzs7OztJQUVELGVBQWU7O2NBQ1AsTUFBTSxHQUEwRSxJQUFJLENBQUMsWUFBWSxDQUFDLE1BQU07O2NBQ3hHLElBQUksR0FBRyxtQkFBQSxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxFQUFjO1FBQzlDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ3JCLElBQUksQ0FBQyxZQUFZLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQyxDQUFDO2dCQUN0RSxJQUFJLENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQztvQkFDaEUsSUFBSSxDQUFDLFlBQVksQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsU0FBUyxDQUFDLENBQUM7d0JBQ3hFLElBQUksQ0FBQyxZQUFZLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLFNBQVMsQ0FBQyxDQUFDOzRCQUN4RSxJQUFJLENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsQ0FBQztnQ0FDcEUsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQztJQUM1QixDQUFDOzs7Ozs7SUFHTSxVQUFVLENBQUMsR0FBZTtRQUMvQixJQUFJLENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyw4Q0FBOEM7SUFDdEcsQ0FBQzs7Ozs7SUFFTSxnQkFBZ0IsQ0FBQyxFQUFPO1FBQzdCLElBQUksQ0FBQyxhQUFhLEdBQUcsRUFBRSxDQUFDO0lBQzFCLENBQUM7Ozs7O0lBRU0saUJBQWlCLENBQUMsRUFBTztRQUM5QixJQUFJLENBQUMsWUFBWSxHQUFHLEVBQUUsQ0FBQztJQUN6QixDQUFDOzs7OztJQUVNLGdCQUFnQixDQUFDLFVBQW1CO1FBQ3pDLElBQUksVUFBVSxFQUFFO1lBQ2QsSUFBSSxDQUFDLFlBQVksQ0FBQyxPQUFPLEVBQUUsQ0FBQztTQUM3QjthQUFNO1lBQ0wsSUFBSSxDQUFDLFlBQVksQ0FBQyxNQUFNLEVBQUUsQ0FBQztTQUM1QjtJQUNILENBQUM7OztZQXpMRixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLGNBQWM7Z0JBQ3hCLFFBQVEsRUFBRSxrQkFBa0I7YUFFN0I7Ozs7WUExQnFCLFNBQVMsdUJBNkdoQixRQUFRLFlBQUksSUFBSTs7O29CQWxFNUIsS0FBSzswQkFDTCxLQUFLOzRCQUNMLEtBQUs7eUJBUUwsS0FBSzt3QkFRTCxLQUFLO29CQVFMLEtBQUs7dUJBUUwsS0FBSzs0QkFRTCxLQUFLOzs7Ozs7O0lBeEROLDRDQUF1Qzs7Ozs7SUFDdkMsMENBQStCOzs7OztJQUMvQixvQ0FBd0I7Ozs7O0lBR3hCLHlDQUE0Qzs7Ozs7SUFDNUMsMENBQTBDOzs7OztJQUMxQyx5Q0FBaUM7O0lBRWpDLHlDQUF3Qzs7SUFDeEMseUNBQTBDOztJQUUxQyxvQ0FBNEM7O0lBRTVDLGtDQUF1Qjs7SUFDdkIsd0NBQXlDOztJQUN6QywwQ0FNRTs7SUFrQ0YsMENBQStDOztJQWdEL0MscUNBRUM7O0lBRUQsb0NBRUM7O0lBOUJXLHNDQUErQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQsIE9wdGlvbmFsLCBTZWxmLCBPbkluaXQsIE9uRGVzdHJveSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgZm9ybWF0Q3VycmVuY3ksIGZvcm1hdERhdGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgRm9ybUNvbnRyb2wsIE5nQ29udHJvbCwgQ29udHJvbFZhbHVlQWNjZXNzb3IsIEZvcm1Hcm91cERpcmVjdGl2ZSwgTmdGb3JtIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgU3ViamVjdCwgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBFcnJvclN0YXRlTWF0Y2hlciB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsJztcblxuY29uc3QgREVGQVVMVF9BUFBFQVJBTkNFID0gJ2ZpbGwnO1xuXG5leHBvcnQgY29uc3QgZW51bSBWQUxVRV9UWVBFIHtcbiAgQ1VSUkVOQ1kgPSAnY3VycmVuY3knLFxuICBEQVRFID0gJ2RhdGUnLFxuICBEVVJBVElPTiA9ICdkdXJhdGlvbicsXG4gIFBBU1NXT1JEID0gJ3Bhc3N3b3JkJyxcbiAgREVGQVVMVCA9ICdkZWZhdWx0J1xufVxuXG4vKiogRXJyb3Igd2hlbiBpbnZhbGlkIGNvbnRyb2wgaXMgZGlydHksIHRvdWNoZWQsIG9yIHN1Ym1pdHRlZC4gKi9cbmV4cG9ydCBjbGFzcyBSbmdFcnJvclN0YXRlTWF0Y2hlciBpbXBsZW1lbnRzIEVycm9yU3RhdGVNYXRjaGVyIHtcbiAgaXNFcnJvclN0YXRlKGNvbnRyb2w6IEZvcm1Db250cm9sIHwgbnVsbCwgZm9ybTogRm9ybUdyb3VwRGlyZWN0aXZlIHwgTmdGb3JtIHwgbnVsbCk6IGJvb2xlYW4ge1xuICAgIGNvbnN0IGlzU3VibWl0dGVkID0gZm9ybSAmJiBmb3JtLnN1Ym1pdHRlZDtcbiAgICByZXR1cm4gISEoY29udHJvbCAmJiBjb250cm9sLmludmFsaWQgJiYgKGNvbnRyb2wuZGlydHkgfHwgY29udHJvbC50b3VjaGVkIHx8IGlzU3VibWl0dGVkKSk7XG4gIH1cbn1cblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAncm5nLWJpbmRhYmxlJyxcbiAgdGVtcGxhdGU6ICdOTyBCQVNFIFRFTVBMQVRFJyxcbiAgc3R5bGVVcmxzOiBbXVxufSlcbmV4cG9ydCBjbGFzcyBCaW5kYWJsZUNvbXBvbmVudCBpbXBsZW1lbnRzIENvbnRyb2xWYWx1ZUFjY2Vzc29yLCBPbkluaXQsIE9uRGVzdHJveSB7XG5cbiAgcHJpdmF0ZSBsb2NhbGFwcGVhcmFuY2U6IHN0cmluZyB8IG51bGw7XG4gIHByaXZhdGUgbG9jYWxSZWFkb25seTogYm9vbGVhbjtcbiAgcHJpdmF0ZSB2YWxUeXBlOiBzdHJpbmc7IC8vIHRvIGZvcm1hdCBvdXRwdXRcblxuXG4gIHByb3RlY3RlZCBzdWJzY3JpcHRpb24gPSBuZXcgU3Vic2NyaXB0aW9uKCk7XG4gIHByaXZhdGUgb25Mb2NhbENoYW5nZTogKHZhbDogYW55KSA9PiB2b2lkOyAvLyBob3N0J3MgaG9vayB0byB0cmFjayBsb2NhbCBjaGFuZ2VzXG4gIHByaXZhdGUgb25Mb2NhbFRvdWNoOiAoKSA9PiB2b2lkOyAvLyBob3N0J3MgaG9vayB0byB0cmFjayBsb2NhbCB0b3VjaGVzXG5cbiAgcHVibGljIHZhbHVlQ29udHJvbCA9IG5ldyBGb3JtQ29udHJvbCgpO1xuICBwdWJsaWMgc3RhdGVDaGFuZ2VzID0gbmV3IFN1YmplY3Q8dm9pZD4oKTsgLy8gdGhpcyB3aWxsIG1vc3RseSBiZSB1c2VkIHdpdGggY3VzdG9tIGNvbnRyb2xzIGZvciBtYXRlcmlhbCBpbnB1dHNcblxuICBwdWJsaWMgbWF0Y2hlciA9IG5ldyBSbmdFcnJvclN0YXRlTWF0Y2hlcigpO1xuXG4gIEBJbnB1dCgpIGxhYmVsOiBzdHJpbmc7XG4gIEBJbnB1dCgpIHBsYWNlaG9sZGVyOiBzdHJpbmcgfCBudWxsID0gJyc7XG4gIEBJbnB1dCgpIGVycm9yTWVzc2FnZXM6IHsgW2tleTogc3RyaW5nXTogc3RyaW5nIH0gfCBudWxsID0ge1xuICAgIHJlcXVpcmVkOiAnRmllbGQgaXMgcmVxdWlyZWQnLFxuICAgIGVtYWlsOiAnRW1haWwgaXMgaW52YWxpZCcsXG4gICAgcGF0dGVybjogJ0luY29ycmVjdCB2YWx1ZScsXG4gICAgbWF4bGVuZ3RoOiAnVmFsdWUgaXMgdG9vIGxvbmcnLFxuICAgIG1pbmxlbmd0aDogJ1ZhbHVlIGlzIHRvbyBzaG9ydCcsXG4gIH07XG5cbiAgQElucHV0KClcbiAgICBnZXQgYXBwZWFyYW5jZSgpOiBzdHJpbmcge1xuICAgICAgcmV0dXJuIHRoaXMubG9jYWxhcHBlYXJhbmNlID8gdGhpcy5sb2NhbGFwcGVhcmFuY2UgOiBERUZBVUxUX0FQUEVBUkFOQ0U7XG4gICAgfVxuICAgIHNldCBhcHBlYXJhbmNlKHZhbHVlOiBzdHJpbmcpIHtcbiAgICAgIHRoaXMubG9jYWxhcHBlYXJhbmNlID0gdmFsdWU7XG4gICAgfVxuXG4gIEBJbnB1dCgpXG4gICAgZ2V0IHZhbHVlVHlwZSgpOiBzdHJpbmcge1xuICAgICAgcmV0dXJuIHRoaXMudmFsVHlwZTtcbiAgICB9XG4gICAgc2V0IHZhbHVlVHlwZSh2YWx1ZTogc3RyaW5nKSB7XG4gICAgICB0aGlzLnZhbHVlVHlwZVNldHRlcih2YWx1ZSk7XG4gICAgfVxuXG4gIEBJbnB1dCgpXG4gICAgZ2V0IHZhbHVlKCk6IGFueSB7XG4gICAgICByZXR1cm4gdGhpcy52YWx1ZUdldHRlcigpO1xuICAgIH1cbiAgICBzZXQgdmFsdWUodmFsdWU6IGFueSkge1xuICAgICAgdGhpcy52YWx1ZVNldHRlcih2YWx1ZSk7XG4gICAgfVxuXG4gIEBJbnB1dCgpXG4gICAgZ2V0IHJlYWRvbmx5KCk6IGJvb2xlYW4ge1xuICAgICAgcmV0dXJuIHRoaXMubG9jYWxSZWFkb25seTtcbiAgICB9XG4gICAgc2V0IHJlYWRvbmx5KHZhbHVlOiBib29sZWFuKSB7XG4gICAgICB0aGlzLmxvY2FsUmVhZG9ubHkgPSB2YWx1ZSAhPT0gdW5kZWZpbmVkICYmIHZhbHVlICE9PSBmYWxzZSA/IHRydWUgOiBmYWxzZTtcbiAgICB9XG5cbiAgQElucHV0KCkgZGlzYWJsZWRJbnB1dDogYm9vbGVhbiB8IG51bGwgPSBmYWxzZTtcblxuICBnZXQgZmxvYXRMYWJlbCgpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLmxhYmVsICYmIHRoaXMubGFiZWwubGVuZ3RoID8gJ2F1dG8nIDogJ25ldmVyJztcbiAgfVxuXG4gIGdldCBmaWVsZENTUygpOiBzdHJpbmdbXSB7XG4gICAgcmV0dXJuIHRoaXMuZmllbGRDU1NHZXR0ZXIoKTtcbiAgfVxuXG4gIHByb3RlY3RlZCBmaWVsZENTU0dldHRlcigpIHtcbiAgICBjb25zdCBjc3MgPSBbJ2Z1bGwtd2lkdGgnXTtcblxuICAgIGlmICh0aGlzLnJlYWRvbmx5KSB7XG4gICAgICBjc3MucHVzaCgncmVhZG9ubHknKTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5kaXNhYmxlZElucHV0KSB7XG4gICAgICBjc3MucHVzaCgnZGlzYWJsZWRJbnB1dCcpO1xuICAgIH1cblxuICAgIHJldHVybiBjc3M7XG4gIH1cblxuICBjb25zdHJ1Y3RvcihAT3B0aW9uYWwoKSBAU2VsZigpIHB1YmxpYyBuZ0NvbnRyb2w6IE5nQ29udHJvbCkge1xuICAgIGlmICh0aGlzLm5nQ29udHJvbCAhPSBudWxsKSB7XG4gICAgICB0aGlzLm5nQ29udHJvbC52YWx1ZUFjY2Vzc29yID0gdGhpcztcbiAgICB9XG4gIH1cblxuICBuZ09uSW5pdCgpIHtcbiAgICAvLyBUT0RPOiBhZGQgY29tbW9uIHZhbGlkYXRvcnMgb3Igc29tZSBvdGhlciBsb2dpYyB0byBzaW1wbGlmeSBvciBkZXNlcmlhbGlzZSB2YWxpZGF0b3JzLCBldGMuXG4gICAgaWYgKHRoaXMubmdDb250cm9sICYmIHRoaXMudmFsdWVDb250cm9sKSB7XG4gICAgICB0aGlzLnZhbHVlQ29udHJvbC5zZXRWYWxpZGF0b3JzKHRoaXMubmdDb250cm9sLmNvbnRyb2wudmFsaWRhdG9yKTtcbiAgICAgIHRoaXMudmFsdWVDb250cm9sLnNldEFzeW5jVmFsaWRhdG9ycyh0aGlzLm5nQ29udHJvbC5jb250cm9sLmFzeW5jVmFsaWRhdG9yKTtcbiAgICAgIHRoaXMudmFsdWVDb250cm9sLnNldFZhbHVlKHRoaXMudmFsdWVDb252ZXJ0ZXIodGhpcy5uZ0NvbnRyb2wudmFsdWUpKTtcbiAgICAgIHRoaXMudmFsdWVDb250cm9sLnVwZGF0ZVZhbHVlQW5kVmFsaWRpdHkoKTtcbiAgICAgIHRoaXMuc3Vic2NyaXB0aW9uLmFkZChcbiAgICAgICAgdGhpcy52YWx1ZUNvbnRyb2wudmFsdWVDaGFuZ2VzLnN1YnNjcmliZSh0aGlzLm9uQ2hhbmdlKVxuICAgICAgKTtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgbmdPbkRlc3Ryb3koKSB7XG4gICAgdGhpcy5zdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICB0aGlzLnN0YXRlQ2hhbmdlcy5jb21wbGV0ZSgpO1xuICB9XG5cbiAgb25DaGFuZ2UgPSAodmFsOiBhbnkpID0+IHtcbiAgICB0aGlzLnZhbHVlID0gdmFsO1xuICB9XG5cbiAgb25Ub3VjaCA9ICgpID0+IHtcbiAgICB0aGlzLm9uTG9jYWxUb3VjaCgpO1xuICB9XG5cbiAgcHJvdGVjdGVkIHZhbHVlR2V0dGVyKCkge1xuICAgIHJldHVybiB0aGlzLnZhbHVlQ29udHJvbC52YWx1ZTtcbiAgfVxuXG4gIHByb3RlY3RlZCB2YWx1ZVNldHRlcih2YWw6IGFueSkge1xuICAgIHRoaXMub25Mb2NhbENoYW5nZSh2YWwpO1xuICAgIHRoaXMub25Mb2NhbFRvdWNoKCk7XG4gICAgdGhpcy5zdGF0ZUNoYW5nZXMubmV4dCgpO1xuICB9XG5cbiAgcHJvdGVjdGVkIHZhbHVlVHlwZVNldHRlcih2YWx1ZTogc3RyaW5nKSB7XG4gICAgdGhpcy52YWxUeXBlID0gdmFsdWU7XG4gIH1cblxuICBwcm90ZWN0ZWQgdmFsdWVDb252ZXJ0ZXIodmFsOiBhbnkpOiBhbnkge1xuICAgIHJldHVybiB2YWw7XG4gIH1cblxuICBwdWJsaWMgYXV4RGF0ZUZvcm1hdHRlcihkYXRlOiBEYXRlKTogc3RyaW5nIHtcbiAgICByZXR1cm4gZm9ybWF0RGF0ZShcbiAgICAgIGRhdGUsXG4gICAgICAnZGQgTU1NIHl5eXknLFxuICAgICAgJ2VuX1VTJ1xuICAgICk7XG4gIH1cblxuICBwdWJsaWMgYXV4Q3VycmVuY3lGb3JtYXR0ZXIoYW1vdW50OiBudW1iZXIpOiBzdHJpbmcge1xuICAgIHJldHVybiBmb3JtYXRDdXJyZW5jeShcbiAgICAgIGFtb3VudCxcbiAgICAgICdlbl9VUycsXG4gICAgICAnJCcsXG4gICAgICAnMS4yLTInXG4gICAgKTtcbiAgfVxuXG4gIGdldEVycm9yTWVzc2FnZSgpIHtcbiAgICBjb25zdCBlcnJvcnM6IHsgW2tleTogc3RyaW5nXTogeyBpbnZhbGlkOiBvYmplY3QsIG1lc3NhZ2U/OiBzdHJpbmcgfCBudWxsIH19IHwgbnVsbCA9IHRoaXMudmFsdWVDb250cm9sLmVycm9ycztcbiAgICBjb25zdCBrZXlzID0gT2JqZWN0LmtleXMoZXJyb3JzKSBhcyBBcnJheTxhbnk+O1xuICAgIHJldHVybiAhZXJyb3JzID8gbnVsbCA6XG4gICAgICB0aGlzLnZhbHVlQ29udHJvbC5oYXNFcnJvcigncmVxdWlyZWQnKSA/IHRoaXMuZXJyb3JNZXNzYWdlcy5yZXF1aXJlZCA6XG4gICAgICB0aGlzLnZhbHVlQ29udHJvbC5oYXNFcnJvcignZW1haWwnKSA/IHRoaXMuZXJyb3JNZXNzYWdlcy5lbWFpbCA6XG4gICAgICB0aGlzLnZhbHVlQ29udHJvbC5oYXNFcnJvcignbWF4bGVuZ3RoJykgPyB0aGlzLmVycm9yTWVzc2FnZXMubWF4bGVuZ3RoIDpcbiAgICAgIHRoaXMudmFsdWVDb250cm9sLmhhc0Vycm9yKCdtaW5sZW5ndGgnKSA/IHRoaXMuZXJyb3JNZXNzYWdlcy5taW5sZW5ndGggOlxuICAgICAgdGhpcy52YWx1ZUNvbnRyb2wuaGFzRXJyb3IoJ3BhdHRlcm4nKSA/IHRoaXMuZXJyb3JNZXNzYWdlcy5wYXR0ZXJuIDpcbiAgICAgIGVycm9yc1trZXlzWzBdXS5tZXNzYWdlO1xuICB9XG4gIC8vIGNvbnRyb2wgdmFsdWUgYWNjZXNzb3IgaW50ZXJmYWNlIGltcGxlbWVudGF0aW9uOlxuXG4gIHB1YmxpYyB3cml0ZVZhbHVlKHZhbDogYW55IHwgbnVsbCk6IHZvaWQge1xuICAgIHRoaXMudmFsdWVDb250cm9sLnNldFZhbHVlKHRoaXMudmFsdWVDb252ZXJ0ZXIodmFsKSk7IC8vIGluaXRpYWwgdmFsdWUgb3IgbW9kZWwgdXBkYXRlcyBmb3IgdGhlIHZpZXdcbiAgfVxuXG4gIHB1YmxpYyByZWdpc3Rlck9uQ2hhbmdlKGZuOiBhbnkpOiB2b2lkIHtcbiAgICB0aGlzLm9uTG9jYWxDaGFuZ2UgPSBmbjtcbiAgfVxuXG4gIHB1YmxpYyByZWdpc3Rlck9uVG91Y2hlZChmbjogYW55KTogdm9pZCB7XG4gICAgdGhpcy5vbkxvY2FsVG91Y2ggPSBmbjtcbiAgfVxuXG4gIHB1YmxpYyBzZXREaXNhYmxlZFN0YXRlKGlzRGlzYWJsZWQ6IGJvb2xlYW4pOiB2b2lkIHtcbiAgICBpZiAoaXNEaXNhYmxlZCkge1xuICAgICAgdGhpcy52YWx1ZUNvbnRyb2wuZGlzYWJsZSgpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnZhbHVlQ29udHJvbC5lbmFibGUoKTtcbiAgICB9XG4gIH1cblxuICAvLyBlbmQgb2YgY29udHJvbCB2YWx1ZSBhY2Nlc3NvciBpbnRlcmZhY2UgaW1wbGVtZW50YXRpb25cbn1cbiJdfQ==