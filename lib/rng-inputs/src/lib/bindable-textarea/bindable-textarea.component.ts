import { Component, EventEmitter, Output, Input, HostListener } from '@angular/core';
import { BindableComponent } from '../bindable/bindable.component';
import {} from 'events';

@Component({
  selector: 'rng-bindable-textarea',
  templateUrl: './bindable-textarea.component.html',
  styleUrls: ['./bindable-textarea.component.scss']
})
export class BindableTextareaComponent extends BindableComponent {
  @Output() btnClick = new EventEmitter();
  @Input() btnIconCSS: string | null;
  @Input() autosize: boolean | null = true;
  @Input() minRows: number | null = 1;
  @Input() maxRows: number | null = 4;
}
