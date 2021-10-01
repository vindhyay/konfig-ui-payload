import {Component, EventEmitter, Input, OnInit, Output} from "@angular/core";
import {getUniqueId} from "../utils";
import {scrollToBottom} from "../../../../../src/app/utils";

export enum columnType{
  text= "Text",
  number = "Number",
  date= "Date",
  data = "Data"
}
export interface column{
  displayName: string;
  columnId: string;
  label: string;
  type: columnType;
  required: boolean;
  width: string;
}

@Component({
  selector: "finlevit-table",
  templateUrl: "./table.component.html",
  styleUrls: ["./table.component.scss"]
})
export class TableComponent implements OnInit {

  get styleClass(): string {
    if (this.isSmall){
      this._styleClass = this._styleClass + " p-datatable-sm";
    }else if (this.isLarge){
      this._styleClass = this._styleClass + " p-datatable-lg";
    }
    return this._styleClass;
  }

  constructor() {
  }

  @Input() columns: column[]  = [];
  @Input() tableData: any[] = [];
  @Input() totalRecords = 0;
  @Input() loading = false;
  @Input() noDataMessage = "No Data";
  @Input() isSmall = false;
  @Input() isLarge = false;
  @Input() pagination = false;
  @Input() sort = false;
  @Input() filter = false;
  @Input() addRows = false;
  @Input() hideHeader = false;
  @Input() cellBorder = true;
  @Input() editRow = false;
  @Input() deleteRow = false;
  @Input() actionWidth = 10;
  @Input() actionLabel = "Actions";
  @Input() tableHeading = "";
  @Input() headerColor = "#000000";
  @Input() headerBgColor = "#ffffff";
  @Input() lazyLoad = false;

  @Output() onColDataChange = new EventEmitter();
  @Output() onRowClick = new EventEmitter();
  @Output() onPageChange = new EventEmitter();

  @Output() handleRowSave = new EventEmitter();
  @Output() handleRowDelete = new EventEmitter();

  @Input() viewMode = false;
  tableId: any = null;
  editRows = {};

  private _styleClass = "p-datatable-gridlines p-datatable-sm";

  ngOnInit(): void {
    this.tableId = getUniqueId("table");
  }

  getColType(type){
    switch (type){
      case "Text":
      case "Data":
        return "text";
      case "Date":
        return "date";
      case "Number":
        return "numeric";
      default:
        return "text";
    }
  }
  onPage($event){
    const {first, rows} = $event;
    this.onPageChange.emit({page: Math.ceil((first + 1) / rows), rows });
  }
  onDelete(index, rowData){
    this.tableData.splice(index, 1);
    this.handleRowDelete.emit({index, rowData});
  }
  onEdit(index, data: Array<any>) {
    this.editRows[index] = JSON.parse(JSON.stringify(data));
  }
  onRowSave(index, rowData){
    this.handleRowSave.emit({index, rowData});
    delete this.editRows[index];
  }
  onRowEditCancel(index, rowData){
    this.tableData[index] = this.editRows[index];
    delete this.editRows[index];
  }
  addRow(){
    const newRow: any = {};
    this.columns.forEach( eachColumn => {
      Object.assign(newRow, { [eachColumn.columnId] : "" });
    });
    this.tableData.push(newRow);
    const tableBodyElement = document.querySelector(`#${this.tableId} .p-datatable-tbody`);
    this.onEdit(this.tableData.length - 1, newRow);
    scrollToBottom(tableBodyElement);
  }
  handleColResize($event){
    console.log($event);
  }
}
