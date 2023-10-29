import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";

import { UploadComponent } from "./upload.component";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { RouterTestingModule } from "@angular/router/testing";

import { NotificationService } from "src/app/services/notification.service";
import { EditorService } from "../../editor.service";

import { ActiveToast, IndividualConfig, ToastrService } from "ngx-toastr";
import {of, throwError} from "rxjs";

export class MockToastrService extends ToastrService {
  toasts: ActiveToast<any>[] = [];

  constructor() {
    super(null, null, null, null, null);
  }

  show(message?: string, title?: string, override?: Partial<IndividualConfig>, type?: string): ActiveToast<any> {
    return;
  }
}
describe("UploadComponent", () => {
  let component: UploadComponent;
  let fixture: ComponentFixture<UploadComponent>;
  let editorService: EditorService;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [UploadComponent],
        imports: [HttpClientTestingModule, RouterTestingModule],
        providers: [
          EditorService,
          { provide: NotificationService, useValue: { success: (d) => {}, error: (d) => {}, warn: (d) => {} } },
          { provide: ToastrService, useValue: MockToastrService },
        ],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadComponent);
    component = fixture.componentInstance;
    editorService = TestBed.inject(EditorService);
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should set uploadStatus to complete if upload successfull", () => {
    spyOn(editorService, "getTransactionDetails").and.returnValue({
      transactionId: "TT",
    });

    spyOn(editorService, "uploadFile").and.returnValue(
      of({
        transactionId: "TT",
      } as any)
    );
    component.item = { value: { value: "" } } as any;

    component.file = true;

    component.uploadFile({});
    expect(component.uploadStatus).toBe("completed");
  });


  it("should set uploadStatus to failed if upload failed", () => {
    spyOn(editorService, "getTransactionDetails").and.returnValue({
      transactionId: "TT",
    });

    spyOn(editorService, "uploadFile").and.returnValue(
        throwError("ERROR")
    );
    component.item = { value: { value: "" } } as any;

    component.file = true;

    component.uploadFile({});
    expect(component.uploadStatus).toBe("failed");
  });
});
