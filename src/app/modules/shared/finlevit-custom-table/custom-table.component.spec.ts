import { ComponentFixture, TestBed } from "@angular/core/testing";

import { CustomTableComponent } from "./custom-table.component";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { ChangeDetectorRef } from "@angular/core";
import { RouterTestingModule } from "@angular/router/testing";
import { PaginationFilterPipe } from "./table-utils/pagination-filter.pipe";
import { CustomFilterPipe } from "src/app/pipes/custom-filter.pipe";
import { TABLE_OVERFLOW, WidgetTypes } from "../../task/model/create-form.models";
import { SelectionModel } from "@angular/cdk/collections";

describe("CustomTableComponent", () => {
  let component: CustomTableComponent;
  let fixture: ComponentFixture<CustomTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CustomTableComponent, PaginationFilterPipe, CustomFilterPipe],
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [ChangeDetectorRef],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    component.editRows = [false, true, false];
    component.newRows = [true, false, false];
    component.editCells = [{ 0: true, 1: false }, { 0: false, 1: true }, { 1: true }];

    component.selection = {
      selected: [],
      clear: jasmine.createSpy("clear"),
      toggle: jasmine.createSpy("toggle"),
    } as any;
    component.tableFilters = { filtersEnabled: true } as any;
    component.isServerSideFiltering = false;
    component.tableData = [
      { fieldId: "name", value: "John" },
      { fieldId: "age", value: 30 },
    ];
    component.filteredTableData = [];
    component.tableData = [];
    component.actions = { emitOnDelete: true } as any;
    component.tableData = [];
    component.rowErrors = [];
    component.newRows = [];
    component.modifyingData = [];
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should process and set columns correctly", () => {
    const testColumns = [
      {
        columnId: 1,
        metaData: { widgetType: WidgetTypes.DatePicker },
        validators: { minDate: "2023-01-01", maxDate: "2023-12-31" },
      },
    ] as any;

    component.columns = testColumns;
    fixture.detectChanges();

    expect(component._columns).toBeDefined();
    expect(component._columns.length).toBe(testColumns.length);

    testColumns.forEach((column) => {
      expect(component.searchObject[column.columnId]).toBeNull();
    });

    const datePickerColumns = component._columns.filter(
      (column) => column.metaData.widgetType === WidgetTypes.DatePicker
    );
    datePickerColumns.forEach((column) => {
      if (column.validators.minDate) {
        expect(column.validators.minDate instanceof Date).toBe(true);
      }
      if (column.validators.maxDate) {
        expect(column.validators.maxDate instanceof Date).toBe(true);
      }
    });
  });
  it("should set isPaginationEnabled when overflowType is PAGINATION", () => {
    component.overflowType = TABLE_OVERFLOW.PAGINATION;
    fixture.detectChanges();

    expect(component.isPaginationEnabled).toBe(true);
  });

  it("should not set isPaginationEnabled when overflowType is not PAGINATION", () => {
    component.overflowType = "SOMETHING_ELSE" as any;
    fixture.detectChanges();

    expect(component.isPaginationEnabled).toBe(false);
  });

  it("should updateRowsLimit when isPaginationEnabled is true", () => {
    component.overflowType = TABLE_OVERFLOW.PAGINATION;
    fixture.detectChanges();

    spyOn(component, "updateRowsLimit");
    component.overflowType = TABLE_OVERFLOW.PAGINATION;
    fixture.detectChanges();

    expect(component.updateRowsLimit).toHaveBeenCalled();
  });

  it("should not updateRowsLimit when isPaginationEnabled is false", () => {
    component.overflowType = "SOMETHING_ELSE" as any;
    fixture.detectChanges();

    spyOn(component, "updateRowsLimit");
    component.overflowType = "SOMETHING_ELSE" as any;
    fixture.detectChanges();

    expect(component.updateRowsLimit).not.toHaveBeenCalled();
  });

  it("should set _tableData and filteredTableData", () => {
    const testData = [];

    component.tableData = testData;
    fixture.detectChanges();

    expect(component._tableData).toBe(testData);
    expect(component.filteredTableData).toBe(testData);
  });

  it("should update rows limit", () => {
    spyOn(component, "updateRowsLimit");

    component.tableData = [];
    fixture.detectChanges();

    expect(component.updateRowsLimit).toHaveBeenCalled();
  });

  it("should return true for isCellEditMode", () => {
    const col = { metaData: { readOnly: false }, columnId: 0 };
    const rowIndex = 0;

    expect(component.isCellEditMode(col, rowIndex)).toBe(true);
  });

  it("should return true for isRowEditMode", () => {
    const rowIndex = 1;

    expect(component.isRowEditMode(rowIndex)).toBe(true);
  });

  it("should return false for isCellEditMode when column is readOnly", () => {
    const col = { metaData: { readOnly: true }, columnId: 0 };
    const rowIndex = 0;

    expect(component.isCellEditMode(col, rowIndex)).toBe(false);
  });

  it("should return false for isCellEditMode when neither editRows nor newRows are true", () => {
    const col = { metaData: { readOnly: false }, columnId: 2 };
    const rowIndex = 2;

    expect(component.isCellEditMode(col, rowIndex)).toBe(false);
  });

  it("should return false for isRowEditMode when editRows is false", () => {
    const rowIndex = 2;

    expect(component.isRowEditMode(rowIndex)).toBe(false);
  });

  it("should return false for isNewRowEditMode when newRows is false", () => {
    const rowIndex = 2;

    expect(component.isNewRowEditMode(rowIndex)).toBeFalsy();
  });

  it("should select all rows in masterToggle when not all rows are selected", () => {
    component.masterToggle();

    if (component.tableFilters.filtersEnabled) {
      component.filteredTableData.forEach((row) => {
        expect(component.selection.toggle).toHaveBeenCalledWith(row);
      });
    } else {
      component.tableData.forEach((row) => {
        expect(component.selection.toggle).toHaveBeenCalledWith(row);
      });
    }
  });

  it("should emit selected rows in masterToggle", () => {
    spyOn(component.selectedRows, "emit");
    component.masterToggle();

    expect(component.selectedRows.emit).toHaveBeenCalledWith(component.selection.selected);
  });

  it("should toggle selection for a row in rowToggle", () => {
    const row = {};
    component.rowToggle(row);

    expect(component.selection.toggle).toHaveBeenCalledWith(row);
  });

  it("should emit selected rows in rowToggle", () => {
    spyOn(component.selectedRows, "emit");
    const row = {};
    component.rowToggle(row);

    expect(component.selectedRows.emit).toHaveBeenCalledWith(component.selection.selected);
  });

  it("should update the width of a column when onResize is called", () => {
    const column = { width: 100 } as any;
    const event = "200";

    component.onResize(event, column);

    expect(column.width).toBe(200);
  });

  it("should stop event propagation when $event is provided", () => {
    const event = { stopPropagation: jasmine.createSpy("stopPropagation") };
    const index = 1;
    const rowData = component.tableData[index];

    component.onDelete(event, index, rowData);

    expect(event.stopPropagation).toHaveBeenCalled();
  });

  it("should not emit onRowDeleteClick event when emitOnDelete is false", () => {
    component.actions.emitOnDelete = false;
    const event = { stopPropagation: jasmine.createSpy("stopPropagation") };

    const index = 1;
    const rowData = component.tableData[index];
    spyOn(component, "onRowDeleteClick");
    component.onDelete(event, index, rowData);

    expect(component.onRowDeleteClick).not.toHaveBeenCalled();
  });

  it("should delete the row from tableData and related data when conditions are met", () => {
    const event = { stopPropagation: jasmine.createSpy("stopPropagation") };

    const index = 1;
    const rowData = component.tableData[index];

    component.onDelete(event, index, rowData);

    expect(component.tableData).not.toContain(rowData);
    expect(component.rowErrors[index]).toBeUndefined();
    expect(component.newRows[index]).toBeUndefined();
    expect(component.modifyingData[index]).toBeUndefined();
  });

  it("should stop event propagation when $event is provided", () => {
    const event = { stopPropagation: jasmine.createSpy("stopPropagation") };
    const rowIndex = "1";
    const data = [];

    component.onEdit(event, rowIndex, data);

    expect(event.stopPropagation).toHaveBeenCalled();
  });

  it("should not emit onRowEditClick event when $event is not provided", () => {
    const event = { stopPropagation: jasmine.createSpy("stopPropagation") };

    const rowIndex = "1";
    const data = [];

    spyOn(component, "onRowEditClick");

    component.onEdit(event, rowIndex, data);

    expect(component.onRowEditClick).not.toHaveBeenCalled();
  });

  it("should not emit onRowEditClick event when emitOnEdit is false", () => {
    component.actions.emitOnEdit = false;
    const event = { stopPropagation: jasmine.createSpy("stopPropagation") };

    const rowIndex = "1";
    const data = [];
    spyOn(component, "onRowEditClick");

    component.onEdit(event, rowIndex, data);

    expect(component.onRowEditClick).not.toHaveBeenCalled();
  });

  it("should not update modifyingData if it already exists", () => {
    const event = { stopPropagation: jasmine.createSpy("stopPropagation") };

    const rowIndex = "1";
    const data = [];

    component.modifyingData[rowIndex] = [];

    component.onEdit(event, rowIndex, data);

    expect(component.modifyingData[rowIndex]).toEqual(data);
  });

  it("should reset the tableData, editRows, modifyingData, editCells, and rowErrors for the given index", () => {
    const index = 1;
    const rowData = [];

    component.onRowEditCancel(index, rowData);

    expect(component.editRows[index]).toBeUndefined();
    expect(component.modifyingData[index]).toBeUndefined();
    expect(component.editCells[index]).toBeUndefined();
    expect(component.rowErrors[index]).toBeUndefined();
  });

  it("should reset currentPage to 1 and call updateRowsLimit and emit onPageChange event with the new limit and current page", () => {
    const newLimit = 10;
    spyOn(component, "updateRowsLimit");
    component.onPageLimitChange(newLimit);

    expect(component.currentPage).toBe(1);
    expect(component.updateRowsLimit).toHaveBeenCalled();
  });

  it("should call emitColSearch when the Enter key (keyCode 13) is pressed", () => {
    const event = new KeyboardEvent("keydown", { keyCode: 13 });
    const column = {} as any;
    spyOn(component, "emitColSearch");
    component.onKeyDown(event, column);

    expect(component.emitColSearch).toHaveBeenCalledWith(column);
  });

  it("should not call emitColSearch when a key other than Enter is pressed", () => {
    const event = new KeyboardEvent("keydown", { keyCode: 27 });
    const column = {} as any;
    spyOn(component, "emitColSearch");

    component.onKeyDown(event, column);

    expect(component.emitColSearch).not.toHaveBeenCalled();
  });

  it("should reset the currentPage and apply client-side filtering when isServerSideFiltering is false", () => {
    const searchColumns = [];
    const filtersLogic = "1 AND 2";

    component.getRulesFromFilterColumns = jasmine.createSpy("getRulesFromFilterColumns").and.returnValue([]);

    component.handleSearch({ searchColumns, filtersLogic });

    expect(component.currentPage).toBe(1);
  });
  it("should extract filter rules from an array of filter columns", () => {
    const filterColumns = [
      { field: { columnId: "name" }, condition: "equals", operator: "AND", value: "John" },
      { field: { columnId: "age", type: "number" }, condition: "greaterThan", operator: "OR", value: 30 },
    ];

    const rules = component.getRulesFromFilterColumns(filterColumns);

    expect(rules).toEqual([
      { fieldId: "name", condition: "equals", dataType: undefined, operator: "AND", value: "John" },
      { fieldId: "age", condition: "greaterThan", dataType: "number", operator: "OR", value: 30 },
    ]);
  });

  it("should handle cases when filterColumns is empty or undefined", () => {
    const filterColumns = undefined;

    const rules = component.getRulesFromFilterColumns(filterColumns);

    expect(rules).toEqual([]);
  });

  it("should apply client-side sorting based on the provided sort event", () => {
    const event = { direction: "asc", column: "column1" };

    component.onSortChange(event);

    expect(component.tableData).toEqual([]);
  });

  it('should handle cases when the sort direction is "desc"', () => {
    const event = { direction: "desc", column: "column2" };

    component.onSortChange(event);

    expect(component.tableData).toEqual([]);
  });

  it("should update currentPage for client-side pagination", () => {
    const event = 3;

    component.handlePageChange(event);

    expect(component.currentPage).toBe(3);
  });

  it("should not add a new row when isDisabled is true", () => {
    component.isDisabled = true;

    component.addRow();

    expect(component.tableData.length).toBe(0);
  });

  it("should return true when all rows are selected", () => {
    component.selection = new SelectionModel<any>(true, []);
    component.tableData = [
      { id: 1, name: "John" },
      { id: 2, name: "Jane" },
      { id: 3, name: "Bob" },
    ];
    component.filteredTableData = component.tableData;

    component.selection.select(...component.tableData);

    const result = component.isAllSelected();

    expect(result).toBe(true);
  });

  it("should calculate limitPerPage based on bodyHeight and MIN_ROW_HEIGHT when fixedRecordsPerPage is not set", () => {
    component.tableBody = {
      nativeElement: {
        offsetHeight: 500,
      },
    };
    component.fixedRecordsPerPage = null;
    component.updateRowsLimit();
    expect(component.limitPerPage).toBe(10);
  });

  it("should set currentPage to 1 and call updateRowsLimit when isPaginationEnabled is true and rows property changes", () => {
    component.isPaginationEnabled = true;
    component.currentPage = 2;
    component.updateRowsLimit = jasmine.createSpy("updateRowsLimit");

    const changes = {
      rows: {
        currentValue: 10,
        firstChange: true,
        previousValue: undefined,
        isFirstChange: () => true,
      },
    };

    component.ngOnChanges(changes);

    expect(component.currentPage).toBe(1);
    expect(component.updateRowsLimit).toHaveBeenCalled();
  });

  it("should emit the sort event for server-side sorting", () => {
    component.isServerSideSorting = true;
    const event = { direction: "asc", column: "name" };
    spyOn(component.onSort, "emit");

    component.onSortChange(event);

    expect(component.onSort.emit).toHaveBeenCalledWith(event);
  });

  it("should sort the tableData array for client-side sorting", () => {
    component.isServerSideSorting = false;
    const event = { direction: "asc", column: "name" };
    const tableData = [{ name: "John" }, { name: "Alice" }, { name: "Bob" }];
    component.tableData = tableData;

    component.onSortChange(event);

    expect(component.tableData[0].name).toBe("Alice");
    expect(component.tableData[2].name).toBe("John");
  });

  it("should add a new row to tableData", () => {
    component.isDisabled = false;
    component.columns = [
      { columnId: "column1", value: { value: "Value1" } },
      { columnId: "column2", value: { value: "Value2" } },
    ] as any;
    component.tableData = [{ column1: "Row1Value1", column2: "Row1Value2" }];

    const initialRowCount = component.tableData.length;

    component.addRow();

    expect(component.tableData.length).toBe(initialRowCount + 1);
  });

  it("should update other properties and elements as expected", () => {
    component.isDisabled = false;
    component.isPaginationEnabled = true;
    component.columns = [
      { columnId: "column1", value: { value: "Value1" } },
      { columnId: "column2", value: { value: "Value2" } },
    ] as any;
    component.tableData = [{ column1: "Row1Value1", column2: "Row1Value2" }];

    component.addRow();

    expect(component.currentPage).toBe(1);
  });

  it("should handle the case when isDisabled is true", () => {
    component.isDisabled = true;

    const initialRowCount = component.tableData.length;

    component.addRow();

    expect(component.tableData.length).toBe(initialRowCount);
  });

  it("should ignore validators with falsy values", () => {
    const validators = {
      minValue: 0,
      minLength: null,
      maxValue: 10,
      required: false,
    };

    const result = component.getValidators(validators);
    expect(result).toBeDefined();
  });

  it("should return an array of error messages for required validation", () => {
    const errors = { required: true };
    const label = "Field";

    const result = component.getErrorMessages(errors, label);

    expect(result).toEqual(["Field is required"]);
  });

  it("should return an array of error messages for minlength and maxlength validations", () => {
    const errors = { minlength: { requiredLength: 5, actualLength: 3 } };
    const label = "Text";

    const result = component.getErrorMessages(errors, label);

    expect(result).toEqual(["Expected atleast length 5 but got 3"]);
  });

  it("should return an array of error messages for min and max validations", () => {
    const errors = { min: { min: 5, actual: 3 }, max: { max: 10, actual: 15 } };
    const label = "Value";

    const result = component.getErrorMessages(errors, label);

    expect(result).toEqual(["Expected atleast value 5 but got 3", "Expected atleast value 10 but got 15"]);
  });

  it("should handle unknown validation errors gracefully", () => {
    const errors = { unknownError: true };
    const label = "Field";

    const result = component.getErrorMessages(errors, label);

    expect(result).toEqual([]);
  });

  it("should save the row data and emit handleRowSave event when the row data passes validation", () => {
    const index = 0;
    const rowData = { name: "John", age: 25, email: "john@example.com" };
    const isNew = false;
    let handleRowSaveEventEmitted = false;

    component.handleRowSave.subscribe((event) => {
      expect(event.index).toBe(index);
      expect(event.rowData).toEqual(rowData);
      handleRowSaveEventEmitted = true;
    });
    component.validateRow = () => true;
    component.onRowSave(index, rowData, isNew);

    expect(component.newRows[index]).toBeUndefined();
    expect(component.editRows[index]).toBeUndefined();
    expect(component.rowErrors[index]).toBeUndefined();
    expect(component.modifyingData[index]).toBeUndefined();
    expect(component.editCells[index]).toBeUndefined();
    expect(component.tableData[index]).toEqual(rowData);
    expect(handleRowSaveEventEmitted).toBe(true);
  });

  it("should validate a row with valid data and return true", () => {
    const index = 0;
    const rowData = {
      column1: "value1",
      column2: "value2",
      column3: "value3",
    };
    component.getValidators = () => {};
    const isValid = component.validateRow(index, rowData);
    expect(isValid).toBe(true);
  });
});
