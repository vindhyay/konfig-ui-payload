/* eslint-disable @typescript-eslint/no-unused-vars */
import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { By } from "@angular/platform-browser";
import { DebugElement } from "@angular/core";

import { PasswordFieldComponent } from "./password-field.component";
import { BaseWidget } from "../../model/create-form.models";

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

  it("should toggle between show and hide icon when rightIcon is equal to showIcon", () => {
    const metaData = {
      rightIcon: "showIcon",
      showIcon: "eye",
      hideIcon: "eye-slash",
    };
    component.onRightIconClick(metaData);
    expect(metaData.rightIcon).toEqual("eye");
    expect(component._type).toEqual("password");
  });

  it("should call emit onValueChange on validateField executed", () => {
    const event = {};
    spyOn(component.onValueChange, "emit");
    component.validateField(event);
    expect(component.onValueChange.emit).toHaveBeenCalledWith(event);
  });

  it("should call emit onBlurChange on optionChange executed", () => {
    const event = {};
    spyOn(component.onBlurChange, "emit");
    component.optionChange(event);
    expect(component.onBlurChange.emit).toHaveBeenCalledWith(event);
  });
});
