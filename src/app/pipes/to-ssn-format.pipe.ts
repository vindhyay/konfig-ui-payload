import { Pipe, PipeTransform } from "@angular/core";
import { toSSNFormat } from "../utils";

@Pipe({
  name: "toSSNFormat",
})
export class ToSSNFormatPipe implements PipeTransform {
  transform(value: any, ...args: unknown[]): unknown {
    return toSSNFormat(value);
  }
}
