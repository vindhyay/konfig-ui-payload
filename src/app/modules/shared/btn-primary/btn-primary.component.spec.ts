import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { BtnPrimaryComponent } from './btn-primary.component';
import { SharedModule } from '../../shared.module';

describe('BtnPrimaryComponent', () => {
  let component: BtnPrimaryComponent;
  let fixture: ComponentFixture<BtnPrimaryComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [SharedModule],
        declarations: []
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(BtnPrimaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
