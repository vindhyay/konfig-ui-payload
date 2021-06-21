import {Component, HostListener, OnInit} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QUEUE_TYPES } from '../../../state/model/queue-types-model';
import {UserService} from "../../user/services/user.service";
import {AuthService} from "../../auth/services/auth.service";
import {BaseComponent} from "../../shared/base/base.component";
import {NotificationService} from "../../../services/notification.service";
import {UserDataModel} from "../../auth/models";
import {getUniqueId, getValueFromObjectByPath, parseApiResponse} from "../../../utils";
import {TaskService} from '../services/task.service';

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
    private notificationService: NotificationService,
    private taskService: TaskService,
  ) {
    super();
    this.getScreenSize();
  }
  screenHeight: number;
  screenWidth: number;
  workflowId: string | null = '';
  transactionDetails: any = {};
  id: any;
  formFields: any = [];
  currentUser: UserDataModel | undefined;
  showActions: boolean = true;
  queueType: QUEUE_TYPES = QUEUE_TYPES.NEW;
  sessionFields = {};
  ngOnInit(): void {
    this.currentUser = this.authService.getCurrentUser();
    this.queueType = getValueFromObjectByPath(this.activatedRoute, 'snapshot.data.queueType');
    this.activatedRoute.queryParamMap.subscribe((queryParams:any) => {
        this.sessionFields = queryParams.params || {};
    })
    this.activatedRoute.paramMap.subscribe(params => {
      this.workflowId = params.get('workflowId');
      if (this.workflowId) {
        this.createTransaction(this.workflowId, this.id);
      }
    });
  }
  createTransaction(workflowId: string, id = ''){
    this.loading = true;
    this.userService.createTransaction({ workflowId, id }, {sessionData: this.sessionFields}).subscribe(
        result => {
          const { data: transactionDetails, error } = parseApiResponse(result);
          if (transactionDetails && !error) {
            this.transactionDetails = transactionDetails;
            this.taskService.setTransactionDetails(transactionDetails)
              this.id = transactionDetails.id
            if (transactionDetails && transactionDetails.payload) {
              try {
                this.formFields = JSON.parse(transactionDetails.payload) || [];
                this.formFields.forEach(field => {
                    if(field.metaData.widgetType == "Header"){
                        if(Math.round(this.screenWidth/10) > field.cols){
                            field.cols = Math.round(this.screenWidth/10);
                        }
                        console.log(field);
                    }
                    if(field.metaData.widgetType == "Footer"){
                        if(Math.round(this.screenWidth/10) > field.cols){
                            field.cols = Math.round(this.screenWidth/10);
                        }
                        console.log(field.y);
                        console.log(field.rows);
                        console.log(this.screenHeight/10);
                        if(field.y + field.rows < this.screenHeight/11){
                            field.y = Math.round(this.screenHeight/11);
                        }
                        console.log(field);
                    }
                })
                console.log(this.formFields)
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
    const {triggerId, parameters} = $event
    this.loading = true;
      this.userService.populateTransaction(this.id, { triggerId }, { parameters }).subscribe(result => {
          this.loading = false;
          this.getTransactionDetails(this.id);
      }, error => {
          this.loading = false;
          this.notificationService.error(error.errorMessage);
      })
  }

  saveTransaction(payloadMetaData: any) {
    this.loading = true;
    const appId = this.transactionDetails.appId;
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
    const appId = this.transactionDetails?.workflowMapping?.appId;
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
          this.createTransaction(this.workflowId);
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

    @HostListener('window:resize', ['$event'])
    getScreenSize(event?) {
        this.screenHeight = window.innerHeight;
        this.screenWidth = window.innerWidth;
        console.log(this.screenHeight, this.screenWidth);
    }
}
