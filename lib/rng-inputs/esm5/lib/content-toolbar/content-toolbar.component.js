/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input, Output, EventEmitter } from '@angular/core';
var ContentToolbarComponent = /** @class */ (function () {
    function ContentToolbarComponent() {
        this.gridButton = false;
        this.filterButton = false;
        this.showFilters = false;
        this.grid = true;
        this.changeGrid = new EventEmitter();
        this.searchData = new EventEmitter();
        this.filterClick = new EventEmitter();
        // new:
        this.filterChanged = new EventEmitter();
        // end of grid function
    }
    // search function
    // search function
    /**
     * @param {?} val
     * @return {?}
     */
    ContentToolbarComponent.prototype.onSearchChange = 
    // search function
    /**
     * @param {?} val
     * @return {?}
     */
    function (val) {
        this.searchData.emit(val);
    };
    // end of search function
    // filter
    // end of search function
    // filter
    /**
     * @return {?}
     */
    ContentToolbarComponent.prototype.filterButtonClick = 
    // end of search function
    // filter
    /**
     * @return {?}
     */
    function () {
        this.filterClick.emit();
    };
    /**
     * @param {?} state
     * @return {?}
     */
    ContentToolbarComponent.prototype.changeFilter = /**
     * @param {?} state
     * @return {?}
     */
    function (state) {
        this.filterChanged.emit(state);
    };
    // end of filter
    // grid function
    // end of filter
    // grid function
    /**
     * @return {?}
     */
    ContentToolbarComponent.prototype.gridFunction = 
    // end of filter
    // grid function
    /**
     * @return {?}
     */
    function () {
        this.grid = !this.grid;
        this.changeGrid.emit();
    };
    ContentToolbarComponent.decorators = [
        { type: Component, args: [{
                    selector: 'rng-content-toolbar',
                    template: "<div class=\"content-toolbar\">\n  <rng-simple-search\n    [data]=\"searchValue\"\n    (searchChange)=\"onSearchChange($event)\"></rng-simple-search>\n  <div class=\"spacer\"></div>\n  <ng-content custom-filters></ng-content>\n  <div class=\"toolbar-filter\"\n    *ngIf=\"showFilters\">\n    <ng-template ngFor let-filter [ngForOf]=\"filters\">\n      <ng-container [ngSwitch]=\"filter.type\">\n        <rng-bindable-select *ngSwitchCase=\"'single'\"\n          appearance=\"none\"\n          [items]=\"filter.items\"\n          [placeholder]=\"filter.placeholder\"\n          [formControl]=\"filter.control\"\n                             (change)=\"changeFilter($event)\"\n          [disableOptionCentering]=\"true\"></rng-bindable-select>\n        <rng-bindable-select-multi *ngSwitchCase=\"'multi'\"\n          appearance=\"none\"\n          [items]=\"filter.items\"\n          [placeholder]=\"filter.placeholder\"\n          [formControl]=\"filter.control\"\n          [disableOptionCentering]=\"true\"></rng-bindable-select-multi>\n        <span *ngSwitchDefault>filter type '{{filter.type}}' not yet supported</span>\n      </ng-container>\n    </ng-template>\n  </div>\n  <button *ngIf=\"filterButton\"\n    mat-icon-button\n    [ngClass]=\"{'button-toggle': showFilters}\"\n    (click)=\"filterButtonClick()\"><i class=\"rng-icon rng-icon-filter_list\"></i></button>\n  <button *ngIf=\"gridButton\"\n    mat-icon-button\n    [ngClass]=\"{'button-toggle': gridButton && grid}\"\n    (click)=\"gridFunction()\">\n    <i *ngIf=\"grid\"\n      class=\"rng-icon rng-icon-view_list\"></i>\n    <i *ngIf=\"!grid\"\n      class=\"rng-icon rng-icon-view_grid\"></i>\n  </button>\n</div>\n"
                }] }
    ];
    ContentToolbarComponent.propDecorators = {
        gridButton: [{ type: Input }],
        filterButton: [{ type: Input }],
        filters: [{ type: Input }],
        showFilters: [{ type: Input }],
        grid: [{ type: Input }],
        searchValue: [{ type: Input }],
        changeGrid: [{ type: Output }],
        searchData: [{ type: Output }],
        filterClick: [{ type: Output }],
        filterChanged: [{ type: Output }]
    };
    return ContentToolbarComponent;
}());
export { ContentToolbarComponent };
if (false) {
    /** @type {?} */
    ContentToolbarComponent.prototype.gridButton;
    /** @type {?} */
    ContentToolbarComponent.prototype.filterButton;
    /** @type {?} */
    ContentToolbarComponent.prototype.filters;
    /** @type {?} */
    ContentToolbarComponent.prototype.showFilters;
    /** @type {?} */
    ContentToolbarComponent.prototype.grid;
    /** @type {?} */
    ContentToolbarComponent.prototype.searchValue;
    /** @type {?} */
    ContentToolbarComponent.prototype.changeGrid;
    /** @type {?} */
    ContentToolbarComponent.prototype.searchData;
    /** @type {?} */
    ContentToolbarComponent.prototype.filterClick;
    /** @type {?} */
    ContentToolbarComponent.prototype.filterChanged;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udGVudC10b29sYmFyLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BybmcvaW5wdXRzLyIsInNvdXJjZXMiOlsibGliL2NvbnRlbnQtdG9vbGJhci9jb250ZW50LXRvb2xiYXIuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsWUFBWSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBR3ZFO0lBQUE7UUFNVyxlQUFVLEdBQW1CLEtBQUssQ0FBQztRQUNuQyxpQkFBWSxHQUFtQixLQUFLLENBQUM7UUFHckMsZ0JBQVcsR0FBbUIsS0FBSyxDQUFDO1FBQ3BDLFNBQUksR0FBbUIsSUFBSSxDQUFDO1FBRzNCLGVBQVUsR0FBRyxJQUFJLFlBQVksRUFBRSxDQUFDO1FBQ2hDLGVBQVUsR0FBRyxJQUFJLFlBQVksRUFBRSxDQUFDO1FBQ2hDLGdCQUFXLEdBQUcsSUFBSSxZQUFZLEVBQUUsQ0FBQzs7UUFFakMsa0JBQWEsR0FBRyxJQUFJLFlBQVksRUFBRSxDQUFDO1FBdUI3Qyx1QkFBdUI7SUFDekIsQ0FBQztJQXRCQyxrQkFBa0I7Ozs7OztJQUNsQixnREFBYzs7Ozs7O0lBQWQsVUFBZSxHQUFHO1FBQ2hCLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQzVCLENBQUM7SUFDRCx5QkFBeUI7SUFFekIsU0FBUzs7Ozs7O0lBQ1QsbURBQWlCOzs7Ozs7SUFBakI7UUFDRSxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksRUFBRSxDQUFDO0lBQzFCLENBQUM7Ozs7O0lBRUQsOENBQVk7Ozs7SUFBWixVQUFhLEtBQUs7UUFDaEIsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDakMsQ0FBQztJQUNELGdCQUFnQjtJQUVoQixnQkFBZ0I7Ozs7OztJQUNoQiw4Q0FBWTs7Ozs7O0lBQVo7UUFDRSxJQUFJLENBQUMsSUFBSSxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQztRQUN2QixJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksRUFBRSxDQUFDO0lBQ3pCLENBQUM7O2dCQXhDRixTQUFTLFNBQUM7b0JBQ1QsUUFBUSxFQUFFLHFCQUFxQjtvQkFDL0Isb3FEQUErQztpQkFFaEQ7Ozs2QkFFRSxLQUFLOytCQUNMLEtBQUs7MEJBRUwsS0FBSzs4QkFDTCxLQUFLO3VCQUNMLEtBQUs7OEJBQ0wsS0FBSzs2QkFFTCxNQUFNOzZCQUNOLE1BQU07OEJBQ04sTUFBTTtnQ0FFTixNQUFNOztJQXdCVCw4QkFBQztDQUFBLEFBMUNELElBMENDO1NBckNZLHVCQUF1Qjs7O0lBQ2xDLDZDQUE0Qzs7SUFDNUMsK0NBQThDOztJQUU5QywwQ0FBa0M7O0lBQ2xDLDhDQUE2Qzs7SUFDN0MsdUNBQXFDOztJQUNyQyw4Q0FBNkI7O0lBRTdCLDZDQUEwQzs7SUFDMUMsNkNBQTBDOztJQUMxQyw4Q0FBMkM7O0lBRTNDLGdEQUE2QyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQsIE91dHB1dCwgRXZlbnRFbWl0dGVyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBGaWx0ZXJQcmVzZXRzIH0gZnJvbSAnLi4vLi4vbW9kZWwvY29tbW9uLXR5cGVzJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAncm5nLWNvbnRlbnQtdG9vbGJhcicsXG4gIHRlbXBsYXRlVXJsOiAnLi9jb250ZW50LXRvb2xiYXIuY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFtdLFxufSlcbmV4cG9ydCBjbGFzcyBDb250ZW50VG9vbGJhckNvbXBvbmVudCB7XG4gIEBJbnB1dCgpIGdyaWRCdXR0b246IGJvb2xlYW4gfCBudWxsID0gZmFsc2U7XG4gIEBJbnB1dCgpIGZpbHRlckJ1dHRvbjogYm9vbGVhbiB8IG51bGwgPSBmYWxzZTtcbiAgLy8gbmV3OlxuICBASW5wdXQoKSBmaWx0ZXJzOiBGaWx0ZXJQcmVzZXRzW107XG4gIEBJbnB1dCgpIHNob3dGaWx0ZXJzOiBib29sZWFuIHwgbnVsbCA9IGZhbHNlO1xuICBASW5wdXQoKSBncmlkOiBib29sZWFuIHwgbnVsbCA9IHRydWU7XG4gIEBJbnB1dCgpIHNlYXJjaFZhbHVlOiBzdHJpbmc7XG5cbiAgQE91dHB1dCgpIGNoYW5nZUdyaWQgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gIEBPdXRwdXQoKSBzZWFyY2hEYXRhID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICBAT3V0cHV0KCkgZmlsdGVyQ2xpY2sgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gIC8vIG5ldzpcbiAgQE91dHB1dCgpIGZpbHRlckNoYW5nZWQgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgLy8gc2VhcmNoIGZ1bmN0aW9uXG4gIG9uU2VhcmNoQ2hhbmdlKHZhbCkge1xuICAgIHRoaXMuc2VhcmNoRGF0YS5lbWl0KHZhbCk7XG4gIH1cbiAgLy8gZW5kIG9mIHNlYXJjaCBmdW5jdGlvblxuXG4gIC8vIGZpbHRlclxuICBmaWx0ZXJCdXR0b25DbGljaygpIHtcbiAgICB0aGlzLmZpbHRlckNsaWNrLmVtaXQoKTtcbiAgfVxuXG4gIGNoYW5nZUZpbHRlcihzdGF0ZSkge1xuICAgIHRoaXMuZmlsdGVyQ2hhbmdlZC5lbWl0KHN0YXRlKTtcbiAgfVxuICAvLyBlbmQgb2YgZmlsdGVyXG5cbiAgLy8gZ3JpZCBmdW5jdGlvblxuICBncmlkRnVuY3Rpb24oKSB7XG4gICAgdGhpcy5ncmlkID0gIXRoaXMuZ3JpZDtcbiAgICB0aGlzLmNoYW5nZUdyaWQuZW1pdCgpO1xuICB9XG4gIC8vIGVuZCBvZiBncmlkIGZ1bmN0aW9uXG59XG4iXX0=