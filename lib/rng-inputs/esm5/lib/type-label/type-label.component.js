/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input } from '@angular/core';
var TypeLabelComponent = /** @class */ (function () {
    function TypeLabelComponent() {
    }
    Object.defineProperty(TypeLabelComponent.prototype, "data", {
        get: /**
         * @return {?}
         */
        function () {
            return this.typeData;
        },
        set: /**
         * @param {?} data
         * @return {?}
         */
        function (data) {
            this.typeData = data;
            this.typeClass = ['rng-type-label', this.data.color, 'badge'];
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    TypeLabelComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () { };
    TypeLabelComponent.decorators = [
        { type: Component, args: [{
                    selector: 'rng-type-label',
                    template: "<span [ngClass]=\"typeClass\">{{data.value}}</span>\n"
                }] }
    ];
    /** @nocollapse */
    TypeLabelComponent.ctorParameters = function () { return []; };
    TypeLabelComponent.propDecorators = {
        data: [{ type: Input }]
    };
    return TypeLabelComponent;
}());
export { TypeLabelComponent };
if (false) {
    /** @type {?} */
    TypeLabelComponent.prototype.typeClass;
    /** @type {?} */
    TypeLabelComponent.prototype.typeData;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHlwZS1sYWJlbC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Acm5nL2lucHV0cy8iLCJzb3VyY2VzIjpbImxpYi90eXBlLWxhYmVsL3R5cGUtbGFiZWwuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFVLEtBQUssRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUd6RDtJQWtCRTtJQUFlLENBQUM7SUFUaEIsc0JBQ00sb0NBQUk7Ozs7UUFJUjtZQUNFLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQztRQUN2QixDQUFDOzs7OztRQVBILFVBQ1csSUFBbUI7WUFDMUIsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUM7WUFDckIsSUFBSSxDQUFDLFNBQVMsR0FBRyxDQUFDLGdCQUFnQixFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLE9BQU8sQ0FBQyxDQUFDO1FBQ2hFLENBQUM7OztPQUFBOzs7O0lBT0gscUNBQVE7OztJQUFSLGNBQVksQ0FBQzs7Z0JBcEJkLFNBQVMsU0FBQztvQkFDVCxRQUFRLEVBQUUsZ0JBQWdCO29CQUMxQixpRUFBMEM7aUJBRTNDOzs7Ozt1QkFLRSxLQUFLOztJQVlSLHlCQUFDO0NBQUEsQUFyQkQsSUFxQkM7U0FoQlksa0JBQWtCOzs7SUFDN0IsdUNBQW9COztJQUNwQixzQ0FBd0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgSW5wdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEJhZ2VUeXBlTGFiZWwgfSBmcm9tICcuLi8uLi9tb2RlbC9jb21tb24tdHlwZXMnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdybmctdHlwZS1sYWJlbCcsXG4gIHRlbXBsYXRlVXJsOiAnLi90eXBlLWxhYmVsLmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbXSxcbn0pXG5leHBvcnQgY2xhc3MgVHlwZUxhYmVsQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAgdHlwZUNsYXNzOiBzdHJpbmdbXTtcbiAgdHlwZURhdGE6IEJhZ2VUeXBlTGFiZWw7XG5cbiAgQElucHV0KClcbiAgICBzZXQgZGF0YShkYXRhOiBCYWdlVHlwZUxhYmVsKSB7XG4gICAgICB0aGlzLnR5cGVEYXRhID0gZGF0YTtcbiAgICAgIHRoaXMudHlwZUNsYXNzID0gWydybmctdHlwZS1sYWJlbCcsIHRoaXMuZGF0YS5jb2xvciwgJ2JhZGdlJ107XG4gICAgfVxuICAgIGdldCBkYXRhKCkge1xuICAgICAgcmV0dXJuIHRoaXMudHlwZURhdGE7XG4gICAgfVxuXG4gIGNvbnN0cnVjdG9yKCkge31cblxuICBuZ09uSW5pdCgpIHt9XG59XG4iXX0=