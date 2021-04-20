import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BindableDatepickerComponent } from './bindable-datepicker.component';

describe('BindableDatepickerComponent', () => {
  let component: BindableDatepickerComponent;
  let fixture: ComponentFixture<BindableDatepickerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BindableDatepickerComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BindableDatepickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
