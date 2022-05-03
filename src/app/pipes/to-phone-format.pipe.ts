import { Pipe, PipeTransform } from "@angular/core";
import { toPhoneFormat } from "../utils";

@Pipe({
  name: "toPhoneFormat",
})
export class ToPhoneFormatPipe implements PipeTransform {
  transform(value: any, ...args: unknown[]): unknown {
    return toPhoneFormat(value);
  }
}
