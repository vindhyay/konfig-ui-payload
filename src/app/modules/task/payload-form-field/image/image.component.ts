import { Component, Input, OnInit } from "@angular/core";
import { BaseWidget, ImageMetaData } from "../../model/create-form.models";
import { TaskService } from "../../services/task.service";

@Component({
  selector: "app-image",
  templateUrl: "./image.component.html",
  styleUrls: ["./image.component.scss"],
})
export class ImageComponent implements OnInit {
  constructor(private taskService: TaskService) {}

  ngOnInit() {}

  getImageUrl = this.taskService.getImageUrl();
  @Input() item: BaseWidget = {} as BaseWidget;

  get metaData(): ImageMetaData {
    return this.item.metaData as ImageMetaData;
  }
}
