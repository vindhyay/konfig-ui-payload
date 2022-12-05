import {
  Directive,
  OnChanges,
  OnInit,
  SimpleChanges,
  Input,
  Output,
  EventEmitter,
  ElementRef,
  Renderer2,
  HostBinding,
  HostListener
} from "@angular/core";

@Directive({
  selector: "[pagination]",
  exportAs: "pagination"
})
export class PaginationDirective implements OnChanges, OnInit {
  @Input() pageNo = 1;
  @Input() totalPages = 1;
  @Input() limit = 0;
  @Input() totalRecords = 0;
  start = 0;
  end = 0;
  @Output() pageChange = new EventEmitter<number>();
  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnInit() {
    // In case no value is passed
    this.setValue(this.pageNo);
  }

  ngOnChanges({ pageNo, totalPages }: SimpleChanges) {
    // Needs to be checked before pageNo
    if (totalPages) {
      this.onTotalPagesInput();
    }

    if (pageNo) {
      this.onPageNoInput();
    }
    const start = this.pageNo === 1 ? 1 : (this.pageNo - 1) * this.limit + 1;
    const end = start + (this.limit - 1) < this.totalRecords ? start + this.limit - 1 : this.totalRecords;
    // let msg = "";
    // if (!this.totalRecords) {
    //   msg = "showing 0 results";
    // } else {
    //   msg = "showing " + start + " - " + end + " of " + this.totalRecords;
    // }
    this.start = start;
    this.end = end;
  }

  @HostListener("input", ["$event.target.value"]) onInput(val) {
    this.setValue(this.getParsedValue(val));
  }

  @HostListener("change", ["$event.target.value"]) onChange(val) {
    if (val === "") {
      this.setValue(1);
    }

    if (this.isOutOfRange(val)) {
      this.setValue(this.totalPages);
    }

    this.pageNo = Number(this.el.nativeElement.value);
    this.pageChange.emit(this.pageNo);
  }

  get isFirst(): boolean {
    return this.pageNo === 1;
  }

  get isLast(): boolean {
    return this.pageNo === this.totalPages;
  }

  first() {
    this.setPage(1);
  }

  prev() {
    this.setPage(Math.max(1, this.pageNo - 1));
  }

  next() {
    this.setPage(Math.min(this.totalPages, this.pageNo + 1));
  }

  last() {
    this.setPage(this.totalPages);
  }

  private setValue(val: string | number) {
    this.renderer.setProperty(this.el.nativeElement, "value", String(val));
  }

  private setPage(val: number) {
    this.pageNo = val;
    this.setValue(this.pageNo);
    this.pageChange.emit(this.pageNo);
  }

  private getParsedValue(val: string): string {
    return val.replace(/(^0)|([^0-9]+$)/, "");
  }

  private isOutOfRange(val: string): boolean {
    return Number(val) > this.totalPages;
  }

  private onTotalPagesInput() {
    if (typeof this.totalPages !== "number") {
      this.totalPages = 1;
    }
  }

  private onPageNoInput() {
    if (typeof this.pageNo !== "number" || this.pageNo < 1 || this.pageNo > this.totalPages) {
      this.pageNo = 1;
    }

    this.setValue(this.pageNo);
  }
}
