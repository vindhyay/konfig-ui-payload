import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from "@angular/core";
import { FormArray, FormBuilder, Validators } from "@angular/forms";
import { CustomDropdownComponent } from "../../../custom-dropdown.component";
import { Column, WidgetTypes } from "../../../../task/model/create-form.models";
import { conditions } from "src/app/utils";

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

  readonlyMode = false;
  filtersEnabled = false;
  advSearchForm: FormArray = this.fb.array([]);
  filtersLogic = "";
  filtersLogicError = "";
  filtersPattern = new RegExp(/^[0-9 & ()|]*$/gm);

  ngOnInit() {
    this.addSearchField();
    this.operators = [
      { name: "AND", id: "AND" },
      { name: "OR", id: "OR" },
    ];
    this.conditions = conditions;
  }

  addSearchField() {
    this.advSearchForm.push(this.createSearchField());
  }
  removeSearchField(index) {
    this.advSearchForm.removeAt(index);
    if (this.advSearchForm?.controls?.length === 1) {
      this.filtersLogic = "";
    }
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
    if (this.advSearchForm.valid && !this.filtersLogicError) {
      const searchColumns: Array<any> = this.advSearchForm.value;
      this.filtersCount = searchColumns.length;
      this.filtersEnabled = true;
      this.search.emit({ searchColumns, filtersLogic: this.filtersLogic });
      this.hideDropdown();
    }
  }
  clearSearch() {
    this.filtersEnabled = false;
    this.filtersLogic = "";
    this.search.emit(null);
    this.hideDropdown();
    this.advSearchForm.clear();
    this.addSearchField();
  }

  onConditionChange($event, condition) {
    if ($event === "isNull") {
      condition.controls.value.setValue("None");
    } else if (condition.controls.value.value == "None") {
      condition.controls.value.setValue("");
    }
  }

  onFilterLogicChange($event) {
    this.filtersLogicError = "";
  }

  validateFilter() {
    if (!new RegExp(this.filtersPattern).test(this.filtersLogic)) {
      this.filtersLogicError = "Filter contain invalid characters";
      return;
    }
    const numbers: any = this.filtersLogic.match(/[\d\.]+/g) || [];
    if (Math.min(...numbers) > 0 && Math.max(...numbers) <= this.advSearchForm.controls.length) {
      try {
        eval(this.filtersLogic);
      } catch (error) {
        this.filtersLogicError = "Please enter valid filter";
      }
    } else {
      this.filtersLogicError = "Rule number should be between 1-" + this.advSearchForm.controls.length;
    }
  }
}
