import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";

import { BtnOptionsComponent } from "./btn-options.component";
import { MaterialModule } from "../../material/material.module";

describe("BtnOptionsComponent", () => {
  let component: BtnOptionsComponent;
  let fixture: ComponentFixture<BtnOptionsComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [MaterialModule],
        declarations: [BtnOptionsComponent]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(BtnOptionsComponent);
    component = fixture.componentInstance;
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
