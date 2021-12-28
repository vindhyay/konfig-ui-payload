import { Component, OnInit, Input } from '@angular/core';
import { BageTypeLabel } from '../../model/common-types';

@Component({
  selector: 'rng-type-label',
  templateUrl: './type-label.component.html',
  styleUrls: []
})
export class TypeLabelComponent implements OnInit {
  typeClass: string[];
  typeData: BageTypeLabel;

  @Input()
  set data(data: BageTypeLabel) {
    this.typeData = data;
    this.typeClass = ['rng-type-label', this.data.color, 'badge'];
  }
  get data() {
    return this.typeData;
  }

  constructor() {}

  ngOnInit() {}
}
