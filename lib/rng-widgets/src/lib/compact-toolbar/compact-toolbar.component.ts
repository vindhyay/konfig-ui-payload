import { Component, Input, Output, EventEmitter, AfterViewInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'rng-compact-toolbar',
  templateUrl: './compact-toolbar.component.html',
  styleUrls: []
})
export class CompactToolbarComponent implements AfterViewInit, OnDestroy {
  @Input() title: string;
  @Input() withSearch: boolean | null = false;

  @Output() searchChange = new EventEmitter();

  @ViewChild('searchfield') searchfield: ElementRef;

  searchToggle = false;
  searchText = '';

  search = new FormControl();
  subscription = new Subscription();

  changeSearch = (text: string) => this.searchChange.emit(text);

  toggleSearch(toggle: boolean) {
    this.searchToggle = toggle;
    if (toggle) {
      setTimeout(() => this.searchfield.nativeElement.focus(), 0);
    } else {
      this.search.setValue('');
    }
  }

  ngAfterViewInit() {
    this.subscription.add(this.search.valueChanges.subscribe(val => this.changeSearch(val)));
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
