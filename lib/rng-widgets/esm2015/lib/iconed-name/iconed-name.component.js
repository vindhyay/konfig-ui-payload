/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input } from '@angular/core';
export class IconedNameComponent {
    /**
     * @return {?}
     */
    get avatarName() {
        /** @type {?} */
        const avatar = this.avatar;
        return avatar.name;
    }
    /**
     * @return {?}
     */
    get avatar() {
        if (!this.data) {
            return (/** @type {?} */ ({}));
        }
        if ('avatar' in this.data) {
            return ((/** @type {?} */ (this.data))).avatar;
        }
        return (/** @type {?} */ (this.data));
    }
}
IconedNameComponent.decorators = [
    { type: Component, args: [{
                selector: 'rng-iconed-name',
                template: "<div class=\"rng-iconed-name\">\n  <rng-image size=\"32\"\n    [data]=\"avatar\"></rng-image>\n  <div class=\"avatar-name\">          \n    {{ avatarName }}\n  </div>\n</div>\n"
            }] }
];
IconedNameComponent.propDecorators = {
    data: [{ type: Input }]
};
if (false) {
    /** @type {?} */
    IconedNameComponent.prototype.data;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaWNvbmVkLW5hbWUuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHJuZy93aWRnZXRzLyIsInNvdXJjZXMiOlsibGliL2ljb25lZC1uYW1lL2ljb25lZC1uYW1lLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFRakQsTUFBTSxPQUFPLG1CQUFtQjs7OztJQUk5QixJQUFJLFVBQVU7O2NBQ04sTUFBTSxHQUFHLElBQUksQ0FBQyxNQUFNO1FBQzFCLE9BQU8sTUFBTSxDQUFDLElBQUksQ0FBQztJQUNyQixDQUFDOzs7O0lBRUQsSUFBSSxNQUFNO1FBQ1IsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUU7WUFDZCxPQUFPLG1CQUFBLEVBQUUsRUFBZSxDQUFDO1NBQzFCO1FBQ0QsSUFBSSxRQUFRLElBQUksSUFBSSxDQUFDLElBQUksRUFBRTtZQUN6QixPQUFPLENBQUMsbUJBQUEsSUFBSSxDQUFDLElBQUksRUFBa0IsQ0FBQyxDQUFDLE1BQU0sQ0FBQztTQUM3QztRQUNELE9BQU8sbUJBQUEsSUFBSSxDQUFDLElBQUksRUFBZSxDQUFDO0lBQ2xDLENBQUM7OztZQXRCRixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLGlCQUFpQjtnQkFDM0IsNExBQTJDO2FBRTVDOzs7bUJBR0UsS0FBSzs7OztJQUFOLG1DQUE0QyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IElBdmF0YXJEYXRhLCBJQXZhdGFyRW5hYmxlZCB9IGZyb20gJy4uLy4uL21vZGVsL2NvbW1vbi10eXBlcyc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ3JuZy1pY29uZWQtbmFtZScsXG4gIHRlbXBsYXRlVXJsOiAnLi9pY29uZWQtbmFtZS5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogW11cbn0pXG5leHBvcnQgY2xhc3MgSWNvbmVkTmFtZUNvbXBvbmVudCB7XG5cbiAgQElucHV0KCkgZGF0YTogSUF2YXRhckRhdGEgfCBJQXZhdGFyRW5hYmxlZDtcblxuICBnZXQgYXZhdGFyTmFtZSgpOiBzdHJpbmcge1xuICAgIGNvbnN0IGF2YXRhciA9IHRoaXMuYXZhdGFyO1xuICAgIHJldHVybiBhdmF0YXIubmFtZTtcbiAgfVxuXG4gIGdldCBhdmF0YXIoKTogSUF2YXRhckRhdGEge1xuICAgIGlmICghdGhpcy5kYXRhKSB7XG4gICAgICByZXR1cm4ge30gYXMgSUF2YXRhckRhdGE7XG4gICAgfVxuICAgIGlmICgnYXZhdGFyJyBpbiB0aGlzLmRhdGEpIHtcbiAgICAgIHJldHVybiAodGhpcy5kYXRhIGFzIElBdmF0YXJFbmFibGVkKS5hdmF0YXI7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLmRhdGEgYXMgSUF2YXRhckRhdGE7XG4gIH1cbn1cbiJdfQ==