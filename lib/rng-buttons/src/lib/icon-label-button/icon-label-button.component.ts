import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'rng-icon-label-button',
  templateUrl: './icon-label-button.component.html',
  styleUrls: []
})
export class IconLabelButtonComponent {
  @Input() iconClass: string; // rng-icon rng-icon-add_circle
  @Input() label: string;
  @Input() disabled: boolean | false;

  @Output() buttonClick = new EventEmitter();
}
