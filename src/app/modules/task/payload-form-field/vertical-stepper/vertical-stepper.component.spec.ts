import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";

import { VerticalStepperComponent } from "./vertical-stepper.component";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { RouterTestingModule } from "@angular/router/testing";

import { NotificationService } from "src/app/services/notification.service";

import { EditorService } from "../../editor.service";
import { StepperContainerMetaData } from "../../model/create-form.models";
import { ActiveToast, IndividualConfig, ToastrService } from "ngx-toastr";

export class MockToastrService extends ToastrService {
  toasts: ActiveToast<any>[] = [];

  constructor() {
    super(null, null, null, null, null);
  }

  show(message?: string, title?: string, override?: Partial<IndividualConfig>, type?: string): ActiveToast<any> {
    return;
  }
}
describe("EditorStepperComponent", () => {
  let component: VerticalStepperComponent;
  let fixture: ComponentFixture<VerticalStepperComponent>;
  let editorService: EditorService;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [VerticalStepperComponent],
        imports: [HttpClientTestingModule, RouterTestingModule],
        providers: [EditorService, NotificationService, { provide: ToastrService, useValue: MockToastrService }],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(VerticalStepperComponent);
    component = fixture.componentInstance;
    editorService = TestBed.inject(EditorService);
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should set selectedIndex to index when isFreeFlow is true", () => {
    component.metaData = new StepperContainerMetaData({ isFreeFlow: true });
    component.selectedIndex = 1;

    component.onSelectIndexChange(2);

    expect(component.selectedIndex).toBe(2);
  });

  it("should increase selectedIndex and call onBtnClick when all fields are valid and there are more steps", () => {
    component.children = [
      {
        label: "Step 1",
        children: [
          {
            label: "Field 1",
            value: "Value 1",
            metaData: {},
          },
        ],
      },
      {
        label: "Step 2",
        children: [
          {
            label: "Field 2",
            value: "Value 2",
            metaData: {},
          },
        ],
      },
    ];
    component.selectedIndex = 0;

    const event = {
      data: {
        id: "buttonId",
        metaData: {},
      },
    };

    spyOn(editorService, "onBtnClick");

    component.onNextClick(event);

    expect(component.selectedIndex).toBe(1);
    expect(editorService.onBtnClick).toHaveBeenCalledWith(event);
  });

  it("should decrease selectedIndex by 1 when it is greater than 0", () => {
    component.selectedIndex = 2;
    const event = {
      data: {
        metaData: {
          onClickConfigs: [
            {
              action: "previousStep",
            },
          ],
        },
      },
    };
    component.onPrevClick(event);
    expect(component.selectedIndex).toBe(1);
  });

  it("should call onPrevClick method when action is previousStep", () => {
    const event = {
      data: {
        metaData: {
          onClickConfigs: [{ action: "previousStep" }, { action: "nextStep" }, { action: "submit" }],
        },
      },
    };

    spyOn(component, "onPrevClick");
    component.setSelection(event);
    expect(component.onPrevClick).toHaveBeenCalled();
  });
});
