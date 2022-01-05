/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input } from '@angular/core';
import { DocType, PreviewType, PreviewSize } from '../../model/common-types';
export class PreviewComponent {
    constructor() {
        this.size = PreviewSize.SMALL;
        this.containerClass = [PreviewType.SMALL];
    }
    /**
     * @param {?} data
     * @return {?}
     */
    set previewData(data) {
        this.type = data.docType;
        this.previewURL = data.previewURL;
        this.size = data.previewSize || PreviewSize.SMALL;
        this.round = data.round || false;
        this.initPreview();
    }
    /**
     * @return {?}
     */
    initPreview() {
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
            const image = new Image();
            image.addEventListener('load', (/**
             * @param {?} e
             * @return {?}
             */
            e => this.handleImageLoad(e)));
            image.src = this.localPreviewURL;
        }
        else {
            this.iconClass = this.docTypeIconClass(this.type);
        }
    }
    /**
     * @param {?} event
     * @return {?}
     */
    handleImageLoad(event) {
        /** @type {?} */
        const img = event.path[0];
        if (img.width > img.height) {
            this.containerClass.push(PreviewType.LANDSCAPE);
        }
        if (img.width < img.height) {
            this.containerClass.push(PreviewType.PORTRAIT);
        }
    }
    /**
     * @param {?} docType
     * @return {?}
     */
    docTypeIconClass(docType) {
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
    }
}
PreviewComponent.decorators = [
    { type: Component, args: [{
                selector: 'rng-preview',
                template: "<div class=\"rng-preview-container\" \n  [ngClass]=\"containerClass\"\n  [ngStyle]=\"containerImageStyle\">\n  <i *ngIf=\"iconClass\"\n    class=\"rng-icon\"\n    [ngClass]=\"iconClass\"></i>\n</div>\n  "
            }] }
];
PreviewComponent.propDecorators = {
    previewData: [{ type: Input }]
};
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJldmlldy5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Acm5nL3dpZGdldHMvIiwic291cmNlcyI6WyJsaWIvcHJldmlldy9wcmV2aWV3LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDakQsT0FBTyxFQUFFLE9BQU8sRUFBZ0IsV0FBVyxFQUFFLFdBQVcsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBTzNGLE1BQU0sT0FBTyxnQkFBZ0I7SUFMN0I7UUFTRSxTQUFJLEdBQXVCLFdBQVcsQ0FBQyxLQUFLLENBQUM7UUFFN0MsbUJBQWMsR0FBeUIsQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLENBQUM7SUFvRTdELENBQUM7Ozs7O0lBL0RDLElBQ00sV0FBVyxDQUFDLElBQWtCO1FBQ2hDLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQztRQUN6QixJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUM7UUFDbEMsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsV0FBVyxJQUFJLFdBQVcsQ0FBQyxLQUFLLENBQUM7UUFDbEQsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxJQUFJLEtBQUssQ0FBQztRQUNqQyxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDckIsQ0FBQzs7OztJQUVILFdBQVc7UUFDVCxJQUFJLENBQUMsZUFBZSxHQUFHLElBQUksQ0FBQztRQUM1QixJQUFJLENBQUMsY0FBYyxHQUFHLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQzFDLElBQUksQ0FBQyxtQkFBbUIsR0FBRyxJQUFJLENBQUM7UUFDaEMsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUM7UUFFdEIsSUFBSSxJQUFJLENBQUMsSUFBSSxLQUFLLFdBQVcsQ0FBQyxNQUFNLEVBQUU7WUFDcEMsSUFBSSxDQUFDLGNBQWMsR0FBRyxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsQ0FBQztTQUM1QztRQUVELElBQUksSUFBSSxDQUFDLFVBQVUsSUFBSSxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sRUFBRTtZQUM3QyxJQUFJLENBQUMsZUFBZSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUM7U0FDeEM7UUFFRCxJQUFJLElBQUksQ0FBQyxLQUFLLEVBQUU7WUFDZCxJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDN0M7UUFFRCxJQUFJLElBQUksQ0FBQyxlQUFlLEVBQUU7WUFDeEIsSUFBSSxDQUFDLG1CQUFtQixHQUFHLEVBQUMsa0JBQWtCLEVBQUUsTUFBTSxHQUFHLElBQUksQ0FBQyxlQUFlLEdBQUcsR0FBRyxFQUFDLENBQUM7O2tCQUMvRSxLQUFLLEdBQUcsSUFBSSxLQUFLLEVBQUU7WUFDekIsS0FBSyxDQUFDLGdCQUFnQixDQUFDLE1BQU07Ozs7WUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQztZQUM3RCxLQUFLLENBQUMsR0FBRyxHQUFHLElBQUksQ0FBQyxlQUFlLENBQUM7U0FDbEM7YUFBTTtZQUNMLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztTQUNuRDtJQUNILENBQUM7Ozs7O0lBQ0QsZUFBZSxDQUFDLEtBQUs7O2NBQ2IsR0FBRyxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1FBQ3pCLE9BQU8sQ0FBQyxHQUFHLENBQUMsaUJBQWlCLEVBQUUsR0FBRyxDQUFDLENBQUM7UUFDcEMsSUFBSSxHQUFHLENBQUMsS0FBSyxHQUFHLEdBQUcsQ0FBQyxNQUFNLEVBQUU7WUFDMUIsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1NBQ2pEO1FBQ0QsSUFBSSxHQUFHLENBQUMsS0FBSyxHQUFHLEdBQUcsQ0FBQyxNQUFNLEVBQUU7WUFDMUIsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1NBQ2hEO0lBQ0gsQ0FBQzs7Ozs7SUFDRCxnQkFBZ0IsQ0FBQyxPQUFPO1FBQ3RCLFFBQVEsT0FBTyxFQUFFO1lBQ2YsS0FBSyxPQUFPLENBQUMsSUFBSTtnQkFDZixPQUFPLENBQUMsNkJBQTZCLEVBQUUsU0FBUyxDQUFDLENBQUM7WUFDcEQsS0FBSyxPQUFPLENBQUMsSUFBSTtnQkFDZixPQUFPLENBQUMscUJBQXFCLEVBQUUsVUFBVSxDQUFDLENBQUM7WUFDN0MsS0FBSyxPQUFPLENBQUMsR0FBRztnQkFDZCxPQUFPLENBQUMsbUJBQW1CLEVBQUUsV0FBVyxDQUFDLENBQUM7WUFDNUMsS0FBSyxPQUFPLENBQUMsS0FBSztnQkFDaEIsT0FBTyxDQUFDLGdCQUFnQixFQUFFLE1BQU0sQ0FBQyxDQUFDO1lBQ3BDLEtBQUssT0FBTyxDQUFDLEtBQUs7Z0JBQ2hCLE9BQU8sQ0FBQyxnQkFBZ0IsRUFBRSxNQUFNLENBQUMsQ0FBQztZQUNwQztnQkFDRSxPQUFPLENBQUMsc0JBQXNCLEVBQUUsTUFBTSxDQUFDLENBQUM7U0FDM0M7SUFDSCxDQUFDOzs7WUE3RUYsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxhQUFhO2dCQUN2Qix1TkFBdUM7YUFFeEM7OzswQkFZRSxLQUFLOzs7O0lBVE4sZ0NBQW1COztJQUNuQixzQ0FBMEI7O0lBQzFCLGdDQUE2Qzs7SUFDN0MsMkNBQStCOztJQUMvQiwwQ0FBMkQ7O0lBQzNELCtDQUFtQzs7SUFDbkMscUNBQTJCOztJQUMzQixpQ0FBdUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBEb2NUeXBlLCBJUHJldmlld0RhdGEsIFByZXZpZXdUeXBlLCBQcmV2aWV3U2l6ZSB9IGZyb20gJy4uLy4uL21vZGVsL2NvbW1vbi10eXBlcyc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ3JuZy1wcmV2aWV3JyxcbiAgdGVtcGxhdGVVcmw6ICcuL3ByZXZpZXcuY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFtdXG59KVxuZXhwb3J0IGNsYXNzIFByZXZpZXdDb21wb25lbnQge1xuXG4gIHR5cGU6IERvY1R5cGUgfCAtMTtcbiAgcHJldmlld1VSTDogc3RyaW5nIHwgbnVsbDtcbiAgc2l6ZTogUHJldmlld1NpemUgfCBudWxsID0gUHJldmlld1NpemUuU01BTEw7XG4gIGxvY2FsUHJldmlld1VSTDogc3RyaW5nIHwgbnVsbDtcbiAgY29udGFpbmVyQ2xhc3M6IFByZXZpZXdUeXBlW10gfCBudWxsID0gW1ByZXZpZXdUeXBlLlNNQUxMXTtcbiAgY29udGFpbmVySW1hZ2VTdHlsZTogb2JqZWN0IHwgbnVsbDtcbiAgaWNvbkNsYXNzOiBzdHJpbmdbXSB8IG51bGw7XG4gIHJvdW5kOiBib29sZWFuIHwgZmFsc2U7XG5cbiAgQElucHV0KClcbiAgICBzZXQgcHJldmlld0RhdGEoZGF0YTogSVByZXZpZXdEYXRhKSB7XG4gICAgICB0aGlzLnR5cGUgPSBkYXRhLmRvY1R5cGU7XG4gICAgICB0aGlzLnByZXZpZXdVUkwgPSBkYXRhLnByZXZpZXdVUkw7XG4gICAgICB0aGlzLnNpemUgPSBkYXRhLnByZXZpZXdTaXplIHx8IFByZXZpZXdTaXplLlNNQUxMO1xuICAgICAgdGhpcy5yb3VuZCA9IGRhdGEucm91bmQgfHwgZmFsc2U7XG4gICAgICB0aGlzLmluaXRQcmV2aWV3KCk7XG4gICAgfVxuXG4gIGluaXRQcmV2aWV3KCkge1xuICAgIHRoaXMubG9jYWxQcmV2aWV3VVJMID0gbnVsbDtcbiAgICB0aGlzLmNvbnRhaW5lckNsYXNzID0gW1ByZXZpZXdUeXBlLlNNQUxMXTtcbiAgICB0aGlzLmNvbnRhaW5lckltYWdlU3R5bGUgPSBudWxsO1xuICAgIHRoaXMuaWNvbkNsYXNzID0gbnVsbDtcblxuICAgIGlmICh0aGlzLnNpemUgPT09IFByZXZpZXdTaXplLldJREdFVCkge1xuICAgICAgdGhpcy5jb250YWluZXJDbGFzcyA9IFtQcmV2aWV3VHlwZS5XSURHRVRdO1xuICAgIH1cblxuICAgIGlmICh0aGlzLnByZXZpZXdVUkwgJiYgdGhpcy5wcmV2aWV3VVJMLmxlbmd0aCkge1xuICAgICAgdGhpcy5sb2NhbFByZXZpZXdVUkwgPSB0aGlzLnByZXZpZXdVUkw7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMucm91bmQpIHtcbiAgICAgIHRoaXMuY29udGFpbmVyQ2xhc3MucHVzaChQcmV2aWV3VHlwZS5ST1VORCk7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMubG9jYWxQcmV2aWV3VVJMKSB7XG4gICAgICB0aGlzLmNvbnRhaW5lckltYWdlU3R5bGUgPSB7J2JhY2tncm91bmQtaW1hZ2UnOiAndXJsKCcgKyB0aGlzLmxvY2FsUHJldmlld1VSTCArICcpJ307XG4gICAgICBjb25zdCBpbWFnZSA9IG5ldyBJbWFnZSgpO1xuICAgICAgaW1hZ2UuYWRkRXZlbnRMaXN0ZW5lcignbG9hZCcsIGUgPT4gdGhpcy5oYW5kbGVJbWFnZUxvYWQoZSkpO1xuICAgICAgaW1hZ2Uuc3JjID0gdGhpcy5sb2NhbFByZXZpZXdVUkw7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuaWNvbkNsYXNzID0gdGhpcy5kb2NUeXBlSWNvbkNsYXNzKHRoaXMudHlwZSk7XG4gICAgfVxuICB9XG4gIGhhbmRsZUltYWdlTG9hZChldmVudCkge1xuICAgIGNvbnN0IGltZyA9IGV2ZW50LnBhdGhbMF07XG4gICAgY29uc29sZS5sb2coJ2hhbmRsZUltYWdlTG9hZCcsIGltZyk7XG4gICAgaWYgKGltZy53aWR0aCA+IGltZy5oZWlnaHQpIHtcbiAgICAgIHRoaXMuY29udGFpbmVyQ2xhc3MucHVzaChQcmV2aWV3VHlwZS5MQU5EU0NBUEUpO1xuICAgIH1cbiAgICBpZiAoaW1nLndpZHRoIDwgaW1nLmhlaWdodCkge1xuICAgICAgdGhpcy5jb250YWluZXJDbGFzcy5wdXNoKFByZXZpZXdUeXBlLlBPUlRSQUlUKTtcbiAgICB9XG4gIH1cbiAgZG9jVHlwZUljb25DbGFzcyhkb2NUeXBlKTogc3RyaW5nW10ge1xuICAgIHN3aXRjaCAoZG9jVHlwZSkge1xuICAgICAgY2FzZSBEb2NUeXBlLkRPQ1g6XG4gICAgICAgIHJldHVybiBbJ3JuZy1pY29uLXdvcmRfMjRweF9vdXRsaW5lZCcsICdtcy1ibHVlJ107XG4gICAgICBjYXNlIERvY1R5cGUuWExTWDpcbiAgICAgICAgcmV0dXJuIFsncm5nLWljb24tZXhjZWxfMjRweCcsICdtcy1ncmVlbiddO1xuICAgICAgY2FzZSBEb2NUeXBlLlBERjpcbiAgICAgICAgcmV0dXJuIFsncm5nLWljb24tcGRmXzI0cHgnLCAnYWRvYmUtcmVkJ107XG4gICAgICBjYXNlIERvY1R5cGUuSU1BR0U6XG4gICAgICAgIHJldHVybiBbJ3JuZy1pY29uLWltYWdlJywgJ2dyYXknXTtcbiAgICAgIGNhc2UgRG9jVHlwZS5WSURFTzpcbiAgICAgICAgcmV0dXJuIFsncm5nLWljb24tdmlkZW8nLCAnZ3JheSddO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgcmV0dXJuIFsncm5nLWljb24tZ2VuZXJpY19kb2MnLCAnZ3JheSddO1xuICAgIH1cbiAgfVxuXG59XG4iXX0=