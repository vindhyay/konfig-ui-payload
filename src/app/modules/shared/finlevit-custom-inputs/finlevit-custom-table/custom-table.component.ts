import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild
} from "@angular/core";
import { FormControl, Validators } from "@angular/forms";
import {
  CELL_ALIGNMENTS_TYPES,
  Column,
  TABLE_OVERFLOW,
  TABLE_PAGINATION_POSITIONS,
  TableActions,
  WidgetTypes
} from "../../../task/model/create-form.models";
import { getUniqueId, scrollToBottom, superClone } from "../../../../utils";
import { CustomTableFiltersComponent } from "./table-utils/custom-table-filters/custom-table-filters.component";
import { PaginationDirective } from "./table-utils/pagination.directive";

const MIN_ROW_HEIGHT = 50;

@Component({
  selector: "finlevit-custom-table",
  templateUrl: "./custom-table.component.html",
  styleUrls: ["./custom-table.component.scss"]
})
export class CustomTableComponent implements OnInit, AfterViewInit, OnChanges {
  Object = Object;
  CellAlignTypes = CELL_ALIGNMENTS_TYPES;
  PaginatorPositionTypes = TABLE_PAGINATION_POSITIONS;
  OverflowTypes = TABLE_OVERFLOW;
  Text: WidgetTypes = WidgetTypes.Text;
  Button: WidgetTypes = WidgetTypes.Button;
  Modal: WidgetTypes = WidgetTypes.Modal;
  TextInput: WidgetTypes = WidgetTypes.TextInput;
  TextArea: WidgetTypes = WidgetTypes.TextArea;
  Number: WidgetTypes = WidgetTypes.Number;
  Checkbox: WidgetTypes = WidgetTypes.Checkbox;
  Image: WidgetTypes = WidgetTypes.Image;
  Dropdown: WidgetTypes = WidgetTypes.Dropdown;
  DatePicker: WidgetTypes = WidgetTypes.DatePicker;
  CheckboxGroup: WidgetTypes = WidgetTypes.CheckboxGroup;
  RadioGroup: WidgetTypes = WidgetTypes.RadioGroup;
  Upload: WidgetTypes = WidgetTypes.Upload;
  _columns: Column[] = [];
  @Input() verticalBorder = true;
  @Input() horizontalBorder = true;
  @Input() tableBorder = true;
  @Input()
  set columns(columns) {
    this._columns = columns.map(column => {
      if (column?.metaData?.widgetType === WidgetTypes.DatePicker) {
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
  isPaginationEnabled = true;
  @Input() sort = false;
  @Input() filter = false;
  @Input() addRows = false;
  @Input()
  set overflowType(value: TABLE_OVERFLOW) {
    this.isPaginationEnabled = value === TABLE_OVERFLOW.PAGINATION;
    if (this.isPaginationEnabled) {
      this.updateRowsLimit();
    }
  }
  @Input() paginatorPosition: TABLE_PAGINATION_POSITIONS = TABLE_PAGINATION_POSITIONS.BOTTOM;
  @Input() rows = 0;
  @Input() isServerSidePagination = false;
  @Input() totalRecords = 0;
  _tableData = [];
  filteredTableData = [];
  @Input()
  set tableData(data) {
    this._tableData = data;
    this.filteredTableData = data;
    this.updateRowsLimit();
  }
  get tableData() {
    return this._tableData;
  }
  @Input() hideHeader = false;
  @Input() hideFooter = false;
  @Input() actions: TableActions = null;
  @Output() onColDataChange = new EventEmitter();
  @Output() onRowClick = new EventEmitter();
  @Output() onPageChange = new EventEmitter();

  @Output() handleRowSave = new EventEmitter();
  @Output() handleRowDelete = new EventEmitter();
  tableId: any = null;
  editRows = {};
  editCells = {};
  newRows = {};
  modifyingData = {};
  rowErrors = {};

  // pagination related
  currentPage = 1;
  limitPerPage = 1;
  @ViewChild("tableBody", { static: false }) tableBody: ElementRef;
  @ViewChild("tableFilters", { static: false }) tableFilters: CustomTableFiltersComponent;
  @ViewChild("pagination", { static: false }) tablePagination: PaginationDirective;
  constructor() {}

  ngOnInit(): void {
    this.tableId = getUniqueId("table");
  }

  updateRowsLimit() {
    const bodyHeight = this.tableBody?.nativeElement?.offsetHeight;
    this.limitPerPage = Math.floor(bodyHeight / MIN_ROW_HEIGHT) || 1;
  }
  ngAfterViewInit() {
    setTimeout(() => {
      if (this.isPaginationEnabled) {
        this.updateRowsLimit();
        if(this.isServerSidePagination){
          this.onPageChange.emit({limit: this.limitPerPage, page: this.currentPage})
        }
      }
    }, 100);
  }
  ngOnChanges(changes: SimpleChanges) {
    if (this.isPaginationEnabled && changes.rows) {
      this.currentPage = 1;
      this.updateRowsLimit();
    }
  }

  onResize($event, column) {
    column.width = parseInt($event, 10);
  }
  getMinWidth() {
    let sum = 0;
    this.columns.forEach(col => {
      sum = sum + Number(col.width || 100);
    });
    if (this.actions?.editRow || this.actions?.deleteRow) {
      sum = sum + Number(this.actions?.width || 100);
    }
    return sum + "px";
  }
  onDelete(index, rowData, isNew = false) {
    this.tableData.splice(index, 1);
    this.tableData = [...this.tableData];
    delete this.rowErrors[index];
    delete this.newRows[index];
    delete this.modifyingData[index];
    this.handleRowDelete.emit({ index, rowData, isNew });
  }
  onEdit(rowIndex, data: Array<any>) {
    this.editRows[rowIndex] = superClone(data);
    this.modifyingData[rowIndex] = superClone(data);
    // if (!this.editCells[rowIndex]) {
    //   this.editCells[rowIndex] = {};
    // }
    // this.columns.forEach(column => {
    //   this.editCells[rowIndex][column?.columnId] = data[column?.columnId];
    // });
  }
  onRowEditCancel(index, rowData) {
    this.tableData[index] = this.editRows[index];
    delete this.editRows[index];
    delete this.modifyingData[index];
    delete this.editCells[index];
    delete this.rowErrors[index];
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
      delete this.modifyingData[index];
      delete this.editCells[index];
      this.tableData[index] = rowData;
      this.tableData = [...this.tableData];
    }
  }
  onColEdit($event, column, rowIndex, rowData) {
    if (!this.editCells[rowIndex]) {
      this.editCells[rowIndex] = {};
    }
    this.editCells[rowIndex][column.columnId] = superClone(this.tableData[rowIndex][column.columnId]);
    this.modifyingData[rowIndex] = superClone(rowData);
    console.log(this.editCells);
  }
  onColSave($event) {
    Object.keys(this.modifyingData).map(index => {
      if (this.validateRow(index, this.modifyingData[index])) {
        this.tableData[index] = { ...this.tableData[index], ...this.modifyingData[index] };
        this.tableData = [...this.tableData];
        if (this.newRows[index]) {
          delete this.newRows[index];
        }
        delete this.editRows[index];
        delete this.editCells[index];
        delete this.modifyingData[index];
      }
    });
  }
  onColSaveCancel($event) {
    this.editCells = {};
    Object.keys(this.modifyingData).forEach(rowIndex => {
      if (this.newRows[rowIndex]) {
        this.onDelete(rowIndex, this.modifyingData[rowIndex], true);
      }
    });
    this.modifyingData = {};
    this.editRows = {};
  }
  validateRow(index, rowData, columnId = "") {
    let valid = true;
    Object.keys(rowData).forEach(column => {
      if (columnId && columnId !== column) {
        return;
      }
      const columnValue = rowData[column];
      const columnConfig = this.columns.find(col => col.columnId === column);
      const tempFormControl = new FormControl(columnValue, this.getValidators(columnConfig.validators) || []);
      if (tempFormControl.valid) {
        if (!this.rowErrors[index]) {
          this.rowErrors[index] = {};
        }
        this.rowErrors[index][column] = { error: false, errorMsg: "" };
      } else {
        valid = false;
        if (!this.rowErrors[index]) {
          this.rowErrors[index] = {};
        }
        this.rowErrors[index][column] = {
          error: true,
          errorMsg:
            columnConfig?.metaData?.errorMessage || this.getErrorMessages(tempFormControl.errors, columnConfig.label)[0]
        };
      }
    });
    return valid;
  }
  getErrorMessages = (errors: any, label: any) => {
    const errorMessages: string[] = [];
    Object.keys(errors).forEach(error => {
      switch (error) {
        case "required":
          errorMessages.push(`${label} is required`);
          break;
        case "minlength":
        case "maxlength":
          errorMessages.push(
            `Expected atleast length ${errors[error].requiredLength} but got ${errors[error].actualLength}`
          );
          break;
        case "min":
          errorMessages.push(`Expected atleast value ${errors[error].min} but got ${errors[error].actual}`);
          break;
        case "max":
          errorMessages.push(`Expected atleast value ${errors[error].max} but got ${errors[error].actual}`);
          break;
      }
    });
    return errorMessages;
  };
  getValidators = (validators: any) => {
    const _validators: any = [];
    Object.keys(validators).forEach(validator => {
      switch (validator) {
        case "minValue":
          validators[validator] && _validators.push(Validators.min(validators[validator]));
          break;
        case "minLength":
          validators[validator] && _validators.push(Validators.minLength(validators[validator]));
          break;
        case "maxValue":
          validators[validator] && _validators.push(Validators.max(validators[validator]));
          break;
        case "maxLength":
          validators[validator] && _validators.push(Validators.maxLength(validators[validator]));
          break;
        case "required":
          validators[validator] && _validators.push(Validators.required);
          break;
      }
    });
    return _validators;
  };
  addRow() {
    const newRow: any = {};
    this.columns.forEach(eachColumn => {
      Object.assign(newRow, { [eachColumn.columnId]: eachColumn?.value?.value || null });
    });
    this.tableData.push(newRow);
    this.tableData = [...this.tableData];
    if (this.isPaginationEnabled) {
      this.currentPage = Math.ceil(this.tableData.length / this.limitPerPage);
    } else {
      const tableBodyElement = document.querySelector(`#${this.tableId} .f-tbody`);
      setTimeout(() => {
        scrollToBottom(tableBodyElement);
      });
    }
    const rowIndex = this.tableData.length - 1;
    this.newRows[rowIndex] = newRow;
    this.modifyingData[rowIndex] = newRow;
    if (!this.actions.editRow) {
      if (!this.editCells[rowIndex]) {
        this.editCells[rowIndex] = {};
      }
      Object.keys(newRow).forEach(col => {
        this.editCells[rowIndex][col] = newRow[col];
      });
    }
  }
  handlePageChange($event) {
    this.currentPage = $event;
    if(this.isServerSidePagination){
      this.onPageChange.emit({limit: this.limitPerPage, page: $event})
    }
  }
  getTotalPages() {
    let pages = 0;
    if(this.isServerSidePagination){
      pages = Math.ceil(this.totalRecords / this.limitPerPage) || 1;
    }else {
      if (!this.tableFilters?.filtersEnabled) {
        pages = Math.ceil(this.tableData.length / this.limitPerPage) || 1
      } else {
        pages = Math.ceil(this.filteredTableData.length / this.limitPerPage) || 1;
      }
    }
    if(this.currentPage > pages){
      this.currentPage = pages;
    }
    return pages;
  }
  onSortChange($event) {
    const order = $event.direction === "asc" ? 1 : $event.direction === "desc" ? -1 : 0;
    this.tableData = this.tableData.sort((row1, row2) => {
      const value1 = row1[$event.column];
      const value2 = row2[$event.column];
      let result = null;
      if (value1 == null && value2 != null) {
        result = -1;
      } else if (value1 != null && value2 == null) {
        result = 1;
      } else if (value1 == null && value2 == null) {
        result = 0;
      } else if (typeof value1 === "string" && typeof value2 === "string") {
        result = value1.localeCompare(value2);
      } else {
        result = value1 < value2 ? -1 : value1 > value2 ? 1 : 0;
      }
      return order * result;
    });
    this.tableData = [...this.tableData];
  }

  getRulesFromFilterColumns(columns) {
    return (columns || []).map(column => {
      return {
        fieldId: column?.field?.columnId,
        condition: column.condition,
        dataType: column?.field?.type,
        operator: column.operator,
        value: column?.value
      };
    });
  }

  handleSearch(searchColumns) {
    const rules = this.getRulesFromFilterColumns(searchColumns);
    if (rules && rules.length) {
      this.filteredTableData = this.tableData.filter(rowData => {
        let condMatched = true;
        for (let i = 0; i < rules.length; i++) {
          const rule = rules[i];
          const fieldValue = rowData[rule?.fieldId];
          let result = false;
          if (rule.condition === "notEquals") {
            if (String(fieldValue) !== String(rule.value)) {
              result = true;
            }
          } else {
            if (String(fieldValue) === String(rule.value)) {
              result = true;
            }
          }
          condMatched = i === 0 ? result : rule.operator === "AND" ? condMatched && result : condMatched || result;
        }
        return condMatched;
      });
    } else {
      this.filteredTableData = [...this.tableData];
    }
  }
}
