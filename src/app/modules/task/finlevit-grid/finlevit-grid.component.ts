import { Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from "@angular/core";
import {
  CompactType,
  DisplayGrid,
  GridsterConfig,
  GridsterItem,
  GridsterItemComponentInterface,
  GridType
} from "../../../../../lib/angular-gridster2/src/public_api";
import { BaseWidget, MIN_COLUMNS, MIN_ROWS, WidgetTypes } from "../model/create-form.models";
import { ActivatedRoute } from "@angular/router";
import { EditorService } from "../editor.service";
import { parseApiResponse } from "../../../utils";
import { NotificationService } from "../../../services/notification.service";
import { BaseComponent } from "../../shared/base/base.component";
import { TaskService } from "../services/task.service";

@Component({
  selector: "finlevit-grid",
  templateUrl: "./finlevit-grid.component.html",
  styleUrls: ["./finlevit-grid.component.scss"]
})
export class FinlevitGridComponent extends BaseComponent implements OnInit, OnDestroy {
  options: GridsterConfig | undefined;
  dashboard: Array<GridsterItem> | undefined;
  @Input() items: Array<BaseWidget> | undefined;
  @Input() parent: BaseWidget | undefined;
  @Input() showEdit: boolean = true;
  @Input() viewMode: boolean = false;
  @Input() modifyOptions: any = {};

  @Output() onBtnClick = new EventEmitter();
  @Output() onOptionChange = new EventEmitter();
  @Output() onTableDataChange = new EventEmitter();

  Text: WidgetTypes = WidgetTypes.Text;
  Container: WidgetTypes = WidgetTypes.Container;
  Header: WidgetTypes = WidgetTypes.Header;
  Footer: WidgetTypes = WidgetTypes.Footer;
  Button: WidgetTypes = WidgetTypes.Button;
  transactionId: any;
  taskId: any;
  @ViewChild("gridsterComponent", { static: false }) gridsterRef: any;

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
      gridType: GridType.Fit,
      displayGrid: DisplayGrid.None,
      compactType: CompactType.None,
      mobileBreakpoint: 0,
      pushResizeItems: false,
      disableAutoPositionOnConflict: true,
      draggable: {
        enabled: false
      },
      pushItems: true,
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
      maxCols: 1000,
      minCols: MIN_COLUMNS,
      minRows: MIN_ROWS,
      margin: 0,
      disableScrollHorizontal: true,
      scrollSpeed: 4,
      maxItemCols: 200,
      maxItemRows: 200,
      maxItemArea: 40000,
      ...this.modifyOptions
    };
    if (this.activatedRoute?.parent?.parent?.params) {
      this.subscribe(this.activatedRoute?.parent?.parent?.params, params => {
        const { transactionId, taskId } = params;
        this.transactionId = transactionId;
        this.taskId = taskId;
      });
    }
    this.editorService.widgetChange$.subscribe(widget => {
      console.log("iam here");
      this.checkItemSize(widget);
    });
  }

  checkItemSize(widget) {
    const gridItems = (this.gridsterRef?.grid || []).sort((a, b) => a?.item?.y - b?.item?.y);
    if (widget) {
      const changeGridItemData = widget;
      const x = changeGridItemData?.x;
      const y = changeGridItemData?.y;
      gridItems.forEach(gridItem => {
        const eachGridItem = gridItem.item;
        if (
          x + changeGridItemData.cols > eachGridItem.x &&
          eachGridItem.x + eachGridItem.cols > x &&
          eachGridItem.y >= y &&
          eachGridItem?.metaData?.widgetId !== changeGridItemData?.metaData?.widgetId
        ) {
          if (changeGridItemData?.metaData?.isHidden) {
            eachGridItem.y = eachGridItem.y - changeGridItemData?.defaultRows;
            // console.log("hidden", eachGridItem, this.checkCollision(eachGridItem, gridItems));
            if (this.checkCollision(eachGridItem, gridItems)) {
              eachGridItem.y = eachGridItem.y + changeGridItemData?.defaultRows;
            }
          } else {
            const collisionItem: any = this.checkCollision(changeGridItemData, gridItems);
            // console.log("not hidden", eachGridItem, collisionItem);
            if (collisionItem) {
              eachGridItem.y = eachGridItem.y + changeGridItemData?.defaultRows;
              this.checkItemSize(eachGridItem);
            }
          }
        }
        if (eachGridItem?.metaData?.widgetId === changeGridItemData?.metaData?.widgetId) {
          eachGridItem.rows = changeGridItemData.rows;
        }
        gridItem.updateOptions();
        gridItem.setSize();
      });
    }
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
          this.notificationService.success("Saved Successfully", "Success");
          this.taskService.getWorkflowTaskData(this.transactionId, this.taskId);
        } else {
          this.notificationService.error(error.errorMessage);
        }
      },
      () => {
        this.notificationService.error("Failed to modify data", "Fail");
      }
    );
  }
  checkCollision(item: GridsterItem, items: any[]): GridsterItemComponentInterface | boolean {
    let widgetsIndex: number = items.length - 1;
    let widget: GridsterItemComponentInterface;
    for (; widgetsIndex > -1; widgetsIndex--) {
      widget = items[widgetsIndex];
      if (widget.item !== item && this.checkCollisionTwoItems(widget.item, item)) {
        return widget;
      }
    }
    return false;
  }

  checkCollisionTwoItems(item: GridsterItem, item2: GridsterItem): boolean {
    return (
      item.x < item2.x + item2.cols &&
      item.x + item.cols > item2.x &&
      item.y < item2.y + item2.rows &&
      item.y + item.rows > item2.y
    );
  }
}
