/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, HostListener, Input, Output, EventEmitter, } from '@angular/core';
var SimpleSearchComponent = /** @class */ (function () {
    function SimpleSearchComponent() {
        var _this = this;
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
        function (e, el) {
            _this.clickFunction();
            _this.opened = true;
            _this.focused = true;
            el.focus();
            return false;
        });
        this.changeFunction = (/**
         * @param {?} data
         * @return {?}
         */
        function (data) {
            _this.dataVal = data;
        });
        this.backData = (/**
         * @param {?} data
         * @return {?}
         */
        function (data) { return _this.searchChange.emit(data); });
        this.clickFunction = (/**
         * @return {?}
         */
        function () {
            _this.searchClick.emit();
        });
    }
    /**
     * @return {?}
     */
    SimpleSearchComponent.prototype.onFocus = /**
     * @return {?}
     */
    function () {
        this.opened = true;
        this.focused = true;
    };
    /**
     * @param {?} event
     * @return {?}
     */
    SimpleSearchComponent.prototype.onKeydownHandler = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        if (event.key === 'Escape' || event.key === 'Enter') {
            this.opened = false;
            this.focused = false;
            this.clickFunction();
        }
    };
    /**
     * @return {?}
     */
    SimpleSearchComponent.prototype.cancelFunction = /**
     * @return {?}
     */
    function () {
        this.data = '';
        this.opened = false;
        this.focused = false;
        this.backData(this.data);
        this.clickFunction();
    };
    /**
     * @return {?}
     */
    SimpleSearchComponent.prototype.onBlur = /**
     * @return {?}
     */
    function () {
        if (this.data === '') {
            this.opened = false;
            this.focused = false;
            this.clickFunction();
        }
        else {
            this.opened = true;
        }
    };
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
    return SimpleSearchComponent;
}());
export { SimpleSearchComponent };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2ltcGxlLXNlYXJjaC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Acm5nL2lucHV0cy8iLCJzb3VyY2VzIjpbImxpYi9zaW1wbGUtc2VhcmNoL3NpbXBsZS1zZWFyY2guY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQ0wsU0FBUyxFQUNULFlBQVksRUFDWixLQUFLLEVBQ0wsTUFBTSxFQUNOLFlBQVksR0FDYixNQUFNLGVBQWUsQ0FBQztBQUV2QjtJQUFBO1FBQUEsaUJBa0VDO1FBM0RDLFdBQU0sR0FBRyxLQUFLLENBQUM7UUFDZixZQUFPLEdBQUcsS0FBSyxDQUFDO1FBRVAsU0FBSSxHQUFrQixFQUFFLENBQUM7UUFFekIsZ0JBQVcsR0FBbUIsS0FBSyxDQUFDO1FBQ3BDLGdCQUFXLEdBQUcsRUFBRSxDQUFDO1FBQ2hCLGlCQUFZLEdBQXNCLElBQUksWUFBWSxFQUFFLENBQUM7UUFDckQsZ0JBQVcsR0FBc0IsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUU5RCxlQUFVOzs7OztRQUFHLFVBQUMsQ0FBQyxFQUFFLEVBQUU7WUFDakIsS0FBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO1lBQ3JCLEtBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO1lBQ25CLEtBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDO1lBQ3BCLEVBQUUsQ0FBQyxLQUFLLEVBQUUsQ0FBQztZQUNYLE9BQU8sS0FBSyxDQUFDO1FBQ2YsQ0FBQyxFQUFBO1FBRUQsbUJBQWM7Ozs7UUFBRyxVQUFDLElBQVk7WUFDNUIsS0FBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUM7UUFDdEIsQ0FBQyxFQUFBO1FBRUQsYUFBUTs7OztRQUFHLFVBQUEsSUFBSSxJQUFJLE9BQUEsS0FBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQTVCLENBQTRCLEVBQUM7UUFrQ2hELGtCQUFhOzs7UUFBRztZQUNkLEtBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDMUIsQ0FBQyxFQUFBO0lBQ0gsQ0FBQzs7OztJQW5DQyx1Q0FBTzs7O0lBQVA7UUFDRSxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztRQUNuQixJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQztJQUN0QixDQUFDOzs7OztJQUdELGdEQUFnQjs7OztJQURoQixVQUNpQixLQUFvQjtRQUNuQyxJQUFJLEtBQUssQ0FBQyxHQUFHLEtBQUssUUFBUSxJQUFJLEtBQUssQ0FBQyxHQUFHLEtBQUssT0FBTyxFQUFFO1lBQ25ELElBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO1lBQ3BCLElBQUksQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDO1lBQ3JCLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztTQUN0QjtJQUNILENBQUM7Ozs7SUFFRCw4Q0FBYzs7O0lBQWQ7UUFDRSxJQUFJLENBQUMsSUFBSSxHQUFHLEVBQUUsQ0FBQztRQUNmLElBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO1FBQ3BCLElBQUksQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDO1FBQ3JCLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3pCLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztJQUN2QixDQUFDOzs7O0lBRUQsc0NBQU07OztJQUFOO1FBQ0UsSUFBSSxJQUFJLENBQUMsSUFBSSxLQUFLLEVBQUUsRUFBRTtZQUNwQixJQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztZQUNwQixJQUFJLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQztZQUNyQixJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7U0FDdEI7YUFBTTtZQUNMLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO1NBQ3BCO0lBQ0gsQ0FBQzs7Z0JBN0RGLFNBQVMsU0FBQztvQkFDVCxRQUFRLEVBQUUsbUJBQW1CO29CQUM3QiwwOEJBQTZDO2lCQUU5Qzs7O3VCQU1FLEtBQUs7OEJBRUwsS0FBSzs4QkFDTCxLQUFLOytCQUNMLE1BQU07OEJBQ04sTUFBTTttQ0FxQk4sWUFBWSxTQUFDLGtCQUFrQixFQUFFLENBQUMsUUFBUSxDQUFDOztJQThCOUMsNEJBQUM7Q0FBQSxBQWxFRCxJQWtFQztTQTdEWSxxQkFBcUI7OztJQUNoQyx3Q0FBZ0I7O0lBQ2hCLHVDQUFlOztJQUNmLHdDQUFnQjs7SUFFaEIscUNBQWtDOztJQUVsQyw0Q0FBNkM7O0lBQzdDLDRDQUEwQjs7SUFDMUIsNkNBQStEOztJQUMvRCw0Q0FBOEQ7O0lBRTlELDJDQU1DOztJQUVELCtDQUVDOztJQUVELHlDQUFnRDs7SUFrQ2hELDhDQUVDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgQ29tcG9uZW50LFxuICBIb3N0TGlzdGVuZXIsXG4gIElucHV0LFxuICBPdXRwdXQsXG4gIEV2ZW50RW1pdHRlcixcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ3JuZy1zaW1wbGUtc2VhcmNoJyxcbiAgdGVtcGxhdGVVcmw6ICcuL3NpbXBsZS1zZWFyY2guY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFtdLFxufSlcbmV4cG9ydCBjbGFzcyBTaW1wbGVTZWFyY2hDb21wb25lbnQge1xuICBkYXRhVmFsOiBzdHJpbmc7XG4gIG9wZW5lZCA9IGZhbHNlO1xuICBmb2N1c2VkID0gZmFsc2U7XG5cbiAgQElucHV0KCkgZGF0YTogc3RyaW5nIHwgbnVsbCA9ICcnO1xuXG4gIEBJbnB1dCgpIGNsb3NlQnV0dG9uOiBib29sZWFuIHwgbnVsbCA9IGZhbHNlO1xuICBASW5wdXQoKSBwbGFjZWhvbGRlciA9ICcnO1xuICBAT3V0cHV0KCkgc2VhcmNoQ2hhbmdlOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgQE91dHB1dCgpIHNlYXJjaENsaWNrOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICBvcGVuU2VhcmNoID0gKGUsIGVsKSA9PiB7XG4gICAgdGhpcy5jbGlja0Z1bmN0aW9uKCk7XG4gICAgdGhpcy5vcGVuZWQgPSB0cnVlO1xuICAgIHRoaXMuZm9jdXNlZCA9IHRydWU7XG4gICAgZWwuZm9jdXMoKTtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBjaGFuZ2VGdW5jdGlvbiA9IChkYXRhOiBzdHJpbmcpID0+IHtcbiAgICB0aGlzLmRhdGFWYWwgPSBkYXRhO1xuICB9XG5cbiAgYmFja0RhdGEgPSBkYXRhID0+IHRoaXMuc2VhcmNoQ2hhbmdlLmVtaXQoZGF0YSk7XG5cbiAgb25Gb2N1cygpIHtcbiAgICB0aGlzLm9wZW5lZCA9IHRydWU7XG4gICAgdGhpcy5mb2N1c2VkID0gdHJ1ZTtcbiAgfVxuXG4gIEBIb3N0TGlzdGVuZXIoJ2RvY3VtZW50OmtleWRvd24nLCBbJyRldmVudCddKVxuICBvbktleWRvd25IYW5kbGVyKGV2ZW50OiBLZXlib2FyZEV2ZW50KSB7XG4gICAgaWYgKGV2ZW50LmtleSA9PT0gJ0VzY2FwZScgfHwgZXZlbnQua2V5ID09PSAnRW50ZXInKSB7XG4gICAgICB0aGlzLm9wZW5lZCA9IGZhbHNlO1xuICAgICAgdGhpcy5mb2N1c2VkID0gZmFsc2U7XG4gICAgICB0aGlzLmNsaWNrRnVuY3Rpb24oKTtcbiAgICB9XG4gIH1cblxuICBjYW5jZWxGdW5jdGlvbigpIHtcbiAgICB0aGlzLmRhdGEgPSAnJztcbiAgICB0aGlzLm9wZW5lZCA9IGZhbHNlO1xuICAgIHRoaXMuZm9jdXNlZCA9IGZhbHNlO1xuICAgIHRoaXMuYmFja0RhdGEodGhpcy5kYXRhKTtcbiAgICB0aGlzLmNsaWNrRnVuY3Rpb24oKTtcbiAgfVxuXG4gIG9uQmx1cigpIHtcbiAgICBpZiAodGhpcy5kYXRhID09PSAnJykge1xuICAgICAgdGhpcy5vcGVuZWQgPSBmYWxzZTtcbiAgICAgIHRoaXMuZm9jdXNlZCA9IGZhbHNlO1xuICAgICAgdGhpcy5jbGlja0Z1bmN0aW9uKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMub3BlbmVkID0gdHJ1ZTtcbiAgICB9XG4gIH1cblxuICBjbGlja0Z1bmN0aW9uID0gKCkgPT4ge1xuICAgIHRoaXMuc2VhcmNoQ2xpY2suZW1pdCgpO1xuICB9XG59XG4iXX0=