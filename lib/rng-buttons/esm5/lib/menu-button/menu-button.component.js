/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input, Output, EventEmitter } from '@angular/core';
var MenuButtonComponent = /** @class */ (function () {
    function MenuButtonComponent() {
        this.items = ['Option 1', 'Option 2'];
        this.light = false;
        this.itemClick = new EventEmitter();
    }
    MenuButtonComponent.decorators = [
        { type: Component, args: [{
                    selector: 'rng-menu-button',
                    template: "<div class=\"rng-menu-button\">\n  <button mat-icon-button\n    [matMenuTriggerFor]=\"menu\"\n    color=\"{{light?'white':''}}\"\n    (click)=\"$event.stopPropagation()\">\n    <i class=\"rng-icon rng-icon-more_vert\"></i>\n  </button>\n  <mat-menu #menu=\"matMenu\"\n    class=\"rng-menu-button-list\"\n    yPosition=\"below\"\n    xPosition=\"before\">\n    <div *ngFor=\"let item of items\">\n      <button *ngIf=\"item!='divider'\"\n        mat-menu-item\n        (click)=\"itemClick.emit(item)\">\n        <span>{{ item }}</span>\n      </button>\n      <mat-divider *ngIf=\"item==='divider'\"></mat-divider>\n    </div>\n  </mat-menu>\n</div>\n"
                }] }
    ];
    MenuButtonComponent.propDecorators = {
        items: [{ type: Input }],
        light: [{ type: Input }],
        itemClick: [{ type: Output }]
    };
    return MenuButtonComponent;
}());
export { MenuButtonComponent };
if (false) {
    /** @type {?} */
    MenuButtonComponent.prototype.items;
    /** @type {?} */
    MenuButtonComponent.prototype.light;
    /** @type {?} */
    MenuButtonComponent.prototype.itemClick;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVudS1idXR0b24uY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHJuZy9idXR0b25zLyIsInNvdXJjZXMiOlsibGliL21lbnUtYnV0dG9uL21lbnUtYnV0dG9uLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLFlBQVksRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUV2RTtJQUFBO1FBTVcsVUFBSyxHQUFvQixDQUFDLFVBQVUsRUFBRSxVQUFVLENBQUMsQ0FBQztRQUNsRCxVQUFLLEdBQW1CLEtBQUssQ0FBQztRQUU3QixjQUFTLEdBQXlCLElBQUksWUFBWSxFQUFFLENBQUM7SUFDakUsQ0FBQzs7Z0JBVkEsU0FBUyxTQUFDO29CQUNULFFBQVEsRUFBRSxpQkFBaUI7b0JBQzNCLHNwQkFBMkM7aUJBRTVDOzs7d0JBRUUsS0FBSzt3QkFDTCxLQUFLOzRCQUVMLE1BQU07O0lBQ1QsMEJBQUM7Q0FBQSxBQVZELElBVUM7U0FMWSxtQkFBbUI7OztJQUM5QixvQ0FBMkQ7O0lBQzNELG9DQUF1Qzs7SUFFdkMsd0NBQStEIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCwgT3V0cHV0LCBFdmVudEVtaXR0ZXIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAncm5nLW1lbnUtYnV0dG9uJyxcbiAgdGVtcGxhdGVVcmw6ICcuL21lbnUtYnV0dG9uLmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbXVxufSlcbmV4cG9ydCBjbGFzcyBNZW51QnV0dG9uQ29tcG9uZW50IHtcbiAgQElucHV0KCkgaXRlbXM6IHN0cmluZ1tdIHwgbnVsbCA9IFsnT3B0aW9uIDEnLCAnT3B0aW9uIDInXTtcbiAgQElucHV0KCkgbGlnaHQ6IGJvb2xlYW4gfCBudWxsID0gZmFsc2U7XG5cbiAgQE91dHB1dCgpIGl0ZW1DbGljazogRXZlbnRFbWl0dGVyPHN0cmluZz4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG59XG4iXX0=