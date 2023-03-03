import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { ConfigUrlsModel } from "../state/model/config-urls-model";
import { CONFIG_FILE_PATH } from "../state/constants";

@Injectable({
  providedIn: "root",
})
export class AppConfigService {
  private apiUrls: Object = {};
  constructor(private http: HttpClient) {}

  public loadAppConfig(): Promise<any> {
    return this.getConfigFile().then((config) => {
      this.apiUrls = this.appendBaseUrls(config);
      return this.apiUrls;
    });
  }

  private getConfigFile(): Promise<ConfigUrlsModel> {
    return this.http
      .get(CONFIG_FILE_PATH)
      .toPromise()
      .then((config: any) => {
        return config;
      });
  }

  public getApiUrls(): any {
    return this.apiUrls;
  }

  private appendBaseUrls(config: ConfigUrlsModel = {} as ConfigUrlsModel) {
    const WORKFLOW_ADMIN_BASE_URL = config.workflowAdminBaseURL || "";
    const ACCOUNT_WORKFLOW_BASE_URL = config.accountWorkflowBaseURL || "";
    const SOCKET_BASE_URL = config.socketBaseURL || "";
    const AUTH_BASE_URL = config.authBaseUrl || "";
    return {
      // Token Gen URL
      authenticateUrl: AUTH_BASE_URL + "/access-token",
      // Refresh token URL
      getAccessTokenUrl: AUTH_BASE_URL + "/refresh-token",
      // LOGOUT URL
      logoutURL: AUTH_BASE_URL + "/logout",
      // Permissions URl
      loginUrl: WORKFLOW_ADMIN_BASE_URL + "/user/permissions",
      // Task Details URL
      workflowTaskDetailsURL: ACCOUNT_WORKFLOW_BASE_URL + "/rest/workflow/get/transaction",
      // History Task Details URL
      workflowHistoryTaskDetailsURL: ACCOUNT_WORKFLOW_BASE_URL + "/rest/workflow/get/history",
      // Perform Action on Task URL
      doActionOnTaskURL: ACCOUNT_WORKFLOW_BASE_URL + "/rest/workflow/updateStatus/transaction",
      // Save Task Details URL
      saveWorkflowTaskURL: ACCOUNT_WORKFLOW_BASE_URL + "/rest/workflow/saveWorkflowData",
      // Assign Task URl
      assignTaskUrl: ACCOUNT_WORKFLOW_BASE_URL + "/rest/workflow/assign",
      // My Tasks URL
      userTasksURL: ACCOUNT_WORKFLOW_BASE_URL + "/rest/workflow/get-myQueue",
      // Post Comment On Task URl
      postCommentOnTaskURL: ACCOUNT_WORKFLOW_BASE_URL + "/rest/workflow/post-comment",
      // Task Priority URL
      changeTaskPriorityURL: ACCOUNT_WORKFLOW_BASE_URL + "/rest/workflow/change-priority",
      // SLA Start URL
      startTaskSlaURL: ACCOUNT_WORKFLOW_BASE_URL + "/rest/workflow/start-sla",
      // SLA suspend URL
      suspendTaskURL: ACCOUNT_WORKFLOW_BASE_URL + "/rest/workflow/suspend-sla",
      // Document Upload URL
      fileUploadURL: ACCOUNT_WORKFLOW_BASE_URL + "/rest/workflow/uploaddocument",
      // Documents For Transaction URL
      getFilesForTransactionURL: ACCOUNT_WORKFLOW_BASE_URL + "/rest/workflow/documents",
      // Documents For History Transaction URL
      getFilesForHistoryTransactionURL: ACCOUNT_WORKFLOW_BASE_URL + "/rest/workflow/archive/documents",
      // Queue Config URL
      getQueueColumnsUrl: ACCOUNT_WORKFLOW_BASE_URL + "/rest/workflow/get/queueconfig",
      // USER associated Workflow & Roles URL
      getWorkflow: ACCOUNT_WORKFLOW_BASE_URL + "/rest/user/workflow-roles",
      // set USER preferences URL
      setPreferences: ACCOUNT_WORKFLOW_BASE_URL + "/rest/user/update-preference",
      // get USER preferences URL
      getPreferences: ACCOUNT_WORKFLOW_BASE_URL + "/rest/user/preference",
      // get USER associated Groups URL
      getGroups: ACCOUNT_WORKFLOW_BASE_URL + "/rest/workflow/getGroupsForUser",
      // get My Tasks Stats URL
      getMyTaskStatsURL: ACCOUNT_WORKFLOW_BASE_URL + "/analytics/getWSUnion-myTask",
      // get Team Tasks Stats URL
      getTeamTaskStatsURL: ACCOUNT_WORKFLOW_BASE_URL + "/analytics/getWSUnion-teamTask",
      // get History Tasks Stats URL
      getHistoryTaskStatsURL: ACCOUNT_WORKFLOW_BASE_URL + "/analytics/getWSUnion-history",
      // Task Stats Websocket URL
      taskStatSocketURL: SOCKET_BASE_URL + "/socket",
      // Productivity Chart URL
      getProductivityChartDataURL: ACCOUNT_WORKFLOW_BASE_URL + "/analytics/productivity-chart",
      // SLa Chart URL
      getSlaChartDataURL: ACCOUNT_WORKFLOW_BASE_URL + "/analytics/sla-chart",
      // Productivity Report URL
      getProductivityReportURL: ACCOUNT_WORKFLOW_BASE_URL + "/analytics/productivity-report",
      // SLA Report URL
      getSlaReportURL: ACCOUNT_WORKFLOW_BASE_URL + "/analytics/sla-report",
      // Modify Task Field URL
      modifyTaskFieldURL: ACCOUNT_WORKFLOW_BASE_URL + "/rest/workflow/update-data-in-details",
      // Get Fields For Columns Config URL
      getAvailableColumnsURL: ACCOUNT_WORKFLOW_BASE_URL + "/rest/user/get-all-columns",
      // Get Configured Columns URL
      getConfiguredColumnsURL: ACCOUNT_WORKFLOW_BASE_URL + "/rest/user/get-columns-pref",
      // Save Columns Config URL
      saveConfiguredColumnsURL: ACCOUNT_WORKFLOW_BASE_URL + "/rest/user/save-columns-pref",
      // Save Out Of Office URL
      saveOutOfOfficeURL: ACCOUNT_WORKFLOW_BASE_URL + "/rest/user/save-outOfOffice",
      // Get Out Of Office URl
      getOutOfOfficeURL: ACCOUNT_WORKFLOW_BASE_URL + "/rest/user/get-outOfOffice",
      // Export Tasks URL
      exportTasksURL: ACCOUNT_WORKFLOW_BASE_URL + "/export/task-report",
      // Export Productivity URL
      exportProductivityURL: ACCOUNT_WORKFLOW_BASE_URL + "/export/prod-report",
      // Export SLA URL
      exportSLAURL: ACCOUNT_WORKFLOW_BASE_URL + "/export/sla-report",
      // Get History columns
      getAllHistoryColumnsURL: ACCOUNT_WORKFLOW_BASE_URL + "/user/get-all-history-columns",
      // Convert data payload to meta data
      getConvertPayloadToMetaDataURL: ACCOUNT_WORKFLOW_BASE_URL + "/transaction/convert-payload-to-meta-data",
      // Demo analytics URL
      getNewAnalyticsURL: ACCOUNT_WORKFLOW_BASE_URL + "/analytics/get-project-summary",
      // Demo analytics export URl
      exportDemoTableURL: ACCOUNT_WORKFLOW_BASE_URL + "/export/project-report",
      // GET IMAGE URL
      getImageURL: WORKFLOW_ADMIN_BASE_URL + "/field/image",
      // Payload
      // get all transactions
      getAllTransactionsURL: ACCOUNT_WORKFLOW_BASE_URL + "/transaction/get-all-transactions",
      // get transaction details
      getTransactionURL: ACCOUNT_WORKFLOW_BASE_URL + "/transaction",
      // Submit with files URL
      submitWithFilesURL: ACCOUNT_WORKFLOW_BASE_URL + "/transaction/submit-with-files",
      // save transaction URL
      saveTransactionURL: ACCOUNT_WORKFLOW_BASE_URL + "/transactions",
      // Populate Transaction Fields URL
      populateTransactionURL: ACCOUNT_WORKFLOW_BASE_URL + "/transaction/populate-data-trigger",
      // Unique Key Transaction URL
      uniqueKeyTransactionURL: ACCOUNT_WORKFLOW_BASE_URL + "/transaction/unique-fields",
      // get workflow details URL
      getWorkflowDetailsURL: WORKFLOW_ADMIN_BASE_URL + "/get-workflow-detail",
      // create transaction for  workflow URL
      createTransactionURL: ACCOUNT_WORKFLOW_BASE_URL + "/transactions",
      // get payload stats
      getTransactionCountURL: ACCOUNT_WORKFLOW_BASE_URL + "/transaction/get-transaction-count",
      // data-changes for my-tasks and team-tasks
      getDataChangesURL: ACCOUNT_WORKFLOW_BASE_URL + "/workflow/data-changes",
      // data-changes for history
      getHistoryDataChangesURL: ACCOUNT_WORKFLOW_BASE_URL + "/workflow/archived-data-changes",
      // task-table-socket
      taskTableSocketURL: SOCKET_BASE_URL + "/socket/task-table",
      // Data list values URL
      getDataListValuesURL: WORKFLOW_ADMIN_BASE_URL + "/resource/query-result",
      // Upload files
      uploadFile: ACCOUNT_WORKFLOW_BASE_URL + "/transactions/{transactionId}/files",
      // Transaction Table Data URL
      transactionTableURL: ACCOUNT_WORKFLOW_BASE_URL + "/transaction/status",
      // Wizard Screen APIs
      saveAndValidateScreenURL: ACCOUNT_WORKFLOW_BASE_URL + "/transaction/save-and-validate",
      getScreenDataURL: ACCOUNT_WORKFLOW_BASE_URL + "/transaction",
      //MultipleClickActionSubmit
      submitMultipleAction: ACCOUNT_WORKFLOW_BASE_URL + "/transactions/{transactionId}/click-trigger",
      // Update row API
      updateTableRowDataURL: ACCOUNT_WORKFLOW_BASE_URL + "/transactions",
    };
  }
}
