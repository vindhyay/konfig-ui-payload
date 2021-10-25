import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvTableComponent } from './adv-table.component';

describe('AdvTableComponent', () => {
  let component: AdvTableComponent;
  let fixture: ComponentFixture<AdvTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdvTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdvTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
