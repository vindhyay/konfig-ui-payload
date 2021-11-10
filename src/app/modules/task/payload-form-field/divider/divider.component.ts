import { Component, Input, OnInit } from '@angular/core';
import { BaseWidget, DividerMetaData } from '../../model/create-form.models';

@Component({
    selector: 'app-divider',
    templateUrl: './divider.component.html',
    styleUrls: ['./divider.component.scss']
})

export class DividerComponent implements OnInit {
    constructor() { }

    @Input() item: BaseWidget = {} as BaseWidget;

    get metaData(): DividerMetaData {
        return this.item.metaData as DividerMetaData;
    }

    ngOnInit() { }
}