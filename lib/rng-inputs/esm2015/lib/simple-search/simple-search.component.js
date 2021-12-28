/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, HostListener, Input, Output, EventEmitter, } from '@angular/core';
export class SimpleSearchComponent {
    constructor() {
        this.opened = false;
        this.focused = false;
        this.data = '';
        this.closeButton = false;
        this.placeholder = '';
        this.searchChange = new EventEmitter();
        this.searchClick = new EventEmitter();
        this.openSearch = (/**
         * @param {?} e
         * @param {?} el
         * @return {?}
         */
        (e, el) => {
            this.clickFunction();
            this.opened = true;
            this.focused = true;
            el.focus();
            return false;
        });
        this.changeFunction = (/**
         * @param {?} data
         * @return {?}
         */
        (data) => {
            this.dataVal = data;
        });
        this.backData = (/**
         * @param {?} data
         * @return {?}
         */
        data => this.searchChange.emit(data));
        this.clickFunction = (/**
         * @return {?}
         */
        () => {
            this.searchClick.emit();
        });
    }
    /**
     * @return {?}
     */
    onFocus() {
        this.opened = true;
        this.focused = true;
    }
    /**
     * @param {?} event
     * @return {?}
     */
    onKeydownHandler(event) {
        if (event.key === 'Escape' || event.key === 'Enter') {
            this.opened = false;
            this.focused = false;
            this.clickFunction();
        }
    }
    /**
     * @return {?}
     */
    cancelFunction() {
        this.data = '';
        this.opened = false;
        this.focused = false;
        this.backData(this.data);
        this.clickFunction();
    }
    /**
     * @return {?}
     */
    onBlur() {
        if (this.data === '') {
            this.opened = false;
            this.focused = false;
            this.clickFunction();
        }
        else {
            this.opened = true;
        }
    }
}
SimpleSearchComponent.decorators = [
    { type: Component, args: [{
                selector: 'rng-simple-search',
                template: "<div class=\"dynamic-search\"\n  [ngClass]=\"{'open-search': opened || !!placeholder || !!data, \n              'placeholder': !!placeholder, \n              'focused': focused}\">\n  <form>\n    <div class=\"field-wrap\">\n      <input (focus)=\"onFocus()\"\n        (blur)=\"onBlur()\"\n        #focusable\n        type=\"search\"\n        name=\"search\"\n        [(ngModel)]=\"data\"\n        (ngModelChange)=\"changeFunction(data); backData(data)\"\n        autocomplete=\"off\"\n        placeholder=\"{{placeholder}}\">\n        <button mat-icon-button\n          class=\"cancel-search-btn\"\n          *ngIf=\"closeButton\"\n          (click)=\"cancelFunction()\">\n          <i class=\"rng-icon rng-icon-close\"></i>\n        </button>\n      </div>\n    <button class=\"dynamic-search-btn\"\n      mat-icon-button\n      (click)=\"openSearch($event, focusable)\">\n      <i class=\"rng-icon rng-icon-search\"></i>\n    </button>\n  </form>\n</div>\n"
            }] }
];
SimpleSearchComponent.propDecorators = {
    data: [{ type: Input }],
    closeButton: [{ type: Input }],
    placeholder: [{ type: Input }],
    searchChange: [{ type: Output }],
    searchClick: [{ type: Output }],
    onKeydownHandler: [{ type: HostListener, args: ['document:keydown', ['$event'],] }]
};
if (false) {
    /** @type {?} */
    SimpleSearchComponent.prototype.dataVal;
    /** @type {?} */
    SimpleSearchComponent.prototype.opened;
    /** @type {?} */
    SimpleSearchComponent.prototype.focused;
    /** @type {?} */
    SimpleSearchComponent.prototype.data;
    /** @type {?} */
    SimpleSearchComponent.prototype.closeButton;
    /** @type {?} */
    SimpleSearchComponent.prototype.placeholder;
    /** @type {?} */
    SimpleSearchComponent.prototype.searchChange;
    /** @type {?} */
    SimpleSearchComponent.prototype.searchClick;
    /** @type {?} */
    SimpleSearchComponent.prototype.openSearch;
    /** @type {?} */
    SimpleSearchComponent.prototype.changeFunction;
    /** @type {?} */
    SimpleSearchComponent.prototype.backData;
    /** @type {?} */
    SimpleSearchComponent.prototype.clickFunction;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2ltcGxlLXNlYXJjaC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Acm5nL2lucHV0cy8iLCJzb3VyY2VzIjpbImxpYi9zaW1wbGUtc2VhcmNoL3NpbXBsZS1zZWFyY2guY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQ0wsU0FBUyxFQUNULFlBQVksRUFDWixLQUFLLEVBQ0wsTUFBTSxFQUNOLFlBQVksR0FDYixNQUFNLGVBQWUsQ0FBQztBQU92QixNQUFNLE9BQU8scUJBQXFCO0lBTGxDO1FBT0UsV0FBTSxHQUFHLEtBQUssQ0FBQztRQUNmLFlBQU8sR0FBRyxLQUFLLENBQUM7UUFFUCxTQUFJLEdBQWtCLEVBQUUsQ0FBQztRQUV6QixnQkFBVyxHQUFtQixLQUFLLENBQUM7UUFDcEMsZ0JBQVcsR0FBRyxFQUFFLENBQUM7UUFDaEIsaUJBQVksR0FBc0IsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUNyRCxnQkFBVyxHQUFzQixJQUFJLFlBQVksRUFBRSxDQUFDO1FBRTlELGVBQVU7Ozs7O1FBQUcsQ0FBQyxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUU7WUFDckIsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO1lBQ3JCLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO1lBQ25CLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDO1lBQ3BCLEVBQUUsQ0FBQyxLQUFLLEVBQUUsQ0FBQztZQUNYLE9BQU8sS0FBSyxDQUFDO1FBQ2YsQ0FBQyxFQUFBO1FBRUQsbUJBQWM7Ozs7UUFBRyxDQUFDLElBQVksRUFBRSxFQUFFO1lBQ2hDLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDO1FBQ3RCLENBQUMsRUFBQTtRQUVELGFBQVE7Ozs7UUFBRyxJQUFJLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFDO1FBa0NoRCxrQkFBYTs7O1FBQUcsR0FBRyxFQUFFO1lBQ25CLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDMUIsQ0FBQyxFQUFBO0lBQ0gsQ0FBQzs7OztJQW5DQyxPQUFPO1FBQ0wsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7UUFDbkIsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUM7SUFDdEIsQ0FBQzs7Ozs7SUFHRCxnQkFBZ0IsQ0FBQyxLQUFvQjtRQUNuQyxJQUFJLEtBQUssQ0FBQyxHQUFHLEtBQUssUUFBUSxJQUFJLEtBQUssQ0FBQyxHQUFHLEtBQUssT0FBTyxFQUFFO1lBQ25ELElBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO1lBQ3BCLElBQUksQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDO1lBQ3JCLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztTQUN0QjtJQUNILENBQUM7Ozs7SUFFRCxjQUFjO1FBQ1osSUFBSSxDQUFDLElBQUksR0FBRyxFQUFFLENBQUM7UUFDZixJQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztRQUNwQixJQUFJLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQztRQUNyQixJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUN6QixJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7SUFDdkIsQ0FBQzs7OztJQUVELE1BQU07UUFDSixJQUFJLElBQUksQ0FBQyxJQUFJLEtBQUssRUFBRSxFQUFFO1lBQ3BCLElBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO1lBQ3BCLElBQUksQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDO1lBQ3JCLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztTQUN0QjthQUFNO1lBQ0wsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7U0FDcEI7SUFDSCxDQUFDOzs7WUE3REYsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxtQkFBbUI7Z0JBQzdCLDA4QkFBNkM7YUFFOUM7OzttQkFNRSxLQUFLOzBCQUVMLEtBQUs7MEJBQ0wsS0FBSzsyQkFDTCxNQUFNOzBCQUNOLE1BQU07K0JBcUJOLFlBQVksU0FBQyxrQkFBa0IsRUFBRSxDQUFDLFFBQVEsQ0FBQzs7OztJQTlCNUMsd0NBQWdCOztJQUNoQix1Q0FBZTs7SUFDZix3Q0FBZ0I7O0lBRWhCLHFDQUFrQzs7SUFFbEMsNENBQTZDOztJQUM3Qyw0Q0FBMEI7O0lBQzFCLDZDQUErRDs7SUFDL0QsNENBQThEOztJQUU5RCwyQ0FNQzs7SUFFRCwrQ0FFQzs7SUFFRCx5Q0FBZ0Q7O0lBa0NoRCw4Q0FFQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIENvbXBvbmVudCxcbiAgSG9zdExpc3RlbmVyLFxuICBJbnB1dCxcbiAgT3V0cHV0LFxuICBFdmVudEVtaXR0ZXIsXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdybmctc2ltcGxlLXNlYXJjaCcsXG4gIHRlbXBsYXRlVXJsOiAnLi9zaW1wbGUtc2VhcmNoLmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbXSxcbn0pXG5leHBvcnQgY2xhc3MgU2ltcGxlU2VhcmNoQ29tcG9uZW50IHtcbiAgZGF0YVZhbDogc3RyaW5nO1xuICBvcGVuZWQgPSBmYWxzZTtcbiAgZm9jdXNlZCA9IGZhbHNlO1xuXG4gIEBJbnB1dCgpIGRhdGE6IHN0cmluZyB8IG51bGwgPSAnJztcblxuICBASW5wdXQoKSBjbG9zZUJ1dHRvbjogYm9vbGVhbiB8IG51bGwgPSBmYWxzZTtcbiAgQElucHV0KCkgcGxhY2Vob2xkZXIgPSAnJztcbiAgQE91dHB1dCgpIHNlYXJjaENoYW5nZTogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gIEBPdXRwdXQoKSBzZWFyY2hDbGljazogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgb3BlblNlYXJjaCA9IChlLCBlbCkgPT4ge1xuICAgIHRoaXMuY2xpY2tGdW5jdGlvbigpO1xuICAgIHRoaXMub3BlbmVkID0gdHJ1ZTtcbiAgICB0aGlzLmZvY3VzZWQgPSB0cnVlO1xuICAgIGVsLmZvY3VzKCk7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgY2hhbmdlRnVuY3Rpb24gPSAoZGF0YTogc3RyaW5nKSA9PiB7XG4gICAgdGhpcy5kYXRhVmFsID0gZGF0YTtcbiAgfVxuXG4gIGJhY2tEYXRhID0gZGF0YSA9PiB0aGlzLnNlYXJjaENoYW5nZS5lbWl0KGRhdGEpO1xuXG4gIG9uRm9jdXMoKSB7XG4gICAgdGhpcy5vcGVuZWQgPSB0cnVlO1xuICAgIHRoaXMuZm9jdXNlZCA9IHRydWU7XG4gIH1cblxuICBASG9zdExpc3RlbmVyKCdkb2N1bWVudDprZXlkb3duJywgWyckZXZlbnQnXSlcbiAgb25LZXlkb3duSGFuZGxlcihldmVudDogS2V5Ym9hcmRFdmVudCkge1xuICAgIGlmIChldmVudC5rZXkgPT09ICdFc2NhcGUnIHx8IGV2ZW50LmtleSA9PT0gJ0VudGVyJykge1xuICAgICAgdGhpcy5vcGVuZWQgPSBmYWxzZTtcbiAgICAgIHRoaXMuZm9jdXNlZCA9IGZhbHNlO1xuICAgICAgdGhpcy5jbGlja0Z1bmN0aW9uKCk7XG4gICAgfVxuICB9XG5cbiAgY2FuY2VsRnVuY3Rpb24oKSB7XG4gICAgdGhpcy5kYXRhID0gJyc7XG4gICAgdGhpcy5vcGVuZWQgPSBmYWxzZTtcbiAgICB0aGlzLmZvY3VzZWQgPSBmYWxzZTtcbiAgICB0aGlzLmJhY2tEYXRhKHRoaXMuZGF0YSk7XG4gICAgdGhpcy5jbGlja0Z1bmN0aW9uKCk7XG4gIH1cblxuICBvbkJsdXIoKSB7XG4gICAgaWYgKHRoaXMuZGF0YSA9PT0gJycpIHtcbiAgICAgIHRoaXMub3BlbmVkID0gZmFsc2U7XG4gICAgICB0aGlzLmZvY3VzZWQgPSBmYWxzZTtcbiAgICAgIHRoaXMuY2xpY2tGdW5jdGlvbigpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLm9wZW5lZCA9IHRydWU7XG4gICAgfVxuICB9XG5cbiAgY2xpY2tGdW5jdGlvbiA9ICgpID0+IHtcbiAgICB0aGlzLnNlYXJjaENsaWNrLmVtaXQoKTtcbiAgfVxufVxuIl19