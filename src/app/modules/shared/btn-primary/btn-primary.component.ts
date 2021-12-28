import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-btn-primary',
  templateUrl: './btn-primary.component.html',
  styleUrls: []
})
export class BtnPrimaryComponent {
  @Input() disabled: boolean | null = false;
  @Input() class: string = '';
  @Input() routerLink: string | undefined;
  @Output() btnClick = new EventEmitter();
}
