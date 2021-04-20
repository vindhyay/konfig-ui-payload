/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
// this is just a pilot, not tested, WIP
import { FocusMonitor } from '@angular/cdk/a11y';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { Component, ElementRef, Input, Optional, Self, HostBinding } from '@angular/core';
import { FormBuilder, NgControl } from '@angular/forms';
import { MatFormFieldControl } from '@angular/material/form-field';
import { ReactiveControlComponent } from '../reactive-control/reactive-control.component';
var ReactiveMatInputControlComponent = /** @class */ (function (_super) {
    tslib_1.__extends(ReactiveMatInputControlComponent, _super);
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
export { ReactiveMatInputControlComponent };
if (false) {
    /** @type {?} */
    ReactiveMatInputControlComponent.nextId;
    /** @type {?} */
    ReactiveMatInputControlComponent.prototype.describedBy;
    /** @type {?} */
    ReactiveMatInputControlComponent.prototype.id;
    /** @type {?} */
    ReactiveMatInputControlComponent.prototype.parts;
    /** @type {?} */
    ReactiveMatInputControlComponent.prototype.focused;
    /** @type {?} */
    ReactiveMatInputControlComponent.prototype.errorState;
    /** @type {?} */
    ReactiveMatInputControlComponent.prototype.controlType;
    /**
     * @type {?}
     * @private
     */
    ReactiveMatInputControlComponent.prototype._placeholder;
    /**
     * @type {?}
     * @private
     */
    ReactiveMatInputControlComponent.prototype._required;
    /**
     * @type {?}
     * @private
     */
    ReactiveMatInputControlComponent.prototype._focusMonitor;
    /**
     * @type {?}
     * @private
     */
    ReactiveMatInputControlComponent.prototype._elementRef;
    /** @type {?} */
    ReactiveMatInputControlComponent.prototype.ngControl;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVhY3RpdmUtbWF0LWlucHV0LWNvbnRyb2wuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHJuZy9pbnB1dHMvIiwic291cmNlcyI6WyJsaWIvcmVhY3RpdmUtbWF0LWlucHV0LWNvbnRyb2wvcmVhY3RpdmUtbWF0LWlucHV0LWNvbnRyb2wuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUdBLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUNqRCxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUM5RCxPQUFPLEVBQUUsU0FBUyxFQUFFLFVBQVUsRUFBRSxLQUFLLEVBQWEsUUFBUSxFQUFFLElBQUksRUFBRSxXQUFXLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDckcsT0FBTyxFQUFFLFdBQVcsRUFBbUMsU0FBUyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDekYsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sOEJBQThCLENBQUM7QUFDbkUsT0FBTyxFQUFFLHdCQUF3QixFQUFFLE1BQU0sZ0RBQWdELENBQUM7QUFFMUY7SUFXc0QsNERBQXdCO0lBaUM1RSwwQ0FDRSxXQUF3QixFQUVoQixhQUEyQixFQUUzQixXQUFvQyxFQUNqQixTQUFvQjtRQU5qRCxZQU9JLGtCQUFNLFNBQVMsQ0FBQyxTQWFqQjtRQWpCTyxtQkFBYSxHQUFiLGFBQWEsQ0FBYztRQUUzQixpQkFBVyxHQUFYLFdBQVcsQ0FBeUI7UUFDakIsZUFBUyxHQUFULFNBQVMsQ0FBVztRQXhCWCxpQkFBVyxHQUFHLEVBQUUsQ0FBQztRQUVwQyxRQUFFLEdBQUcsb0JBQWtCLGdDQUFnQyxDQUFDLE1BQU0sRUFBSSxDQUFDO1FBdUN0RixhQUFPLEdBQUcsS0FBSyxDQUFDO1FBQ2hCLGdCQUFVLEdBQUcsS0FBSyxDQUFDO1FBQ25CLGlCQUFXLEdBQUcsZ0JBQWdCLENBQUM7O1FBS3ZCLGVBQVMsR0FBRyxLQUFL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LFdBQVcsU0FBQyxJQUFJOzhCQUVoQixLQUFLOzJCQU9MLEtBQUs7O0lBeURSLHVDQUFDO0NBQUEsQUE5RkQsQ0FXc0Qsd0JBQXdCLEdBbUY3RTtTQW5GWSxnQ0FBZ0M7OztJQUczQyx3Q0FBa0I7O0lBWWxCLHVEQUF1RDs7SUFFdkQsOENBQXNGOztJQXNDdEYsaURBQWlCOztJQUNqQixtREFBZ0I7O0lBQ2hCLHNEQUFtQjs7SUFDbkIsdURBQStCOzs7OztJQUcvQix3REFBNkI7Ozs7O0lBRTdCLHFEQUEwQjs7Ozs7SUEzQnhCLHlEQUFtQzs7Ozs7SUFFbkMsdURBQTRDOztJQUM1QyxxREFBK0MiLCJzb3VyY2VzQ29udGVudCI6WyJcbi8vIHRoaXMgaXMganVzdCBhIHBpbG90LCBub3QgdGVzdGVkLCBXSVBcblxuaW1wb3J0IHsgRm9jdXNNb25pdG9yIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2ExMXknO1xuaW1wb3J0IHsgY29lcmNlQm9vbGVhblByb3BlcnR5IH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2NvZXJjaW9uJztcbmltcG9ydCB7IENvbXBvbmVudCwgRWxlbWVudFJlZiwgSW5wdXQsIE9uRGVzdHJveSwgT3B0aW9uYWwsIFNlbGYsIEhvc3RCaW5kaW5nIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBGb3JtQnVpbGRlciwgRm9ybUdyb3VwLCBDb250cm9sVmFsdWVBY2Nlc3NvciwgTmdDb250cm9sIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgTWF0Rm9ybUZpZWxkQ29udHJvbCB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL2Zvcm0tZmllbGQnO1xuaW1wb3J0IHsgUmVhY3RpdmVDb250cm9sQ29tcG9uZW50IH0gZnJvbSAnLi4vcmVhY3RpdmUtY29udHJvbC9yZWFjdGl2ZS1jb250cm9sLmNvbXBvbmVudCc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ3JuZy1yZWFjdGl2ZS1tYXQtaW5wdXQtY29udHJvbCcsXG4gIHRlbXBsYXRlVXJsOiAncmVhY3RpdmUtbWF0LWlucHV0LWNvbnRyb2wuY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsncmVhY3RpdmUtbWF0LWlucHV0LWNvbnRyb2wuY29tcG9uZW50LnNjc3MnXSxcbiAgcHJvdmlkZXJzOiBbXG4gICAge1xuICAgICAgcHJvdmlkZTogTWF0Rm9ybUZpZWxkQ29udHJvbCxcbiAgICAgIHVzZUV4aXN0aW5nOiBSZWFjdGl2ZU1hdElucHV0Q29udHJvbENvbXBvbmVudFxuICAgIH1cbiAgXSxcbn0pXG5leHBvcnQgY2xhc3MgUmVhY3RpdmVNYXRJbnB1dENvbnRyb2xDb21wb25lbnQgZXh0ZW5kcyBSZWFjdGl2ZUNvbnRyb2xDb21wb25lbnRcbiAgaW1wbGVtZW50cyBDb250cm9sVmFsdWVBY2Nlc3NvciwgTWF0Rm9ybUZpZWxkQ29udHJvbDxzdHJpbmc+LCBPbkRlc3Ryb3kge1xuXG4gIHN0YXRpYyBuZXh0SWQgPSAwO1xuXG4gIGdldCBlbXB0eSgpIHtcbiAgICBjb25zdCB7IHZhbHVlIH0gPSB0aGlzLnBhcnRzO1xuICAgIHJldHVybiAhdmFsdWUgfHwgdmFsdWUubGVuZ3RoID09PSAwO1xuICB9XG5cbiAgQEhvc3RCaW5kaW5nKCdjbGFzcy5mbG9hdGluZycpXG4gICAgZ2V0IHNob3VsZExhYmVsRmxvYXQoKSB7XG4gICAgICByZXR1cm4gdGhpcy5mb2N1c2VkIHx8ICF0aGlzLmVtcHR5O1xuICAgIH1cblxuICBASG9zdEJpbmRpbmcoJ2F0dHIuYXJpYS1kZXNjcmliZWRieScpIGRlc2NyaWJlZEJ5ID0gJyc7XG5cbiAgQEhvc3RCaW5kaW5nKCdpZCcpIGlkID0gYHJuZy1ybWZmLWlucHV0LSR7UmVhY3RpdmVNYXRJbnB1dENvbnRyb2xDb21wb25lbnQubmV4dElkKyt9YDtcblxuICBASW5wdXQoKVxuICAgIGdldCBwbGFjZWhvbGRlcigpOiBzdHJpbmcgeyByZXR1cm4gdGhpcy5fcGxhY2Vob2xkZXI7IH1cbiAgICBzZXQgcGxhY2Vob2xkZXIodmFsdWU6IHN0cmluZykge1xuICAgICAgdGhpcy5fcGxhY2Vob2xkZXIgPSB2YWx1ZTtcbiAgICAgIHRoaXMuc3RhdGVDaGFuZ2VzLm5leHQoKTtcbiAgICB9XG5cbiAgQElucHV0KClcbiAgICBnZXQgcmVxdWlyZWQoKTogYm9vbGVhbiB7IHJldHVybiB0aGlzLl9yZXF1aXJlZDsgfVxuICAgIHNldCByZXF1aXJlZCh2YWx1ZTogYm9vbGVhbikge1xuICAgICAgdGhpcy5fcmVxdWlyZWQgPSBjb2VyY2VCb29sZWFuUHJvcGVydHkodmFsdWUpO1xuICAgICAgdGhpcy5zdGF0ZUNoYW5nZXMubmV4dCgpO1xuICAgIH1cblxuICBjb25zdHJ1Y3RvcihcbiAgICBmb3JtQnVpbGRlcjogRm9ybUJ1aWxkZXIsXG4gICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOiB2YXJpYWJsZS1uYW1lXG4gICAgcHJpdmF0ZSBfZm9jdXNNb25pdG9yOiBGb2N1c01vbml0b3IsXG4gICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOiB2YXJpYWJsZS1uYW1lXG4gICAgcHJpdmF0ZSBfZWxlbWVudFJlZjogRWxlbWVudFJlZjxIVE1MRWxlbWVudD4sXG4gICAgQE9wdGlvbmFsKCkgQFNlbGYoKSBwdWJsaWMgbmdDb250cm9sOiBOZ0NvbnRyb2wpIHtcbiAgICAgIHN1cGVyKG5nQ29udHJvbCk7XG5cbiAgICAgIHRoaXMucGFydHMgPSBmb3JtQnVpbGRlci5ncm91cCh7XG4gICAgICAgIHZhbHVlOiAnJyxcbiAgICAgIH0pO1xuXG4gICAgICBfZm9jdXNNb25pdG9yLm1vbml0b3IoX2VsZW1lbnRSZWYsIHRydWUpLnN1YnNjcmliZShvcmlnaW4gPT4ge1xuICAgICAgICBpZiAodGhpcy5mb2N1c2VkICYmICFvcmlnaW4pIHtcbiAgICAgICAgICB0aGlzLm9uVG91Y2hlZCgpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuZm9jdXNlZCA9ICEhb3JpZ2luO1xuICAgICAgICB0aGlzLnN0YXRlQ2hhbmdlcy5uZXh0KCk7XG4gICAgICB9KTtcbiAgICB9XG5cbiAgcGFydHM6IEZvcm1Hcm91cDtcbiAgZm9jdXNlZCA9IGZhbHNlO1xuICBlcnJvclN0YXRlID0gZmFsc2U7XG4gIGNvbnRyb2xUeXBlID0gJ3JuZy1ybWZmLWlucHV0JztcblxuICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6IHZhcmlhYmxlLW5hbWVcbiAgcHJpdmF0ZSBfcGxhY2Vob2xkZXI6IHN0cmluZztcbiAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOiB2YXJpYWJsZS1uYW1lXG4gIHByaXZhdGUgX3JlcXVpcmVkID0gZmFsc2U7XG5cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgc3VwZXIubmdPbkRlc3Ryb3koKTtcbiAgICB0aGlzLl9mb2N1c01vbml0b3Iuc3RvcE1vbml0b3JpbmcodGhpcy5fZWxlbWVudFJlZik7XG4gIH1cblxuICBzZXREZXNjcmliZWRCeUlkcyhpZHM6IHN0cmluZ1tdKSB7XG4gICAgdGhpcy5kZXNjcmliZWRCeSA9IGlkcy5qb2luKCcgJyk7XG4gIH1cblxuICBvbkNvbnRhaW5lckNsaWNrKGV2ZW50OiBNb3VzZUV2ZW50KSB7XG4gICAgaWYgKChldmVudC50YXJnZXQgYXMgRWxlbWVudCkudGFnTmFtZS50b0xvd2VyQ2FzZSgpICE9PSAnaW5wdXQnKSB7XG4gICAgICB0aGlzLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQucXVlcnlTZWxlY3RvcignaW5wdXQnKS5mb2N1cygpO1xuICAgIH1cbiAgfVxuXG4gIF9oYW5kbGVJbnB1dCgpOiB2b2lkIHtcbiAgICB0aGlzLm9uQ2hhbmdlKHRoaXMucGFydHMudmFsdWUpO1xuICB9XG59XG4iXX0=