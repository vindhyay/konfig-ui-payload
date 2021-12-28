import { Component, HostListener, Input, OnInit } from "@angular/core";
import { SorterDirective } from "../sorter.directive";
import { CELL_ALIGNMENTS_TYPES } from "../../../../../task/model/create-form.models";

@Component({
  selector: "[sortHeader]",
  templateUrl: "./sort-header.component.html",
  styleUrls: ["./sort-header.component.scss"]
})
export class SortHeaderComponent implements OnInit {
  @Input() sortEligible = true;
  @Input() align: CELL_ALIGNMENTS_TYPES = CELL_ALIGNMENTS_TYPES.LEFT;
  cellAlignmentTypes = CELL_ALIGNMENTS_TYPES;
  @Input() ref: any; // <-- unique key for the column

  @HostListener("click")
  sort() {
    if (this.sortEligible) {
      this.sorter.sort(this.ref); // <-- call the sort function in the parent
    }
  }
  constructor(public sorter: SorterDirective) {}
  ngOnInit() {}
}
