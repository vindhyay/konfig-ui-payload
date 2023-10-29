import { ComponentFixture, TestBed } from "@angular/core/testing";

import { SortHeaderComponent } from "./sort-header.component";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { RouterTestingModule } from "@angular/router/testing";
import { SorterDirective } from "../sorter.directive";

describe("SortHeaderComponent", () => {
  let component: SortHeaderComponent;
  let fixture: ComponentFixture<SortHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SortHeaderComponent],
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [SorterDirective],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SortHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it('should sort column in ascending order when clicked for the first time', () => {
    const sorterDirectiveMock = jasmine.createSpyObj('SorterDirective', ['sort']);
    const component = new SortHeaderComponent(sorterDirectiveMock);
    component.sortEligible = true;
    component.ref = 'column1';
    component.sort();
    expect(sorterDirectiveMock.sort).toHaveBeenCalledWith('column1');
  });
});
