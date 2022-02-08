import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "searchFilter",
  pure: false
})
export class FilterPipe implements PipeTransform {
  transform(items: any[], filter: Record<string, any>): any[] {
    if (!items || !filter) {
      return items;
    }
    const key = Object.keys(filter)[0];
    let subkey = null;
    let value = filter[key];
    if (Object.keys(filter[key])[0]) {
      subkey = Object.keys(filter[key])[0];
      value = filter[key][subkey];
    }
    return items.filter(it => {
      const keyValue = !!subkey ? (it[key][subkey] ? it[key][subkey] : "") : it[key];
      if (!!subkey && !it[key][subkey]) {
        return true;
      }
      return keyValue
        .toString()
        .toLowerCase()
        .includes(value.toString().toLowerCase());
    });
  }
}
