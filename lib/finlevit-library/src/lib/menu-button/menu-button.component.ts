import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'rng-menu-button',
  templateUrl: './menu-button.component.html',
  styleUrls: []
})
export class MenuButtonComponent {
  @Input() items: string[] | null = ['Option 1', 'Option 2'];
  @Input() light: boolean | null = false;

  @Output() itemClick: EventEmitter<string> = new EventEmitter();
}
