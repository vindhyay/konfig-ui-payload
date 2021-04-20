/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input, Output, EventEmitter } from '@angular/core';
var IconLabelButtonComponent = /** @class */ (function () {
    function IconLabelButtonComponent() {
        this.buttonClick = new EventEmitter();
    }
    IconLabelButtonComponent.decorators = [
        { type: Component, args: [{
                    selector: 'rng-icon-label-button',
                    template: "<button mat-icon-button \n  [disabled]=\"disabled\"\n  (click)=\"buttonClick.emit($event)\">\n  <i [class]=\"iconClass\"></i>\n</button>\n<span>{{label}}</span>\n"
                }] }
    ];
    IconLabelButtonComponent.propDecorators = {
        iconClass: [{ type: Input }],
        label: [{ type: Input }],
        disabled: [{ type: Input }],
        buttonClick: [{ type: Output }]
    };
    return IconLabelButtonComponent;
}());
export { IconLabelButtonComponent };
if (false) {
    /** @type {?} */
    IconLabelButtonComponent.prototype.iconClass;
    /** @type {?} */
    IconLabelButtonComponent.prototype.label;
    /** @type {?} */
    IconLabelButtonComponent.prototype.disabled;
    /** @type {?} */
    IconLabelButtonComponent.prototype.buttonClick;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaWNvbi1sYWJlbC1idXR0b24uY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHJuZy9idXR0b25zLyIsInNvdXJjZXMiOlsibGliL2ljb24tbGFiZWwtYnV0dG9uL2ljb24tbGFiZWwtYnV0dG9uLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLFlBQVksRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUV2RTtJQUFBO1FBV1ksZ0JBQVcsR0FBRyxJQUFJLFlBQVksRUFBRSxDQUFDO0lBQzdDLENBQUM7O2dCQVpBLFNBQVMsU0FBQztvQkFDVCxRQUFRLEVBQUUsdUJBQXVCO29CQUNqQyw4S0FBaUQ7aUJBRWxEOzs7NEJBR0UsS0FBSzt3QkFDTCxLQUFLOzJCQUNMLEtBQUs7OEJBRUwsTUFBTTs7SUFDVCwrQkFBQztDQUFBLEFBWkQsSUFZQztTQVBZLHdCQUF3Qjs7O0lBRW5DLDZDQUEyQjs7SUFDM0IseUNBQXVCOztJQUN2Qiw0Q0FBbUM7O0lBRW5DLCtDQUEyQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQsIE91dHB1dCwgRXZlbnRFbWl0dGVyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ3JuZy1pY29uLWxhYmVsLWJ1dHRvbicsXG4gIHRlbXBsYXRlVXJsOiAnLi9pY29uLWxhYmVsLWJ1dHRvbi5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogW11cbn0pXG5leHBvcnQgY2xhc3MgSWNvbkxhYmVsQnV0dG9uQ29tcG9uZW50IHtcblxuICBASW5wdXQoKSBpY29uQ2xhc3M6IHN0cmluZzsgLy8gcm5nLWljb24gcm5nLWljb24tYWRkX2NpcmNsZVxuICBASW5wdXQoKSBsYWJlbDogc3RyaW5nO1xuICBASW5wdXQoKSBkaXNhYmxlZDogYm9vbGVhbiB8IGZhbHNlO1xuXG4gIEBPdXRwdXQoKSBidXR0b25DbGljayA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbn1cbiJdfQ==