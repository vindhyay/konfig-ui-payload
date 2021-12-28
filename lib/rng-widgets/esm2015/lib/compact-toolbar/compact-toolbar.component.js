/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';
export class CompactToolbarComponent {
    constructor() {
        this.withSearch = false;
        this.searchChange = new EventEmitter();
        this.searchToggle = false;
        this.searchText = '';
        this.search = new FormControl();
        this.subscription = new Subscription();
        this.changeSearch = (/**
         * @param {?} text
         * @return {?}
         */
        (text) => this.searchChange.emit(text));
    }
    /**
     * @param {?} toggle
     * @return {?}
     */
    toggleSearch(toggle) {
        this.searchToggle = toggle;
        if (toggle) {
            setTimeout((/**
             * @return {?}
             */
            () => this.searchfield.nativeElement.focus()), 0);
        }
        else {
            this.search.setValue('');
        }
    }
    /**
     * @return {?}
     */
    ngAfterViewInit() {
        this.subscription.add(this.search.valueChanges.subscribe((/**
         * @param {?} val
         * @return {?}
         */
        val => this.changeSearch(val))));
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}
CompactToolbarComponent.decorators = [
    { type: Component, args: [{
                selector: 'rng-compact-toolbar',
                template: "<mat-toolbar>\n  <mat-toolbar-row *ngIf=\"!searchToggle\">\n    <span>{{title}}</span>\n    <span class=\"spacer\"></span>\n    <ng-content></ng-content>\n    <button mat-icon-button *ngIf=\"withSearch\"\n      (click)=\"toggleSearch(true)\">\n      <i class=\"rng-icon rng-icon-search\"></i>\n    </button>    \n  </mat-toolbar-row>\n  <mat-toolbar-row *ngIf=\"searchToggle\">\n    <div class=\"spacer\">\n      <mat-form-field appearance=\"none\"\n        class=\"full-width\">\n        <input matInput #searchfield\n          type=\"search\"\n          [formControl]=\"search\">\n      </mat-form-field>\n    </div>\n    <button mat-icon-button *ngIf=\"withSearch\"\n      class=\"button-toggle\"\n      (click)=\"toggleSearch(false)\">\n      <i class=\"rng-icon rng-icon-search\"></i>\n    </button>    \n  </mat-toolbar-row>\n</mat-toolbar>\n  \n"
            }] }
];
CompactToolbarComponent.propDecorators = {
    title: [{ type: Input }],
    withSearch: [{ type: Input }],
    searchChange: [{ type: Output }],
    searchfield: [{ type: ViewChild, args: ['searchfield', { static: false },] }]
};
if (false) {
    /** @type {?} */
    CompactToolbarComponent.prototype.title;
    /** @type {?} */
    CompactToolbarComponent.prototype.withSearch;
    /** @type {?} */
    CompactToolbarComponent.prototype.searchChange;
    /** @type {?} */
    CompactToolbarComponent.prototype.searchfield;
    /** @type {?} */
    CompactToolbarComponent.prototype.searchToggle;
    /** @type {?} */
    CompactToolbarComponent.prototype.searchText;
    /** @type {?} */
    CompactToolbarComponent.prototype.search;
    /** @type {?} */
    CompactToolbarComponent.prototype.subscription;
    /** @type {?} */
    CompactToolbarComponent.prototype.changeSearch;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tcGFjdC10b29sYmFyLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0Bybmcvd2lkZ2V0cy8iLCJzb3VyY2VzIjpbImxpYi9jb21wYWN0LXRvb2xiYXIvY29tcGFjdC10b29sYmFyLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLFlBQVksRUFBNEIsU0FBUyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN4SCxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDN0MsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLE1BQU0sQ0FBQztBQU9wQyxNQUFNLE9BQU8sdUJBQXVCO0lBTHBDO1FBUVcsZUFBVSxHQUFtQixLQUFLLENBQUM7UUFFbEMsaUJBQVksR0FBRyxJQUFJLFlBQVksRUFBRSxDQUFDO1FBSTVDLGlCQUFZLEdBQUcsS0FBSyxDQUFDO1FBQ3JCLGVBQVUsR0FBRyxFQUFFLENBQUM7UUFFaEIsV0FBTSxHQUFHLElBQUksV0FBVyxFQUFFLENBQUM7UUFDM0IsaUJBQVksR0FBRyxJQUFJLFlBQVksRUFBRSxDQUFDO1FBRWxDLGlCQUFZOzs7O1FBQUcsQ0FBQyxJQUFZLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFDO0lBb0JoRSxDQUFDOzs7OztJQWxCQyxZQUFZLENBQUMsTUFBZTtRQUMxQixJQUFJLENBQUMsWUFBWSxHQUFHLE1BQU0sQ0FBQztRQUMzQixJQUFJLE1BQU0sRUFBRTtZQUNWLFVBQVU7OztZQUFDLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsYUFBYSxDQUFDLEtBQUssRUFBRSxHQUFFLENBQUMsQ0FBQyxDQUFDO1NBQzdEO2FBQU07WUFDTCxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsQ0FBQztTQUMxQjtJQUNILENBQUM7Ozs7SUFFRCxlQUFlO1FBQ2IsSUFBSSxDQUFDLFlBQVksQ0FBQyxHQUFHLENBQ25CLElBQUksQ0FBQyxNQUFNLENBQUMsWUFBWSxDQUFDLFNBQVM7Ozs7UUFBQyxHQUFHLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsR0FBRyxDQUFDLEVBQUMsQ0FDbEUsQ0FBQztJQUNKLENBQUM7Ozs7SUFFRCxXQUFXO1FBQ1QsSUFBSSxDQUFDLFlBQVksQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUNsQyxDQUFDOzs7WUF2Q0YsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxxQkFBcUI7Z0JBQy9CLGcyQkFBK0M7YUFFaEQ7OztvQkFHRSxLQUFLO3lCQUNMLEtBQUs7MkJBRUwsTUFBTTswQkFFTixTQUFTLFNBQUMsYUFBYSxFQUFFLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRTs7OztJQUwzQyx3Q0FBdUI7O0lBQ3ZCLDZDQUE0Qzs7SUFFNUMsK0NBQTRDOztJQUU1Qyw4Q0FBcUU7O0lBRXJFLCtDQUFxQjs7SUFDckIsNkNBQWdCOztJQUVoQix5Q0FBMkI7O0lBQzNCLCtDQUFrQzs7SUFFbEMsK0NBQThEIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCwgT3V0cHV0LCBFdmVudEVtaXR0ZXIsIEFmdGVyVmlld0luaXQsIE9uRGVzdHJveSwgVmlld0NoaWxkLCBFbGVtZW50UmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBGb3JtQ29udHJvbCB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdybmctY29tcGFjdC10b29sYmFyJyxcbiAgdGVtcGxhdGVVcmw6ICcuL2NvbXBhY3QtdG9vbGJhci5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogW11cbn0pXG5leHBvcnQgY2xhc3MgQ29tcGFjdFRvb2xiYXJDb21wb25lbnQgaW1wbGVtZW50cyBBZnRlclZpZXdJbml0LCBPbkRlc3Ryb3kge1xuXG4gIEBJbnB1dCgpIHRpdGxlOiBzdHJpbmc7XG4gIEBJbnB1dCgpIHdpdGhTZWFyY2g6IGJvb2xlYW4gfCBudWxsID0gZmFsc2U7XG5cbiAgQE91dHB1dCgpIHNlYXJjaENoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICBAVmlld0NoaWxkKCdzZWFyY2hmaWVsZCcsIHsgc3RhdGljOiBmYWxzZSB9KSBzZWFyY2hmaWVsZDogRWxlbWVudFJlZjtcblxuICBzZWFyY2hUb2dnbGUgPSBmYWxzZTtcbiAgc2VhcmNoVGV4dCA9ICcnO1xuXG4gIHNlYXJjaCA9IG5ldyBGb3JtQ29udHJvbCgpO1xuICBzdWJzY3JpcHRpb24gPSBuZXcgU3Vic2NyaXB0aW9uKCk7XG5cbiAgY2hhbmdlU2VhcmNoID0gKHRleHQ6IHN0cmluZykgPT4gdGhpcy5zZWFyY2hDaGFuZ2UuZW1pdCh0ZXh0KTtcblxuICB0b2dnbGVTZWFyY2godG9nZ2xlOiBib29sZWFuKSB7XG4gICAgdGhpcy5zZWFyY2hUb2dnbGUgPSB0b2dnbGU7XG4gICAgaWYgKHRvZ2dsZSkge1xuICAgICAgc2V0VGltZW91dCgoKSA9PiB0aGlzLnNlYXJjaGZpZWxkLm5hdGl2ZUVsZW1lbnQuZm9jdXMoKSwgMCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuc2VhcmNoLnNldFZhbHVlKCcnKTtcbiAgICB9XG4gIH1cblxuICBuZ0FmdGVyVmlld0luaXQoKSB7XG4gICAgdGhpcy5zdWJzY3JpcHRpb24uYWRkKFxuICAgICAgdGhpcy5zZWFyY2gudmFsdWVDaGFuZ2VzLnN1YnNjcmliZSh2YWwgPT4gdGhpcy5jaGFuZ2VTZWFyY2godmFsKSlcbiAgICApO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgdGhpcy5zdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgfVxufVxuIl19