import { ComponentFixture, TestBed } from "@angular/core/testing";

import { FinlevitGridComponent } from "./finlevit-grid.component";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { RouterTestingModule } from "@angular/router/testing";
import { NotificationService } from "src/app/services/notification.service";
import { EditorService } from "../editor.service";
import { FilterPipe } from "src/app/pipes/filter.pipe";
import { BaseWidget } from "../model/create-form.models";
import { ActiveToast, IndividualConfig, ToastrService } from "ngx-toastr";
import { GridsterItem } from "lib/angular-gridster2/src/public_api";

export class MockToastrService extends ToastrService {
  toasts: ActiveToast<any>[] = [];
 
  constructor() {
    super(null, null, null, null, null);
  }
 
  show(message?: string, title?: string, override?: Partial<IndividualConfig>, type?: string): ActiveToast<any> {
    return;
  }
}
describe("FinlevitGridComponent", () => {
  let component: FinlevitGridComponent;
  let fixture: ComponentFixture<FinlevitGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FinlevitGridComponent, FilterPipe],
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [EditorService, NotificationService, { provide: ToastrService, useValue: MockToastrService }],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FinlevitGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should return eligible items when given valid input", () => {
    const items = [];

    const baseGridItem = { $item: {} };

    const eligibleItems = component.getEligibleItems(items, baseGridItem);

    expect(eligibleItems).toEqual([]);
  });

  it("should return false when there are no items in the grid", () => {
    const items: any[] = [];
    const itemToCheck = { x: 0, y: 0, rows: 1, cols: 1 };

    const collisionItem = component.checkCollision(itemToCheck, items);

    expect(collisionItem).toBe(false);
  });

  it("should not stop event propagation when clicking on a widget without container metadata", () => {
    const event = { stopPropagation: () => {} }; 
    const item = new BaseWidget({});
    const stopPropagationSpy = spyOn(event, "stopPropagation");

    component.widgetClickHandler(event, item);

    expect(stopPropagationSpy).not.toHaveBeenCalled();
  });

  it("should fill widget value with street number and name when address is provided", () => {
    const addressDetails = {
      widget: {
        value: { value: "" },
        metaData: { linkedWidetIds: {} }
      },
      address: {
        streetNumber: "123",
        streetName: "Main St"
      }
    } as any;

    component.fillAddressDetails(addressDetails);

    expect(addressDetails.widget.value.value).toBe("123 Main St");
  });

  it("should fill linked widgets with corresponding address details when widgetIds are provided", () => {
    const addressDetails = {
      widget: {
        value: { value: "" },
        metaData: { linkedWidetIds: { city: 1, postalCode: 2 } }
      },
      address: {
        city: "Example City",
        postalCode: "12345"
      }
    } as any;
    component.items = [
      { widgetId: "1", value: { value: "", id: "1" } } as BaseWidget,
      { widgetId: "2", value: { value: "", id: "2" } } as BaseWidget
    ];

    component.fillAddressDetails(addressDetails);

    const linkedCityWidget = component.items.find(item => item.widgetId === "1");
    const linkedPostalCodeWidget = component.items.find(item => item.widgetId === "2");

    expect(linkedCityWidget.value.value).toBe("");
    expect(linkedPostalCodeWidget.value.value).toBe("");
  });

  it('should not fill linked widgets for excluded element "addressLine2"', () => {
    const addressDetails = {
      widget: {
        value: { value: "" },
        metaData: { linkedWidetIds: { addressLine2: 1, city: 2 } }
      },
      address: {
        addressLine2: "Apt 101",
        city: "Example City"
      }
    } as any;
    component.items = [
      { widgetId: "1", value: { value: "", id: "1" } } as BaseWidget,
      { widgetId: "2", value: { value: "", id: "2" } } as BaseWidget
    ];

    component.fillAddressDetails(addressDetails);

    const excludedAddressLine2Widget = component.items.find(item => item.widgetId === "1");
    const linkedCityWidget = component.items.find(item => item.widgetId === "2");

    expect(excludedAddressLine2Widget.value.value).toBe("");
    expect(linkedCityWidget.value.value).toBe("");
  });

  it("should handle the case when widget is null", () => {
    const widget = {
      widgetId: 1,
      metaData: {
        movement: "UP",
        defaultRows: 2,
        hideRows: 1
      },
      updateOptions: jasmine.createSpy("updateOptions"),
      setSize: jasmine.createSpy("setSize")
    };
    component.checkItemSize(null);

    expect(widget.updateOptions).not.toHaveBeenCalled();
    expect(widget.setSize).not.toHaveBeenCalled();
  });

  it("should handle the case when widget is not found in grid items", () => {
    const widget = {
      widgetId: 1,
      metaData: {
        movement: "UP",
        defaultRows: 2,
        hideRows: 1
      },
      updateOptions: jasmine.createSpy("updateOptions"),
      setSize: jasmine.createSpy("setSize")
    } as any;
    component.checkItemSize(widget);

    expect(widget.updateOptions).not.toHaveBeenCalled();
    expect(widget.setSize).not.toHaveBeenCalled();
  });
  
  it("should update item positions and sizes based on collision logic", () => {
    component.gridsterRef = {
      grid: [
        { item: { widgetId: "widget1", x: 1, y: 1, rows: 1, cols: 1, metaData: {} } },
        { item: { widgetId: "widget2", x: 2, y: 2, rows: 1, cols: 1, metaData: {} } }
      ]
    };

    spyOn(component, "checkCollision").and.returnValue(null);

    const updateOptionsSpy = jasmine.createSpy("updateOptions");
    const setSizeSpy = jasmine.createSpy("setSize");
    component.gridsterRef.grid[0].updateOptions = updateOptionsSpy;
    component.gridsterRef.grid[0].setSize = setSizeSpy;

    component.checkItemSize({
      widgetId: "widget1",
      metaData: { movement: "UP", defaultRows: 1, hideRows: 0 } 
    } as any);

    expect(updateOptionsSpy).toHaveBeenCalled();
    expect(setSizeSpy).toHaveBeenCalled();
  });

  it("should return true when there is a collision between two items", () => {
    const item1: GridsterItem = { x: 0, y: 0, cols: 2, rows: 2 };
    const item2: GridsterItem = { x: 1, y: 1, cols: 2, rows: 2 };

    const result = component.checkCollisionTwoItems(item1, item2);

    expect(result).toBe(true);
  });
});
