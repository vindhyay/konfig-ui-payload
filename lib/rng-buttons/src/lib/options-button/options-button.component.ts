import { Component, Output, EventEmitter, Input } from '@angular/core';
import { IButtonMenuItem } from '../../public-api';

@Component({
  selector: 'rng-options-button',
  templateUrl: './options-button.component.html',
  styleUrls: []
})
export class OptionsButtonComponent {
  @Output() primaryClick = new EventEmitter();
  @Output() itemClick = new EventEmitter();

  @Input() primaryTitle: string;
  @Input() items: IButtonMenuItem[];
  @Input() color: string | null = 'accent';

  onPrimaryClick = () => {
    this.primaryClick.emit();
  };
  onItemClick = (item: IButtonMenuItem) => this.itemClick.emit(item);

  toggleChange(event) {
    const toggle = event.source;
    if (toggle) {
      const group = toggle.buttonToggleGroup;
      if (event.value.some(item => item === toggle.value)) {
        group.value = [toggle.value];
      }
    }
  }
}
