import { OnInit } from '@angular/core';
import { BindableInputComponent } from '../bindable-input/bindable-input.component';
export declare class BindableTimepickerComponent extends BindableInputComponent implements OnInit {
  stepMinutes: number | null;
  dayStartHour: number | null;
  dayEndHour: number | null;
  items: string[];
  filteredItems: string[];
  ngOnInit(): void;
  generateIntervals(): string[];
}
