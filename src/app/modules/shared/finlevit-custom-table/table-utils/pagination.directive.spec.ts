import { TestBed, ComponentFixture, tick, fakeAsync } from "@angular/core/testing";
import { Component, DebugElement } from "@angular/core";
import { By } from "@angular/platform-browser";
import { PaginationDirective } from "./pagination.directive";

@Component({
  template: ` <input pagination [totalPages]="totalPages" [(pageNo)]="pageNo" (pageChange)="onPageChange($event)" /> `,
})
class TestHostComponent {
  totalPages = 10;
  pageNo = 1;

  onPageChange(event: number) {}
}

describe("PaginationDirective", () => {
  let component: TestHostComponent;
  let fixture: ComponentFixture<TestHostComponent>;
  let inputElement: DebugElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PaginationDirective, TestHostComponent],
    });

    fixture = TestBed.createComponent(TestHostComponent);
    component = fixture.componentInstance;
    inputElement = fixture.debugElement.query(By.directive(PaginationDirective));
  });

  it("should create the directive", () => {
    expect(inputElement).toBeTruthy();
  });

  it("should set initial value and trigger pageChange event", fakeAsync(() => {
    component.pageNo = 3;
    fixture.detectChanges();
    tick();
    spyOn(component, "onPageChange");
    const input = inputElement.nativeElement as HTMLInputElement;
    expect(input.value).toBe("3");

    input.value = "5";
    input.dispatchEvent(new Event("input"));
    input.dispatchEvent(new Event("change"));

    fixture.detectChanges();
    tick();

    expect(component.pageNo).toBe(3);
    expect(component.onPageChange).toHaveBeenCalledWith(1);
  }));

  it("should handle first, prev, next, and last buttons", fakeAsync(() => {
    const buttons = fixture.debugElement.queryAll(By.css("button"));

    const firstButton = buttons[0];
    firstButton?.triggerEventHandler("click", null);
    tick();
    expect(component.pageNo).toBe(1);

    const prevButton = buttons[1];
    prevButton?.triggerEventHandler("click", null);
    tick();
    expect(component.pageNo).toBe(1);

    const nextButton = buttons[2];
    nextButton?.triggerEventHandler("click", null);
    tick();
    expect(component.pageNo).toBe(1);

    const lastButton = buttons[3];
    lastButton?.triggerEventHandler("click", null);
    tick();
    expect(component.pageNo).toBe(1);
  }));
});
