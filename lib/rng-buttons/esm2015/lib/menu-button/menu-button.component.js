/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input, Output, EventEmitter } from '@angular/core';
export class MenuButtonComponent {
    constructor() {
        this.items = ['Option 1', 'Option 2'];
        this.light = false;
        this.itemClick = new EventEmitter();
    }
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
if (false) {
    /** @type {?} */
    MenuButtonComponent.prototype.items;
    /** @type {?} */
    MenuButtonComponent.prototype.light;
    /** @type {?} */
    MenuButtonComponent.prototype.itemClick;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVudS1idXR0b24uY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHJuZy9idXR0b25zLyIsInNvdXJjZXMiOlsibGliL21lbnUtYnV0dG9uL21lbnUtYnV0dG9uLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLFlBQVksRUFBRSxNQUFNLGVBQWUsQ0FBQztBQU92RSxNQUFNLE9BQU8sbUJBQW1CO0lBTGhDO1FBTVcsVUFBSyxHQUFvQixDQUFDLFVBQVUsRUFBRSxVQUFVLENBQUMsQ0FBQztRQUNsRCxVQUFLLEdBQW1CLEtBQUssQ0FBQztRQUU3QixjQUFTLEdBQXlCLElBQUksWUFBWSxFQUFFLENBQUM7SUFDakUsQ0FBQzs7O1lBVkEsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxpQkFBaUI7Z0JBQzNCLHNwQkFBMkM7YUFFNUM7OztvQkFFRSxLQUFLO29CQUNMLEtBQUs7d0JBRUwsTUFBTTs7OztJQUhQLG9DQUEyRDs7SUFDM0Qsb0NBQXVDOztJQUV2Qyx3Q0FBK0QiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0LCBPdXRwdXQsIEV2ZW50RW1pdHRlciB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdybmctbWVudS1idXR0b24nLFxuICB0ZW1wbGF0ZVVybDogJy4vbWVudS1idXR0b24uY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFtdXG59KVxuZXhwb3J0IGNsYXNzIE1lbnVCdXR0b25Db21wb25lbnQge1xuICBASW5wdXQoKSBpdGVtczogc3RyaW5nW10gfCBudWxsID0gWydPcHRpb24gMScsICdPcHRpb24gMiddO1xuICBASW5wdXQoKSBsaWdodDogYm9vbGVhbiB8IG51bGwgPSBmYWxzZTtcblxuICBAT3V0cHV0KCkgaXRlbUNsaWNrOiBFdmVudEVtaXR0ZXI8c3RyaW5nPiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbn1cbiJdfQ==