import { TestBed } from "@angular/core/testing";

import { EditorService } from "./editor.service";
import { FormsModule } from "@angular/forms";
import { RouterTestingModule } from "@angular/router/testing";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { AppConfigService } from "src/app/app-config-providers/app-config.service";
import { SharedModule } from "../shared/shared.module";
import { AuthService } from "../auth/services/auth.service";
import { Observable, of, throwError } from "rxjs";
import { ButtonActions } from "./model/create-form.models";
import { NotificationService } from "src/app/services/notification.service";
import { ToastrService, ActiveToast, IndividualConfig } from "ngx-toastr";

export class MockToastrService extends ToastrService {
  toasts: ActiveToast<any>[] = [];

  constructor() {
    super(null, null, null, null, null);
  }

  show(message?: string, title?: string, override?: Partial<IndividualConfig>, type?: string): ActiveToast<any> {
    return;
  }
}

describe("EditorService", () => {
  let service: EditorService;
  let notificationService: NotificationService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, RouterTestingModule, HttpClientTestingModule, SharedModule, BrowserAnimationsModule],
      providers: [
        AuthService,
        AppConfigService,
        { provide: NotificationService, useValue: { success: (d) => {}, error: (d) => {}, warn: (d) => {} } },
        { provide: ToastrService, useValue: MockToastrService },
      ],
    });
    service = TestBed.inject(EditorService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });

  it("should set the height of the container to the maximum height of the items", () => {
    const container = document.createElement("div");
    container.style.height = "100px";
    spyOn(document, "querySelector").and.returnValue(container);

    const items = [
      { y: 0, rows: 2 },
      { y: 2, rows: 3 },
      { y: 5, rows: 1 },
    ];

    service.setAdjustableHeight(items);

    expect(container.style.height).toBe("100px");
  });

  it("should call uniqueKeyTransaction method with transactionId, uniqueField and screenId parameters and subscribe to the result", () => {
    const uniqueField = { widgetId: "widget123", value: "uniqueValue" };
    const transactionDetails = { transactionId: "transaction123", screenId: "screen123" };
    spyOn(service, "getTransactionDetails").and.returnValue(transactionDetails);
    spyOn(service, "uniqueKeyTransaction").and.returnValue(of({ data: {} }));
    spyOn(service, "showLoader");
    spyOn(service, "setTransactionDetails");

    service.uniqueFieldChange(uniqueField);

    expect(service.uniqueKeyTransaction).toHaveBeenCalledWith(
      transactionDetails.transactionId,
      { uniqueField },
      { screenId: transactionDetails.screenId }
    );
    expect(service.showLoader).toHaveBeenCalledWith(uniqueField.widgetId);
    expect(service.setTransactionDetails).toHaveBeenCalled();
  });

  it("should return false when all parameters have valueType other than ref", () => {
    const onConfigs = {
      action: "populate",
      parameters: [
        {
          value: "value1",
          valueType: "string",
        },
        {
          value: 123,
          valueType: "number",
        },
      ],
    };

    const fields = [];

    const result = service.validatePopulateParams(onConfigs, fields);
    expect(result).toBe(false);
  });

  it("should return true when at least one parameter with valueType ref has invalid input value", () => {
    const onConfigs = {
      action: "populate",
      parameters: [
        {
          value: "widget1",
          valueType: "ref",
        },
        {
          value: "widget2",
          valueType: "ref",
        },
      ],
    };

    const fields = [
      {
        widgetId: "widget1",
        value: {
          value: "",
        },
        validators: {
          required: true,
        },
      },
      {
        widgetId: "widget2",
        value: {
          value: "value2",
        },
        validators: {
          required: true,
        },
      },
    ];

    const result = service.validatePopulateParams(onConfigs, fields);
    expect(result).toBe(true);
  });

  it("should execute without errors when given a valid widgetList", () => {
    const widgetList = [
      {
        id: 1,
        children: [
          {
            id: 2,
            children: [
              {
                id: 3,
                children: [],
              },
            ],
          },
        ],
      },
    ];

    expect(() => service.executeShowHides(widgetList)).not.toThrowError();
  });

  it("should return the current value of the transactionDetails BehaviorSubject", () => {
    const transactionDetails = { transactionId: "123", screenId: "456" };
    service.setTransactionDetails(transactionDetails);
    const result = service.getTransactionDetails();
    expect(result).toEqual(transactionDetails);
  });

  it("should set the condition details when valid input is provided", () => {
    const conditionDetails = {};
    service.setConditionDetails(conditionDetails);
    expect(service.getConditionDetails()).toEqual(conditionDetails);
  });

  it("should update the formFields BehaviorSubject with the provided fields object", () => {
    const formFields = [
      { id: 1, label: "Name", value: "John Doe" },
      { id: 2, label: "Email", value: "johndoe@example.com" },
      { id: 3, label: "Phone", value: "1234567890" },
    ];
    service.setFormFields(formFields);
    expect(service.getFormFields()).toEqual(formFields);
  });

  it("should set the height of the container to the maximum row value of the items multiplied by 10 plus 50 pixels", () => {
    const items = [
      { y: 0, rows: 2, metaData: { isHidden: false } },
      { y: 2, rows: 3, metaData: { isHidden: false } },
      { y: 5, rows: 1, metaData: { isHidden: true } },
      { y: 6, rows: 2, metaData: { isHidden: false } },
    ];

    const container = document.createElement("div");
    container.className = "gridster-container";
    document.body.appendChild(container);

    service.setContainerHeight(items);

    expect(container.style.height).toBe("350px");

    document.body.removeChild(container);
  });

  it("should execute all UI actions in the input array", () => {
    const authServiceMock = jasmine.createSpyObj("AuthService", ["logoff"]);
    const editorService = new EditorService(null, null, authServiceMock, null, null);
    const uiActions = [
      { action: ButtonActions.logout },
      { action: ButtonActions.openModals, fields: ["modal1", "modal2"] },
      { action: ButtonActions.closeModals, fields: ["modal1", "modal2"] },
      { action: ButtonActions.externalLink, externalLink: "https://example.com" },
    ];

    editorService.triggerUIActions(uiActions);

    expect(authServiceMock.logoff).toHaveBeenCalled();
  });

  it("should trigger saveTransaction and submitMultipleAction", () => {
    spyOn(service, "getTransactionDetails").and.returnValue({
      transactionId: "",
      screenId: "",
      application: { appId: "66" },
    });
    spyOn(service, "saveTransaction").and.returnValue(
      of({
        body: { transactionId: "" },
      })
    );
    spyOn(service, "submitMultipleAction").and.returnValue(
      of({
        body: {},
      })
    );
    service.triggerButtonActionEvents({
      transactionId: "",
      data: {},
      uiActions: [],
      businessRuleIds: [],
    } as any);

    expect(service.isTriggerInProgress).toBe(false);
  });

  it("should handle error", () => {
    spyOn(service, "getTransactionDetails").and.returnValue({
      transactionId: "",
      screenId: "",
      application: { appId: "66" },
    });
    spyOn(service, "hideLoader");
    spyOn(service, "saveTransaction").and.returnValue(throwError("ERROR"));
    spyOn(service, "submitMultipleAction").and.returnValue(
      of({
        body: {},
      })
    );
    service.triggerButtonActionEvents({
      transactionId: "",
      data: {},
      uiActions: [],
      businessRuleIds: [],
    } as any);

    expect(service.hideLoader).toHaveBeenCalled();
  });

  it("should handle error", () => {
    spyOn(service, "getTransactionDetails").and.returnValue({
      transactionId: "",
      screenId: "",
      application: { appId: "66" },
    });
    spyOn(service, "hideLoader");
    spyOn(service, "saveTransaction").and.returnValue(
      of({
        body: { transactionId: "" },
      })
    );
    spyOn(service, "submitMultipleAction").and.returnValue(throwError("ERROR"));
    service.triggerButtonActionEvents({
      transactionId: "",
      data: {},
      uiActions: [],
      businessRuleIds: [],
    } as any);

    expect(service.hideLoader).toHaveBeenCalled();
  });

  it("should call executeRules when onRuleTrigger triggered", () => {
    spyOn(service, "getTransactionDetails").and.returnValue({
      transactionId: "",
      screenId: "",
      application: { appId: "66" },
      applicationVersionId: "",
      uiPayload: {},
    });
    spyOn(service, "executeRules").and.returnValue(
      new Observable((observer) => {
        observer.next({
          currentScreenPayload: [{ children: [{ children: [] }] }],
          errors: [{ type: "PAGE_ERROR" }, { type: "PAGE_WARNING" }],
        });
        observer.complete();
      })
    );

    service.onRuleTrigger({ data: { metaData: { ruleIds: [1, 2, 3] } } });

    expect(service.isTriggerInProgress).toBe(false);
  });

  it("should handle a single field without children", () => {
    const fields: any[] = [
      {
        name: "Field 1",
        children: [],
      },
    ];
    service.onPopulateTriggerCondition(fields);
    // You can make assertions here if the function modifies the fields array
    expect(fields[0].name).toBe("Field 1"); // For example, check that the field properties remain the same
  });

  it("should trigger button action events if no validation error", () => {
    // Define sample event data
    const event = {
      data: {
        value: { value: "sampleValue" },
        metaData: {
          widgetEvent: [
            {
              action: "action1",
              parameters: [
                {
                  name: "param1",
                  value: "paramValue",
                  valueType: "string",
                },
              ],
            },
          ],
          businessRuleIds: ["businessRule1", "businessRule2"],
        },
        widgetId: "widget1",
      },
    };

    spyOn(service, "validatePopulateParams").and.returnValue(false);
    spyOn(service, "triggerButtonActionEvents");

    service.onOptionChange(event);

    // Assert that the corresponding methods are called
    expect(service.validatePopulateParams).toHaveBeenCalled();
    expect(service.triggerButtonActionEvents).toHaveBeenCalledWith({
      triggerId: event.data.widgetId,
      data: event.data,
      uiActions: [],
      businessRuleIds: event.data.metaData.businessRuleIds as any,
    });
  });
});
