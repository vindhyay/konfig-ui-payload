import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { FinlevitFileUploadComponent } from './finlevit-file-upload.component';

describe('FinlevitFileUploadComponent', () => {
  let component: FinlevitFileUploadComponent;
  let fixture: ComponentFixture<FinlevitFileUploadComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [FinlevitFileUploadComponent]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(FinlevitFileUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
