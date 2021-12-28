/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input, Output, EventEmitter } from '@angular/core';
var NamedMenuComponent = /** @class */ (function () {
    function NamedMenuComponent() {
        var _this = this;
        this.itemClick = new EventEmitter();
        this.onItemClick = (/**
         * @param {?} item
         * @return {?}
         */
        function (item) {
            _this.currentItem = _this.showKey ? item[_this.showKey] : item;
            _this.itemClick.emit(item);
        });
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
    return NamedMenuComponent;
}());
export { NamedMenuComponent };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmFtZWQtbWVudS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Acm5nL3dpZGdldHMvIiwic291cmNlcyI6WyJsaWIvbmFtZWQtbWVudS9uYW1lZC1tZW51LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLFlBQVksRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUV2RTtJQUFBO1FBQUEsaUJBZUM7UUFOVyxjQUFTLEdBQUcsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUV6QyxnQkFBVzs7OztRQUFHLFVBQUMsSUFBWTtZQUN6QixLQUFJLENBQUMsV0FBVyxHQUFHLEtBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQztZQUM1RCxLQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUM1QixDQUFDLEVBQUE7SUFDSCxDQUFDOztnQkFmQSxTQUFTLFNBQUM7b0JBQ1QsUUFBUSxFQUFFLGdCQUFnQjtvQkFDMUIsc21CQUEwQztpQkFFM0M7Ozt3QkFFRSxLQUFLOzhCQUNMLEtBQUs7MEJBQ0wsS0FBSzs0QkFDTCxNQUFNOztJQU1ULHlCQUFDO0NBQUEsQUFmRCxJQWVDO1NBVlksa0JBQWtCOzs7SUFDN0IsbUNBQXlCOztJQUN6Qix5Q0FBNkI7O0lBQzdCLHFDQUF5Qjs7SUFDekIsdUNBQXlDOztJQUV6Qyx5Q0FHQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQsIE91dHB1dCwgRXZlbnRFbWl0dGVyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ3JuZy1uYW1lZC1tZW51JyxcbiAgdGVtcGxhdGVVcmw6ICcuL25hbWVkLW1lbnUuY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFtdXG59KVxuZXhwb3J0IGNsYXNzIE5hbWVkTWVudUNvbXBvbmVudCB7XG4gIEBJbnB1dCgpIGl0ZW1zOiBzdHJpbmdbXTtcbiAgQElucHV0KCkgY3VycmVudEl0ZW06IHN0cmluZztcbiAgQElucHV0KCkgc2hvd0tleTogc3RyaW5nO1xuICBAT3V0cHV0KCkgaXRlbUNsaWNrID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gIG9uSXRlbUNsaWNrID0gKGl0ZW06IHN0cmluZykgPT4ge1xuICAgIHRoaXMuY3VycmVudEl0ZW0gPSB0aGlzLnNob3dLZXkgPyBpdGVtW3RoaXMuc2hvd0tleV0gOiBpdGVtO1xuICAgIHRoaXMuaXRlbUNsaWNrLmVtaXQoaXRlbSk7XG4gIH1cbn1cbiJdfQ==