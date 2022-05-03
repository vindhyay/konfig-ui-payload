import { GetBorderShadowFilter } from "./shadow-border.pipe";

describe("GetBorderShadowFilter", () => {
  it("create an instance", () => {
    const pipe = new GetBorderShadowFilter();
    expect(pipe).toBeTruthy();
  });
});
