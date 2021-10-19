import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {BaseWidget, PhonenumberInputMetaData} from '../../model/create-form.models';

@Component({
  selector: 'app-phonenumber-field',
  templateUrl: './phonenumber-field.component.html',
  styleUrls: ['./phonenumber-field.component.scss']
})
export class PhonenumberFieldComponent implements OnInit {

  @Input() item: BaseWidget = {} as BaseWidget;
  @Input() isDisabled = false;
  @Output() onValueChange = new EventEmitter();
  @Output() onBlurChange = new EventEmitter();

  constructor() {}
  get metaData(): PhonenumberInputMetaData {
    return this.item.metaData as PhonenumberInputMetaData;
  }
  ngOnInit(): void {

  }
  
  validateField($event: any){
    this.onValueChange.emit($event);
  }
  optionChange($event: any){
    this.onBlurChange.emit($event);
  }
}
