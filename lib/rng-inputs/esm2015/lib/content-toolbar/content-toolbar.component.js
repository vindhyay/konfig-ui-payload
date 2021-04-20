/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input, Output, EventEmitter } from '@angular/core';
export class ContentToolbarComponent {
    constructor() {
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
    /**
     * @param {?} val
     * @return {?}
     */
    onSearchChange(val) {
        this.searchData.emit(val);
    }
    // end of search function
    // filter
    /**
     * @return {?}
     */
    filterButtonClick() {
        this.filterClick.emit();
    }
    /**
     * @param {?} state
     * @return {?}
     */
    changeFilter(state) {
        this.filterChanged.emit(state);
    }
    // end of filter
    // grid function
    /**
     * @return {?}
     */
    gridFunction() {
        this.grid = !this.grid;
        this.changeGrid.emit();
    }
}
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udGVudC10b29sYmFyLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BybmcvaW5wdXRzLyIsInNvdXJjZXMiOlsibGliL2NvbnRlbnQtdG9vbGJhci9jb250ZW50LXRvb2xiYXIuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsWUFBWSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBUXZFLE1BQU0sT0FBTyx1QkFBdUI7SUFMcEM7UUFNVyxlQUFVLEdBQW1CLEtBQUssQ0FBQztRQUNuQyxpQkFBWSxHQUFtQixLQUFLLENBQUM7UUFHckMsZ0JBQVcsR0FBbUIsS0FBSyxDQUFDO1FBQ3BDLFNBQUksR0FBbUIsSUFBSSxDQUFDO1FBRzNCLGVBQVUsR0FBRyxJQUFJLFlBQVksRUFBRSxDQUFDO1FBQ2hDLGVBQVUsR0FBRyxJQUFJLFlBQVksRUFBRSxDQUFDO1FBQ2hDLGdCQUFXLEdBQUcsSUFBSSxZQUFZLEVBQUUsQ0FBQzs7UUFFakMsa0JBQWEsR0FBRyxJQUFJLFlBQVksRUFBRSxDQUFDO1FBdUI3Qyx1QkFBdUI7SUFDekIsQ0FBQzs7Ozs7O0lBckJDLGNBQWMsQ0FBQyxHQUFHO1FBQ2hCLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQzVCLENBQUM7Ozs7OztJQUlELGlCQUFpQjtRQUNmLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDMUIsQ0FBQzs7Ozs7SUFFRCxZQUFZLENBQUMsS0FBSztRQUNoQixJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNqQyxDQUFDOzs7Ozs7SUFJRCxZQUFZO1FBQ1YsSUFBSSxDQUFDLElBQUksR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7UUFDdkIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUN6QixDQUFDOzs7WUF4Q0YsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxxQkFBcUI7Z0JBQy9CLG9xREFBK0M7YUFFaEQ7Ozt5QkFFRSxLQUFLOzJCQUNMLEtBQUs7c0JBRUwsS0FBSzswQkFDTCxLQUFLO21CQUNMLEtBQUs7MEJBQ0wsS0FBSzt5QkFFTCxNQUFNO3lCQUNOLE1BQU07MEJBQ04sTUFBTTs0QkFFTixNQUFNOzs7O0lBWlAsNkNBQTRDOztJQUM1QywrQ0FBOEM7O0lBRTlDLDBDQUFrQzs7SUFDbEMsOENBQTZDOztJQUM3Qyx1Q0FBcUM7O0lBQ3JDLDhDQUE2Qjs7SUFFN0IsNkNBQTBDOztJQUMxQyw2Q0FBMEM7O0lBQzFDLDhDQUEyQzs7SUFFM0MsZ0RBQTZDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCwgT3V0cHV0LCBFdmVudEVtaXR0ZXIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEZpbHRlclByZXNldHMgfSBmcm9tICcuLi8uLi9tb2RlbC9jb21tb24tdHlwZXMnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdybmctY29udGVudC10b29sYmFyJyxcbiAgdGVtcGxhdGVVcmw6ICcuL2NvbnRlbnQtdG9vbGJhci5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogW10sXG59KVxuZXhwb3J0IGNsYXNzIENvbnRlbnRUb29sYmFyQ29tcG9uZW50IHtcbiAgQElucHV0KCkgZ3JpZEJ1dHRvbjogYm9vbGVhbiB8IG51bGwgPSBmYWxzZTtcbiAgQElucHV0KCkgZmlsdGVyQnV0dG9uOiBib29sZWFuIHwgbnVsbCA9IGZhbHNlO1xuICAvLyBuZXc6XG4gIEBJbnB1dCgpIGZpbHRlcnM6IEZpbHRlclByZXNldHNbXTtcbiAgQElucHV0KCkgc2hvd0ZpbHRlcnM6IGJvb2xlYW4gfCBudWxsID0gZmFsc2U7XG4gIEBJbnB1dCgpIGdyaWQ6IGJvb2xlYW4gfCBudWxsID0gdHJ1ZTtcbiAgQElucHV0KCkgc2VhcmNoVmFsdWU6IHN0cmluZztcblxuICBAT3V0cHV0KCkgY2hhbmdlR3JpZCA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgQE91dHB1dCgpIHNlYXJjaERhdGEgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gIEBPdXRwdXQoKSBmaWx0ZXJDbGljayA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgLy8gbmV3OlxuICBAT3V0cHV0KCkgZmlsdGVyQ2hhbmdlZCA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICAvLyBzZWFyY2ggZnVuY3Rpb25cbiAgb25TZWFyY2hDaGFuZ2UodmFsKSB7XG4gICAgdGhpcy5zZWFyY2hEYXRhLmVtaXQodmFsKTtcbiAgfVxuICAvLyBlbmQgb2Ygc2VhcmNoIGZ1bmN0aW9uXG5cbiAgLy8gZmlsdGVyXG4gIGZpbHRlckJ1dHRvbkNsaWNrKCkge1xuICAgIHRoaXMuZmlsdGVyQ2xpY2suZW1pdCgpO1xuICB9XG5cbiAgY2hhbmdlRmlsdGVyKHN0YXRlKSB7XG4gICAgdGhpcy5maWx0ZXJDaGFuZ2VkLmVtaXQoc3RhdGUpO1xuICB9XG4gIC8vIGVuZCBvZiBmaWx0ZXJcblxuICAvLyBncmlkIGZ1bmN0aW9uXG4gIGdyaWRGdW5jdGlvbigpIHtcbiAgICB0aGlzLmdyaWQgPSAhdGhpcy5ncmlkO1xuICAgIHRoaXMuY2hhbmdlR3JpZC5lbWl0KCk7XG4gIH1cbiAgLy8gZW5kIG9mIGdyaWQgZnVuY3Rpb25cbn1cbiJdfQ==