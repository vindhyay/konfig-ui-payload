import { ComponentFixture, TestBed } from "@angular/core/testing";

import { CustomTableFiltersComponent } from "./custom-table-filters.component";
import { FormArray, FormBuilder } from "@angular/forms";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { RouterTestingModule } from "@angular/router/testing";

describe("CustomTableFiltersComponent", () => {
  let component: CustomTableFiltersComponent;
  let fixture: ComponentFixture<CustomTableFiltersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CustomTableFiltersComponent],
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [FormBuilder],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomTableFiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should not validate filter logic when invalid filter logic is entered", () => {
    component.filtersPattern = new RegExp(/^[0-9&()|]*$/gm);
    component.filtersLogic = "1&2";
    component.advSearchForm = {
      controls: [{ value: "" }, { value: "" }],
    } as any;
    component.validateFilter();
    expect(component.filtersLogicError).toBe("Please enter valid filter");
  });

  it("should reset filtersLogicError when onFilterLogicChange is called", () => {
    component.filtersLogicError = "your-error-message";

    component.onFilterLogicChange({});

    expect(component.filtersLogicError).toBe("");
  });

  it("should set condition and value fields to empty strings", () => {
    const condition = {
      controls: {
        condition: {
          setValue: jasmine.createSpy("setValue"),
        },
        value: {
          setValue: jasmine.createSpy("setValue"),
        },
      },
    };

    // Act
    component.onColumnChange(null, condition);

    // Assert
    expect(condition.controls.condition.setValue).toHaveBeenCalledWith("");
    expect(condition.controls.value.setValue).toHaveBeenCalledWith("");
  });

  it('should set value to "None" when $event is "isNull"', () => {
    const condition = {
      controls: {
        value: {
          setValue: jasmine.createSpy("setValue"),
        },
      },
    };
    component.onConditionChange("isNull", condition);
    expect(condition.controls.value.setValue).toHaveBeenCalledWith("None");
  });

  it("should set filtersEnabled to false when clearSearch is called", () => {
    component.dropdown = { hide: () => {} } as any;
    component.filtersEnabled = true;
    component.clearSearch();
    expect(component.filtersEnabled).toBe(false);
  });

  it('should call markAllAsTouched on advSearchForm', () => {
    spyOn(component.advSearchForm, 'markAllAsTouched');

    component.onSearch();

    expect(component.advSearchForm.markAllAsTouched).toHaveBeenCalled();
  });

  it('should remove search field from form array', () => {
    const component = new CustomTableFiltersComponent(new FormBuilder());
    component.advSearchForm = new FormArray([
      component.createSearchField(),
      component.createSearchField(),
      component.createSearchField()
    ]);

    const initialLength = component.advSearchForm.controls.length;
    const indexToRemove = 1;

    component.removeSearchField(indexToRemove);

    expect(component.advSearchForm.controls.length).toEqual(initialLength - 1);
  });
});
