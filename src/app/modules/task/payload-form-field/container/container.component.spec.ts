import { ComponentFixture, TestBed } from "@angular/core/testing";
import { ContainerComponent } from "./container.component";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { SharedModule } from "../../../shared/shared.module";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { RouterTestingModule } from "@angular/router/testing";
import { BaseWidget } from "../../model/create-form.models";

describe("ContainerComponent", () => {
  let component: ContainerComponent;
  let fixture: ComponentFixture<ContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, SharedModule, BrowserAnimationsModule, RouterTestingModule],
      declarations: [ContainerComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContainerComponent);
    component = fixture.componentInstance;
    component.item = { value: { value: null, id: "" }, children: [] } as BaseWidget;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
