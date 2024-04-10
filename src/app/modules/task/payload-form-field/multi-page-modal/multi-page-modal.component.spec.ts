import { ComponentFixture, TestBed } from "@angular/core/testing";

import { MultiPageModalComponent } from "./multi-page-modal.component";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { SharedModule } from "../../../shared/shared.module";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { RouterTestingModule } from "@angular/router/testing";
import { BaseWidget } from "../../model/create-form.models";

describe("ModalComponent", () => {
  let component: MultiPageModalComponent;
  let fixture: ComponentFixture<MultiPageModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, SharedModule, BrowserAnimationsModule, RouterTestingModule],
      declarations: [MultiPageModalComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MultiPageModalComponent);
    component = fixture.componentInstance;
    component.item = { value: { value: null, id: "" }, children: [] } as BaseWidget;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should call onPrevClick when previousStep action is present", () => {
    const $event = {
      data: {
        metaData: {
          onClickConfigs: [
            {
              action: "previousStep",
            },
            {
              action: "nextStep",
            },
            {
              action: "submit",
            },
          ],
        },
      },
    };

    spyOn(component, "onPrevClick");
    spyOn(component, "onNextClick");

    component.onFooterClick($event);

    expect(component.onPrevClick).toHaveBeenCalled();
    expect(component.onNextClick).not.toHaveBeenCalled();
  });

  it("should decrease selectedIndex by 1 when it is greater than 0", () => {
    component.selectedIndex = 2;
    const event = { data: {} };
    component.onPrevClick(event);
    expect(component.selectedIndex).toEqual(1);
  });

  it("should increment selectedIndex by 1 when validation passes", () => {
    component.item = {
      widgetId: "modal1",
      children: [
        {
          widgetId: "child1",
          children: [
            {
              widgetId: "grandchild1",
              value: {
                value: "example value",
              },
            },
          ],
        },
        {
          widgetId: "child2",
          children: [
            {
              widgetId: "grandchild2",
              value: {
                value: "example value",
              },
            },
          ],
        },
      ],
    } as any;
    component.selectedIndex = 0;

    const event = {
      data: {
        id: "exampleId",
      },
    };

    component.onNextClick(event);

    expect(component.selectedIndex).toBe(1);
  });

  it("should trigger a window resize event when onShow is called", () => {
    spyOn(window, "dispatchEvent");
    component.onShow(null);
    expect(window.dispatchEvent).toHaveBeenCalledWith(new Event("resize"));
  });

  it("should toggle modalStatus to true when it is false", () => {
    component.modalStatus = false;
    component.toggleModal();
    expect(component.modalStatus).toBe(true);
  });
});
