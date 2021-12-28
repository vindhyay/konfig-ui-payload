import { FormControl } from '@angular/forms';

export interface BageTypeLabel {
  color: string;
  value: string;
}
export type FilterListType = 'single' | 'multi';

export interface FilterPresets {
  type: FilterListType;
  placeholder: string;
  control: FormControl;
  items: any[];
}
