import {Component, Input, OnInit} from "@angular/core";

export enum columnType{
  text= "Text",
  number = "Number",
  date= "Date",
  data = "Data"
}
export interface column{
  displayName: string;
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

  constructor() { }

  @Input() columns: column[]  = [];
  @Input() tableData: any[] = [];
  @Input() isSmall = false;
  @Input() isLarge = false;
  @Input() pagination = false;
  @Input() addRows = false;
  @Input() tableHeading = "";

  private _styleClass = "p-datatable-gridlines";

  ngOnInit(): void {
  }

  addRow(){
    const newRow: any = {};
    Object.keys(this.tableData[0]).forEach( label => {
      Object.assign(newRow, { [label] : "" });
    });
    this.tableData.push(newRow);
  }
}
