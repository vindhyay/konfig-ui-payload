/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input, Output, EventEmitter } from '@angular/core';
var IconedMenuComponent = /** @class */ (function () {
    function IconedMenuComponent() {
        this.changeItem = new EventEmitter();
        this.showName = true;
    }
    Object.defineProperty(IconedMenuComponent.prototype, "currentName", {
        get: /**
         * @return {?}
         */
        function () {
            /** @type {?} */
            var avatar = this.itemAvatar(this.currentItem);
            return avatar.name;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?} item
     * @return {?}
     */
    IconedMenuComponent.prototype.itemAvatar = /**
     * @param {?} item
     * @return {?}
     */
    function (item) {
        if (!item) {
            return this.placeholderItem || (/** @type {?} */ ({}));
        }
        if ('avatar' in item) {
            return ((/** @type {?} */ (item))).avatar;
        }
        return (/** @type {?} */ (item));
    };
    /**
     * @param {?} item
     * @return {?}
     */
    IconedMenuComponent.prototype.itemName = /**
     * @param {?} item
     * @return {?}
     */
    function (item) {
        return this.itemAvatar(item).name;
    };
    /**
     * @param {?} item
     * @return {?}
     */
    IconedMenuComponent.prototype.clickFunction = /**
     * @param {?} item
     * @return {?}
     */
    function (item) {
        this.currentItem = item;
        this.changeItem.emit(item);
    };
    IconedMenuComponent.decorators = [
        { type: Component, args: [{
                    selector: 'rng-iconed-menu',
                    template: "<div class=\"rng-iconed-menu\">\n  <button mat-flat-button\n    [matMenuTriggerFor]=\"menu\"\n    (click)=\"$event.stopPropagation()\">    \n    <div *ngIf=\"showName; else avatarOnly\"\n      class=\"current-item-wrapper\">\n      <rng-iconed-name\n        [data]=\"itemAvatar(currentItem)\"></rng-iconed-name>\n      <i class=\"rng-icon rng-icon-arrow_drop_down\"></i>\n    </div>\n    <ng-template #avatarOnly>\n      <rng-image \n        [data]=\"itemAvatar(currentItem)\"></rng-image>\n    </ng-template>\n  </button>\n  <mat-menu #menu=\"matMenu\"\n    class=\"rng-iconed-menu-list\">\n    <button mat-menu-item\n      class=\"rng-iconed-menu-item\"\n      *ngFor=\"let item of items\"\n      (click)=\"clickFunction(item)\">\n      <rng-iconed-name\n        [data]=\"itemAvatar(item)\"></rng-iconed-name>\n    </button>\n  </mat-menu>\n</div>"
                }] }
    ];
    IconedMenuComponent.propDecorators = {
        changeItem: [{ type: Output }],
        items: [{ type: Input }],
        placeholderItem: [{ type: Input }],
        showName: [{ type: Input }],
        currentItem: [{ type: Input }]
    };
    return IconedMenuComponent;
}());
export { IconedMenuComponent };
if (false) {
    /** @type {?} */
    IconedMenuComponent.prototype.changeItem;
    /** @type {?} */
    IconedMenuComponent.prototype.items;
    /** @type {?} */
    IconedMenuComponent.prototype.placeholderItem;
    /** @type {?} */
    IconedMenuComponent.prototype.showName;
    /** @type {?} */
    IconedMenuComponent.prototype.currentItem;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaWNvbmVkLW1lbnUuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHJuZy93aWRnZXRzLyIsInNvdXJjZXMiOlsibGliL2ljb25lZC1tZW51L2ljb25lZC1tZW51LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLFlBQVksRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUd2RTtJQUFBO1FBT1ksZUFBVSxHQUFHLElBQUksWUFBWSxFQUFFLENBQUM7UUFJakMsYUFBUSxHQUFtQixJQUFJLENBQUM7SUEwQjNDLENBQUM7SUF2QkMsc0JBQUksNENBQVc7Ozs7UUFBZjs7Z0JBQ1EsTUFBTSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQztZQUNoRCxPQUFPLE1BQU0sQ0FBQyxJQUFJLENBQUM7UUFDckIsQ0FBQzs7O09BQUE7Ozs7O0lBRUQsd0NBQVU7Ozs7SUFBVixVQUFXLElBQWtDO1FBQzNDLElBQUksQ0FBQyxJQUFJLEVBQUU7WUFDVCxPQUFPLElBQUksQ0FBQyxlQUFlLElBQUksbUJBQUEsRUFBRSxFQUFlLENBQUM7U0FDbEQ7UUFDRCxJQUFJLFFBQVEsSUFBSSxJQUFJLEVBQUU7WUFDcEIsT0FBTyxDQUFDLG1CQUFBLElBQUksRUFBa0IsQ0FBQyxDQUFDLE1BQU0sQ0FBQztTQUN4QztRQUNELE9BQU8sbUJBQUEsSUFBSSxFQUFlLENBQUM7SUFDN0IsQ0FBQzs7Ozs7SUFFRCxzQ0FBUTs7OztJQUFSLFVBQVMsSUFBa0M7UUFDekMsT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQztJQUNwQyxDQUFDOzs7OztJQUVELDJDQUFhOzs7O0lBQWIsVUFBYyxJQUFJO1FBQ2hCLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDO1FBQ3hCLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQzdCLENBQUM7O2dCQXBDRixTQUFTLFNBQUM7b0JBQ1QsUUFBUSxFQUFFLGlCQUFpQjtvQkFDM0IsNjFCQUEyQztpQkFFNUM7Ozs2QkFHRSxNQUFNO3dCQUVOLEtBQUs7a0NBQ0wsS0FBSzsyQkFDTCxLQUFLOzhCQUNMLEtBQUs7O0lBeUJSLDBCQUFDO0NBQUEsQUFyQ0QsSUFxQ0M7U0FoQ1ksbUJBQW1COzs7SUFFOUIseUNBQTBDOztJQUUxQyxvQ0FBaUQ7O0lBQ2pELDhDQUFzQzs7SUFDdEMsdUNBQXlDOztJQUN6QywwQ0FBbUQiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0LCBPdXRwdXQsIEV2ZW50RW1pdHRlciB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgSUF2YXRhckRhdGEsIElBdmF0YXJFbmFibGVkIH0gZnJvbSAnLi4vLi4vbW9kZWwvY29tbW9uLXR5cGVzJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAncm5nLWljb25lZC1tZW51JyxcbiAgdGVtcGxhdGVVcmw6ICcuL2ljb25lZC1tZW51LmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbXVxufSlcbmV4cG9ydCBjbGFzcyBJY29uZWRNZW51Q29tcG9uZW50IHtcblxuICBAT3V0cHV0KCkgY2hhbmdlSXRlbSA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICBASW5wdXQoKSBpdGVtczogSUF2YXRhckRhdGFbXSB8IElBdmF0YXJFbmFibGVkW107XG4gIEBJbnB1dCgpIHBsYWNlaG9sZGVySXRlbTogSUF2YXRhckRhdGE7XG4gIEBJbnB1dCgpIHNob3dOYW1lOiBib29sZWFuIHwgbnVsbCA9IHRydWU7XG4gIEBJbnB1dCgpIGN1cnJlbnRJdGVtOiBJQXZhdGFyRGF0YSB8IElBdmF0YXJFbmFibGVkO1xuXG4gIGdldCBjdXJyZW50TmFtZSgpOiBzdHJpbmcge1xuICAgIGNvbnN0IGF2YXRhciA9IHRoaXMuaXRlbUF2YXRhcih0aGlzLmN1cnJlbnRJdGVtKTtcbiAgICByZXR1cm4gYXZhdGFyLm5hbWU7XG4gIH1cblxuICBpdGVtQXZhdGFyKGl0ZW06IElBdmF0YXJEYXRhIHwgSUF2YXRhckVuYWJsZWQpOiBJQXZhdGFyRGF0YSB7XG4gICAgaWYgKCFpdGVtKSB7XG4gICAgICByZXR1cm4gdGhpcy5wbGFjZWhvbGRlckl0ZW0gfHwge30gYXMgSUF2YXRhckRhdGE7XG4gICAgfVxuICAgIGlmICgnYXZhdGFyJyBpbiBpdGVtKSB7XG4gICAgICByZXR1cm4gKGl0ZW0gYXMgSUF2YXRhckVuYWJsZWQpLmF2YXRhcjtcbiAgICB9XG4gICAgcmV0dXJuIGl0ZW0gYXMgSUF2YXRhckRhdGE7XG4gIH1cblxuICBpdGVtTmFtZShpdGVtOiBJQXZhdGFyRGF0YSB8IElBdmF0YXJFbmFibGVkKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5pdGVtQXZhdGFyKGl0ZW0pLm5hbWU7XG4gIH1cblxuICBjbGlja0Z1bmN0aW9uKGl0ZW0pIHtcbiAgICB0aGlzLmN1cnJlbnRJdGVtID0gaXRlbTtcbiAgICB0aGlzLmNoYW5nZUl0ZW0uZW1pdChpdGVtKTtcbiAgfVxufVxuIl19