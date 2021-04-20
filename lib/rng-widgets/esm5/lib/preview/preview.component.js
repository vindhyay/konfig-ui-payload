/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input } from '@angular/core';
import { DocType, PreviewType, PreviewSize } from '../../model/common-types';
var PreviewComponent = /** @class */ (function () {
    function PreviewComponent() {
        this.size = PreviewSize.SMALL;
        this.containerClass = [PreviewType.SMALL];
    }
    Object.defineProperty(PreviewComponent.prototype, "previewData", {
        set: /**
         * @param {?} data
         * @return {?}
         */
        function (data) {
            this.type = data.docType;
            this.previewURL = data.previewURL;
            this.size = data.previewSize || PreviewSize.SMALL;
            this.round = data.round || false;
            this.initPreview();
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    PreviewComponent.prototype.initPreview = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.localPreviewURL = null;
        this.containerClass = [PreviewType.SMALL];
        this.containerImageStyle = null;
        this.iconClass = null;
        if (this.size === PreviewSize.WIDGET) {
            this.containerClass = [PreviewType.WIDGET];
        }
        if (this.previewURL && this.previewURL.length) {
            this.localPreviewURL = this.previewURL;
        }
        if (this.round) {
            this.containerClass.push(PreviewType.ROUND);
        }
        if (this.localPreviewURL) {
            this.containerImageStyle = { 'background-image': 'url(' + this.localPreviewURL + ')' };
            /** @type {?} */
            var image = new Image();
            image.addEventListener('load', (/**
             * @param {?} e
             * @return {?}
             */
            function (e) { return _this.handleImageLoad(e); }));
            image.src = this.localPreviewURL;
        }
        else {
            this.iconClass = this.docTypeIconClass(this.type);
        }
    };
    /**
     * @param {?} event
     * @return {?}
     */
    PreviewComponent.prototype.handleImageLoad = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        /** @type {?} */
        var img = event.path[0];
        console.log('handleImageLoad', img);
        if (img.width > img.height) {
            this.containerClass.push(PreviewType.LANDSCAPE);
        }
        if (img.width < img.height) {
            this.containerClass.push(PreviewType.PORTRAIT);
        }
    };
    /**
     * @param {?} docType
     * @return {?}
     */
    PreviewComponent.prototype.docTypeIconClass = /**
     * @param {?} docType
     * @return {?}
     */
    function (docType) {
        switch (docType) {
            case DocType.DOCX:
                return ['rng-icon-word_24px_outlined', 'ms-blue'];
            case DocType.XLSX:
                return ['rng-icon-excel_24px', 'ms-green'];
            case DocType.PDF:
                return ['rng-icon-pdf_24px', 'adobe-red'];
            case DocType.IMAGE:
                return ['rng-icon-image', 'gray'];
            case DocType.VIDEO:
                return ['rng-icon-video', 'gray'];
            default:
                return ['rng-icon-generic_doc', 'gray'];
        }
    };
    PreviewComponent.decorators = [
        { type: Component, args: [{
                    selector: 'rng-preview',
                    template: "<div class=\"rng-preview-container\" \n  [ngClass]=\"containerClass\"\n  [ngStyle]=\"containerImageStyle\">\n  <i *ngIf=\"iconClass\"\n    class=\"rng-icon\"\n    [ngClass]=\"iconClass\"></i>\n</div>\n  "
                }] }
    ];
    PreviewComponent.propDecorators = {
        previewData: [{ type: Input }]
    };
    return PreviewComponent;
}());
export { PreviewComponent };
if (false) {
    /** @type {?} */
    PreviewComponent.prototype.type;
    /** @type {?} */
    PreviewComponent.prototype.previewURL;
    /** @type {?} */
    PreviewComponent.prototype.size;
    /** @type {?} */
    PreviewComponent.prototype.localPreviewURL;
    /** @type {?} */
    PreviewComponent.prototype.containerClass;
    /** @type {?} */
    PreviewComponent.prototype.containerImageStyle;
    /** @type {?} */
    PreviewComponent.prototype.iconClass;
    /** @type {?} */
    PreviewComponent.prototype.round;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJldmlldy5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Acm5nL3dpZGdldHMvIiwic291cmNlcyI6WyJsaWIvcHJldmlldy9wcmV2aWV3LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDakQsT0FBTyxFQUFFLE9BQU8sRUFBZ0IsV0FBVyxFQUFFLFdBQVcsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBRTNGO0lBQUE7UUFTRSxTQUFJLEdBQXVCLFdBQVcsQ0FBQyxLQUFLLENBQUM7UUFFN0MsbUJBQWMsR0FBeUIsQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLENBQUM7SUFvRTdELENBQUM7SUEvREMsc0JBQ00seUNBQVc7Ozs7O1FBRGpCLFVBQ2tCLElBQWtCO1lBQ2hDLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQztZQUN6QixJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUM7WUFDbEMsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsV0FBVyxJQUFJLFdBQVcsQ0FBQyxLQUFLLENBQUM7WUFDbEQsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxJQUFJLEtBQUssQ0FBQztZQUNqQyxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDckIsQ0FBQzs7O09BQUE7Ozs7SUFFSCxzQ0FBVzs7O0lBQVg7UUFBQSxpQkEwQkM7UUF6QkMsSUFBSSxDQUFDLGVBQWUsR0FBRyxJQUFJLENBQUM7UUFDNUIsSUFBSSxDQUFDLGNBQWMsR0FBRyxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUMxQyxJQUFJLENBQUMsbUJBQW1CLEdBQUcsSUFBSSxDQUFDO1FBQ2hDLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDO1FBRXRCLElBQUksSUFBSSxDQUFDLElBQUksS0FBSyxXQUFXLENBQUMsTUFBTSxFQUFFO1lBQ3BDLElBQUksQ0FBQyxjQUFjLEdBQUcsQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLENBQUM7U0FDNUM7UUFFRCxJQUFJLElBQUksQ0FBQyxVQUFVLElBQUksSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLEVBQUU7WUFDN0MsSUFBSSxDQUFDLGVBQWUsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDO1NBQ3hDO1FBRUQsSUFBSSxJQUFJLENBQUMsS0FBSyxFQUFFO1lBQ2QsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQzdDO1FBRUQsSUFBSSxJQUFJLENBQUMsZUFBZSxFQUFFO1lBQ3hCLElBQUksQ0FBQyxtQkFBbUIsR0FBRyxFQUFDLGtCQUFrQixFQUFFLE1BQU0sR0FBRyxJQUFJLENBQUMsZUFBZSxHQUFHLEdBQUcsRUFBQyxDQUFDOztnQkFDL0UsS0FBSyxHQUFHLElBQUksS0FBSyxFQUFFO1lBQ3pCLEtBQUssQ0FBQyxnQkFBZ0IsQ0FBQyxNQUFNOzs7O1lBQUUsVUFBQSxDQUFDLElBQUksT0FBQSxLQUFJLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQyxFQUF2QixDQUF1QixFQUFDLENBQUM7WUFDN0QsS0FBSyxDQUFDLEdBQUcsR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDO1NBQ2xDO2FBQU07WUFDTCxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7U0FDbkQ7SUFDSCxDQUFDOzs7OztJQUNELDBDQUFlOzs7O0lBQWYsVUFBZ0IsS0FBSzs7WUFDYixHQUFHLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7UUFDekIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxpQkFBaUIsRUFBRSxHQUFHLENBQUMsQ0FBQztRQUNwQyxJQUFJLEdBQUcsQ0FBQyxLQUFLLEdBQUcsR0FBRyxDQUFDLE1BQU0sRUFBRTtZQUMxQixJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsU0FBUyxDQUFDLENBQUM7U0FDakQ7UUFDRCxJQUFJLEdBQUcsQ0FBQyxLQUFLLEdBQUcsR0FBRyxDQUFDLE1BQU0sRUFBRTtZQUMxQixJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLENBQUM7U0FDaEQ7SUFDSCxDQUFDOzs7OztJQUNELDJDQUFnQjs7OztJQUFoQixVQUFpQixPQUFPO1FBQ3RCLFFBQVEsT0FBTyxFQUFFO1lBQ2YsS0FBSyxPQUFPLENBQUMsSUFBSTtnQkFDZixPQUFPLENBQUMsNkJBQTZCLEVBQUUsU0FBUyxDQUFDLENBQUM7WUFDcEQsS0FBSyxPQUFPLENBQUMsSUFBSTtnQkFDZixPQUFPLENBQUMscUJBQXFCLEVBQUUsVUFBVSxDQUFDLENBQUM7WUFDN0MsS0FBSyxPQUFPLENBQUMsR0FBRztnQkFDZCxPQUFPLENBQUMsbUJBQW1CLEVBQUUsV0FBVyxDQUFDLENBQUM7WUFDNUMsS0FBSyxPQUFPLENBQUMsS0FBSztnQkFDaEIsT0FBTyxDQUFDLGdCQUFnQixFQUFFLE1BQU0sQ0FBQyxDQUFDO1lBQ3BDLEtBQUssT0FBTyxDQUFDLEtBQUs7Z0JBQ2hCLE9BQU8sQ0FBQyxnQkFBZ0IsRUFBRSxNQUFNLENBQUMsQ0FBQztZQUNwQztnQkFDRSxPQUFPLENBQUMsc0JBQXNCLEVBQUUsTUFBTSxDQUFDLENBQUM7U0FDM0M7SUFDSCxDQUFDOztnQkE3RUYsU0FBUyxTQUFDO29CQUNULFFBQVEsRUFBRSxhQUFhO29CQUN2Qix1TkFBdUM7aUJBRXhDOzs7OEJBWUUsS0FBSzs7SUErRFIsdUJBQUM7Q0FBQSxBQS9FRCxJQStFQztTQTFFWSxnQkFBZ0I7OztJQUUzQixnQ0FBbUI7O0lBQ25CLHNDQUEwQjs7SUFDMUIsZ0NBQTZDOztJQUM3QywyQ0FBK0I7O0lBQy9CLDBDQUEyRDs7SUFDM0QsK0NBQW1DOztJQUNuQyxxQ0FBMkI7O0lBQzNCLGlDQUF1QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IERvY1R5cGUsIElQcmV2aWV3RGF0YSwgUHJldmlld1R5cGUsIFByZXZpZXdTaXplIH0gZnJvbSAnLi4vLi4vbW9kZWwvY29tbW9uLXR5cGVzJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAncm5nLXByZXZpZXcnLFxuICB0ZW1wbGF0ZVVybDogJy4vcHJldmlldy5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogW11cbn0pXG5leHBvcnQgY2xhc3MgUHJldmlld0NvbXBvbmVudCB7XG5cbiAgdHlwZTogRG9jVHlwZSB8IC0xO1xuICBwcmV2aWV3VVJMOiBzdHJpbmcgfCBudWxsO1xuICBzaXplOiBQcmV2aWV3U2l6ZSB8IG51bGwgPSBQcmV2aWV3U2l6ZS5TTUFMTDtcbiAgbG9jYWxQcmV2aWV3VVJMOiBzdHJpbmcgfCBudWxsO1xuICBjb250YWluZXJDbGFzczogUHJldmlld1R5cGVbXSB8IG51bGwgPSBbUHJldmlld1R5cGUuU01BTExdO1xuICBjb250YWluZXJJbWFnZVN0eWxlOiBvYmplY3QgfCBudWxsO1xuICBpY29uQ2xhc3M6IHN0cmluZ1tdIHwgbnVsbDtcbiAgcm91bmQ6IGJvb2xlYW4gfCBmYWxzZTtcblxuICBASW5wdXQoKVxuICAgIHNldCBwcmV2aWV3RGF0YShkYXRhOiBJUHJldmlld0RhdGEpIHtcbiAgICAgIHRoaXMudHlwZSA9IGRhdGEuZG9jVHlwZTtcbiAgICAgIHRoaXMucHJldmlld1VSTCA9IGRhdGEucHJldmlld1VSTDtcbiAgICAgIHRoaXMuc2l6ZSA9IGRhdGEucHJldmlld1NpemUgfHwgUHJldmlld1NpemUuU01BTEw7XG4gICAgICB0aGlzLnJvdW5kID0gZGF0YS5yb3VuZCB8fCBmYWxzZTtcbiAgICAgIHRoaXMuaW5pdFByZXZpZXcoKTtcbiAgICB9XG5cbiAgaW5pdFByZXZpZXcoKSB7XG4gICAgdGhpcy5sb2NhbFByZXZpZXdVUkwgPSBudWxsO1xuICAgIHRoaXMuY29udGFpbmVyQ2xhc3MgPSBbUHJldmlld1R5cGUuU01BTExdO1xuICAgIHRoaXMuY29udGFpbmVySW1hZ2VTdHlsZSA9IG51bGw7XG4gICAgdGhpcy5pY29uQ2xhc3MgPSBudWxsO1xuXG4gICAgaWYgKHRoaXMuc2l6ZSA9PT0gUHJldmlld1NpemUuV0lER0VUKSB7XG4gICAgICB0aGlzLmNvbnRhaW5lckNsYXNzID0gW1ByZXZpZXdUeXBlLldJREdFVF07XG4gICAgfVxuXG4gICAgaWYgKHRoaXMucHJldmlld1VSTCAmJiB0aGlzLnByZXZpZXdVUkwubGVuZ3RoKSB7XG4gICAgICB0aGlzLmxvY2FsUHJldmlld1VSTCA9IHRoaXMucHJldmlld1VSTDtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5yb3VuZCkge1xuICAgICAgdGhpcy5jb250YWluZXJDbGFzcy5wdXNoKFByZXZpZXdUeXBlLlJPVU5EKTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5sb2NhbFByZXZpZXdVUkwpIHtcbiAgICAgIHRoaXMuY29udGFpbmVySW1hZ2VTdHlsZSA9IHsnYmFja2dyb3VuZC1pbWFnZSc6ICd1cmwoJyArIHRoaXMubG9jYWxQcmV2aWV3VVJMICsgJyknfTtcbiAgICAgIGNvbnN0IGltYWdlID0gbmV3IEltYWdlKCk7XG4gICAgICBpbWFnZS5hZGRFdmVudExpc3RlbmVyKCdsb2FkJywgZSA9PiB0aGlzLmhhbmRsZUltYWdlTG9hZChlKSk7XG4gICAgICBpbWFnZS5zcmMgPSB0aGlzLmxvY2FsUHJldmlld1VSTDtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5pY29uQ2xhc3MgPSB0aGlzLmRvY1R5cGVJY29uQ2xhc3ModGhpcy50eXBlKTtcbiAgICB9XG4gIH1cbiAgaGFuZGxlSW1hZ2VMb2FkKGV2ZW50KSB7XG4gICAgY29uc3QgaW1nID0gZXZlbnQucGF0aFswXTtcbiAgICBjb25zb2xlLmxvZygnaGFuZGxlSW1hZ2VMb2FkJywgaW1nKTtcbiAgICBpZiAoaW1nLndpZHRoID4gaW1nLmhlaWdodCkge1xuICAgICAgdGhpcy5jb250YWluZXJDbGFzcy5wdXNoKFByZXZpZXdUeXBlLkxBTkRTQ0FQRSk7XG4gICAgfVxuICAgIGlmIChpbWcud2lkdGggPCBpbWcuaGVpZ2h0KSB7XG4gICAgICB0aGlzLmNvbnRhaW5lckNsYXNzLnB1c2goUHJldmlld1R5cGUuUE9SVFJBSVQpO1xuICAgIH1cbiAgfVxuICBkb2NUeXBlSWNvbkNsYXNzKGRvY1R5cGUpOiBzdHJpbmdbXSB7XG4gICAgc3dpdGNoIChkb2NUeXBlKSB7XG4gICAgICBjYXNlIERvY1R5cGUuRE9DWDpcbiAgICAgICAgcmV0dXJuIFsncm5nLWljb24td29yZF8yNHB4X291dGxpbmVkJywgJ21zLWJsdWUnXTtcbiAgICAgIGNhc2UgRG9jVHlwZS5YTFNYOlxuICAgICAgICByZXR1cm4gWydybmctaWNvbi1leGNlbF8yNHB4JywgJ21zLWdyZWVuJ107XG4gICAgICBjYXNlIERvY1R5cGUuUERGOlxuICAgICAgICByZXR1cm4gWydybmctaWNvbi1wZGZfMjRweCcsICdhZG9iZS1yZWQnXTtcbiAgICAgIGNhc2UgRG9jVHlwZS5JTUFHRTpcbiAgICAgICAgcmV0dXJuIFsncm5nLWljb24taW1hZ2UnLCAnZ3JheSddO1xuICAgICAgY2FzZSBEb2NUeXBlLlZJREVPOlxuICAgICAgICByZXR1cm4gWydybmctaWNvbi12aWRlbycsICdncmF5J107XG4gICAgICBkZWZhdWx0OlxuICAgICAgICByZXR1cm4gWydybmctaWNvbi1nZW5lcmljX2RvYycsICdncmF5J107XG4gICAgfVxuICB9XG5cbn1cbiJdfQ==