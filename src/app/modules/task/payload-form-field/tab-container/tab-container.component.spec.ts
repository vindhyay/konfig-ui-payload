import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";

import { AppTabContainerComponent } from "./tab-container.component";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { RouterTestingModule } from "@angular/router/testing";
import { NotificationService } from "src/app/services/notification.service";
import { EditorService } from "../../editor.service";
import { ActiveToast, IndividualConfig, ToastrService } from "ngx-toastr";

export class MockToastrService extends ToastrService {
  toasts: ActiveToast<any>[] = [];
 
  constructor() {
    super(null, null, null, null, null);
  }
 
  show(message?: string, title?: string, override?: Partial<IndividualConfig>, type?: string): ActiveToast<any> {
    return;
  }
}
describe("EditorStepperComponent", () => {
  let component: AppTabContainerComponent;
  let fixture: ComponentFixture<AppTabContainerComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [AppTabContainerComponent],
        imports: [HttpClientTestingModule, RouterTestingModule],
        providers: [EditorService, NotificationService, { provide: ToastrService, useValue: MockToastrService }],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(AppTabContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it('should set the active tab index to the index passed in the event object', () => {
    const tabChangeEvent = { index: 2 };
    component.onTabChange(tabChangeEvent);
    expect(component.tabActiveIndex).toEqual(2);
  });
});
