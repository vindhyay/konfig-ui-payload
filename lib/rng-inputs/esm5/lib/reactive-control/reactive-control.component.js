/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input, Optional, Self } from '@angular/core';
import { NgControl, FormControl } from '@angular/forms';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { Subject } from 'rxjs';
var ReactiveControlComponent = /** @class */ (function () {
    function ReactiveControlComponent(ngControl) {
        var _this = this;
        this.ngControl = ngControl;
        this.valueControl = new FormControl();
        this.stateChanges = new Subject(); // this will mostly be used with custom controls for material inputs
        this.onLocalChange = (/**
         * @param {?} val
         * @return {?}
         */
        function (val) {
            console.log('onLocalChange', val);
            _this.value = val;
        });
        this.onChange = (/**
         * @param {?} val
         * @return {?}
         */
        function (val) {
            console.log('onChange', val);
        });
        this.onTouched = (/**
         * @return {?}
         */
        function () {
            console.log('onTouched');
        });
        if (this.ngControl != null) {
            this.ngControl.valueAccessor = this;
            this.valueControl = new FormControl();
        }
    }
    Object.defineProperty(ReactiveControlComponent.prototype, "disabled", {
        get: 
        // this will mostly be used with custom controls for material inputs
        /**
         * @return {?}
         */
        function () { return this.valueControl.disabled; },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            /** @type {?} */
            var disabled = coerceBooleanProperty(value);
            if (disabled) {
                this.valueControl.disable();
            }
            else {
                this.valueControl.enable();
            }
            this.stateChanges.next();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ReactiveControlComponent.prototype, "value", {
        get: /**
         * @return {?}
         */
        function () {
            return this.valueControl.value;
        },
        set: /**
         * @param {?} val
         * @return {?}
         */
        function (val) {
            this.onChange(val);
            this.stateChanges.next();
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    ReactiveControlComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
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
    };
    /**
     * @return {?}
     */
    ReactiveControlComponent.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.stateChanges.complete();
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    };
    /**
     * @param {?} val
     * @return {?}
     */
    ReactiveControlComponent.prototype.writeValue = /**
     * @param {?} val
     * @return {?}
     */
    function (val) {
        this.value = val; // initial value or model updates for the view
    };
    /**
     * @param {?} fn
     * @return {?}
     */
    ReactiveControlComponent.prototype.registerOnChange = /**
     * @param {?} fn
     * @return {?}
     */
    function (fn) {
        this.onChange = fn;
    };
    /**
     * @param {?} fn
     * @return {?}
     */
    ReactiveControlComponent.prototype.registerOnTouched = /**
     * @param {?} fn
     * @return {?}
     */
    function (fn) {
        this.onTouched = fn;
    };
    /**
     * @param {?} isDisabled
     * @return {?}
     */
    ReactiveControlComponent.prototype.setDisabledState = /**
     * @param {?} isDisabled
     * @return {?}
     */
    function (isDisabled) {
        this.disabled = isDisabled;
    };
    ReactiveControlComponent.decorators = [
        { type: Component, args: [{
                    selector: 'rng-reactive-control',
                    template: 'NO BASE TEMPLATE'
                }] }
    ];
    /** @nocollapse */
    ReactiveControlComponent.ctorParameters = function () { return [
        { type: NgControl, decorators: [{ type: Optional }, { type: Self }] }
    ]; };
    ReactiveControlComponent.propDecorators = {
        disabled: [{ type: Input }],
        value: [{ type: Input }]
    };
    return ReactiveControlComponent;
}());
export { ReactiveControlComponent };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVhY3RpdmUtY29udHJvbC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Acm5nL2lucHV0cy8iLCJzb3VyY2VzIjpbImxpYi9yZWFjdGl2ZS1jb250cm9sL3JlYWN0aXZlLWNvbnRyb2wuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUEyQyxNQUFNLGVBQWUsQ0FBQztBQUMxRyxPQUFPLEVBQXdCLFNBQVMsRUFBRSxXQUFXLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUM5RSxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUM5RCxPQUFPLEVBQUUsT0FBTyxFQUFnQixNQUFNLE1BQU0sQ0FBQztBQUU3QztJQStCRSxrQ0FBdUMsU0FBb0I7UUFBM0QsaUJBS0M7UUFMc0MsY0FBUyxHQUFULFNBQVMsQ0FBVztRQXhCcEQsaUJBQVksR0FBRyxJQUFJLFdBQVcsRUFBRSxDQUFDO1FBQ2pDLGlCQUFZLEdBQUcsSUFBSSxPQUFPLEVBQVEsQ0FBQyxDQUFDLG9FQUFvRTtRQThCeEcsa0JBQWE7Ozs7UUFBRyxVQUFDLEdBQVE7WUFDOUIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxlQUFlLEVBQUUsR0FBRyxDQUFDLENBQUM7WUFDbEMsS0FBSSxDQUFDLEtBQUssR0FBRyxHQUFHLENBQUM7UUFDbkIsQ0FBQyxFQUFBO1FBRUQsYUFBUTs7OztRQUFHLFVBQUMsR0FBUTtZQUNsQixPQUFPLENBQUMsR0FBRyxDQUFDLFVBQVUsRUFBRSxHQUFHLENBQUMsQ0FBQztRQUMvQixDQUFDLEVBQUE7UUFFRCxjQUFTOzs7UUFBRztZQUNWLE9BQU8sQ0FBQyxHQUFHLENBQUMsV0FBVyxDQUFDLENBQUM7UUFDM0IsQ0FBQyxFQUFBO1FBakJDLElBQUksSUFBSSxDQUFDLFNBQVMsSUFBSSxJQUFJLEVBQUU7WUFDMUIsSUFBSSxDQUFDLFNB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QSxBQXhGRCxJQXdGQztTQW5GWSx3QkFBd0I7Ozs7OztJQUNuQyxnREFBbUM7O0lBQ25DLGdEQUF3Qzs7SUFDeEMsZ0RBQTBDOztJQThCMUMsaURBR0M7O0lBRUQsNENBRUM7O0lBRUQsNkNBRUM7O0lBbEJXLDZDQUErQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQsIE9wdGlvbmFsLCBTZWxmLCBPbkRlc3Ryb3ksIE9uSW5pdCwgT3V0cHV0LCBFdmVudEVtaXR0ZXIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbnRyb2xWYWx1ZUFjY2Vzc29yLCBOZ0NvbnRyb2wsIEZvcm1Db250cm9sIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgY29lcmNlQm9vbGVhblByb3BlcnR5IH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2NvZXJjaW9uJztcbmltcG9ydCB7IFN1YmplY3QsIFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdybmctcmVhY3RpdmUtY29udHJvbCcsXG4gIHRlbXBsYXRlOiAnTk8gQkFTRSBURU1QTEFURScsXG4gIHN0eWxlVXJsczogW11cbn0pXG5leHBvcnQgY2xhc3MgUmVhY3RpdmVDb250cm9sQ29tcG9uZW50IGltcGxlbWVudHMgQ29udHJvbFZhbHVlQWNjZXNzb3IsIE9uSW5pdCwgT25EZXN0cm95IHtcbiAgcHJpdmF0ZSBzdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbjtcbiAgcHVibGljIHZhbHVlQ29udHJvbCA9IG5ldyBGb3JtQ29udHJvbCgpO1xuICBwdWJsaWMgc3RhdGVDaGFuZ2VzID0gbmV3IFN1YmplY3Q8dm9pZD4oKTsgLy8gdGhpcyB3aWxsIG1vc3RseSBiZSB1c2VkIHdpdGggY3VzdG9tIGNvbnRyb2xzIGZvciBtYXRlcmlhbCBpbnB1dHNcblxuICBASW5wdXQoKVxuICAgIGdldCBkaXNhYmxlZCgpOiBib29sZWFuIHsgcmV0dXJuIHRoaXMudmFsdWVDb250cm9sLmRpc2FibGVkOyB9XG4gICAgc2V0IGRpc2FibGVkKHZhbHVlOiBib29sZWFuKSB7XG4gICAgICBjb25zdCBkaXNhYmxlZDogYm9vbGVhbiA9IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eSh2YWx1ZSk7XG4gICAgICBpZiAoZGlzYWJsZWQpIHtcbiAgICAgICAgdGhpcy52YWx1ZUNvbnRyb2wuZGlzYWJsZSgpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy52YWx1ZUNvbnRyb2wuZW5hYmxlKCk7XG4gICAgICB9XG4gICAgICB0aGlzLnN0YXRlQ2hhbmdlcy5uZXh0KCk7XG4gICAgfVxuXG4gIEBJbnB1dCgpXG4gICAgZ2V0IHZhbHVlKCk6IGFueSB8IG51bGwge1xuICAgICAgcmV0dXJuIHRoaXMudmFsdWVDb250cm9sLnZhbHVlO1xuICAgIH1cbiAgICBzZXQgdmFsdWUodmFsOiBhbnkgfCBudWxsKSB7XG4gICAgICB0aGlzLm9uQ2hhbmdlKHZhbCk7XG4gICAgICB0aGlzLnN0YXRlQ2hhbmdlcy5uZXh0KCk7XG4gICAgfVxuXG4gIGNvbnN0cnVjdG9yKEBPcHRpb25hbCgpIEBTZWxmKCkgcHVibGljIG5nQ29udHJvbDogTmdDb250cm9sKSB7XG4gICAgaWYgKHRoaXMubmdDb250cm9sICE9IG51bGwpIHtcbiAgICAgIHRoaXMubmdDb250cm9sLnZhbHVlQWNjZXNzb3IgPSB0aGlzO1xuICAgICAgdGhpcy52YWx1ZUNvbnRyb2wgPSBuZXcgRm9ybUNvbnRyb2woKTtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgb25Mb2NhbENoYW5nZSA9ICh2YWw6IGFueSkgPT4ge1xuICAgIGNvbnNvbGUubG9nKCdvbkxvY2FsQ2hhbmdlJywgdmFsKTtcbiAgICB0aGlzLnZhbHVlID0gdmFsO1xuICB9XG5cbiAgb25DaGFuZ2UgPSAodmFsOiBhbnkpID0+IHtcbiAgICBjb25zb2xlLmxvZygnb25DaGFuZ2UnLCB2YWwpO1xuICB9XG5cbiAgb25Ub3VjaGVkID0gKCkgPT4ge1xuICAgIGNvbnNvbGUubG9nKCdvblRvdWNoZWQnKTtcbiAgfVxuXG4gIG5nT25Jbml0KCkge1xuICAgIGNvbnNvbGUubG9nKCduZ09uSW5pdCcpO1xuICAgIC8vIFRPRE86IGFkZCBjb21tb24gdmFsaWRhdG9ycyBvciBzb21lIG90aGVyIGxvZ2ljIHRvIHNpbXBsaWZ5IG9yIGRlc2VyaWFsaXNlIHZhbGlkYXRvcnMsIGV0Yy5cbiAgICBpZiAodGhpcy5uZ0NvbnRyb2wgJiYgdGhpcy52YWx1ZUNvbnRyb2wpIHtcbiAgICAgIGNvbnNvbGUubG9nKCduZ09uSW5pdDogc2V0dGluZyB1cCcpO1xuICAgICAgLy8gVE9ETzogY2hlY2sgZm9yIGV4aXN0aW5nIFwiZGVmYXVsdFwiIHZhbGlkYXRvcnNcbiAgICAgIHRoaXMudmFsdWVDb250cm9sLnNldFZhbGlkYXRvcnModGhpcy5uZ0NvbnRyb2wudmFsaWRhdG9yKTtcbiAgICAgIHRoaXMudmFsdWVDb250cm9sLnNldEFzeW5jVmFsaWRhdG9ycyh0aGlzLm5nQ29udHJvbC5hc3luY1ZhbGlkYXRvcik7XG4gICAgICB0aGlzLnZhbHVlQ29udHJvbC5zZXRWYWx1ZSh0aGlzLm5nQ29udHJvbC52YWx1ZSk7XG4gICAgICB0aGlzLnZhbHVlQ29udHJvbC51cGRhdGVWYWx1ZUFuZFZhbGlkaXR5KCk7XG4gICAgICB0aGlzLnN1YnNjcmlwdGlvbiA9XG4gICAgICAgIHRoaXMudmFsdWVDb250cm9sLnZhbHVlQ2hhbmdlcy5zdWJzY3JpYmUodGhpcy5vbkxvY2FsQ2hhbmdlKTtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgbmdPbkRlc3Ryb3koKSB7XG4gICAgdGhpcy5zdGF0ZUNoYW5nZXMuY29tcGxldGUoKTtcbiAgICBpZiAodGhpcy5zdWJzY3JpcHRpb24pIHtcbiAgICAgIHRoaXMuc3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIHdyaXRlVmFsdWUodmFsOiBzdHJpbmcgfCBudWxsKTogdm9pZCB7XG4gICAgdGhpcy52YWx1ZSA9IHZhbDsgLy8gaW5pdGlhbCB2YWx1ZSBvciBtb2RlbCB1cGRhdGVzIGZvciB0aGUgdmlld1xuICB9XG5cbiAgcHVibGljIHJlZ2lzdGVyT25DaGFuZ2UoZm46IGFueSk6IHZvaWQge1xuICAgIHRoaXMub25DaGFuZ2UgPSBmbjtcbiAgfVxuXG4gIHB1YmxpYyByZWdpc3Rlck9uVG91Y2hlZChmbjogYW55KTogdm9pZCB7XG4gICAgdGhpcy5vblRvdWNoZWQgPSBmbjtcbiAgfVxuXG4gIHB1YmxpYyBzZXREaXNhYmxlZFN0YXRlKGlzRGlzYWJsZWQ6IGJvb2xlYW4pOiB2b2lkIHtcbiAgICB0aGlzLmRpc2FibGVkID0gaXNEaXNhYmxlZDtcbiAgfVxufVxuIl19