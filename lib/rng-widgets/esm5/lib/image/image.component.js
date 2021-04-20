/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input } from '@angular/core';
var ImageComponent = /** @class */ (function () {
    function ImageComponent() {
        this.size = 32;
        this.imgWidth = 0;
        this.imgHeight = 0;
        this.imgClass = 'square';
        this.localImageURL = null;
        this.localAltText = '';
    }
    Object.defineProperty(ImageComponent.prototype, "data", {
        get: /**
         * @return {?}
         */
        function () {
            return this.localData;
        },
        set: /**
         * @param {?} data
         * @return {?}
         */
        function (data) {
            // reset previous data
            this.localImageURL = null;
            this.localAltText = '';
            // init with new data
            this.localData = data;
            this.initImage();
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    ImageComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        this.initImage();
    };
    /**
     * @return {?}
     */
    ImageComponent.prototype.ngOnChanges = /**
     * @return {?}
     */
    function () {
        this.initImage();
    };
    /**
     * @return {?}
     */
    ImageComponent.prototype.initImage = /**
     * @return {?}
     */
    function () {
        var _this = this;
        if (this.data && this.data.imageUrl && this.data.imageUrl.length > 0) {
            this.localImageURL = this.data.imageUrl;
        }
        else if (this.imageUrl && this.imageUrl.length > 0) {
            this.localImageURL = this.imageUrl;
        }
        if (this.localImageURL) {
            /** @type {?} */
            var image = new Image();
            image.addEventListener('load', (/**
             * @param {?} e
             * @return {?}
             */
            function (e) { return _this.handleImageLoad(e); }));
            image.src = this.localImageURL;
        }
        if (this.data && this.data.name && this.data.name.length > 0) {
            this.localAltText = this.data.name;
        }
        if (this.placeholder && this.placeholder.length > 0) {
            this.localAltText = this.placeholder;
        }
        this.generateInitial(this.localAltText);
    };
    /**
     * @param {?} event
     * @return {?}
     */
    ImageComponent.prototype.handleImageLoad = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        this.imgWidth = event.target.width;
        this.imgHeight = event.target.height;
        if (this.imgWidth > this.imgHeight) {
            this.imgClass = 'landscape-img';
        }
        if (this.imgWidth < this.imgHeight) {
            this.imgClass = 'portrait-img';
        }
    };
    /**
     * @param {?} userName
     * @return {?}
     */
    ImageComponent.prototype.generateInitial = /**
     * @param {?} userName
     * @return {?}
     */
    function (userName) {
        if (userName) {
            /** @type {?} */
            var colors = [
                'orange',
                'dark-orange',
                'red',
                'pink',
                'green',
                'light-green',
                'blue',
                'darken-blue',
                'dark-blue',
                'purple',
                'brown',
                'dark',
                'gray',
            ];
            this.initial = this.getInitial(userName);
            this.initialColor = colors[this.hashCode(this.initial) % colors.length];
        }
    };
    /**
     * @param {?} name
     * @return {?}
     */
    ImageComponent.prototype.getInitial = /**
     * @param {?} name
     * @return {?}
     */
    function (name) {
        /** @type {?} */
        var matches = name.match(/\b(\w)/g);
        return matches.join('');
    };
    /**
     * @param {?} stringValue
     * @return {?}
     */
    ImageComponent.prototype.hashCode = /**
     * @param {?} stringValue
     * @return {?}
     */
    function (stringValue) {
        /** @type {?} */
        var hash = 0;
        if (stringValue.length === 0) {
            return hash;
        }
        for (var i = 0; i < stringValue.length; i++) {
            /** @type {?} */
            var chr = stringValue.charCodeAt(i);
            // tslint:disable-next-line: no-bitwise
            hash = ((hash << 5) - hash) + chr;
            // tslint:disable-next-line: no-bitwise
            hash |= 0; // Convert to 32bit integer
        }
        return hash;
    };
    ImageComponent.decorators = [
        { type: Component, args: [{
                    selector: 'rng-image',
                    template: "<div class=\"avatar s-{{size}}\">\n  <img *ngIf=\"localImageURL\"\n    ngClass=\"{{imgClass}}\"\n    src=\"{{localImageURL}}\"\n    alt=\"{{localAltText}}\" />\n  <span *ngIf=\"!localImageURL\"\n    class=\"bg {{initialColor}}\">{{initial}}</span>\n</div>\n"
                }] }
    ];
    /** @nocollapse */
    ImageComponent.ctorParameters = function () { return []; };
    ImageComponent.propDecorators = {
        size: [{ type: Input }],
        data: [{ type: Input }],
        imageUrl: [{ type: Input }],
        placeholder: [{ type: Input }]
    };
    return ImageComponent;
}());
export { ImageComponent };
if (false) {
    /** @type {?} */
    ImageComponent.prototype.localData;
    /** @type {?} */
    ImageComponent.prototype.size;
    /** @type {?} */
    ImageComponent.prototype.imageUrl;
    /** @type {?} */
    ImageComponent.prototype.placeholder;
    /** @type {?} */
    ImageComponent.prototype.initialColor;
    /** @type {?} */
    ImageComponent.prototype.initial;
    /** @type {?} */
    ImageComponent.prototype.imgWidth;
    /** @type {?} */
    ImageComponent.prototype.imgHeight;
    /** @type {?} */
    ImageComponent.prototype.imgClass;
    /** @type {?} */
    ImageComponent.prototype.localImageURL;
    /** @type {?} */
    ImageComponent.prototype.localAltText;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW1hZ2UuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHJuZy93aWRnZXRzLyIsInNvdXJjZXMiOlsibGliL2ltYWdlL2ltYWdlLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBVSxLQUFLLEVBQWEsTUFBTSxlQUFlLENBQUM7QUFHcEU7SUFrQ0U7UUEzQlMsU0FBSSxHQUFHLEVBQUUsQ0FBQztRQW9CbkIsYUFBUSxHQUFHLENBQUMsQ0FBQztRQUNiLGNBQVMsR0FBRyxDQUFDLENBQUM7UUFDZCxhQUFRLEdBQUcsUUFBUSxDQUFDO1FBRXBCLGtCQUFhLEdBQUcsSUFBSSxDQUFDO1FBQ3JCLGlCQUFZLEdBQUcsRUFBRSxDQUFDO0lBRUgsQ0FBQztJQTFCaEIsc0JBQ00sZ0NBQUk7Ozs7UUFRUjtZQUNFLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQztRQUN4QixDQUFDOzs7OztRQVhILFVBQ1csSUFBaUI7WUFDeEIsc0JBQXNCO1lBQ3RCLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDO1lBQzFCLElBQUksQ0FBQyxZQUFZLEdBQUcsRUFBRSxDQUFDO1lBQ3ZCLHFCQUFxQjtZQUNyQixJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQztZQUN0QixJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7UUFDbkIsQ0FBQzs7O09BQUE7Ozs7SUFvQkgsaUNBQVE7OztJQUFSO1FBQ0UsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO0lBQ25CLENBQUM7Ozs7SUFFRCxvQ0FBVzs7O0lBQVg7UUFDRSxJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7SUFDbkIsQ0FBQzs7OztJQUVELGtDQUFTOzs7SUFBVDtRQUFBLGlCQXFCQztRQXBCQyxJQUFJLElBQUksQ0FBQyxJQUFJLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxH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QyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsV0FBVyxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTs7Z0JBQ3JDLEdBQUcsR0FBSyxXQUFXLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQztZQUN2Qyx1Q0FBdUM7WUFDdkMsSUFBSSxHQUFJLENBQUMsQ0FBQyxJQUFJLElBQUksQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLEdBQUcsR0FBRyxDQUFDO1lBQ25DLHVDQUF1QztZQUN2QyxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUMsMkJBQTJCO1NBQ3ZDO1FBQ0QsT0FBTyxJQUFJLENBQUM7SUFDZCxDQUFDOztnQkFySEYsU0FBUyxTQUFDO29CQUNULFFBQVEsRUFBRSxXQUFXO29CQUNyQiw2UUFBcUM7aUJBRXRDOzs7Ozt1QkFHRSxLQUFLO3VCQUNMLEtBQUs7MkJBYUwsS0FBSzs4QkFDTCxLQUFLOztJQWlHUixxQkFBQztDQUFBLEFBdkhELElBdUhDO1NBbEhZLGNBQWM7OztJQUN6QixtQ0FBOEI7O0lBQzlCLDhCQUFtQjs7SUFjbkIsa0NBQTBCOztJQUMxQixxQ0FBNkI7O0lBRTdCLHNDQUFxQjs7SUFDckIsaUNBQWdCOztJQUVoQixrQ0FBYTs7SUFDYixtQ0FBYzs7SUFDZCxrQ0FBb0I7O0lBRXBCLHVDQUFxQjs7SUFDckIsc0NBQWtCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIElucHV0LCBPbkNoYW5nZXMgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IElBdmF0YXJEYXRhIH0gZnJvbSAnLi4vLi4vbW9kZWwvY29tbW9uLXR5cGVzJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAncm5nLWltYWdlJyxcbiAgdGVtcGxhdGVVcmw6ICcuL2ltYWdlLmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbXVxufSlcbmV4cG9ydCBjbGFzcyBJbWFnZUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25DaGFuZ2VzIHtcbiAgbG9jYWxEYXRhOiBJQXZhdGFyRGF0YSB8IG51bGw7XG4gIEBJbnB1dCgpIHNpemUgPSAzMjtcbiAgQElucHV0KClcbiAgICBzZXQgZGF0YShkYXRhOiBJQXZhdGFyRGF0YSkge1xuICAgICAgLy8gcmVzZXQgcHJldmlvdXMgZGF0YVxuICAgICAgdGhpcy5sb2NhbEltYWdlVVJMID0gbnVsbDtcbiAgICAgIHRoaXMubG9jYWxBbHRUZXh0ID0gJyc7XG4gICAgICAvLyBpbml0IHdpdGggbmV3IGRhdGFcbiAgICAgIHRoaXMubG9jYWxEYXRhID0gZGF0YTtcbiAgICAgIHRoaXMuaW5pdEltYWdlKCk7XG4gICAgfVxuICAgIGdldCBkYXRhKCk6IElBdmF0YXJEYXRhIHtcbiAgICAgIHJldHVybiB0aGlzLmxvY2FsRGF0YTtcbiAgICB9XG5cbiAgQElucHV0KCkgaW1hZ2VVcmw6IHN0cmluZztcbiAgQElucHV0KCkgcGxhY2Vob2xkZXI6IHN0cmluZztcblxuICBpbml0aWFsQ29sb3I6IHN0cmluZztcbiAgaW5pdGlhbDogc3RyaW5nO1xuXG4gIGltZ1dpZHRoID0gMDtcbiAgaW1nSGVpZ2h0ID0gMDtcbiAgaW1nQ2xhc3MgPSAnc3F1YXJlJztcblxuICBsb2NhbEltYWdlVVJMID0gbnVsbDtcbiAgbG9jYWxBbHRUZXh0ID0gJyc7XG5cbiAgY29uc3RydWN0b3IoKSB7fVxuXG4gIG5nT25Jbml0KCkge1xuICAgIHRoaXMuaW5pdEltYWdlKCk7XG4gIH1cblxuICBuZ09uQ2hhbmdlcygpOiB2b2lkIHtcbiAgICB0aGlzLmluaXRJbWFnZSgpO1xuICB9XG5cbiAgaW5pdEltYWdlKCkge1xuICAgIGlmICh0aGlzLmRhdGEgJiYgdGhpcy5kYXRhLmltYWdlVXJsICYmIHRoaXMuZGF0YS5pbWFnZVVybC5sZW5ndGggPiAwKSB7XG4gICAgICB0aGlzLmxvY2FsSW1hZ2VVUkwgPSB0aGlzLmRhdGEuaW1hZ2VVcmw7XG4gICAgfSBlbHNlIGlmICh0aGlzLmltYWdlVXJsICYmIHRoaXMuaW1hZ2VVcmwubGVuZ3RoID4gMCkge1xuICAgICAgdGhpcy5sb2NhbEltYWdlVVJMID0gdGhpcy5pbWFnZVVybDtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5sb2NhbEltYWdlVVJMKSB7XG4gICAgICBjb25zdCBpbWFnZSA9IG5ldyBJbWFnZSgpO1xuICAgICAgaW1hZ2UuYWRkRXZlbnRMaXN0ZW5lcignbG9hZCcsIGUgPT4gdGhpcy5oYW5kbGVJbWFnZUxvYWQoZSkpO1xuICAgICAgaW1hZ2Uuc3JjID0gdGhpcy5sb2NhbEltYWdlVVJMO1xuICAgIH1cblxuICAgIGlmICh0aGlzLmRhdGEgJiYgdGhpcy5kYXRhLm5hbWUgJiYgdGhpcy5kYXRhLm5hbWUubGVuZ3RoID4gMCkge1xuICAgICAgdGhpcy5sb2NhbEFsdFRleHQgPSB0aGlzLmRhdGEubmFtZTtcbiAgICB9XG4gICAgaWYgKHRoaXMucGxhY2Vob2xkZXIgJiYgdGhpcy5wbGFjZWhvbGRlci5sZW5ndGggPiAwKSB7XG4gICAgICB0aGlzLmxvY2FsQWx0VGV4dCA9IHRoaXMucGxhY2Vob2xkZXI7XG4gICAgfVxuXG4gICAgdGhpcy5nZW5lcmF0ZUluaXRpYWwodGhpcy5sb2NhbEFsdFRleHQpO1xuICB9XG5cbiAgaGFuZGxlSW1hZ2VMb2FkKGV2ZW50KSB7XG4gICAgdGhpcy5pbWdXaWR0aCA9IGV2ZW50LnRhcmdldC53aWR0aDtcbiAgICB0aGlzLmltZ0hlaWdodCA9IGV2ZW50LnRhcmdldC5oZWlnaHQ7XG4gICAgaWYgKHRoaXMuaW1nV2lkdGggPiB0aGlzLmltZ0hlaWdodCkge1xuICAgICAgdGhpcy5pbWdDbGFzcyA9ICdsYW5kc2NhcGUtaW1nJztcbiAgICB9XG4gICAgaWYgKHRoaXMuaW1nV2lkdGggPCB0aGlzLmltZ0hlaWdodCkge1xuICAgICAgdGhpcy5pbWdDbGFzcyA9ICdwb3J0cmFpdC1pbWcnO1xuICAgIH1cbiAgfVxuXG4gIGdlbmVyYXRlSW5pdGlhbCh1c2VyTmFtZSkge1xuICAgIGlmICh1c2VyTmFtZSkge1xuICAgICAgY29uc3QgY29sb3JzID0gW1xuICAgICAgICAnb3JhbmdlJyxcbiAgICAgICAgJ2Rhcmstb3JhbmdlJyxcbiAgICAgICAgJ3JlZCcsXG4gICAgICAgICdwaW5rJyxcbiAgICAgICAgJ2dyZWVuJyxcbiAgICAgICAgJ2xpZ2h0LWdyZWVuJyxcbiAgICAgICAgJ2JsdWUnLFxuICAgICAgICAnZGFya2VuLWJsdWUnLFxuICAgICAgICAnZGFyay1ibHVlJyxcbiAgICAgICAgJ3B1cnBsZScsXG4gICAgICAgICdicm93bicsXG4gICAgICAgICdkYXJrJyxcbiAgICAgICAgJ2dyYXknLFxuICAgICAgXTtcbiAgICAgIHRoaXMuaW5pdGlhbCA9IHRoaXMuZ2V0SW5pdGlhbCh1c2VyTmFtZSk7XG4gICAgICB0aGlzLmluaXRpYWxDb2xvciA9IGNvbG9yc1t0aGlzLmhhc2hDb2RlKHRoaXMuaW5pdGlhbCkgJSBjb2xvcnMubGVuZ3RoXTtcbiAgICB9XG4gIH1cblxuICBnZXRJbml0aWFsKG5hbWUpIHtcbiAgICBjb25zdCBtYXRjaGVzID0gbmFtZS5tYXRjaCgvXFxiKFxcdykvZyk7XG4gICAgcmV0dXJuIG1hdGNoZXMuam9pbignJyk7XG4gIH1cbiAgaGFzaENvZGUoc3RyaW5nVmFsdWU6IHN0cmluZykge1xuICAgIGxldCBoYXNoID0gMDtcbiAgICBpZiAoc3RyaW5nVmFsdWUubGVuZ3RoID09PSAwKSB7XG4gICAgICByZXR1cm4gaGFzaDtcbiAgICB9XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzdHJpbmdWYWx1ZS5sZW5ndGg7IGkrKykge1xuICAgICAgY29uc3QgY2hyICAgPSBzdHJpbmdWYWx1ZS5jaGFyQ29kZUF0KGkpO1xuICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOiBuby1iaXR3aXNlXG4gICAgICBoYXNoICA9ICgoaGFzaCA8PCA1KSAtIGhhc2gpICsgY2hyO1xuICAgICAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOiBuby1iaXR3aXNlXG4gICAgICBoYXNoIHw9IDA7IC8vIENvbnZlcnQgdG8gMzJiaXQgaW50ZWdlclxuICAgIH1cbiAgICByZXR1cm4gaGFzaDtcbiAgfVxuXG59XG4iXX0=