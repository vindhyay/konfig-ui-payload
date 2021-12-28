/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input, Optional, Self } from '@angular/core';
import { NgControl, FormControl } from '@angular/forms';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { Subject } from 'rxjs';
export class ReactiveControlComponent {
    /**
     * @param {?} ngControl
     */
    constructor(ngControl) {
        this.ngControl = ngControl;
        this.valueControl = new FormControl();
        this.stateChanges = new Subject(); // this will mostly be used with custom controls for material inputs
        this.onLocalChange = (/**
         * @param {?} val
         * @return {?}
         */
        (val) => {
            console.log('onLocalChange', val);
            this.value = val;
        });
        this.onChange = (/**
         * @param {?} val
         * @return {?}
         */
        (val) => {
            console.log('onChange', val);
        });
        this.onTouched = (/**
         * @return {?}
         */
        () => {
            console.log('onTouched');
        });
        if (this.ngControl != null) {
            this.ngControl.valueAccessor = this;
            this.valueControl = new FormControl();
        }
    }
    // this will mostly be used with custom controls for material inputs
    /**
     * @return {?}
     */
    get disabled() { return this.valueControl.disabled; }
    /**
     * @param {?} value
     * @return {?}
     */
    set disabled(value) {
        /** @type {?} */
        const disabled = coerceBooleanProperty(value);
        if (disabled) {
            this.valueControl.disable();
        }
        else {
            this.valueControl.enable();
        }
        this.stateChanges.next();
    }
    /**
     * @return {?}
     */
    get value() {
        return this.valueControl.value;
    }
    /**
     * @param {?} val
     * @return {?}
     */
    set value(val) {
        this.onChange(val);
        this.stateChanges.next();
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        console.log('ngOnInit');
        // TODO: add common validators or some other logic to simplify or deserialise validators, etc.
        if (this.ngControl && this.valueControl) {
            console.log('ngOnInit: setting up');
            // TODO: check for existing "default" validators
            this.valueControl.setValidators(this.ngControl.validator);
            this.valueControl.setAsyncValidators(this.ngControl.asyncValidator);
            this.valueControl.setValue(this.ngControl.value);
            this.valueControl.updateValueAndValidity();
            this.subscription =
                this.valueControl.valueChanges.subscribe(this.onLocalChange);
        }
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.stateChanges.complete();
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }
    /**
     * @param {?} val
     * @return {?}
     */
    writeValue(val) {
        this.value = val; // initial value or model updates for the view
    }
    /**
     * @param {?} fn
     * @return {?}
     */
    registerOnChange(fn) {
        this.onChange = fn;
    }
    /**
     * @param {?} fn
     * @return {?}
     */
    registerOnTouched(fn) {
        this.onTouched = fn;
    }
    /**
     * @param {?} isDisabled
     * @return {?}
     */
    setDisabledState(isDisabled) {
        this.disabled = isDisabled;
    }
}
ReactiveControlComponent.decorators = [
    { type: Component, args: [{
                selector: 'rng-reactive-control',
                template: 'NO BASE TEMPLATE'
            }] }
];
/** @nocollapse */
ReactiveControlComponent.ctorParameters = () => [
    { type: NgControl, decorators: [{ type: Optional }, { type: Self }] }
];
ReactiveControlComponent.propDecorators = {
    disabled: [{ type: Input }],
    value: [{ type: Input }]
};
if (false) {
    /**
     * @type {?}
     * @private
     */
    ReactiveControlComponent.prototype.subscription;
    /** @type {?} */
    ReactiveControlComponent.prototype.valueControl;
    /** @type {?} */
    ReactiveControlComponent.prototype.stateChanges;
    /** @type {?} */
    ReactiveControlComponent.prototype.onLocalChange;
    /** @type {?} */
    ReactiveControlComponent.prototype.onChange;
    /** @type {?} */
    ReactiveControlComponent.prototype.onTouched;
    /** @type {?} */
    ReactiveControlComponent.prototype.ngControl;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVhY3RpdmUtY29udHJvbC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Acm5nL2lucHV0cy8iLCJzb3VyY2VzIjpbImxpYi9yZWFjdGl2ZS1jb250cm9sL3JlYWN0aXZlLWNvbnRyb2wuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUEyQyxNQUFNLGVBQWUsQ0FBQztBQUMxRyxPQUFPLEVBQXdCLFNBQVMsRUFBRSxXQUFXLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUM5RSxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUM5RCxPQUFPLEVBQUUsT0FBTyxFQUFnQixNQUFNLE1BQU0sQ0FBQztBQU83QyxNQUFNLE9BQU8sd0JBQXdCOzs7O0lBMEJuQyxZQUF1QyxTQUFvQjtRQUFwQixjQUFTLEdBQVQsU0FBUyxDQUFXO1FBeEJwRCxpQkFBWSxHQUFHLElBQUksV0FBVyxFQUFFLENBQUM7UUFDakMsaUJBQVksR0FBRyxJQUFJLE9BQU8sRUFBUSxDQUFDLENBQUMsb0VBQW9FO1FBOEJ4RyxrQkFBYTs7OztRQUFHLENBQUMsR0FBUSxFQUFFLEVBQUU7WUFDbEMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxlQUFlLEVBQUUsR0FBRyxDQUFDLENBQUM7WUFDbEMsSUFBSSxDQUFDLEtBQUssR0FBRyxHQUFHLENBQUM7UUFDbkIsQ0FBQyxFQUFBO1FBRUQsYUFBUTs7OztRQUFHLENBQUMsR0FBUSxFQUFFLEVBQUU7WUFDdEIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxVQUFVLEVBQUUsR0FBRyxDQUFDLENBQUM7UUFDL0IsQ0FBQyxFQUFBO1FBRUQsY0FBUzs7O1FBQUcsR0FBRyxFQUFFO1lBQ2YsT0FBTyxDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUMzQixDQUFDLEVBQUE7UUFqQkMsSUFBSSxJQUFJLENBQUMs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QyxpREFHQzs7SUFFRCw0Q0FFQzs7SUFFRCw2Q0FFQzs7SUFsQlcsNkNBQStDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCwgT3B0aW9uYWwsIFNlbGYsIE9uRGVzdHJveSwgT25Jbml0LCBPdXRwdXQsIEV2ZW50RW1pdHRlciB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29udHJvbFZhbHVlQWNjZXNzb3IsIE5nQ29udHJvbCwgRm9ybUNvbnRyb2wgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBjb2VyY2VCb29sZWFuUHJvcGVydHkgfSBmcm9tICdAYW5ndWxhci9jZGsvY29lcmNpb24nO1xuaW1wb3J0IHsgU3ViamVjdCwgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ3JuZy1yZWFjdGl2ZS1jb250cm9sJyxcbiAgdGVtcGxhdGU6ICdOTyBCQVNFIFRFTVBMQVRFJyxcbiAgc3R5bGVVcmxzOiBbXVxufSlcbmV4cG9ydCBjbGFzcyBSZWFjdGl2ZUNvbnRyb2xDb21wb25lbnQgaW1wbGVtZW50cyBDb250cm9sVmFsdWVBY2Nlc3NvciwgT25Jbml0LCBPbkRlc3Ryb3kge1xuICBwcml2YXRlIHN1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uO1xuICBwdWJsaWMgdmFsdWVDb250cm9sID0gbmV3IEZvcm1Db250cm9sKCk7XG4gIHB1YmxpYyBzdGF0ZUNoYW5nZXMgPSBuZXcgU3ViamVjdDx2b2lkPigpOyAvLyB0aGlzIHdpbGwgbW9zdGx5IGJlIHVzZWQgd2l0aCBjdXN0b20gY29udHJvbHMgZm9yIG1hdGVyaWFsIGlucHV0c1xuXG4gIEBJbnB1dCgpXG4gICAgZ2V0IGRpc2FibGVkKCk6IGJvb2xlYW4geyByZXR1cm4gdGhpcy52YWx1ZUNvbnRyb2wuZGlzYWJsZWQ7IH1cbiAgICBzZXQgZGlzYWJsZWQodmFsdWU6IGJvb2xlYW4pIHtcbiAgICAgIGNvbnN0IGRpc2FibGVkOiBib29sZWFuID0gY29lcmNlQm9vbGVhblByb3BlcnR5KHZhbHVlKTtcbiAgICAgIGlmIChkaXNhYmxlZCkge1xuICAgICAgICB0aGlzLnZhbHVlQ29udHJvbC5kaXNhYmxlKCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLnZhbHVlQ29udHJvbC5lbmFibGUoKTtcbiAgICAgIH1cbiAgICAgIHRoaXMuc3RhdGVDaGFuZ2VzLm5leHQoKTtcbiAgICB9XG5cbiAgQElucHV0KClcbiAgICBnZXQgdmFsdWUoKTogYW55IHwgbnVsbCB7XG4gICAgICByZXR1cm4gdGhpcy52YWx1ZUNvbnRyb2wudmFsdWU7XG4gICAgfVxuICAgIHNldCB2YWx1ZSh2YWw6IGFueSB8IG51bGwpIHtcbiAgICAgIHRoaXMub25DaGFuZ2UodmFsKTtcbiAgICAgIHRoaXMuc3RhdGVDaGFuZ2VzLm5leHQoKTtcbiAgICB9XG5cbiAgY29uc3RydWN0b3IoQE9wdGlvbmFsKCkgQFNlbGYoKSBwdWJsaWMgbmdDb250cm9sOiBOZ0NvbnRyb2wpIHtcbiAgICBpZiAodGhpcy5uZ0NvbnRyb2wgIT0gbnVsbCkge1xuICAgICAgdGhpcy5uZ0NvbnRyb2wudmFsdWVBY2Nlc3NvciA9IHRoaXM7XG4gICAgICB0aGlzLnZhbHVlQ29udHJvbCA9IG5ldyBGb3JtQ29udHJvbCgpO1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBvbkxvY2FsQ2hhbmdlID0gKHZhbDogYW55KSA9PiB7XG4gICAgY29uc29sZS5sb2coJ29uTG9jYWxDaGFuZ2UnLCB2YWwpO1xuICAgIHRoaXMudmFsdWUgPSB2YWw7XG4gIH1cblxuICBvbkNoYW5nZSA9ICh2YWw6IGFueSkgPT4ge1xuICAgIGNvbnNvbGUubG9nKCdvbkNoYW5nZScsIHZhbCk7XG4gIH1cblxuICBvblRvdWNoZWQgPSAoKSA9PiB7XG4gICAgY29uc29sZS5sb2coJ29uVG91Y2hlZCcpO1xuICB9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgY29uc29sZS5sb2coJ25nT25Jbml0Jyk7XG4gICAgLy8gVE9ETzogYWRkIGNvbW1vbiB2YWxpZGF0b3JzIG9yIHNvbWUgb3RoZXIgbG9naWMgdG8gc2ltcGxpZnkgb3IgZGVzZXJpYWxpc2UgdmFsaWRhdG9ycywgZXRjLlxuICAgIGlmICh0aGlzLm5nQ29udHJvbCAmJiB0aGlzLnZhbHVlQ29udHJvbCkge1xuICAgICAgY29uc29sZS5sb2coJ25nT25Jbml0OiBzZXR0aW5nIHVwJyk7XG4gICAgICAvLyBUT0RPOiBjaGVjayBmb3IgZXhpc3RpbmcgXCJkZWZhdWx0XCIgdmFsaWRhdG9yc1xuICAgICAgdGhpcy52YWx1ZUNvbnRyb2wuc2V0VmFsaWRhdG9ycyh0aGlzLm5nQ29udHJvbC52YWxpZGF0b3IpO1xuICAgICAgdGhpcy52YWx1ZUNvbnRyb2wuc2V0QXN5bmNWYWxpZGF0b3JzKHRoaXMubmdDb250cm9sLmFzeW5jVmFsaWRhdG9yKTtcbiAgICAgIHRoaXMudmFsdWVDb250cm9sLnNldFZhbHVlKHRoaXMubmdDb250cm9sLnZhbHVlKTtcbiAgICAgIHRoaXMudmFsdWVDb250cm9sLnVwZGF0ZVZhbHVlQW5kVmFsaWRpdHkoKTtcbiAgICAgIHRoaXMuc3Vic2NyaXB0aW9uID1cbiAgICAgICAgdGhpcy52YWx1ZUNvbnRyb2wudmFsdWVDaGFuZ2VzLnN1YnNjcmliZSh0aGlzLm9uTG9jYWxDaGFuZ2UpO1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBuZ09uRGVzdHJveSgpIHtcbiAgICB0aGlzLnN0YXRlQ2hhbmdlcy5jb21wbGV0ZSgpO1xuICAgIGlmICh0aGlzLnN1YnNjcmlwdGlvbikge1xuICAgICAgdGhpcy5zdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgd3JpdGVWYWx1ZSh2YWw6IHN0cmluZyB8IG51bGwpOiB2b2lkIHtcbiAgICB0aGlzLnZhbHVlID0gdmFsOyAvLyBpbml0aWFsIHZhbHVlIG9yIG1vZGVsIHVwZGF0ZXMgZm9yIHRoZSB2aWV3XG4gIH1cblxuICBwdWJsaWMgcmVnaXN0ZXJPbkNoYW5nZShmbjogYW55KTogdm9pZCB7XG4gICAgdGhpcy5vbkNoYW5nZSA9IGZuO1xuICB9XG5cbiAgcHVibGljIHJlZ2lzdGVyT25Ub3VjaGVkKGZuOiBhbnkpOiB2b2lkIHtcbiAgICB0aGlzLm9uVG91Y2hlZCA9IGZuO1xuICB9XG5cbiAgcHVibGljIHNldERpc2FibGVkU3RhdGUoaXNEaXNhYmxlZDogYm9vbGVhbik6IHZvaWQge1xuICAgIHRoaXMuZGlzYWJsZWQgPSBpc0Rpc2FibGVkO1xuICB9XG59XG4iXX0=