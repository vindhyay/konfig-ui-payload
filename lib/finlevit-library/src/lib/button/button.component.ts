import { Component, EventEmitter, Input, Output } from '@angular/core';

export enum ButtonVariants {
  raisedButton = 'raisedButton',
  roundedButton = 'roundedButton',
  raisedTextButton = 'raisedTextButton',
  outlinedButton = 'outlinedButton'
}

export enum ButtonTypes {
  primary = 'primary',
  info = 'info',
  success = 'success',
  secondary = 'secondary'
}

const ButtonClass = {
  raisedButton: 'p-button-raised',
  roundedButton: 'p-button-rounded',
  raisedTextButton: 'p-button-raised p-button-text',
  outlinedButton: 'p-button-outlined',
  primary: 'p-button-primary',
  info: 'p-button-info',
  success: 'p-button-success',
  secondary: 'p-button-secondary'
};

@Component({
  selector: 'finlevit-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent {
  @Input() variant: ButtonVariants = ButtonVariants.raisedButton;
  @Input() type: ButtonTypes = ButtonTypes.primary;
  @Input() isSmall = false;
  @Input() isLarge = false;
  @Input() label = '';
  @Input() icon = '';
  @Input() iconPos = 'left';
  @Input() info = false;
  @Input() secondary = false;
  @Input() success = false;
  @Output() btnClick = new EventEmitter();
  private _class = '';
  get class(): string {
    this._class = ButtonClass[this.variant] + ' ' + ButtonClass[this.type];
    if (this.isSmall) {
      this._class = this._class + ' p-button-sm';
    }
    if (this.isLarge) {
      this._class = this._class + ' p-button-lg';
    }
    return this._class;
  }
}
