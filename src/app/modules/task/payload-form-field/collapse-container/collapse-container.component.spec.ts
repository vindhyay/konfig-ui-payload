import { ComponentFixture, TestBed } from "@angular/core/testing";

import { CollapseContainerComponent } from "./collapse-container.component";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { SharedModule } from "../../../shared/shared.module";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { RouterTestingModule } from "@angular/router/testing";
import { BaseWidget } from "../../model/create-form.models";

describe("CollapseContainerComponent", () => {
  let component: CollapseContainerComponent;
  let fixture: ComponentFixture<CollapseContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, SharedModule, BrowserAnimationsModule, RouterTestingModule],
      declarations: [CollapseContainerComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CollapseContainerComponent);
    component = fixture.componentInstance;
    component.item = { children: [] } as BaseWidget;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should collapse the container when status is false", () => {
    const item = {
      metaData: {
        hideRows: 2,
        defaultRows: 4,
        defaultMinItemRows: 2,
        defaultMinItemCols: 2,
        movement: null,
      },
    };
    const status = false;

    component.onCollapse(status, item);

    expect(component.item.rows).toBe(item.metaData.hideRows);
    expect(component.item.minItemRows).toBe(item.metaData.hideRows);
  });

  it("should expand the container when status is true", () => {
    const item = {
      metaData: {
        hideRows: 2,
        defaultRows: 4,
        defaultMinItemRows: 2,
        defaultMinItemCols: 2,
        movement: null,
      },
    };
    const status = true;

    component.onCollapse(status, item);

    expect(component.item.rows).toBe(item.metaData.defaultRows);
    expect(component.item.minItemRows).toBe(item.metaData.defaultMinItemRows);
    expect(component.item.minItemCols).toBe(item.metaData.defaultMinItemCols);
  });
});
