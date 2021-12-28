import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FilterPresets } from '../../model/common-types';

@Component({
  selector: 'rng-content-toolbar',
  templateUrl: './content-toolbar.component.html',
  styleUrls: []
})
export class ContentToolbarComponent {
  @Input() gridButton: boolean | null = false;
  @Input() filterButton: boolean | null = false;
  // new:
  @Input() filters: FilterPresets[];
  @Input() showFilters: boolean | null = false;
  @Input() grid: boolean | null = true;
  @Input() searchValue: string;

  @Output() changeGrid = new EventEmitter();
  @Output() searchData = new EventEmitter();
  @Output() filterClick = new EventEmitter();
  // new:
  @Output() filterChanged = new EventEmitter();

  // search function
  onSearchChange(val) {
    this.searchData.emit(val);
  }
  // end of search function

  // filter
  filterButtonClick() {
    this.filterClick.emit();
  }

  changeFilter(state) {
    this.filterChanged.emit(state);
  }
  // end of filter

  // grid function
  gridFunction() {
    this.grid = !this.grid;
    this.changeGrid.emit();
  }
  // end of grid function
}
