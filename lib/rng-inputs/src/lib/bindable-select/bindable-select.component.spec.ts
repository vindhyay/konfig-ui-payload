import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BindableSelectComponent } from './bindable-select.component';

describe('BindableSelectComponent', () => {
  let component: BindableSelectComponent;
  let fixture: ComponentFixture<BindableSelectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BindableSelectComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BindableSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
