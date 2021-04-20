/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
export class BackButtonComponent {
    /**
     * @param {?} router
     * @param {?} activeRoute
     */
    constructor(router, activeRoute) {
        this.router = router;
        this.activeRoute = activeRoute;
        this.light = false;
        this.historyMode = false;
        this.backByUrl = null;
    }
    /**
     * @return {?}
     */
    get backRelative() {
        switch (this.backSteps) {
            case 1: return this.activeRoute;
            case 2: return this.activeRoute.parent;
            case 3: return this.activeRoute.parent.parent;
            // we could implement some recursion here but also it could require to navigate to "root" (0 for example)
            default: return this.activeRoute.root.firstChild; // root's firstchild -1 should give us the root itself
        }
    }
    /**
     * @return {?}
     */
    goBack() {
        if (this.historyMode) {
            history.go(-this.backSteps);
        }
        else if (this.backByUrl) {
            this.router.navigateByUrl(this.backByUrl);
        }
        else {
            this.router.navigate(['../'], { relativeTo: this.backRelative });
        }
    }
}
BackButtonComponent.decorators = [
    { type: Component, args: [{
                selector: 'rng-back-button',
                template: "<button mat-icon-button\n  [ngClass]=\"{'mat-white': light}\"\n  (click)=\"goBack()\"><i class=\"rng-icon rng-icon-arrow_back\"></i></button>"
            }] }
];
/** @nocollapse */
BackButtonComponent.ctorParameters = () => [
    { type: Router },
    { type: ActivatedRoute }
];
BackButtonComponent.propDecorators = {
    light: [{ type: Input }],
    backSteps: [{ type: Input }],
    historyMode: [{ type: Input }],
    backByUrl: [{ type: Input }]
};
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFjay1idXR0b24uY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHJuZy9idXR0b25zLyIsInNvdXJjZXMiOlsibGliL2JhY2stYnV0dG9uL2JhY2stYnV0dG9uLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDakQsT0FBTyxFQUFFLE1BQU0sRUFBRSxjQUFjLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQU96RCxNQUFNLE9BQU8sbUJBQW1COzs7OztJQU05QixZQUNVLE1BQWMsRUFDZCxXQUEyQjtRQUQzQixXQUFNLEdBQU4sTUFBTSxDQUFRO1FBQ2QsZ0JBQVcsR0FBWCxXQUFXLENBQWdCO1FBUDVCLFVBQUssR0FBbUIsS0FBSyxDQUFDO1FBRTlCLGdCQUFXLEdBQW1CLEtBQUssQ0FBQztRQUNwQyxjQUFTLEdBQW1CLElBQUksQ0FBQztJQUt2QyxDQUFDOzs7O0lBRUosSUFBSSxZQUFZO1FBQ2QsUUFBUSxJQUFJLENBQUMsU0FBUyxFQUFFO1lBQ3RCLEtBQUssQ0FBQyxDQUFDLENBQUMsT0FBTyxJQUFJLENBQUMsV0FBVyxDQUFDO1lBQ2hDLEtBQUssQ0FBQyxDQUFDLENBQUMsT0FBTyxJQUFJLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQztZQUN2QyxLQUFLLENBQUMsQ0FBQyxDQUFDLE9BQU8sSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDO1lBQzlDLHlHQUF5RztZQUN6RyxPQUFPLENBQUMsQ0FBQyxPQUFPLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLHNEQUFzRDtTQUN6RztJQUVILENBQUM7Ozs7SUFDRCxNQUFNO1FBQ0osSUFBSSxJQUFJLENBQUMsV0FBVyxFQUFFO1lBQ3BCLE9BQU8sQ0FBQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7U0FDN0I7YUFBTSxJQUFJLElBQUksQ0FBQyxTQUFTLEVBQUU7WUFDekIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1NBQzNDO2FBQU07WUFDTCxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLEtBQUssQ0FBQyxFQUFFLEVBQUUsVUFBVSxFQUFFLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQyxDQUFDO1NBQ2xFO0lBQ0gsQ0FBQzs7O1lBbENGLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsaUJBQWlCO2dCQUMzQix5SkFBMkM7YUFFNUM7Ozs7WUFOUSxNQUFNO1lBQUUsY0FBYzs7O29CQVE1QixLQUFLO3dCQUNMLEtBQUs7MEJBQ0wsS0FBSzt3QkFDTCxLQUFLOzs7O0lBSE4sb0NBQXVDOztJQUN2Qyx3Q0FBa0M7O0lBQ2xDLDBDQUE2Qzs7SUFDN0Msd0NBQTBDOzs7OztJQUd4QyxxQ0FBc0I7Ozs7O0lBQ3RCLDBDQUFtQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFJvdXRlciwgQWN0aXZhdGVkUm91dGUgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdybmctYmFjay1idXR0b24nLFxuICB0ZW1wbGF0ZVVybDogJy4vYmFjay1idXR0b24uY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFtdXG59KVxuZXhwb3J0IGNsYXNzIEJhY2tCdXR0b25Db21wb25lbnQge1xuICBASW5wdXQoKSBsaWdodDogYm9vbGVhbiB8IG51bGwgPSBmYWxzZTtcbiAgQElucHV0KCkgYmFja1N0ZXBzOiBudW1iZXIgfCBudWxsO1xuICBASW5wdXQoKSBoaXN0b3J5TW9kZTogYm9vbGVhbiB8IG51bGwgPSBmYWxzZTtcbiAgQElucHV0KCkgYmFja0J5VXJsOiBzdHJpbmcgfCBudWxsICA9IG51bGw7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSByb3V0ZXI6IFJvdXRlcixcbiAgICBwcml2YXRlIGFjdGl2ZVJvdXRlOiBBY3RpdmF0ZWRSb3V0ZSxcbiAgKSB7fVxuXG4gIGdldCBiYWNrUmVsYXRpdmUoKSB7XG4gICAgc3dpdGNoICh0aGlzLmJhY2tTdGVwcykge1xuICAgICAgY2FzZSAxOiByZXR1cm4gdGhpcy5hY3RpdmVSb3V0ZTtcbiAgICAgIGNhc2UgMjogcmV0dXJuIHRoaXMuYWN0aXZlUm91dGUucGFyZW50O1xuICAgICAgY2FzZSAzOiByZXR1cm4gdGhpcy5hY3RpdmVSb3V0ZS5wYXJlbnQucGFyZW50O1xuICAgICAgLy8gd2UgY291bGQgaW1wbGVtZW50IHNvbWUgcmVjdXJzaW9uIGhlcmUgYnV0IGFsc28gaXQgY291bGQgcmVxdWlyZSB0byBuYXZpZ2F0ZSB0byBcInJvb3RcIiAoMCBmb3IgZXhhbXBsZSlcbiAgICAgIGRlZmF1bHQ6IHJldHVybiB0aGlzLmFjdGl2ZVJvdXRlLnJvb3QuZmlyc3RDaGlsZDsgLy8gcm9vdCdzIGZpcnN0Y2hpbGQgLTEgc2hvdWxkIGdpdmUgdXMgdGhlIHJvb3QgaXRzZWxmXG4gICAgfVxuXG4gIH1cbiAgZ29CYWNrKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLmhpc3RvcnlNb2RlKSB7XG4gICAgICBoaXN0b3J5LmdvKC10aGlzLmJhY2tTdGVwcyk7XG4gICAgfSBlbHNlIGlmICh0aGlzLmJhY2tCeVVybCkge1xuICAgICAgdGhpcy5yb3V0ZXIubmF2aWdhdGVCeVVybCh0aGlzLmJhY2tCeVVybCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMucm91dGVyLm5hdmlnYXRlKFsnLi4vJ10sIHsgcmVsYXRpdmVUbzogdGhpcy5iYWNrUmVsYXRpdmUgfSk7XG4gICAgfVxuICB9XG59XG4iXX0=