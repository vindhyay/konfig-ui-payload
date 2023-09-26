import { ComponentFixture, TestBed } from "@angular/core/testing";

import { AvatarComponent } from "./avatar.component";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { SharedModule } from "../../../shared/shared.module";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { RouterTestingModule } from "@angular/router/testing";
import { BaseWidget } from "../../model/create-form.models";

describe("AvatarComponent", () => {
  let component: AvatarComponent;
  let fixture: ComponentFixture<AvatarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, SharedModule, BrowserAnimationsModule, RouterTestingModule],
      providers: [],
      declarations: [AvatarComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AvatarComponent);
    component = fixture.componentInstance;
    component.item = { value: { value: null, id: "" }, metaData: { configureLoginData: null } } as BaseWidget;
    component.currentUser = {};
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
