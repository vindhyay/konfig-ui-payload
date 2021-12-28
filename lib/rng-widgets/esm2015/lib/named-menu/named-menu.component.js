/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input, Output, EventEmitter } from '@angular/core';
export class NamedMenuComponent {
    constructor() {
        this.itemClick = new EventEmitter();
        this.onItemClick = (/**
         * @param {?} item
         * @return {?}
         */
        (item) => {
            this.currentItem = this.showKey ? item[this.showKey] : item;
            this.itemClick.emit(item);
        });
    }
}
NamedMenuComponent.decorators = [
    { type: Component, args: [{
                selector: 'rng-named-menu',
                template: "<div class=\"rng-named-menu\">\n  <button mat-flat-button\n    [matMenuTriggerFor]=\"menu\"\n    (click)=\"$event.stopPropagation()\">\n    <div class=\"current-item-wrapper\">\n      <span class=\"current-item-name\">{{currentItem}}</span>\n      <i class=\"rng-icon rng-icon-arrow_drop_down\"></i>\n    </div>\n  </button>\n  <mat-menu #menu=\"matMenu\"\n    class=\"rng-named-menu-list\">\n    <button mat-menu-item\n      class=\"rng-named-menu-item\"\n      *ngFor=\"let item of items\"\n      (click)=\"onItemClick(item)\">{{showKey ? item[showKey]: item}}\n    </button>\n  </mat-menu>\n</div>\n"
            }] }
];
NamedMenuComponent.propDecorators = {
    items: [{ type: Input }],
    currentItem: [{ type: Input }],
    showKey: [{ type: Input }],
    itemClick: [{ type: Output }]
};
if (false) {
    /** @type {?} */
    NamedMenuComponent.prototype.items;
    /** @type {?} */
    NamedMenuComponent.prototype.currentItem;
    /** @type {?} */
    NamedMenuComponent.prototype.showKey;
    /** @type {?} */
    NamedMenuComponent.prototype.itemClick;
    /** @type {?} */
    NamedMenuComponent.prototype.onItemClick;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmFtZWQtbWVudS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Acm5nL3dpZGdldHMvIiwic291cmNlcyI6WyJsaWIvbmFtZWQtbWVudS9uYW1lZC1tZW51LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLFlBQVksRUFBRSxNQUFNLGVBQWUsQ0FBQztBQU92RSxNQUFNLE9BQU8sa0JBQWtCO0lBTC9CO1FBU1ksY0FBUyxHQUFHLElBQUksWUFBWSxFQUFFLENBQUM7UUFFekMsZ0JBQVc7Ozs7UUFBRyxDQUFDLElBQVksRUFBRSxFQUFFO1lBQzdCLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDO1lBQzVELElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQzVCLENBQUMsRUFBQTtJQUNILENBQUM7OztZQWZBLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsZ0JBQWdCO2dCQUMxQixzbUJBQTBDO2FBRTNDOzs7b0JBRUUsS0FBSzswQkFDTCxLQUFLO3NCQUNMLEtBQUs7d0JBQ0wsTUFBTTs7OztJQUhQLG1DQUF5Qjs7SUFDekIseUNBQTZCOztJQUM3QixxQ0FBeUI7O0lBQ3pCLHVDQUF5Qzs7SUFFekMseUNBR0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0LCBPdXRwdXQsIEV2ZW50RW1pdHRlciB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdybmctbmFtZWQtbWVudScsXG4gIHRlbXBsYXRlVXJsOiAnLi9uYW1lZC1tZW51LmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbXVxufSlcbmV4cG9ydCBjbGFzcyBOYW1lZE1lbnVDb21wb25lbnQge1xuICBASW5wdXQoKSBpdGVtczogc3RyaW5nW107XG4gIEBJbnB1dCgpIGN1cnJlbnRJdGVtOiBzdHJpbmc7XG4gIEBJbnB1dCgpIHNob3dLZXk6IHN0cmluZztcbiAgQE91dHB1dCgpIGl0ZW1DbGljayA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICBvbkl0ZW1DbGljayA9IChpdGVtOiBzdHJpbmcpID0+IHtcbiAgICB0aGlzLmN1cnJlbnRJdGVtID0gdGhpcy5zaG93S2V5ID8gaXRlbVt0aGlzLnNob3dLZXldIDogaXRlbTtcbiAgICB0aGlzLml0ZW1DbGljay5lbWl0KGl0ZW0pO1xuICB9XG59XG4iXX0=