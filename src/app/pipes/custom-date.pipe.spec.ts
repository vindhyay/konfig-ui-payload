import { TestBed } from "@angular/core/testing";
import { CustomDatePipe } from "./custom-date.pipe";

describe("CustomDatePipe", () => {
  let pipe: CustomDatePipe; 

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CustomDatePipe],
      providers: [CustomDatePipe], 
    });

    pipe = TestBed.inject(CustomDatePipe);
  });
  it("create an instance", () => {
    const pipe = new CustomDatePipe();
    expect(pipe).toBeTruthy();
  });

  it('should transform a valid date to the default "medium" format', () => {
    const inputDate = new Date(2023, 0, 15); 
    const expectedFormattedDate = "Jan 15, 2023, 12:00:00 AM";

    const transformedDate = pipe.transform(inputDate);

    expect(transformedDate).toBe(expectedFormattedDate);
  });

  it("should transform a valid date to a custom format", () => {
    const inputDate = new Date(2023, 0, 15); 
    const customFormat = "DD MM yy"; 
    const expectedFormattedDate = "Sunday January 2023";

    const transformedDate = pipe.transform(inputDate, customFormat);

    expect(transformedDate).toBe(expectedFormattedDate);
  });

  it("should return an empty string for null input", () => {
    const inputDate = null;

    const transformedDate = pipe.transform(inputDate);

    expect(transformedDate).toBe("");
  });
});
