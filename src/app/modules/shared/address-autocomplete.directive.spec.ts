import { AddressAutocompleteDirective } from "./address-autocomplete.directive";

describe("AddressAutocompleteDirective", () => {
  it("should create an instance", () => {
    const elementRef: any = null;
    const directive = new AddressAutocompleteDirective(elementRef);
    expect(directive).toBeTruthy();
  });
});
