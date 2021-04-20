/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';
var CompactToolbarComponent = /** @class */ (function () {
    function CompactToolbarComponent() {
        var _this = this;
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
        function (text) { return _this.searchChange.emit(text); });
    }
    /**
     * @param {?} toggle
     * @return {?}
     */
    CompactToolbarComponent.prototype.toggleSearch = /**
     * @param {?} toggle
     * @return {?}
     */
    function (toggle) {
        var _this = this;
        this.searchToggle = toggle;
        if (toggle) {
            setTimeout((/**
             * @return {?}
             */
            function () { return _this.searchfield.nativeElement.focus(); }), 0);
        }
        else {
            this.search.setValue('');
        }
    };
    /**
     * @return {?}
     */
    CompactToolbarComponent.prototype.ngAfterViewInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.subscription.add(this.search.valueChanges.subscribe((/**
         * @param {?} val
         * @return {?}
         */
        function (val) { return _this.changeSearch(val); })));
    };
    /**
     * @return {?}
     */
    CompactToolbarComponent.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.subscription.unsubscribe();
    };
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
    return CompactToolbarComponent;
}());
export { CompactToolbarComponent };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tcGFjdC10b29sYmFyLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0Bybmcvd2lkZ2V0cy8iLCJzb3VyY2VzIjpbImxpYi9jb21wYWN0LXRvb2xiYXIvY29tcGFjdC10b29sYmFyLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLFlBQVksRUFBNEIsU0FBUyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN4SCxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDN0MsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUVwQztJQUFBO1FBQUEsaUJBd0NDO1FBaENVLGVBQVUsR0FBbUIsS0FBSyxDQUFDO1FBRWxDLGlCQUFZLEdBQUcsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUk1QyxpQkFBWSxHQUFHLEtBQUssQ0FBQztRQUNyQixlQUFVLEdBQUcsRUFBRSxDQUFDO1FBRWhCLFdBQU0sR0FBRyxJQUFJLFdBQVcsRUFBRSxDQUFDO1FBQzNCLGlCQUFZLEdBQUcsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUVsQyxpQkFBWTs7OztRQUFHLFVBQUMsSUFBWSxJQUFLLE9BQUEsS0FBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQTVCLENBQTRCLEVBQUM7SUFvQmhFLENBQUM7Ozs7O0lBbEJDLDhDQUFZOzs7O0lBQVosVUFBYSxNQUFlO1FBQTVCLGlCQU9DO1FBTkMsSUFBSSxDQUFDLFlBQVksR0FBRyxNQUFNLENBQUM7UUFDM0IsSUFBSSxNQUFNLEVBQUU7WUFDVixVQUFVOzs7WUFBQyxjQUFNLE9BQUEsS0FBSSxDQUFDLFdBQVcsQ0FBQyxhQUFhLENBQUMsS0FBSyxFQUFFLEVBQXRDLENBQXNDLEdBQUUsQ0FBQyxDQUFDLENBQUM7U0FDN0Q7YUFBTTtZQUNMLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1NBQzFCO0lBQ0gsQ0FBQzs7OztJQUVELGlEQUFlOzs7SUFBZjtRQUFBLGlCQUlDO1FBSEMsSUFBSSxDQUFDLFlBQVksQ0FBQyxHQUFHLENBQ25CLElBQUksQ0FBQyxNQUFNLENBQUMsWUFBWSxDQUFDLFNBQVM7Ozs7UUFBQyxVQUFBLEdBQUcsSUFBSSxPQUFBLEtBQUksQ0FBQyxZQUFZLENBQUMsR0FBRyxDQUFDLEVBQXRCLENBQXNCLEVBQUMsQ0FDbEUsQ0FBQztJQUNKLENBQUM7Ozs7SUFFRCw2Q0FBVzs7O0lBQVg7UUFDRSxJQUFJLENBQUMsWUFBWSxDQUFDLFdBQVcsRUFBRSxDQUFDO0lBQ2xDLENBQUM7O2dCQXZDRixTQUFTLFNBQUM7b0JBQ1QsUUFBUSxFQUFFLHFCQUFxQjtvQkFDL0IsZzJCQUErQztpQkFFaEQ7Ozt3QkFHRSxLQUFLOzZCQUNMLEtBQUs7K0JBRUwsTUFBTTs4QkFFTixTQUFTLFNBQUMsYUFBYSxFQUFFLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRTs7SUE0QjdDLDhCQUFDO0NBQUEsQUF4Q0QsSUF3Q0M7U0FuQ1ksdUJBQXVCOzs7SUFFbEMsd0NBQXVCOztJQUN2Qiw2Q0FBNEM7O0lBRTVDLCtDQUE0Qzs7SUFFNUMsOENBQXFFOztJQUVyRSwrQ0FBcUI7O0lBQ3JCLDZDQUFnQjs7SUFFaEIseUNBQTJCOztJQUMzQiwrQ0FBa0M7O0lBRWxDLCtDQUE4RCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQsIE91dHB1dCwgRXZlbnRFbWl0dGVyLCBBZnRlclZpZXdJbml0LCBPbkRlc3Ryb3ksIFZpZXdDaGlsZCwgRWxlbWVudFJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRm9ybUNvbnRyb2wgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAncm5nLWNvbXBhY3QtdG9vbGJhcicsXG4gIHRlbXBsYXRlVXJsOiAnLi9jb21wYWN0LXRvb2xiYXIuY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFtdXG59KVxuZXhwb3J0IGNsYXNzIENvbXBhY3RUb29sYmFyQ29tcG9uZW50IGltcGxlbWVudHMgQWZ0ZXJWaWV3SW5pdCwgT25EZXN0cm95IHtcblxuICBASW5wdXQoKSB0aXRsZTogc3RyaW5nO1xuICBASW5wdXQoKSB3aXRoU2VhcmNoOiBib29sZWFuIHwgbnVsbCA9IGZhbHNlO1xuXG4gIEBPdXRwdXQoKSBzZWFyY2hDaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgQFZpZXdDaGlsZCgnc2VhcmNoZmllbGQnLCB7IHN0YXRpYzogZmFsc2UgfSkgc2VhcmNoZmllbGQ6IEVsZW1lbnRSZWY7XG5cbiAgc2VhcmNoVG9nZ2xlID0gZmFsc2U7XG4gIHNlYXJjaFRleHQgPSAnJztcblxuICBzZWFyY2ggPSBuZXcgRm9ybUNvbnRyb2woKTtcbiAgc3Vic2NyaXB0aW9uID0gbmV3IFN1YnNjcmlwdGlvbigpO1xuXG4gIGNoYW5nZVNlYXJjaCA9ICh0ZXh0OiBzdHJpbmcpID0+IHRoaXMuc2VhcmNoQ2hhbmdlLmVtaXQodGV4dCk7XG5cbiAgdG9nZ2xlU2VhcmNoKHRvZ2dsZTogYm9vbGVhbikge1xuICAgIHRoaXMuc2VhcmNoVG9nZ2xlID0gdG9nZ2xlO1xuICAgIGlmICh0b2dnbGUpIHtcbiAgICAgIHNldFRpbWVvdXQoKCkgPT4gdGhpcy5zZWFyY2hmaWVsZC5uYXRpdmVFbGVtZW50LmZvY3VzKCksIDApO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnNlYXJjaC5zZXRWYWx1ZSgnJyk7XG4gICAgfVxuICB9XG5cbiAgbmdBZnRlclZpZXdJbml0KCkge1xuICAgIHRoaXMuc3Vic2NyaXB0aW9uLmFkZChcbiAgICAgIHRoaXMuc2VhcmNoLnZhbHVlQ2hhbmdlcy5zdWJzY3JpYmUodmFsID0+IHRoaXMuY2hhbmdlU2VhcmNoKHZhbCkpXG4gICAgKTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIHRoaXMuc3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gIH1cbn1cbiJdfQ==