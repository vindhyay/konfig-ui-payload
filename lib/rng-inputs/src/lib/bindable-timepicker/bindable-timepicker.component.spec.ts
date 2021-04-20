import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BindableTimepickerComponent } from './bindable-timepicker.component';

describe('BindableTimepickerComponent', () => {
  let component: BindableTimepickerComponent;
  let fixture: ComponentFixture<BindableTimepickerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BindableTimepickerComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BindableTimepickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
