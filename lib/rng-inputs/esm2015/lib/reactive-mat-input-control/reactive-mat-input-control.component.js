/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
// this is just a pilot, not tested, WIP
import { FocusMonitor } from '@angular/cdk/a11y';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { Component, ElementRef, Input, Optional, Self, HostBinding } from '@angular/core';
import { FormBuilder, NgControl } from '@angular/forms';
import { MatFormFieldControl } from '@angular/material/form-field';
import { ReactiveControlComponent } from '../reactive-control/reactive-control.component';
export class ReactiveMatInputControlComponent extends ReactiveControlComponent {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVhY3RpdmUtbWF0LWlucHV0LWNvbnRyb2wuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHJuZy9pbnB1dHMvIiwic291cmNlcyI6WyJsaWIvcmVhY3RpdmUtbWF0LWlucHV0LWNvbnRyb2wvcmVhY3RpdmUtbWF0LWlucHV0LWNvbnRyb2wuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBR0EsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQ2pELE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQzlELE9BQU8sRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLEtBQUssRUFBYSxRQUFRLEVBQUUsSUFBSSxFQUFFLFdBQVcsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNyRyxPQUFPLEVBQUUsV0FBVyxFQUFtQyxTQUFTLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUN6RixPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSw4QkFBOEIsQ0FBQztBQUNuRSxPQUFPLEVBQUUsd0JBQXdCLEVBQUUsTUFBTSxnREFBZ0QsQ0FBQztBQWExRixNQUFNLE9BQU8sZ0NBQWlDLFNBQVEsd0JBQXdCOzs7Ozs7O0lBaUM1RSxZQUNFLFdBQXdCLEVBRWhCLGFBQTJCLEVBRTNCLFdBQW9DLEVBQ2pCLFNBQW9CO1FBQzdDLEtBQUssQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUpYLGtCQUFhLEdBQWIsYUFBYSxDQUFjO1FBRTNCLGdCQUFXLEdBQVgsV0FBVyxDQUF5QjtRQUNqQixjQUFTLEdBQVQsU0FBUyxDQUFXO1FBeEJYLGdCQUFXLEdBQUcsRUFBRSxDQUFDO1FBRXBDLE9BQUUsR0FBRyxrQkFBa0IsZ0NBQWdDLENBQUMsTUFBTSxFQUFFLEVBQUUsQ0FBQztRQXVDdEYsWUFBTyxHQUFHLEtBQUssQ0FBQztRQUNoQixlQUFVLEdBQUcsS0FBSyxDQUFDO1FBQ25CLGdCQUFXLEdBQUcsZ0JBQWdCLENBQUM7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QU9MLEtBQUs7Ozs7SUF2Qk4sd0NBQWtCOztJQVlsQix1REFBdUQ7O0lBRXZELDhDQUFzRjs7SUFzQ3RGLGlEQUFpQjs7SUFDakIsbURBQWdCOztJQUNoQixzREFBbUI7O0lBQ25CLHVEQUErQjs7Ozs7SUFHL0Isd0RBQTZCOzs7OztJQUU3QixxREFBMEI7Ozs7O0lBM0J4Qix5REFBbUM7Ozs7O0lBRW5DLHVEQUE0Qzs7SUFDNUMscURBQStDIiwic291cmNlc0NvbnRlbnQiOlsiXG4vLyB0aGlzIGlzIGp1c3QgYSBwaWxvdCwgbm90IHRlc3RlZCwgV0lQXG5cbmltcG9ydCB7IEZvY3VzTW9uaXRvciB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9hMTF5JztcbmltcG9ydCB7IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9jb2VyY2lvbic7XG5pbXBvcnQgeyBDb21wb25lbnQsIEVsZW1lbnRSZWYsIElucHV0LCBPbkRlc3Ryb3ksIE9wdGlvbmFsLCBTZWxmLCBIb3N0QmluZGluZyB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRm9ybUJ1aWxkZXIsIEZvcm1Hcm91cCwgQ29udHJvbFZhbHVlQWNjZXNzb3IsIE5nQ29udHJvbCB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IE1hdEZvcm1GaWVsZENvbnRyb2wgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9mb3JtLWZpZWxkJztcbmltcG9ydCB7IFJlYWN0aXZlQ29udHJvbENvbXBvbmVudCB9IGZyb20gJy4uL3JlYWN0aXZlLWNvbnRyb2wvcmVhY3RpdmUtY29udHJvbC5jb21wb25lbnQnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdybmctcmVhY3RpdmUtbWF0LWlucHV0LWNvbnRyb2wnLFxuICB0ZW1wbGF0ZVVybDogJ3JlYWN0aXZlLW1hdC1pbnB1dC1jb250cm9sLmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJ3JlYWN0aXZlLW1hdC1pbnB1dC1jb250cm9sLmNvbXBvbmVudC5zY3NzJ10sXG4gIHByb3ZpZGVyczogW1xuICAgIHtcbiAgICAgIHByb3ZpZGU6IE1hdEZvcm1GaWVsZENvbnRyb2wsXG4gICAgICB1c2VFeGlzdGluZzogUmVhY3RpdmVNYXRJbnB1dENvbnRyb2xDb21wb25lbnRcbiAgICB9XG4gIF0sXG59KVxuZXhwb3J0IGNsYXNzIFJlYWN0aXZlTWF0SW5wdXRDb250cm9sQ29tcG9uZW50IGV4dGVuZHMgUmVhY3RpdmVDb250cm9sQ29tcG9uZW50XG4gIGltcGxlbWVudHMgQ29udHJvbFZhbHVlQWNjZXNzb3IsIE1hdEZvcm1GaWVsZENvbnRyb2w8c3RyaW5nPiwgT25EZXN0cm95IHtcblxuICBzdGF0aWMgbmV4dElkID0gMDtcblxuICBnZXQgZW1wdHkoKSB7XG4gICAgY29uc3QgeyB2YWx1ZSB9ID0gdGhpcy5wYXJ0cztcbiAgICByZXR1cm4gIXZhbHVlIHx8IHZhbHVlLmxlbmd0aCA9PT0gMDtcbiAgfVxuXG4gIEBIb3N0QmluZGluZygnY2xhc3MuZmxvYXRpbmcnKVxuICAgIGdldCBzaG91bGRMYWJlbEZsb2F0KCkge1xuICAgICAgcmV0dXJuIHRoaXMuZm9jdXNlZCB8fCAhdGhpcy5lbXB0eTtcbiAgICB9XG5cbiAgQEhvc3RCaW5kaW5nKCdhdHRyLmFyaWEtZGVzY3JpYmVkYnknKSBkZXNjcmliZWRCeSA9ICcnO1xuXG4gIEBIb3N0QmluZGluZygnaWQnKSBpZCA9IGBybmctcm1mZi1pbnB1dC0ke1JlYWN0aXZlTWF0SW5wdXRDb250cm9sQ29tcG9uZW50Lm5leHRJZCsrfWA7XG5cbiAgQElucHV0KClcbiAgICBnZXQgcGxhY2Vob2xkZXIoKTogc3RyaW5nIHsgcmV0dXJuIHRoaXMuX3BsYWNlaG9sZGVyOyB9XG4gICAgc2V0IHBsYWNlaG9sZGVyKHZhbHVlOiBzdHJpbmcpIHtcbiAgICAgIHRoaXMuX3BsYWNlaG9sZGVyID0gdmFsdWU7XG4gICAgICB0aGlzLnN0YXRlQ2hhbmdlcy5uZXh0KCk7XG4gICAgfVxuXG4gIEBJbnB1dCgpXG4gICAgZ2V0IHJlcXVpcmVkKCk6IGJvb2xlYW4geyByZXR1cm4gdGhpcy5fcmVxdWlyZWQ7IH1cbiAgICBzZXQgcmVxdWlyZWQodmFsdWU6IGJvb2xlYW4pIHtcbiAgICAgIHRoaXMuX3JlcXVpcmVkID0gY29lcmNlQm9vbGVhblByb3BlcnR5KHZhbHVlKTtcbiAgICAgIHRoaXMuc3RhdGVDaGFuZ2VzLm5leHQoKTtcbiAgICB9XG5cbiAgY29uc3RydWN0b3IoXG4gICAgZm9ybUJ1aWxkZXI6IEZvcm1CdWlsZGVyLFxuICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTogdmFyaWFibGUtbmFtZVxuICAgIHByaXZhdGUgX2ZvY3VzTW9uaXRvcjogRm9jdXNNb25pdG9yLFxuICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTogdmFyaWFibGUtbmFtZVxuICAgIHByaXZhdGUgX2VsZW1lbnRSZWY6IEVsZW1lbnRSZWY8SFRNTEVsZW1lbnQ+LFxuICAgIEBPcHRpb25hbCgpIEBTZWxmKCkgcHVibGljIG5nQ29udHJvbDogTmdDb250cm9sKSB7XG4gICAgICBzdXBlcihuZ0NvbnRyb2wpO1xuXG4gICAgICB0aGlzLnBhcnRzID0gZm9ybUJ1aWxkZXIuZ3JvdXAoe1xuICAgICAgICB2YWx1ZTogJycsXG4gICAgICB9KTtcblxuICAgICAgX2ZvY3VzTW9uaXRvci5tb25pdG9yKF9lbGVtZW50UmVmLCB0cnVlKS5zdWJzY3JpYmUob3JpZ2luID0+IHtcbiAgICAgICAgaWYgKHRoaXMuZm9jdXNlZCAmJiAhb3JpZ2luKSB7XG4gICAgICAgICAgdGhpcy5vblRvdWNoZWQoKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmZvY3VzZWQgPSAhIW9yaWdpbjtcbiAgICAgICAgdGhpcy5zdGF0ZUNoYW5nZXMubmV4dCgpO1xuICAgICAgfSk7XG4gICAgfVxuXG4gIHBhcnRzOiBGb3JtR3JvdXA7XG4gIGZvY3VzZWQgPSBmYWxzZTtcbiAgZXJyb3JTdGF0ZSA9IGZhbHNlO1xuICBjb250cm9sVHlwZSA9ICdybmctcm1mZi1pbnB1dCc7XG5cbiAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOiB2YXJpYWJsZS1uYW1lXG4gIHByaXZhdGUgX3BsYWNlaG9sZGVyOiBzdHJpbmc7XG4gIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTogdmFyaWFibGUtbmFtZVxuICBwcml2YXRlIF9yZXF1aXJlZCA9IGZhbHNlO1xuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIHN1cGVyLm5nT25EZXN0cm95KCk7XG4gICAgdGhpcy5fZm9jdXNNb25pdG9yLnN0b3BNb25pdG9yaW5nKHRoaXMuX2VsZW1lbnRSZWYpO1xuICB9XG5cbiAgc2V0RGVzY3JpYmVkQnlJZHMoaWRzOiBzdHJpbmdbXSkge1xuICAgIHRoaXMuZGVzY3JpYmVkQnkgPSBpZHMuam9pbignICcpO1xuICB9XG5cbiAgb25Db250YWluZXJDbGljayhldmVudDogTW91c2VFdmVudCkge1xuICAgIGlmICgoZXZlbnQudGFyZ2V0IGFzIEVsZW1lbnQpLnRhZ05hbWUudG9Mb3dlckNhc2UoKSAhPT0gJ2lucHV0Jykge1xuICAgICAgdGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJ2lucHV0JykuZm9jdXMoKTtcbiAgICB9XG4gIH1cblxuICBfaGFuZGxlSW5wdXQoKTogdm9pZCB7XG4gICAgdGhpcy5vbkNoYW5nZSh0aGlzLnBhcnRzLnZhbHVlKTtcbiAgfVxufVxuIl19