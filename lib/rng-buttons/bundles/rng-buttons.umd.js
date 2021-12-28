(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/common'), require('@angular/material/button'), require('@angular/material/menu'), require('@angular/material/divider'), require('@angular/router')) :
    typeof define === 'function' && define.amd ? define('@rng/buttons', ['exports', '@angular/core', '@angular/common', '@angular/material/button', '@angular/material/menu', '@angular/material/divider', '@angular/router'], factory) :
    (global = global || self, factory((global.rng = global.rng || {}, global.rng.buttons = {}), global.ng.core, global.ng.common, global.ng.material.button, global.ng.material.menu, global.ng.material.divider, global.ng.router));
}(this, function (exports, core, common, button, menu, divider, router) { 'use strict';

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var MaterialModule = /** @class */ (function () {
        function MaterialModule() {
        }
        MaterialModule.decorators = [
            { type: core.NgModule, args: [{
                        exports: [
                            button.MatButtonModule,
                            menu.MatMenuModule,
                            divider.MatDividerModule,
                        ]
                    },] }
        ];
        return MaterialModule;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var BackButtonComponent = /** @class */ (function () {
        function BackButtonComponent(router, activeRoute) {
            this.router = router;
            this.activeRoute = activeRoute;
            this.light = false;
            this.historyMode = false;
            this.backByUrl = null;
        }
        Object.defineProperty(BackButtonComponent.prototype, "backRelative", {
            get: /**
             * @return {?}
             */
            function () {
                switch (this.backSteps) {
                    case 1: return this.activeRoute;
                    case 2: return this.activeRoute.parent;
                    case 3: return this.activeRoute.parent.parent;
                    // we could implement some recursion here but also it could require to navigate to "root" (0 for example)
                    default: return this.activeRoute.root.firstChild; // root's firstchild -1 should give us the root itself
                }
            },
            enumerable: true,
            configurable: true
        });
        /**
         * @return {?}
         */
        BackButtonComponent.prototype.goBack = /**
         * @return {?}
         */
        function () {
            if (this.historyMode) {
                history.go(-this.backSteps);
            }
            else if (this.backByUrl) {
                this.router.navigateByUrl(this.backByUrl);
            }
            else {
                this.router.navigate(['../'], { relativeTo: this.backRelative });
            }
        };
        BackButtonComponent.decorators = [
            { type: core.Component, args: [{
                        selector: 'rng-back-button',
                        template: "<button mat-icon-button\n  [ngClass]=\"{'mat-white': light}\"\n  (click)=\"goBack()\"><i class=\"rng-icon rng-icon-arrow_back\"></i></button>"
                    }] }
        ];
        /** @nocollapse */
        BackButtonComponent.ctorParameters = function () { return [
            { type: router.Router },
            { type: router.ActivatedRoute }
        ]; };
        BackButtonComponent.propDecorators = {
            light: [{ type: core.Input }],
            backSteps: [{ type: core.Input }],
            historyMode: [{ type: core.Input }],
            backByUrl: [{ type: core.Input }]
        };
        return BackButtonComponent;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var IconLabelButtonComponent = /** @class */ (function () {
        function IconLabelButtonComponent() {
            this.buttonClick = new core.EventEmitter();
        }
        IconLabelButtonComponent.decorators = [
            { type: core.Component, args: [{
                        selector: 'rng-icon-label-button',
                        template: "<button mat-icon-button \n  [disabled]=\"disabled\"\n  (click)=\"buttonClick.emit($event)\">\n  <i [class]=\"iconClass\"></i>\n</button>\n<span>{{label}}</span>\n"
                    }] }
        ];
        IconLabelButtonComponent.propDecorators = {
            iconClass: [{ type: core.Input }],
            label: [{ type: core.Input }],
            disabled: [{ type: core.Input }],
            buttonClick: [{ type: core.Output }]
        };
        return IconLabelButtonComponent;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var MenuButtonComponent = /** @class */ (function () {
        function MenuButtonComponent() {
            this.items = ['Option 1', 'Option 2'];
            this.light = false;
            this.itemClick = new core.EventEmitter();
        }
        MenuButtonComponent.decorators = [
            { type: core.Component, args: [{
                        selector: 'rng-menu-button',
                        template: "<div class=\"rng-menu-button\">\n  <button mat-icon-button\n    [matMenuTriggerFor]=\"menu\"\n    color=\"{{light?'white':''}}\"\n    (click)=\"$event.stopPropagation()\">\n    <i class=\"rng-icon rng-icon-more_vert\"></i>\n  </button>\n  <mat-menu #menu=\"matMenu\"\n    class=\"rng-menu-button-list\"\n    yPosition=\"below\"\n    xPosition=\"before\">\n    <div *ngFor=\"let item of items\">\n      <button *ngIf=\"item!='divider'\"\n        mat-menu-item\n        (click)=\"itemClick.emit(item)\">\n        <span>{{ item }}</span>\n      </button>\n      <mat-divider *ngIf=\"item==='divider'\"></mat-divider>\n    </div>\n  </mat-menu>\n</div>\n"
                    }] }
        ];
        MenuButtonComponent.propDecorators = {
            items: [{ type: core.Input }],
            light: [{ type: core.Input }],
            itemClick: [{ type: core.Output }]
        };
        return MenuButtonComponent;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var OptionsButtonComponent = /** @class */ (function () {
        function OptionsButtonComponent() {
            var _this = this;
            this.primaryClick = new core.EventEmitter();
            this.itemClick = new core.EventEmitter();
            this.color = 'accent';
            this.onPrimaryClick = (/**
             * @return {?}
             */
            function () { return _this.primaryClick.emit(); });
            this.onItemClick = (/**
             * @param {?} item
             * @return {?}
             */
            function (item) { return _this.itemClick.emit(item); });
        }
        /**
         * @param {?} event
         * @return {?}
         */
        OptionsButtonComponent.prototype.toggleChange = /**
         * @param {?} event
         * @return {?}
         */
        function (event) {
            /** @type {?} */
            var toggle = event.source;
            if (toggle) {
                /** @type {?} */
                var group = toggle.buttonToggleGroup;
                if (event.value.some((/**
                 * @param {?} item
                 * @return {?}
                 */
                function (item) { return item === toggle.value; }))) {
                    group.value = [toggle.value];
                }
            }
        };
        OptionsButtonComponent.decorators = [
            { type: core.Component, args: [{
                        selector: 'rng-options-button',
                        template: "<button mat-raised-button\n  class=\"wrapper-button\"\n  [ngClass]=\"{'selected':t.menuOpen}\"\n  [color]=\"color\"\n  [disableRipple]=\"true\"\n  [matMenuTriggerFor]=\"menu\"\n  #t=\"matMenuTrigger\">\n  <div class=\"wrapper-content\">\n    <button mat-flat-button \n      tabindex=\"-1\"\n      [color]=\"color\"\n      class=\"primary-button\"\n      (click)=\"onPrimaryClick();$event.stopPropagation()\">\n      <span>{{primaryTitle}}</span>  \n    </button>\n    <i class=\"rng-icon rng-icon-arrow_drop_down\" *ngIf=\"!t.menuOpen\"></i>\n    <i class=\"rng-icon rng-icon-arrow_drop_up\" *ngIf=\"t.menuOpen\"></i>\n  </div>\n</button>\n<mat-menu #menu=\"matMenu\"\n  class=\"rng-iconed-menu-list\">\n  <button mat-menu-item\n    class=\"button-menu-item\"\n    *ngFor=\"let item of items\"\n    (click)=\"onItemClick(item)\">\n    <div class=\"button-menu-item-wrapper\">\n      <i [ngClass]=\"item.iconCSS\"></i>\n      <span>{{ item.name }}</span>\n    </div>\n  </button>\n</mat-menu>"
                    }] }
        ];
        OptionsButtonComponent.propDecorators = {
            primaryClick: [{ type: core.Output }],
            itemClick: [{ type: core.Output }],
            primaryTitle: [{ type: core.Input }],
            items: [{ type: core.Input }],
            color: [{ type: core.Input }]
        };
        return OptionsButtonComponent;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var RngButtonsModule = /** @class */ (function () {
        function RngButtonsModule() {
        }
        RngButtonsModule.decorators = [
            { type: core.NgModule, args: [{
                        declarations: [
                            BackButtonComponent,
                            IconLabelButtonComponent,
                            MenuButtonComponent,
                            OptionsButtonComponent,
                        ],
                        imports: [
                            common.CommonModule,
                            MaterialModule,
                        ],
                        exports: [
                            BackButtonComponent,
                            IconLabelButtonComponent,
                            MenuButtonComponent,
                            OptionsButtonComponent,
                        ]
                    },] }
        ];
        return RngButtonsModule;
    }());

    exports.BackButtonComponent = BackButtonComponent;
    exports.IconLabelButtonComponent = IconLabelButtonComponent;
    exports.MenuButtonComponent = MenuButtonComponent;
    exports.OptionsButtonComponent = OptionsButtonComponent;
    exports.RngButtonsModule = RngButtonsModule;
    exports.ɵa = MaterialModule;

    Object.defineProperty(exports, '__esModule', { value: true });

}));
//# sourceMappingURL=rng-buttons.umd.js.map
