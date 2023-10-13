import { TestBed } from "@angular/core/testing";
import { ValueToLabelPipe } from "./value-to-label.pipe";

describe("ValueToLabelPipe", () => {
  let pipe: ValueToLabelPipe;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ValueToLabelPipe],
      providers: [ValueToLabelPipe], 
    });

    pipe = TestBed.inject(ValueToLabelPipe); 
  });

  it("create an instance", () => {
    const pipe = new ValueToLabelPipe();
    expect(pipe).toBeTruthy();
  });

  it("should return the original value when labelAndValue is false", () => {
    const value = "option1";
    const optionsList = [{ name: "Option 1", value: "option1" }];
    const labelAndValue = false;

    const result = pipe.transform(value, optionsList, labelAndValue);

    expect(result).toBe(value);
  });

  it("should return the label associated with the provided value when labelAndValue is true", () => {
    const value = "option2";
    const optionsList = [
      { name: "Option 1", value: "option1" },
      { name: "Option 2", value: "option2" },
    ];
    const labelAndValue = true;

    const result = pipe.transform(value, optionsList, labelAndValue);

    expect(result).toBe("Option 2");
  });

  it("should return undefined when the value does not match any option", () => {
    const value = "option3";
    const optionsList = [
      { name: "Option 1", value: "option1" },
      { name: "Option 2", value: "option2" },
    ];
    const labelAndValue = true;

    const result = pipe.transform(value, optionsList, labelAndValue);

    expect(result).toBeUndefined();
  });
});
