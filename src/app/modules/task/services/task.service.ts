import { Injectable } from "@angular/core";
import { BaseService } from "src/app/services/base.service";
import { Comments, ITaskDoc, TaskData } from "../model/task-data";
import { BehaviorSubject, Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { StorageService } from "../../../services/storage.service";
import { AppConfigService } from "../../../app-config-providers/app-config.service";
import { getFieldFromFields } from "../../../utils";
import { EditorService } from "../editor.service";

export { TaskData, ITaskDoc, Comments };

@Injectable()
export class TaskService extends BaseService {
  constructor(
    protected http: HttpClient,
    protected storage: StorageService,
    protected config: AppConfigService,
    protected editorService: EditorService
  ) {
    super(http);
  }
  // TODO add typings
  private taskDetailsSubject = new BehaviorSubject(null);

  // TODO add typings
  public transactionDetailsSubject = new BehaviorSubject(null);

  setTaskDetails(taskDetails: any) {
    this.taskDetailsSubject.next(taskDetails);
  }
  setTransactionDetails(transactionDetails: any) {
    this.transactionDetailsSubject.next(transactionDetails);
  }
  getTransactionDetails() {
    return this.transactionDetailsSubject.getValue();
  }
  modifyTaskField = (payload: any, params: any): Observable<any> => {
    const url = `${this.config.getApiUrls().modifyTaskFieldURL}`;
    return this.postData(url, payload, params);
  };
  getWorkflowTaskData = (transactionId: string, taskId?: string) => {
    const url = `${this.config.getApiUrls().workflowTaskDetailsURL}/${transactionId}/${taskId}`;
    return this.getData(url).subscribe((data) => this.setTaskDetails(data));
  };
  editWorkflowTaskData = (transactionId: string, taskId: string, payload: any, params: any): Observable<any> => {
    const url = `${this.config.getApiUrls().saveWorkflowTaskURL}/${transactionId}/${taskId}`;
    return this.postData(`${url}`, payload, params);
  };
  getTransactionAttachments = (transactionId: any): Observable<any> => {
    const url = `${this.config.getApiUrls().getFilesForTransactionURL}/${transactionId}`;
    return this.getData(url);
  };
  getHistoryDataChanges = (params: any): Observable<any> => {
    const url = `${this.config.getApiUrls().getHistoryDataChangesURL}`;
    return this.getData(url, params);
  };
  getDataListValues = (payload): Observable<any> => {
    const url = `${this.config.getApiUrls().getDataListValuesURL}`;
    return this.postData(url, payload);
  };
  uploadFile = (formData, params): Observable<any> => {
    const url = `${this.config.getApiUrls().uploadFile}`;
    return this.postData(url, formData, params);
  };
  getTransactionTableData = (params): Observable<any> => {
    const url = `${this.config.getApiUrls().transactionTableURL}`;
    return this.getData(url, params);
  };
  getImageUrl = (): string => {
    return this.config.getApiUrls().getImageURL;
  };
  checkCondition(conditionsArray) {
    const allFields = this.transactionDetailsSubject.value?.uiPayload || [];
    conditionsArray.forEach((element) => {
      let result = null;
      let conditions = element.ifConditions;
      for (let i = 0; i < conditions.length; i++) {
        const condition = conditions[i];
        let condMatched = false;
        condition.rules.forEach((rule, index) => {
          const field = getFieldFromFields(allFields, rule?.field?.value);
          const fieldValue = field?.value?.value;
          let result = false;
          if (rule.operator === "includes") {
            if (rule.value.indexOf(",") > 0) {
              const ruleArray = rule.value.split(",");
              const testCondition = ruleArray.every((r) => (fieldValue || []).includes(r));
              if (testCondition) {
                result = true;
              }
            } else {
              if ((fieldValue || []).includes(rule.value)) {
                result = true;
              }
            }
          } else if (rule.operator === "excludes") {
            if (!(fieldValue || []).includes(rule.value)) {
              result = true;
            }
          } else if (rule.operator === "notEquals") {
            if (String(fieldValue) !== String(rule.value)) {
              result = true;
            }
          } else {
            if (String(fieldValue) == String(rule.value)) {
              result = true;
            }
          }
          condMatched = index === 0 ? result : rule.condition === "and" ? condMatched && result : condMatched || result;
        });
        if (condMatched) {
          result = condition.mappingField;
          console.log("Success", result);
          break;
        }
      }
      if (result) {
        const showFields = result?.showFields || [];
        const hideFields = result?.hideFields || [];
        showFields.forEach((showField) => {
          const showFieldRef = getFieldFromFields(allFields, showField?.value);
          if (showFieldRef) {
            showFieldRef.rows = showFieldRef.metaData?.defaultRows;
            showFieldRef.minItemRows = showFieldRef.metaData?.defaultMinItemRows;
            showFieldRef.minItemCols = showFieldRef.metaData?.defaultMinItemCols;
            showFieldRef.metaData.movement = "DOWN";
            showFieldRef.y = showFieldRef.metaData.originalY;
            this.editorService.widgetChange.next(showFieldRef);
          }
        });
        hideFields.forEach((hideField) => {
          const hideFieldRef = getFieldFromFields(allFields, hideField?.value);
          if (hideFieldRef) {
            hideFieldRef.rows = hideFieldRef?.metaData?.hideRows || 0;
            hideFieldRef.minItemRows = hideFieldRef?.metaData?.hideRows || 0;
            hideFieldRef.metaData.movement = "UP";
            this.editorService.widgetChange.next(hideFieldRef);
          }
        });
        this.editorService.setContainerHeight(allFields);
      }
    });
  }
}
