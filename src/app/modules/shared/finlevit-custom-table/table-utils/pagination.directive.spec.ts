import { PaginationDirective } from "./pagination.directive";

describe("PaginationDirective", () => {
  it("should create an instance", () => {
    const elementRef = null;
    const renderer = null;
    const directive = new PaginationDirective(elementRef, renderer);
    expect(directive).toBeTruthy();
  });
});
