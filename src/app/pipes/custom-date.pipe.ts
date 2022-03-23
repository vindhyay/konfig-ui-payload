import { Pipe, PipeTransform } from "@angular/core";
import { DatePipe } from "@angular/common";

@Pipe({
  name: "customDate",
})
export class CustomDatePipe implements PipeTransform {
  transform(date: Date | string, format: string = "medium"): string {
    date = new Date(date);
    date.setDate(date.getDate());
    if(format.includes('mm')){
      format = format.replace('mm', 'MM')
    }
    if(format === 'MM yy'){
      format = 'MMMM y'
    }
    if(format === 'DD MM yy'){
      format = 'EEEE MMMM y'
    }
    return new DatePipe("en-US").transform(date, format);
  }
}
