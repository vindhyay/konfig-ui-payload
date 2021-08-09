import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

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
  @Input() noDataMessage: string = "No Data";
  @Input() isSmall = false;
  @Input() isLarge = false;
  @Input() pagination = false;
  @Input() sort = false;
  @Input() filter = false;
  @Input() addRows = false;
  @Input() tableHeading = "";
  @Input() headerColor: string = "#000000";
  @Input() headerBgColor: string = "#ffffff";

  @Output() onColDataChange = new EventEmitter();
  @Output() onRowClick = new EventEmitter();
  @Input() viewMode = false;

  private _styleClass = "p-datatable-gridlines p-datatable-sm";

  ngOnInit(): void {
  }

  addRow(){
    const newRow: any = {};
    this.columns.forEach( column => {
      Object.assign(newRow, { [column.columnId] : "" });
    });
    this.tableData.push(newRow);
  }
  getColType(type){
    switch (type){
      case 'Text':
      case 'Data':
        return 'text';
      case 'Date':
        return 'date'
      case 'Number':
        return 'numeric';
      default:
        return 'text'
    }
  }
}
