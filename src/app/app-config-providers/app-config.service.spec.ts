import { getTestBed, TestBed } from "@angular/core/testing";
import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";

import { AppConfigService } from "./app-config.service";

describe("AppConfigService", () => {
  let injector: TestBed;
  let appConfigService: AppConfigService;
  let httpMock: HttpTestingController;
  let dummyConfigUrls = {
    workflowAdminBaseURL: "http://workflow-admin.dev.finlevit.io/",
    authBaseUrl: "http://security-service.dev.finlevit.io/",
  };
  let dummyAPIEndPointUrls = {
    authenticateUrl: "http://security-service.dev.finlevit.io/authenticate",
    loginURL: "http://workflow-admin.dev.finlevit.io//userprofileservice/loginuserprofile",
    getBusinessGroupsURL: "http://workflow-admin.dev.finlevit.io//workflowadmin/rest/businessgroups",
    postBusinessGroupsURL: "http://workflow-admin.dev.finlevit.io//workflowadmin/rest/businessgroup",
    deleteBusinessGroupURL: "http://workflow-admin.dev.finlevit.io//workflowadmin/rest/businessgroup",
    getUserGroupsURL: "http://workflow-admin.dev.finlevit.io//workflowadmin/rest/usergroups",
    postUserGroupsURL: "http://workflow-admin.dev.finlevit.io//workflowadmin/rest/usergroup",
    deleteUserGroupsURL: "http://workflow-admin.dev.finlevit.io//workflowadmin/rest/usergroup",
    getAppsURL: "http://workflow-admin.dev.finlevit.io//workflowadmin/rest/appdetails",
    postAppURL: "http://workflow-admin.dev.finlevit.io//workflowadmin/rest/appdetail",
    postAppPayloadFileURL: "http://workflow-admin.dev.finlevit.io//workflowadmin/rest/savepayload",
    deleteAppURL: "http://workflow-admin.dev.finlevit.io//workflowadmin/rest/appdetail",
    lookupsURL: "http://workflow-admin.dev.finlevit.io//workflowadmin/rest/lookups",
    workflowMappingURL: "http://workflow-admin.dev.finlevit.io//workflowadmin/rest/workflowmappings",
    removeTaskFromWorkflowURL: "http://workflow-admin.dev.finlevit.io//workflowadmin/rest/workflowmappingchild",
    deleteWorkflowUrl: "http://workflow-admin.dev.finlevit.io//workflowadmin/rest/workflow",
    addOrUpdateWorkflowURL: "http://workflow-admin.dev.finlevit.io//workflowadmin/rest/workflowmapping",
    getActionsURL: "http://workflow-admin.dev.finlevit.io//workflowadmin/rest/taskactions",
    addUpdateActionURL: "http://workflow-admin.dev.finlevit.io//workflowadmin/rest/taskaction",
    deleteActionURL: "http://workflow-admin.dev.finlevit.io//workflowadmin/rest/action",
    getRolesURL: "http://workflow-admin.dev.finlevit.io//workflowadmin/rest/roles",
    addUpdateRoleURL: "http://workflow-admin.dev.finlevit.io//workflowadmin/rest/role",
    getWorkflowTasks: "http://workflow-admin.dev.finlevit.io//workflowadmin/rest/tasks",
    addTaskURL: "http://workflow-admin.dev.finlevit.io//workflowadmin/rest/task",
    deleteTaskURL: "http://workflow-admin.dev.finlevit.io//workflowadmin/rest/task",
    getSlaURL: "http://workflow-admin.dev.finlevit.io//workflowadmin/rest/workflowslas",
    addSlaURL: "http://workflow-admin.dev.finlevit.io//workflowadmin/rest/workflowsla",
    deleteSlaURL: "http://workflow-admin.dev.finlevit.io//workflowadmin/rest/workflowsla",
    deleteTaskActionMappingURL: "http://workflow-admin.dev.finlevit.io/workflowadmin/rest/taskactionmapping",
    workflowReasonsUrl: "http://workflow-admin.dev.finlevit.io//workflowadmin/rest/actionreasonsforworkflow",
    workflowReasonUrl: "http://workflow-admin.dev.finlevit.io//workflowadmin/rest/actionreason",
    deleteReasonUrl: "http://workflow-admin.dev.finlevit.io//workflowadmin/rest/nigoaction",
    getActionReasonsUrl: "http://workflow-admin.dev.finlevit.io//workflowadmin/rest/actionreasons",
    workflowPayloadURL: "http://workflow-admin.dev.finlevit.io//workflowadmin/rest/payloadkeysforworkflow",
    allSectionsURL: "http://workflow-admin.dev.finlevit.io//workflowadmin/rest/get/payloadMapping",
    payloadMapURL: "http://workflow-admin.dev.finlevit.io//workflowadmin/rest/save/payloadMapping",
    workflowJsonPayloadURL: "http://workflow-admin.dev.finlevit.io//workflowadmin/json-schema/get",
    getAllUsersURL: "http://workflow-admin.dev.finlevit.io//workflowadmin/rest/users",
    addUpdateAllUsersURL: "http://workflow-admin.dev.finlevit.io//workflowadmin/rest/user",
    getGroupMembersURL: "http://workflow-admin.dev.finlevit.io//userprofileservice/usergroups",
    addUserToGroupURL: "http://workflow-admin.dev.finlevit.io//userprofileservice/rest/addusergroup",
    getWorkflowMappingURL: "http://workflow-admin.dev.finlevit.io//workflowadmin/rest/get-workflow",
    postWorkflowMappingURL: "http://workflow-admin.dev.finlevit.io//workflowadmin/rest/save-workflow",
    publishWorkflowURL: "http://workflow-admin.dev.finlevit.io//workflowadmin/rest/workflow",
    checkoutWorkflowURL: "http://workflow-admin.dev.finlevit.io//workflowadmin/rest/workflow/checkout",
    getWorkflowVersionsURL: "http://workflow-admin.dev.finlevit.io//workflowadmin/rest/workflow/get-versions",
    getWorkflowVersionURL: "http://workflow-admin.dev.finlevit.io//workflowadmin/rest/workflow/get-version",
    getEnvironmentsURL: "http://workflow-admin.dev.finlevit.io//workflowadmin/rest/env",
    switchWorkflowVersionURL: "http://workflow-admin.dev.finlevit.io//workflowadmin/rest/workflow",
    revertWorkflowVersionURL: "http://workflow-admin.dev.finlevit.io//workflowadmin/rest/workflow",
    promoteWorkflowURL: "http://workflow-admin.dev.finlevit.io//workflowadmin/rest/workflow/promote",
  };
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AppConfigService],
    });

    injector = getTestBed();
    appConfigService = injector.get(AppConfigService);
    httpMock = injector.get(HttpTestingController);
  });

  it("AppConfigService should be created", () => {
    const service: AppConfigService = TestBed.get(AppConfigService);
    expect(service).toBeTruthy();
  });

  // it("getAndAppendBaseUrlsToServiceEndPoints() should return service urls with base urls", () => {
  //   appConfigService.loadAppConfig().then((res) => {
  //     expect(res).toEqual(dummyAPIEndPointUrls);
  //     expect(appConfigService.getApiUrls()).toEqual(dummyAPIEndPointUrls);
  //   });
  //   const req = httpMock.expectOne("./assets/config/config.json");
  //   expect(req.request.method).toBe("GET");
  //   // Note That we are flushing dummy "http" response
  //   req.flush(dummyConfigUrls);
  //   httpMock.verify();
  // });
});
