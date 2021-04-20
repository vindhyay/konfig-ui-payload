import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IconedNameComponent } from './iconed-name.component';

describe('IconedNameComponent', () => {
  let component: IconedNameComponent;
  let fixture: ComponentFixture<IconedNameComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [IconedNameComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IconedNameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
