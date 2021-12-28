import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BindableSelectMultiComponent } from './bindable-select-multi.component';

describe('ComboSelectMultiComponent', () => {
  let component: BindableSelectMultiComponent;
  let fixture: ComponentFixture<BindableSelectMultiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BindableSelectMultiComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BindableSelectMultiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
