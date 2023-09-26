/* eslint-disable @typescript-eslint/no-unused-vars */
import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { SSNInputFieldComponent } from "./ssninput-field.component";

describe("ssnInputFieldComponent", () => {
  let component: SSNInputFieldComponent;
  let fixture: ComponentFixture<SSNInputFieldComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SSNInputFieldComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SSNInputFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
