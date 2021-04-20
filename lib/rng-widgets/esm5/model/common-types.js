/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @record
 */
export function TypeLabel() { }
if (false) {
    /** @type {?} */
    TypeLabel.prototype.color;
    /** @type {?} */
    TypeLabel.prototype.value;
    /** @type {?|undefined} */
    TypeLabel.prototype.status;
}
/**
 * @record
 */
export function IAvatarData() { }
if (false) {
    /** @type {?} */
    IAvatarData.prototype.name;
    /** @type {?} */
    IAvatarData.prototype.imageUrl;
}
/**
 * @record
 */
export function IAvatarEnabled() { }
if (false) {
    /** @type {?} */
    IAvatarEnabled.prototype.avatar;
}
/**
 * @record
 */
export function IPreviewData() { }
if (false) {
    /** @type {?} */
    IPreviewData.prototype.docType;
    /** @type {?|undefined} */
    IPreviewData.prototype.previewURL;
    /** @type {?|undefined} */
    IPreviewData.prototype.previewSize;
    /** @type {?|undefined} */
    IPreviewData.prototype.round;
}
/** @enum {number} */
var DocType = {
    XLSX: 0, DOCX: 1, HTML: 2, XML: 3, ZIP: 4, PDF: 5, IMAGE: 6, VIDEO: 7,
};
export { DocType };
DocType[DocType.XLSX] = 'XLSX';
DocType[DocType.DOCX] = 'DOCX';
DocType[DocType.HTML] = 'HTML';
DocType[DocType.XML] = 'XML';
DocType[DocType.ZIP] = 'ZIP';
DocType[DocType.PDF] = 'PDF';
DocType[DocType.IMAGE] = 'IMAGE';
DocType[DocType.VIDEO] = 'VIDEO';
/** @enum {string} */
var PreviewType = {
    SMALL: 'small',
    WIDGET: 'widget',
    ROUND: 'round',
    PORTRAIT: 'portrait',
    LANDSCAPE: 'landscape',
};
export { PreviewType };
/** @enum {number} */
var PreviewSize = {
    SMALL: 32,
    WIDGET: 120,
};
export { PreviewSize };
PreviewSize[PreviewSize.SMALL] = 'SMALL';
PreviewSize[PreviewSize.WIDGET] = 'WIDGET';
/**
 * @record
 * @template T
 */
export function IActionButton() { }
if (false) {
    /** @type {?} */
    IActionButton.prototype.iconCSS;
    /** @type {?} */
    IActionButton.prototype.action;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tbW9uLXR5cGVzLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHJuZy93aWRnZXRzLyIsInNvdXJjZXMiOlsibW9kZWwvY29tbW9uLXR5cGVzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQSwrQkFJQzs7O0lBSEMsMEJBQWM7O0lBQ2QsMEJBQWM7O0lBQ2QsMkJBQWlCOzs7OztBQUduQixpQ0FHQzs7O0lBRkMsMkJBQWE7O0lBQ2IsK0JBQWlCOzs7OztBQUduQixvQ0FFQzs7O0lBREMsZ0NBQW9COzs7OztBQUd0QixrQ0FLQzs7O0lBSkMsK0JBQWlCOztJQUNqQixrQ0FBMkI7O0lBQzNCLG1DQUFpQzs7SUFDakMsNkJBQXdCOzs7O0lBSXhCLE9BQUksRUFBRSxPQUFJLEVBQUUsT0FBSSxFQUFFLE1BQUcsRUFBRSxNQUFHLEVBQUUsTUFBRyxFQUFFLFFBQUssRUFBRSxRQUFLOzs7Ozs7Ozs7Ozs7O0lBSTdDLE9BQVEsT0FBTztJQUNmLFFBQVMsUUFBUTtJQUNqQixPQUFRLE9BQU87SUFDZixVQUFXLFVBQVU7SUFDckIsV0FBWSxXQUFXOzs7OztJQUl2QixTQUFVO0lBQ1YsV0FBWTs7Ozs7Ozs7O0FBR2QsbUNBR0M7OztJQUZDLGdDQUFnQjs7SUFDaEIsK0JBQVUiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgaW50ZXJmYWNlIFR5cGVMYWJlbCB7XG4gIGNvbG9yOiBzdHJpbmc7XG4gIHZhbHVlOiBzdHJpbmc7XG4gIHN0YXR1cz86IGJvb2xlYW47XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgSUF2YXRhckRhdGEge1xuICBuYW1lOiBzdHJpbmc7XG4gIGltYWdlVXJsOiBzdHJpbmc7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgSUF2YXRhckVuYWJsZWQge1xuICBhdmF0YXI6IElBdmF0YXJEYXRhO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIElQcmV2aWV3RGF0YSB7XG4gIGRvY1R5cGU6IERvY1R5cGU7XG4gIHByZXZpZXdVUkw/OiBzdHJpbmcgfCBudWxsO1xuICBwcmV2aWV3U2l6ZT86IFByZXZpZXdTaXplIHwgbnVsbDtcbiAgcm91bmQ/OiBib29sZWFuIHwgZmFsc2U7XG59XG5cbmV4cG9ydCBlbnVtIERvY1R5cGUge1xuICBYTFNYLCBET0NYLCBIVE1MLCBYTUwsIFpJUCwgUERGLCBJTUFHRSwgVklERU9cbn1cblxuZXhwb3J0IGVudW0gUHJldmlld1R5cGUge1xuICBTTUFMTCA9ICdzbWFsbCcsXG4gIFdJREdFVCA9ICd3aWRnZXQnLFxuICBST1VORCA9ICdyb3VuZCcsXG4gIFBPUlRSQUlUID0gJ3BvcnRyYWl0JyxcbiAgTEFORFNDQVBFID0gJ2xhbmRzY2FwZScsXG59XG5cbmV4cG9ydCBlbnVtIFByZXZpZXdTaXplIHtcbiAgU01BTEwgPSAzMixcbiAgV0lER0VUID0gMTIwLFxufVxuXG5leHBvcnQgaW50ZXJmYWNlIElBY3Rpb25CdXR0b248VD4ge1xuICBpY29uQ1NTOiBzdHJpbmc7XG4gIGFjdGlvbjogVDtcbn1cbiJdfQ==