import { Component, HostListener, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'rng-simple-search',
  templateUrl: './simple-search.component.html',
  styleUrls: []
})
export class SimpleSearchComponent {
  dataVal: string;
  opened = false;
  focused = false;

  @Input() data: string | null = '';

  @Input() closeButton: boolean | null = false;
  @Input() placeholder = '';
  @Output() searchChange: EventEmitter<any> = new EventEmitter();
  @Output() searchClick: EventEmitter<any> = new EventEmitter();

  openSearch = (e, el) => {
    this.clickFunction();
    this.opened = true;
    this.focused = true;
    el.focus();
    return false;
  };

  changeFunction = (data: string) => {
    this.dataVal = data;
  };

  backData = data => this.searchChange.emit(data);

  onFocus() {
    this.opened = true;
    this.focused = true;
  }

  @HostListener('document:keydown', ['$event'])
  onKeydownHandler(event: KeyboardEvent) {
    if (event.key === 'Escape' || event.key === 'Enter') {
      this.opened = false;
      this.focused = false;
      this.clickFunction();
    }
  }

  cancelFunction() {
    this.data = '';
    this.opened = false;
    this.focused = false;
    this.backData(this.data);
    this.clickFunction();
  }

  onBlur() {
    if (this.data === '') {
      this.opened = false;
      this.focused = false;
      this.clickFunction();
    } else {
      this.opened = true;
    }
  }

  clickFunction = () => {
    this.searchClick.emit();
  };
}
