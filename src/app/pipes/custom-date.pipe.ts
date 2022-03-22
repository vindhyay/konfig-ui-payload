import { Pipe, PipeTransform } from "@angular/core";
import { DatePipe } from "@angular/common";

@Pipe({
  name: "customDate",
})
export class CustomDatePipe implements PipeTransform {
  transform(date: Date | string, format: string = "medium"): string {
    date = new Date(date);
    date.setDate(date.getDate());
    return new DatePipe("en-US").transform(date, format);
  }
}
