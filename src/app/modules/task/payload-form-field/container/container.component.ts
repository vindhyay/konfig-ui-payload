import { Component, Input, OnInit } from "@angular/core";
import { BaseWidget, ContainerActions, ContainerMetaData } from "../../model/create-form.models";
import { EditorService } from "../../editor.service";

@Component({
  selector: "app-container",
  templateUrl: "container.component.html",
  styleUrls: ["./container.component.scss"],
})
export class ContainerComponent implements OnInit {
  @Input() item: BaseWidget = {} as BaseWidget;

  ngOnInit() {}

  get metaData(): ContainerMetaData {
    return this.item.metaData as ContainerMetaData;
  }

  getGlobalTitleStyle() {
    if (this.metaData && this.metaData?.styleProperties && !Object.keys(this.metaData.styleProperties).length) {
      return {
        height: this.metaData.header.height + "px",
      };
    }
    const styleProperties = this.metaData?.styleProperties?.properties;
    if (!styleProperties) {
      return {};
    }
    const {
      textFontStyle,
      fontSize,
      textColor,
      backgroundColor,
      fontStyle,
      fontWeight,
      textDecoration,
      textHorizontalAlign,
      wordSpacing,
      letterSpacing,
      independentBorder,
      borderTopLeftRadius,
      borderTopRightRadius,
      borderRadius,
    } = styleProperties;
    return {
      height: this.metaData.header.height + "px",
      "font-family": textFontStyle,
      "font-size": fontSize,
      color: textColor,
      background: backgroundColor,
      "font-style": fontStyle,
      "font-weight": fontWeight,
      "text-decoration": textDecoration,
      "justify-content": textHorizontalAlign,
      "word-spacing": wordSpacing,
      "letter-spacing": letterSpacing,
      "border-top-left-radius": independentBorder ? borderTopLeftRadius : borderRadius,
      "border-top-right-radius": independentBorder ? borderTopRightRadius : borderRadius,
    };
  }
}
