import { TestBed } from "@angular/core/testing";

import { TokenRefreshService } from "./token-refresh.service";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { RouterTestingModule } from "@angular/router/testing";
import { SharedModule } from "primeng/api";
import { AppConfigService } from "../app-config-providers/app-config.service";
import { StorageService } from "./storage.service";
import { AuthService } from "../modules/auth/services/auth.service";

describe("TokenRefreshService", () => {
  let service: TokenRefreshService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule, SharedModule],
      providers: [AuthService, StorageService, AppConfigService],
      declarations: []
    });
    service = TestBed.inject(TokenRefreshService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });
});

