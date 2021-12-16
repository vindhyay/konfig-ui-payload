import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Column, ColumnTypes, WidgetTypes } from "../../../../../src/app/modules/task/model/create-form.models";
import {getUniqueId} from '../utils';
import {scrollToBottom,getValidators} from '../../../../../src/app/utils';

@Component({
  selector: 'finlevit-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
  get styleClass(): string {
    if (this.isSmall) {
      this._styleClass = this._styleClass + ' p-datatable-sm';
    } else if (this.isLarge) {
      this._styleClass = this._styleClass + ' p-datatable-lg';
    }
    return this._styleClass;
  }

  constructor() {}
  _columns: Column[] = [];
  @Input()
  set columns(columns) {
    this._columns = columns.map(column => {
      if (column.colType === WidgetTypes.DatePicker) {
        if (column?.validators?.minDate) {
          column.validators.minDate = new Date(column.validators.minDate);
        }
        if (column?.validators?.maxDate) {
          column.validators.maxDate = new Date(column.validators.maxDate);
        }
      }
      return column;
    });
  }
  get columns() {
    return this._columns;
  }
  @Input() tableData: any[] = [];
  @Input() totalRecords = 0;
  @Input() loading = false;
  @Input() noDataMessage = 'No Data';
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
  @Input() actionLabel = 'Actions';
  @Input() tableHeading = '';
  @Input() headerColor = '#000000';
  @Input() headerBgColor = '#ffffff';
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

  private _styleClass = 'p-datatable-gridlines p-datatable-sm';

  Text = ColumnTypes.Text;
  TextInput = ColumnTypes.TextInput;
  TextArea = ColumnTypes.TextArea;
  Number = ColumnTypes.Number;
  DatePicker = ColumnTypes.DatePicker;

  ngOnInit(): void {
    this.tableId = getUniqueId('table');
  }

  getColType(type) {
    switch (type) {
      case ColumnTypes.TextInput:
      case ColumnTypes.Data:
        return 'text';
      case ColumnTypes.DatePicker:
        return 'date';
      case ColumnTypes.Number:
        return 'numeric';
      default:
        return 'text';
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
  validateRow(index, rowData, columnId = '') {
    let valid = true;
    Object.keys(rowData).forEach(column => {
      if (columnId && columnId !== column) {
        return;
      }
      const columnValue = rowData[column];
      const columnConfig = this.columns.find(col => col.columnId === column);
      const tempFormControl = new FormControl(columnValue, getValidators(columnConfig.validators) || []);
      if (tempFormControl.valid) {
        if (!this.rowErrors[index]) {
          this.rowErrors[index] = {};
        }
        this.rowErrors[index][column] = { error: false, errorMsg: '' };
      } else {
        valid = false;
        if (!this.rowErrors[index]) {
          this.rowErrors[index] = {};
        }
        this.rowErrors[index][column] = {
          error: true,
          errorMsg: this.getErrorMessages(tempFormControl.errors, columnConfig.label)[0]
        };
      }
    });
    return valid;
  }
  getErrorMessages = (errors: any, label: any) => {
    const errorMessages: string[] = [];
    Object.keys(errors).forEach(error => {
      switch (error) {
        case 'required':
          errorMessages.push(`${label} is required`);
          break;
        case 'minlength':
        case 'maxlength':
          errorMessages.push(
              `Expected atleast length ${errors[error].requiredLength} but got ${errors[error].actualLength}`
          );
          break;
        case 'min':
          errorMessages.push(`Expected atleast value ${errors[error].min} but got ${errors[error].actual}`);
          break;
        case 'max':
          errorMessages.push(`Expected atleast value ${errors[error].max} but got ${errors[error].actual}`);
          break;
      }
    });
    return errorMessages;
  }
  onRowEditCancel(index, rowData) {
    this.tableData[index] = this.editRows[index];
    delete this.editRows[index];
    delete this.rowErrors[index];
  }
  getColumnDefaultValue(column) {
    switch (column.type) {
      case 'string':
        return '';
      case 'number':
        return null;
      default:
        return null;
    }
  }
  addRow() {
    const newRow: any = {};
    this.columns.forEach(eachColumn => {
      Object.assign(newRow, { [eachColumn.columnId]: this.getColumnDefaultValue(eachColumn) });
    });
    this.tableData.push(newRow);
    const tableBodyElement = document.querySelector(`#${this.tableId} .p-datatable-tbody`);
    this.newRows[this.tableData.length - 1] = newRow;
    setTimeout(() => {
      scrollToBottom(tableBodyElement);
    });
  }
}
