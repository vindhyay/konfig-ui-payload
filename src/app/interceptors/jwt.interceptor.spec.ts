import { TestBed } from "@angular/core/testing";
import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";
import { JwtInterceptor } from "./jwt.interceptor";
import { StorageService } from "src/app/services/storage.service";
import { AuthService } from "../modules/auth/services/auth.service";
import { AppConfigService } from "../app-config-providers/app-config.service";
import { RouterTestingModule } from "@angular/router/testing";

describe("JwtInterceptor", () => {
  let interceptor: JwtInterceptor;
  let httpMock: HttpTestingController;

  let ROOT_URL: string = "http://ao-workflow.dev.finlevit.io";

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [JwtInterceptor, StorageService, AuthService, AppConfigService],
    });
  });

  beforeEach(() => {
    interceptor = TestBed.inject(JwtInterceptor);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it("should be created", () => {
    expect(interceptor).toBeTruthy();
  });

  // it("Request should have Authorization header", () => {
  //   const req = httpMock.expectOne(`${ROOT_URL}/workflowadmin/rest/users`);
  //   expect(req.request.method).toBe("GET");
  //   expect(req.request.headers.has("Authorization")).toEqual(true);
  //   req.flush({ data: [] });
  //   httpMock.verify();
  // });
});
