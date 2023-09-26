import { ToSSNFormatPipe } from "./to-ssn-format.pipe";

describe("ToSsnFormatPipe", () => {
  it("create an instance", () => {
    const pipe = new ToSSNFormatPipe();
    expect(pipe).toBeTruthy();
  });
});
