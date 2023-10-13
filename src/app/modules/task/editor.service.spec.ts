import { TestBed } from "@angular/core/testing";

import { EditorService } from "./editor.service";
import { FormsModule } from "@angular/forms";
import { RouterTestingModule } from "@angular/router/testing";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { AppConfigService } from "src/app/app-config-providers/app-config.service";
import { SharedModule } from "../shared/shared.module";
import { AuthService } from "../auth/services/auth.service";
import { of, throwError } from "rxjs";

describe("EditorService", () => {
  let service: EditorService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, RouterTestingModule, HttpClientTestingModule, SharedModule, BrowserAnimationsModule],
      providers: [AuthService, AppConfigService],
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
});
