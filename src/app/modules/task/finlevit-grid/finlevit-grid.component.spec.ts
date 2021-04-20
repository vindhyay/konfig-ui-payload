import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinlevitGridComponent } from './finlevit-grid.component';

describe('FinlevitGridComponent', () => {
  let component: FinlevitGridComponent;
  let fixture: ComponentFixture<FinlevitGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FinlevitGridComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FinlevitGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
