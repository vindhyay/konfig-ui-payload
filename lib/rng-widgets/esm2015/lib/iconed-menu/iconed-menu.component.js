/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input, Output, EventEmitter } from '@angular/core';
export class IconedMenuComponent {
    constructor() {
        this.changeItem = new EventEmitter();
        this.showName = true;
    }
    /**
     * @return {?}
     */
    get currentName() {
        /** @type {?} */
        const avatar = this.itemAvatar(this.currentItem);
        return avatar.name;
    }
    /**
     * @param {?} item
     * @return {?}
     */
    itemAvatar(item) {
        if (!item) {
            return this.placeholderItem || (/** @type {?} */ ({}));
        }
        if ('avatar' in item) {
            return ((/** @type {?} */ (item))).avatar;
        }
        return (/** @type {?} */ (item));
    }
    /**
     * @param {?} item
     * @return {?}
     */
    itemName(item) {
        return this.itemAvatar(item).name;
    }
    /**
     * @param {?} item
     * @return {?}
     */
    clickFunction(item) {
        this.currentItem = item;
        this.changeItem.emit(item);
    }
}
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaWNvbmVkLW1lbnUuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHJuZy93aWRnZXRzLyIsInNvdXJjZXMiOlsibGliL2ljb25lZC1tZW51L2ljb25lZC1tZW51LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLFlBQVksRUFBRSxNQUFNLGVBQWUsQ0FBQztBQVF2RSxNQUFNLE9BQU8sbUJBQW1CO0lBTGhDO1FBT1ksZUFBVSxHQUFHLElBQUksWUFBWSxFQUFFLENBQUM7UUFJakMsYUFBUSxHQUFtQixJQUFJLENBQUM7SUEwQjNDLENBQUM7Ozs7SUF2QkMsSUFBSSxXQUFXOztjQUNQLE1BQU0sR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUM7UUFDaEQsT0FBTyxNQUFNLENBQUMsSUFBSSxDQUFDO0lBQ3JCLENBQUM7Ozs7O0lBRUQsVUFBVSxDQUFDLElBQWtDO1FBQzNDLElBQUksQ0FBQyxJQUFJLEVBQUU7WUFDVCxPQUFPLElBQUksQ0FBQyxlQUFlLElBQUksbUJBQUEsRUFBRSxFQUFlLENBQUM7U0FDbEQ7UUFDRCxJQUFJLFFBQVEsSUFBSSxJQUFJLEVBQUU7WUFDcEIsT0FBTyxDQUFDLG1CQUFBLElBQUksRUFBa0IsQ0FBQyxDQUFDLE1BQU0sQ0FBQztTQUN4QztRQUNELE9BQU8sbUJBQUEsSUFBSSxFQUFlLENBQUM7SUFDN0IsQ0FBQzs7Ozs7SUFFRCxRQUFRLENBQUMsSUFBa0M7UUFDekMsT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQztJQUNwQyxDQUFDOzs7OztJQUVELGFBQWEsQ0FBQyxJQUFJO1FBQ2hCLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDO1FBQ3hCLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQzdCLENBQUM7OztZQXBDRixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLGlCQUFpQjtnQkFDM0IsNjFCQUEyQzthQUU1Qzs7O3lCQUdFLE1BQU07b0JBRU4sS0FBSzs4QkFDTCxLQUFLO3VCQUNMLEtBQUs7MEJBQ0wsS0FBSzs7OztJQUxOLHlDQUEwQzs7SUFFMUMsb0NBQWlEOztJQUNqRCw4Q0FBc0M7O0lBQ3RDLHVDQUF5Qzs7SUFDekMsMENBQW1EIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCwgT3V0cHV0LCBFdmVudEVtaXR0ZXIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IElBdmF0YXJEYXRhLCBJQXZhdGFyRW5hYmxlZCB9IGZyb20gJy4uLy4uL21vZGVsL2NvbW1vbi10eXBlcyc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ3JuZy1pY29uZWQtbWVudScsXG4gIHRlbXBsYXRlVXJsOiAnLi9pY29uZWQtbWVudS5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogW11cbn0pXG5leHBvcnQgY2xhc3MgSWNvbmVkTWVudUNvbXBvbmVudCB7XG5cbiAgQE91dHB1dCgpIGNoYW5nZUl0ZW0gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgQElucHV0KCkgaXRlbXM6IElBdmF0YXJEYXRhW10gfCBJQXZhdGFyRW5hYmxlZFtdO1xuICBASW5wdXQoKSBwbGFjZWhvbGRlckl0ZW06IElBdmF0YXJEYXRhO1xuICBASW5wdXQoKSBzaG93TmFtZTogYm9vbGVhbiB8IG51bGwgPSB0cnVlO1xuICBASW5wdXQoKSBjdXJyZW50SXRlbTogSUF2YXRhckRhdGEgfCBJQXZhdGFyRW5hYmxlZDtcblxuICBnZXQgY3VycmVudE5hbWUoKTogc3RyaW5nIHtcbiAgICBjb25zdCBhdmF0YXIgPSB0aGlzLml0ZW1BdmF0YXIodGhpcy5jdXJyZW50SXRlbSk7XG4gICAgcmV0dXJuIGF2YXRhci5uYW1lO1xuICB9XG5cbiAgaXRlbUF2YXRhcihpdGVtOiBJQXZhdGFyRGF0YSB8IElBdmF0YXJFbmFibGVkKTogSUF2YXRhckRhdGEge1xuICAgIGlmICghaXRlbSkge1xuICAgICAgcmV0dXJuIHRoaXMucGxhY2Vob2xkZXJJdGVtIHx8IHt9IGFzIElBdmF0YXJEYXRhO1xuICAgIH1cbiAgICBpZiAoJ2F2YXRhcicgaW4gaXRlbSkge1xuICAgICAgcmV0dXJuIChpdGVtIGFzIElBdmF0YXJFbmFibGVkKS5hdmF0YXI7XG4gICAgfVxuICAgIHJldHVybiBpdGVtIGFzIElBdmF0YXJEYXRhO1xuICB9XG5cbiAgaXRlbU5hbWUoaXRlbTogSUF2YXRhckRhdGEgfCBJQXZhdGFyRW5hYmxlZCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMuaXRlbUF2YXRhcihpdGVtKS5uYW1lO1xuICB9XG5cbiAgY2xpY2tGdW5jdGlvbihpdGVtKSB7XG4gICAgdGhpcy5jdXJyZW50SXRlbSA9IGl0ZW07XG4gICAgdGhpcy5jaGFuZ2VJdGVtLmVtaXQoaXRlbSk7XG4gIH1cbn1cbiJdfQ==