import { ComponentFixture, TestBed } from "@angular/core/testing";

import { CustomAdvTableComponent } from "./custom-adv-table.component";

describe("CustomAdvTableComponent", () => {
  let component: CustomAdvTableComponent;
  let fixture: ComponentFixture<CustomAdvTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CustomAdvTableComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomAdvTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
