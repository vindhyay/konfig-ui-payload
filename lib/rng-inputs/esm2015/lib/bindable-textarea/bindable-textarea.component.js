/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, EventEmitter, Output, Input } from '@angular/core';
import { BindableComponent } from '../bindable/bindable.component';
export class BindableTextareaComponent extends BindableComponent {
    constructor() {
        super(...arguments);
        this.btnClick = new EventEmitter();
        this.autosize = true;
        this.minRows = 1;
        this.maxRows = 4;
    }
}
BindableTextareaComponent.decorators = [
    { type: Component, args: [{
                selector: 'rng-bindable-textarea',
                template: "<div class=\"rng-bindable-textarea\" [ngClass]=\"{'with-button': !!btnIconCSS}\">\n  <mat-form-field [ngClass]=\"fieldCSS\"\n    [appearance]=\"appearance\"\n    color=\"accent\">\n    <mat-label>{{label}}</mat-label>\n    <textarea \n      matInput \n      [placeholder]=\"placeholder\"\n      [formControl]=\"valueControl\"\n      [errorStateMatcher]=\"matcher\"\n      [cdkTextareaAutosize]=\"autosize\"\n      [cdkAutosizeMinRows]=\"minRows\"\n      [cdkAutosizeMaxRows]=\"maxRows\"\n      (blur)=\"onTouch()\"></textarea>\n    <mat-error *ngIf=\"valueControl.invalid\">{{getErrorMessage()}}</mat-error>\n  </mat-form-field>\n  <button mat-icon-button *ngIf=\"btnIconCSS\"\n    class=\"text-area-button\"\n    (click)=\"btnClick.emit()\">\n    <i [class]=\"btnIconCSS\"></i>\n  </button>\n</div>\n",
                styles: [""]
            }] }
];
BindableTextareaComponent.propDecorators = {
    btnClick: [{ type: Output }],
    btnIconCSS: [{ type: Input }],
    autosize: [{ type: Input }],
    minRows: [{ type: Input }],
    maxRows: [{ type: Input }]
};
if (false) {
    /** @type {?} */
    BindableTextareaComponent.prototype.btnClick;
    /** @type {?} */
    BindableTextareaComponent.prototype.btnIconCSS;
    /** @type {?} */
    BindableTextareaComponent.prototype.autosize;
    /** @type {?} */
    BindableTextareaComponent.prototype.minRows;
    /** @type {?} */
    BindableTextareaComponent.prototype.maxRows;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmluZGFibGUtdGV4dGFyZWEuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHJuZy9pbnB1dHMvIiwic291cmNlcyI6WyJsaWIvYmluZGFibGUtdGV4dGFyZWEvYmluZGFibGUtdGV4dGFyZWEuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLFlBQVksRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFnQixNQUFNLGVBQWUsQ0FBQztBQUNyRixPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxnQ0FBZ0MsQ0FBQztBQVFuRSxNQUFNLE9BQU8seUJBQTBCLFNBQVEsaUJBQWlCO0lBTGhFOztRQU1ZLGFBQVEsR0FBRyxJQUFJLFlBQVksRUFBRSxDQUFDO1FBRS9CLGFBQVEsR0FBbUIsSUFBSSxDQUFDO1FBQ2hDLFlBQU8sR0FBa0IsQ0FBQyxDQUFDO1FBQzNCLFlBQU8sR0FBa0IsQ0FBQyxDQUFDO0lBQ3RDLENBQUM7OztZQVhBLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsdUJBQXVCO2dCQUNqQyw2eUJBQWlEOzthQUVsRDs7O3VCQUVFLE1BQU07eUJBQ04sS0FBSzt1QkFDTCxLQUFLO3NCQUNMLEtBQUs7c0JBQ0wsS0FBSzs7OztJQUpOLDZDQUF3Qzs7SUFDeEMsK0NBQW1DOztJQUNuQyw2Q0FBeUM7O0lBQ3pDLDRDQUFvQzs7SUFDcEMsNENBQW9DIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBFdmVudEVtaXR0ZXIsIE91dHB1dCwgSW5wdXQsIEhvc3RMaXN0ZW5lciB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQmluZGFibGVDb21wb25lbnQgfSBmcm9tICcuLi9iaW5kYWJsZS9iaW5kYWJsZS5jb21wb25lbnQnO1xuaW1wb3J0IHsgIH0gZnJvbSAnZXZlbnRzJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAncm5nLWJpbmRhYmxlLXRleHRhcmVhJyxcbiAgdGVtcGxhdGVVcmw6ICcuL2JpbmRhYmxlLXRleHRhcmVhLmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vYmluZGFibGUtdGV4dGFyZWEuY29tcG9uZW50LnNjc3MnXVxufSlcbmV4cG9ydCBjbGFzcyBCaW5kYWJsZVRleHRhcmVhQ29tcG9uZW50IGV4dGVuZHMgQmluZGFibGVDb21wb25lbnQge1xuICBAT3V0cHV0KCkgYnRuQ2xpY2sgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gIEBJbnB1dCgpIGJ0bkljb25DU1M6IHN0cmluZyB8IG51bGw7XG4gIEBJbnB1dCgpIGF1dG9zaXplOiBib29sZWFuIHwgbnVsbCA9IHRydWU7XG4gIEBJbnB1dCgpIG1pblJvd3M6IG51bWJlciB8IG51bGwgPSAxO1xuICBASW5wdXQoKSBtYXhSb3dzOiBudW1iZXIgfCBudWxsID0gNDtcbn1cbiJdfQ==