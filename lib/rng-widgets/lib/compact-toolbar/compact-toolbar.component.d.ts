import { EventEmitter, AfterViewInit, OnDestroy, ElementRef } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';
export declare class CompactToolbarComponent implements AfterViewInit, OnDestroy {
  title: string;
  withSearch: boolean | null;
  searchChange: EventEmitter<{}>;
  searchfield: ElementRef;
  searchToggle: boolean;
  searchText: string;
  search: FormControl;
  subscription: Subscription;
  changeSearch: (text: string) => void;
  toggleSearch(toggle: boolean): void;
  ngAfterViewInit(): void;
  ngOnDestroy(): void;
}
