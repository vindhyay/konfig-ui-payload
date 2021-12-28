import { NgModule, Component, Optional, Self, Input, ElementRef, HostBinding, EventEmitter, Output, HostListener } from '@angular/core';
import { formatDate, formatCurrency, CommonModule } from '@angular/common';
import { FormControl, NgControl, FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxMaskModule } from 'ngx-mask';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { Subscription, Subject } from 'rxjs';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { FocusMonitor } from '@angular/cdk/a11y';
import { MatFormFieldControl } from '@angular/material/form-field';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { map } from 'rxjs/operators';
import * as momentModule from 'moment';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class MaterialModule {
}
MaterialModule.decorators = [
    { type: NgModule, args: [{
                exports: [
                    MatInputModule,
                    MatButtonModule,
                    MatSelectModule,
                    MatCheckboxModule,
                    MatDatepickerModule,
                    MatAutocompleteModule,
                ]
            },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
const DEFAULT_APPEARANCE = 'fill';
/**
 * Error when invalid control is dirty, touched, or submitted.
 */
class RngErrorStateMatcher {
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
class BindableComponent {
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class BindableInputComponent extends BindableComponent {
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class BindableSelectComponent extends BindableComponent {
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class BindableSelectMultiComponent extends BindableSelectComponent {
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class BindableCheckboxComponent extends BindableComponent {
    /**
     * @param {?} ngControl
     */
    constructor(ngControl) {
        super(ngControl);
        this.ngControl = ngControl;
    }
}
BindableCheckboxComponent.decorators = [
    { type: Component, args: [{
                selector: 'rng-bindable-checkbox',
                template: "<mat-checkbox\n  [formControl]=\"valueControl\"></mat-checkbox>\n<span>{{label}}</span>"
            }] }
];
/** @nocollapse */
BindableCheckboxComponent.ctorParameters = () => [
    { type: NgControl, decorators: [{ type: Optional }, { type: Self }] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class TypeLabelComponent {
    constructor() { }
    /**
     * @param {?} data
     * @return {?}
     */
    set data(data) {
        this.typeData = data;
        this.typeClass = ['rng-type-label', this.data.color, 'badge'];
    }
    /**
     * @return {?}
     */
    get data() {
        return this.typeData;
    }
    /**
     * @return {?}
     */
    ngOnInit() { }
}
TypeLabelComponent.decorators = [
    { type: Component, args: [{
                selector: 'rng-type-label',
                template: "<span [ngClass]=\"typeClass\">{{data.value}}</span>\n"
            }] }
];
/** @nocollapse */
TypeLabelComponent.ctorParameters = () => [];
TypeLabelComponent.propDecorators = {
    data: [{ type: Input }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class ReactiveControlComponent {
    /**
     * @param {?} ngControl
     */
    constructor(ngControl) {
        this.ngControl = ngControl;
        this.valueControl = new FormControl();
        this.stateChanges = new Subject(); // this will mostly be used with custom controls for material inputs
        this.onLocalChange = (/**
         * @param {?} val
         * @return {?}
         */
        (val) => {
            console.log('onLocalChange', val);
            this.value = val;
        });
        this.onChange = (/**
         * @param {?} val
         * @return {?}
         */
        (val) => {
            console.log('onChange', val);
        });
        this.onTouched = (/**
         * @return {?}
         */
        () => {
            console.log('onTouched');
        });
        if (this.ngControl != null) {
            this.ngControl.valueAccessor = this;
            this.valueControl = new FormControl();
        }
    }
    // this will mostly be used with custom controls for material inputs
    /**
     * @return {?}
     */
    get disabled() { return this.valueControl.disabled; }
    /**
     * @param {?} value
     * @return {?}
     */
    set disabled(value) {
        /** @type {?} */
        const disabled = coerceBooleanProperty(value);
        if (disabled) {
            this.valueControl.disable();
        }
        else {
            this.valueControl.enable();
        }
        this.stateChanges.next();
    }
    /**
     * @return {?}
     */
    get value() {
        return this.valueControl.value;
    }
    /**
     * @param {?} val
     * @return {?}
     */
    set value(val) {
        this.onChange(val);
        this.stateChanges.next();
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        console.log('ngOnInit');
        // TODO: add common validators or some other logic to simplify or deserialise validators, etc.
        if (this.ngControl && this.valueControl) {
            console.log('ngOnInit: setting up');
            // TODO: check for existing "default" validators
            this.valueControl.setValidators(this.ngControl.validator);
            this.valueControl.setAsyncValidators(this.ngControl.asyncValidator);
            this.valueControl.setValue(this.ngControl.value);
            this.valueControl.updateValueAndValidity();
            this.subscription =
                this.valueControl.valueChanges.subscribe(this.onLocalChange);
        }
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.stateChanges.complete();
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }
    /**
     * @param {?} val
     * @return {?}
     */
    writeValue(val) {
        this.value = val; // initial value or model updates for the view
    }
    /**
     * @param {?} fn
     * @return {?}
     */
    registerOnChange(fn) {
        this.onChange = fn;
    }
    /**
     * @param {?} fn
     * @return {?}
     */
    registerOnTouched(fn) {
        this.onTouched = fn;
    }
    /**
     * @param {?} isDisabled
     * @return {?}
     */
    setDisabledState(isDisabled) {
        this.disabled = isDisabled;
    }
}
ReactiveControlComponent.decorators = [
    { type: Component, args: [{
                selector: 'rng-reactive-control',
                template: 'NO BASE TEMPLATE'
            }] }
];
/** @nocollapse */
ReactiveControlComponent.ctorParameters = () => [
    { type: NgControl, decorators: [{ type: Optional }, { type: Self }] }
];
ReactiveControlComponent.propDecorators = {
    disabled: [{ type: Input }],
    value: [{ type: Input }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class ReactiveMatInputControlComponent extends ReactiveControlComponent {
    /**
     * @param {?} formBuilder
     * @param {?} _focusMonitor
     * @param {?} _elementRef
     * @param {?} ngControl
     */
    constructor(formBuilder, _focusMonitor, _elementRef, ngControl) {
        super(ngControl);
        this._focusMonitor = _focusMonitor;
        this._elementRef = _elementRef;
        this.ngControl = ngControl;
        this.describedBy = '';
        this.id = `rng-rmff-input-${ReactiveMatInputControlComponent.nextId++}`;
        this.focused = false;
        this.errorState = false;
        this.controlType = 'rng-rmff-input';
        // tslint:disable-next-line: variable-name
        this._required = false;
        this.parts = formBuilder.group({
            value: '',
        });
        _focusMonitor.monitor(_elementRef, true).subscribe((/**
         * @param {?} origin
         * @return {?}
         */
        origin => {
            if (this.focused && !origin) {
                this.onTouched();
            }
            this.focused = !!origin;
            this.stateChanges.next();
        }));
    }
    /**
     * @return {?}
     */
    get empty() {
        const { value } = this.parts;
        return !value || value.length === 0;
    }
    /**
     * @return {?}
     */
    get shouldLabelFloat() {
        return this.focused || !this.empty;
    }
    /**
     * @return {?}
     */
    get placeholder() { return this._placeholder; }
    /**
     * @param {?} value
     * @return {?}
     */
    set placeholder(value) {
        this._placeholder = value;
        this.stateChanges.next();
    }
    /**
     * @return {?}
     */
    get required() { return this._required; }
    /**
     * @param {?} value
     * @return {?}
     */
    set required(value) {
        this._required = coerceBooleanProperty(value);
        this.stateChanges.next();
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        super.ngOnDestroy();
        this._focusMonitor.stopMonitoring(this._elementRef);
    }
    /**
     * @param {?} ids
     * @return {?}
     */
    setDescribedByIds(ids) {
        this.describedBy = ids.join(' ');
    }
    /**
     * @param {?} event
     * @return {?}
     */
    onContainerClick(event) {
        if (((/** @type {?} */ (event.target))).tagName.toLowerCase() !== 'input') {
            this._elementRef.nativeElement.querySelector('input').focus();
        }
    }
    /**
     * @return {?}
     */
    _handleInput() {
        this.onChange(this.parts.value);
    }
}
ReactiveMatInputControlComponent.nextId = 0;
ReactiveMatInputControlComponent.decorators = [
    { type: Component, args: [{
                selector: 'rng-reactive-mat-input-control',
                template: "<div [formGroup]=\"parts\">\n  <input class=\"rng-r-input-element\" formControlName=\"value\" (input)=\"_handleInput()\">\n</div>\n",
                providers: [
                    {
                        provide: MatFormFieldControl,
                        useExisting: ReactiveMatInputControlComponent
                    }
                ],
                styles: ["span{opacity:0;-webkit-transition:opacity .2s;transition:opacity .2s}:host.floating span{opacity:1}"]
            }] }
];
/** @nocollapse */
ReactiveMatInputControlComponent.ctorParameters = () => [
    { type: FormBuilder },
    { type: FocusMonitor },
    { type: ElementRef },
    { type: NgControl, decorators: [{ type: Optional }, { type: Self }] }
];
ReactiveMatInputControlComponent.propDecorators = {
    shouldLabelFloat: [{ type: HostBinding, args: ['class.floating',] }],
    describedBy: [{ type: HostBinding, args: ['attr.aria-describedby',] }],
    id: [{ type: HostBinding, args: ['id',] }],
    placeholder: [{ type: Input }],
    required: [{ type: Input }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class ReactiveMatInputComponent extends ReactiveControlComponent {
    /**
     * @param {?} ngControl
     */
    constructor(ngControl) {
        super(ngControl);
        this.ngControl = ngControl;
    }
}
ReactiveMatInputComponent.decorators = [
    { type: Component, args: [{
                selector: 'rng-reactive-mat-input',
                template: "  <mat-form-field [appearance]=\"appearance\">\n    <mat-label>{{label}}</mat-label>\n    <input matInput       \n      [formControl]=\"valueControl\">\n  </mat-form-field>\n",
                styles: [""]
            }] }
];
/** @nocollapse */
ReactiveMatInputComponent.ctorParameters = () => [
    { type: NgControl, decorators: [{ type: Optional }, { type: Self }] }
];
ReactiveMatInputComponent.propDecorators = {
    label: [{ type: Input }],
    appearance: [{ type: Input }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class BindableDatepickerComponent extends BindableInputComponent {
    /**
     * @param {?} ngControl
     * @param {?} breakpointObserver
     */
    constructor(ngControl, breakpointObserver) {
        super(ngControl);
        this.ngControl = ngControl;
        this.breakpointObserver = breakpointObserver;
        this.touchUi = false;
        this.isHandset$ = this.breakpointObserver
            .observe(Breakpoints.Handset)
            .pipe(map((/**
         * @param {?} result
         * @return {?}
         */
        result => result.matches)));
        this.valueType = "date" /* DATE */;
    }
    /**
     * @protected
     * @param {?} val
     * @return {?}
     */
    valueConverter(val) {
        return new Date(val) || val;
    }
}
BindableDatepickerComponent.decorators = [
    { type: Component, args: [{
                selector: 'rng-bindable-datepicker',
                template: "<mat-form-field [ngClass]=\"fieldCSS\"\n  [appearance]=\"appearance\"\n  color=\"accent\">\n  <mat-label>{{label}}</mat-label>\n  <input\n    matInput\n    [placeholder]=\"placeholder\"\n    [formControl]=\"valueControl\"\n    [errorStateMatcher]=\"matcher\"\n    [matDatepicker]=\"picker\"\n    (blur)=\"onTouch()\">\n  <mat-datepicker-toggle\n    matSuffix\n    [for]=\"picker\">\n    <ng-content></ng-content><!-- custom icon -->\n  </mat-datepicker-toggle>\n  <mat-datepicker\n    color=\"accent\"\n    [touchUi]=\"touchUi || ((isHandset$ | async) ? 'true' : 'false')\"\n    #picker></mat-datepicker>\n  <mat-error *ngIf=\"valueControl.invalid\">{{getErrorMessage()}}</mat-error>\n</mat-form-field>"
            }] }
];
/** @nocollapse */
BindableDatepickerComponent.ctorParameters = () => [
    { type: NgControl, decorators: [{ type: Optional }, { type: Self }] },
    { type: BreakpointObserver }
];
BindableDatepickerComponent.propDecorators = {
    touchUi: [{ type: Input }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class SimpleSearchComponent {
    constructor() {
        this.opened = false;
        this.focused = false;
        this.data = '';
        this.closeButton = false;
        this.placeholder = '';
        this.searchChange = new EventEmitter();
        this.searchClick = new EventEmitter();
        this.openSearch = (/**
         * @param {?} e
         * @param {?} el
         * @return {?}
         */
        (e, el) => {
            this.clickFunction();
            this.opened = true;
            this.focused = true;
            el.focus();
            return false;
        });
        this.changeFunction = (/**
         * @param {?} data
         * @return {?}
         */
        (data) => {
            this.dataVal = data;
        });
        this.backData = (/**
         * @param {?} data
         * @return {?}
         */
        data => this.searchChange.emit(data));
        this.clickFunction = (/**
         * @return {?}
         */
        () => {
            this.searchClick.emit();
        });
    }
    /**
     * @return {?}
     */
    onFocus() {
        this.opened = true;
        this.focused = true;
    }
    /**
     * @param {?} event
     * @return {?}
     */
    onKeydownHandler(event) {
        if (event.key === 'Escape' || event.key === 'Enter') {
            this.opened = false;
            this.focused = false;
            this.clickFunction();
        }
    }
    /**
     * @return {?}
     */
    cancelFunction() {
        this.data = '';
        this.opened = false;
        this.focused = false;
        this.backData(this.data);
        this.clickFunction();
    }
    /**
     * @return {?}
     */
    onBlur() {
        if (this.data === '') {
            this.opened = false;
            this.focused = false;
            this.clickFunction();
        }
        else {
            this.opened = true;
        }
    }
}
SimpleSearchComponent.decorators = [
    { type: Component, args: [{
                selector: 'rng-simple-search',
                template: "<div class=\"dynamic-search\"\n  [ngClass]=\"{'open-search': opened || !!placeholder || !!data, \n              'placeholder': !!placeholder, \n              'focused': focused}\">\n  <form>\n    <div class=\"field-wrap\">\n      <input (focus)=\"onFocus()\"\n        (blur)=\"onBlur()\"\n        #focusable\n        type=\"search\"\n        name=\"search\"\n        [(ngModel)]=\"data\"\n        (ngModelChange)=\"changeFunction(data); backData(data)\"\n        autocomplete=\"off\"\n        placeholder=\"{{placeholder}}\">\n        <button mat-icon-button\n          class=\"cancel-search-btn\"\n          *ngIf=\"closeButton\"\n          (click)=\"cancelFunction()\">\n          <i class=\"rng-icon rng-icon-close\"></i>\n        </button>\n      </div>\n    <button class=\"dynamic-search-btn\"\n      mat-icon-button\n      (click)=\"openSearch($event, focusable)\">\n      <i class=\"rng-icon rng-icon-search\"></i>\n    </button>\n  </form>\n</div>\n"
            }] }
];
SimpleSearchComponent.propDecorators = {
    data: [{ type: Input }],
    closeButton: [{ type: Input }],
    placeholder: [{ type: Input }],
    searchChange: [{ type: Output }],
    searchClick: [{ type: Output }],
    onKeydownHandler: [{ type: HostListener, args: ['document:keydown', ['$event'],] }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class ContentToolbarComponent {
    constructor() {
        this.gridButton = false;
        this.filterButton = false;
        this.showFilters = false;
        this.grid = true;
        this.changeGrid = new EventEmitter();
        this.searchData = new EventEmitter();
        this.filterClick = new EventEmitter();
        // new:
        this.filterChanged = new EventEmitter();
        // end of grid function
    }
    // search function
    /**
     * @param {?} val
     * @return {?}
     */
    onSearchChange(val) {
        this.searchData.emit(val);
    }
    // end of search function
    // filter
    /**
     * @return {?}
     */
    filterButtonClick() {
        this.filterClick.emit();
    }
    /**
     * @param {?} state
     * @return {?}
     */
    changeFilter(state) {
        this.filterChanged.emit(state);
    }
    // end of filter
    // grid function
    /**
     * @return {?}
     */
    gridFunction() {
        this.grid = !this.grid;
        this.changeGrid.emit();
    }
}
ContentToolbarComponent.decorators = [
    { type: Component, args: [{
                selector: 'rng-content-toolbar',
                template: "<div class=\"content-toolbar\">\n  <rng-simple-search\n    [data]=\"searchValue\"\n    (searchChange)=\"onSearchChange($event)\"></rng-simple-search>\n  <div class=\"spacer\"></div>\n  <ng-content custom-filters></ng-content>\n  <div class=\"toolbar-filter\"\n    *ngIf=\"showFilters\">\n    <ng-template ngFor let-filter [ngForOf]=\"filters\">\n      <ng-container [ngSwitch]=\"filter.type\">\n        <rng-bindable-select *ngSwitchCase=\"'single'\"\n          appearance=\"none\"\n          [items]=\"filter.items\"\n          [placeholder]=\"filter.placeholder\"\n          [formControl]=\"filter.control\"\n                             (change)=\"changeFilter($event)\"\n          [disableOptionCentering]=\"true\"></rng-bindable-select>\n        <rng-bindable-select-multi *ngSwitchCase=\"'multi'\"\n          appearance=\"none\"\n          [items]=\"filter.items\"\n          [placeholder]=\"filter.placeholder\"\n          [formControl]=\"filter.control\"\n          [disableOptionCentering]=\"true\"></rng-bindable-select-multi>\n        <span *ngSwitchDefault>filter type '{{filter.type}}' not yet supported</span>\n      </ng-container>\n    </ng-template>\n  </div>\n  <button *ngIf=\"filterButton\"\n    mat-icon-button\n    [ngClass]=\"{'button-toggle': showFilters}\"\n    (click)=\"filterButtonClick()\"><i class=\"rng-icon rng-icon-filter_list\"></i></button>\n  <button *ngIf=\"gridButton\"\n    mat-icon-button\n    [ngClass]=\"{'button-toggle': gridButton && grid}\"\n    (click)=\"gridFunction()\">\n    <i *ngIf=\"grid\"\n      class=\"rng-icon rng-icon-view_list\"></i>\n    <i *ngIf=\"!grid\"\n      class=\"rng-icon rng-icon-view_grid\"></i>\n  </button>\n</div>\n"
            }] }
];
ContentToolbarComponent.propDecorators = {
    gridButton: [{ type: Input }],
    filterButton: [{ type: Input }],
    filters: [{ type: Input }],
    showFilters: [{ type: Input }],
    grid: [{ type: Input }],
    searchValue: [{ type: Input }],
    changeGrid: [{ type: Output }],
    searchData: [{ type: Output }],
    filterClick: [{ type: Output }],
    filterChanged: [{ type: Output }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class BindableTextareaComponent extends BindableComponent {
    constructor() {
        super(...arguments);
        this.btnClick = new EventEmitter();
        this.autosize = true;
        this.minRows = 1;
        this.maxRows = 4;
    }
}
BindableTextareaComponent.decorators = [
    { type: Component, args: [{
                selector: 'rng-bindable-textarea',
                template: "<div class=\"rng-bindable-textarea\" [ngClass]=\"{'with-button': !!btnIconCSS}\">\n  <mat-form-field [ngClass]=\"fieldCSS\"\n    [appearance]=\"appearance\"\n    color=\"accent\">\n    <mat-label>{{label}}</mat-label>\n    <textarea \n      matInput \n      [placeholder]=\"placeholder\"\n      [formControl]=\"valueControl\"\n      [errorStateMatcher]=\"matcher\"\n      [cdkTextareaAutosize]=\"autosize\"\n      [cdkAutosizeMinRows]=\"minRows\"\n      [cdkAutosizeMaxRows]=\"maxRows\"\n      (blur)=\"onTouch()\"></textarea>\n    <mat-error *ngIf=\"valueControl.invalid\">{{getErrorMessage()}}</mat-error>\n  </mat-form-field>\n  <button mat-icon-button *ngIf=\"btnIconCSS\"\n    class=\"text-area-button\"\n    (click)=\"btnClick.emit()\">\n    <i [class]=\"btnIconCSS\"></i>\n  </button>\n</div>\n",
                styles: [""]
            }] }
];
BindableTextareaComponent.propDecorators = {
    btnClick: [{ type: Output }],
    btnIconCSS: [{ type: Input }],
    autosize: [{ type: Input }],
    minRows: [{ type: Input }],
    maxRows: [{ type: Input }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
const moment = momentModule;
class BindableTimepickerComponent extends BindableInputComponent {
    constructor() {
        super(...arguments);
        this.stepMinutes = 30;
        this.dayStartHour = 8;
        this.dayEndHour = 19;
        this.items = [];
        this.filteredItems = this.items;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        super.ngOnInit();
        this.items = this.generateIntervals();
        this.filteredItems = this.items;
        this.subscription.add(this.valueControl.valueChanges.subscribe((/**
         * @param {?} value
         * @return {?}
         */
        value => {
            this.filteredItems = this.items.filter((/**
             * @param {?} item
             * @return {?}
             */
            item => item.startsWith(value)));
        })));
    }
    /**
     * @return {?}
     */
    generateIntervals() {
        /** @type {?} */
        const items = [];
        for (let index = this.dayStartHour * 60; index <= this.dayEndHour * 60; index += this.stepMinutes) {
            /** @type {?} */
            const date = new Date(0, 0, 0, 0, index);
            items.push(moment(date).format('h:mm A'));
        }
        return items;
    }
}
BindableTimepickerComponent.decorators = [
    { type: Component, args: [{
                selector: 'rng-bindable-timepicker',
                template: "<mat-form-field  [ngClass]=\"fieldCSS\"\n  [appearance]=\"appearance\"\n  [floatLabel]=\"floatLabel\"\n  color=\"accent\">\n  <i matSuffix\n    class=\"rng-icon rng-icon-schedule\"></i>\n  <mat-label *ngIf=\"label\">{{label}}</mat-label>\n  <input matInput \n    [formControl]=\"valueControl\"\n    [matAutocomplete]=\"auto\"/>                  \n  <mat-autocomplete #auto=\"matAutocomplete\">\n    <mat-option *ngFor=\"let item of filteredItems\" \n      [value]=\"item\">{{item}}</mat-option>\n  </mat-autocomplete>\n  <mat-error *ngIf=\"valueControl.invalid\">{{getErrorMessage()}}</mat-error>\n</mat-form-field>"
            }] }
];
BindableTimepickerComponent.propDecorators = {
    stepMinutes: [{ type: Input }],
    dayStartHour: [{ type: Input }],
    dayEndHour: [{ type: Input }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class BindableMultiInputComponent extends BindableComponent {
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class RngInputsModule {
}
RngInputsModule.decorators = [
    { type: NgModule, args: [{
                declarations: [
                    BindableComponent,
                    BindableInputComponent,
                    BindableSelectComponent,
                    BindableSelectMultiComponent,
                    BindableCheckboxComponent,
                    TypeLabelComponent,
                    ReactiveControlComponent,
                    ReactiveMatInputControlComponent,
                    ReactiveMatInputComponent,
                    BindableDatepickerComponent,
                    SimpleSearchComponent,
                    ContentToolbarComponent,
                    BindableTextareaComponent,
                    BindableTimepickerComponent,
                    BindableMultiInputComponent
                ],
                imports: [
                    CommonModule,
                    NgxMaskModule.forRoot(),
                    MaterialModule,
                    FormsModule,
                    ReactiveFormsModule,
                ],
                exports: [
                    BindableComponent,
                    BindableInputComponent,
                    BindableSelectComponent,
                    BindableSelectMultiComponent,
                    BindableCheckboxComponent,
                    BindableDatepickerComponent,
                    ReactiveControlComponent,
                    ReactiveMatInputControlComponent,
                    ReactiveMatInputComponent,
                    SimpleSearchComponent,
                    ContentToolbarComponent,
                    BindableTextareaComponent,
                    BindableTimepickerComponent,
                    BindableMultiInputComponent
                ]
            },] }
];

export { BindableCheckboxComponent, BindableComponent, BindableDatepickerComponent, BindableInputComponent, BindableSelectComponent, BindableSelectMultiComponent, BindableTextareaComponent, BindableTimepickerComponent, ContentToolbarComponent, ReactiveControlComponent, ReactiveMatInputComponent, ReactiveMatInputControlComponent, RngErrorStateMatcher, RngInputsModule, SimpleSearchComponent, TypeLabelComponent as ɵa, BindableMultiInputComponent as ɵb, MaterialModule as ɵc };
//# sourceMappingURL=rng-inputs.js.map
