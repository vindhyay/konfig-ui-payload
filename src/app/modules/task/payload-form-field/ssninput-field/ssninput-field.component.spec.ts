/* eslint-disable @typescript-eslint/no-unused-vars */
import { async, ComponentFixture, fakeAsync, TestBed, tick } from "@angular/core/testing";

import { SSNInputFieldComponent } from "./ssninput-field.component";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { RouterTestingModule } from "@angular/router/testing";
import { ToSSNFormatPipe } from "src/app/pipes/to-ssn-format.pipe";

describe("ssnInputFieldComponent", () => {
  let component: SSNInputFieldComponent;
  let fixture: ComponentFixture<SSNInputFieldComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SSNInputFieldComponent, ToSSNFormatPipe],
      imports: [HttpClientTestingModule, RouterTestingModule],
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

  it("should call changeIcon, set _type_mask, and emit onBlurChange event", fakeAsync(() => {
    const event = {};
    spyOn(component, "changeIcon");
    spyOn(component.onBlurChange, "emit");

    component.optionChange(event);
    tick(1);

    expect(component.changeIcon).toHaveBeenCalled();
    expect(component.onBlurChange.emit).toHaveBeenCalledWith(event);
  }));

  it("should not call changeIcon and emit onBlurChange event immediately", fakeAsync(() => {
    const event = {};
    spyOn(component, "changeIcon");
    spyOn(component.onBlurChange, "emit");

    component.optionChange(event);

    expect(component.changeIcon).not.toHaveBeenCalled();
    expect(component.onBlurChange.emit).not.toHaveBeenCalled();

    tick(1);

    expect(component.changeIcon).toHaveBeenCalled();
    expect(component.onBlurChange.emit).toHaveBeenCalledWith(event);
  }));

  it("should call changeIcon with metaData onRightIconClick", () => {
    const metaData = { showMask: "show", hideMask: "hide", showIcon: "show-icon", hideIcon: "hide-icon" };
    component._type_mask = metaData.showMask;
    spyOn(component, "changeIcon");

    component.onRightIconClick(metaData);

    expect(component.changeIcon).toHaveBeenCalledWith(metaData);
  });

  it("should toggle icon and _type_mask in changeIcon", () => {
    const metaData = {
      showMask: "show",
      hideMask: "hide",
      showIcon: "show-icon",
      hideIcon: "hide-icon",
      rightIcon: "",
    };
    component._type_mask = metaData.showMask;

    component.changeIcon(metaData);

    expect(metaData.rightIcon).toBe(metaData.hideIcon);
    expect(component._type_mask).toBe(metaData.hideMask);

    component.changeIcon(metaData);

    expect(metaData.rightIcon).toBe(metaData.showIcon);
    expect(component._type_mask).toBe(metaData.showMask);
  });

  it("should set item.value.value to $event and emit onValueChange in validateField", () => {
    const event = "New Value";
    component.item = { value: { value: "Old Value" } } as any;
    spyOn(component.onValueChange, "emit");

    component.validateField(event);

    expect(component.item.value.value).toBe(event);
    expect(component.onValueChange.emit).toHaveBeenCalledWith(event);
  });
});
