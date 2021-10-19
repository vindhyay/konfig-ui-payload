import { PhoneMaskDirective } from './phone-mask.directive';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { PhonenumberFieldComponent } from './phonenumber-field.component';

describe('PhoneMaskDirective', () => {
  let fixture;
  beforeEach(() => {
  fixture = TestBed.configureTestingModule({
    declarations: [ PhonenumberFieldComponent, PhoneMaskDirective ],
    schemas:   [ CUSTOM_ELEMENTS_SCHEMA ]
  })
  .createComponent(PhonenumberFieldComponent);
  fixture.detectChanges(); // initial binding
});
  it('should create an instance', () => {
    expect(fixture).toBeTruthy();
  });
});
