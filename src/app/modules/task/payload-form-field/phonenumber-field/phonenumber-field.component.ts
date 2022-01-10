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
  @Input() textColor: string;
  @Input() textHorizontalAlign: string;
  @Input() backgroundColor: string;
  @Input() borderColor: string;
  @Input() textFontStyle: string;
  @Input() borderStyle: string;
  @Input() borderRadius: string;
  @Input() fontSize: string;
  @Input() wordSpacing: string;
  @Input() letterSpacing: string;
  @Input() lineSpacing: string;
  @Input() fontWeight: string;
  @Input() fontStyle: string;
  @Input() textDecoration: string;
  @Input() labelColor: string;
  @Input() labelFontStyle: string;
  @Input() labelAlignment: string;
  @Input() adornmentBackgroundColor: string;
  @Input() borderWidth: string;
  @Input() labelFontSize: string;
  @Input() labelWidth: string;
  @Input() borderTopStyle: string;
  @Input() borderTopLeftRadius: string;
  @Input() borderTopColor: string;
  @Input() borderTopWidth: string;
  @Input() borderRightStyle: string;
  @Input() borderTopRightRadius: string;
  @Input() borderRightColor: string;
  @Input() borderRightWidth: string;
  @Input() borderBottomStyle: string;
  @Input() borderBottomRightRadius: string;
  @Input() borderBottomColor: string;
  @Input() borderBottomWidth: string;
  @Input() borderLeftStyle: string;
  @Input() borderBottomLeftRadius: string;
  @Input() borderLeftColor: string;
  @Input() borderLeftWidth: string;
  @Input() independentBorder: boolean;
  @Input() allowLabelWrapping: boolean;
  @Input() showClearButton: boolean;
  @Input() prefixText: string;
  @Input() suffixText: string;
  @Input() labelPosition: string;
  @Input() errorMessage: string;
  @Input() showErrorMessage: boolean;
  @Input() labelFontWeight: string;
  @Input() labelStyle: string;
  @Input() labelTextDecoration: string;
  @Output() onValueChange = new EventEmitter();
  @Output() onBlurChange = new EventEmitter();

  constructor() {}

  get metaData(): PhonenumberInputMetaData {
    return this.item.metaData as PhonenumberInputMetaData;
  }
  ngOnInit(): void {
    if(this.item.metaData.configure){
      let phoneNumber = ('' + this.item.value.value).replace(/\D/g, '');
      let match = phoneNumber.match(/^(\d{3})(\d{3})(\d{4})$/);
      if (match) {
        this.item.value.value = match[1] + '-' + match[2] + '-' + match[3];
      }
    }
  }
  
  validateField($event: any){
    this.onValueChange.emit($event);
  }
  optionChange($event: any){
    this.onBlurChange.emit($event);
  }
}
