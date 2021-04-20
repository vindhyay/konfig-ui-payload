/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Component, Optional, Self } from '@angular/core';
import { BindableComponent } from '../bindable/bindable.component';
import { NgControl } from '@angular/forms';
var BindableCheckboxComponent = /** @class */ (function (_super) {
    tslib_1.__extends(BindableCheckboxComponent, _super);
    function BindableCheckboxComponent(ngControl) {
        var _this = _super.call(this, ngControl) || this;
        _this.ngControl = ngControl;
        return _this;
    }
    BindableCheckboxComponent.decorators = [
        { type: Component, args: [{
                    selector: 'rng-bindable-checkbox',
                    template: "<mat-checkbox\n  [formControl]=\"valueControl\"></mat-checkbox>\n<span>{{label}}</span>"
                }] }
    ];
    /** @nocollapse */
    BindableCheckboxComponent.ctorParameters = function () { return [
        { type: NgControl, decorators: [{ type: Optional }, { type: Self }] }
    ]; };
    return BindableCheckboxComponent;
}(BindableComponent));
export { BindableCheckboxComponent };
if (false) {
    /** @type {?} */
    BindableCheckboxComponent.prototype.ngControl;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmluZGFibGUtY2hlY2tib3guY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHJuZy9pbnB1dHMvIiwic291cmNlcyI6WyJsaWIvYmluZGFibGUtY2hlY2tib3gvYmluZGFibGUtY2hlY2tib3guY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzFELE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGdDQUFnQyxDQUFDO0FBQ25FLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUUzQztJQUsrQyxxREFBaUI7SUFFOUQsbUNBQXVDLFNBQW9CO1FBQTNELFlBQ0Usa0JBQU0sU0FBUyxDQUFDLFNBQ2pCO1FBRnNDLGVBQVMsR0FBVCxTQUFTLENBQVc7O0lBRTNELENBQUM7O2dCQVRGLFNBQVMsU0FBQztvQkFDVCxRQUFRLEVBQUUsdUJBQXVCO29CQUNqQyxtR0FBaUQ7aUJBRWxEOzs7O2dCQU5RLFNBQVMsdUJBU0gsUUFBUSxZQUFJLElBQUk7O0lBSS9CLGdDQUFDO0NBQUEsQUFYRCxDQUsrQyxpQkFBaUIsR0FNL0Q7U0FOWSx5QkFBeUI7OztJQUV4Qiw4Q0FBK0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9wdGlvbmFsLCBTZWxmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBCaW5kYWJsZUNvbXBvbmVudCB9IGZyb20gJy4uL2JpbmRhYmxlL2JpbmRhYmxlLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBOZ0NvbnRyb2wgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ3JuZy1iaW5kYWJsZS1jaGVja2JveCcsXG4gIHRlbXBsYXRlVXJsOiAnLi9iaW5kYWJsZS1jaGVja2JveC5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogW11cbn0pXG5leHBvcnQgY2xhc3MgQmluZGFibGVDaGVja2JveENvbXBvbmVudCBleHRlbmRzIEJpbmRhYmxlQ29tcG9uZW50IHtcblxuICBjb25zdHJ1Y3RvcihAT3B0aW9uYWwoKSBAU2VsZigpIHB1YmxpYyBuZ0NvbnRyb2w6IE5nQ29udHJvbCkge1xuICAgIHN1cGVyKG5nQ29udHJvbCk7XG4gIH1cblxufVxuIl19