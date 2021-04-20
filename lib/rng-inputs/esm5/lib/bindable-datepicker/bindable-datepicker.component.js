/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Component, Optional, Self, Input } from '@angular/core';
import { BindableInputComponent } from '../bindable-input/bindable-input.component';
import { NgControl } from '@angular/forms';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { map } from 'rxjs/operators';
var BindableDatepickerComponent = /** @class */ (function (_super) {
    tslib_1.__extends(BindableDatepickerComponent, _super);
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
export { BindableDatepickerComponent };
if (false) {
    /** @type {?} */
    BindableDatepickerComponent.prototype.touchUi;
    /** @type {?} */
    BindableDatepickerComponent.prototype.isHandset$;
    /** @type {?} */
    BindableDatepickerComponent.prototype.ngControl;
    /**
     * @type {?}
     * @private
     */
    BindableDatepickerComponent.prototype.breakpointObserver;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmluZGFibGUtZGF0ZXBpY2tlci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Acm5nL2lucHV0cy8iLCJzb3VyY2VzIjpbImxpYi9iaW5kYWJsZS1kYXRlcGlja2VyL2JpbmRhYmxlLWRhdGVwaWNrZXIuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNqRSxPQUFPLEVBQUUsc0JBQXNCLEVBQUUsTUFBTSw0Q0FBNEMsQ0FBQztBQUVwRixPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFFM0MsT0FBTyxFQUFFLFdBQVcsRUFBRSxrQkFBa0IsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQ3RFLE9BQU8sRUFBRSxHQUFHLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUVyQztJQU1VLHVEQUFzQjtJQVE5QixxQ0FDNkIsU0FBb0IsRUFDdkMsa0JBQXNDO1FBRmhELFlBR0Usa0JBQU0sU0FBUyxDQUFDLFNBRWpCO1FBSjRCLGVBQVMsR0FBVCxTQUFTLENBQVc7UUFDdkMsd0JBQWtCLEdBQWxCLGtCQUFrQixDQUFvQjtRQVJ2QyxhQUFPLEdBQW1CLEtBQUssQ0FBQztRQUV6QyxnQkFBVSxHQUF3QixLQUFJLENBQUMsa0JBQWtCO2FBQ3RELE9BQU8sQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDO2FBQzVCLElBQUksQ0FBQyxHQUFHOzs7O1FBQUMsVUFBQSxNQUFNLElBQUksT0FBQSxNQUFNLENBQUMsT0FBTyxFQUFkLENBQWMsRUFBQyxDQUFDLENBQUM7UUFNckMsS0FBSSxDQUFDLFNBQVMsb0JBQWtCLENBQUM7O0lBQ25DLENBQUM7Ozs7OztJQUVTLG9EQUFjOzs7OztJQUF4QixVQUF5QixHQUFRO1FBQy9CLE9BQU8sSUFBSSxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksR0FBRyxDQUFDO0lBQzlCLENBQUM7O2dCQXZCRixTQUFTLFNBQUM7b0JBQ1QsUUFBUSxFQUFFLHlCQUF5QjtvQkFDbkMsMHNCQUFtRDtpQkFFcEQ7Ozs7Z0JBVFEsU0FBUyx1QkFvQmIsUUFBUSxZQUFJLElBQUk7Z0JBbEJDLGtCQUFrQjs7OzBCQVdyQyxLQUFLOztJQWdCUixrQ0FBQztDQUFBLEFBeEJELENBTVUsc0JBQXNCLEdBa0IvQjtTQW5CWSwyQkFBMkI7OztJQUd0Qyw4Q0FBeUM7O0lBRXpDLGlEQUV1Qzs7SUFHckMsZ0RBQStDOzs7OztJQUMvQyx5REFBOEMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9wdGlvbmFsLCBTZWxmLCBJbnB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQmluZGFibGVJbnB1dENvbXBvbmVudCB9IGZyb20gJy4uL2JpbmRhYmxlLWlucHV0L2JpbmRhYmxlLWlucHV0LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBWQUxVRV9UWVBFIH0gZnJvbSAnLi4vYmluZGFibGUvYmluZGFibGUuY29tcG9uZW50JztcbmltcG9ydCB7IE5nQ29udHJvbCB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IEJyZWFrcG9pbnRzLCBCcmVha3BvaW50T2JzZXJ2ZXIgfSBmcm9tICdAYW5ndWxhci9jZGsvbGF5b3V0JztcbmltcG9ydCB7IG1hcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAncm5nLWJpbmRhYmxlLWRhdGVwaWNrZXInLFxuICB0ZW1wbGF0ZVVybDogJy4vYmluZGFibGUtZGF0ZXBpY2tlci5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogW11cbn0pXG5leHBvcnQgY2xhc3MgQmluZGFibGVEYXRlcGlja2VyQ29tcG9uZW50XG4gIGV4dGVuZHMgQmluZGFibGVJbnB1dENvbXBvbmVudCB7XG5cbiAgQElucHV0KCkgdG91Y2hVaTogYm9vbGVhbiB8IG51bGwgPSBmYWxzZTtcblxuICBpc0hhbmRzZXQkOiBPYnNlcnZhYmxlPGJvb2xlYW4+ID0gdGhpcy5icmVha3BvaW50T2JzZXJ2ZXJcbiAgICAub2JzZXJ2ZShCcmVha3BvaW50cy5IYW5kc2V0KVxuICAgIC5waXBlKG1hcChyZXN1bHQgPT4gcmVzdWx0Lm1hdGNoZXMpKTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBAT3B0aW9uYWwoKSBAU2VsZigpIHB1YmxpYyBuZ0NvbnRyb2w6IE5nQ29udHJvbCxcbiAgICBwcml2YXRlIGJyZWFrcG9pbnRPYnNlcnZlcjogQnJlYWtwb2ludE9ic2VydmVyKSB7XG4gICAgc3VwZXIobmdDb250cm9sKTtcbiAgICB0aGlzLnZhbHVlVHlwZSA9IFZBTFVFX1RZUEUuREFURTtcbiAgfVxuXG4gIHByb3RlY3RlZCB2YWx1ZUNvbnZlcnRlcih2YWw6IGFueSk6IGFueSB7XG4gICAgcmV0dXJuIG5ldyBEYXRlKHZhbCkgfHwgdmFsO1xuICB9XG59XG4iXX0=