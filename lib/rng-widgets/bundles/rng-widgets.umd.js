(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/common'), require('@angular/material/button'), require('@angular/material/menu'), require('@angular/material/divider'), require('@angular/material/toolbar'), require('@angular/material/form-field'), require('@angular/material/input'), require('@angular/forms'), require('rxjs')) :
    typeof define === 'function' && define.amd ? define('@rng/widgets', ['exports', '@angular/core', '@angular/common', '@angular/material/button', '@angular/material/menu', '@angular/material/divider', '@angular/material/toolbar', '@angular/material/form-field', '@angular/material/input', '@angular/forms', 'rxjs'], factory) :
    (global = global || self, factory((global.rng = global.rng || {}, global.rng.widgets = {}), global.ng.core, global.ng.common, global.ng.material.button, global.ng.material.menu, global.ng.material.divider, global.ng.material.toolbar, global.ng.material['form-field'], global.ng.material.input, global.ng.forms, global.rxjs));
}(this, function (exports, core, common, button, menu, divider, toolbar, formField, input, forms, rxjs) { 'use strict';

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
                            toolbar.MatToolbarModule,
                            formField.MatFormFieldModule,
                            input.MatInputModule,
                        ]
                    },] }
        ];
        return MaterialModule;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var ImageComponent = /** @class */ (function () {
        function ImageComponent() {
            this.size = 32;
            this.imgWidth = 0;
            this.imgHeight = 0;
            this.imgClass = 'square';
            this.localImageURL = null;
            this.localAltText = '';
        }
        Object.defineProperty(ImageComponent.prototype, "data", {
            get: /**
             * @return {?}
             */
            function () {
                return this.localData;
            },
            set: /**
             * @param {?} data
             * @return {?}
             */
            function (data) {
                // reset previous data
                this.localImageURL = null;
                this.localAltText = '';
                // init with new data
                this.localData = data;
                this.initImage();
            },
            enumerable: true,
            configurable: true
        });
        /**
         * @return {?}
         */
        ImageComponent.prototype.ngOnInit = /**
         * @return {?}
         */
        function () {
            this.initImage();
        };
        /**
         * @return {?}
         */
        ImageComponent.prototype.ngOnChanges = /**
         * @return {?}
         */
        function () {
            this.initImage();
        };
        /**
         * @return {?}
         */
        ImageComponent.prototype.initImage = /**
         * @return {?}
         */
        function () {
            var _this = this;
            if (this.data && this.data.imageUrl && this.data.imageUrl.length > 0) {
                this.localImageURL = this.data.imageUrl;
            }
            else if (this.imageUrl && this.imageUrl.length > 0) {
                this.localImageURL = this.imageUrl;
            }
            if (this.localImageURL) {
                /** @type {?} */
                var image = new Image();
                image.addEventListener('load', (/**
                 * @param {?} e
                 * @return {?}
                 */
                function (e) { return _this.handleImageLoad(e); }));
                image.src = this.localImageURL;
            }
            if (this.data && this.data.name && this.data.name.length > 0) {
                this.localAltText = this.data.name;
            }
            if (this.placeholder && this.placeholder.length > 0) {
                this.localAltText = this.placeholder;
            }
            this.generateInitial(this.localAltText);
        };
        /**
         * @param {?} event
         * @return {?}
         */
        ImageComponent.prototype.handleImageLoad = /**
         * @param {?} event
         * @return {?}
         */
        function (event) {
            this.imgWidth = event.target.width;
            this.imgHeight = event.target.height;
            if (this.imgWidth > this.imgHeight) {
                this.imgClass = 'landscape-img';
            }
            if (this.imgWidth < this.imgHeight) {
                this.imgClass = 'portrait-img';
            }
        };
        /**
         * @param {?} userName
         * @return {?}
         */
        ImageComponent.prototype.generateInitial = /**
         * @param {?} userName
         * @return {?}
         */
        function (userName) {
            if (userName) {
                /** @type {?} */
                var colors = [
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
        };
        /**
         * @param {?} name
         * @return {?}
         */
        ImageComponent.prototype.getInitial = /**
         * @param {?} name
         * @return {?}
         */
        function (name) {
            /** @type {?} */
            var matches = name.match(/\b(\w)/g);
            return matches.join('');
        };
        /**
         * @param {?} stringValue
         * @return {?}
         */
        ImageComponent.prototype.hashCode = /**
         * @param {?} stringValue
         * @return {?}
         */
        function (stringValue) {
            /** @type {?} */
            var hash = 0;
            if (stringValue.length === 0) {
                return hash;
            }
            for (var i = 0; i < stringValue.length; i++) {
                /** @type {?} */
                var chr = stringValue.charCodeAt(i);
                // tslint:disable-next-line: no-bitwise
                hash = ((hash << 5) - hash) + chr;
                // tslint:disable-next-line: no-bitwise
                hash |= 0; // Convert to 32bit integer
            }
            return hash;
        };
        ImageComponent.decorators = [
            { type: core.Component, args: [{
                        selector: 'rng-image',
                        template: "<div class=\"avatar s-{{size}}\">\n  <img *ngIf=\"localImageURL\"\n    ngClass=\"{{imgClass}}\"\n    src=\"{{localImageURL}}\"\n    alt=\"{{localAltText}}\" />\n  <span *ngIf=\"!localImageURL\"\n    class=\"bg {{initialColor}}\">{{initial}}</span>\n</div>\n"
                    }] }
        ];
        /** @nocollapse */
        ImageComponent.ctorParameters = function () { return []; };
        ImageComponent.propDecorators = {
            size: [{ type: core.Input }],
            data: [{ type: core.Input }],
            imageUrl: [{ type: core.Input }],
            placeholder: [{ type: core.Input }]
        };
        return ImageComponent;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /** @enum {number} */
    var DocType = {
        XLSX: 0, DOCX: 1, HTML: 2, XML: 3, ZIP: 4, PDF: 5, IMAGE: 6, VIDEO: 7,
    };
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
    /** @enum {number} */
    var PreviewSize = {
        SMALL: 32,
        WIDGET: 120,
    };
    PreviewSize[PreviewSize.SMALL] = 'SMALL';
    PreviewSize[PreviewSize.WIDGET] = 'WIDGET';

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
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
            { type: core.Component, args: [{
                        selector: 'rng-preview',
                        template: "<div class=\"rng-preview-container\" \n  [ngClass]=\"containerClass\"\n  [ngStyle]=\"containerImageStyle\">\n  <i *ngIf=\"iconClass\"\n    class=\"rng-icon\"\n    [ngClass]=\"iconClass\"></i>\n</div>\n  "
                    }] }
        ];
        PreviewComponent.propDecorators = {
            previewData: [{ type: core.Input }]
        };
        return PreviewComponent;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var IconedMenuComponent = /** @class */ (function () {
        function IconedMenuComponent() {
            this.changeItem = new core.EventEmitter();
            this.showName = true;
        }
        Object.defineProperty(IconedMenuComponent.prototype, "currentName", {
            get: /**
             * @return {?}
             */
            function () {
                /** @type {?} */
                var avatar = this.itemAvatar(this.currentItem);
                return avatar.name;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * @param {?} item
         * @return {?}
         */
        IconedMenuComponent.prototype.itemAvatar = /**
         * @param {?} item
         * @return {?}
         */
        function (item) {
            if (!item) {
                return this.placeholderItem || (/** @type {?} */ ({}));
            }
            if ('avatar' in item) {
                return ((/** @type {?} */ (item))).avatar;
            }
            return (/** @type {?} */ (item));
        };
        /**
         * @param {?} item
         * @return {?}
         */
        IconedMenuComponent.prototype.itemName = /**
         * @param {?} item
         * @return {?}
         */
        function (item) {
            return this.itemAvatar(item).name;
        };
        /**
         * @param {?} item
         * @return {?}
         */
        IconedMenuComponent.prototype.clickFunction = /**
         * @param {?} item
         * @return {?}
         */
        function (item) {
            this.currentItem = item;
            this.changeItem.emit(item);
        };
        IconedMenuComponent.decorators = [
            { type: core.Component, args: [{
                        selector: 'rng-iconed-menu',
                        template: "<div class=\"rng-iconed-menu\">\n  <button mat-flat-button\n    [matMenuTriggerFor]=\"menu\"\n    (click)=\"$event.stopPropagation()\">    \n    <div *ngIf=\"showName; else avatarOnly\"\n      class=\"current-item-wrapper\">\n      <rng-iconed-name\n        [data]=\"itemAvatar(currentItem)\"></rng-iconed-name>\n      <i class=\"rng-icon rng-icon-arrow_drop_down\"></i>\n    </div>\n    <ng-template #avatarOnly>\n      <rng-image \n        [data]=\"itemAvatar(currentItem)\"></rng-image>\n    </ng-template>\n  </button>\n  <mat-menu #menu=\"matMenu\"\n    class=\"rng-iconed-menu-list\">\n    <button mat-menu-item\n      class=\"rng-iconed-menu-item\"\n      *ngFor=\"let item of items\"\n      (click)=\"clickFunction(item)\">\n      <rng-iconed-name\n        [data]=\"itemAvatar(item)\"></rng-iconed-name>\n    </button>\n  </mat-menu>\n</div>"
                    }] }
        ];
        IconedMenuComponent.propDecorators = {
            changeItem: [{ type: core.Output }],
            items: [{ type: core.Input }],
            placeholderItem: [{ type: core.Input }],
            showName: [{ type: core.Input }],
            currentItem: [{ type: core.Input }]
        };
        return IconedMenuComponent;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var IconedNameComponent = /** @class */ (function () {
        function IconedNameComponent() {
        }
        Object.defineProperty(IconedNameComponent.prototype, "avatarName", {
            get: /**
             * @return {?}
             */
            function () {
                /** @type {?} */
                var avatar = this.avatar;
                return avatar.name;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(IconedNameComponent.prototype, "avatar", {
            get: /**
             * @return {?}
             */
            function () {
                if (!this.data) {
                    return (/** @type {?} */ ({}));
                }
                if ('avatar' in this.data) {
                    return ((/** @type {?} */ (this.data))).avatar;
                }
                return (/** @type {?} */ (this.data));
            },
            enumerable: true,
            configurable: true
        });
        IconedNameComponent.decorators = [
            { type: core.Component, args: [{
                        selector: 'rng-iconed-name',
                        template: "<div class=\"rng-iconed-name\">\n  <rng-image size=\"32\"\n    [data]=\"avatar\"></rng-image>\n  <div class=\"avatar-name\">          \n    {{ avatarName }}\n  </div>\n</div>\n"
                    }] }
        ];
        IconedNameComponent.propDecorators = {
            data: [{ type: core.Input }]
        };
        return IconedNameComponent;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var CompactToolbarComponent = /** @class */ (function () {
        function CompactToolbarComponent() {
            var _this = this;
            this.withSearch = false;
            this.searchChange = new core.EventEmitter();
            this.searchToggle = false;
            this.searchText = '';
            this.search = new forms.FormControl();
            this.subscription = new rxjs.Subscription();
            this.changeSearch = (/**
             * @param {?} text
             * @return {?}
             */
            function (text) { return _this.searchChange.emit(text); });
        }
        /**
         * @param {?} toggle
         * @return {?}
         */
        CompactToolbarComponent.prototype.toggleSearch = /**
         * @param {?} toggle
         * @return {?}
         */
        function (toggle) {
            var _this = this;
            this.searchToggle = toggle;
            if (toggle) {
                setTimeout((/**
                 * @return {?}
                 */
                function () { return _this.searchfield.nativeElement.focus(); }), 0);
            }
            else {
                this.search.setValue('');
            }
        };
        /**
         * @return {?}
         */
        CompactToolbarComponent.prototype.ngAfterViewInit = /**
         * @return {?}
         */
        function () {
            var _this = this;
            this.subscription.add(this.search.valueChanges.subscribe((/**
             * @param {?} val
             * @return {?}
             */
            function (val) { return _this.changeSearch(val); })));
        };
        /**
         * @return {?}
         */
        CompactToolbarComponent.prototype.ngOnDestroy = /**
         * @return {?}
         */
        function () {
            this.subscription.unsubscribe();
        };
        CompactToolbarComponent.decorators = [
            { type: core.Component, args: [{
                        selector: 'rng-compact-toolbar',
                        template: "<mat-toolbar>\n  <mat-toolbar-row *ngIf=\"!searchToggle\">\n    <span>{{title}}</span>\n    <span class=\"spacer\"></span>\n    <ng-content></ng-content>\n    <button mat-icon-button *ngIf=\"withSearch\"\n      (click)=\"toggleSearch(true)\">\n      <i class=\"rng-icon rng-icon-search\"></i>\n    </button>    \n  </mat-toolbar-row>\n  <mat-toolbar-row *ngIf=\"searchToggle\">\n    <div class=\"spacer\">\n      <mat-form-field appearance=\"none\"\n        class=\"full-width\">\n        <input matInput #searchfield\n          type=\"search\"\n          [formControl]=\"search\">\n      </mat-form-field>\n    </div>\n    <button mat-icon-button *ngIf=\"withSearch\"\n      class=\"button-toggle\"\n      (click)=\"toggleSearch(false)\">\n      <i class=\"rng-icon rng-icon-search\"></i>\n    </button>    \n  </mat-toolbar-row>\n</mat-toolbar>\n  \n"
                    }] }
        ];
        CompactToolbarComponent.propDecorators = {
            title: [{ type: core.Input }],
            withSearch: [{ type: core.Input }],
            searchChange: [{ type: core.Output }],
            searchfield: [{ type: core.ViewChild, args: ['searchfield', { static: false },] }]
        };
        return CompactToolbarComponent;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var NamedMenuComponent = /** @class */ (function () {
        function NamedMenuComponent() {
            var _this = this;
            this.itemClick = new core.EventEmitter();
            this.onItemClick = (/**
             * @param {?} item
             * @return {?}
             */
            function (item) {
                _this.currentItem = _this.showKey ? item[_this.showKey] : item;
                _this.itemClick.emit(item);
            });
        }
        NamedMenuComponent.decorators = [
            { type: core.Component, args: [{
                        selector: 'rng-named-menu',
                        template: "<div class=\"rng-named-menu\">\n  <button mat-flat-button\n    [matMenuTriggerFor]=\"menu\"\n    (click)=\"$event.stopPropagation()\">\n    <div class=\"current-item-wrapper\">\n      <span class=\"current-item-name\">{{currentItem}}</span>\n      <i class=\"rng-icon rng-icon-arrow_drop_down\"></i>\n    </div>\n  </button>\n  <mat-menu #menu=\"matMenu\"\n    class=\"rng-named-menu-list\">\n    <button mat-menu-item\n      class=\"rng-named-menu-item\"\n      *ngFor=\"let item of items\"\n      (click)=\"onItemClick(item)\">{{showKey ? item[showKey]: item}}\n    </button>\n  </mat-menu>\n</div>\n"
                    }] }
        ];
        NamedMenuComponent.propDecorators = {
            items: [{ type: core.Input }],
            currentItem: [{ type: core.Input }],
            showKey: [{ type: core.Input }],
            itemClick: [{ type: core.Output }]
        };
        return NamedMenuComponent;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var RngWidgetsModule = /** @class */ (function () {
        function RngWidgetsModule() {
        }
        RngWidgetsModule.decorators = [
            { type: core.NgModule, args: [{
                        declarations: [
                            ImageComponent,
                            PreviewComponent,
                            IconedMenuComponent,
                            IconedNameComponent,
                            CompactToolbarComponent,
                            NamedMenuComponent,
                        ],
                        imports: [
                            common.CommonModule,
                            MaterialModule,
                            forms.FormsModule,
                            forms.ReactiveFormsModule,
                        ],
                        exports: [
                            ImageComponent,
                            PreviewComponent,
                            IconedMenuComponent,
                            IconedNameComponent,
                            CompactToolbarComponent,
                            NamedMenuComponent,
                        ]
                    },] }
        ];
        return RngWidgetsModule;
    }());

    exports.CompactToolbarComponent = CompactToolbarComponent;
    exports.DocType = DocType;
    exports.IconedMenuComponent = IconedMenuComponent;
    exports.IconedNameComponent = IconedNameComponent;
    exports.ImageComponent = ImageComponent;
    exports.NamedMenuComponent = NamedMenuComponent;
    exports.PreviewComponent = PreviewComponent;
    exports.PreviewSize = PreviewSize;
    exports.PreviewType = PreviewType;
    exports.RngWidgetsModule = RngWidgetsModule;
    exports.ɵa = MaterialModule;

    Object.defineProperty(exports, '__esModule', { value: true });

}));
//# sourceMappingURL=rng-widgets.umd.js.map
