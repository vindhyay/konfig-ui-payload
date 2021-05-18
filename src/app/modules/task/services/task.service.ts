import { Injectable } from '@angular/core';
import { BaseService } from 'src/app/services/base.service';
import { Comments, ITaskDoc, TaskData } from '../model/task-data';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { StorageService } from '../../../services/storage.service';
import {AppConfigService} from "../../../app-config-providers/app-config.service";

export { TaskData, ITaskDoc, Comments };

@Injectable()
export class TaskService extends BaseService {
  constructor(protected http: HttpClient, protected storage: StorageService, protected config: AppConfigService) {
    super(http);
  }
  // TODO add typings
  private taskDetailsSubject = new BehaviorSubject(null);

  // TODO add typings
  private transactionDetailsSubject = new BehaviorSubject(null);

  setTaskDetails(taskDetails : any) {
    this.taskDetailsSubject.next(taskDetails);
  }
  setTransactionDetails(transactionDetails : any) {
    this.transactionDetailsSubject.next(transactionDetails);
  }
  getTransactionDetails(){
    return this.transactionDetailsSubject.getValue();
  }
  modifyTaskField = (payload: any, params: any): Observable<any> => {
    const url = `${this.config.getApiUrls().modifyTaskFieldURL}`;
    return this.postData(url, payload, params);
  };
  getWorkflowTaskData = (transactionId: string, taskId?: string) => {
    const url = `${this.config.getApiUrls().workflowTaskDetailsURL}/${transactionId}/${taskId}`;
    return this.getData(url).subscribe(data => this.setTaskDetails(data));
  };
  editWorkflowTaskData = (transactionId: string, taskId: string, payload: any, params: any): Observable<any> => {
    const url = `${this.config.getApiUrls().saveWorkflowTaskURL}/${transactionId}/${taskId}`;
    return this.postData(`${url}`, payload, params);
  };
  getTransactionAttachments = (transactionId : any): Observable<any> => {
    const url = `${this.config.getApiUrls().getFilesForTransactionURL}/${transactionId}`;
    return this.getData(url);
  };
  getHistoryDataChanges = (params : any): Observable<any> => {
    const url = `${this.config.getApiUrls().getHistoryDataChangesURL}`;
    return this.getData(url, params);
  };
  getDataListValues = (payload): Observable<any> => {
    const url = `${this.config.getApiUrls().getDataListValuesURL}`;
    return this.postData(url, payload);
  }
  uploadFile = (formData, params) : Observable<any> => {
    const url = `${this.config.getApiUrls().uploadFile}`;
    return this.postData(url, formData, params);
  }
}
