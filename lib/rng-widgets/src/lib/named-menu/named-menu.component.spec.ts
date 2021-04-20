import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NamedMenuComponent } from './named-menu.component';

describe('NamedMenuComponent', () => {
  let component: NamedMenuComponent;
  let fixture: ComponentFixture<NamedMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NamedMenuComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NamedMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
