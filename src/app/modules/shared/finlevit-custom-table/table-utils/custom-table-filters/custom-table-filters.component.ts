import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from "@angular/core";
import { FormArray, FormBuilder, Validators } from "@angular/forms";
import { CustomDropdownComponent } from "../../../custom-dropdown.component";
import { Column, WidgetTypes } from "../../../../task/model/create-form.models";

@Component({
  selector: "app-custom-table-filters",
  templateUrl: "./custom-table-filters.component.html",
  styleUrls: ["./custom-table-filters.component.scss"],
})
export class CustomTableFiltersComponent implements OnInit {
  constructor(private fb: FormBuilder) {}
  @Input() columns: Column[] = [];
  @Input() showingSearchResults = false;
  @Output() search = new EventEmitter();
  @ViewChild("dropdownComp", { static: true }) dropdown: CustomDropdownComponent;
  operators: { name: string; id: string }[];
  conditions: { [x: string]: { name: string; id: string }[] };
  filtersCount = 0;
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

  filtersEnabled = false;
  advSearchForm: FormArray = this.fb.array([]);

  ngOnInit() {
    this.addSearchField();
    this.operators = [
      { name: "AND", id: "AND" },
      { name: "OR", id: "OR" },
    ];
    this.conditions = {
      STRING: [
        // { name: 'Starts with', id: 'startsWith' },
        // { name: 'Ends with', id: 'endsWith' },
        // { name: 'Contains', id: 'contains' },
        { name: "Equals", id: "equals" },
        // { name: 'Equals Ignore Case', id: 'equalsIgnoreCase' },
        { name: "Not equals", id: "notEquals" },
        // { name: 'Length equals', id: 'lengthEquals' },
        // { name: 'Length greater', id: 'lengthGreater' },
        // { name: 'Length less', id: 'lengthLess' },
        // { name: 'Length greater and equals', id: 'lengthGreaterAndEquals' },
        // { name: 'Length less and equals', id: 'lengthLessAndEquals' }
      ],
      BOOLEAN: [
        { name: "Equals", id: "equals" },
        { name: "Not equals", id: "notEquals" },
      ],
      DATE: [
        // { name: 'Greater than', id: 'greaterThan' },
        // { name: 'Greater than equals', id: 'greaterthanEquals' },
        // { name: 'Less than', id: 'lessthan' },
        // { name: 'Less than equals', id: 'lessthanEquals' },
        { name: "Equals", id: "equals" },
        { name: "Not equals", id: "notEquals" },
      ],
      TIMESTAMP: [
        // { name: 'Greater than', id: 'greaterThan' },
        // { name: 'Greater than equals', id: 'greaterthanEquals' },
        // { name: 'Less than', id: 'lessthan' },
        // { name: 'Less than equals', id: 'lessthanEquals' },
        { name: "Equals", id: "equals" },
        { name: "Not equals", id: "notEquals" },
      ],
      NUMBER: [
        // { name: 'Greater than', id: 'greaterThan' },
        // { name: 'Greater than equals', id: 'greaterthanEquals' },
        // { name: 'Less than', id: 'lessthan' },
        // { name: 'Less than equals', id: 'lessthanEquals' },
        { name: "Equals", id: "equals" },
        { name: "Not equals", id: "notEquals" },
      ],
      DEFAULT: [
        { name: "Equals", id: "equals" },
        { name: "Not Equals", id: "notEquals" },
      ],
    };
  }

  addSearchField() {
    this.advSearchForm.push(this.createSearchField());
  }
  removeSearchField(index) {
    this.advSearchForm.removeAt(index);
  }
  createSearchField() {
    return this.fb.group({
      condition: ["", Validators.required],
      field: ["", Validators.required],
      operator: ["AND", Validators.required],
      value: ["", Validators.required],
    });
  }
  public showDropdown() {
    this.dropdown.show();
  }
  public hideDropdown() {
    this.dropdown.hide();
  }
  onSearch() {
    this.advSearchForm.markAllAsTouched();
    if (this.advSearchForm.valid) {
      const searchColumns: Array<any> = this.advSearchForm.value;
      this.filtersCount = searchColumns.length;
      this.filtersEnabled = true;
      this.search.emit(searchColumns);
      this.hideDropdown();
    }
  }
  clearSearch() {
    this.filtersEnabled = false;
    this.search.emit(null);
    this.hideDropdown();
    this.advSearchForm.clear();
    this.addSearchField();
  }
}
