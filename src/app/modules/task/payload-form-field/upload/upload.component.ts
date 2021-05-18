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


  get metaData(): UploadMetaData {
    return this.item.metaData as UploadMetaData;
  }

  uploadFile(formData){
    const transactionId = this.taskService.getTransactionDetails()?.id
    if(transactionId){
      this.taskService.uploadFile(formData, { transactionId }).subscribe( result => {
        if(result){
          this.item.value.value = result;
        }
      }, error => {
        // TODo error handling
      })
    }
  }
}
