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
import { AuthService } from "../../auth/services/auth.service";

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
  ErrorContainer: WidgetTypes = WidgetTypes.ErrorContainer;
  transactionId: any;
  taskId: any;
  @ViewChild("gridsterComponent", { static: false }) gridsterRef: any;

  constructor(
    private editorService: EditorService,
    private notificationService: NotificationService,
    private activatedRoute: ActivatedRoute,
    private taskService: TaskService,
    private authService: AuthService
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
      this.checkItemSize(widget);
    });
  }

  getEligibleItems(items, baseGridItem, prevItems) {
    const eligibleItems = items.filter(eachItem => {
      const item = eachItem.item;
      const baseItem = baseGridItem.$item;
      return (
        // Dont get same item
        item.metaData.widgetId !== baseGridItem.item.metaData.widgetId &&
        // Get only below items
        item.y >= (baseItem.y + baseItem.rows) &&
        // Get only under items
        (item.x + item.cols >= (baseItem.x || baseItem.x + baseItem.cols) ||
          (item.x > baseItem.x && item.x + item.cols < baseItem.x + baseItem.cols)) &&
        baseItem.x + baseItem.cols > item.x &&
        // Dont get if item found in prev round
        !prevItems.find(prevItem => prevItem.item.metaData.widgetId === item.metaData.widgetId)
      );
    });
    const itemEligibleItems = eligibleItems.flatMap(elgItem => this.getEligibleItems(items, elgItem, eligibleItems));
    return [...eligibleItems, ...itemEligibleItems];
  }

  checkItemSize(widget) {
    const gridItems = (this.gridsterRef?.grid || []).sort((a, b) => a?.item?.y - b?.item?.y);
    if (widget) {
      const widgetGridItem = gridItems.find(item => item?.item?.metaData?.widgetId === widget?.metaData?.widgetId);
      if (!widgetGridItem) {
        return;
      }
      const eligibleItems = this.getEligibleItems(gridItems, widgetGridItem, []).filter(
        (thing, index, self) => index === self.findIndex(t => t?.item?.metaData?.widgetId === thing?.item?.metaData?.widgetId)
      );
      const changeGridItemData = widget;
      const hideRows = changeGridItemData?.metaData?.hideRows || 0;
      const collisionItems = [];
      if (eligibleItems.length) {
        eligibleItems.forEach(gridItem => {
          const eachGridItem = gridItem.item;
          if (changeGridItemData?.metaData?.movement === "UP") {
            if (!collisionItems.length || collisionItems.find(colItem => colItem.y >= eachGridItem.y)) {
              eachGridItem.y = eachGridItem.y - changeGridItemData?.metaData?.defaultRows + hideRows;
              const collisionItem = this.checkCollision(eachGridItem, gridItems);
              if (collisionItem) {
                eachGridItem.y = eachGridItem.y + changeGridItemData?.metaData?.defaultRows - hideRows;
                collisionItems.push(eachGridItem);
              }
            }
          } else if (changeGridItemData?.metaData?.movement === "DOWN") {
            const collisionItem: any = this.checkCollision(changeGridItemData, gridItems);
            if (collisionItem) {
              eachGridItem.y = eachGridItem.y + changeGridItemData?.metaData?.defaultRows - hideRows;
            } else if (this.checkCollision(eachGridItem, gridItems)) {
              eachGridItem.y = eachGridItem.y + changeGridItemData?.metaData?.defaultRows - hideRows;
            }
          }
          widgetGridItem.updateOptions();
          widgetGridItem.setSize();
          gridItem.updateOptions();
          gridItem.setSize();
        });
      } else {
        widgetGridItem.updateOptions();
        widgetGridItem.setSize();
      }
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
