import { Pipe, PipeTransform } from "@angular/core";
import { getBorderStyle } from "../utils";

@Pipe({
  name: "getBorderShadowFilter",
  pure: false
})
export class GetBorderShadowFilter implements PipeTransform {
  transform(styleObj: any, filter: Record<string, any>): any {
    if (!styleObj || !filter) {
      return null;
    }
    const key = Object.keys(filter)[0];
    let value = filter[key];
    const borderStyle = getBorderStyle(styleObj);
    if (value == "shadow") return { "box-shadow": borderStyle["box-shadow"] };
    else if (value == "shadow_string") return borderStyle["box-shadow"];
    return borderStyle;
  }
}
