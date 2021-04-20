import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReactiveMatInputComponent } from './reactive-mat-input.component';

describe('ReactiveMatInputComponent', () => {
  let component: ReactiveMatInputComponent;
  let fixture: ComponentFixture<ReactiveMatInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ReactiveMatInputComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReactiveMatInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
