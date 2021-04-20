/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input } from '@angular/core';
import { BindableInputComponent } from '../bindable-input/bindable-input.component';
import * as momentModule from 'moment';
/** @type {?} */
const moment = momentModule;
export class BindableTimepickerComponent extends BindableInputComponent {
    constructor() {
        super(...arguments);
        this.stepMinutes = 30;
        this.dayStartHour = 8;
        this.dayEndHour = 19;
        this.items = [];
        this.filteredItems = this.items;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        super.ngOnInit();
        this.items = this.generateIntervals();
        this.filteredItems = this.items;
        this.subscription.add(this.valueControl.valueChanges.subscribe((/**
         * @param {?} value
         * @return {?}
         */
        value => {
            this.filteredItems = this.items.filter((/**
             * @param {?} item
             * @return {?}
             */
            item => item.startsWith(value)));
        })));
    }
    /**
     * @return {?}
     */
    generateIntervals() {
        /** @type {?} */
        const items = [];
        for (let index = this.dayStartHour * 60; index <= this.dayEndHour * 60; index += this.stepMinutes) {
            /** @type {?} */
            const date = new Date(0, 0, 0, 0, index);
            items.push(moment(date).format('h:mm A'));
        }
        return items;
    }
}
BindableTimepickerComponent.decorators = [
    { type: Component, args: [{
                selector: 'rng-bindable-timepicker',
                template: "<mat-form-field  [ngClass]=\"fieldCSS\"\n  [appearance]=\"appearance\"\n  [floatLabel]=\"floatLabel\"\n  color=\"accent\">\n  <i matSuffix\n    class=\"rng-icon rng-icon-schedule\"></i>\n  <mat-label *ngIf=\"label\">{{label}}</mat-label>\n  <input matInput \n    [formControl]=\"valueControl\"\n    [matAutocomplete]=\"auto\"/>                  \n  <mat-autocomplete #auto=\"matAutocomplete\">\n    <mat-option *ngFor=\"let item of filteredItems\" \n      [value]=\"item\">{{item}}</mat-option>\n  </mat-autocomplete>\n  <mat-error *ngIf=\"valueControl.invalid\">{{getErrorMessage()}}</mat-error>\n</mat-form-field>"
            }] }
];
BindableTimepickerComponent.propDecorators = {
    stepMinutes: [{ type: Input }],
    dayStartHour: [{ type: Input }],
    dayEndHour: [{ type: Input }]
};
if (false) {
    /** @type {?} */
    BindableTimepickerComponent.prototype.stepMinutes;
    /** @type {?} */
    BindableTimepickerComponent.prototype.dayStartHour;
    /** @type {?} */
    BindableTimepickerComponent.prototype.dayEndHour;
    /** @type {?} */
    BindableTimepickerComponent.prototype.items;
    /** @type {?} */
    BindableTimepickerComponent.prototype.filteredItems;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmluZGFibGUtdGltZXBpY2tlci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Acm5nL2lucHV0cy8iLCJzb3VyY2VzIjpbImxpYi9iaW5kYWJsZS10aW1lcGlja2VyL2JpbmRhYmxlLXRpbWVwaWNrZXIuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFVLEtBQUssRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6RCxPQUFPLEVBQUUsc0JBQXNCLEVBQUUsTUFBTSw0Q0FBNEMsQ0FBQztBQUNwRixPQUFPLEtBQUssWUFBWSxNQUFNLFFBQVEsQ0FBQzs7TUFDakMsTUFBTSxHQUFHLFlBQVk7QUFPM0IsTUFBTSxPQUFPLDJCQUNYLFNBQVEsc0JBQXNCO0lBTmhDOztRQVFXLGdCQUFXLEdBQWtCLEVBQUUsQ0FBQztRQUNoQyxpQkFBWSxHQUFrQixDQUFDLENBQUM7UUFDaEMsZUFBVSxHQUFrQixFQUFFLENBQUM7UUFFeEMsVUFBSyxHQUFhLEVBQUUsQ0FBQztRQUNyQixrQkFBYSxHQUFhLElBQUksQ0FBQyxLQUFLLENBQUM7SUFzQnZDLENBQUM7Ozs7SUFwQkMsUUFBUTtRQUNOLEtBQUssQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUNqQixJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO1FBQ3RDLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQztRQUNoQyxJQUFJLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FDbkIsSUFBSSxDQUFDLFlBQVksQ0FBQyxZQUFZLENBQUMsU0FBUzs7OztRQUFDLEtBQUssQ0FBQyxFQUFFO1lBQy9DLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNOzs7O1lBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxFQUFDLENBQUM7UUFDekUsQ0FBQyxFQUFDLENBQ0gsQ0FBQztJQUNKLENBQUM7Ozs7SUFFRCxpQkFBaUI7O2NBQ1QsS0FBSyxHQUFHLEVBQUU7UUFDaEIsS0FBSyxJQUFJLEtBQUssR0FBRyxJQUFJLENBQUMsWUFBWSxHQUFHLEVBQUUsRUFBRSxLQUFLLElBQUksSUFBSSxDQUFDLFVBQVUsR0FBRyxFQUFFLEVBQUUsS0FBSyxJQUFJLElBQUksQ0FBQyxXQUFXLEVBQUU7O2tCQUMzRixJQUFJLEdBQUcsSUFBSSxJQUFJLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEtBQUssQ0FBQztZQUN4QyxLQUFLLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztTQUMzQztRQUNELE9BQU8sS0FBSyxDQUFDO0lBQ2YsQ0FBQzs7O1lBakNGLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUseUJBQXlCO2dCQUNuQyxtbkJBQW1EO2FBRXBEOzs7MEJBSUUsS0FBSzsyQkFDTCxLQUFLO3lCQUNMLEtBQUs7Ozs7SUFGTixrREFBeUM7O0lBQ3pDLG1EQUF5Qzs7SUFDekMsaURBQXdDOztJQUV4Qyw0Q0FBcUI7O0lBQ3JCLG9EQUFxQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBJbnB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQmluZGFibGVJbnB1dENvbXBvbmVudCB9IGZyb20gJy4uL2JpbmRhYmxlLWlucHV0L2JpbmRhYmxlLWlucHV0LmNvbXBvbmVudCc7XG5pbXBvcnQgKiBhcyBtb21lbnRNb2R1bGUgZnJvbSAnbW9tZW50JztcbmNvbnN0IG1vbWVudCA9IG1vbWVudE1vZHVsZTtcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAncm5nLWJpbmRhYmxlLXRpbWVwaWNrZXInLFxuICB0ZW1wbGF0ZVVybDogJy4vYmluZGFibGUtdGltZXBpY2tlci5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogW11cbn0pXG5leHBvcnQgY2xhc3MgQmluZGFibGVUaW1lcGlja2VyQ29tcG9uZW50XG4gIGV4dGVuZHMgQmluZGFibGVJbnB1dENvbXBvbmVudFxuICBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gIEBJbnB1dCgpIHN0ZXBNaW51dGVzOiBudW1iZXIgfCBudWxsID0gMzA7XG4gIEBJbnB1dCgpIGRheVN0YXJ0SG91cjogbnVtYmVyIHwgbnVsbCA9IDg7XG4gIEBJbnB1dCgpIGRheUVuZEhvdXI6IG51bWJlciB8IG51bGwgPSAxOTtcblxuICBpdGVtczogc3RyaW5nW10gPSBbXTtcbiAgZmlsdGVyZWRJdGVtczogc3RyaW5nW10gPSB0aGlzLml0ZW1zO1xuXG4gIG5nT25Jbml0KCkge1xuICAgIHN1cGVyLm5nT25Jbml0KCk7XG4gICAgdGhpcy5pdGVtcyA9IHRoaXMuZ2VuZXJhdGVJbnRlcnZhbHMoKTtcbiAgICB0aGlzLmZpbHRlcmVkSXRlbXMgPSB0aGlzLml0ZW1zO1xuICAgIHRoaXMuc3Vic2NyaXB0aW9uLmFkZChcbiAgICAgIHRoaXMudmFsdWVDb250cm9sLnZhbHVlQ2hhbmdlcy5zdWJzY3JpYmUodmFsdWUgPT4ge1xuICAgICAgICB0aGlzLmZpbHRlcmVkSXRlbXMgPSB0aGlzLml0ZW1zLmZpbHRlcihpdGVtID0+IGl0ZW0uc3RhcnRzV2l0aCh2YWx1ZSkpO1xuICAgICAgfSlcbiAgICApO1xuICB9XG5cbiAgZ2VuZXJhdGVJbnRlcnZhbHMoKTogc3RyaW5nW10ge1xuICAgIGNvbnN0IGl0ZW1zID0gW107XG4gICAgZm9yIChsZXQgaW5kZXggPSB0aGlzLmRheVN0YXJ0SG91ciAqIDYwOyBpbmRleCA8PSB0aGlzLmRheUVuZEhvdXIgKiA2MDsgaW5kZXggKz0gdGhpcy5zdGVwTWludXRlcykge1xuICAgICAgY29uc3QgZGF0ZSA9IG5ldyBEYXRlKDAsIDAsIDAsIDAsIGluZGV4KTtcbiAgICAgIGl0ZW1zLnB1c2gobW9tZW50KGRhdGUpLmZvcm1hdCgnaDptbSBBJykpO1xuICAgIH1cbiAgICByZXR1cm4gaXRlbXM7XG4gIH1cblxufVxuIl19