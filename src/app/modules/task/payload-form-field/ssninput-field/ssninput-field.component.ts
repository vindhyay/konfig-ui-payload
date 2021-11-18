import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {BaseWidget, SSNInputMetaData} from '../../model/create-form.models';

@Component({
  selector: 'app-ssninput-field',
  templateUrl: './ssninput-field.component.html',
  styleUrls: ['./ssninput-field.component.scss']
})
export class ssnInputFieldComponent implements OnInit {
  _type_mask:string = '000-00-0000'
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
  @Output() onValueChange = new EventEmitter();
  @Output() onBlurChange = new EventEmitter();

  constructor() {}
  get metaData(): SSNInputMetaData {
    return this.item.metaData as SSNInputMetaData;
  }
  ngOnInit(): void {
    if(!this.metaData.rightIcon){
      this.metaData.rightIcon= this.metaData.showIcon? this.metaData.showIcon: null;
    }
  }

  onRightIconClick(metaData:any){
    this.changeIcon(metaData);
  }
  changeIcon(metaData){
    if(this._type_mask=== this.metaData.showMask){
      metaData.rightIcon= metaData?.hideIcon;
      this._type_mask=metaData.hideMask;
    }else{
      metaData.rightIcon= metaData?.showIcon;
      this._type_mask=metaData.showMask;
    }
  }
  validateField($event: any){
    this._type_mask=this.metaData.hideMask;
    this.changeIcon(this.metaData);
    this.onValueChange.emit($event);
  }
  optionChange($event: any){
    setTimeout(()=>{
      this._type_mask=this.metaData.showMask;
      this.changeIcon(this.metaData);
      this.onBlurChange.emit($event);
    },0)
  }
}
