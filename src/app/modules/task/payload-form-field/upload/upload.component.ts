import { Component, Input, OnInit } from "@angular/core";
import { BaseWidget, UploadMetaData } from "../../model/create-form.models";
import { parseApiResponse } from "../../../../utils";
import { NotificationService } from "../../../../services/notification.service";
import { EditorService } from "../../editor.service";

@Component({
  selector: "app-upload",
  templateUrl: "./upload.component.html",
  styleUrls: [],
})
export class UploadComponent implements OnInit {
  @Input() item: BaseWidget = {} as BaseWidget;
  @Input() isDisabled = false;
  loading = false;
  uploadStatus = "";
  file: any = null;
  constructor(private editorService: EditorService, private notificationService: NotificationService) {}
  ngOnInit(): void {
    if (this.item?.value?.value) {
      this.file = {
        name: this.item?.value?.value?.fileName,
      };
    }
  }

  get metaData(): UploadMetaData {
    return this.item.metaData as UploadMetaData;
  }

  uploadFile(fileData: any) {
    const transactionId = this.editorService.getTransactionDetails()?.transactionId;
    if (!this.file) {
      this.notificationService.info("Please select file for upload", "Info");
      return;
    }
    if (transactionId) {
      this.loading = true;
      this.uploadStatus = "pending";
      this.editorService.uploadFile(fileData, transactionId).subscribe(
        (result) => {
          this.loading = false;
          const { data } = parseApiResponse(result);
          if (data) {
            this.notificationService.success("File Uploaded Saved Successfully", "Success");
            this.item.value.value = data;
            this.uploadStatus = "completed";
          }
        },
        (error) => {
          this.uploadStatus = "failed";
          this.loading = false;
        }
      );
    }
  }
}
