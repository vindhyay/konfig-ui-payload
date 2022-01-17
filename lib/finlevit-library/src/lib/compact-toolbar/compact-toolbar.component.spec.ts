import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompactToolbarComponent } from './compact-toolbar.component';

describe('CompactToolbarComponent', () => {
  let component: CompactToolbarComponent;
  let fixture: ComponentFixture<CompactToolbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CompactToolbarComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompactToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
