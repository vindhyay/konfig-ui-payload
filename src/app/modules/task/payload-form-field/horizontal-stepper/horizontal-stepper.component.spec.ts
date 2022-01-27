import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";

import { HorizontalStepperComponent } from "./horizontal-stepper.component";

describe("EditorStepperComponent", () => {
  let component: HorizontalStepperComponent;
  let fixture: ComponentFixture<HorizontalStepperComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [HorizontalStepperComponent],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(HorizontalStepperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
