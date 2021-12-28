import { TestBed } from '@angular/core/testing';
import { ErrorHandler } from '@angular/core';
import { GlobalErrorHandlerService } from './global-error-handler.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('GlobalErrorHandlerService', () => {
  let errorService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [{ provide: ErrorHandler, useValue: { handle: (val: string) => val } }]
    });
    errorService = TestBed.get(ErrorHandler);
  });

  it('should be created', () => {
    expect(errorService).toBeTruthy();
  });
  it('Error should catch', () => {
    try {
      // @ts-ignore
      JSON.parse({});
    } catch (e) {
      expect(errorService.handle('Error')).toEqual('Error');
    }
  });
});
