import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {BaseWidget} from '../../model/create-form.models';
import {TaskService} from '../../services/task.service';
import {parseApiResponse} from '../../../../utils';

@Component({
  selector: 'app-transaction-table',
  templateUrl: './transaction-table.component.html',
  styleUrls: ['./transaction-table.component.scss']
})
export class TransactionTableComponent implements OnInit {
  @Input() item: BaseWidget = {} as BaseWidget;
  @Input() viewMode: boolean = false;
  @Input() editMode: boolean = false;
  @Output() optionChange = new EventEmitter();
  tableData = [];
  columns = [];
  constructor(private taskService: TaskService) {
  }
  get metaData(): any {
    return this.item.metaData
  }
  ngOnInit(): void {
    this.getTransactionTableData();
    this.columns = this.metaData.columns.map(column => {
      return {...column, label: column.name}
    })
  }
  getTransactionTableData(){
    const { applicationId } = this.taskService.getTransactionDetails();
    const {id:fieldId} = this.item
    const params = {applicationId, fieldId, pageNo: 0, recordNo:10}
    this.taskService.getTransactionTableData(params).subscribe(result => {
      const {data, error} = parseApiResponse(result);
      if(!error && data){
        this.tableData = data.data
      }else{
        console.log('error occured while getting saved transactioon data')
      }
    })
  }
}
