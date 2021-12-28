import { TestBed } from '@angular/core/testing';

import { FinlevitLibraryService } from './finlevit-library.service';

describe('FinlevitLibraryService', () => {
  let service: FinlevitLibraryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FinlevitLibraryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
