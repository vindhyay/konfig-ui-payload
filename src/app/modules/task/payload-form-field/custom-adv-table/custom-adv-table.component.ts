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
  ViewChild,
} from "@angular/core";
import {
  BaseWidget,
  CELL_ALIGNMENTS_TYPES,
  TABLE_OVERFLOW,
  TABLE_PAGINATION_POSITIONS,
  TableActions,
  WidgetTypes,
} from "../../model/create-form.models";
import { DeepCopy, getUniqueId, scrollToBottom, superClone } from "../../../../utils";
import { FormControl, Validators } from "@angular/forms";
import { PaginationDirective } from "../../../shared/finlevit-custom-table/table-utils/pagination.directive";
import { CustomTableFiltersComponent } from "../../../shared/finlevit-custom-table/table-utils/custom-table-filters/custom-table-filters.component";
import { resourceType } from "../payload-form-field.component";
import { ConfirmationService } from "primeng/api";
import * as moment from "moment";

const MIN_ROW_HEIGHT = 50;

@Component({
  selector: "finlevit-custom-adv-table",
  templateUrl: "./custom-adv-table.component.html",
  styleUrls: ["./custom-adv-table.component.scss"],
  providers: [ConfirmationService],
})
export class CustomAdvTableComponent implements OnInit, OnChanges, AfterViewInit {
  Object = Object;
  CellAlignTypes = CELL_ALIGNMENTS_TYPES;
  PaginatorPositionTypes = TABLE_PAGINATION_POSITIONS;
  OverflowTypes = TABLE_OVERFLOW;
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
  _columns: BaseWidget[] = [];
  @Input() isLoading = false;
  @Input() verticalBorder = true;
  @Input() horizontalBorder = true;
  @Input() tableBorder = true;
  @Input() isColumnEdit: boolean = false;
  @Input() dateFormat: string;
  @Input()
  set columns(columns) {
    this._columns = columns.map((column) => {
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

  @Input() saveBtnProperties: any = {};
  @Input() cancelBtnProperties: any = {};

  @Output() handleRowSave = new EventEmitter();
  @Output() handleRowDelete = new EventEmitter();
  @Output() onBtnClick = new EventEmitter();
  @Output() onOptionChange = new EventEmitter();
  @Output() onTableDataChange = new EventEmitter();
  @Input() isDisabled: boolean = false;
  @Input() onRowEdit: Function = null;
  @Input() onRowDelete: Function = null;
  @Input() rowEditConfigure: boolean = false;
  @Input() rowDeleteConfigure: boolean = false;
  tableId: any = null;
  editRows = {};
  editCells = {};
  newRows = {};
  modifyingData = {};
  rowErrors = {};

  //loading rows
  saveLoadingRows = {};
  deleteLoadingRows = {};

  // pagination related
  currentPage = 1;
  limitPerPage = 1;
  @ViewChild("tableBody", { static: false }) tableBody: ElementRef;
  @ViewChild("tableFilters", { static: false }) tableFilters: CustomTableFiltersComponent;
  @ViewChild("pagination", { static: false }) tablePagination: PaginationDirective;
  constructor(private confirmationService: ConfirmationService) {}

  isCellEditMode(col, rowIndex) {
    return (
      !col?.metaData?.readOnly &&
      (this.editRows[rowIndex] ||
        this.newRows[rowIndex] ||
        (this.editCells[rowIndex] && this.editCells[rowIndex].hasOwnProperty(col?.metaData?.widgetId)))
    );
  }
  isRowEditMode(rowIndex) {
    return this.editRows[rowIndex];
  }
  isNewRowEditMode(rowIndex) {
    return this.newRows[rowIndex];
  }
  get isEditRowExists() {
    return Object.keys(this.editRows)?.length || Object.keys(this.newRows)?.length;
  }

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
        if (this.isServerSidePagination) {
          this.onPageChange.emit({ limit: this.limitPerPage, page: this.currentPage });
        }
      }
    }, 100);
  }
  ngOnChanges(changes: SimpleChanges) {
    if (this.isPaginationEnabled) {
      this.currentPage = 1;
      this.updateRowsLimit();
    }
  }
  onResize($event, column: BaseWidget | TableActions) {
    column.width = parseInt($event, 10);
  }
  getMinWidth() {
    let sum = 0;
    this.columns.forEach((col) => {
      sum = sum + Number(col.width || 100);
    });
    if (this.actions?.editRow || this.actions?.deleteRow) {
      sum = sum + Number(this.actions?.width || 100);
    }
    return sum + "px";
  }
  doDelete(index) {
    this.deleteLoadingRows[index] = true;
    this.onRowDelete(this.tableData[index])
      .then(() => {
        this.deleteLoadingRows[index] = false;
        delete this.rowErrors[index];
        delete this.newRows[index];
        delete this.modifyingData[index];
      })
      .catch((error) => {
        this.deleteLoadingRows[index] = false;
      });
  }
  onDelete(index, rowData, isNew = false) {
    if (this.rowDeleteConfigure && !isNew) {
      this.confirmationService.confirm({
        message: "Are you sure that you want to delete this record?",
        accept: () => {
          this.doDelete(index);
        },
      });
    } else {
      this.tableData.splice(index, 1);
      delete this.rowErrors[index];
      delete this.newRows[index];
      delete this.modifyingData[index];
      this.handleRowDelete.emit({ index, rowData, isNew });
    }
  }
  onEdit(rowIndex, rowData: Array<any>) {
    this.editRows[rowIndex] = rowData;
    const currentRow: any = {};
    (rowData || []).forEach((eachColumn) => {
      currentRow[eachColumn?.metaData?.widgetId] = eachColumn?.value?.value;
    });
    this.modifyingData[rowIndex] = currentRow;
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
      if (this.rowEditConfigure && !isNew) {
        this.saveLoadingRows[index] = true;
        const updatedRowData = DeepCopy.copy(this.tableData[index]);
        (updatedRowData || []).forEach((eachColumn) => {
          if (!eachColumn?.value) {
            eachColumn.value = {};
          }
          eachColumn.value.value = rowData[eachColumn?.metaData?.widgetId];
        });
        this.onRowEdit(updatedRowData)
          .then(() => {
            this.saveLoadingRows[index] = false;
            delete this.editRows[index];
            delete this.rowErrors[index];
            delete this.modifyingData[index];
            delete this.editCells[index];
          })
          .catch((error) => {
            this.saveLoadingRows[index] = false;
          });
      } else {
        this.handleRowSave.emit({ index, rowData });
        if (isNew) {
          delete this.newRows[index];
        } else {
          delete this.editRows[index];
        }
        delete this.rowErrors[index];
        delete this.modifyingData[index];
        delete this.editCells[index];
        const oldRowData = this.tableData[index];
        (oldRowData || []).forEach((eachColumn) => {
          if (!eachColumn?.value) {
            eachColumn.value = {};
          }
          eachColumn.value.value = rowData[eachColumn?.metaData?.widgetId];
        });
      }
    }
  }
  onColEdit($event, column: BaseWidget, rowIndex, rowData) {
    const colRowData = {};
    (this.tableData[rowIndex] || []).forEach((eachCol) => {
      colRowData[eachCol?.metaData?.widgetId] = eachCol?.value?.value || null;
    });
    if (!this.editCells[rowIndex]) {
      this.editCells[rowIndex] = {};
    }
    this.editCells[rowIndex][column?.metaData?.widgetId] = colRowData[column?.metaData?.widgetId];
    if (!this.modifyingData[rowIndex]) {
      this.modifyingData[rowIndex] = superClone(colRowData);
    }
  }
  onColSave($event) {
    Object.keys(this.modifyingData).map((index) => {
      const rowData = this.modifyingData[index];
      if (this.validateRow(index, rowData)) {
        const oldRowData = this.tableData[index];
        (oldRowData || []).forEach((eachColumn) => {
          if (!eachColumn?.value) {
            eachColumn.value = {};
          }
          eachColumn.value.value = rowData[eachColumn?.metaData?.widgetId];
        });
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
    Object.keys(this.modifyingData).forEach((rowIndex) => {
      if (this.newRows[rowIndex]) {
        this.onDelete(rowIndex, this.modifyingData[rowIndex], true);
      }
    });
    this.modifyingData = {};
    this.editRows = {};
  }
  validateRow(index, rowData, columnData: BaseWidget = null) {
    let valid = true;
    this.columns.forEach((eachCol) => {
      if (
        columnData &&
        columnData?.metaData?.widgetId &&
        columnData?.metaData?.widgetId !== eachCol.metaData.widgetId
      ) {
        return;
      }
      const columnValue = rowData[eachCol?.metaData?.widgetId];
      const tempFormControl = new FormControl(columnValue, this.getValidators(eachCol.validators) || []);
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
          errorMsg: eachCol?.metaData?.errorMessage || this.getErrorMessages(tempFormControl.errors, eachCol.label)[0],
        };
      }
    });
    return valid;
  }
  getErrorMessages = (errors: any, label: any) => {
    const errorMessages: string[] = [];
    Object.keys(errors).forEach((error) => {
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
    Object.keys(validators).forEach((validator) => {
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
    const newRowData = {};
    this.columns.forEach((eachColumn) => {
      const column = DeepCopy.copy(eachColumn);
      column.value.value = column?.value?.value || null;
      newRow.push(column);
      newRowData[eachColumn?.metaData?.widgetId] = column?.value?.value;
    });
    this.tableData.push(newRow);
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
    this.modifyingData[rowIndex] = newRowData;
    if (!this.actions?.editRow) {
      if (!this.editCells[rowIndex]) {
        this.editCells[rowIndex] = {};
      }
      Object.keys(newRow).forEach((col) => {
        this.editCells[rowIndex][col] = newRow[col];
      });
    }
  }
  handlePageChange($event) {
    this.currentPage = $event;
    if (this.isServerSidePagination) {
      this.onPageChange.emit({ limit: this.limitPerPage, page: $event });
    }
  }
  getTotalPages() {
    let pages = 0;
    if (this.isServerSidePagination) {
      pages = Math.ceil(this.totalRecords / this.limitPerPage) || 1;
    } else {
      if (!this.tableFilters?.filtersEnabled) {
        pages = Math.ceil(this.tableData.length / this.limitPerPage) || 1;
      } else {
        pages = Math.ceil(this.filteredTableData.length / this.limitPerPage) || 1;
      }
    }
    if (this.currentPage > pages) {
      this.currentPage = pages;
    }
    return pages;
  }
  onSortChange($event) {
    const order = $event.direction === "asc" ? 1 : $event.direction === "desc" ? -1 : 0;
    this.tableData.sort((data1, data2) => {
      const value1Data = data1.find((cellData) => cellData.metaData.widgetId === $event.column);
      const value2Data = data2.find((cellData) => cellData.metaData.widgetId === $event.column);
      const value1 = value1Data?.value?.value;
      const value2 = value2Data?.value?.value;
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
  }

  getRulesFromFilterColumns(columns) {
    return (columns || []).map((column) => {
      return {
        fieldId: column?.field?.widgetName,
        condition: column.condition,
        dataType: column?.field?.type,
        operator: column.operator,
        value: column?.value,
      };
    });
  }

  handleSearch(searchFormValue) {
    const rules = this.getRulesFromFilterColumns(searchFormValue);
    if (rules && rules.length) {
      this.filteredTableData = this.tableData.filter((rowData: BaseWidget[]) => {
        const rowDataInObject = {};
        rowData.forEach((cellData: BaseWidget) => {
          rowDataInObject[cellData.widgetName] = cellData?.value?.value;
        });
        let condMatched = true;
        for (let i = 0; i < rules.length; i++) {
          const rule = rules[i];
          const fieldValue = rowDataInObject[rule?.fieldId];
          let result = false;
          if (rule.condition === "notEquals") {
            if (String(fieldValue) !== String(rule.value)) {
              result = true;
            }
          } else {
            if (String(fieldValue) == String(rule.value)) {
              result = true;
            }
          }
          condMatched = i === 0 ? result : rule.operator === "AND" ? condMatched && result : condMatched || result;
        }
        return condMatched;
      });
      this.filteredTableData = [...this.filteredTableData];
    } else {
      this.filteredTableData = [];
    }
  }
  optionChange($event, data) {
    this.onOptionChange.emit({ event: $event, data });
  }

  calculateCellValue(col, rowIndex) {
    if (col?.metaData?.isFormulaField) {
      let cellValue = "";
      let columnFormula = col?.metaData?.formula;
      let firstColumn = columnFormula?.find((column) => column?.resourceType === resourceType.PAYLOAD_FIELD);
      switch (firstColumn?.type) {
        case "number":
          if (rowIndex > -1) {
            cellValue = this.calculateNumberFormula(col, rowIndex, columnFormula);
            this.tableData[rowIndex].forEach((row) => {
              if (row?.metaData?.widgetId === col?.metaData?.widgetId) {
                row.value.value = cellValue;
              }
            });
            if (col?.metaData?.currency) {
              cellValue = col?.metaData?.currency?.currencySymbol + " " + cellValue;
            }
          }
          return cellValue;
        case "string":
          if (rowIndex) {
            cellValue = this.calculateStringFormula(col, rowIndex, columnFormula);
            this.tableData[rowIndex].forEach((row) => {
              if (row?.metaData?.widgetId === col?.metaData?.widgetId) {
                row.value.value = cellValue;
              }
            });
          }
          return cellValue;
        case "date":
          if (rowIndex) {
            cellValue = this.calculateDateFormula(col, rowIndex, columnFormula);
            this.tableData[rowIndex]?.forEach((row) => {
              if (row?.metaData?.widgetId === col?.metaData?.widgetId) {
                row.value.value = cellValue;
              }
            });
          }
          return cellValue;
      }
      return cellValue;
    } else {
      return col?.value?.value;
    }
  }

  calculateNumberFormula(col, rowIndex, columnFormula) {
    let expression = "";
    let cellValue;
    columnFormula.forEach((field) => {
      if (field?.resourceType === resourceType.PAYLOAD_FIELD) {
        this.tableData[rowIndex].forEach((row) => {
          if (row?.metaData?.widgetId === field?.metaData?.widgetId) {
            if (row?.value?.value === null) {
              row.value.value = undefined;
            }
            if (row?.value?.value) {
              expression = expression + " " + row.value.value;
            }
          }
        });
      }
      if (field?.resourceType === resourceType.BRACKET) {
        expression = expression + " " + field?.displayName;
      }
      if (field?.resourceType === resourceType.FUNCTION && String(expression).length > 0) {
        expression = expression + " " + field?.expression;
      }
    });
    let evaluate;
    try {
      evaluate = eval(expression);
    } catch (e) {
      console.log(e);
    }
    if (evaluate === Infinity) {
      cellValue = "∞";
    } else if (isNaN(evaluate)) {
      cellValue = undefined;
    } else {
      cellValue = eval(expression) || null;
    }
    return cellValue;
  }

  calculateStringFormula(col, rowIndex, columnFormula) {
    let cellValue;
    columnFormula?.forEach((field) => {
      if (field?.resourceType === resourceType.PAYLOAD_FIELD) {
        this.tableData[rowIndex].forEach((row) => {
          if (row?.metaData?.widgetId === field?.metaData?.widgetId && row?.value?.value) {
            cellValue = cellValue + row.value.value;
          }
        });
      }
      if (field?.resourceType === resourceType.FUNCTION) {
        if (field?.separateBy && cellValue) {
          cellValue = cellValue + field.separateBy;
        }
      }
    });
    return cellValue;
  }

  calculateDateFormula(col, rowIndex, columnFormula) {
    let cellValue;
    const dateFunc = columnFormula.filter((field) => {
      return field?.resourceType === resourceType.FUNCTION;
    });
    let date1;
    let date2;
    const dateIndex = columnFormula?.indexOf(dateFunc[0]);
    if (dateIndex > -1) {
      if (columnFormula[dateIndex - 1]?.displayName === "Current Date") {
        date1 = new Date();
      } else {
        this.tableData[rowIndex]?.forEach((row) => {
          if (row?.metaData?.widgetId === columnFormula[dateIndex - 1]?.metaData?.widgetId && row?.value?.value) {
            date1 = moment.utc(row.value.value).toDate();
          }
        });
      }
      if (columnFormula[dateIndex + 1]?.displayName === "Current Date") {
        date2 = new Date();
      } else {
        this.tableData[rowIndex]?.forEach((row) => {
          if (row?.metaData?.widgetId === columnFormula[dateIndex + 1]?.metaData?.widgetId && row?.value?.value) {
            date2 = moment.utc(row.value.value).toDate();
          }
        });
      }
      let d = moment(date2);
      let years = d.diff(date1, "years");
      d.add(-years, "years");
      if (years) {
        cellValue = years + "";
      }
    }
    return cellValue;
  }
}
