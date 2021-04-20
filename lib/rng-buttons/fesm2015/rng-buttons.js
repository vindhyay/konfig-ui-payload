import { NgModule, Component, Input, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatDividerModule } from '@angular/material/divider';
import { Router, ActivatedRoute } from '@angular/router';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class MaterialModule {
}
MaterialModule.decorators = [
    { type: NgModule, args: [{
                exports: [
                    MatButtonModule,
                    MatMenuModule,
                    MatDividerModule,
                ]
            },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class BackButtonComponent {
    /**
     * @param {?} router
     * @param {?} activeRoute
     */
    constructor(router, activeRoute) {
        this.router = router;
        this.activeRoute = activeRoute;
        this.light = false;
        this.historyMode = false;
        this.backByUrl = null;
    }
    /**
     * @return {?}
     */
    get backRelative() {
        switch (this.backSteps) {
            case 1: return this.activeRoute;
            case 2: return this.activeRoute.parent;
            case 3: return this.activeRoute.parent.parent;
            // we could implement some recursion here but also it could require to navigate to "root" (0 for example)
            default: return this.activeRoute.root.firstChild; // root's firstchild -1 should give us the root itself
        }
    }
    /**
     * @return {?}
     */
    goBack() {
        if (this.historyMode) {
            history.go(-this.backSteps);
        }
        else if (this.backByUrl) {
            this.router.navigateByUrl(this.backByUrl);
        }
        else {
            this.router.navigate(['../'], { relativeTo: this.backRelative });
        }
    }
}
BackButtonComponent.decorators = [
    { type: Component, args: [{
                selector: 'rng-back-button',
                template: "<button mat-icon-button\n  [ngClass]=\"{'mat-white': light}\"\n  (click)=\"goBack()\"><i class=\"rng-icon rng-icon-arrow_back\"></i></button>"
            }] }
];
/** @nocollapse */
BackButtonComponent.ctorParameters = () => [
    { type: Router },
    { type: ActivatedRoute }
];
BackButtonComponent.propDecorators = {
    light: [{ type: Input }],
    backSteps: [{ type: Input }],
    historyMode: [{ type: Input }],
    backByUrl: [{ type: Input }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class IconLabelButtonComponent {
    constructor() {
        this.buttonClick = new EventEmitter();
    }
}
IconLabelButtonComponent.decorators = [
    { type: Component, args: [{
                selector: 'rng-icon-label-button',
                template: "<button mat-icon-button \n  [disabled]=\"disabled\"\n  (click)=\"buttonClick.emit($event)\">\n  <i [class]=\"iconClass\"></i>\n</button>\n<span>{{label}}</span>\n"
            }] }
];
IconLabelButtonComponent.propDecorators = {
    iconClass: [{ type: Input }],
    label: [{ type: Input }],
    disabled: [{ type: Input }],
    buttonClick: [{ type: Output }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class MenuButtonComponent {
    constructor() {
        this.items = ['Option 1', 'Option 2'];
        this.light = false;
        this.itemClick = new EventEmitter();
    }
}
MenuButtonComponent.decorators = [
    { type: Component, args: [{
                selector: 'rng-menu-button',
                template: "<div class=\"rng-menu-button\">\n  <button mat-icon-button\n    [matMenuTriggerFor]=\"menu\"\n    color=\"{{light?'white':''}}\"\n    (click)=\"$event.stopPropagation()\">\n    <i class=\"rng-icon rng-icon-more_vert\"></i>\n  </button>\n  <mat-menu #menu=\"matMenu\"\n    class=\"rng-menu-button-list\"\n    yPosition=\"below\"\n    xPosition=\"before\">\n    <div *ngFor=\"let item of items\">\n      <button *ngIf=\"item!='divider'\"\n        mat-menu-item\n        (click)=\"itemClick.emit(item)\">\n        <span>{{ item }}</span>\n      </button>\n      <mat-divider *ngIf=\"item==='divider'\"></mat-divider>\n    </div>\n  </mat-menu>\n</div>\n"
            }] }
];
MenuButtonComponent.propDecorators = {
    items: [{ type: Input }],
    light: [{ type: Input }],
    itemClick: [{ type: Output }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class OptionsButtonComponent {
    constructor() {
        this.primaryClick = new EventEmitter();
        this.itemClick = new EventEmitter();
        this.color = 'accent';
        this.onPrimaryClick = (/**
         * @return {?}
         */
        () => this.primaryClick.emit());
        this.onItemClick = (/**
         * @param {?} item
         * @return {?}
         */
        (item) => this.itemClick.emit(item));
    }
    /**
     * @param {?} event
     * @return {?}
     */
    toggleChange(event) {
        /** @type {?} */
        const toggle = event.source;
        if (toggle) {
            /** @type {?} */
            const group = toggle.buttonToggleGroup;
            if (event.value.some((/**
             * @param {?} item
             * @return {?}
             */
            item => item === toggle.value))) {
                group.value = [toggle.value];
            }
        }
    }
}
OptionsButtonComponent.decorators = [
    { type: Component, args: [{
                selector: 'rng-options-button',
                template: "<button mat-raised-button\n  class=\"wrapper-button\"\n  [ngClass]=\"{'selected':t.menuOpen}\"\n  [color]=\"color\"\n  [disableRipple]=\"true\"\n  [matMenuTriggerFor]=\"menu\"\n  #t=\"matMenuTrigger\">\n  <div class=\"wrapper-content\">\n    <button mat-flat-button \n      tabindex=\"-1\"\n      [color]=\"color\"\n      class=\"primary-button\"\n      (click)=\"onPrimaryClick();$event.stopPropagation()\">\n      <span>{{primaryTitle}}</span>  \n    </button>\n    <i class=\"rng-icon rng-icon-arrow_drop_down\" *ngIf=\"!t.menuOpen\"></i>\n    <i class=\"rng-icon rng-icon-arrow_drop_up\" *ngIf=\"t.menuOpen\"></i>\n  </div>\n</button>\n<mat-menu #menu=\"matMenu\"\n  class=\"rng-iconed-menu-list\">\n  <button mat-menu-item\n    class=\"button-menu-item\"\n    *ngFor=\"let item of items\"\n    (click)=\"onItemClick(item)\">\n    <div class=\"button-menu-item-wrapper\">\n      <i [ngClass]=\"item.iconCSS\"></i>\n      <span>{{ item.name }}</span>\n    </div>\n  </button>\n</mat-menu>"
            }] }
];
OptionsButtonComponent.propDecorators = {
    primaryClick: [{ type: Output }],
    itemClick: [{ type: Output }],
    primaryTitle: [{ type: Input }],
    items: [{ type: Input }],
    color: [{ type: Input }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class RngButtonsModule {
}
RngButtonsModule.decorators = [
    { type: NgModule, args: [{
                declarations: [
                    BackButtonComponent,
                    IconLabelButtonComponent,
                    MenuButtonComponent,
                    OptionsButtonComponent,
                ],
                imports: [
                    CommonModule,
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

export { BackButtonComponent, IconLabelButtonComponent, MenuButtonComponent, OptionsButtonComponent, RngButtonsModule, MaterialModule as ɵa };
//# sourceMappingURL=rng-buttons.js.map
