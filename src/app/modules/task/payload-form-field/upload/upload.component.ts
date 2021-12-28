import {Component, Input, OnInit} from '@angular/core';
import {TaskService} from "../../services/task.service";
import {BaseWidget, UploadMetaData} from "../../model/create-form.models";
import {parseApiResponse} from '../../../../utils';
import {NotificationService} from '../../../../services/notification.service';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent implements OnInit {

  constructor(private taskService: TaskService, private notificationService: NotificationService) { }

  ngOnInit(): void {
    if(this.item?.value?.value){
      this.file = {
        name: this.item?.value?.value?.fileName
      };
    }
  }

  @Input() item: BaseWidget = {} as BaseWidget;
  @Input() viewMode = false;
  @Input() editMode = false;
  @Input() isDisabled = false;
  loading = false;
  uploadStatus = "";
  file: any = null;

  get metaData(): UploadMetaData {
    return this.item.metaData as UploadMetaData;
  }

  uploadFile(fileData){
    const transactionId = this.taskService.getTransactionDetails()?.transactionId
    if(!this.file){
      this.notificationService.info('Please select file for upload', 'Info')
      return
    }
    if(transactionId){
      this.loading = true;
      this.uploadStatus = 'pending';
      this.taskService.uploadFile(fileData, { transactionId }).subscribe( result => {
        this.loading = false;
        const { data, error } = parseApiResponse(result);
        if (data && !error) {
          this.notificationService.success('File Uploaded Saved Successfully', 'Success');
          this.item.value.value = data;
          this.uploadStatus = 'completed';
        } else {
          this.notificationService.error(error.errorMessage);
        }
      }, error => {
        // TODo error handling
        this.loading = false;
      })
    }
  }
}
