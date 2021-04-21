import { Component, Input, OnDestroy, OnInit} from '@angular/core';
import {
  CompactType,
  DisplayGrid,
  GridsterConfig,
  GridsterItem,
  GridType
} from '../../../../../lib/angular-gridster2/src/public_api';
import { BaseWidget, MIN_COLUMNS, MIN_ROWS, WidgetTypes } from '../model/create-form.models';
import { ActivatedRoute } from '@angular/router';
import {EditorService} from "../editor.service";
import {parseApiResponse} from "../../../utils";
import {NotificationService} from "../../../services/notification.service";
import {BaseComponent} from "../../shared/base/base.component";
import {TaskService} from "../services/task.service";

@Component({
  selector: 'finlevit-grid',
  templateUrl: './finlevit-grid.component.html',
  styleUrls: ['./finlevit-grid.component.scss']
})
export class FinlevitGridComponent extends BaseComponent implements OnInit, OnDestroy {
  options: GridsterConfig | undefined;
  dashboard: Array<GridsterItem> | undefined;
  @Input() items: Array<BaseWidget> | undefined;
  @Input() parent: BaseWidget | undefined;
  @Input() showEdit: boolean = true;
  @Input() viewMode: boolean = false;
  @Input() modifyOptions: any = {};

  Text: WidgetTypes = WidgetTypes.Text;
  Container: WidgetTypes = WidgetTypes.Container;
  Header: WidgetTypes = WidgetTypes.Header;
  Footer: WidgetTypes = WidgetTypes.Footer;
  transactionId : any;
  taskId : any;

  constructor(
    private editorService: EditorService,
    private notificationService: NotificationService,
    private activatedRoute: ActivatedRoute,
    private taskService: TaskService
  ) {
    super();
  }

  ngOnInit() {
    this.options = {
      gridType: GridType.ScrollVertical,
      displayGrid: DisplayGrid.None,
      compactType: CompactType.None,
      mobileBreakpoint: 0,
      pushResizeItems: false,
      draggable: {
        enabled: false
      },
      resizable: {
        enabled: false,
        handles: {
          s: false,
          e: false,
          n: false,
          w: false,
          sw: true,
          se: true,
          ne: true,
          nw: true
        }
      },
      enableOccupiedCellDrop: true,
      enableEmptyCellDrop: true,
      minItemCols: 1,
      minItemRows: 1,
      minItemArea: 1,
      defaultItemCols: 1,
      defaultItemRows: 1,
      maxRows: 1000,
      minCols: MIN_COLUMNS,
      minRows: MIN_ROWS,
      margin: 0,
      scrollSpeed: 4,
      ...this.modifyOptions
    };
    // @ts-ignore
    this.subscribe(this.activatedRoute.parent.parent.params, params => {
      const { transactionId, taskId } = params;
      this.transactionId = transactionId;
      this.taskId = taskId;
    });
  }

  ngOnDestroy() {
    super.ngOnDestroy();
  }

  onEdit(item: BaseWidget) {
    const {
      value: { value, id }
    } = item;
    const payload = { newValue: value };
    const params = { dataId: id, transactionTaskId: this.taskId };
    this.taskService.modifyTaskField(payload, params).subscribe(
        (result: any) => {
        const { data, error } = parseApiResponse(result);
        if (data && !error) {
          this.notificationService.success('Saved Successfully', 'Success');
          this.taskService.getWorkflowTaskData(this.transactionId, this.taskId);
        } else {
          this.notificationService.error(error.errorMessage);
        }
      },
        () => {
        this.notificationService.error('Failed to modify data', 'Fail');
      }
    );
  }
}