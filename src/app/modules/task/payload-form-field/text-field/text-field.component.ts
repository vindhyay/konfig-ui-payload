import { Component, Input, OnInit } from "@angular/core";
import { DomSanitizer } from "@angular/platform-browser";
import { BaseWidget, TextMetaData } from "../../model/create-form.models";

@Component({
  selector: "app-text-field",
  templateUrl: "./text-field.component.html",
  styleUrls: ["./text-field.component.scss"]
})
export class TextFieldComponent implements OnInit {
  @Input() item: BaseWidget = {} as BaseWidget;
  @Input() viewMode = false;

  get metaData(): TextMetaData {
    return this.item.metaData as TextMetaData;
  }

  constructor(private sanitizer: DomSanitizer) {}

  html: any = "";

  ngOnInit(): void {
    this.html = this.sanitizer.bypassSecurityTrustHtml(this.metaData?._value);
  }
}
