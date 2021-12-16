import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {BaseWidget, PasswordInputMetaData} from '../../model/create-form.models';

@Component({
  selector: 'app-password-field',
  templateUrl: './password-field.component.html',
  styleUrls: ['./password-field.component.scss']
})
export class PasswordFieldComponent implements OnInit {

  _type:string="password";
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
  get metaData(): PasswordInputMetaData {
    return this.item.metaData as PasswordInputMetaData;
  }
  ngOnInit(): void {
    if(!this.metaData.rightIcon){
      this.metaData.rightIcon= this.metaData.showIcon? this.metaData.showIcon: null;
    }
  }

  onRightIconClick(metaData:any){
    if(metaData?.rightIcon=== metaData?.showIcon){
      metaData.rightIcon= metaData?.hideIcon;
      this._type='text';
    }else{
      metaData.rightIcon= metaData?.showIcon;
      this._type='password';
    }
  }
  validateField($event: any){
    this.onValueChange.emit($event);
  }
  optionChange($event: any){
    this.onBlurChange.emit($event);
  }
}
