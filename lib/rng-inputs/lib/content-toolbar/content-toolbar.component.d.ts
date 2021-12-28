import { EventEmitter } from '@angular/core';
import { FilterPresets } from '../../model/common-types';
export declare class ContentToolbarComponent {
  gridButton: boolean | null;
  filterButton: boolean | null;
  filters: FilterPresets[];
  showFilters: boolean | null;
  grid: boolean | null;
  searchValue: string;
  changeGrid: EventEmitter<{}>;
  searchData: EventEmitter<{}>;
  filterClick: EventEmitter<{}>;
  filterChanged: EventEmitter<{}>;
  onSearchChange(val: any): void;
  filterButtonClick(): void;
  changeFilter(state: any): void;
  gridFunction(): void;
}
