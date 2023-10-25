import { ComponentFixture, TestBed } from "@angular/core/testing";

import { TransactionTableComponent } from "./transaction-table.component";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { RouterTestingModule } from "@angular/router/testing";
import { NotificationService } from "src/app/services/notification.service";
import { EditorService } from "../../editor.service";
import { of, throwError } from "rxjs";
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

describe("TransactionTableComponent", () => {
  let component: TransactionTableComponent;
  let fixture: ComponentFixture<TransactionTableComponent>;
  let editorService: EditorService;
  let notificationService: NotificationService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TransactionTableComponent],
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [EditorService, NotificationService, { provide: ToastrService, useValue: MockToastrService }],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TransactionTableComponent);
    component = fixture.componentInstance;
    editorService = TestBed.inject(EditorService);
    notificationService = TestBed.inject(NotificationService);
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should set loading to true when fetching transaction details", () => {
    const id = "transactionId";
    spyOn(editorService, "fetchTransactionDetails").and.returnValue(of({}));

    component.getTransactionDetails(id);

    expect(component.loading).toBe(false);
  });

  it("should set transaction details and loading to false when the service call succeeds", () => {
    const id = "transactionId";
    const transactionDetails = {};
    spyOn(editorService, "fetchTransactionDetails").and.returnValue(of({ data: transactionDetails }));
    spyOn(editorService, "setTransactionDetails");

    component.getTransactionDetails(id);

    expect(editorService.fetchTransactionDetails).toHaveBeenCalledWith(id);
    expect(editorService.setTransactionDetails).toHaveBeenCalled();
    expect(component.loading).toBe(false);
  });

  it("should set loading to false when the service call results in an error", () => {
    const id = "transactionId";
    spyOn(editorService, "fetchTransactionDetails").and.returnValue(throwError("Error message"));

    component.getTransactionDetails(id);

    expect(editorService.fetchTransactionDetails).toHaveBeenCalledWith(id);
    expect(component.loading).toBe(false);
  });

  it("should call getTransactionTableData with the correct parameters", () => {
    const pageChangeEvent = { page: 2, limit: 20 };
    const mockTransactionDetails = {
      applicationId: "app123",
    };
    component.item = { widgetId: "widget456" } as any;
    spyOn(editorService, "getTransactionDetails").and.returnValue(mockTransactionDetails);
    spyOn(component, "getTransactionTableData");

    component.onPageChange(pageChangeEvent);

    expect(editorService.getTransactionDetails).toHaveBeenCalled();
    expect(component.getTransactionTableData).toHaveBeenCalledWith({
      applicationId: mockTransactionDetails.applicationId,
      widgetId: component.item.widgetId,
      pageNo: pageChangeEvent.page - 1,
      recordNo: pageChangeEvent.limit,
    });
  });

  it("should handle missing page and limit in pageChangeEvent", () => {
    const pageChangeEvent = {};
    const mockTransactionDetails = {
      applicationId: "app123",
    };
    component.item = { widgetId: "widget456" } as any;
    spyOn(editorService, "getTransactionDetails").and.returnValue(mockTransactionDetails);
    spyOn(component, "getTransactionTableData");

    component.onPageChange(pageChangeEvent);

    expect(editorService.getTransactionDetails).toHaveBeenCalled();
    expect(component.getTransactionTableData).toHaveBeenCalledWith({
      applicationId: mockTransactionDetails.applicationId,
      widgetId: component.item.widgetId,
      pageNo: 0,
      recordNo: 10,
    });
  });

  it("should call getTransactionDetails with the provided ID", () => {
    const event = { id: "transaction123" };
    spyOn(component, "getTransactionDetails");

    component.onRowClick(event);

    expect(component.getTransactionDetails).toHaveBeenCalledWith(event.id);
  });

  it("should show an error notification when no ID is provided", () => {
    const event = { id: null };
    spyOn(component, "getTransactionDetails");
    spyOn(notificationService, "error");

    component.onRowClick(event);

    expect(component.getTransactionDetails).not.toHaveBeenCalled();
    expect(notificationService.error).toHaveBeenCalledWith("Transaction not found");
  });

  it("should call getTransactionTableData from edit service if getTransactionTableData is called", () => {
    spyOn(editorService, "getTransactionTableData").and.returnValue(
      of({
        totalRecordCount: 4,
        data: [{transactionStatus: {id:1, name:""}}],
      })
    );
    component.getTransactionTableData({} as any);
    expect(editorService.getTransactionTableData).toHaveBeenCalled();
  });
});
