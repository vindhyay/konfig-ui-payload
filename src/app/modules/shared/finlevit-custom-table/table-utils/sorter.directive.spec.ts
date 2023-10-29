import { SorterDirective } from "./sorter.directive";

describe("SorterDirective", () => {
  it("should create an instance", () => {
    const directive = new SorterDirective();
    expect(directive).toBeTruthy();
  });

  it('should sort in ascending order by default', () => {
    const sorterDirective = new SorterDirective();
    const column = "name";

    sorterDirective.sort(column);

    expect(sorterDirective.direction).toEqual("asc");
  });

  it('should toggle between ascending and descending order for the same column', () => {
    const sorterDirective = new SorterDirective();
    const column = "name";

    sorterDirective.sort(column);
    expect(sorterDirective.direction).toEqual("asc");

    sorterDirective.sort(column);
    expect(sorterDirective.direction).toEqual("desc");

    sorterDirective.sort(column);
    expect(sorterDirective.direction).toEqual("asc");
  });
});
