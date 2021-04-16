import { getTestBed, inject, TestBed } from '@angular/core/testing';

import { BaseService } from './base.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('BaseService', () => {
  let injector: TestBed;
  let baseService: BaseService;
  let httpMock: HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [BaseService]
    });
    injector = getTestBed();
    baseService = TestBed.get(BaseService);
    httpMock = injector.get(HttpTestingController);
  });
  it('Base service instance should create', () => {
    expect(baseService).toBeTruthy();
  });
  it('Get Http Method Should Get Data From Given Url', () => {
    const mockResponse = { data: 'Get Success' };
    baseService.getData('http://www.ui-dev.finlevit.com').subscribe(result => {
      expect(result).toEqual(mockResponse);
    });
    const req = httpMock.expectOne('http://www.ui-dev.finlevit.com');
    expect(req.request.method).toEqual('GET');
    req.flush(mockResponse);
  });
  it('Get Http Method Should Accept Url Params & Query Params', () => {
    const mockResponse = { data: 'Get Query Params Received' };
    baseService.getData('http://www.ui-dev.finlevit.com/vijay', { page: 1 }).subscribe(result => {
      expect(result).toEqual(mockResponse);
    });
    const req = httpMock.expectOne('http://www.ui-dev.finlevit.com/vijay?page=1');
    expect(req.request.method).toEqual('GET');
    req.flush(mockResponse);
  });
  it('Post Http Method Should Post Data On Given Url', () => {
    const mockResponse = { data: 'Post Success' };
    const mockPayload = { user: 'Finlevit Post' };
    baseService.postData('http://www.ui-dev.finlevit.com', mockPayload, { page: 1 }).subscribe(result => {
      expect(result).toEqual(mockResponse);
    });
    const req = httpMock.expectOne('http://www.ui-dev.finlevit.com?page=1');
    expect(req.request.method).toEqual('POST');
    expect(req.request.body).toEqual(mockPayload);
    req.flush(mockResponse);
  });
  it('Put Http Method Should Update Data On Given Url', () => {
    const mockResponse = { data: 'Put Success' };
    const mockPayload = { user: 'Finlevit Put' };
    baseService.putData('http://www.ui-dev.finlevit.com', mockPayload, { page: 1 }).subscribe(result => {
      expect(result).toEqual(mockResponse);
    });
    const req = httpMock.expectOne('http://www.ui-dev.finlevit.com?page=1');
    expect(req.request.method).toEqual('PUT');
    expect(req.request.body).toEqual(mockPayload);
    req.flush(mockResponse);
  });
});
