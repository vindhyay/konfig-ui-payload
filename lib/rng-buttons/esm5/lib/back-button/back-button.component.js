/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
var BackButtonComponent = /** @class */ (function () {
    function BackButtonComponent(router, activeRoute) {
        this.router = router;
        this.activeRoute = activeRoute;
        this.light = false;
        this.historyMode = false;
        this.backByUrl = null;
    }
    Object.defineProperty(BackButtonComponent.prototype, "backRelative", {
        get: /**
         * @return {?}
         */
        function () {
            switch (this.backSteps) {
                case 1: return this.activeRoute;
                case 2: return this.activeRoute.parent;
                case 3: return this.activeRoute.parent.parent;
                // we could implement some recursion here but also it could require to navigate to "root" (0 for example)
                default: return this.activeRoute.root.firstChild; // root's firstchild -1 should give us the root itself
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    BackButtonComponent.prototype.goBack = /**
     * @return {?}
     */
    function () {
        if (this.historyMode) {
            history.go(-this.backSteps);
        }
        else if (this.backByUrl) {
            this.router.navigateByUrl(this.backByUrl);
        }
        else {
            this.router.navigate(['../'], { relativeTo: this.backRelative });
        }
    };
    BackButtonComponent.decorators = [
        { type: Component, args: [{
                    selector: 'rng-back-button',
                    template: "<button mat-icon-button\n  [ngClass]=\"{'mat-white': light}\"\n  (click)=\"goBack()\"><i class=\"rng-icon rng-icon-arrow_back\"></i></button>"
                }] }
    ];
    /** @nocollapse */
    BackButtonComponent.ctorParameters = function () { return [
        { type: Router },
        { type: ActivatedRoute }
    ]; };
    BackButtonComponent.propDecorators = {
        light: [{ type: Input }],
        backSteps: [{ type: Input }],
        historyMode: [{ type: Input }],
        backByUrl: [{ type: Input }]
    };
    return BackButtonComponent;
}());
export { BackButtonComponent };
if (false) {
    /** @type {?} */
    BackButtonComponent.prototype.light;
    /** @type {?} */
    BackButtonComponent.prototype.backSteps;
    /** @type {?} */
    BackButtonComponent.prototype.historyMode;
    /** @type {?} */
    BackButtonComponent.prototype.backByUrl;
    /**
     * @type {?}
     * @private
     */
    BackButtonComponent.prototype.router;
    /**
     * @type {?}
     * @private
     */
    BackButtonComponent.prototype.activeRoute;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFjay1idXR0b24uY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHJuZy9idXR0b25zLyIsInNvdXJjZXMiOlsibGliL2JhY2stYnV0dG9uL2JhY2stYnV0dG9uLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDakQsT0FBTyxFQUFFLE1BQU0sRUFBRSxjQUFjLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUV6RDtJQVdFLDZCQUNVLE1BQWMsRUFDZCxXQUEyQjtRQUQzQixXQUFNLEdBQU4sTUFBTSxDQUFRO1FBQ2QsZ0JBQVcsR0FBWCxXQUFXLENBQWdCO1FBUDVCLFVBQUssR0FBbUIsS0FBSyxDQUFDO1FBRTlCLGdCQUFXLEdBQW1CLEtBQUssQ0FBQztRQUNwQyxjQUFTLEdBQW1CLElBQUksQ0FBQztJQUt2QyxDQUFDO0lBRUosc0JBQUksNkNBQVk7Ozs7UUFBaEI7WUFDRSxRQUFRLElBQUksQ0FBQyxTQUFTLEVBQUU7Z0JBQ3RCLEtBQUssQ0FBQyxDQUFDLENBQUMsT0FBTyxJQUFJLENBQUMsV0FBVyxDQUFDO2dCQUNoQyxLQUFLLENBQUMsQ0FBQyxDQUFDLE9BQU8sSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUM7Z0JBQ3ZDLEtBQUssQ0FBQyxDQUFDLENBQUMsT0FBTyxJQUFJLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUM7Z0JBQzlDLHlHQUF5RztnQkFDekcsT0FBTyxDQUFDLENBQUMsT0FBTyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxzREFBc0Q7YUFDekc7UUFFSCxDQUFDOzs7T0FBQTs7OztJQUNELG9DQUFNOzs7SUFBTjtRQUNFLElBQUksSUFBSSxDQUFDLFdBQVcsRUFBRTtZQUNwQixPQUFPLENBQUMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1NBQzdCO2FBQU0sSUFBSSxJQUFJLENBQUMsU0FBUyxFQUFFO1lBQ3pCLElBQUksQ0FBQyxNQUFNLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztTQUMzQzthQUFNO1lBQ0wsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxLQUFLLENBQUMsRUFBRSxFQUFFLFVBQVUsRUFBRSxJQUFJLENBQUMsWUFBWSxFQUFFLENBQUMsQ0FBQztTQUNsRTtJQUNILENBQUM7O2dCQWxDRixTQUFTLFNBQUM7b0JBQ1QsUUFBUSxFQUFFLGlCQUFpQjtvQkFDM0IseUpBQTJDO2lCQUU1Qzs7OztnQkFOUSxNQUFNO2dCQUFFLGNBQWM7Ozt3QkFRNUIsS0FBSzs0QkFDTCxLQUFLOzhCQUNMLEtBQUs7NEJBQ0wsS0FBSzs7SUEwQlIsMEJBQUM7Q0FBQSxBQW5DRCxJQW1DQztTQTlCWSxtQkFBbUI7OztJQUM5QixvQ0FBdUM7O0lBQ3ZDLHdDQUFrQzs7SUFDbEMsMENBQTZDOztJQUM3Qyx3Q0FBMEM7Ozs7O0lBR3hDLHFDQUFzQjs7Ozs7SUFDdEIsMENBQW1DIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgUm91dGVyLCBBY3RpdmF0ZWRSb3V0ZSB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ3JuZy1iYWNrLWJ1dHRvbicsXG4gIHRlbXBsYXRlVXJsOiAnLi9iYWNrLWJ1dHRvbi5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogW11cbn0pXG5leHBvcnQgY2xhc3MgQmFja0J1dHRvbkNvbXBvbmVudCB7XG4gIEBJbnB1dCgpIGxpZ2h0OiBib29sZWFuIHwgbnVsbCA9IGZhbHNlO1xuICBASW5wdXQoKSBiYWNrU3RlcHM6IG51bWJlciB8IG51bGw7XG4gIEBJbnB1dCgpIGhpc3RvcnlNb2RlOiBib29sZWFuIHwgbnVsbCA9IGZhbHNlO1xuICBASW5wdXQoKSBiYWNrQnlVcmw6IHN0cmluZyB8IG51bGwgID0gbnVsbDtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIHJvdXRlcjogUm91dGVyLFxuICAgIHByaXZhdGUgYWN0aXZlUm91dGU6IEFjdGl2YXRlZFJvdXRlLFxuICApIHt9XG5cbiAgZ2V0IGJhY2tSZWxhdGl2ZSgpIHtcbiAgICBzd2l0Y2ggKHRoaXMuYmFja1N0ZXBzKSB7XG4gICAgICBjYXNlIDE6IHJldHVybiB0aGlzLmFjdGl2ZVJvdXRlO1xuICAgICAgY2FzZSAyOiByZXR1cm4gdGhpcy5hY3RpdmVSb3V0ZS5wYXJlbnQ7XG4gICAgICBjYXNlIDM6IHJldHVybiB0aGlzLmFjdGl2ZVJvdXRlLnBhcmVudC5wYXJlbnQ7XG4gICAgICAvLyB3ZSBjb3VsZCBpbXBsZW1lbnQgc29tZSByZWN1cnNpb24gaGVyZSBidXQgYWxzbyBpdCBjb3VsZCByZXF1aXJlIHRvIG5hdmlnYXRlIHRvIFwicm9vdFwiICgwIGZvciBleGFtcGxlKVxuICAgICAgZGVmYXVsdDogcmV0dXJuIHRoaXMuYWN0aXZlUm91dGUucm9vdC5maXJzdENoaWxkOyAvLyByb290J3MgZmlyc3RjaGlsZCAtMSBzaG91bGQgZ2l2ZSB1cyB0aGUgcm9vdCBpdHNlbGZcbiAgICB9XG5cbiAgfVxuICBnb0JhY2soKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuaGlzdG9yeU1vZGUpIHtcbiAgICAgIGhpc3RvcnkuZ28oLXRoaXMuYmFja1N0ZXBzKTtcbiAgICB9IGVsc2UgaWYgKHRoaXMuYmFja0J5VXJsKSB7XG4gICAgICB0aGlzLnJvdXRlci5uYXZpZ2F0ZUJ5VXJsKHRoaXMuYmFja0J5VXJsKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5yb3V0ZXIubmF2aWdhdGUoWycuLi8nXSwgeyByZWxhdGl2ZVRvOiB0aGlzLmJhY2tSZWxhdGl2ZSB9KTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==