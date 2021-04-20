import { NgModule, Component, Input, EventEmitter, Output, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatDividerModule } from '@angular/material/divider';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';

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
                    MatToolbarModule,
                    MatFormFieldModule,
                    MatInputModule,
                ]
            },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class ImageComponent {
    constructor() {
        this.size = 32;
        this.imgWidth = 0;
        this.imgHeight = 0;
        this.imgClass = 'square';
        this.localImageURL = null;
        this.localAltText = '';
    }
    /**
     * @param {?} data
     * @return {?}
     */
    set data(data) {
        // reset previous data
        this.localImageURL = null;
        this.localAltText = '';
        // init with new data
        this.localData = data;
        this.initImage();
    }
    /**
     * @return {?}
     */
    get data() {
        return this.localData;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.initImage();
    }
    /**
     * @return {?}
     */
    ngOnChanges() {
        this.initImage();
    }
    /**
     * @return {?}
     */
    initImage() {
        if (this.data && this.data.imageUrl && this.data.imageUrl.length > 0) {
            this.localImageURL = this.data.imageUrl;
        }
        else if (this.imageUrl && this.imageUrl.length > 0) {
            this.localImageURL = this.imageUrl;
        }
        if (this.localImageURL) {
            /** @type {?} */
            const image = new Image();
            image.addEventListener('load', (/**
             * @param {?} e
             * @return {?}
             */
            e => this.handleImageLoad(e)));
            image.src = this.localImageURL;
        }
        if (this.data && this.data.name && this.data.name.length > 0) {
            this.localAltText = this.data.name;
        }
        if (this.placeholder && this.placeholder.length > 0) {
            this.localAltText = this.placeholder;
        }
        this.generateInitial(this.localAltText);
    }
    /**
     * @param {?} event
     * @return {?}
     */
    handleImageLoad(event) {
        this.imgWidth = event.target.width;
        this.imgHeight = event.target.height;
        if (this.imgWidth > this.imgHeight) {
            this.imgClass = 'landscape-img';
        }
        if (this.imgWidth < this.imgHeight) {
            this.imgClass = 'portrait-img';
        }
    }
    /**
     * @param {?} userName
     * @return {?}
     */
    generateInitial(userName) {
        if (userName) {
            /** @type {?} */
            const colors = [
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
    }
    /**
     * @param {?} name
     * @return {?}
     */
    getInitial(name) {
        /** @type {?} */
        const matches = name.match(/\b(\w)/g);
        return matches.join('');
    }
    /**
     * @param {?} stringValue
     * @return {?}
     */
    hashCode(stringValue) {
        /** @type {?} */
        let hash = 0;
        if (stringValue.length === 0) {
            return hash;
        }
        for (let i = 0; i < stringValue.length; i++) {
            /** @type {?} */
            const chr = stringValue.charCodeAt(i);
            // tslint:disable-next-line: no-bitwise
            hash = ((hash << 5) - hash) + chr;
            // tslint:disable-next-line: no-bitwise
            hash |= 0; // Convert to 32bit integer
        }
        return hash;
    }
}
ImageComponent.decorators = [
    { type: Component, args: [{
                selector: 'rng-image',
                template: "<div class=\"avatar s-{{size}}\">\n  <img *ngIf=\"localImageURL\"\n    ngClass=\"{{imgClass}}\"\n    src=\"{{localImageURL}}\"\n    alt=\"{{localAltText}}\" />\n  <span *ngIf=\"!localImageURL\"\n    class=\"bg {{initialColor}}\">{{initial}}</span>\n</div>\n"
            }] }
];
/** @nocollapse */
ImageComponent.ctorParameters = () => [];
ImageComponent.propDecorators = {
    size: [{ type: Input }],
    data: [{ type: Input }],
    imageUrl: [{ type: Input }],
    placeholder: [{ type: Input }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @enum {number} */
const DocType = {
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
const PreviewType = {
    SMALL: 'small',
    WIDGET: 'widget',
    ROUND: 'round',
    PORTRAIT: 'portrait',
    LANDSCAPE: 'landscape',
};
/** @enum {number} */
const PreviewSize = {
    SMALL: 32,
    WIDGET: 120,
};
PreviewSize[PreviewSize.SMALL] = 'SMALL';
PreviewSize[PreviewSize.WIDGET] = 'WIDGET';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class PreviewComponent {
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
        console.log('handleImageLoad', img);
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class IconedMenuComponent {
    constructor() {
        this.changeItem = new EventEmitter();
        this.showName = true;
    }
    /**
     * @return {?}
     */
    get currentName() {
        /** @type {?} */
        const avatar = this.itemAvatar(this.currentItem);
        return avatar.name;
    }
    /**
     * @param {?} item
     * @return {?}
     */
    itemAvatar(item) {
        if (!item) {
            return this.placeholderItem || (/** @type {?} */ ({}));
        }
        if ('avatar' in item) {
            return ((/** @type {?} */ (item))).avatar;
        }
        return (/** @type {?} */ (item));
    }
    /**
     * @param {?} item
     * @return {?}
     */
    itemName(item) {
        return this.itemAvatar(item).name;
    }
    /**
     * @param {?} item
     * @return {?}
     */
    clickFunction(item) {
        this.currentItem = item;
        this.changeItem.emit(item);
    }
}
IconedMenuComponent.decorators = [
    { type: Component, args: [{
                selector: 'rng-iconed-menu',
                template: "<div class=\"rng-iconed-menu\">\n  <button mat-flat-button\n    [matMenuTriggerFor]=\"menu\"\n    (click)=\"$event.stopPropagation()\">    \n    <div *ngIf=\"showName; else avatarOnly\"\n      class=\"current-item-wrapper\">\n      <rng-iconed-name\n        [data]=\"itemAvatar(currentItem)\"></rng-iconed-name>\n      <i class=\"rng-icon rng-icon-arrow_drop_down\"></i>\n    </div>\n    <ng-template #avatarOnly>\n      <rng-image \n        [data]=\"itemAvatar(currentItem)\"></rng-image>\n    </ng-template>\n  </button>\n  <mat-menu #menu=\"matMenu\"\n    class=\"rng-iconed-menu-list\">\n    <button mat-menu-item\n      class=\"rng-iconed-menu-item\"\n      *ngFor=\"let item of items\"\n      (click)=\"clickFunction(item)\">\n      <rng-iconed-name\n        [data]=\"itemAvatar(item)\"></rng-iconed-name>\n    </button>\n  </mat-menu>\n</div>"
            }] }
];
IconedMenuComponent.propDecorators = {
    changeItem: [{ type: Output }],
    items: [{ type: Input }],
    placeholderItem: [{ type: Input }],
    showName: [{ type: Input }],
    currentItem: [{ type: Input }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class IconedNameComponent {
    /**
     * @return {?}
     */
    get avatarName() {
        /** @type {?} */
        const avatar = this.avatar;
        return avatar.name;
    }
    /**
     * @return {?}
     */
    get avatar() {
        if (!this.data) {
            return (/** @type {?} */ ({}));
        }
        if ('avatar' in this.data) {
            return ((/** @type {?} */ (this.data))).avatar;
        }
        return (/** @type {?} */ (this.data));
    }
}
IconedNameComponent.decorators = [
    { type: Component, args: [{
                selector: 'rng-iconed-name',
                template: "<div class=\"rng-iconed-name\">\n  <rng-image size=\"32\"\n    [data]=\"avatar\"></rng-image>\n  <div class=\"avatar-name\">          \n    {{ avatarName }}\n  </div>\n</div>\n"
            }] }
];
IconedNameComponent.propDecorators = {
    data: [{ type: Input }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class CompactToolbarComponent {
    constructor() {
        this.withSearch = false;
        this.searchChange = new EventEmitter();
        this.searchToggle = false;
        this.searchText = '';
        this.search = new FormControl();
        this.subscription = new Subscription();
        this.changeSearch = (/**
         * @param {?} text
         * @return {?}
         */
        (text) => this.searchChange.emit(text));
    }
    /**
     * @param {?} toggle
     * @return {?}
     */
    toggleSearch(toggle) {
        this.searchToggle = toggle;
        if (toggle) {
            setTimeout((/**
             * @return {?}
             */
            () => this.searchfield.nativeElement.focus()), 0);
        }
        else {
            this.search.setValue('');
        }
    }
    /**
     * @return {?}
     */
    ngAfterViewInit() {
        this.subscription.add(this.search.valueChanges.subscribe((/**
         * @param {?} val
         * @return {?}
         */
        val => this.changeSearch(val))));
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}
CompactToolbarComponent.decorators = [
    { type: Component, args: [{
                selector: 'rng-compact-toolbar',
                template: "<mat-toolbar>\n  <mat-toolbar-row *ngIf=\"!searchToggle\">\n    <span>{{title}}</span>\n    <span class=\"spacer\"></span>\n    <ng-content></ng-content>\n    <button mat-icon-button *ngIf=\"withSearch\"\n      (click)=\"toggleSearch(true)\">\n      <i class=\"rng-icon rng-icon-search\"></i>\n    </button>    \n  </mat-toolbar-row>\n  <mat-toolbar-row *ngIf=\"searchToggle\">\n    <div class=\"spacer\">\n      <mat-form-field appearance=\"none\"\n        class=\"full-width\">\n        <input matInput #searchfield\n          type=\"search\"\n          [formControl]=\"search\">\n      </mat-form-field>\n    </div>\n    <button mat-icon-button *ngIf=\"withSearch\"\n      class=\"button-toggle\"\n      (click)=\"toggleSearch(false)\">\n      <i class=\"rng-icon rng-icon-search\"></i>\n    </button>    \n  </mat-toolbar-row>\n</mat-toolbar>\n  \n"
            }] }
];
CompactToolbarComponent.propDecorators = {
    title: [{ type: Input }],
    withSearch: [{ type: Input }],
    searchChange: [{ type: Output }],
    searchfield: [{ type: ViewChild, args: ['searchfield', { static: false },] }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class NamedMenuComponent {
    constructor() {
        this.itemClick = new EventEmitter();
        this.onItemClick = (/**
         * @param {?} item
         * @return {?}
         */
        (item) => {
            this.currentItem = this.showKey ? item[this.showKey] : item;
            this.itemClick.emit(item);
        });
    }
}
NamedMenuComponent.decorators = [
    { type: Component, args: [{
                selector: 'rng-named-menu',
                template: "<div class=\"rng-named-menu\">\n  <button mat-flat-button\n    [matMenuTriggerFor]=\"menu\"\n    (click)=\"$event.stopPropagation()\">\n    <div class=\"current-item-wrapper\">\n      <span class=\"current-item-name\">{{currentItem}}</span>\n      <i class=\"rng-icon rng-icon-arrow_drop_down\"></i>\n    </div>\n  </button>\n  <mat-menu #menu=\"matMenu\"\n    class=\"rng-named-menu-list\">\n    <button mat-menu-item\n      class=\"rng-named-menu-item\"\n      *ngFor=\"let item of items\"\n      (click)=\"onItemClick(item)\">{{showKey ? item[showKey]: item}}\n    </button>\n  </mat-menu>\n</div>\n"
            }] }
];
NamedMenuComponent.propDecorators = {
    items: [{ type: Input }],
    currentItem: [{ type: Input }],
    showKey: [{ type: Input }],
    itemClick: [{ type: Output }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class RngWidgetsModule {
}
RngWidgetsModule.decorators = [
    { type: NgModule, args: [{
                declarations: [
                    ImageComponent,
                    PreviewComponent,
                    IconedMenuComponent,
                    IconedNameComponent,
                    CompactToolbarComponent,
                    NamedMenuComponent,
                ],
                imports: [
                    CommonModule,
                    MaterialModule,
                    FormsModule,
                    ReactiveFormsModule,
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

export { CompactToolbarComponent, DocType, IconedMenuComponent, IconedNameComponent, ImageComponent, NamedMenuComponent, PreviewComponent, PreviewSize, PreviewType, RngWidgetsModule, MaterialModule as ɵa };
//# sourceMappingURL=rng-widgets.js.map
