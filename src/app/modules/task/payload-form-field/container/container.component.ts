import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { BaseWidget, ContainerActions, ContainerMetaData } from "../../model/create-form.models";

@Component({
  selector: "app-container",
  templateUrl: "container.component.html",
  styleUrls: ["./container.component.scss"]
})
export class ContainerComponent implements OnInit {
  constructor() { }

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
    if (!this.metaData || !this.metaData.onClickConfig || !this.metaData.onClickConfig.action) return;
    if (this.metaData.onClickConfig.action === ContainerActions.next || this.metaData.onClickConfig.action === ContainerActions.previous) {
      this.onBtnClick.emit({ event: $event, data });
    } else if (this.metaData.onClickConfig.action === ContainerActions.externalLink) {
      window.open(this.metaData.externalLink, "_blank");
    }
  }

  ngOnInit() { }

  get metaData(): ContainerMetaData {
    return this.item.metaData as ContainerMetaData;
  }

  getGlobalStyles() {
    if (this.metaData && this.metaData?.styleProperties && !Object.keys(this.metaData.styleProperties).length) {
      return {};
    }
    const styleProperties = this.metaData?.styleProperties?.properties;
    if (!styleProperties) {
      return {};
    }
    const {
      independentBorder,
      borderTopStyle,
      borderLeftStyle,
      borderBottomStyle,
      borderRightStyle,
      borderTopLeftRadius,
      borderTopRightRadius,
      borderBottomLeftRadius,
      borderBottomRightRadius,
      borderTopColor,
      borderLeftColor,
      borderBottomColor,
      borderRightColor,
      borderTopWidth,
      borderLeftWidth,
      borderBottomWidth,
      borderRightWidth,
      borderStyle,
      borderRadius,
      borderColor,
      borderWidth
    } = styleProperties;
    return {
      "border-top-style": independentBorder ? borderTopStyle : borderStyle,
      "border-left-style": independentBorder ? borderLeftStyle : borderStyle,
      "border-bottom-style": independentBorder ? borderBottomStyle : borderStyle,
      "border-right-style": independentBorder ? borderRightStyle : borderStyle,

      "border-top-left-radius": independentBorder ? borderTopLeftRadius : borderRadius,
      "border-top-right-radius": independentBorder ? borderTopRightRadius : borderRadius,
      "border-bottom-left-radius": independentBorder ? borderBottomLeftRadius : borderRadius,
      "border-bottom-right-radius": independentBorder ? borderBottomRightRadius : borderRadius,

      "border-top-color": independentBorder ? borderTopColor : borderColor,
      "border-left-color": independentBorder ? borderLeftColor : borderColor,
      "border-bottom-color": independentBorder ? borderBottomColor : borderColor,
      "border-right-color": independentBorder ? borderRightColor : borderColor,

      "border-top-width": independentBorder ? borderTopWidth : borderWidth,
      "border-left-width": independentBorder ? borderLeftWidth : borderWidth,
      "border-bottom-width": independentBorder ? borderBottomWidth : borderWidth,
      "border-right-width": independentBorder ? borderRightWidth : borderWidth
    };
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
        height: this.metaData.header.height + "px"
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
      borderRadius
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
      "border-top-right-radius": independentBorder ? borderTopRightRadius : borderRadius
    };
  }
}
