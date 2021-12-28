import { Component, OnInit, Input } from '@angular/core';
import { BindableInputComponent } from '../bindable-input/bindable-input.component';
import * as momentModule from 'moment';
const moment = momentModule;

@Component({
  selector: 'rng-bindable-timepicker',
  templateUrl: './bindable-timepicker.component.html',
  styleUrls: []
})
export class BindableTimepickerComponent extends BindableInputComponent implements OnInit {
  @Input() stepMinutes: number | null = 30;
  @Input() dayStartHour: number | null = 8;
  @Input() dayEndHour: number | null = 19;

  items: string[] = [];
  filteredItems: string[] = this.items;

  ngOnInit() {
    super.ngOnInit();
    this.items = this.generateIntervals();
    this.filteredItems = this.items;
    this.subscription.add(
      this.valueControl.valueChanges.subscribe(value => {
        this.filteredItems = this.items.filter(item => item.startsWith(value));
      })
    );
  }

  generateIntervals(): string[] {
    const items = [];
    for (let index = this.dayStartHour * 60; index <= this.dayEndHour * 60; index += this.stepMinutes) {
      const date = new Date(0, 0, 0, 0, index);
      items.push(moment(date).format('h:mm A'));
    }
    return items;
  }
}
