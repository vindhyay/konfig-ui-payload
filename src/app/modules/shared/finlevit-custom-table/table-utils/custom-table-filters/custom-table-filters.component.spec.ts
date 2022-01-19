import { ComponentFixture, TestBed } from "@angular/core/testing";

import { CustomTableFiltersComponent } from "./custom-table-filters.component";

describe("CustomTableFiltersComponent", () => {
  let component: CustomTableFiltersComponent;
  let fixture: ComponentFixture<CustomTableFiltersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CustomTableFiltersComponent],
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
});
