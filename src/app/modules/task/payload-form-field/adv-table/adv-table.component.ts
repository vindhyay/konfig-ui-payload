import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { BaseWidget, WidgetTypes } from "../../model/create-form.models";
import { getErrorMessages, getUniqueId, getValidators, scrollToBottom } from "../../../../utils";
import { FormControl } from "@angular/forms";

@Component({
  selector: 'app-adv-table',
  templateUrl: './adv-table.component.html',
  styleUrls: ['./adv-table.component.scss']
})
export class AdvTableComponent implements OnInit {
  get styleClass(): string {
    if (this.isSmall) {
      this._styleClass = this._styleClass + " p-datatable-sm";
    } else if (this.isLarge) {
      this._styleClass = this._styleClass + " p-datatable-lg";
    }
    return this._styleClass;
  }

  constructor() {}
  _columns: BaseWidget[] = [];
  @Input()
  set columns(columns) {
    this._columns = columns.map(column => {
      if (column.metaData.widgetType === WidgetTypes.DatePicker) {
        if (column?.validators?.minDate) {
          column.validators.minDate = new Date(column.validators.minDate);
        }
        if (column?.validators?.maxDate) {
          column.validators.maxDate = new Date(column.validators.maxDate);
        }
      }
      return column;
    });
    this.tableData = [];
  }
  get columns() {
    return this._columns;
  }
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
  newRows = {};
  rowErrors = {};

  private _styleClass = "p-datatable-gridlines p-datatable-sm";

  Text: WidgetTypes = WidgetTypes.Text;
  Button: WidgetTypes = WidgetTypes.Button;
  Modal: WidgetTypes = WidgetTypes.Modal;
  TextInput: WidgetTypes = WidgetTypes.TextInput;
  Email: WidgetTypes = WidgetTypes.Email;
  TextArea: WidgetTypes = WidgetTypes.TextArea;
  Number: WidgetTypes = WidgetTypes.Number;
  Checkbox: WidgetTypes = WidgetTypes.Checkbox;
  Image: WidgetTypes = WidgetTypes.Image;
  Dropdown: WidgetTypes = WidgetTypes.Dropdown;
  DatePicker: WidgetTypes = WidgetTypes.DatePicker;
  CheckboxGroup: WidgetTypes = WidgetTypes.CheckboxGroup;
  RadioGroup: WidgetTypes = WidgetTypes.RadioGroup;
  Upload: WidgetTypes = WidgetTypes.Upload;


  ngOnInit(): void {
    this.tableId = getUniqueId("table");
  }

  getColType(type: WidgetTypes) {
    switch (type) {
      case WidgetTypes.TextInput:
        return "text";
      case WidgetTypes.DatePicker:
        return "date";
      case WidgetTypes.Number:
        return "numeric";
      default:
        return "text";
    }
  }
  onPage($event) {
    const { first, rows } = $event;
    this.onPageChange.emit({ page: Math.ceil((first + 1) / rows), rows });
  }
  onDelete(index, rowData, isNew = false) {
    this.tableData.splice(index, 1);
    delete this.rowErrors[index];
    this.handleRowDelete.emit({ index, rowData, isNew });
  }
  onEdit(index, data: Array<any>) {
    this.editRows[index] = JSON.parse(JSON.stringify(data));
  }
  onRowSave(index, rowData, isNew = false) {
    if (this.validateRow(index, rowData)) {
      this.handleRowSave.emit({ index, rowData });
      if (isNew) {
        delete this.newRows[index];
      } else {
        delete this.editRows[index];
      }
      delete this.rowErrors[index];
    }
  }
  validateRow(index, rowData: BaseWidget[] = [], columnData: BaseWidget = null) {
    let valid = true;
    rowData.forEach(eachCol => {
      if (columnData && columnData?.metaData?.widgetId && columnData?.metaData?.widgetId !== eachCol.metaData.widgetId){
        return;
      }
      const columnValue = eachCol?.value?.value;
      const tempFormControl = new FormControl(columnValue, getValidators(eachCol.validators) || []);
      if (tempFormControl.valid) {
        if (!this.rowErrors[index]) {
          this.rowErrors[index] = {};
        }
        this.rowErrors[index][eachCol.metaData.widgetId] = { error: false, errorMsg: "" };
      } else {
        valid = false;
        if (!this.rowErrors[index]) {
          this.rowErrors[index] = {};
        }
        this.rowErrors[index][eachCol.metaData.widgetId] = {
          error: true,
          errorMsg: getErrorMessages(tempFormControl.errors, eachCol.label)[0]
        };
      }
    });
    return valid;
  }
  onRowEditCancel(index, rowData) {
    this.tableData[index] = this.editRows[index];
    delete this.editRows[index];
    delete this.rowErrors[index];
  }
  getColumnDefaultValue(column) {
    switch (column.type) {
      case "string":
        return "";
      case "number":
        return null;
      default:
        return null;
    }
  }
  addRow() {
    const newRow: any = [];
    this.columns.forEach(eachColumn => {
      const column = JSON.parse(JSON.stringify(eachColumn));
      column.value.value = null;
      if (column?.validators?.minDate) {
        column.validators.minDate = new Date(column.validators.minDate);
      }
      if (column?.validators?.maxDate) {
        column.validators.maxDate = new Date(column.validators.maxDate);
      }
      newRow.push(column);
    });
    this.tableData.push(newRow);
    const tableBodyElement = document.querySelector(`#${this.tableId} .p-datatable-tbody`);
    this.newRows[this.tableData.length - 1] = newRow;
    setTimeout(() => {
      scrollToBottom(tableBodyElement);
    });
  }
}
