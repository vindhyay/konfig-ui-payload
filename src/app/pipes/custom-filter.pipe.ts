import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "customFilter",
})
export class CustomFilterPipe implements PipeTransform {
  transform(items: any[], filter: { filterFn?: (item) => boolean; transformFn?: (items) => any }): any[] {
    if (!items || !(filter.filterFn || filter.transformFn)) {
      return items;
    }
    if (filter.transformFn) {
      return filter.transformFn(items);
    }
    return items.filter((item) => {
      return filter.filterFn(item);
    });
  }
}
