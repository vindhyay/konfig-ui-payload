import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IconedMenuComponent } from './iconed-menu.component';

describe('IconedMenuComponent', () => {
  let component: IconedMenuComponent;
  let fixture: ComponentFixture<IconedMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [IconedMenuComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IconedMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
