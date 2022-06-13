import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";

import { BtnCommonComponent } from "./btn-common.component";
import { SharedModule } from "../../shared.module";
import { RouterTestingModule } from "@angular/router/testing";

describe("BtnCommonComponent", () => {
  let component: BtnCommonComponent;
  let fixture: ComponentFixture<BtnCommonComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [RouterTestingModule, SharedModule],
        declarations: []
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(BtnCommonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
