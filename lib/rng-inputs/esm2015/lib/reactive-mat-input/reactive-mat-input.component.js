/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Optional, Self, Input } from '@angular/core';
import { ReactiveControlComponent } from '../reactive-control/reactive-control.component';
import { NgControl } from '@angular/forms';
export class ReactiveMatInputComponent extends ReactiveControlComponent {
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
if (false) {
    /** @type {?} */
    ReactiveMatInputComponent.prototype.label;
    /** @type {?} */
    ReactiveMatInputComponent.prototype.appearance;
    /** @type {?} */
    ReactiveMatInputComponent.prototype.ngControl;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVhY3RpdmUtbWF0LWlucHV0LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BybmcvaW5wdXRzLyIsInNvdXJjZXMiOlsibGliL3JlYWN0aXZlLW1hdC1pbnB1dC9yZWFjdGl2ZS1tYXQtaW5wdXQuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ2pFLE9BQU8sRUFBRSx3QkFBd0IsRUFBRSxNQUFNLGdEQUFnRCxDQUFDO0FBQzFGLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQU8zQyxNQUFNLE9BQU8seUJBQTBCLFNBQVEsd0JBQXdCOzs7O0lBS3JFLFlBQXVDLFNBQW9CO1FBQ3pELEtBQUssQ0FBQyxTQUFTLENBQUMsQ0FBQztRQURvQixjQUFTLEdBQVQsU0FBUyxDQUFXO0lBRTNELENBQUM7OztZQVpGLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsd0JBQXdCO2dCQUNsQywwTEFBa0Q7O2FBRW5EOzs7O1lBTlEsU0FBUyx1QkFZSCxRQUFRLFlBQUksSUFBSTs7O29CQUg1QixLQUFLO3lCQUNMLEtBQUs7Ozs7SUFETiwwQ0FBOEI7O0lBQzlCLCtDQUFtQzs7SUFFdkIsOENBQStDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPcHRpb25hbCwgU2VsZiwgSW5wdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFJlYWN0aXZlQ29udHJvbENvbXBvbmVudCB9IGZyb20gJy4uL3JlYWN0aXZlLWNvbnRyb2wvcmVhY3RpdmUtY29udHJvbC5jb21wb25lbnQnO1xuaW1wb3J0IHsgTmdDb250cm9sIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdybmctcmVhY3RpdmUtbWF0LWlucHV0JyxcbiAgdGVtcGxhdGVVcmw6ICcuL3JlYWN0aXZlLW1hdC1pbnB1dC5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL3JlYWN0aXZlLW1hdC1pbnB1dC5jb21wb25lbnQuc2NzcyddXG59KVxuZXhwb3J0IGNsYXNzIFJlYWN0aXZlTWF0SW5wdXRDb21wb25lbnQgZXh0ZW5kcyBSZWFjdGl2ZUNvbnRyb2xDb21wb25lbnQge1xuXG4gIEBJbnB1dCgpIGxhYmVsOiBzdHJpbmcgfCBudWxsO1xuICBASW5wdXQoKSBhcHBlYXJhbmNlOiBzdHJpbmcgfCBudWxsO1xuXG4gIGNvbnN0cnVjdG9yKEBPcHRpb25hbCgpIEBTZWxmKCkgcHVibGljIG5nQ29udHJvbDogTmdDb250cm9sKSB7XG4gICAgc3VwZXIobmdDb250cm9sKTtcbiAgfVxufVxuIl19