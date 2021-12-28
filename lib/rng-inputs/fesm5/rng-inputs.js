import { NgModule, Component, Optional, Self, Input, ElementRef, HostBinding, Output, HostListener, EventEmitter } from '@angular/core';
import { formatDate, formatCurrency, CommonModule } from '@angular/common';
import { NgControl, FormControl, FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxMaskModule } from 'ngx-mask';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { Subscription, Subject } from 'rxjs';
import { __extends } from 'tslib';
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
var MaterialModule = /** @class */ (function () {
    function MaterialModule() {
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
    return MaterialModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
var DEFAULT_APPEARANCE = 'fill';
/**
 * Error when invalid control is dirty, touched, or submitted.
 */
var  /**
 * Error when invalid control is dirty, touched, or submitted.
 */
RngErrorStateMatcher = /** @class */ (function () {
    function RngErrorStateMatcher() {
    }
    /**
     * @param {?} control
     * @param {?} form
     * @return {?}
     */
    RngErrorStateMatcher.prototype.isErrorState = /**
     * @param {?} control
     * @param {?} form
     * @return {?}
     */
    function (control, form) {
        /** @type {?} */
        var isSubmitted = form && form.submitted;
        return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
    };
    return RngErrorStateMatcher;
}());
var BindableComponent = /** @class */ (function () {
    function BindableComponent(ngControl) {
        var _this = this;
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
        function (val) {
            _this.value = val;
        });
        this.onTouch = (/**
         * @return {?}
         */
        function () {
            _this.onLocalTouch();
        });
        if (this.ngControl != null) {
            this.ngControl.valueAccessor = this;
        }
    }
    Object.defineProperty(BindableComponent.prototype, "appearance", {
        get: /**
         * @return {?}
         */
        function () {
            return this.localappearance ? this.localappearance : DEFAULT_APPEARANCE;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this.localappearance = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BindableComponent.prototype, "valueType", {
        get: /**
         * @return {?}
         */
        function () {
            return this.valType;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this.valueTypeSetter(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BindableComponent.prototype, "value", {
        get: /**
         * @return {?}
         */
        function () {
            return this.valueGetter();
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this.valueSetter(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BindableComponent.prototype, "readonly", {
        get: /**
         * @return {?}
         */
        function () {
            return this.localReadonly;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this.localReadonly = value !== undefined && value !== false ? true : false;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BindableComponent.prototype, "floatLabel", {
        get: /**
         * @return {?}
         */
        function () {
            return this.label && this.label.length ? 'auto' : 'never';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BindableComponent.prototype, "fieldCSS", {
        get: /**
         * @return {?}
         */
        function () {
            return this.fieldCSSGetter();
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @protected
     * @return {?}
     */
    BindableComponent.prototype.fieldCSSGetter = /**
     * @protected
     * @return {?}
     */
    function () {
        /** @type {?} */
        var css = ['full-width'];
        if (this.readonly) {
            css.push('readonly');
        }
        if (this.disabledInput) {
            css.push('disabledInput');
        }
        return css;
    };
    /**
     * @return {?}
     */
    BindableComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        // TODO: add common validators or some other logic to simplify or deserialise validators, etc.
        if (this.ngControl && this.valueControl) {
            this.valueControl.setValidators(this.ngControl.control.validator);
            this.valueControl.setAsyncValidators(this.ngControl.control.asyncValidator);
            this.valueControl.setValue(this.valueConverter(this.ngControl.value));
            this.valueControl.updateValueAndValidity();
            this.subscription.add(this.valueControl.valueChanges.subscribe(this.onChange));
        }
    };
    /**
     * @return {?}
     */
    BindableComponent.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.subscription.unsubscribe();
        this.stateChanges.complete();
    };
    /**
     * @protected
     * @return {?}
     */
    BindableComponent.prototype.valueGetter = /**
     * @protected
     * @return {?}
     */
    function () {
        return this.valueControl.value;
    };
    /**
     * @protected
     * @param {?} val
     * @return {?}
     */
    BindableComponent.prototype.valueSetter = /**
     * @protected
     * @param {?} val
     * @return {?}
     */
    function (val) {
        this.onLocalChange(val);
        this.onLocalTouch();
        this.stateChanges.next();
    };
    /**
     * @protected
     * @param {?} value
     * @return {?}
     */
    BindableComponent.prototype.valueTypeSetter = /**
     * @protected
     * @param {?} value
     * @return {?}
     */
    function (value) {
        this.valType = value;
    };
    /**
     * @protected
     * @param {?} val
     * @return {?}
     */
    BindableComponent.prototype.valueConverter = /**
     * @protected
     * @param {?} val
     * @return {?}
     */
    function (val) {
        return val;
    };
    /**
     * @param {?} date
     * @return {?}
     */
    BindableComponent.prototype.auxDateFormatter = /**
     * @param {?} date
     * @return {?}
     */
    function (date) {
        return formatDate(date, 'dd MMM yyyy', 'en_US');
    };
    /**
     * @param {?} amount
     * @return {?}
     */
    BindableComponent.prototype.auxCurrencyFormatter = /**
     * @param {?} amount
     * @return {?}
     */
    function (amount) {
        return formatCurrency(amount, 'en_US', '$', '1.2-2');
    };
    /**
     * @return {?}
     */
    BindableComponent.prototype.getErrorMessage = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var errors = this.valueControl.errors;
        /** @type {?} */
        var keys = (/** @type {?} */ (Object.keys(errors)));
        return !errors ? null :
            this.valueControl.hasError('required') ? this.errorMessages.required :
                this.valueControl.hasError('email') ? this.errorMessages.email :
                    this.valueControl.hasError('maxlength') ? this.errorMessages.maxlength :
                        this.valueControl.hasError('minlength') ? this.errorMessages.minlength :
                            this.valueControl.hasError('pattern') ? this.errorMessages.pattern :
                                errors[keys[0]].message;
    };
    // control value accessor interface implementation:
    // control value accessor interface implementation:
    /**
     * @param {?} val
     * @return {?}
     */
    BindableComponent.prototype.writeValue = 
    // control value accessor interface implementation:
    /**
     * @param {?} val
     * @return {?}
     */
    function (val) {
        this.valueControl.setValue(this.valueConverter(val)); // initial value or model updates for the view
    };
    /**
     * @param {?} fn
     * @return {?}
     */
    BindableComponent.prototype.registerOnChange = /**
     * @param {?} fn
     * @return {?}
     */
    function (fn) {
        this.onLocalChange = fn;
    };
    /**
     * @param {?} fn
     * @return {?}
     */
    BindableComponent.prototype.registerOnTouched = /**
     * @param {?} fn
     * @return {?}
     */
    function (fn) {
        this.onLocalTouch = fn;
    };
    /**
     * @param {?} isDisabled
     * @return {?}
     */
    BindableComponent.prototype.setDisabledState = /**
     * @param {?} isDisabled
     * @return {?}
     */
    function (isDisabled) {
        if (isDisabled) {
            this.valueControl.disable();
        }
        else {
            this.valueControl.enable();
        }
    };
    BindableComponent.decorators = [
        { type: Component, args: [{
                    selector: 'rng-bindable',
                    template: 'NO BASE TEMPLATE'
                }] }
    ];
    /** @nocollapse */
    BindableComponent.ctorParameters = function () { return [
        { type: NgControl, decorators: [{ type: Optional }, { type: Self }] }
    ]; };
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
    return BindableComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var BindableInputComponent = /** @class */ (function (_super) {
    __extends(BindableInputComponent, _super);
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var BindableSelectComponent = /** @class */ (function (_super) {
    __extends(BindableSelectComponent, _super);
    function BindableSelectComponent() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        // default returns selected object
        _this.valueKey = 'value'; // default search items by "value" key if they are objects
        // default search items by "value" key if they are objects
        _this.items = [];
        _this.disableOptionCentering = true;
        _this.nameKey = 'name';
        _this.disabled = false;
        _this.multiple = false;
        return _this;
    }
    Object.defineProperty(BindableSelectComponent.prototype, "valueName", {
        get: /**
         * @return {?}
         */
        function () {
            /** @type {?} */
            var currentValue = this.value;
            return this.valueNameGetter(currentValue);
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @protected
     * @param {?} currentValue
     * @return {?}
     */
    BindableSelectComponent.prototype.valueNameGetter = /**
     * @protected
     * @param {?} currentValue
     * @return {?}
     */
    function (currentValue) {
        return currentValue ? currentValue.name ? currentValue.name : (/** @type {?} */ ((/** @type {?} */ (currentValue)))) : this.placeholder;
    };
    /**
     * @protected
     * @return {?}
     */
    BindableSelectComponent.prototype.fieldCSSGetter = /**
     * @protected
     * @return {?}
     */
    function () {
        /** @type {?} */
        var baseCSS = _super.prototype.fieldCSSGetter.call(this);
        baseCSS.push('single-select');
        return baseCSS;
    };
    /**
     * @protected
     * @return {?}
     */
    BindableSelectComponent.prototype.valueGetter = /**
     * @protected
     * @return {?}
     */
    function () {
        /** @type {?} */
        var oldValue = _super.prototype.valueGetter.call(this);
        return this.currentValue(oldValue); // gets one of current items (if still present) by valueKey
    };
    /**
     * @protected
     * @param {?} oldValue
     * @return {?}
     */
    BindableSelectComponent.prototype.currentValue = /**
     * @protected
     * @param {?} oldValue
     * @return {?}
     */
    function (oldValue) {
        var _this = this;
        if (!oldValue) {
            return oldValue;
        } // value not yet set. can be undefined or null.
        // value not yet set. can be undefined or null.
        // we can't change it if it is null or undefined so just return it "as is".
        /** @type {?} */
        var value = oldValue[this.valueKey];
        if (!value) {
            return oldValue;
        } // values are strings, no search required
        return this.items.find((/**
         * @param {?} item
         * @return {?}
         */
        function (item) { return item[_this.valueKey] === value; }));
    };
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
    return BindableSelectComponent;
}(BindableComponent));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var BindableSelectMultiComponent = /** @class */ (function (_super) {
    __extends(BindableSelectMultiComponent, _super);
    function BindableSelectMultiComponent() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.multiple = true;
        return _this;
    }
    Object.defineProperty(BindableSelectMultiComponent.prototype, "selectionCount", {
        get: /**
         * @return {?}
         */
        function () {
            /** @type {?} */
            var value = this.value;
            return value ? value.length : 0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BindableSelectMultiComponent.prototype, "valueName", {
        get: /**
         * @return {?}
         */
        function () {
            /** @type {?} */
            var cnt = this.selectionCount;
            switch (cnt) {
                case 0:
                    return this.placeholder;
                case 1:
                    return _super.prototype.valueNameGetter.call(this, this.value[0]);
                default:
                    return this.placeholder + ' (' + cnt + ')';
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @protected
     * @return {?}
     */
    BindableSelectMultiComponent.prototype.fieldCSSGetter = /**
     * @protected
     * @return {?}
     */
    function () {
        /** @type {?} */
        var baseCSS = _super.prototype.fieldCSSGetter.call(this);
        baseCSS.push('multi-select');
        return baseCSS;
    };
    /**
     * @protected
     * @param {?} oldValue
     * @return {?}
     */
    BindableSelectMultiComponent.prototype.currentValue = /**
     * @protected
     * @param {?} oldValue
     * @return {?}
     */
    function (oldValue) {
        var _this = this;
        if (!oldValue) {
            return oldValue;
        } // value not yet set. can be undefined or null.
        // value not yet set. can be undefined or null.
        // we can't change it if it is null or undefined so just return it "as is".
        /** @type {?} */
        var values = oldValue.reduce((/**
         * @param {?} vals
         * @param {?} oldval
         * @return {?}
         */
        function (vals, oldval) {
            // re-checking items
            /** @type {?} */
            var oldKeyValue = oldval[_this.valueKey];
            if (!oldKeyValue) {
                vals.push(oldval); // values are string, so just return a value
            }
            else {
                /** @type {?} */
                var objVal = _this.items.find((/**
                 * @param {?} item
                 * @return {?}
                 */
                function (item) { return item[_this.valueKey] === oldKeyValue; }));
                if (objVal) {
                    vals.push(objVal);
                }
            }
            return vals;
        }), []);
        return values;
    };
    BindableSelectMultiComponent.decorators = [
        { type: Component, args: [{
                    selector: 'rng-bindable-select-multi',
                    template: "<mat-form-field [ngClass]=\"fieldCSS\"\n  [appearance]=\"appearance\"\n  [floatLabel]=\"floatLabel\"\n  color=\"accent\">\n  <mat-label *ngIf=\"label\">{{label}}</mat-label>\n  <mat-select\n    [disabled]=\"disabled\"\n    [multiple]=\"multiple\"\n    [formControl]=\"valueControl\"\n    [placeholder]=\"valueName\"\n    [disableOptionCentering]=\"disableOptionCentering\">\n    <mat-option\n      *ngFor=\"let item of items\"\n      [value]=\"returnKey ? item[returnKey] : item\">\n      <div *ngIf=\"item.color\" class=\"complex-option\">\n        <rng-type-label [data]=\"item\"></rng-type-label><span class=\"value\">{{item.name}}</span>\n      </div>\n      <span *ngIf=\"!item.color && item[nameKey]\">{{item[nameKey]}} </span>\n      <span *ngIf=\"!item[nameKey]\"> {{item}}</span>\n    </mat-option>\n  </mat-select>\n</mat-form-field>\n"
                }] }
    ];
    return BindableSelectMultiComponent;
}(BindableSelectComponent));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var BindableCheckboxComponent = /** @class */ (function (_super) {
    __extends(BindableCheckboxComponent, _super);
    function BindableCheckboxComponent(ngControl) {
        var _this = _super.call(this, ngControl) || this;
        _this.ngControl = ngControl;
        return _this;
    }
    BindableCheckboxComponent.decorators = [
        { type: Component, args: [{
                    selector: 'rng-bindable-checkbox',
                    template: "<mat-checkbox\n  [formControl]=\"valueControl\"></mat-checkbox>\n<span>{{label}}</span>"
                }] }
    ];
    /** @nocollapse */
    BindableCheckboxComponent.ctorParameters = function () { return [
        { type: NgControl, decorators: [{ type: Optional }, { type: Self }] }
    ]; };
    return BindableCheckboxComponent;
}(BindableComponent));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var TypeLabelComponent = /** @class */ (function () {
    function TypeLabelComponent() {
    }
    Object.defineProperty(TypeLabelComponent.prototype, "data", {
        get: /**
         * @return {?}
         */
        function () {
            return this.typeData;
        },
        set: /**
         * @param {?} data
         * @return {?}
         */
        function (data) {
            this.typeData = data;
            this.typeClass = ['rng-type-label', this.data.color, 'badge'];
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    TypeLabelComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () { };
    TypeLabelComponent.decorators = [
        { type: Component, args: [{
                    selector: 'rng-type-label',
                    template: "<span [ngClass]=\"typeClass\">{{data.value}}</span>\n"
                }] }
    ];
    /** @nocollapse */
    TypeLabelComponent.ctorParameters = function () { return []; };
    TypeLabelComponent.propDecorators = {
        data: [{ type: Input }]
    };
    return TypeLabelComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var ReactiveControlComponent = /** @class */ (function () {
    function ReactiveControlComponent(ngControl) {
        var _this = this;
        this.ngControl = ngControl;
        this.valueControl = new FormControl();
        this.stateChanges = new Subject(); // this will mostly be used with custom controls for material inputs
        this.onLocalChange = (/**
         * @param {?} val
         * @return {?}
         */
        function (val) {
            console.log('onLocalChange', val);
            _this.value = val;
        });
        this.onChange = (/**
         * @param {?} val
         * @return {?}
         */
        function (val) {
            console.log('onChange', val);
        });
        this.onTouched = (/**
         * @return {?}
         */
        function () {
            console.log('onTouched');
        });
        if (this.ngControl != null) {
            this.ngControl.valueAccessor = this;
            this.valueControl = new FormControl();
        }
    }
    Object.defineProperty(ReactiveControlComponent.prototype, "disabled", {
        get: 
        // this will mostly be used with custom controls for material inputs
        /**
         * @return {?}
         */
        function () { return this.valueControl.disabled; },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            /** @type {?} */
            var disabled = coerceBooleanProperty(value);
            if (disabled) {
                this.valueControl.disable();
            }
            else {
                this.valueControl.enable();
            }
            this.stateChanges.next();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ReactiveControlComponent.prototype, "value", {
        get: /**
         * @return {?}
         */
        function () {
            return this.valueControl.value;
        },
        set: /**
         * @param {?} val
         * @return {?}
         */
        function (val) {
            this.onChange(val);
            this.stateChanges.next();
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    ReactiveControlComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
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
    };
    /**
     * @return {?}
     */
    ReactiveControlComponent.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.stateChanges.complete();
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    };
    /**
     * @param {?} val
     * @return {?}
     */
    ReactiveControlComponent.prototype.writeValue = /**
     * @param {?} val
     * @return {?}
     */
    function (val) {
        this.value = val; // initial value or model updates for the view
    };
    /**
     * @param {?} fn
     * @return {?}
     */
    ReactiveControlComponent.prototype.registerOnChange = /**
     * @param {?} fn
     * @return {?}
     */
    function (fn) {
        this.onChange = fn;
    };
    /**
     * @param {?} fn
     * @return {?}
     */
    ReactiveControlComponent.prototype.registerOnTouched = /**
     * @param {?} fn
     * @return {?}
     */
    function (fn) {
        this.onTouched = fn;
    };
    /**
     * @param {?} isDisabled
     * @return {?}
     */
    ReactiveControlComponent.prototype.setDisabledState = /**
     * @param {?} isDisabled
     * @return {?}
     */
    function (isDisabled) {
        this.disabled = isDisabled;
    };
    ReactiveControlComponent.decorators = [
        { type: Component, args: [{
                    selector: 'rng-reactive-control',
                    template: 'NO BASE TEMPLATE'
                }] }
    ];
    /** @nocollapse */
    ReactiveControlComponent.ctorParameters = function () { return [
        { type: NgControl, decorators: [{ type: Optional }, { type: Self }] }
    ]; };
    ReactiveControlComponent.propDecorators = {
        disabled: [{ type: Input }],
        value: [{ type: Input }]
    };
    return ReactiveControlComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var ReactiveMatInputControlComponent = /** @class */ (function (_super) {
    __extends(ReactiveMatInputControlComponent, _super);
    function ReactiveMatInputControlComponent(formBuilder, _focusMonitor, _elementRef, ngControl) {
        var _this = _super.call(this, ngControl) || this;
        _this._focusMonitor = _focusMonitor;
        _this._elementRef = _elementRef;
        _this.ngControl = ngControl;
        _this.describedBy = '';
        _this.id = "rng-rmff-input-" + ReactiveMatInputControlComponent.nextId++;
        _this.focused = false;
        _this.errorState = false;
        _this.controlType = 'rng-rmff-input';
        // tslint:disable-next-line: variable-name
        _this._required = false;
        _this.parts = formBuilder.group({
            value: '',
        });
        _focusMonitor.monitor(_elementRef, true).subscribe((/**
         * @param {?} origin
         * @return {?}
         */
        function (origin) {
            if (_this.focused && !origin) {
                _this.onTouched();
            }
            _this.focused = !!origin;
            _this.stateChanges.next();
        }));
        return _this;
    }
    Object.defineProperty(ReactiveMatInputControlComponent.prototype, "empty", {
        get: /**
         * @return {?}
         */
        function () {
            var value = this.parts.value;
            return !value || value.length === 0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ReactiveMatInputControlComponent.prototype, "shouldLabelFloat", {
        get: /**
         * @return {?}
         */
        function () {
            return this.focused || !this.empty;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ReactiveMatInputControlComponent.prototype, "placeholder", {
        get: /**
         * @return {?}
         */
        function () { return this._placeholder; },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._placeholder = value;
            this.stateChanges.next();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ReactiveMatInputControlComponent.prototype, "required", {
        get: /**
         * @return {?}
         */
        function () { return this._required; },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._required = coerceBooleanProperty(value);
            this.stateChanges.next();
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    ReactiveMatInputControlComponent.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        _super.prototype.ngOnDestroy.call(this);
        this._focusMonitor.stopMonitoring(this._elementRef);
    };
    /**
     * @param {?} ids
     * @return {?}
     */
    ReactiveMatInputControlComponent.prototype.setDescribedByIds = /**
     * @param {?} ids
     * @return {?}
     */
    function (ids) {
        this.describedBy = ids.join(' ');
    };
    /**
     * @param {?} event
     * @return {?}
     */
    ReactiveMatInputControlComponent.prototype.onContainerClick = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        if (((/** @type {?} */ (event.target))).tagName.toLowerCase() !== 'input') {
            this._elementRef.nativeElement.querySelector('input').focus();
        }
    };
    /**
     * @return {?}
     */
    ReactiveMatInputControlComponent.prototype._handleInput = /**
     * @return {?}
     */
    function () {
        this.onChange(this.parts.value);
    };
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
    ReactiveMatInputControlComponent.ctorParameters = function () { return [
        { type: FormBuilder },
        { type: FocusMonitor },
        { type: ElementRef },
        { type: NgControl, decorators: [{ type: Optional }, { type: Self }] }
    ]; };
    ReactiveMatInputControlComponent.propDecorators = {
        shouldLabelFloat: [{ type: HostBinding, args: ['class.floating',] }],
        describedBy: [{ type: HostBinding, args: ['attr.aria-describedby',] }],
        id: [{ type: HostBinding, args: ['id',] }],
        placeholder: [{ type: Input }],
        required: [{ type: Input }]
    };
    return ReactiveMatInputControlComponent;
}(ReactiveControlComponent));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var ReactiveMatInputComponent = /** @class */ (function (_super) {
    __extends(ReactiveMatInputComponent, _super);
    function ReactiveMatInputComponent(ngControl) {
        var _this = _super.call(this, ngControl) || this;
        _this.ngControl = ngControl;
        return _this;
    }
    ReactiveMatInputComponent.decorators = [
        { type: Component, args: [{
                    selector: 'rng-reactive-mat-input',
                    template: "  <mat-form-field [appearance]=\"appearance\">\n    <mat-label>{{label}}</mat-label>\n    <input matInput       \n      [formControl]=\"valueControl\">\n  </mat-form-field>\n",
                    styles: [""]
                }] }
    ];
    /** @nocollapse */
    ReactiveMatInputComponent.ctorParameters = function () { return [
        { type: NgControl, decorators: [{ type: Optional }, { type: Self }] }
    ]; };
    ReactiveMatInputComponent.propDecorators = {
        label: [{ type: Input }],
        appearance: [{ type: Input }]
    };
    return ReactiveMatInputComponent;
}(ReactiveControlComponent));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var BindableDatepickerComponent = /** @class */ (function (_super) {
    __extends(BindableDatepickerComponent, _super);
    function BindableDatepickerComponent(ngControl, breakpointObserver) {
        var _this = _super.call(this, ngControl) || this;
        _this.ngControl = ngControl;
        _this.breakpointObserver = breakpointObserver;
        _this.touchUi = false;
        _this.isHandset$ = _this.breakpointObserver
            .observe(Breakpoints.Handset)
            .pipe(map((/**
         * @param {?} result
         * @return {?}
         */
        function (result) { return result.matches; })));
        _this.valueType = "date" /* DATE */;
        return _this;
    }
    /**
     * @protected
     * @param {?} val
     * @return {?}
     */
    BindableDatepickerComponent.prototype.valueConverter = /**
     * @protected
     * @param {?} val
     * @return {?}
     */
    function (val) {
        return new Date(val) || val;
    };
    BindableDatepickerComponent.decorators = [
        { type: Component, args: [{
                    selector: 'rng-bindable-datepicker',
                    template: "<mat-form-field [ngClass]=\"fieldCSS\"\n  [appearance]=\"appearance\"\n  color=\"accent\">\n  <mat-label>{{label}}</mat-label>\n  <input\n    matInput\n    [placeholder]=\"placeholder\"\n    [formControl]=\"valueControl\"\n    [errorStateMatcher]=\"matcher\"\n    [matDatepicker]=\"picker\"\n    (blur)=\"onTouch()\">\n  <mat-datepicker-toggle\n    matSuffix\n    [for]=\"picker\">\n    <ng-content></ng-content><!-- custom icon -->\n  </mat-datepicker-toggle>\n  <mat-datepicker\n    color=\"accent\"\n    [touchUi]=\"touchUi || ((isHandset$ | async) ? 'true' : 'false')\"\n    #picker></mat-datepicker>\n  <mat-error *ngIf=\"valueControl.invalid\">{{getErrorMessage()}}</mat-error>\n</mat-form-field>"
                }] }
    ];
    /** @nocollapse */
    BindableDatepickerComponent.ctorParameters = function () { return [
        { type: NgControl, decorators: [{ type: Optional }, { type: Self }] },
        { type: BreakpointObserver }
    ]; };
    BindableDatepickerComponent.propDecorators = {
        touchUi: [{ type: Input }]
    };
    return BindableDatepickerComponent;
}(BindableInputComponent));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var SimpleSearchComponent = /** @class */ (function () {
    function SimpleSearchComponent() {
        var _this = this;
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
        function (e, el) {
            _this.clickFunction();
            _this.opened = true;
            _this.focused = true;
            el.focus();
            return false;
        });
        this.changeFunction = (/**
         * @param {?} data
         * @return {?}
         */
        function (data) {
            _this.dataVal = data;
        });
        this.backData = (/**
         * @param {?} data
         * @return {?}
         */
        function (data) { return _this.searchChange.emit(data); });
        this.clickFunction = (/**
         * @return {?}
         */
        function () {
            _this.searchClick.emit();
        });
    }
    /**
     * @return {?}
     */
    SimpleSearchComponent.prototype.onFocus = /**
     * @return {?}
     */
    function () {
        this.opened = true;
        this.focused = true;
    };
    /**
     * @param {?} event
     * @return {?}
     */
    SimpleSearchComponent.prototype.onKeydownHandler = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        if (event.key === 'Escape' || event.key === 'Enter') {
            this.opened = false;
            this.focused = false;
            this.clickFunction();
        }
    };
    /**
     * @return {?}
     */
    SimpleSearchComponent.prototype.cancelFunction = /**
     * @return {?}
     */
    function () {
        this.data = '';
        this.opened = false;
        this.focused = false;
        this.backData(this.data);
        this.clickFunction();
    };
    /**
     * @return {?}
     */
    SimpleSearchComponent.prototype.onBlur = /**
     * @return {?}
     */
    function () {
        if (this.data === '') {
            this.opened = false;
            this.focused = false;
            this.clickFunction();
        }
        else {
            this.opened = true;
        }
    };
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
    return SimpleSearchComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var ContentToolbarComponent = /** @class */ (function () {
    function ContentToolbarComponent() {
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
    // search function
    /**
     * @param {?} val
     * @return {?}
     */
    ContentToolbarComponent.prototype.onSearchChange = 
    // search function
    /**
     * @param {?} val
     * @return {?}
     */
    function (val) {
        this.searchData.emit(val);
    };
    // end of search function
    // filter
    // end of search function
    // filter
    /**
     * @return {?}
     */
    ContentToolbarComponent.prototype.filterButtonClick = 
    // end of search function
    // filter
    /**
     * @return {?}
     */
    function () {
        this.filterClick.emit();
    };
    /**
     * @param {?} state
     * @return {?}
     */
    ContentToolbarComponent.prototype.changeFilter = /**
     * @param {?} state
     * @return {?}
     */
    function (state) {
        this.filterChanged.emit(state);
    };
    // end of filter
    // grid function
    // end of filter
    // grid function
    /**
     * @return {?}
     */
    ContentToolbarComponent.prototype.gridFunction = 
    // end of filter
    // grid function
    /**
     * @return {?}
     */
    function () {
        this.grid = !this.grid;
        this.changeGrid.emit();
    };
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
    return ContentToolbarComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var BindableTextareaComponent = /** @class */ (function (_super) {
    __extends(BindableTextareaComponent, _super);
    function BindableTextareaComponent() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.btnClick = new EventEmitter();
        _this.autosize = true;
        _this.minRows = 1;
        _this.maxRows = 4;
        return _this;
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
    return BindableTextareaComponent;
}(BindableComponent));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
var moment = momentModule;
var BindableTimepickerComponent = /** @class */ (function (_super) {
    __extends(BindableTimepickerComponent, _super);
    function BindableTimepickerComponent() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.stepMinutes = 30;
        _this.dayStartHour = 8;
        _this.dayEndHour = 19;
        _this.items = [];
        _this.filteredItems = _this.items;
        return _this;
    }
    /**
     * @return {?}
     */
    BindableTimepickerComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        _super.prototype.ngOnInit.call(this);
        this.items = this.generateIntervals();
        this.filteredItems = this.items;
        this.subscription.add(this.valueControl.valueChanges.subscribe((/**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            _this.filteredItems = _this.items.filter((/**
             * @param {?} item
             * @return {?}
             */
            function (item) { return item.startsWith(value); }));
        })));
    };
    /**
     * @return {?}
     */
    BindableTimepickerComponent.prototype.generateIntervals = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var items = [];
        for (var index = this.dayStartHour * 60; index <= this.dayEndHour * 60; index += this.stepMinutes) {
            /** @type {?} */
            var date = new Date(0, 0, 0, 0, index);
            items.push(moment(date).format('h:mm A'));
        }
        return items;
    };
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
    return BindableTimepickerComponent;
}(BindableInputComponent));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var BindableMultiInputComponent = /** @class */ (function (_super) {
    __extends(BindableMultiInputComponent, _super);
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var RngInputsModule = /** @class */ (function () {
    function RngInputsModule() {
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
    return RngInputsModule;
}());

export { BindableCheckboxComponent, BindableComponent, BindableDatepickerComponent, BindableInputComponent, BindableSelectComponent, BindableSelectMultiComponent, BindableTextareaComponent, BindableTimepickerComponent, ContentToolbarComponent, ReactiveControlComponent, ReactiveMatInputComponent, ReactiveMatInputControlComponent, RngErrorStateMatcher, RngInputsModule, SimpleSearchComponent, TypeLabelComponent as ɵa, BindableMultiInputComponent as ɵb, MaterialModule as ɵc };
//# sourceMappingURL=rng-inputs.js.map
