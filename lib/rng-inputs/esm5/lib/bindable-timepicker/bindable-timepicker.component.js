/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Component, Input } from '@angular/core';
import { BindableInputComponent } from '../bindable-input/bindable-input.component';
import * as momentModule from 'moment';
/** @type {?} */
var moment = momentModule;
var BindableTimepickerComponent = /** @class */ (function (_super) {
    tslib_1.__extends(BindableTimepickerComponent, _super);
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
export { BindableTimepickerComponent };
if (false) {
    /** @type {?} */
    BindableTimepickerComponent.prototype.stepMinutes;
    /** @type {?} */
    BindableTimepickerComponent.prototype.dayStartHour;
    /** @type {?} */
    BindableTimepickerComponent.prototype.dayEndHour;
    /** @type {?} */
    BindableTimepickerComponent.prototype.items;
    /** @type {?} */
    BindableTimepickerComponent.prototype.filteredItems;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmluZGFibGUtdGltZXBpY2tlci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Acm5nL2lucHV0cy8iLCJzb3VyY2VzIjpbImxpYi9iaW5kYWJsZS10aW1lcGlja2VyL2JpbmRhYmxlLXRpbWVwaWNrZXIuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBVSxLQUFLLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekQsT0FBTyxFQUFFLHNCQUFzQixFQUFFLE1BQU0sNENBQTRDLENBQUM7QUFDcEYsT0FBTyxLQUFLLFlBQVksTUFBTSxRQUFRLENBQUM7O0lBQ2pDLE1BQU0sR0FBRyxZQUFZO0FBRTNCO0lBTVUsdURBQXNCO0lBTmhDO1FBQUEscUVBbUNDO1FBM0JVLGlCQUFXLEdBQWtCLEVBQUUsQ0FBQztRQUNoQyxrQkFBWSxHQUFrQixDQUFDLENBQUM7UUFDaEMsZ0JBQVUsR0FBa0IsRUFBRSxDQUFDO1FBRXhDLFdBQUssR0FBYSxFQUFFLENBQUM7UUFDckIsbUJBQWEsR0FBYSxLQUFJLENBQUMsS0FBSyxDQUFDOztJQXNCdkMsQ0FBQzs7OztJQXBCQyw4Q0FBUTs7O0lBQVI7UUFBQSxpQkFTQztRQVJDLGlCQUFNLFFBQVEsV0FBRSxDQUFDO1FBQ2pCLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixFQUFFLENBQUM7UUFDdEMsSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDO1FBQ2hDLElBQUksQ0FBQyxZQUFZLENBQUMsR0FBRyxDQUNuQixJQUFJLENBQUMsWUFBWSxDQUFDLFlBQVksQ0FBQyxTQUFTOzs7O1FBQUMsVUFBQSxLQUFLO1lBQzVDLEtBQUksQ0FBQyxhQUFhLEdBQUcsS0FBSSxDQUFDLEtBQUssQ0FBQyxNQUFNOzs7O1lBQUMsVUFBQSxJQUFJLElBQUksT0FBQSxJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxFQUF0QixDQUFzQixFQUFDLENBQUM7UUFDekUsQ0FBQyxFQUFDLENBQ0gsQ0FBQztJQUNKLENBQUM7Ozs7SUFFRCx1REFBaUI7OztJQUFqQjs7WUFDUSxLQUFLLEdBQUcsRUFBRTtRQUNoQixLQUFLLElBQUksS0FBSyxHQUFHLElBQUksQ0FBQyxZQUFZLEdBQUcsRUFBRSxFQUFFLEtBQUssSUFBSSxJQUFJLENBQUMsVUFBVSxHQUFHLEVBQUUsRUFBRSxLQUFLLElBQUksSUFBSSxDQUFDLFdBQVcsRUFBRTs7Z0JBQzNGLElBQUksR0FBRyxJQUFJLElBQUksQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsS0FBSyxDQUFDO1lBQ3hDLEtBQUssQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO1NBQzNDO1FBQ0QsT0FBTyxLQUFLLENBQUM7SUFDZixDQUFDOztnQkFqQ0YsU0FBUyxTQUFDO29CQUNULFFBQVEsRUFBRSx5QkFBeUI7b0JBQ25DLG1uQkFBbUQ7aUJBRXBEOzs7OEJBSUUsS0FBSzsrQkFDTCxLQUFLOzZCQUNMLEtBQUs7O0lBeUJSLGtDQUFDO0NBQUEsQUFuQ0QsQ0FNVSxzQkFBc0IsR0E2Qi9CO1NBOUJZLDJCQUEyQjs7O0lBR3RDLGtEQUF5Qzs7SUFDekMsbURBQXlDOztJQUN6QyxpREFBd0M7O0lBRXhDLDRDQUFxQjs7SUFDckIsb0RBQXFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIElucHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBCaW5kYWJsZUlucHV0Q29tcG9uZW50IH0gZnJvbSAnLi4vYmluZGFibGUtaW5wdXQvYmluZGFibGUtaW5wdXQuY29tcG9uZW50JztcbmltcG9ydCAqIGFzIG1vbWVudE1vZHVsZSBmcm9tICdtb21lbnQnO1xuY29uc3QgbW9tZW50ID0gbW9tZW50TW9kdWxlO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdybmctYmluZGFibGUtdGltZXBpY2tlcicsXG4gIHRlbXBsYXRlVXJsOiAnLi9iaW5kYWJsZS10aW1lcGlja2VyLmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbXVxufSlcbmV4cG9ydCBjbGFzcyBCaW5kYWJsZVRpbWVwaWNrZXJDb21wb25lbnRcbiAgZXh0ZW5kcyBCaW5kYWJsZUlucHV0Q29tcG9uZW50XG4gIGltcGxlbWVudHMgT25Jbml0IHtcbiAgQElucHV0KCkgc3RlcE1pbnV0ZXM6IG51bWJlciB8IG51bGwgPSAzMDtcbiAgQElucHV0KCkgZGF5U3RhcnRIb3VyOiBudW1iZXIgfCBudWxsID0gODtcbiAgQElucHV0KCkgZGF5RW5kSG91cjogbnVtYmVyIHwgbnVsbCA9IDE5O1xuXG4gIGl0ZW1zOiBzdHJpbmdbXSA9IFtdO1xuICBmaWx0ZXJlZEl0ZW1zOiBzdHJpbmdbXSA9IHRoaXMuaXRlbXM7XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgc3VwZXIubmdPbkluaXQoKTtcbiAgICB0aGlzLml0ZW1zID0gdGhpcy5nZW5lcmF0ZUludGVydmFscygpO1xuICAgIHRoaXMuZmlsdGVyZWRJdGVtcyA9IHRoaXMuaXRlbXM7XG4gICAgdGhpcy5zdWJzY3JpcHRpb24uYWRkKFxuICAgICAgdGhpcy52YWx1ZUNvbnRyb2wudmFsdWVDaGFuZ2VzLnN1YnNjcmliZSh2YWx1ZSA9PiB7XG4gICAgICAgIHRoaXMuZmlsdGVyZWRJdGVtcyA9IHRoaXMuaXRlbXMuZmlsdGVyKGl0ZW0gPT4gaXRlbS5zdGFydHNXaXRoKHZhbHVlKSk7XG4gICAgICB9KVxuICAgICk7XG4gIH1cblxuICBnZW5lcmF0ZUludGVydmFscygpOiBzdHJpbmdbXSB7XG4gICAgY29uc3QgaXRlbXMgPSBbXTtcbiAgICBmb3IgKGxldCBpbmRleCA9IHRoaXMuZGF5U3RhcnRIb3VyICogNjA7IGluZGV4IDw9IHRoaXMuZGF5RW5kSG91ciAqIDYwOyBpbmRleCArPSB0aGlzLnN0ZXBNaW51dGVzKSB7XG4gICAgICBjb25zdCBkYXRlID0gbmV3IERhdGUoMCwgMCwgMCwgMCwgaW5kZXgpO1xuICAgICAgaXRlbXMucHVzaChtb21lbnQoZGF0ZSkuZm9ybWF0KCdoOm1tIEEnKSk7XG4gICAgfVxuICAgIHJldHVybiBpdGVtcztcbiAgfVxuXG59XG4iXX0=