import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BindableCheckboxComponent } from './bindable-checkbox.component';

describe('BindableCheckboxComponent', () => {
  let component: BindableCheckboxComponent;
  let fixture: ComponentFixture<BindableCheckboxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BindableCheckboxComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BindableCheckboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
