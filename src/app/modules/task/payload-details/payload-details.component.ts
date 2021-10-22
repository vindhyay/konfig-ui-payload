import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { QUEUE_TYPES } from "../../../state/model/queue-types-model";
import { UserService } from "../../user/services/user.service";
import { AuthService } from "../../auth/services/auth.service";
import { BaseComponent } from "../../shared/base/base.component";
import { NotificationService } from "../../../services/notification.service";
import { UserDataModel } from "../../auth/models";
import { addOriginalPosition, getValueFromObjectByPath, parseApiResponse } from "../../../utils";
import { TaskService } from "../services/task.service";
import { BaseWidget, DATA_TYPES, WidgetTypes } from "../model/create-form.models";
import { EditorService } from "../editor.service";

@Component({
  selector: "app-payload-details",
  templateUrl: "./payload-details.component.html",
  styleUrls: ["./payload-details.component.scss"]
})
export class PayloadDetailsComponent extends BaseComponent implements OnInit {
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private userService: UserService,
    private authService: AuthService,
    private notificationService: NotificationService,
    private taskService: TaskService,
    private editorService: EditorService
  ) {
    super();
  }
  screenHeight: number;
  screenWidth: number;
  workflowId: string | null = "";
  transactionDetails: any = {};
  id: any;
  formFields: any = [];
  currentUser: UserDataModel | undefined;
  showActions: boolean = true;
  queueType: QUEUE_TYPES = QUEUE_TYPES.NEW;
  sessionFields = {};
  ngOnInit(): void {
    this.currentUser = this.authService.getCurrentUser();
    this.queueType = getValueFromObjectByPath(this.activatedRoute, "snapshot.data.queueType");
    this.activatedRoute.queryParamMap.subscribe((queryParams: any) => {
      this.sessionFields = Object.keys(queryParams.params).length
        ? queryParams.params
        : { name: this.currentUser?.name, userId: this.currentUser?.userId, email: this.currentUser?.emailId };
    });
    this.activatedRoute.paramMap.subscribe(params => {
      this.workflowId = params.get("workflowId");
      if (this.workflowId) {
        this.createTransaction(this.workflowId, this.id);
      }
    });
    this.taskService.transactionDetailsSubject.subscribe(value => {
      if (value) {
        this.transactionDetails = value;
        this.formFields = value?.uiPayload || [];
        this.formFields = this.formFields.sort((a,b)=> a?.y - b?.y);
        const header = this.formFields.find(item => item?.metaData?.widgetType === WidgetTypes.Header);
        const errorContainer = this.formFields.find(item => item?.metaData?.widgetType === WidgetTypes.ErrorContainer);
        if (header && value?.errorMessage?.length && !errorContainer) {
          const errorRows = value?.errorMessage.length * 3 + 5;
          const errorContainer = new BaseWidget({
            label: "Container",
            description: "To hold error components",
            widgetType: WidgetTypes.ErrorContainer,
            cols: header.cols,
            rows: 2,
            x: header.x,
            y: header.y + header.rows,
            minItemCols: 20,
            minItemRows: 0,
            hideRows: 2,
            defaultRows: errorRows,
            defaultMinItemRows: 0,
            defaultMinItemCols: 20,
            dataType: DATA_TYPES.OBJECT,
            movement: null,
            value: { value: this.transactionDetails.errorMessage }
          });
          this.formFields.push(errorContainer);
          setTimeout(() => {
            errorContainer.rows = errorRows;
            errorContainer.metaData.movement = "DOWN";
            this.editorService.widgetChange.next(errorContainer);
          });
        }
      }
    });
  }
  createTransaction(applicationId: string, id = "") {
    this.loading = true;
    // this.userService
    //   .createTransaction({ applicationId, ...(id && { id }) }, { sessionData: this.sessionFields })
    //   .subscribe(
    //     result => {
    //       const { data: transactionDetails, error } = parseApiResponse(result);
    const transactionDetails = {
      "createdTime": 1634848322284,
      "lastUpdatedTime": 1634848322284,
      "createdBy": "sdale",
      "lastUpdatedBy": "sdale",
      "id": "6171ce42acff1a0499ed7227",
      "transactionId": "A2_000000034",
      "submissionStatus": "PENDING",
      "errorMessage": [],
      "applicationId": "617064f1d9ed7aa82f470fc5",
      "applicationVersionId": "617064f1d9ed7aa82f470fc6",
      "application": {
        "appId": "A2",
        "id": "617064f1d9ed7aa82f470fc5",
        "locker": null,
        "applicationName": "Vijay Adv Table Test",
        "isNew": true
      },
      "transactionStatus": "617064f1d9ed7aa82f470fc7",
      "uiPayload": [
        {
          "widgetName": "header_widget_ch5YcG",
          "level": 0,
          "validators": {
            "editable": true,
            "required": false
          },
          "displayName": "Header",
          "dataType": "object",
          "isViewOnly": true,
          "label": "Header",
          "rows": 7,
          "type": "object",
          "error": "",
          "isPrePopulated": false,
          "metaData": {
            "backgroundColor": "#3f51b5",
            "widgetId": "widget_ch5YcG",
            "widgetType": "Header"
          },
          "path": "/header_widget_ch5YcG",
          "children": [
            {
              "widgetName": "header_icon_logo_widget_4n7TDE",
              "level": 1,
              "validators": {
                "editable": true,
                "required": false
              },
              "displayName": "Header Icon Logo",
              "isViewOnly": true,
              "dataType": "string",
              "label": "Header Icon Logo",
              "rows": 5,
              "type": "string",
              "error": "",
              "isPrePopulated": false,
              "metaData": {
                "widgetId": "widget_4n7TDE",
                "widgetType": "Image",
                "url": "http://ui-fa-m.dev.finlevit.io/assets/images/noun_Letter F_2848082.svg"
              },
              "path": "/header_widget_ch5YcG/header_icon_logo_widget_4n7TDE",
              "children": [],
              "permissions": {},
              "x": 2,
              "y": 1,
              "id": "617066abd9ed7aa82f470fe1",
              "cols": 5,
              "value": {
                "value": null
              },
              "resourceType": "payload-field",
              "status": true
            },
            {
              "widgetName": "finlevit_logo_widget_fgtnYD",
              "level": 1,
              "validators": {
                "editable": true,
                "required": false
              },
              "displayName": "finlevit logo",
              "isViewOnly": true,
              "dataType": "string",
              "label": "Finlevit Logo",
              "rows": 5,
              "type": "string",
              "error": "",
              "isPrePopulated": false,
              "metaData": {
                "verticalAlign": "center",
                "color": "#ffffff",
                "widgetId": "widget_fgtnYD",
                "horizontalAlign": "flex-start",
                "_value": "FinLevit",
                "textStyle": "h1",
                "widgetType": "Text",
                "fontWeight": 800
              },
              "path": "/header_widget_ch5YcG/finlevit_logo_widget_fgtnYD",
              "children": [],
              "permissions": {},
              "x": 8,
              "y": 1,
              "id": "617066abd9ed7aa82f470fe2",
              "cols": 14,
              "value": {
                "value": null
              },
              "resourceType": "payload-field",
              "status": true
            }
          ],
          "permissions": {},
          "x": 0,
          "y": 0,
          "id": "617066abd9ed7aa82f470fe3",
          "cols": 100,
          "value": {
            "id": ""
          },
          "resourceType": "payload-field",
          "status": true
        },
        {
          "maxItemRows": 15,
          "widgetName": "save_widget_vsJrhu",
          "validators": {
            "editable": true,
            "required": false
          },
          "displayName": "Save",
          "isViewOnly": true,
          "isUnique": false,
          "type": "string",
          "error": "",
          "minItemRows": 4,
          "isPrePopulated": false,
          "metaData": {
            "defaultMinItemRows": 3,
            "color": "#ffffff",
            "advanced": false,
            "widgetId": "widget_vsJrhu",
            "colWidth": "100",
            "icon": "",
            "defaultRows": 5,
            "configure": false,
            "onClickConfig": {
              "dataResourceId": "",
              "action": "save",
              "parameters": [],
              "datalistId": ""
            },
            "type": "primary",
            "widgetType": "Button",
            "populateConfig": [],
            "isHidden": false,
            "isEnable": true,
            "bgColor": "#56697d",
            "iconPos": "left",
            "hideRows": 0,
            "variant": "raisedButton",
            "status": "617064f1d9ed7aa82f470fc7",
            "enableConfig": []
          },
          "path": "/save_widget_vsJrhu",
          "children": [],
          "permissions": {},
          "id": "617066e0d9ed7aa82f470fea",
          "cols": 18,
          "value": {
            "value": null
          },
          "level": 0,
          "dataType": "string",
          "label": "Save",
          "rows": 5,
          "minItemCols": 3,
          "x": 35,
          "y": 47,
          "resourceType": "payload-field",
          "status": true
        },
        {
          "maxItemRows": 15,
          "widgetName": "submit_widget_1CSj9E",
          "validators": {
            "editable": true,
            "required": false
          },
          "displayName": "Submit",
          "isViewOnly": true,
          "isUnique": false,
          "type": "string",
          "error": "",
          "minItemRows": 4,
          "isPrePopulated": false,
          "metaData": {
            "defaultMinItemRows": 3,
            "color": "#ffffff",
            "advanced": false,
            "widgetId": "widget_1CSj9E",
            "colWidth": "100",
            "icon": "",
            "defaultRows": 5,
            "configure": false,
            "onClickConfig": {
              "dataResourceId": "",
              "action": "submit",
              "parameters": [],
              "datalistId": ""
            },
            "type": "primary",
            "widgetType": "Button",
            "populateConfig": [],
            "isHidden": false,
            "isEnable": true,
            "bgColor": "#007bff",
            "iconPos": "left",
            "hideRows": 0,
            "variant": "raisedButton",
            "status": "617064f1d9ed7aa82f470fc7",
            "enableConfig": []
          },
          "path": "/submit_widget_1CSj9E",
          "children": [],
          "permissions": {},
          "id": "617066edd9ed7aa82f470feb",
          "cols": 18,
          "value": {
            "value": null
          },
          "level": 0,
          "dataType": "string",
          "label": "Submit",
          "rows": 5,
          "minItemCols": 3,
          "x": 55,
          "y": 47,
          "resourceType": "payload-field",
          "status": true
        },
        {
          "widgetName": "users_widget_OmxOBB",
          "validators": {
            "editable": true,
            "required": false
          },
          "displayName": "Users",
          "isViewOnly": false,
          "isUnique": false,
          "type": "array",
          "error": "",
          "minItemRows": 24,
          "isPrePopulated": false,
          "metaData": {
            "defaultMinItemRows": 24,
            "pagination": false,
            "hideHeader": false,
            "color": "#000000",
            "advanced": false,
            "heading": "",
            "widgetId": "widget_OmxOBB",
            "columns": [
              {
                "widgetName": "name_widget_qtZYTr",
                "validators": {
                  "editable": true,
                  "required": true
                },
                "displayName": "Name",
                "isViewOnly": false,
                "dataType": "string",
                "isUnique": false,
                "label": "Name",
                "rows": 3,
                "type": "string",
                "error": "",
                "isPrePopulated": false,
                "metaData": {
                  "rightIcon": "",
                  "advanced": false,
                  "widgetId": "widget_qtZYTr",
                  "leftIcon": "",
                  "colWidth": 70.25,
                  "icon": "",
                  "tooltip": "",
                  "configure": false,
                  "widgetType": "TextInput",
                  "populateConfig": [],
                  "isHidden": false,
                  "placeholder": "",
                  "mask": ""
                },
                "path": "/users_widget_OmxOBB/{a1}/name_widget_qtZYTr",
                "children": [],
                "permissions": {},
                "id": "617066abd9ed7aa82f470fe4",
                "cols": 5,
                "value": {
                  "value": "Vijay"
                },
                "resourceType": "payload-field",
                "status": true
              },
              {
                "widgetName": "age_widget_SfRNUZ",
                "validators": {
                  "editable": true,
                  "required": true
                },
                "displayName": "Age",
                "isViewOnly": false,
                "dataType": "number",
                "isUnique": false,
                "label": "Age",
                "rows": 3,
                "type": "number",
                "error": "",
                "isPrePopulated": false,
                "metaData": {
                  "advanced": false,
                  "widgetId": "widget_SfRNUZ",
                  "prefix": "",
                  "colWidth": 52,
                  "format": false,
                  "tooltip": "",
                  "configure": false,
                  "placeholder": "",
                  "suffix": "",
                  "widgetType": "Number",
                  "populateConfig": [],
                  "isHidden": false
                },
                "path": "/users_widget_OmxOBB/{a1}/age_widget_SfRNUZ",
                "children": [],
                "permissions": {},
                "id": "617066abd9ed7aa82f470fe5",
                "cols": 5,
                "value": {
                  "value": "27"
                },
                "resourceType": "payload-field",
                "status": true
              },
              {
                "widgetName": "image_widget_WHsF2j",
                "validators": {
                  "editable": true,
                  "required": false
                },
                "displayName": "Image",
                "isViewOnly": false,
                "dataType": "string",
                "isUnique": false,
                "label": "Image",
                "rows": 3,
                "type": "string",
                "error": "",
                "isPrePopulated": false,
                "metaData": {
                  "advanced": false,
                  "widgetId": "widget_WHsF2j",
                  "colWidth": 96.375,
                  "configure": false,
                  "widgetType": "Image",
                  "populateConfig": [],
                  "url": "",
                  "isHidden": false
                },
                "path": "/users_widget_OmxOBB/{a1}/image_widget_WHsF2j",
                "children": [],
                "permissions": {},
                "id": "61717424a1b5fab14c1635c8",
                "cols": 5,
                "value": {},
                "resourceType": "payload-field",
                "status": true
              },
              {
                "widgetName": "state_widget_7VIZc8",
                "validators": {
                  "editable": true,
                  "required": false
                },
                "displayName": "State",
                "isViewOnly": false,
                "dataType": "string",
                "isUnique": false,
                "label": "State",
                "rows": 3,
                "type": "string",
                "error": "",
                "isPrePopulated": false,
                "metaData": {
                  "advanced": false,
                  "widgetId": "widget_7VIZc8",
                  "isLabelAndValue": false,
                  "optionValue": "value",
                  "colWidth": 106,
                  "tooltip": "",
                  "configure": false,
                  "optionPopulateConfig": [],
                  "widgetType": "Dropdown",
                  "populateConfig": [],
                  "isHidden": false,
                  "optionType": "manual",
                  "optionLabel": "name",
                  "options": [
                    "North Carolina",
                    "South Carolina"
                  ],
                  "placeholder": "",
                  "onChangeConfig": {
                    "action": "none",
                    "parameters": []
                  }
                },
                "path": "/users_widget_OmxOBB/{a1}/state_widget_7VIZc8",
                "children": [],
                "permissions": {},
                "id": "6171748aa1b5fab14c1635d7",
                "cols": 5,
                "value": {
                  "value": "North Carolina"
                },
                "resourceType": "payload-field",
                "status": true
              },
              {
                "widgetName": "status_widget_x0f5wZ",
                "validators": {
                  "editable": true,
                  "required": false
                },
                "displayName": "Status",
                "isViewOnly": false,
                "dataType": "boolean",
                "isUnique": false,
                "label": "Status",
                "rows": 3,
                "type": "boolean",
                "error": "",
                "isPrePopulated": false,
                "metaData": {
                  "advanced": false,
                  "widgetId": "widget_x0f5wZ",
                  "colWidth": 72.75,
                  "tooltip": "",
                  "configure": false,
                  "widgetType": "Checkbox",
                  "populateConfig": [],
                  "isHidden": false
                },
                "path": "/users_widget_OmxOBB/{a1}/status_widget_x0f5wZ",
                "children": [],
                "permissions": {},
                "id": "61718fc5a1b5fab14c1635d8",
                "cols": 5,
                "value": {},
                "resourceType": "payload-field",
                "status": true
              },
              {
                "widgetName": "radio_group_widget_L6v9ds",
                "validators": {
                  "editable": true,
                  "required": true
                },
                "displayName": "Radio Group",
                "isViewOnly": false,
                "dataType": "string",
                "isUnique": false,
                "label": "Radio Group",
                "rows": 3,
                "type": "string",
                "error": "",
                "isPrePopulated": false,
                "metaData": {
                  "advanced": false,
                  "widgetId": "widget_L6v9ds",
                  "isLabelAndValue": false,
                  "optionValue": "value",
                  "colWidth": "100",
                  "tooltip": "",
                  "alignOptions": "Vertical",
                  "configure": false,
                  "widgetType": "RadioGroup",
                  "populateConfig": [],
                  "isHidden": false,
                  "optionType": "manual",
                  "optionLabel": "name",
                  "options": [
                    "Male",
                    "Female",
                    "Others"
                  ]
                },
                "path": "/users_widget_OmxOBB/{a1}/radio_group_widget_L6v9ds",
                "children": [],
                "permissions": {},
                "id": "617192cca1b5fab14c1635da",
                "cols": 5,
                "value": {},
                "resourceType": "payload-field",
                "status": true
              },
              {
                "widgetName": "details_widget_H7pUJe",
                "validators": {
                  "editable": true,
                  "required": false
                },
                "displayName": "Details",
                "isViewOnly": false,
                "dataType": "object",
                "isUnique": false,
                "label": "Details",
                "rows": 3,
                "type": "object",
                "error": "",
                "isPrePopulated": false,
                "metaData": {
                  "color": "#000000",
                  "advanced": false,
                  "widgetId": "widget_H7pUJe",
                  "colWidth": 73.75,
                  "icon": "",
                  "configure": false,
                  "title": "Address Details",
                  "widgetType": "Modal",
                  "populateConfig": [],
                  "isHidden": false,
                  "button": {
                    "color": "#f9f9f9",
                    "bgColor": "#372f76",
                    "icon": "",
                    "fontSize": "12",
                    "height": "40"
                  },
                  "bgColor": "#ffffff",
                  "width": "500px",
                  "height": "400px"
                },
                "path": "/users_widget_OmxOBB/{a1}/details_widget_H7pUJe",
                "children": [
                  {
                    "maxItemRows": 8,
                    "widgetName": "address_line_1_widget_Q3v7W0",
                    "validators": {
                      "editable": true,
                      "required": false
                    },
                    "displayName": "Address Line 1",
                    "isViewOnly": false,
                    "isUnique": false,
                    "type": "string",
                    "error": "",
                    "minItemRows": 8,
                    "isPrePopulated": false,
                    "metaData": {
                      "rightIcon": "",
                      "defaultMinItemRows": 8,
                      "advanced": false,
                      "widgetId": "widget_Q3v7W0",
                      "leftIcon": "",
                      "colWidth": "100",
                      "icon": "",
                      "tooltip": "",
                      "defaultRows": 8,
                      "configure": false,
                      "widgetType": "TextInput",
                      "populateConfig": [],
                      "isHidden": false,
                      "hideRows": 0,
                      "placeholder": "",
                      "mask": ""
                    },
                    "path": "/users_widget_OmxOBB/{a1}/details_widget_H7pUJe/address_line_1_widget_Q3v7W0",
                    "children": [],
                    "permissions": {},
                    "id": "617066c1d9ed7aa82f470fe8",
                    "cols": 41,
                    "value": {
                      "id": ""
                    },
                    "dataType": "string",
                    "label": "Address Line 1",
                    "rows": 8,
                    "minItemCols": 10,
                    "x": 8,
                    "y": 2,
                    "resourceType": "payload-field",
                    "status": true
                  },
                  {
                    "maxItemRows": 8,
                    "widgetName": "address_line_2_widget_T3TkXc",
                    "validators": {
                      "editable": true,
                      "required": false
                    },
                    "displayName": "Address Line 2",
                    "isViewOnly": false,
                    "isUnique": false,
                    "type": "string",
                    "error": "",
                    "minItemRows": 8,
                    "isPrePopulated": false,
                    "metaData": {
                      "rightIcon": "",
                      "defaultMinItemRows": 8,
                      "advanced": false,
                      "widgetId": "widget_T3TkXc",
                      "leftIcon": "",
                      "colWidth": "100",
                      "icon": "",
                      "tooltip": "",
                      "defaultRows": 8,
                      "configure": false,
                      "widgetType": "TextInput",
                      "populateConfig": [],
                      "isHidden": false,
                      "hideRows": 0,
                      "placeholder": "",
                      "mask": ""
                    },
                    "path": "/users_widget_OmxOBB/{a1}/details_widget_H7pUJe/address_line_2_widget_T3TkXc",
                    "children": [],
                    "permissions": {},
                    "id": "617066d2d9ed7aa82f470fe9",
                    "cols": 38,
                    "value": {
                      "id": ""
                    },
                    "dataType": "string",
                    "label": "Address Line 2",
                    "rows": 8,
                    "minItemCols": 10,
                    "x": 54,
                    "y": 2,
                    "resourceType": "payload-field",
                    "status": true
                  }
                ],
                "permissions": {},
                "id": "617066abd9ed7aa82f470fe6",
                "cols": 5,
                "value": {},
                "resourceType": "payload-field",
                "status": true
              },
              {
                "widgetName": "date_of_birth_widget_FIrOB4",
                "validators": {
                  "editable": true,
                  "required": true
                },
                "displayName": "Date Of Birth",
                "isViewOnly": false,
                "dataType": "date",
                "isUnique": false,
                "label": "Date Of Birth",
                "rows": 3,
                "type": "date",
                "error": "",
                "isPrePopulated": false,
                "metaData": {
                  "advanced": false,
                  "widgetId": "widget_FIrOB4",
                  "colWidth": "100",
                  "tooltip": "",
                  "viewDateFormat": "mm/dd/yy",
                  "configure": false,
                  "placeholder": "",
                  "widgetType": "DatePicker",
                  "populateConfig": [],
                  "isHidden": false,
                  "returnDateFormat": "isoTimestamp"
                },
                "path": "/users_widget_OmxOBB/{a1}/date_of_birth_widget_FIrOB4",
                "children": [],
                "permissions": {},
                "id": "6171adc3a1b5fab14c1635db",
                "cols": 5,
                "value": {},
                "resourceType": "payload-field",
                "status": true
              }
            ],
            "colWidth": "100",
            "defaultRows": 26,
            "configure": false,
            "sort": true,
            "optionPopulateConfig": [],
            "widgetType": "AdvTable",
            "populateConfig": [],
            "isHidden": false,
            "filter": true,
            "addRows": true,
            "bgColor": "#ffffff",
            "hideRows": 0,
            "cellBorder": true,
            "actions": {
              "deleteRow": true,
              "editRow": true,
              "width": 76,
              "label": "Actions"
            }
          },
          "path": "/users_widget_OmxOBB",
          "children": [],
          "permissions": {},
          "id": "617066abd9ed7aa82f470fe7",
          "cols": 93,
          "value": {
            "value": null
          },
          "level": 0,
          "dataType": "array",
          "label": "Users",
          "rows": 26,
          "minItemCols": 30,
          "x": 4,
          "y": 12,
          "resourceType": "payload-field",
          "status": true
        }
      ]
    }
    const error = null;
          if (transactionDetails && !error) {
            this.transactionDetails = transactionDetails;
            const payloadFields = this.transactionDetails?.uiPayload || [];
            addOriginalPosition(payloadFields);
            this.transactionDetails.uiPayload = payloadFields;
            this.taskService.setTransactionDetails(transactionDetails);
            this.id = transactionDetails.id;
          } else {
            this.notificationService.error(error.errorMessage);
          }
          this.loading = false;
        // },
        // error => {
        //   this.loading = false;
        //   if (error.status === 401) {
        //     this.authService.logoff(false, this.activatedRoute);
        //   }
        //   if (error.status === 500) {
        //     this.notificationService.error(error?.error?.error?.errorMessage);
        //     this.authService.logoff(false, this.activatedRoute);
        //   }
        // }
      // );
  }

  uniqueFieldChange($event) {
    this.userService.uniqueKeyTransaction(this.transactionDetails.transactionId, { uniqueField: $event }).subscribe(
      result => {
        const { data, error } = parseApiResponse(result);
        this.loading = false;
        if (data) {
          this.transactionDetails = data;
          this.taskService.setTransactionDetails(data);
        }
      },
      error => {
        this.loading = false;
        this.notificationService.error(error.errorMessage);
      }
    );
  }

  async populateTransaction($event) {
    const { triggerId, parameters, isUnique = false } = $event;
    this.loading = true;
    if (!isUnique) {
      const saveResult = await this.userService
        .saveTransaction({ transactionId: this.transactionDetails.transactionId }, this.formFields)
        .toPromise();
    }
    this.userService.populateTransaction(this.id, { triggerId }, { parameters }).subscribe(
      result => {
        const { data, error } = parseApiResponse(result);
        this.loading = false;
        if (data) {
          this.transactionDetails = data;
          this.taskService.setTransactionDetails(data);
        }
      },
      error => {
        this.loading = false;
        this.notificationService.error(error.errorMessage);
      }
    );
  }

  saveTransaction(event: any) {
    const { payloadFields: payloadMetaData, data: { metaData: { status: statusId = "" } = {} } = {} } = event;
    this.loading = true;
    this.userService
      .saveTransaction({ statusId, transactionId: this.transactionDetails.transactionId }, payloadMetaData)
      .subscribe(
        result => {
          this.loading = false;
          const { data, error } = parseApiResponse(result);
          if (data && !error) {
            this.taskService.setTransactionDetails(data);
            this.notificationService.success("Transaction Saved Successfully", "Success");
          } else {
            this.notificationService.error(error.errorMessage);
          }
        },
        error => {
          this.loading = false;
          this.notificationService.error(error?.error?.error?.errorMessage);
        }
      );
  }

  submitTransaction(payloadData: any) {
    const { payload: payloadJson, files = [], data: { metaData: { status: statusId = "" } = {} } = {} } = payloadData;
    // @ts-ignore
    const params = {
      userId: this.currentUser?.userId,
      statusId,
      transactionId: this.transactionDetails.transactionId || ""
    };
    const appId = this.transactionDetails?.application?.appId;
    if (!appId) {
      this.notificationService.error("Application not found", "Failed to submit");
      return;
    }
    this.loading = true;
    const payload = new FormData();
    payload.append("payload", JSON.stringify(payloadJson));
    files.forEach((file: any) => {
      payload.append("files", file);
    });
    this.userService.submitTransaction(appId, params, payload).subscribe(
      result => {
        this.loading = false;
        const { data, error } = parseApiResponse(result);
        if (data && !error) {
          this.notificationService.success("Transaction Submitted Successfully", "Success");
          this.transactionDetails = data;
          this.taskService.setTransactionDetails(data);
          console.log('response',data)
          this.id = data.id;
        } else {
          this.notificationService.error(error.errorMessage, "Error");
        }
      },
      error => {
        this.loading = false;
        this.notificationService.error(error?.error?.error?.errorMessage);
      }
    );
  }

  redirectTo(QUEUE_TYPE?: any) {
    this.router.navigate(["../../"], {
      relativeTo: this.activatedRoute
    });
  }
}
