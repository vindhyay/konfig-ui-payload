/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input } from '@angular/core';
export class TypeLabelComponent {
    constructor() { }
    /**
     * @param {?} data
     * @return {?}
     */
    set data(data) {
        this.typeData = data;
        this.typeClass = ['rng-type-label', this.data.color, 'badge'];
    }
    /**
     * @return {?}
     */
    get data() {
        return this.typeData;
    }
    /**
     * @return {?}
     */
    ngOnInit() { }
}
TypeLabelComponent.decorators = [
    { type: Component, args: [{
                selector: 'rng-type-label',
                template: "<span [ngClass]=\"typeClass\">{{data.value}}</span>\n"
            }] }
];
/** @nocollapse */
TypeLabelComponent.ctorParameters = () => [];
TypeLabelComponent.propDecorators = {
    data: [{ type: Input }]
};
if (false) {
    /** @type {?} */
    TypeLabelComponent.prototype.typeClass;
    /** @type {?} */
    TypeLabelComponent.prototype.typeData;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHlwZS1sYWJlbC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Acm5nL2lucHV0cy8iLCJzb3VyY2VzIjpbImxpYi90eXBlLWxhYmVsL3R5cGUtbGFiZWwuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFVLEtBQUssRUFBRSxNQUFNLGVBQWUsQ0FBQztBQVF6RCxNQUFNLE9BQU8sa0JBQWtCO0lBYTdCLGdCQUFlLENBQUM7Ozs7O0lBVGhCLElBQ00sSUFBSSxDQUFDLElBQW1CO1FBQzFCLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDO1FBQ3JCLElBQUksQ0FBQyxTQUFTLEdBQUcsQ0FBQyxnQkFBZ0IsRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxPQUFPLENBQUMsQ0FBQztJQUNoRSxDQUFDOzs7O0lBQ0QsSUFBSSxJQUFJO1FBQ04sT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDO0lBQ3ZCLENBQUM7Ozs7SUFJSCxRQUFRLEtBQUksQ0FBQzs7O1lBcEJkLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsZ0JBQWdCO2dCQUMxQixpRUFBMEM7YUFFM0M7Ozs7O21CQUtFLEtBQUs7Ozs7SUFITix1Q0FBb0I7O0lBQ3BCLHNDQUF3QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBJbnB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQmFnZVR5cGVMYWJlbCB9IGZyb20gJy4uLy4uL21vZGVsL2NvbW1vbi10eXBlcyc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ3JuZy10eXBlLWxhYmVsJyxcbiAgdGVtcGxhdGVVcmw6ICcuL3R5cGUtbGFiZWwuY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFtdLFxufSlcbmV4cG9ydCBjbGFzcyBUeXBlTGFiZWxDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICB0eXBlQ2xhc3M6IHN0cmluZ1tdO1xuICB0eXBlRGF0YTogQmFnZVR5cGVMYWJlbDtcblxuICBASW5wdXQoKVxuICAgIHNldCBkYXRhKGRhdGE6IEJhZ2VUeXBlTGFiZWwpIHtcbiAgICAgIHRoaXMudHlwZURhdGEgPSBkYXRhO1xuICAgICAgdGhpcy50eXBlQ2xhc3MgPSBbJ3JuZy10eXBlLWxhYmVsJywgdGhpcy5kYXRhLmNvbG9yLCAnYmFkZ2UnXTtcbiAgICB9XG4gICAgZ2V0IGRhdGEoKSB7XG4gICAgICByZXR1cm4gdGhpcy50eXBlRGF0YTtcbiAgICB9XG5cbiAgY29uc3RydWN0b3IoKSB7fVxuXG4gIG5nT25Jbml0KCkge31cbn1cbiJdfQ==