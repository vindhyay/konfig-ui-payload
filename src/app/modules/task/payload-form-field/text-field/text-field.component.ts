import { Component, Input, OnInit } from "@angular/core";
import { DomSanitizer, SafeHtml } from "@angular/platform-browser";
import { BaseWidget, TextMetaData } from "../../model/create-form.models";

@Component({
  selector: "app-text-field",
  templateUrl: "./text-field.component.html",
  styleUrls: [],
})
export class TextFieldComponent implements OnInit {
  @Input() item: BaseWidget = {} as BaseWidget;
  @Input() viewMode = false;

  get metaData(): TextMetaData {
    return this.item.metaData as TextMetaData;
  }

  constructor(private sanitizer: DomSanitizer) {}

  html: SafeHtml = "";

  ngOnInit(): void {
    this.html = this.sanitizer.bypassSecurityTrustHtml(this.metaData?._value);
  }
}
