/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input, Output, EventEmitter } from '@angular/core';
export class IconLabelButtonComponent {
    constructor() {
        this.buttonClick = new EventEmitter();
    }
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaWNvbi1sYWJlbC1idXR0b24uY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHJuZy9idXR0b25zLyIsInNvdXJjZXMiOlsibGliL2ljb24tbGFiZWwtYnV0dG9uL2ljb24tbGFiZWwtYnV0dG9uLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLFlBQVksRUFBRSxNQUFNLGVBQWUsQ0FBQztBQU92RSxNQUFNLE9BQU8sd0JBQXdCO0lBTHJDO1FBV1ksZ0JBQVcsR0FBRyxJQUFJLFlBQVksRUFBRSxDQUFDO0lBQzdDLENBQUM7OztZQVpBLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsdUJBQXVCO2dCQUNqQyw4S0FBaUQ7YUFFbEQ7Ozt3QkFHRSxLQUFLO29CQUNMLEtBQUs7dUJBQ0wsS0FBSzswQkFFTCxNQUFNOzs7O0lBSlAsNkNBQTJCOztJQUMzQix5Q0FBdUI7O0lBQ3ZCLDRDQUFtQzs7SUFFbkMsK0NBQTJDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCwgT3V0cHV0LCBFdmVudEVtaXR0ZXIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAncm5nLWljb24tbGFiZWwtYnV0dG9uJyxcbiAgdGVtcGxhdGVVcmw6ICcuL2ljb24tbGFiZWwtYnV0dG9uLmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbXVxufSlcbmV4cG9ydCBjbGFzcyBJY29uTGFiZWxCdXR0b25Db21wb25lbnQge1xuXG4gIEBJbnB1dCgpIGljb25DbGFzczogc3RyaW5nOyAvLyBybmctaWNvbiBybmctaWNvbi1hZGRfY2lyY2xlXG4gIEBJbnB1dCgpIGxhYmVsOiBzdHJpbmc7XG4gIEBJbnB1dCgpIGRpc2FibGVkOiBib29sZWFuIHwgZmFsc2U7XG5cbiAgQE91dHB1dCgpIGJ1dHRvbkNsaWNrID0gbmV3IEV2ZW50RW1pdHRlcigpO1xufVxuIl19