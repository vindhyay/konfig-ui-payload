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
import {
  BaseWidget,
  CELL_ALIGNMENTS_TYPES,
  TABLE_OVERFLOW,
  TABLE_PAGINATION_POSITIONS,
  TableActions,
  WidgetTypes
} from "../../model/create-form.models";
import { DeepCopy, getUniqueId, scrollToBottom, superClone } from "../../../../utils";
import { Validators } from "@angular/forms";
import { PaginationDirective } from "../../../shared/finlevit-custom-inputs/finlevit-custom-table/table-utils/pagination.directive";
import { CustomTableFiltersComponent } from "../../../shared/finlevit-custom-inputs/finlevit-custom-table/table-utils/custom-table-filters/custom-table-filters.component";

const MIN_ROW_HEIGHT = 50;

@Component({
  selector: "finlevit-custom-adv-table",
  templateUrl: "./custom-adv-table.component.html",
  styleUrls: ["./custom-adv-table.component.scss"]
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
  _tableData = [];
  filteredTableData = [];
  @Input()
  set tableData(data) {
    this._tableData = data;
    this.filteredTableData = data;
  }
  get tableData() {
    return this._tableData;
  }
  @Input() hideHeader = false;
  @Input() actions: TableActions = null;
  @Output() onColDataChange = new EventEmitter();
  @Output() onRowClick = new EventEmitter();
  @Output() onPageChange = new EventEmitter();

  @Output() handleRowSave = new EventEmitter();
  @Output() handleRowDelete = new EventEmitter();
  @Output() onBtnClick = new EventEmitter();
  @Output() onOptionChange = new EventEmitter();
  @Output() onTableDataChange = new EventEmitter();
  @Input() viewMode = false;
  @Input() showEdit = false;
  @Input() isDisabled: boolean = false;
  @Input() editMode: boolean = false;
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
    this.columns.forEach(col => {
      sum = sum + Number(col.width);
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
  onEdit(rowIndex, rowData: Array<any>) {
    this.editRows[rowIndex] = rowData;
    const currentRow: any = {};
    (rowData || []).forEach(eachColumn => {
      currentRow[eachColumn?.metaData?.widgetId] = eachColumn?.value?.value;
    });
    this.modifyingData[rowIndex] = currentRow;
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
      const oldRowData = this.tableData[index];
      (oldRowData || []).forEach(eachColumn => {
        if (!eachColumn?.value) {
          eachColumn.value = {};
        }
        eachColumn.value.value = rowData[eachColumn?.metaData?.widgetId];
      });
      this.tableData = [...this.tableData];
    }
  }
  onColEdit($event, column: BaseWidget, rowIndex, rowData) {
    const colRowData = {};
    (this.tableData[rowIndex] || []).forEach(eachCol => {
      colRowData[eachCol?.metaData?.widgetId] = eachCol?.value?.value || null;
    });
    if (!this.editCells[rowIndex]) {
      this.editCells[rowIndex] = {};
    }
    this.editCells[rowIndex][column?.metaData?.widgetId] = colRowData[column?.metaData?.widgetId];
    this.modifyingData[rowIndex] = superClone(colRowData);
  }
  onColSave($event) {
    Object.keys(this.modifyingData).map(index => {
      const rowData = this.modifyingData[index];
      if (this.validateRow(index, this.modifyingData[index])) {
        const oldRowData = this.tableData[index];
        (oldRowData || []).forEach(eachColumn => {
          if (!eachColumn?.value) {
            eachColumn.value = {};
          }
          eachColumn.value.value = rowData[eachColumn?.metaData?.widgetId];
        });
        this.tableData = [...this.tableData];
        delete this.editRows[index];
        delete this.editCells[index];
        delete this.modifyingData[index];
      }
    });
  }
  onColSaveCancel($event) {
    this.editCells = {};
    this.modifyingData = {};
    this.editRows = {};
  }
  validateRow(index, rowData, column: BaseWidget = null) {
    return true;
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
    this.columns.forEach(eachColumn => {
        const column =  DeepCopy.copy(eachColumn);
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
    this.newRows[this.tableData.length - 1] = newRow;
    this.modifyingData[this.tableData.length - 1] = newRowData;
    this.tableData = [...this.tableData];
  }
  handlePageChange($event) {
    this.currentPage = $event;
  }
  getTotalPages() {
    if (!this.tableFilters?.filtersEnabled) {
      return Math.ceil(this.tableData.length / this.limitPerPage) || 1;
    } else {
      return Math.ceil(this.filteredTableData.length / this.limitPerPage) || 1;
    }
  }
  getRecordsText() {
    const start = this.currentPage === 1 ? 1 : (this.currentPage - 1) * this.limitPerPage + 1;
    const end =
      start + (this.limitPerPage - 1) < this.tableData.length ? start + this.limitPerPage - 1 : this.tableData.length;
    let msg = "";
    if (!this.tableData.length) {
      msg = "showing 0 results";
    } else {
      msg = "showing " + start + " - " + end + " of " + this.tableData.length;
    }
    return msg;
  }
  onSortChange($event) {
    const order = $event.direction === "asc" ? 1 : $event.direction === "desc" ? -1 : 0;
    this.tableData.sort((data1, data2) => {
      const value1Data = data1.find(cellData => cellData.metaData.widgetId === $event.column);
      const value2Data = data2.find(cellData => cellData.metaData.widgetId === $event.column);
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
    this.tableData = [...this.tableData];
  }

  getRulesFromFilterColumns(columns) {
    return (columns || []).map(column => {
      return {
        fieldId: column?.field?.widgetName,
        condition: column.condition,
        dataType: column?.field?.type,
        operator: column.operator,
        value: column?.value
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
          if (rule.operator === "notEquals") {
            if (String(fieldValue) !== String(rule.value)) {
              result = true;
            }
          } else {
            if (String(fieldValue) == String(rule.value)) {
              result = true;
            }
          }
          condMatched = i === 0 ? result : rule.condition === "AND" ? condMatched && result : condMatched || result;
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
}
