import { Component, Input, OnInit } from "@angular/core";
import { AuthService } from "src/app/modules/auth/services/auth.service";
import { AvatarMetaData, BaseWidget } from "../../model/create-form.models";
import { TaskService } from "../../services/task.service";

@Component({
  selector: "app-avatar",
  templateUrl: "./avatar.component.html",
  styleUrls: ["./avatar.component.scss"],
})
export class AvatarComponent implements OnInit {
  constructor(private taskService: TaskService, private authService: AuthService) {}

  ngOnInit() {
    if (this.metaData.configureLoginData) {
      this.configureFromLoginData();
    }
  }

  get metaData(): AvatarMetaData {
    return this.item.metaData as AvatarMetaData;
  }

  getImageUrl = this.taskService.getImageUrl();
  @Input() item: BaseWidget = {} as BaseWidget;
  currentUser: any;

  convertFallbackText() {
    if (this.metaData.fallbackText) {
      let lettersArray = this.metaData.fallbackText.match(/\b(\w)/g);
      if (lettersArray.length > 2) {
        return lettersArray[0];
      } else {
        return lettersArray.join("");
      }
    }
  }

  configureFromLoginData() {
    this.currentUser = this.authService.getCurrentUser();
    this.item.label = this.currentUser.name;
    this.metaData.fallbackText = this.currentUser.name;
    this.metaData.caption = this.currentUser.emailId;
  }
}
