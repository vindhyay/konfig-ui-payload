import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "toUrl"
})
export class ToUrlPipe implements PipeTransform {
  transform(link: string, ...args: unknown[]): unknown {
    return link.startsWith("http://") || link.startsWith("https://") ? link : `http://${link}`;
  }
}
