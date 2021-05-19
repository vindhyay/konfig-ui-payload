import {Component, Input, OnInit} from '@angular/core';
import {TaskService} from "../../services/task.service";
import {BaseWidget, UploadMetaData} from "../../model/create-form.models";

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent implements OnInit {

  constructor(private taskService: TaskService) { }

  ngOnInit(): void {
  }

  @Input() item: BaseWidget = {} as BaseWidget;
  @Input() viewMode = false;
  @Input() editMode = false;
  loading = false;

  file: any = null;

  get metaData(): UploadMetaData {
    return this.item.metaData as UploadMetaData;
  }

  uploadFile(fileData){
    const transactionId = this.taskService.getTransactionDetails()?.transactionId
    if(transactionId){
      this.loading = true;
      this.taskService.uploadFile(fileData, { transactionId }).subscribe( result => {
        this.loading = false;
        if(result){
          this.item.value.value = result;
          console.log(this.item);
        }
      }, error => {
        // TODo error handling
        this.loading = false;
      })
    }
  }
}
