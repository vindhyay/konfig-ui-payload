import { Component, Input, OnInit } from '@angular/core';
import { BaseWidget, DividerMetaData } from '../../model/create-form.models';

@Component({
    selector: 'app-spacer',
    templateUrl: './spacer.component.html',
    styleUrls: ['./spacer.component.scss']
})

export class SpacerComponent implements OnInit {
    constructor() { }

    @Input() item: BaseWidget = {} as BaseWidget;

    get metaData(): DividerMetaData {
        return this.item.metaData as DividerMetaData;
    }

    ngOnInit() {
    }
}