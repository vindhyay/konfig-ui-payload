/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Optional, Self, Input } from '@angular/core';
import { BindableInputComponent } from '../bindable-input/bindable-input.component';
import { NgControl } from '@angular/forms';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { map } from 'rxjs/operators';
export class BindableDatepickerComponent extends BindableInputComponent {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmluZGFibGUtZGF0ZXBpY2tlci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Acm5nL2lucHV0cy8iLCJzb3VyY2VzIjpbImxpYi9iaW5kYWJsZS1kYXRlcGlja2VyL2JpbmRhYmxlLWRhdGVwaWNrZXIuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ2pFLE9BQU8sRUFBRSxzQkFBc0IsRUFBRSxNQUFNLDRDQUE0QyxDQUFDO0FBRXBGLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUUzQyxPQUFPLEVBQUUsV0FBVyxFQUFFLGtCQUFrQixFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDdEUsT0FBTyxFQUFFLEdBQUcsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBT3JDLE1BQU0sT0FBTywyQkFDWCxTQUFRLHNCQUFzQjs7Ozs7SUFROUIsWUFDNkIsU0FBb0IsRUFDdkMsa0JBQXNDO1FBQzlDLEtBQUssQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUZVLGNBQVMsR0FBVCxTQUFTLENBQVc7UUFDdkMsdUJBQWtCLEdBQWxCLGtCQUFrQixDQUFvQjtRQVJ2QyxZQUFPLEdBQW1CLEtBQUssQ0FBQztRQUV6QyxlQUFVLEdBQXdCLElBQUksQ0FBQyxrQkFBa0I7YUFDdEQsT0FBTyxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUM7YUFDNUIsSUFBSSxDQUFDLEdBQUc7Ozs7UUFBQyxNQUFNLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUMsQ0FBQyxDQUFDO1FBTXJDLElBQUksQ0FBQyxTQUFTLG9CQUFrQixDQUFDO0lBQ25DLENBQUM7Ozs7OztJQUVTLGNBQWMsQ0FBQyxHQUFRO1FBQy9CLE9BQU8sSUFBSSxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksR0FBRyxDQUFDO0lBQzlCLENBQUM7OztZQXZCRixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLHlCQUF5QjtnQkFDbkMsMHNCQUFtRDthQUVwRDs7OztZQVRRLFNBQVMsdUJBb0JiLFFBQVEsWUFBSSxJQUFJO1lBbEJDLGtCQUFrQjs7O3NCQVdyQyxLQUFLOzs7O0lBQU4sOENBQXlDOztJQUV6QyxpREFFdUM7O0lBR3JDLGdEQUErQzs7Ozs7SUFDL0MseURBQThDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPcHRpb25hbCwgU2VsZiwgSW5wdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEJpbmRhYmxlSW5wdXRDb21wb25lbnQgfSBmcm9tICcuLi9iaW5kYWJsZS1pbnB1dC9iaW5kYWJsZS1pbnB1dC5jb21wb25lbnQnO1xuaW1wb3J0IHsgVkFMVUVfVFlQRSB9IGZyb20gJy4uL2JpbmRhYmxlL2JpbmRhYmxlLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBOZ0NvbnRyb2wgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBCcmVha3BvaW50cywgQnJlYWtwb2ludE9ic2VydmVyIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2xheW91dCc7XG5pbXBvcnQgeyBtYXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ3JuZy1iaW5kYWJsZS1kYXRlcGlja2VyJyxcbiAgdGVtcGxhdGVVcmw6ICcuL2JpbmRhYmxlLWRhdGVwaWNrZXIuY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFtdXG59KVxuZXhwb3J0IGNsYXNzIEJpbmRhYmxlRGF0ZXBpY2tlckNvbXBvbmVudFxuICBleHRlbmRzIEJpbmRhYmxlSW5wdXRDb21wb25lbnQge1xuXG4gIEBJbnB1dCgpIHRvdWNoVWk6IGJvb2xlYW4gfCBudWxsID0gZmFsc2U7XG5cbiAgaXNIYW5kc2V0JDogT2JzZXJ2YWJsZTxib29sZWFuPiA9IHRoaXMuYnJlYWtwb2ludE9ic2VydmVyXG4gICAgLm9ic2VydmUoQnJlYWtwb2ludHMuSGFuZHNldClcbiAgICAucGlwZShtYXAocmVzdWx0ID0+IHJlc3VsdC5tYXRjaGVzKSk7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgQE9wdGlvbmFsKCkgQFNlbGYoKSBwdWJsaWMgbmdDb250cm9sOiBOZ0NvbnRyb2wsXG4gICAgcHJpdmF0ZSBicmVha3BvaW50T2JzZXJ2ZXI6IEJyZWFrcG9pbnRPYnNlcnZlcikge1xuICAgIHN1cGVyKG5nQ29udHJvbCk7XG4gICAgdGhpcy52YWx1ZVR5cGUgPSBWQUxVRV9UWVBFLkRBVEU7XG4gIH1cblxuICBwcm90ZWN0ZWQgdmFsdWVDb252ZXJ0ZXIodmFsOiBhbnkpOiBhbnkge1xuICAgIHJldHVybiBuZXcgRGF0ZSh2YWwpIHx8IHZhbDtcbiAgfVxufVxuIl19