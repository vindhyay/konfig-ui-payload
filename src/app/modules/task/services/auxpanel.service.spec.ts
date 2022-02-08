import { TestBed } from "@angular/core/testing";

import { AuxpanelService } from "./auxpanel.service";

describe("AuxpanelService", () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it("should be created", () => {
    const service: AuxpanelService = TestBed.get(AuxpanelService);
    expect(service).toBeTruthy();
  });
});
