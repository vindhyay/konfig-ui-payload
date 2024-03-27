import { Pipe, PipeTransform } from "@angular/core";
import { BaseStyle } from "../modules/task/model/create-form.models";

@Pipe({
  name: "findStyles",
})
export class FindStylesPipe implements PipeTransform {
  transform(items: any[], filter: Record<string, any>): BaseStyle {
    if (!items || !filter) {
      return {} as BaseStyle;
    }
    const key = Object.keys(filter)[0];
    let value = filter[key];
    return items.find((it) => it[key] === value);
  }
}
