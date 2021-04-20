import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BindableTextareaComponent } from './bindable-textarea.component';

describe('BindableTextareaComponent', () => {
  let component: BindableTextareaComponent;
  let fixture: ComponentFixture<BindableTextareaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BindableTextareaComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BindableTextareaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
