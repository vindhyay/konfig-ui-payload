/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Output, EventEmitter, Input } from '@angular/core';
var OptionsButtonComponent = /** @class */ (function () {
    function OptionsButtonComponent() {
        var _this = this;
        this.primaryClick = new EventEmitter();
        this.itemClick = new EventEmitter();
        this.color = 'accent';
        this.onPrimaryClick = (/**
         * @return {?}
         */
        function () { return _this.primaryClick.emit(); });
        this.onItemClick = (/**
         * @param {?} item
         * @return {?}
         */
        function (item) { return _this.itemClick.emit(item); });
    }
    /**
     * @param {?} event
     * @return {?}
     */
    OptionsButtonComponent.prototype.toggleChange = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        /** @type {?} */
        var toggle = event.source;
        if (toggle) {
            /** @type {?} */
            var group = toggle.buttonToggleGroup;
            if (event.value.some((/**
             * @param {?} item
             * @return {?}
             */
            function (item) { return item === toggle.value; }))) {
                group.value = [toggle.value];
            }
        }
    };
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
    return OptionsButtonComponent;
}());
export { OptionsButtonComponent };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3B0aW9ucy1idXR0b24uY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHJuZy9idXR0b25zLyIsInNvdXJjZXMiOlsibGliL29wdGlvbnMtYnV0dG9uL29wdGlvbnMtYnV0dG9uLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUd2RTtJQUFBO1FBQUEsaUJBMEJDO1FBbkJXLGlCQUFZLEdBQUcsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUNsQyxjQUFTLEdBQUcsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUloQyxVQUFLLEdBQWtCLFFBQVEsQ0FBQztRQUV6QyxtQkFBYzs7O1FBQUcsY0FBTSxPQUFBLEtBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxFQUFFLEVBQXhCLENBQXdCLEVBQUM7UUFDaEQsZ0JBQVc7Ozs7UUFBRyxVQUFDLElBQXFCLElBQUssT0FBQSxLQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBekIsQ0FBeUIsRUFBQztJQVdyRSxDQUFDOzs7OztJQVRDLDZDQUFZOzs7O0lBQVosVUFBYSxLQUFLOztZQUNWLE1BQU0sR0FBRyxLQUFLLENBQUMsTUFBTTtRQUMzQixJQUFJLE1BQU0sRUFBRTs7Z0JBQ0osS0FBSyxHQUFHLE1BQU0sQ0FBQyxpQkFBaUI7WUFDdEMsSUFBSSxLQUFLLENBQUMsS0FBSyxDQUFDLElBQUk7Ozs7WUFBQyxVQUFBLElBQUksSUFBSSxPQUFBLElBQUksS0FBSyxNQUFNLENBQUMsS0FBSyxFQUFyQixDQUFxQixFQUFDLEVBQUU7Z0JBQ25ELEtBQUssQ0FBQyxLQUFLLEdBQUcsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7YUFDOUI7U0FDRjtJQUNILENBQUM7O2dCQXpCRixTQUFTLFNBQUM7b0JBQ1QsUUFBUSxFQUFFLG9CQUFvQjtvQkFDOUIsMitCQUE4QztpQkFFL0M7OzsrQkFHRSxNQUFNOzRCQUNOLE1BQU07K0JBRU4sS0FBSzt3QkFDTCxLQUFLO3dCQUNMLEtBQUs7O0lBY1IsNkJBQUM7Q0FBQSxBQTFCRCxJQTBCQztTQXJCWSxzQkFBc0I7OztJQUVqQyw4Q0FBNEM7O0lBQzVDLDJDQUF5Qzs7SUFFekMsOENBQThCOztJQUM5Qix1Q0FBa0M7O0lBQ2xDLHVDQUF5Qzs7SUFFekMsZ0RBQWdEOztJQUNoRCw2Q0FBbUUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE91dHB1dCwgRXZlbnRFbWl0dGVyLCBJbnB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgSUJ1dHRvbk1lbnVJdGVtIH0gZnJvbSAnLi4vLi4vcHVibGljLWFwaSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ3JuZy1vcHRpb25zLWJ1dHRvbicsXG4gIHRlbXBsYXRlVXJsOiAnLi9vcHRpb25zLWJ1dHRvbi5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogW11cbn0pXG5leHBvcnQgY2xhc3MgT3B0aW9uc0J1dHRvbkNvbXBvbmVudCB7XG5cbiAgQE91dHB1dCgpIHByaW1hcnlDbGljayA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgQE91dHB1dCgpIGl0ZW1DbGljayA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICBASW5wdXQoKSBwcmltYXJ5VGl0bGU6IHN0cmluZztcbiAgQElucHV0KCkgaXRlbXM6IElCdXR0b25NZW51SXRlbVtdO1xuICBASW5wdXQoKSBjb2xvcjogc3RyaW5nIHwgbnVsbCA9ICdhY2NlbnQnO1xuXG4gIG9uUHJpbWFyeUNsaWNrID0gKCkgPT4gdGhpcy5wcmltYXJ5Q2xpY2suZW1pdCgpO1xuICBvbkl0ZW1DbGljayA9IChpdGVtOiBJQnV0dG9uTWVudUl0ZW0pID0+IHRoaXMuaXRlbUNsaWNrLmVtaXQoaXRlbSk7XG5cbiAgdG9nZ2xlQ2hhbmdlKGV2ZW50KSB7XG4gICAgY29uc3QgdG9nZ2xlID0gZXZlbnQuc291cmNlO1xuICAgIGlmICh0b2dnbGUpIHtcbiAgICAgIGNvbnN0IGdyb3VwID0gdG9nZ2xlLmJ1dHRvblRvZ2dsZUdyb3VwO1xuICAgICAgaWYgKGV2ZW50LnZhbHVlLnNvbWUoaXRlbSA9PiBpdGVtID09PSB0b2dnbGUudmFsdWUpKSB7XG4gICAgICAgIGdyb3VwLnZhbHVlID0gW3RvZ2dsZS52YWx1ZV07XG4gICAgICB9XG4gICAgfVxuICB9XG59XG4iXX0=