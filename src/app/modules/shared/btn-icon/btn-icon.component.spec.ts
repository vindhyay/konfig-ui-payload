import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";

import { BtnIconComponent } from "./btn-icon.component";
import { SharedModule } from "../../shared.module";

describe("BtnIconComponent", () => {
  let component: BtnIconComponent;
  let fixture: ComponentFixture<BtnIconComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [SharedModule],
        declarations: []
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(BtnIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
