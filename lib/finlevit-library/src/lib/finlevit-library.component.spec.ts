import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinlevitLibraryComponent } from './finlevit-library.component';

describe('FinlevitLibraryComponent', () => {
  let component: FinlevitLibraryComponent;
  let fixture: ComponentFixture<FinlevitLibraryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FinlevitLibraryComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FinlevitLibraryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
