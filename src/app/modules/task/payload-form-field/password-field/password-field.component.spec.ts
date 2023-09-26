/* eslint-disable @typescript-eslint/no-unused-vars */
import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { By } from "@angular/platform-browser";
import { DebugElement } from "@angular/core";

import { PasswordFieldComponent } from "./password-field.component";
import {BaseWidget} from "../../model/create-form.models";

describe("PasswordFieldComponent", () => {
  let component: PasswordFieldComponent;
  let fixture: ComponentFixture<PasswordFieldComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PasswordFieldComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PasswordFieldComponent);
    component = fixture.componentInstance;
    component.item = { value: { value: null, id: "" }, children: [], metaData: {} } as BaseWidget;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
