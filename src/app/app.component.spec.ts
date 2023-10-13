import { ComponentFixture, TestBed } from "@angular/core/testing";
import { RouterTestingModule } from "@angular/router/testing";
import { AppComponent } from "./app.component";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { AppConfigService } from "./app-config-providers/app-config.service";
import { AuthService } from "./modules/auth/services/auth.service";
import { ScriptLoaderService } from "./services/script-loader.service";
import { TokenRefreshService } from "./services/token-refresh.service";

describe("AppComponent", () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let scriptLoaderService: ScriptLoaderService;
  let authService: AuthService;
  let tokenRefresher: TokenRefreshService;
  let config: AppConfigService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppComponent],
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [AuthService, TokenRefreshService, ScriptLoaderService, AppConfigService],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;

    scriptLoaderService = TestBed.inject(ScriptLoaderService);
    authService = TestBed.inject(AuthService);
    tokenRefresher = TestBed.inject(TokenRefreshService);
    config = TestBed.inject(AppConfigService);
  });

  it("should create the app", () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it("should load Google Maps and Fonts successfully", () => {
    spyOn(scriptLoaderService, "loadScript");
    spyOn(scriptLoaderService, "loadCss");

    component.ngOnInit();

    expect(scriptLoaderService.loadScript).toHaveBeenCalledWith(config.googleMapsURL);
    expect(scriptLoaderService.loadCss).toHaveBeenCalledWith(config.fontsURL);
  });
});
