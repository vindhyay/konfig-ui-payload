import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'finlevit-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent {

  @Input() raisedButton: boolean = false;
  @Input() roundedButton: boolean = false;
  @Input() raisedTextButton: boolean = false;
  @Input() outlinedButton: boolean = false;
  @Input() isSmall: boolean = false;
  @Input() isLarge: boolean = false;
  @Input() label : string = '';
  @Input() rightIcon : string = '';
  @Input() leftIcon : string = '';
  @Input() info: boolean = false;
  @Input() secondary: boolean = false;
  @Input() success: boolean = false;
  @Output() btnClick = new EventEmitter();
  private _class: string = '';
  private _icon : string = '';

  get iconPos(): "left" | "right" {
    if(this.rightIcon){
      return "right";
    }else {
      return "left";
    }
  }

  get icon(): string {
    if(this.rightIcon){
      this._icon = this.rightIcon;
    }else {
      this._icon = this.leftIcon;
    }
    return this._icon;
  }

  get class(): string {
    if(this.raisedButton){
      this._class = "p-button-raised";
    }else if(this.roundedButton){
      this._class = "p-button-rounded";
    }else if(this.raisedTextButton){
      this._class = "p-button-raised p-button-text";
    }else if(this.outlinedButton){
      this._class = "p-button-outlined";
    }
    if(this.secondary){
      this._class = this._class + " p-button-secondary";
    }
    if(this.success){
      this._class = this._class + " p-button-success";
    }
    if(this.info){
      this._class = this._class + " p-button-info";
    }
    if(this.isSmall){
      this._class = this._class + " p-button-sm";
    }
    if(this.isLarge){
      this._class = this._class + " p-button-lg";
    }
    return this._class;
  }
}
