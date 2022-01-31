import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "paginationFilter",
  pure: false,
})
export class PaginationFilterPipe implements PipeTransform {
  transform(items: any[], filter: Record<string, any>): any[] {
    if (!filter?.isPaginationEnabled) {
      return items;
    }
    if (!items || !filter) {
      return items;
    }
    const start = filter?.page < 0 ? 0 : filter?.page;
    const limit = Math.floor(filter?.limit || 2);
    return items.slice(start * limit, start * limit + limit);
  }
}
