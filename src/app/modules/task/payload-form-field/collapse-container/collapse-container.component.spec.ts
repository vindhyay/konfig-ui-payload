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
});
