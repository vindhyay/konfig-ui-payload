import { ResizableDirective } from "./resizable.directive";

describe("ResizableDirective", () => {
  it("should create an instance", () => {
    const documentRef: any = null;
    const elementRef: any = null;
    const directive = new ResizableDirective(documentRef, elementRef);
    expect(directive).toBeTruthy();
  });
});
