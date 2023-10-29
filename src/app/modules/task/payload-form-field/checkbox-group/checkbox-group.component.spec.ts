import { ComponentFixture, TestBed, fakeAsync, tick } from "@angular/core/testing";

import { CheckboxGroupComponent } from "./checkbox-group.component";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { SharedModule } from "../../../shared/shared.module";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { RouterTestingModule } from "@angular/router/testing";
import { BaseWidget, MetaData } from "../../model/create-form.models";
import { validateFields } from "src/app/utils";
import { EditorService } from "../../editor.service";

describe("CheckboxGroupComponent", () => {
  let component: CheckboxGroupComponent;
  let fixture: ComponentFixture<CheckboxGroupComponent>;
  let editorService: EditorService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, SharedModule, BrowserAnimationsModule, RouterTestingModule],
      declarations: [CheckboxGroupComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckboxGroupComponent);
    component = fixture.componentInstance;
    editorService = TestBed.inject(EditorService);
    component.item = { value: { value: null, id: "" } } as BaseWidget;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should return metaData from the item", () => {
    const metaData = { widgetType: "Text" } as MetaData;
    component.item = {
      metaData: metaData,
    } as any;

    expect(component.metaData).toEqual(metaData);
  });

  it("should call editorService.onRuleTrigger when metaData.ruleIds has length", fakeAsync(() => {
    component.item = {
      metaData: {
        ruleIds: [1, 2, 3],
      },
    } as any;
    const event = {};

    spyOn(editorService, "onRuleTrigger");

    component.onChange(event);
    tick(1);

    expect(editorService.onRuleTrigger).toHaveBeenCalledWith({ event, data: component.item });
  }));
});
