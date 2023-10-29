import { ComponentFixture, TestBed } from "@angular/core/testing";

import { AvatarComponent } from "./avatar.component";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { SharedModule } from "../../../shared/shared.module";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { RouterTestingModule } from "@angular/router/testing";
import { BaseWidget } from "../../model/create-form.models";
import { AuthService } from "src/app/modules/auth/services/auth.service";

describe("AvatarComponent", () => {
  let component: AvatarComponent;
  let fixture: ComponentFixture<AvatarComponent>;
  let authService: AuthService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, SharedModule, BrowserAnimationsModule, RouterTestingModule],
      providers: [],
      declarations: [AvatarComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AvatarComponent);
    authService = TestBed.inject(AuthService);
    component = fixture.componentInstance;
    component.item = { value: { value: null, id: "" }, metaData: { configureLoginData: null } } as BaseWidget;
    component.currentUser = {};
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should configure properties from login data", () => {
    spyOn(authService, "getCurrentUser");
    component.configureFromLoginData();

    expect(authService.getCurrentUser).toHaveBeenCalled();
  });

  it('should return the first letter when more than 2 letters are present in fallbackText', () => {
    component.metaData.fallbackText = 'John Doe';

    const result = component.convertFallbackText();

    expect(result).toBe('JD');
  });

  it('should return the entire text when 2 or fewer letters are present in fallbackText', () => {
    component.metaData.fallbackText = 'A';

    const result = component.convertFallbackText();

    expect(result).toBe('A');
  });

  it('should return undefined when fallbackText is empty', () => {
    component.metaData.fallbackText = '';

    const result = component.convertFallbackText();

    expect(result).toBeUndefined();
  });
});
