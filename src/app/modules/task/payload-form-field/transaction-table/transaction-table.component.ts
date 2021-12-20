import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {BaseWidget} from '../../model/create-form.models';
import {TaskService} from '../../services/task.service';
import {parseApiResponse} from '../../../../utils';
import {BaseComponent} from '../../../shared/base/base.component';
import {UserService} from '../../../user/services/user.service';
import {NotificationService} from '../../../../services/notification.service';

@Component({
  selector: 'app-transaction-table',
  templateUrl: './transaction-table.component.html',
  styleUrls: ['./transaction-table.component.scss']
})
export class TransactionTableComponent extends BaseComponent implements OnInit {
  @Input() item: BaseWidget = {} as BaseWidget;
  @Input() viewMode: boolean = false;
  @Input() editMode: boolean = false;
  @Output() optionChange = new EventEmitter();
  tableData = [];
  totalRecords = 0;
  columns = [];
  constructor(private taskService: TaskService,
              private userService: UserService,
              private notificationService: NotificationService) {
    super();
  }
  get metaData(): any {
    return this.item.metaData
  }
  ngOnInit(): void {}
  getTransactionTableData(params){
    this.taskService.getTransactionTableData(params).subscribe(result => {
      const {data, error} = parseApiResponse(result);
      if(!error && data){
        this.totalRecords = data.totalRecordCount;
        this.tableData = (data?.data || []).map(transaction => {
          return {
            ...transaction,
            transactionStatusId: transaction?.transactionStatus?.id,
            transactionStatus: transaction?.transactionStatus?.name
          }
        })
      }else{
        console.log('error occured while getting saved transactioon data')
      }
    })
  }
  onRowClick($event){
    if($event.id){
      this.getTransactionDetails($event.id);
    }else{
      this.notificationService.error('Transaction not found');
    }
  }
  onPageChange($event){
    const { page = 1, limit = 10} = $event || {}
    const { applicationId } = this.taskService.getTransactionDetails();
    const {id:fieldId} = this.item
    const params = {applicationId, fieldId, pageNo: page -1, recordNo:limit}
    this.getTransactionTableData(params);
  }
  getTransactionDetails(id) {
    this.loading = true;
    this.userService.getTransactionDetails(id).subscribe(
        result => {
          const { data: transactionDetails, error } = parseApiResponse(result);
          if (transactionDetails && !error) {
            this.taskService.setTransactionDetails(transactionDetails)
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
}
