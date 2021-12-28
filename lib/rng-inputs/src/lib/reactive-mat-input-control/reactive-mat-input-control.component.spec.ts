import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReactiveMatInputControlComponent } from './reactive-mat-input-control.component';

describe('ReactiveMatInputControlComponent', () => {
  let component: ReactiveMatInputControlComponent;
  let fixture: ComponentFixture<ReactiveMatInputControlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ReactiveMatInputControlComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReactiveMatInputControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
