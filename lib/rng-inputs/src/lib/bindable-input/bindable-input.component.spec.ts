import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BindableInputComponent } from './bindable-input.component';

describe('BindableInputComponent', () => {
  let component: BindableInputComponent;
  let fixture: ComponentFixture<BindableInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BindableInputComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BindableInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
