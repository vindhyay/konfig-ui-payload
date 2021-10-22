import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { BaseWidget, TableActions, WidgetTypes } from "../../model/create-form.models";
import { getErrorMessages, getUniqueId, getValidators, scrollToBottom, superClone } from "../../../../utils";
import { FormControl } from "@angular/forms";
import { SortEvent } from "primeng/api";

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
  filteredTableData = [];
  filterEnable = false;
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
  @Input() actionCol: TableActions = {} as TableActions;
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
      const column = superClone(eachColumn);
      column.value.value = column?.value?.value || null;
      newRow.push(column);
    });
    this.tableData.push(newRow);
    const tableBodyElement = document.querySelector(`#${this.tableId} .p-datatable-tbody`);
    this.newRows[this.tableData.length - 1] = newRow;
    setTimeout(() => {
      scrollToBottom(tableBodyElement);
    });
  }
  customSort(event: SortEvent) {
    event.data.sort((data1, data2) => {
      const value1Data = data1.find(cellData => cellData.widgetName === event.field);
      const value2Data = data2.find(cellData => cellData.widgetName === event.field);
      let value1 = value1Data?.value?.value;
      let value2 = value2Data?.value?.value;
      let result = null;
      if (value1 == null && value2 != null)
        result = -1;
      else if (value1 != null && value2 == null)
        result = 1;
      else if (value1 == null && value2 == null)
        result = 0;
      else if (typeof value1 === 'string' && typeof value2 === 'string')
        result = value1.localeCompare(value2);
      else
        result = (value1 < value2) ? -1 : (value1 > value2) ? 1 : 0;

      return (event.order * result);
    });
  }
  handleSearch(rules){
    if(rules && rules.length){
      this.filterEnable = true
      this.filteredTableData = this.tableData.filter((rowData: BaseWidget[]) => {
        const rowDataInObject = {};
        rowData.forEach((cellData: BaseWidget) => {
          rowDataInObject[cellData.widgetName] = cellData?.value?.value
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
    }else{
      this.filterEnable = false;
      this.filteredTableData = [];
    }
  }
}
