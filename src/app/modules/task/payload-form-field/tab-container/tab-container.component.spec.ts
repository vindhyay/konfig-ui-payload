import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";

import { AppTabContainerComponent } from "./tab-container.component";

describe("EditorStepperComponent", () => {
  let component: AppTabContainerComponent;
  let fixture: ComponentFixture<AppTabContainerComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [AppTabContainerComponent],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(AppTabContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
