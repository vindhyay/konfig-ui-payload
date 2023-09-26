/* eslint-disable @typescript-eslint/no-unused-vars */
import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { By } from "@angular/platform-browser";
import { DebugElement } from "@angular/core";

import { PhonenumberFieldComponent } from "./phonenumber-field.component";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {SharedModule} from "../../../shared/shared.module";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {RouterTestingModule} from "@angular/router/testing";
import {BaseWidget} from "../../model/create-form.models";

describe("PhonenumberFieldComponent", () => {
  let component: PhonenumberFieldComponent;
  let fixture: ComponentFixture<PhonenumberFieldComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, SharedModule, BrowserAnimationsModule, RouterTestingModule],
      declarations: [PhonenumberFieldComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PhonenumberFieldComponent);
    component = fixture.componentInstance;
    component.item = { value: { value: null, id: "" }, children: [], metaData: {} } as BaseWidget;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
