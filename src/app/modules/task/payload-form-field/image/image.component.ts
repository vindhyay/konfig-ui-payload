import { Component, Input, OnInit } from "@angular/core";
import { BaseWidget, ImageMetaData } from "../../model/create-form.models";
import { EditorService } from "../../editor.service";

@Component({
  selector: "app-image",
  templateUrl: "./image.component.html",
  styleUrls: ["./image.component.scss"],
})
export class ImageComponent implements OnInit {
  constructor(private editorService: EditorService) {}

  ngOnInit() {}

  getImageUrl = this.editorService.getImageUrl();
  @Input() item: BaseWidget = {} as BaseWidget;

  get metaData(): ImageMetaData {
    return this.item.metaData as ImageMetaData;
  }
}
