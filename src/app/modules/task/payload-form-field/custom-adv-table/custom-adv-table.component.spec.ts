import { ComponentFixture, TestBed } from "@angular/core/testing";

import { CustomAdvTableComponent } from "./custom-adv-table.component";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { RouterTestingModule } from "@angular/router/testing";
import { ConfirmationService } from "primeng/api";
import { PaginationFilterPipe } from "src/app/modules/shared/finlevit-custom-table/table-utils/pagination-filter.pipe";
import { FilterPipe } from "src/app/pipes/filter.pipe";
import { BaseWidget, CELL_ALIGNMENTS_TYPES, Column, WidgetTypes } from "../../model/create-form.models";
import { PaginationDirective } from "../../../shared/finlevit-custom-table/table-utils/pagination.directive";

describe("CustomAdvTableComponent", () => {
  let component: CustomAdvTableComponent;
  let fixture: ComponentFixture<CustomAdvTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CustomAdvTableComponent, PaginationFilterPipe, FilterPipe, PaginationDirective],
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [ConfirmationService],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomAdvTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should return true for visible columns", () => {
    const mockColumns = [
      { displayName: "Column1", metaData: { isHidden: false } },
      { displayName: "Column2", metaData: { isHidden: true } },
    ] as any;

    component.columns = mockColumns;

    const result = component.rowDataColumnsFilterFn(mockColumns[0]);

    expect(result).toBeTrue();
  });

  it("should return false for hidden columns", () => {
    const mockColumns = [
      { displayName: "Column1", metaData: { isHidden: false } },
      { displayName: "Column2", metaData: { isHidden: true } },
    ] as any;

    component.columns = mockColumns;

    const result = component.rowDataColumnsFilterFn(mockColumns[1]);

    expect(result).toBeFalsy();
  });

  it("should return false for undefined columns", () => {
    component.columns = [];

    const result = component.rowDataColumnsFilterFn(undefined);

    expect(result).toBeFalsy();
  });

  it("should emit an event with $event and data when optionChange is called", () => {
    const eventData = { event: "sampleEvent", data: "sampleData" };
    spyOn(component.onOptionChange, "emit");

    component.optionChange(eventData.event, eventData.data);

    expect(component.onOptionChange.emit).toHaveBeenCalledWith(eventData);
  });

  it("should return the value property of the column when calculateCellValue is called", () => {
    const col = { value: { value: "columnValue" } };
    const rowIndex = 0;

    const result = component.calculateCellValue(col, rowIndex);

    expect(result).toBe(col.value.value);
  });

  it("should return undefined for a column with no value property", () => {
    const col = { noValueProperty: "someData" };
    const rowIndex = 0;

    const result = component.calculateCellValue(col, rowIndex);

    expect(result).toBeUndefined();
  });

  it("should handle empty searchColumns", () => {
    const searchColumns = [];
    const filtersLogic = "1 AND 2";

    component.handleSearch({ searchColumns, filtersLogic });

    expect(component.filteredTableData).toEqual([]);
  });

  it("should set _tableData and filteredTableData when tableData is set", () => {
    const testData = [
      { id: 1, name: "Item 1" },
      { id: 2, name: "Item 2" },
    ];

    component.tableData = testData;

    expect(component._tableData).toEqual(testData);
    expect(component.filteredTableData).toEqual(testData);
  });

  it("should call updateRowsLimit when tableData is set", () => {
    spyOn(component, "updateRowsLimit");

    component.tableData = [];

    expect(component.updateRowsLimit).toHaveBeenCalled();
  });

  it("should return true for isCellEditMode when rowIndex is in editRows or newRows", () => {
    component.editRows = [false, true, false];
    component.newRows = [false, false, true];

    expect(component.isCellEditMode(0, 1)).toBe(true);
    expect(component.isCellEditMode(1, 1)).toBe(true);
  });

  it("should return true for isRowEditMode when rowIndex is in editRows", () => {
    component.editRows = [false, true, false];

    expect(component.isRowEditMode(0)).toBe(false);
    expect(component.isRowEditMode(1)).toBe(true);
    expect(component.isRowEditMode(2)).toBe(false);
  });

  it("should return true for isNewRowEditMode when rowIndex is in newRows", () => {
    component.newRows = [false, true, false];

    expect(component.isNewRowEditMode(0)).toBe(false);
    expect(component.isNewRowEditMode(1)).toBe(true);
    expect(component.isNewRowEditMode(2)).toBe(false);
  });

  it("should update the width of the column", () => {
    const column = { width: 100 } as any;
    const newWidth = "200";

    component.onResize(newWidth, column);

    expect(column.width).toBe(200);
  });

  it("should parse the event as an integer", () => {
    const column = { width: 100 } as any;
    const newWidth = "300";

    component.onResize(newWidth, column);

    expect(column.width).toBe(300);
  });

  it("should handle non-integer input", () => {
    const column = { width: 100 } as any;
    const newWidth = "invalidValue";

    component.onResize(newWidth, column);

    expect(column.width).toBeNaN();
  });

  it("should delete a row from the table data when the index is valid", (done) => {
    const tableData = [
      { id: 1, name: "John" },
      { id: 2, name: "Jane" },
      { id: 3, name: "Bob" },
    ];

    const onRowDelete = (rowData) => {
      return new Promise<void>((resolve, reject) => {
        setTimeout(() => {
          const index = tableData.findIndex((data) => data.id === rowData.id);
          if (index !== -1) {
            tableData.splice(index, 1);
            resolve();
          } else {
            reject("Row not found");
          }
        }, 1000);
      });
    };

    component.tableData = tableData;
    component.onRowDelete = onRowDelete;

    component.doDelete(1);

    setTimeout(() => {
      expect(tableData.length).toBe(2);
      done();
    }, 1500);
  });

  it("should delete an existing row without confirmation", () => {
    const index = 0;
    const rowData = { id: 1, name: "John Doe" };
    const isNew = false;
    component.tableData = [rowData];
    component.onDelete(index, rowData, isNew);
    expect(component.tableData.length).toBe(0);
  });

  it("should update editRows and modifyingData objects when editing a row", () => {
    const rowData = [
      { widgetId: "name", value: { value: "John Doe" }, metaData: { widgetType: WidgetTypes.Text } },
      { widgetId: "age", value: { value: 25 }, metaData: { widgetType: WidgetTypes.Number } },
      { widgetId: "email", value: { value: "johndoe@example.com" }, metaData: { widgetType: WidgetTypes.Email } },
    ];

    const rowIndex = 0;

    component.onEdit(rowIndex, rowData);

    expect(component.editRows[rowIndex]).toEqual(rowData);

    const currentRow = {
      name: "John Doe",
      age: 25,
      email: "johndoe@example.com",
    };

    expect(component.modifyingData[rowIndex]).toEqual(currentRow);
  });

  it("should replace table data with edit rows data when index is valid", () => {
    const index = 0;
    const rowData = { id: 1, name: "John Doe", age: 30 };
    component.editRows[index] = rowData;
    component.onRowEditCancel(index, rowData);
    expect(component.tableData[index]).toEqual(rowData);
    expect(component.editRows[index]).toBeUndefined();
    expect(component.modifyingData[index]).toBeUndefined();
    expect(component.editCells[index]).toBeUndefined();
    expect(component.rowErrors[index]).toBeUndefined();
  });

  it("should store current cell value in editCells object when user clicks on a cell to edit", () => {
    const column = new BaseWidget({
      widgetId: "column1",
      displayName: "Column 1",
      widgetName: "column1",
      label: "Column 1",
      dataType: "string",
      widgetType: WidgetTypes.TextInput,
    });

    const rowIndex = 0;

    const rowData = [
      new BaseWidget({
        widgetId: "column1",
        displayName: "Column 1",
        widgetName: "column1",
        label: "Column 1",
        dataType: "string",
        widgetType: WidgetTypes.TextInput,
        value: { value: "Value 1" },
      }),
      new BaseWidget({
        widgetId: "column2",
        displayName: "Column 2",
        widgetName: "column2",
        label: "Column 2",
        dataType: "string",
        widgetType: WidgetTypes.TextInput,
        value: { value: "Value 2" },
      }),
    ];

    component.editCells = {};
    component.modifyingData = {};

    component.onColEdit(null, column, rowIndex, rowData);

    expect(component.editCells[rowIndex][column.widgetId]).toEqual(rowData[column.widgetId]?.value.value);
  });

  it("should update modifying data with new values when row validation passes", () => {
    component.modifyingData = {
      0: {
        widgetId1: "value1",
        widgetId2: "value2",
        widgetId3: "value3",
      },
      1: {
        widgetId1: "value4",
        widgetId2: "value5",
        widgetId3: "value6",
      },
    };
    component.tableData = [
      [
        { widgetId: "widgetId1", value: { value: "oldValue1" } },
        { widgetId: "widgetId2", value: { value: "oldValue2" } },
        { widgetId: "widgetId3", value: { value: "oldValue3" } },
      ],
      [
        { widgetId: "widgetId1", value: { value: "oldValue4" } },
        { widgetId: "widgetId2", value: { value: "oldValue5" } },
        { widgetId: "widgetId3", value: { value: "oldValue6" } },
      ],
    ];

    component.onColSave(() => {});

    expect(component.modifyingData).toEqual({});
  });

  it("should clear all relevant variables when called", () => {
    component.editCells = { 0: true, 1: true };
    component.modifyingData = { 0: {}, 1: {} };
    component.editRows = { 0: {}, 1: {} };
    component.newRows = { 0: {}, 1: {} };

    component.onColSaveCancel(null);

    expect(component.editCells).toEqual({});
    expect(component.modifyingData).toEqual({});
    expect(component.editRows).toEqual({});
    expect(component.newRows).toEqual({});
  });

  it('should return an empty string when column type is "string"', () => {
    const column = new Column({
      colType: WidgetTypes.TextInput,
      label: "Name",
      name: "name",
      displayName: "Name",
      widgetName: "name",
      populateResponsePath: "",
      columnId: "column1",
      children: [],
      alignment: CELL_ALIGNMENTS_TYPES.LEFT,
    });

    const defaultValue = component.getColumnDefaultValue(column);
    expect(defaultValue).toEqual("");
  });

  it('should return null when column type is "number"', () => {
    const column = new Column({
      colType: WidgetTypes.Number,
      label: "Age",
      name: "age",
      displayName: "Age",
      widgetName: "age",
      populateResponsePath: "",
      columnId: "column2",
      children: [],
      alignment: CELL_ALIGNMENTS_TYPES.LEFT,
    });

    const defaultValue = component.getColumnDefaultValue(column);
    expect(defaultValue).toBeNull();
  });

  it("should add a new row with default values when invoked", () => {
    component.isDisabled = false;
    component.columns = [
      {
        widgetId: "column1",
        metaData: {
          widgetType: WidgetTypes.TextInput,
        },
        value: {
          value: "Value 1",
        },
      },
      {
        widgetId: "column2",
        metaData: {
          widgetType: WidgetTypes.TextInput,
        },
        value: {
          value: "Value 2",
        },
      },
    ] as any;
    component.tableData = [];
    component.addRow();
    expect(component.tableData.length).toBe(1);
    expect(component.tableData[0].length).toBe(2);
    expect(component.tableData[0][0].widgetId).toBe("column1");
    expect(component.tableData[0][0].value.value).toBe("Value 1");
    expect(component.tableData[0][1].widgetId).toBe("column2");
    expect(component.tableData[0][1].value.value).toBe("Value 2");
  });

  it('should return error message for "required" error', () => {
    const errors = { required: true };
    const label = "Field";

    const errorMessages = component.getErrorMessages(errors, label);

    expect(errorMessages).toEqual(["Field is required"]);
  });

  it('should return error message for "minlength" and "maxlength" errors', () => {
    const errors = { minlength: { requiredLength: 2, actualLength: 1 } };
    const label = "Field";

    const errorMessages = component.getErrorMessages(errors, label);

    expect(errorMessages).toEqual(["Expected atleast length 2 but got 1"]);
  });

  it('should return error message for "min" and "max" errors', () => {
    const errors = { min: { min: 5, actual: 3 } };
    const label = "Field";

    const errorMessages = component.getErrorMessages(errors, label);

    expect(errorMessages).toEqual(["Expected atleast value 5 but got 3"]);
  });

  it("should handle unknown error types", () => {
    const errors = { unknownError: "Some value" };
    const label = "Field";

    const errorMessages = component.getErrorMessages(errors, label);

    expect(errorMessages).toEqual([]);
  });

  it("should update the current page number to the new page number", () => {
    component.currentPage = 2;
    component.handlePageChange(3);
    expect(component.currentPage).toEqual(3);
  });

  it("should sort table data in ascending order based on the selected column", () => {
    const tableData = [
      [
        { widgetId: "name", value: { value: "John" } },
        { widgetId: "age", value: { value: 25 } },
        { widgetId: "city", value: { value: "New York" } },
      ],
      [
        { widgetId: "name", value: { value: "Alice" } },
        { widgetId: "age", value: { value: 30 } },
        { widgetId: "city", value: { value: "London" } },
      ],
      [
        { widgetId: "name", value: { value: "Bob" } },
        { widgetId: "age", value: { value: 20 } },
        { widgetId: "city", value: { value: "Paris" } },
      ],
    ];

    const $event = {
      direction: "asc",
      column: "name",
    };

    component.tableData = tableData;
    component.onSortChange($event);

    expect(component.tableData).toEqual([
      [
        { widgetId: "name", value: { value: "Alice" } },
        { widgetId: "age", value: { value: 30 } },
        { widgetId: "city", value: { value: "London" } },
      ],
      [
        { widgetId: "name", value: { value: "Bob" } },
        { widgetId: "age", value: { value: 20 } },
        { widgetId: "city", value: { value: "Paris" } },
      ],
      [
        { widgetId: "name", value: { value: "John" } },
        { widgetId: "age", value: { value: 25 } },
        { widgetId: "city", value: { value: "New York" } },
      ],
    ]);
  });
});
