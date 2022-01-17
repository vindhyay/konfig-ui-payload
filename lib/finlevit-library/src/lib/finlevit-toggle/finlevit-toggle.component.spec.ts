import { ComponentFixture, fakeAsync, TestBed, tick, waitForAsync } from "@angular/core/testing";
import { FormsModule } from "@angular/forms";
import { Component, ViewChild } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FinlevitToggleComponent } from "./finlevit-toggle.component";

@Component({
  selector: "test-toggle",
  template: `
    <finlevit-toggle name="toggle" label="Toggle Label" [(ngModel)]="toggleValue"></finlevit-toggle>
  `
})
class CustomTestClass {
  toggleValue = false;
  @ViewChild(FinlevitToggleComponent, { static: true })
  FinlevitToggleComponent: FinlevitToggleComponent;
}

describe("Component: Finlevit Toggle Component", () => {
  let component: FinlevitToggleComponent;
  let testComponent: CustomTestClass;
  let testFixture: ComponentFixture<CustomTestClass>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [FormsModule, CommonModule],
        declarations: [FinlevitToggleComponent, CustomTestClass]
      }).compileComponents();
      testFixture = TestBed.createComponent(CustomTestClass);
      testComponent = testFixture.componentInstance;
      component = testComponent.FinlevitToggleComponent;
    })
  );

  it("Toggle Component Should Create", () => {
    expect(component).toBeTruthy();
  });

  it("Should Set Validators To Control On Load", () => {
    component.isRequired = true;
    const setValidatorsMock = spyOn(component.controlDir.control, "setValidators").and.callThrough();
    const updateValueAndValidityMock = spyOn(component.controlDir.control, "updateValueAndValidity").and.callThrough();
    component.ngOnInit();
    expect(setValidatorsMock).toHaveBeenCalledTimes(1);
    expect(updateValueAndValidityMock).toHaveBeenCalledTimes(1);
  });

  it("Should Call onChange And onTouch Methods When Component Value Change", fakeAsync(() => {
    const registerOnChangeMock = spyOn(component, "registerOnChange").and.callThrough();
    const registerOnTouchedMock = spyOn(component, "registerOnTouched").and.callThrough();
    const onMockWriteValue = spyOn(component, "writeValue").and.callThrough();
    testFixture.detectChanges();
    tick();
    expect(registerOnChangeMock).toHaveBeenCalledTimes(1);
    expect(registerOnTouchedMock).toHaveBeenCalledTimes(1);
    expect(onMockWriteValue).toHaveBeenCalled();
    expect(testComponent.toggleValue).toEqual(component._value);
    testComponent.toggleValue = !testComponent.toggleValue;
    testFixture.detectChanges();
    tick();
    expect(registerOnChangeMock).toHaveBeenCalledTimes(1);
    expect(registerOnTouchedMock).toHaveBeenCalledTimes(1);
    expect(onMockWriteValue).toHaveBeenCalled();
    expect(testComponent.toggleValue).toEqual(component._value);
  }));
});
