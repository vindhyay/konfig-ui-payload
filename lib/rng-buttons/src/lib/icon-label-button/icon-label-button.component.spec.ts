import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IconLabelButtonComponent } from './icon-label-button.component';

describe('IconLabelButtonComponent', () => {
  let component: IconLabelButtonComponent;
  let fixture: ComponentFixture<IconLabelButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [IconLabelButtonComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IconLabelButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
