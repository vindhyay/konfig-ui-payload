import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { BaseWidget, ContainerActions, ContainerMetaData } from "../../model/create-form.models";

@Component({
  selector: "app-container",
  templateUrl: "container.component.html",
  styleUrls: ["./container.component.scss"],
})
export class ContainerComponent implements OnInit {
  constructor() {}

  @Input() item: BaseWidget = {} as BaseWidget;
  @Input() viewMode = false;
  @Input() showEdit;
  @Output() onBtnClick = new EventEmitter();
  @Output() onOptionChange = new EventEmitter();
  @Output() onTableDataChange = new EventEmitter();

  optionChange($event, data) {
    this.onOptionChange.emit({ event: $event, data });
  }

  actionBtnClick($event, data) {
    $event.stopPropagation();
    if (!this.metaData || !this.metaData.onClickConfigs || !this.metaData.onClickConfigs[0].action) return;
    if (
      this.metaData.onClickConfigs[0].action === ContainerActions.next ||
      this.metaData.onClickConfigs[0].action === ContainerActions.previous
    ) {
      this.onBtnClick.emit({ event: $event, data });
    } else if (this.metaData.onClickConfigs[0].action === ContainerActions.externalLink) {
      window.open(this.metaData.externalLink, "_blank");
    }
  }

  ngOnInit() {}

  get metaData(): ContainerMetaData {
    return this.item.metaData as ContainerMetaData;
  }

  getGlobalShadow() {
    if (this.metaData && this.metaData?.styleProperties && !Object.keys(this.metaData.styleProperties).length) {
      return {};
    }
    const styleProperties = this.metaData?.styleProperties?.properties;
    if (!styleProperties) {
      return {};
    }
    const { shadowStyle, horizontalOffset, verticalOffset, blurRadius, spreadRadius, boxShadowColor } = styleProperties;
    const styles = {};
    switch (shadowStyle) {
      case "none":
        break;
      case "inset":
        styles["box-shadow"] =
          horizontalOffset +
          " " +
          verticalOffset +
          " " +
          blurRadius +
          " " +
          spreadRadius +
          " " +
          boxShadowColor +
          " inset";
        break;
      case "outset":
        styles["box-shadow"] =
          horizontalOffset + " " + verticalOffset + " " + blurRadius + " " + spreadRadius + " " + boxShadowColor;
        break;
    }
    return styles;
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
