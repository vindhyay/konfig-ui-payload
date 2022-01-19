import { Directive, EventEmitter, Output } from "@angular/core";

@Directive({
  selector: "[sorter]",
})
export class SorterDirective {
  active = null;
  direction = null;

  @Output() sortChange = new EventEmitter<any>();

  sort(column: string) {
    let direction = this.direction;
    // If column is not the same as active, reset the direction
    if (this.active !== column) {
      this.direction = null;
      this.active = column;
    }
    // Default --> Ascending
    if (this.direction === null) {
      direction = "asc";
    }
    // Ascending --> Descending
    else if (this.direction === "asc") {
      direction = "desc";
    }
    // Descending --> Default
    else if (this.direction === "desc") {
      direction = "asc";
    }
    // Emit the current active column and the direction
    this.sortChange.emit({
      column,
      direction,
    });
    this.direction = direction;
  }
}
