/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Component, Optional, Self, Input } from '@angular/core';
import { ReactiveControlComponent } from '../reactive-control/reactive-control.component';
import { NgControl } from '@angular/forms';
var ReactiveMatInputComponent = /** @class */ (function (_super) {
    tslib_1.__extends(ReactiveMatInputComponent, _super);
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
export { ReactiveMatInputComponent };
if (false) {
    /** @type {?} */
    ReactiveMatInputComponent.prototype.label;
    /** @type {?} */
    ReactiveMatInputComponent.prototype.appearance;
    /** @type {?} */
    ReactiveMatInputComponent.prototype.ngControl;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVhY3RpdmUtbWF0LWlucHV0LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BybmcvaW5wdXRzLyIsInNvdXJjZXMiOlsibGliL3JlYWN0aXZlLW1hdC1pbnB1dC9yZWFjdGl2ZS1tYXQtaW5wdXQuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNqRSxPQUFPLEVBQUUsd0JBQXdCLEVBQUUsTUFBTSxnREFBZ0QsQ0FBQztBQUMxRixPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFFM0M7SUFLK0MscURBQXdCO0lBS3JFLG1DQUF1QyxTQUFvQjtRQUEzRCxZQUNFLGtCQUFNLFNBQVMsQ0FBQyxTQUNqQjtRQUZzQyxlQUFTLEdBQVQsU0FBUyxDQUFXOztJQUUzRCxDQUFDOztnQkFaRixTQUFTLFNBQUM7b0JBQ1QsUUFBUSxFQUFFLHdCQUF3QjtvQkFDbEMsMExBQWtEOztpQkFFbkQ7Ozs7Z0JBTlEsU0FBUyx1QkFZSCxRQUFRLFlBQUksSUFBSTs7O3dCQUg1QixLQUFLOzZCQUNMLEtBQUs7O0lBS1IsZ0NBQUM7Q0FBQSxBQWJELENBSytDLHdCQUF3QixHQVF0RTtTQVJZLHlCQUF5Qjs7O0lBRXBDLDBDQUE4Qjs7SUFDOUIsK0NBQW1DOztJQUV2Qiw4Q0FBK0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9wdGlvbmFsLCBTZWxmLCBJbnB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgUmVhY3RpdmVDb250cm9sQ29tcG9uZW50IH0gZnJvbSAnLi4vcmVhY3RpdmUtY29udHJvbC9yZWFjdGl2ZS1jb250cm9sLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBOZ0NvbnRyb2wgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ3JuZy1yZWFjdGl2ZS1tYXQtaW5wdXQnLFxuICB0ZW1wbGF0ZVVybDogJy4vcmVhY3RpdmUtbWF0LWlucHV0LmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vcmVhY3RpdmUtbWF0LWlucHV0LmNvbXBvbmVudC5zY3NzJ11cbn0pXG5leHBvcnQgY2xhc3MgUmVhY3RpdmVNYXRJbnB1dENvbXBvbmVudCBleHRlbmRzIFJlYWN0aXZlQ29udHJvbENvbXBvbmVudCB7XG5cbiAgQElucHV0KCkgbGFiZWw6IHN0cmluZyB8IG51bGw7XG4gIEBJbnB1dCgpIGFwcGVhcmFuY2U6IHN0cmluZyB8IG51bGw7XG5cbiAgY29uc3RydWN0b3IoQE9wdGlvbmFsKCkgQFNlbGYoKSBwdWJsaWMgbmdDb250cm9sOiBOZ0NvbnRyb2wpIHtcbiAgICBzdXBlcihuZ0NvbnRyb2wpO1xuICB9XG59XG4iXX0=