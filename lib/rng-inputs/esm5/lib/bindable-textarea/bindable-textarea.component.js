/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Component, EventEmitter, Output, Input } from '@angular/core';
import { BindableComponent } from '../bindable/bindable.component';
var BindableTextareaComponent = /** @class */ (function (_super) {
    tslib_1.__extends(BindableTextareaComponent, _super);
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
export { BindableTextareaComponent };
if (false) {
    /** @type {?} */
    BindableTextareaComponent.prototype.btnClick;
    /** @type {?} */
    BindableTextareaComponent.prototype.btnIconCSS;
    /** @type {?} */
    BindableTextareaComponent.prototype.autosize;
    /** @type {?} */
    BindableTextareaComponent.prototype.minRows;
    /** @type {?} */
    BindableTextareaComponent.prototype.maxRows;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmluZGFibGUtdGV4dGFyZWEuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHJuZy9pbnB1dHMvIiwic291cmNlcyI6WyJsaWIvYmluZGFibGUtdGV4dGFyZWEvYmluZGFibGUtdGV4dGFyZWEuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxZQUFZLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBZ0IsTUFBTSxlQUFlLENBQUM7QUFDckYsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sZ0NBQWdDLENBQUM7QUFHbkU7SUFLK0MscURBQWlCO0lBTGhFO1FBQUEscUVBV0M7UUFMVyxjQUFRLEdBQUcsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUUvQixjQUFRLEdBQW1CLElBQUksQ0FBQztRQUNoQyxhQUFPLEdBQWtCLENBQUMsQ0FBQztRQUMzQixhQUFPLEdBQWtCLENBQUMsQ0FBQzs7SUFDdEMsQ0FBQzs7Z0JBWEEsU0FBUyxTQUFDO29CQUNULFFBQVEsRUFBRSx1QkFBdUI7b0JBQ2pDLDZ5QkFBaUQ7O2lCQUVsRDs7OzJCQUVFLE1BQU07NkJBQ04sS0FBSzsyQkFDTCxLQUFLOzBCQUNMLEtBQUs7MEJBQ0wsS0FBSzs7SUFDUixnQ0FBQztDQUFBLEFBWEQsQ0FLK0MsaUJBQWlCLEdBTS9EO1NBTlkseUJBQXlCOzs7SUFDcEMsNkNBQXdDOztJQUN4QywrQ0FBbUM7O0lBQ25DLDZDQUF5Qzs7SUFDekMsNENBQW9DOztJQUNwQyw0Q0FBb0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIEV2ZW50RW1pdHRlciwgT3V0cHV0LCBJbnB1dCwgSG9zdExpc3RlbmVyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBCaW5kYWJsZUNvbXBvbmVudCB9IGZyb20gJy4uL2JpbmRhYmxlL2JpbmRhYmxlLmNvbXBvbmVudCc7XG5pbXBvcnQgeyAgfSBmcm9tICdldmVudHMnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdybmctYmluZGFibGUtdGV4dGFyZWEnLFxuICB0ZW1wbGF0ZVVybDogJy4vYmluZGFibGUtdGV4dGFyZWEuY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi9iaW5kYWJsZS10ZXh0YXJlYS5jb21wb25lbnQuc2NzcyddXG59KVxuZXhwb3J0IGNsYXNzIEJpbmRhYmxlVGV4dGFyZWFDb21wb25lbnQgZXh0ZW5kcyBCaW5kYWJsZUNvbXBvbmVudCB7XG4gIEBPdXRwdXQoKSBidG5DbGljayA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgQElucHV0KCkgYnRuSWNvbkNTUzogc3RyaW5nIHwgbnVsbDtcbiAgQElucHV0KCkgYXV0b3NpemU6IGJvb2xlYW4gfCBudWxsID0gdHJ1ZTtcbiAgQElucHV0KCkgbWluUm93czogbnVtYmVyIHwgbnVsbCA9IDE7XG4gIEBJbnB1dCgpIG1heFJvd3M6IG51bWJlciB8IG51bGwgPSA0O1xufVxuIl19