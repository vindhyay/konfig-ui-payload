import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Workflow } from '../../../state/model/table-columns-model';
import { QUEUE_TYPES } from '../../../state/model/queue-types-model';
import {UserService} from "../../user/services/user.service";
import {AuthService} from "../../auth/services/auth.service";
import {BaseComponent} from "../../shared/base/base.component";
import {NotificationService} from "../../../services/notification.service";
import {UserDataModel} from "../../auth/models";
import {getUniqueId, getValueFromObjectByPath, parseApiResponse} from "../../../utils";

@Component({
  selector: 'app-payload-details',
  templateUrl: './payload-details.component.html',
  styleUrls: ['./payload-details.component.scss']
})
export class PayloadDetailsComponent extends BaseComponent implements OnInit {
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private userService: UserService,
    private authService: AuthService,
    private notificationService: NotificationService
  ) {
    super();
  }
  workflowId: string | null = '';
  transactionDetails: any = {};
  workflow: Workflow = {} as Workflow;
  formFields: any = [];
  currentUser: UserDataModel | undefined;
  showActions: boolean = true;
  queueType: QUEUE_TYPES = QUEUE_TYPES.NEW;
  ngOnInit(): void {
    this.currentUser = this.authService.getCurrentUser();
    this.queueType = getValueFromObjectByPath(this.activatedRoute, 'snapshot.data.queueType');
    this.activatedRoute.paramMap.subscribe(params => {
      this.workflowId = params.get('workflowId');
      if (this.workflowId) {
        this.getWorkflowFormDetails(this.workflowId);
      }
    });
  }
  getWorkflowFormDetails(workflowId: any) {
    this.loading = true;
    this.userService.getWorkflowDetails(workflowId).subscribe(
      workflow => {
        const { data: workflowDetails, error } = parseApiResponse(workflow);
        if (workflowDetails && !error) {
          this.workflow = workflowDetails;
          if (workflowDetails && workflowDetails.newPayload) {
            try {
              this.formFields = JSON.parse(workflowDetails.newPayload) || [];
            } catch (e) {
              console.error('failed to parse payload data');
            }
          }
        } else {
          this.notificationService.error(error.errorMessage);
        }
        this.loading = false;
      },
      error => {
        this.loading = false;
        if(error.status === 401){
          this.authService.logoff(false, this.activatedRoute);
        }
      }
    );
  }

  getTransactionDetails(id) {
    this.loading = true
    this.userService.getTransactionDetails(id).subscribe(
        result => {
          const { data: transactionDetails, error } = parseApiResponse(result);
          if (transactionDetails && !error) {
            try {
              this.transactionDetails = transactionDetails;
              this.formFields = JSON.parse(transactionDetails.payload) || [];
              console.log(this.formFields)
            } catch (e) {
              console.error('failed to parse payload data');
            }
          } else {
            this.notificationService.error(error.errorMessage);
          }
          this.loading = false;
        },
        error => {
          this.loading = false;
        }
    );
  }

  populateTransaction($event){
    const {payloadFields, triggerId, parameters} = $event
    this.loading = true;
    const appId = this.workflow.appId;
    const params = {
      finlevitAppId: appId,
      idPending: this.transactionDetails.id || '',
    };
    this.userService.saveTransaction(params, JSON.stringify(payloadFields)).subscribe(
        result => {
          const { data, error } = parseApiResponse(result);
          if (data && !error) {
            this.userService.populateTransaction(data.id, { triggerId }, { parameters }).subscribe(result => {
              this.loading = false;
              this.getTransactionDetails(data.id);
            }, error => {
              this.loading = false;
            })
          } else {
            this.loading = false;
            this.notificationService.error(error.errorMessage);
          }
        },
        error => {
          this.loading = false;
        }
    );
  }

  saveTransaction(payloadMetaData: any) {
    this.loading = true;
    const appId = this.workflow.appId;
    const params = {
      finlevitAppId: appId,
      idPending: this.transactionDetails.id || '',
    };
    this.userService.saveTransaction(params, JSON.stringify(payloadMetaData)).subscribe(
      result => {
        this.loading = false;
        const { data, error } = parseApiResponse(result);
        if (data && !error) {
          this.notificationService.success('Transaction Saved Successfully', 'Success');
          this.redirectTo(QUEUE_TYPES.SAVED_QUEUE);
        } else {
          this.notificationService.error(error.errorMessage);
        }
      },
      error => {
        this.loading = false;
      }
    );
  }



  submitTransaction(payloadData: any) {
    const { payload: payloadJson, files = [] } = payloadData;
    this.loading = true;
    // @ts-ignore
    const params = { userId: this.currentUser.userId, idPending: this.transactionDetails.id || '' };
    const appId = this.workflow.appId;
    const transactionId = getUniqueId(appId);
    const payload = new FormData();
    payload.append('payload', JSON.stringify(payloadJson));
    files.forEach((file : any) => {
      payload.append('files', file);
    });
    this.userService.submitTransaction(appId, transactionId, params, payload).subscribe(
      result => {
        this.loading = false;
        const { data, error } = parseApiResponse(result);
        if (data && !error) {
          this.notificationService.success('Transaction Submitted Successfully', 'Success');
          this.getWorkflowFormDetails(this.workflowId);
        } else {
          this.notificationService.error(error.errorMessage, 'Error');
        }
      },
      error => {
        this.loading = false;
      }
    );
  }

  redirectTo(QUEUE_TYPE?: any) {
    this.router.navigate(['../../'], {
      relativeTo: this.activatedRoute
    });
  }
}
