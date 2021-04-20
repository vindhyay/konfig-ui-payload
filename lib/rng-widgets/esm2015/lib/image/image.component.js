/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input } from '@angular/core';
export class ImageComponent {
    constructor() {
        this.size = 32;
        this.imgWidth = 0;
        this.imgHeight = 0;
        this.imgClass = 'square';
        this.localImageURL = null;
        this.localAltText = '';
    }
    /**
     * @param {?} data
     * @return {?}
     */
    set data(data) {
        // reset previous data
        this.localImageURL = null;
        this.localAltText = '';
        // init with new data
        this.localData = data;
        this.initImage();
    }
    /**
     * @return {?}
     */
    get data() {
        return this.localData;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.initImage();
    }
    /**
     * @return {?}
     */
    ngOnChanges() {
        this.initImage();
    }
    /**
     * @return {?}
     */
    initImage() {
        if (this.data && this.data.imageUrl && this.data.imageUrl.length > 0) {
            this.localImageURL = this.data.imageUrl;
        }
        else if (this.imageUrl && this.imageUrl.length > 0) {
            this.localImageURL = this.imageUrl;
        }
        if (this.localImageURL) {
            /** @type {?} */
            const image = new Image();
            image.addEventListener('load', (/**
             * @param {?} e
             * @return {?}
             */
            e => this.handleImageLoad(e)));
            image.src = this.localImageURL;
        }
        if (this.data && this.data.name && this.data.name.length > 0) {
            this.localAltText = this.data.name;
        }
        if (this.placeholder && this.placeholder.length > 0) {
            this.localAltText = this.placeholder;
        }
        this.generateInitial(this.localAltText);
    }
    /**
     * @param {?} event
     * @return {?}
     */
    handleImageLoad(event) {
        this.imgWidth = event.target.width;
        this.imgHeight = event.target.height;
        if (this.imgWidth > this.imgHeight) {
            this.imgClass = 'landscape-img';
        }
        if (this.imgWidth < this.imgHeight) {
            this.imgClass = 'portrait-img';
        }
    }
    /**
     * @param {?} userName
     * @return {?}
     */
    generateInitial(userName) {
        if (userName) {
            /** @type {?} */
            const colors = [
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
    }
    /**
     * @param {?} name
     * @return {?}
     */
    getInitial(name) {
        /** @type {?} */
        const matches = name.match(/\b(\w)/g);
        return matches.join('');
    }
    /**
     * @param {?} stringValue
     * @return {?}
     */
    hashCode(stringValue) {
        /** @type {?} */
        let hash = 0;
        if (stringValue.length === 0) {
            return hash;
        }
        for (let i = 0; i < stringValue.length; i++) {
            /** @type {?} */
            const chr = stringValue.charCodeAt(i);
            // tslint:disable-next-line: no-bitwise
            hash = ((hash << 5) - hash) + chr;
            // tslint:disable-next-line: no-bitwise
            hash |= 0; // Convert to 32bit integer
        }
        return hash;
    }
}
ImageComponent.decorators = [
    { type: Component, args: [{
                selector: 'rng-image',
                template: "<div class=\"avatar s-{{size}}\">\n  <img *ngIf=\"localImageURL\"\n    ngClass=\"{{imgClass}}\"\n    src=\"{{localImageURL}}\"\n    alt=\"{{localAltText}}\" />\n  <span *ngIf=\"!localImageURL\"\n    class=\"bg {{initialColor}}\">{{initial}}</span>\n</div>\n"
            }] }
];
/** @nocollapse */
ImageComponent.ctorParameters = () => [];
ImageComponent.propDecorators = {
    size: [{ type: Input }],
    data: [{ type: Input }],
    imageUrl: [{ type: Input }],
    placeholder: [{ type: Input }]
};
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW1hZ2UuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHJuZy93aWRnZXRzLyIsInNvdXJjZXMiOlsibGliL2ltYWdlL2ltYWdlLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBVSxLQUFLLEVBQWEsTUFBTSxlQUFlLENBQUM7QUFRcEUsTUFBTSxPQUFPLGNBQWM7SUE2QnpCO1FBM0JTLFNBQUksR0FBRyxFQUFFLENBQUM7UUFvQm5CLGFBQVEsR0FBRyxDQUFDLENBQUM7UUFDYixjQUFTLEdBQUcsQ0FBQyxDQUFDO1FBQ2QsYUFBUSxHQUFHLFFBQVEsQ0FBQztRQUVwQixrQkFBYSxHQUFHLElBQUksQ0FBQztRQUNyQixpQkFBWSxHQUFHLEVBQUUsQ0FBQztJQUVILENBQUM7Ozs7O0lBMUJoQixJQUNNLElBQUksQ0FBQyxJQUFpQjtRQUN4QixzQkFBc0I7UUFDdEIsSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUM7UUFDMUIsSUFBSSxDQUFDLFlBQVksR0FBRyxFQUFFLENBQUM7UUFDdkIscUJBQXFCO1FBQ3JCLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDO1FBQ3RCLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztJQUNuQixDQUFDOzs7O0lBQ0QsSUFBSSxJQUFJO1FBQ04sT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDO0lBQ3hCLENBQUM7Ozs7SUFpQkgsUUFBUTtRQUNOLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztJQUNuQixDQUFDOzs7O0lBRUQsV0FBVztRQUNULElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztJQUNuQixDQUFDOzs7O0lBRUQsU0FBUztRQUNQLElBQUksSUFBSSxDQUFDLElBQUksSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO1lBQ3BFLElBQUks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R0FBSyxXQUFXLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQztZQUN2Qyx1Q0FBdUM7WUFDdkMsSUFBSSxHQUFJLENBQUMsQ0FBQyxJQUFJLElBQUksQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLEdBQUcsR0FBRyxDQUFDO1lBQ25DLHVDQUF1QztZQUN2QyxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUMsMkJBQTJCO1NBQ3ZDO1FBQ0QsT0FBTyxJQUFJLENBQUM7SUFDZCxDQUFDOzs7WUFySEYsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxXQUFXO2dCQUNyQiw2UUFBcUM7YUFFdEM7Ozs7O21CQUdFLEtBQUs7bUJBQ0wsS0FBSzt1QkFhTCxLQUFLOzBCQUNMLEtBQUs7Ozs7SUFoQk4sbUNBQThCOztJQUM5Qiw4QkFBbUI7O0lBY25CLGtDQUEwQjs7SUFDMUIscUNBQTZCOztJQUU3QixzQ0FBcUI7O0lBQ3JCLGlDQUFnQjs7SUFFaEIsa0NBQWE7O0lBQ2IsbUNBQWM7O0lBQ2Qsa0NBQW9COztJQUVwQix1Q0FBcUI7O0lBQ3JCLHNDQUFrQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBJbnB1dCwgT25DaGFuZ2VzIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBJQXZhdGFyRGF0YSB9IGZyb20gJy4uLy4uL21vZGVsL2NvbW1vbi10eXBlcyc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ3JuZy1pbWFnZScsXG4gIHRlbXBsYXRlVXJsOiAnLi9pbWFnZS5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogW11cbn0pXG5leHBvcnQgY2xhc3MgSW1hZ2VDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uQ2hhbmdlcyB7XG4gIGxvY2FsRGF0YTogSUF2YXRhckRhdGEgfCBudWxsO1xuICBASW5wdXQoKSBzaXplID0gMzI7XG4gIEBJbnB1dCgpXG4gICAgc2V0IGRhdGEoZGF0YTogSUF2YXRhckRhdGEpIHtcbiAgICAgIC8vIHJlc2V0IHByZXZpb3VzIGRhdGFcbiAgICAgIHRoaXMubG9jYWxJbWFnZVVSTCA9IG51bGw7XG4gICAgICB0aGlzLmxvY2FsQWx0VGV4dCA9ICcnO1xuICAgICAgLy8gaW5pdCB3aXRoIG5ldyBkYXRhXG4gICAgICB0aGlzLmxvY2FsRGF0YSA9IGRhdGE7XG4gICAgICB0aGlzLmluaXRJbWFnZSgpO1xuICAgIH1cbiAgICBnZXQgZGF0YSgpOiBJQXZhdGFyRGF0YSB7XG4gICAgICByZXR1cm4gdGhpcy5sb2NhbERhdGE7XG4gICAgfVxuXG4gIEBJbnB1dCgpIGltYWdlVXJsOiBzdHJpbmc7XG4gIEBJbnB1dCgpIHBsYWNlaG9sZGVyOiBzdHJpbmc7XG5cbiAgaW5pdGlhbENvbG9yOiBzdHJpbmc7XG4gIGluaXRpYWw6IHN0cmluZztcblxuICBpbWdXaWR0aCA9IDA7XG4gIGltZ0hlaWdodCA9IDA7XG4gIGltZ0NsYXNzID0gJ3NxdWFyZSc7XG5cbiAgbG9jYWxJbWFnZVVSTCA9IG51bGw7XG4gIGxvY2FsQWx0VGV4dCA9ICcnO1xuXG4gIGNvbnN0cnVjdG9yKCkge31cblxuICBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLmluaXRJbWFnZSgpO1xuICB9XG5cbiAgbmdPbkNoYW5nZXMoKTogdm9pZCB7XG4gICAgdGhpcy5pbml0SW1hZ2UoKTtcbiAgfVxuXG4gIGluaXRJbWFnZSgpIHtcbiAgICBpZiAodGhpcy5kYXRhICYmIHRoaXMuZGF0YS5pbWFnZVVybCAmJiB0aGlzLmRhdGEuaW1hZ2VVcmwubGVuZ3RoID4gMCkge1xuICAgICAgdGhpcy5sb2NhbEltYWdlVVJMID0gdGhpcy5kYXRhLmltYWdlVXJsO1xuICAgIH0gZWxzZSBpZiAodGhpcy5pbWFnZVVybCAmJiB0aGlzLmltYWdlVXJsLmxlbmd0aCA+IDApIHtcbiAgICAgIHRoaXMubG9jYWxJbWFnZVVSTCA9IHRoaXMuaW1hZ2VVcmw7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMubG9jYWxJbWFnZVVSTCkge1xuICAgICAgY29uc3QgaW1hZ2UgPSBuZXcgSW1hZ2UoKTtcbiAgICAgIGltYWdlLmFkZEV2ZW50TGlzdGVuZXIoJ2xvYWQnLCBlID0+IHRoaXMuaGFuZGxlSW1hZ2VMb2FkKGUpKTtcbiAgICAgIGltYWdlLnNyYyA9IHRoaXMubG9jYWxJbWFnZVVSTDtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5kYXRhICYmIHRoaXMuZGF0YS5uYW1lICYmIHRoaXMuZGF0YS5uYW1lLmxlbmd0aCA+IDApIHtcbiAgICAgIHRoaXMubG9jYWxBbHRUZXh0ID0gdGhpcy5kYXRhLm5hbWU7XG4gICAgfVxuICAgIGlmICh0aGlzLnBsYWNlaG9sZGVyICYmIHRoaXMucGxhY2Vob2xkZXIubGVuZ3RoID4gMCkge1xuICAgICAgdGhpcy5sb2NhbEFsdFRleHQgPSB0aGlzLnBsYWNlaG9sZGVyO1xuICAgIH1cblxuICAgIHRoaXMuZ2VuZXJhdGVJbml0aWFsKHRoaXMubG9jYWxBbHRUZXh0KTtcbiAgfVxuXG4gIGhhbmRsZUltYWdlTG9hZChldmVudCkge1xuICAgIHRoaXMuaW1nV2lkdGggPSBldmVudC50YXJnZXQud2lkdGg7XG4gICAgdGhpcy5pbWdIZWlnaHQgPSBldmVudC50YXJnZXQuaGVpZ2h0O1xuICAgIGlmICh0aGlzLmltZ1dpZHRoID4gdGhpcy5pbWdIZWlnaHQpIHtcbiAgICAgIHRoaXMuaW1nQ2xhc3MgPSAnbGFuZHNjYXBlLWltZyc7XG4gICAgfVxuICAgIGlmICh0aGlzLmltZ1dpZHRoIDwgdGhpcy5pbWdIZWlnaHQpIHtcbiAgICAgIHRoaXMuaW1nQ2xhc3MgPSAncG9ydHJhaXQtaW1nJztcbiAgICB9XG4gIH1cblxuICBnZW5lcmF0ZUluaXRpYWwodXNlck5hbWUpIHtcbiAgICBpZiAodXNlck5hbWUpIHtcbiAgICAgIGNvbnN0IGNvbG9ycyA9IFtcbiAgICAgICAgJ29yYW5nZScsXG4gICAgICAgICdkYXJrLW9yYW5nZScsXG4gICAgICAgICdyZWQnLFxuICAgICAgICAncGluaycsXG4gICAgICAgICdncmVlbicsXG4gICAgICAgICdsaWdodC1ncmVlbicsXG4gICAgICAgICdibHVlJyxcbiAgICAgICAgJ2Rhcmtlbi1ibHVlJyxcbiAgICAgICAgJ2RhcmstYmx1ZScsXG4gICAgICAgICdwdXJwbGUnLFxuICAgICAgICAnYnJvd24nLFxuICAgICAgICAnZGFyaycsXG4gICAgICAgICdncmF5JyxcbiAgICAgIF07XG4gICAgICB0aGlzLmluaXRpYWwgPSB0aGlzLmdldEluaXRpYWwodXNlck5hbWUpO1xuICAgICAgdGhpcy5pbml0aWFsQ29sb3IgPSBjb2xvcnNbdGhpcy5oYXNoQ29kZSh0aGlzLmluaXRpYWwpICUgY29sb3JzLmxlbmd0aF07XG4gICAgfVxuICB9XG5cbiAgZ2V0SW5pdGlhbChuYW1lKSB7XG4gICAgY29uc3QgbWF0Y2hlcyA9IG5hbWUubWF0Y2goL1xcYihcXHcpL2cpO1xuICAgIHJldHVybiBtYXRjaGVzLmpvaW4oJycpO1xuICB9XG4gIGhhc2hDb2RlKHN0cmluZ1ZhbHVlOiBzdHJpbmcpIHtcbiAgICBsZXQgaGFzaCA9IDA7XG4gICAgaWYgKHN0cmluZ1ZhbHVlLmxlbmd0aCA9PT0gMCkge1xuICAgICAgcmV0dXJuIGhhc2g7XG4gICAgfVxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc3RyaW5nVmFsdWUubGVuZ3RoOyBpKyspIHtcbiAgICAgIGNvbnN0IGNociAgID0gc3RyaW5nVmFsdWUuY2hhckNvZGVBdChpKTtcbiAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTogbm8tYml0d2lzZVxuICAgICAgaGFzaCAgPSAoKGhhc2ggPDwgNSkgLSBoYXNoKSArIGNocjtcbiAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTogbm8tYml0d2lzZVxuICAgICAgaGFzaCB8PSAwOyAvLyBDb252ZXJ0IHRvIDMyYml0IGludGVnZXJcbiAgICB9XG4gICAgcmV0dXJuIGhhc2g7XG4gIH1cblxufVxuIl19