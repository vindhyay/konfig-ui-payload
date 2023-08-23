import { Component, HostListener, Input } from "@angular/core";
import { SorterDirective } from "../sorter.directive";
import { CELL_ALIGNMENTS_TYPES } from "../../../../task/model/create-form.models";
import { IconTypes, IIcon } from "finlevit-library";

@Component({
  selector: "[sortHeader]",
  templateUrl: "./sort-header.component.html",
  styleUrls: ["./sort-header.component.scss"],
})
export class SortHeaderComponent {
  @Input() sortEligible = true;
  @Input() align: CELL_ALIGNMENTS_TYPES = CELL_ALIGNMENTS_TYPES.LEFT;
  cellAlignmentTypes = CELL_ALIGNMENTS_TYPES;
  @Input() ref: any; // <-- unique key for the column
  icon: IIcon = {
    type: IconTypes.MATERIAL_ICONS_FILLED,
    value: "expand_circle_down",
    size: "1rem",
  };
  @HostListener("click")
  sort() {
    if (this.sortEligible) {
      this.sorter.sort(this.ref); // <-- call the sort function in the parent
    }
  }
  constructor(public sorter: SorterDirective) {}
}
