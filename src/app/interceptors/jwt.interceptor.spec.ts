import { getTestBed, inject, TestBed } from "@angular/core/testing";
import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { JwtInterceptor } from "./jwt.interceptor";
import { RouterTestingModule } from "@angular/router/testing";
import { StorageService } from "../services/storage.service";
import { AppConfigService } from "../app-config-providers/app-config.service";

describe(`JWTHttpInterceptor`, () => {
  let injector: TestBed;
  let httpMock: HttpTestingController;
  let ROOT_URL: string = "http://ao-workflow.dev.finlevit.io";
  let mockConfigService;
  beforeEach(() => {
    mockConfigService = jasmine.createSpyObj(["getApiUrls"]);
    mockConfigService.getApiUrls.and.returnValue({
      getAllUsersURL: `${ROOT_URL}/workflowadmin/rest/users`,
    });
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [
        {
          provide: HTTP_INTERCEPTORS,
          useClass: JwtInterceptor,
          multi: true,
        },
        [{ provide: AppConfigService, useValue: mockConfigService }],
        StorageService,
      ],
    });
    injector = getTestBed();
    httpMock = injector.get(HttpTestingController);
  });

  it("Request should have Authorization header", inject([StorageService], (service: StorageService) => {
    const req = httpMock.expectOne(`${ROOT_URL}/workflowadmin/rest/users`);
    expect(req.request.method).toBe("GET");
    expect(req.request.headers.has("Authorization")).toEqual(true);
    req.flush({ data: [] });
    httpMock.verify();
  }));
});
