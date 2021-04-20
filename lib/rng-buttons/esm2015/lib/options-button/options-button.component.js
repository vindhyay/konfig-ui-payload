/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Output, EventEmitter, Input } from '@angular/core';
export class OptionsButtonComponent {
    constructor() {
        this.primaryClick = new EventEmitter();
        this.itemClick = new EventEmitter();
        this.color = 'accent';
        this.onPrimaryClick = (/**
         * @return {?}
         */
        () => this.primaryClick.emit());
        this.onItemClick = (/**
         * @param {?} item
         * @return {?}
         */
        (item) => this.itemClick.emit(item));
    }
    /**
     * @param {?} event
     * @return {?}
     */
    toggleChange(event) {
        /** @type {?} */
        const toggle = event.source;
        if (toggle) {
            /** @type {?} */
            const group = toggle.buttonToggleGroup;
            if (event.value.some((/**
             * @param {?} item
             * @return {?}
             */
            item => item === toggle.value))) {
                group.value = [toggle.value];
            }
        }
    }
}
OptionsButtonComponent.decorators = [
    { type: Component, args: [{
                selector: 'rng-options-button',
                template: "<button mat-raised-button\n  class=\"wrapper-button\"\n  [ngClass]=\"{'selected':t.menuOpen}\"\n  [color]=\"color\"\n  [disableRipple]=\"true\"\n  [matMenuTriggerFor]=\"menu\"\n  #t=\"matMenuTrigger\">\n  <div class=\"wrapper-content\">\n    <button mat-flat-button \n      tabindex=\"-1\"\n      [color]=\"color\"\n      class=\"primary-button\"\n      (click)=\"onPrimaryClick();$event.stopPropagation()\">\n      <span>{{primaryTitle}}</span>  \n    </button>\n    <i class=\"rng-icon rng-icon-arrow_drop_down\" *ngIf=\"!t.menuOpen\"></i>\n    <i class=\"rng-icon rng-icon-arrow_drop_up\" *ngIf=\"t.menuOpen\"></i>\n  </div>\n</button>\n<mat-menu #menu=\"matMenu\"\n  class=\"rng-iconed-menu-list\">\n  <button mat-menu-item\n    class=\"button-menu-item\"\n    *ngFor=\"let item of items\"\n    (click)=\"onItemClick(item)\">\n    <div class=\"button-menu-item-wrapper\">\n      <i [ngClass]=\"item.iconCSS\"></i>\n      <span>{{ item.name }}</span>\n    </div>\n  </button>\n</mat-menu>"
            }] }
];
OptionsButtonComponent.propDecorators = {
    primaryClick: [{ type: Output }],
    itemClick: [{ type: Output }],
    primaryTitle: [{ type: Input }],
    items: [{ type: Input }],
    color: [{ type: Input }]
};
if (false) {
    /** @type {?} */
    OptionsButtonComponent.prototype.primaryClick;
    /** @type {?} */
    OptionsButtonComponent.prototype.itemClick;
    /** @type {?} */
    OptionsButtonComponent.prototype.primaryTitle;
    /** @type {?} */
    OptionsButtonComponent.prototype.items;
    /** @type {?} */
    OptionsButtonComponent.prototype.color;
    /** @type {?} */
    OptionsButtonComponent.prototype.onPrimaryClick;
    /** @type {?} */
    OptionsButtonComponent.prototype.onItemClick;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3B0aW9ucy1idXR0b24uY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHJuZy9idXR0b25zLyIsInNvdXJjZXMiOlsibGliL29wdGlvbnMtYnV0dG9uL29wdGlvbnMtYnV0dG9uLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBRSxNQUFNLGVBQWUsQ0FBQztBQVF2RSxNQUFNLE9BQU8sc0JBQXNCO0lBTG5DO1FBT1ksaUJBQVksR0FBRyxJQUFJLFlBQVksRUFBRSxDQUFDO1FBQ2xDLGNBQVMsR0FBRyxJQUFJLFlBQVksRUFBRSxDQUFDO1FBSWhDLFVBQUssR0FBa0IsUUFBUSxDQUFDO1FBRXpDLG1CQUFjOzs7UUFBRyxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksRUFBRSxFQUFDO1FBQ2hELGdCQUFXOzs7O1FBQUcsQ0FBQyxJQUFxQixFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBQztJQVdyRSxDQUFDOzs7OztJQVRDLFlBQVksQ0FBQyxLQUFLOztjQUNWLE1BQU0sR0FBRyxLQUFLLENBQUMsTUFBTTtRQUMzQixJQUFJLE1BQU0sRUFBRTs7a0JBQ0osS0FBSyxHQUFHLE1BQU0sQ0FBQyxpQkFBaUI7WUFDdEMsSUFBSSxLQUFLLENBQUMsS0FBSyxDQUFDLElBQUk7Ozs7WUFBQyxJQUFJLENBQUMsRUFBRSxDQUFDLElBQUksS0FBSyxNQUFNLENBQUMsS0FBSyxFQUFDLEVBQUU7Z0JBQ25ELEtBQUssQ0FBQyxLQUFLLEdBQUcsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7YUFDOUI7U0FDRjtJQUNILENBQUM7OztZQXpCRixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLG9CQUFvQjtnQkFDOUIsMitCQUE4QzthQUUvQzs7OzJCQUdFLE1BQU07d0JBQ04sTUFBTTsyQkFFTixLQUFLO29CQUNMLEtBQUs7b0JBQ0wsS0FBSzs7OztJQUxOLDhDQUE0Qzs7SUFDNUMsMkNBQXlDOztJQUV6Qyw4Q0FBOEI7O0lBQzlCLHVDQUFrQzs7SUFDbEMsdUNBQXlDOztJQUV6QyxnREFBZ0Q7O0lBQ2hELDZDQUFtRSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT3V0cHV0LCBFdmVudEVtaXR0ZXIsIElucHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBJQnV0dG9uTWVudUl0ZW0gfSBmcm9tICcuLi8uLi9wdWJsaWMtYXBpJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAncm5nLW9wdGlvbnMtYnV0dG9uJyxcbiAgdGVtcGxhdGVVcmw6ICcuL29wdGlvbnMtYnV0dG9uLmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbXVxufSlcbmV4cG9ydCBjbGFzcyBPcHRpb25zQnV0dG9uQ29tcG9uZW50IHtcblxuICBAT3V0cHV0KCkgcHJpbWFyeUNsaWNrID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICBAT3V0cHV0KCkgaXRlbUNsaWNrID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gIEBJbnB1dCgpIHByaW1hcnlUaXRsZTogc3RyaW5nO1xuICBASW5wdXQoKSBpdGVtczogSUJ1dHRvbk1lbnVJdGVtW107XG4gIEBJbnB1dCgpIGNvbG9yOiBzdHJpbmcgfCBudWxsID0gJ2FjY2VudCc7XG5cbiAgb25QcmltYXJ5Q2xpY2sgPSAoKSA9PiB0aGlzLnByaW1hcnlDbGljay5lbWl0KCk7XG4gIG9uSXRlbUNsaWNrID0gKGl0ZW06IElCdXR0b25NZW51SXRlbSkgPT4gdGhpcy5pdGVtQ2xpY2suZW1pdChpdGVtKTtcblxuICB0b2dnbGVDaGFuZ2UoZXZlbnQpIHtcbiAgICBjb25zdCB0b2dnbGUgPSBldmVudC5zb3VyY2U7XG4gICAgaWYgKHRvZ2dsZSkge1xuICAgICAgY29uc3QgZ3JvdXAgPSB0b2dnbGUuYnV0dG9uVG9nZ2xlR3JvdXA7XG4gICAgICBpZiAoZXZlbnQudmFsdWUuc29tZShpdGVtID0+IGl0ZW0gPT09IHRvZ2dsZS52YWx1ZSkpIHtcbiAgICAgICAgZ3JvdXAudmFsdWUgPSBbdG9nZ2xlLnZhbHVlXTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cbiJdfQ==