import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BindableComponent } from './bindable.component';

describe('BindableComponent', () => {
  let component: BindableComponent;
  let fixture: ComponentFixture<BindableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BindableComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BindableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
