/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input } from '@angular/core';
var IconedNameComponent = /** @class */ (function () {
    function IconedNameComponent() {
    }
    Object.defineProperty(IconedNameComponent.prototype, "avatarName", {
        get: /**
         * @return {?}
         */
        function () {
            /** @type {?} */
            var avatar = this.avatar;
            return avatar.name;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(IconedNameComponent.prototype, "avatar", {
        get: /**
         * @return {?}
         */
        function () {
            if (!this.data) {
                return (/** @type {?} */ ({}));
            }
            if ('avatar' in this.data) {
                return ((/** @type {?} */ (this.data))).avatar;
            }
            return (/** @type {?} */ (this.data));
        },
        enumerable: true,
        configurable: true
    });
    IconedNameComponent.decorators = [
        { type: Component, args: [{
                    selector: 'rng-iconed-name',
                    template: "<div class=\"rng-iconed-name\">\n  <rng-image size=\"32\"\n    [data]=\"avatar\"></rng-image>\n  <div class=\"avatar-name\">          \n    {{ avatarName }}\n  </div>\n</div>\n"
                }] }
    ];
    IconedNameComponent.propDecorators = {
        data: [{ type: Input }]
    };
    return IconedNameComponent;
}());
export { IconedNameComponent };
if (false) {
    /** @type {?} */
    IconedNameComponent.prototype.data;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaWNvbmVkLW5hbWUuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHJuZy93aWRnZXRzLyIsInNvdXJjZXMiOlsibGliL2ljb25lZC1uYW1lL2ljb25lZC1uYW1lLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFHakQ7SUFBQTtJQXVCQSxDQUFDO0lBZEMsc0JBQUksMkNBQVU7Ozs7UUFBZDs7Z0JBQ1EsTUFBTSxHQUFHLElBQUksQ0FBQyxNQUFNO1lBQzFCLE9BQU8sTUFBTSxDQUFDLElBQUksQ0FBQztRQUNyQixDQUFDOzs7T0FBQTtJQUVELHNCQUFJLHVDQUFNOzs7O1FBQVY7WUFDRSxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRTtnQkFDZCxPQUFPLG1CQUFBLEVBQUUsRUFBZSxDQUFDO2FBQzFCO1lBQ0QsSUFBSSxRQUFRLElBQUksSUFBSSxDQUFDLElBQUksRUFBRTtnQkFDekIsT0FBTyxDQUFDLG1CQUFBLElBQUksQ0FBQyxJQUFJLEVBQWtCLENBQUMsQ0FBQyxNQUFNLENBQUM7YUFDN0M7WUFDRCxPQUFPLG1CQUFBLElBQUksQ0FBQyxJQUFJLEVBQWUsQ0FBQztRQUNsQyxDQUFDOzs7T0FBQTs7Z0JBdEJGLFNBQVMsU0FBQztvQkFDVCxRQUFRLEVBQUUsaUJBQWlCO29CQUMzQiw0TEFBMkM7aUJBRTVDOzs7dUJBR0UsS0FBSzs7SUFnQlIsMEJBQUM7Q0FBQSxBQXZCRCxJQXVCQztTQWxCWSxtQkFBbUI7OztJQUU5QixtQ0FBNEMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBJQXZhdGFyRGF0YSwgSUF2YXRhckVuYWJsZWQgfSBmcm9tICcuLi8uLi9tb2RlbC9jb21tb24tdHlwZXMnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdybmctaWNvbmVkLW5hbWUnLFxuICB0ZW1wbGF0ZVVybDogJy4vaWNvbmVkLW5hbWUuY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFtdXG59KVxuZXhwb3J0IGNsYXNzIEljb25lZE5hbWVDb21wb25lbnQge1xuXG4gIEBJbnB1dCgpIGRhdGE6IElBdmF0YXJEYXRhIHwgSUF2YXRhckVuYWJsZWQ7XG5cbiAgZ2V0IGF2YXRhck5hbWUoKTogc3RyaW5nIHtcbiAgICBjb25zdCBhdmF0YXIgPSB0aGlzLmF2YXRhcjtcbiAgICByZXR1cm4gYXZhdGFyLm5hbWU7XG4gIH1cblxuICBnZXQgYXZhdGFyKCk6IElBdmF0YXJEYXRhIHtcbiAgICBpZiAoIXRoaXMuZGF0YSkge1xuICAgICAgcmV0dXJuIHt9IGFzIElBdmF0YXJEYXRhO1xuICAgIH1cbiAgICBpZiAoJ2F2YXRhcicgaW4gdGhpcy5kYXRhKSB7XG4gICAgICByZXR1cm4gKHRoaXMuZGF0YSBhcyBJQXZhdGFyRW5hYmxlZCkuYXZhdGFyO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5kYXRhIGFzIElBdmF0YXJEYXRhO1xuICB9XG59XG4iXX0=