import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";

import { BtnSecondaryComponent } from "./btn-secondary.component";
import { SharedModule } from "../../shared.module";

describe("BtnSecondaryComponent", () => {
  let component: BtnSecondaryComponent;
  let fixture: ComponentFixture<BtnSecondaryComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [SharedModule],
        declarations: []
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(BtnSecondaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
