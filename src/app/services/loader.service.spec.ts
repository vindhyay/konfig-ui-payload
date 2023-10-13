import { TestBed } from '@angular/core/testing';

import { LoaderService } from './loader.service';

describe('LoaderService', () => {
  let loaderService: LoaderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    loaderService = TestBed.inject(LoaderService);
  });

  it('should be created', () => {
    expect(loaderService).toBeTruthy();
  });

  it('should start loading when called with time = 0', () => {
    // Create a spy on isLoading.next
    spyOn(loaderService["isLoading"], 'next');

    // Call the start method with time = 0
    loaderService.start();

    // Expectations
    expect(loaderService["isLoading"].next).toHaveBeenCalledWith(true);
  });

  it('should complete loading and stop the timer when complete is called', () => {
    // Create a spy on clearTimeout
    spyOn(window, 'clearTimeout');

    // Call the complete method
    loaderService.complete();

    // Expectations
    expect(window.clearTimeout).toHaveBeenCalled();
    // expect(loaderService["isLoading"].value).toBe(false);
  });

  it('should provide loading status as an observable', (done) => {
    // Create a subscription to the loading status
    loaderService.getLoadingStatus().subscribe((isLoading) => {
      // Expectations
      expect(isLoading).toBe(true); // Initially, it should be true
      done();
    });

    // Call the start method to trigger loading
    loaderService.start();
  });
});
