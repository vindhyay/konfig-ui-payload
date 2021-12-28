/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { BindableSelectComponent } from '../bindable-select/bindable-select.component';
var BindableSelectMultiComponent = /** @class */ (function (_super) {
    tslib_1.__extends(BindableSelectMultiComponent, _super);
    function BindableSelectMultiComponent() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.multiple = true;
        return _this;
    }
    Object.defineProperty(BindableSelectMultiComponent.prototype, "selectionCount", {
        get: /**
         * @return {?}
         */
        function () {
            /** @type {?} */
            var value = this.value;
            return value ? value.length : 0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BindableSelectMultiComponent.prototype, "valueName", {
        get: /**
         * @return {?}
         */
        function () {
            /** @type {?} */
            var cnt = this.selectionCount;
            switch (cnt) {
                case 0:
                    return this.placeholder;
                case 1:
                    return _super.prototype.valueNameGetter.call(this, this.value[0]);
                default:
                    return this.placeholder + ' (' + cnt + ')';
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @protected
     * @return {?}
     */
    BindableSelectMultiComponent.prototype.fieldCSSGetter = /**
     * @protected
     * @return {?}
     */
    function () {
        /** @type {?} */
        var baseCSS = _super.prototype.fieldCSSGetter.call(this);
        baseCSS.push('multi-select');
        return baseCSS;
    };
    /**
     * @protected
     * @param {?} oldValue
     * @return {?}
     */
    BindableSelectMultiComponent.prototype.currentValue = /**
     * @protected
     * @param {?} oldValue
     * @return {?}
     */
    function (oldValue) {
        var _this = this;
        if (!oldValue) {
            return oldValue;
        } // value not yet set. can be undefined or null.
        // value not yet set. can be undefined or null.
        // we can't change it if it is null or undefined so just return it "as is".
        /** @type {?} */
        var values = oldValue.reduce((/**
         * @param {?} vals
         * @param {?} oldval
         * @return {?}
         */
        function (vals, oldval) {
            // re-checking items
            /** @type {?} */
            var oldKeyValue = oldval[_this.valueKey];
            if (!oldKeyValue) {
                vals.push(oldval); // values are string, so just return a value
            }
            else {
                /** @type {?} */
                var objVal = _this.items.find((/**
                 * @param {?} item
                 * @return {?}
                 */
                function (item) { return item[_this.valueKey] === oldKeyValue; }));
                if (objVal) {
                    vals.push(objVal);
                }
            }
            return vals;
        }), []);
        return values;
    };
    BindableSelectMultiComponent.decorators = [
        { type: Component, args: [{
                    selector: 'rng-bindable-select-multi',
                    template: "<mat-form-field [ngClass]=\"fieldCSS\"\n  [appearance]=\"appearance\"\n  [floatLabel]=\"floatLabel\"\n  color=\"accent\">\n  <mat-label *ngIf=\"label\">{{label}}</mat-label>\n  <mat-select\n    [disabled]=\"disabled\"\n    [multiple]=\"multiple\"\n    [formControl]=\"valueControl\"\n    [placeholder]=\"valueName\"\n    [disableOptionCentering]=\"disableOptionCentering\">\n    <mat-option\n      *ngFor=\"let item of items\"\n      [value]=\"returnKey ? item[returnKey] : item\">\n      <div *ngIf=\"item.color\" class=\"complex-option\">\n        <rng-type-label [data]=\"item\"></rng-type-label><span class=\"value\">{{item.name}}</span>\n      </div>\n      <span *ngIf=\"!item.color && item[nameKey]\">{{item[nameKey]}} </span>\n      <span *ngIf=\"!item[nameKey]\"> {{item}}</span>\n    </mat-option>\n  </mat-select>\n</mat-form-field>\n"
                }] }
    ];
    return BindableSelectMultiComponent;
}(BindableSelectComponent));
export { BindableSelectMultiComponent };
if (false) {
    /** @type {?} */
    BindableSelectMultiComponent.prototype.multiple;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmluZGFibGUtc2VsZWN0LW11bHRpLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BybmcvaW5wdXRzLyIsInNvdXJjZXMiOlsibGliL2JpbmRhYmxlLXNlbGVjdC1tdWx0aS9iaW5kYWJsZS1zZWxlY3QtbXVsdGkuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMxQyxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSw4Q0FBOEMsQ0FBQztBQUV2RjtJQUtrRCx3REFBdUI7SUFMekU7UUFBQSxxRUFtREM7UUE1Q0MsY0FBUSxHQUFHLElBQUksQ0FBQzs7SUE0Q2xCLENBQUM7SUExQ0Msc0JBQUksd0RBQWM7Ozs7UUFBbEI7O2dCQUNRLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSztZQUN4QixPQUFPLEtBQUssQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ2xDLENBQUM7OztPQUFBO0lBRUQsc0JBQUksbURBQVM7Ozs7UUFBYjs7Z0JBQ1EsR0FBRyxHQUFHLElBQUksQ0FBQyxjQUFjO1lBQy9CLFFBQVEsR0FBRyxFQUFFO2dCQUNYLEtBQUssQ0FBQztvQkFDSixPQUFPLElBQUksQ0FBQyxXQUFXLENBQUM7Z0JBQzFCLEtBQUssQ0FBQztvQkFDSixPQUFPLGlCQUFNLGVBQWUsWUFBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQzlDO29CQUNFLE9BQU8sSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLEdBQUcsR0FBRyxHQUFHLEdBQUcsQ0FBQzthQUM5QztRQUNILENBQUM7OztPQUFBOzs7OztJQUVTLHFEQUFjOzs7O0lBQXhCOztZQUNRLE9BQU8sR0FBRyxpQkFBTSxjQUFjLFdBQUU7UUFDdEMsT0FBTyxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQztRQUM3QixPQUFPLE9BQU8sQ0FBQztJQUNqQixDQUFDOzs7Ozs7SUFFUyxtREFBWTs7Ozs7SUFBdEIsVUFBdUIsUUFBZTtRQUF0QyxpQkFrQkM7UUFqQkMsSUFBSSxDQUFDLFFBQVEsRUFBRTtZQUFFLE9BQU8sUUFBUSxDQUFDO1NBQUUsQ0FBQywrQ0FBK0M7Ozs7WUFHN0UsTUFBTSxHQUFHLFFBQVEsQ0FBQyxNQUFNOzs7OztRQUFDLFVBQUMsSUFBSSxFQUFFLE1BQU07OztnQkFDcEMsV0FBVyxHQUFHLE1BQU0sQ0FBQyxLQUFJLENBQUMsUUFBUSxDQUFDO1lBQ3pDLElBQUksQ0FBQyxXQUFXLEVBQUU7Z0JBQ2hCLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyw0Q0FBNEM7YUFDaEU7aUJBQU07O29CQUNDLE1BQU0sR0FBRyxLQUFJLENBQUMsS0FBSyxDQUFDLElBQUk7Ozs7Z0JBQUMsVUFBQSxJQUFJLElBQUksT0FBQSxJQUFJLENBQUMsS0FBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLFdBQVcsRUFBbkMsQ0FBbUMsRUFBQztnQkFDM0UsSUFBSSxNQUFNLEVBQUU7b0JBQ1YsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztpQkFDbkI7YUFDRjtZQUNELE9BQU8sSUFBSSxDQUFDO1FBQ2QsQ0FBQyxHQUFFLEVBQUUsQ0FBQztRQUVOLE9BQU8sTUFBTSxDQUFDO0lBQ2hCLENBQUM7O2dCQWxERixTQUFTLFNBQUM7b0JBQ1QsUUFBUSxFQUFFLDJCQUEyQjtvQkFDckMseTFCQUFnRTtpQkFFakU7O0lBK0NELG1DQUFDO0NBQUEsQUFuREQsQ0FLa0QsdUJBQXVCLEdBOEN4RTtTQTlDWSw0QkFBNEI7OztJQUV2QyxnREFBZ0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEJpbmRhYmxlU2VsZWN0Q29tcG9uZW50IH0gZnJvbSAnLi4vYmluZGFibGUtc2VsZWN0L2JpbmRhYmxlLXNlbGVjdC5jb21wb25lbnQnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdybmctYmluZGFibGUtc2VsZWN0LW11bHRpJyxcbiAgdGVtcGxhdGVVcmw6ICcuLi9iaW5kYWJsZS1zZWxlY3QvYmluZGFibGUtc2VsZWN0LmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbXVxufSlcbmV4cG9ydCBjbGFzcyBCaW5kYWJsZVNlbGVjdE11bHRpQ29tcG9uZW50IGV4dGVuZHMgQmluZGFibGVTZWxlY3RDb21wb25lbnQge1xuXG4gIG11bHRpcGxlID0gdHJ1ZTtcblxuICBnZXQgc2VsZWN0aW9uQ291bnQoKTogbnVtYmVyIHtcbiAgICBjb25zdCB2YWx1ZSA9IHRoaXMudmFsdWU7XG4gICAgcmV0dXJuIHZhbHVlID8gdmFsdWUubGVuZ3RoIDogMDtcbiAgfVxuXG4gIGdldCB2YWx1ZU5hbWUoKTogc3RyaW5nIHtcbiAgICBjb25zdCBjbnQgPSB0aGlzLnNlbGVjdGlvbkNvdW50O1xuICAgIHN3aXRjaCAoY250KSB7XG4gICAgICBjYXNlIDA6XG4gICAgICAgIHJldHVybiB0aGlzLnBsYWNlaG9sZGVyO1xuICAgICAgY2FzZSAxOlxuICAgICAgICByZXR1cm4gc3VwZXIudmFsdWVOYW1lR2V0dGVyKHRoaXMudmFsdWVbMF0pO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgcmV0dXJuIHRoaXMucGxhY2Vob2xkZXIgKyAnICgnICsgY250ICsgJyknO1xuICAgIH1cbiAgfVxuXG4gIHByb3RlY3RlZCBmaWVsZENTU0dldHRlcigpIHtcbiAgICBjb25zdCBiYXNlQ1NTID0gc3VwZXIuZmllbGRDU1NHZXR0ZXIoKTtcbiAgICBiYXNlQ1NTLnB1c2goJ211bHRpLXNlbGVjdCcpO1xuICAgIHJldHVybiBiYXNlQ1NTO1xuICB9XG5cbiAgcHJvdGVjdGVkIGN1cnJlbnRWYWx1ZShvbGRWYWx1ZTogYW55W10pIHtcbiAgICBpZiAoIW9sZFZhbHVlKSB7IHJldHVybiBvbGRWYWx1ZTsgfSAvLyB2YWx1ZSBub3QgeWV0IHNldC4gY2FuIGJlIHVuZGVmaW5lZCBvciBudWxsLlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHdlIGNhbid0IGNoYW5nZSBpdCBpZiBpdCBpcyBudWxsIG9yIHVuZGVmaW5lZCBzbyBqdXN0IHJldHVybiBpdCBcImFzIGlzXCIuXG5cbiAgICBjb25zdCB2YWx1ZXMgPSBvbGRWYWx1ZS5yZWR1Y2UoKHZhbHMsIG9sZHZhbCkgPT4geyAvLyByZS1jaGVja2luZyBpdGVtc1xuICAgICAgY29uc3Qgb2xkS2V5VmFsdWUgPSBvbGR2YWxbdGhpcy52YWx1ZUtleV07XG4gICAgICBpZiAoIW9sZEtleVZhbHVlKSB7XG4gICAgICAgIHZhbHMucHVzaChvbGR2YWwpOyAvLyB2YWx1ZXMgYXJlIHN0cmluZywgc28ganVzdCByZXR1cm4gYSB2YWx1ZVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY29uc3Qgb2JqVmFsID0gdGhpcy5pdGVtcy5maW5kKGl0ZW0gPT4gaXRlbVt0aGlzLnZhbHVlS2V5XSA9PT0gb2xkS2V5VmFsdWUpO1xuICAgICAgICBpZiAob2JqVmFsKSB7XG4gICAgICAgICAgdmFscy5wdXNoKG9ialZhbCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiB2YWxzO1xuICAgIH0sIFtdKTtcblxuICAgIHJldHVybiB2YWx1ZXM7XG4gIH1cbn1cbiJdfQ==