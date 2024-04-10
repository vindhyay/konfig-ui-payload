import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColTableComponent } from './col-table.component';

describe('ColTableComponent', () => {
  let component: ColTableComponent;
  let fixture: ComponentFixture<ColTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ColTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ColTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
