import { ComponentFixture, TestBed } from "@angular/core/testing";

import { DropdownFieldComponent } from "./dropdown-field.component";
import { BaseWidget } from "../../model/create-form.models";

describe("DropdownFieldComponent", () => {
  let component: DropdownFieldComponent;
  let fixture: ComponentFixture<DropdownFieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DropdownFieldComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DropdownFieldComponent);
    component = fixture.componentInstance;
    component.item = { value: { value: null, id: "" } } as BaseWidget;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
