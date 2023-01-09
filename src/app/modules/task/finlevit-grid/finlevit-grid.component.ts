import { Component, EventEmitter, Input, NgZone, OnDestroy, OnInit, Output, ViewChild } from "@angular/core";
import {
  CompactType,
  DisplayGrid,
  GridsterConfig,
  GridsterItem,
  GridsterItemComponentInterface,
  GridType,
} from "../../../../../lib/angular-gridster2/src/public_api";
import { BaseWidget, ContainerActions, MIN_COLUMNS, MIN_ROWS, WidgetTypes } from "../model/create-form.models";
import { ActivatedRoute } from "@angular/router";
import { EditorService } from "../editor.service";
import { NotificationService } from "../../../services/notification.service";
import { BaseComponent } from "../../shared/base/base.component";
import { AddressDetails, validateFields } from "src/app/utils";

@Component({
  selector: "finlevit-grid",
  templateUrl: "./finlevit-grid.component.html",
  styleUrls: ["./finlevit-grid.component.scss"],
})
export class FinlevitGridComponent extends BaseComponent implements OnInit, OnDestroy {
  options: GridsterConfig | undefined;
  dashboard: Array<GridsterItem> | undefined;
  @Input() items: Array<BaseWidget> | undefined;
  @Input() parent: BaseWidget | undefined;
  @Input() emitButtonEvent: boolean = false;
  @Output() onBtnClick = new EventEmitter();
  @Input() modifyOptions: any = {};
  @Input() filter: any = null;
  @ViewChild("gridsterComponent", { static: false }) gridsterRef: any;

  Text: WidgetTypes = WidgetTypes.Text;
  Container: WidgetTypes = WidgetTypes.Container;
  TabContainer: WidgetTypes = WidgetTypes.TabContainer;
  Header: WidgetTypes = WidgetTypes.Header;
  Footer: WidgetTypes = WidgetTypes.Footer;
  Button: WidgetTypes = WidgetTypes.Button;
  CollapseContainer: WidgetTypes = WidgetTypes.CollapseContainer;
  ErrorContainer: WidgetTypes = WidgetTypes.ErrorContainer;
  transactionId: any;
  taskId: any;
  allEligibleFields = [];
  globalStyle;

  constructor(
    private editorService: EditorService,
    private notificationService: NotificationService,
    private activatedRoute: ActivatedRoute,
    private zone: NgZone
  ) {
    super();
  }

  ngOnInit() {
    this.subscribe(this.notificationService.addressAutoCompleteChanged$, (addressDetails) => {
      this.zone.run(() => {
        this.fillAddressDetails(addressDetails);
      });
    });
    if (this.parent && this.parent.metaData && this.parent.metaData.widgetType === WidgetTypes.Container) {
      this.globalStyle = this.parent?.metaData["styleProperties"]
        ? this.parent?.metaData["styleProperties"]["properties"]
        : {};
    }
    this.options = {
      gridType: GridType.Fit,
      displayGrid: DisplayGrid.None,
      compactType: CompactType.None,
      mobileBreakpoint: 0,
      pushResizeItems: false,
      disableAutoPositionOnConflict: true,
      draggable: {
        enabled: false,
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
          nw: true,
        },
      },
      enableOccupiedCellDrop: true,
      enableEmptyCellDrop: true,
      minItemCols: 1,
      minItemRows: 1,
      minItemArea: 0,
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
      ...this.modifyOptions,
    };
    if (this.activatedRoute?.parent?.parent?.params) {
      this.subscribe(this.activatedRoute?.parent?.parent?.params, (params) => {
        const { transactionId, taskId } = params;
        this.transactionId = transactionId;
        this.taskId = taskId;
      });
    }
    this.editorService.widgetChange$.subscribe((widget) => {
      this.allEligibleFields = [];
      if (widget) {
        this.checkItemSize(widget);
      }
    });
  }

  getEligibleItems(items, baseGridItem) {
    const baseOriginalHeight = baseGridItem?.item?.metaData?.originalHeight;
    const movement = baseGridItem?.item?.metaData?.movement;
    const eligibleItems = items.filter((eachItem) => {
      const item = eachItem.item;
      const baseItem = baseGridItem.$item;
      const checkSameItem = (item, baseItem) => {
        const isSame = item.widgetId !== baseGridItem.item.widgetId;
        return isSame;
      };
      const checkIsBottom = (item, baseItem) => {
        if (item?.metaData?.originalHeight >= baseOriginalHeight) {
          return true;
        }
        return false;
      };

      const checkIsSide = (item, baseItem) => {
        if (item.x + item.cols > baseItem.x && item.x + item.cols < baseItem.x + baseItem.cols) {
          return true;
        }
        if (item.x + item.cols === baseItem.cols + baseItem.x) {
          return true;
        }
        if (item.x > baseItem.x && item.x < baseItem.x + baseItem.cols) {
          return true;
        }
        if (item.x <= baseItem.x && item.x + item.cols > baseItem.x + baseItem.cols) {
          return true;
        }
      };
      return (
        // Dont get same item
        checkSameItem(item, baseItem) &&
        // Get only below items
        checkIsBottom(item, baseItem) &&
        // Get only under items
        checkIsSide(item, baseItem) &&
        // Dont get if item found in prev round
        !this.allEligibleFields.find((prevItem) => prevItem.item.widgetId === item.widgetId)
      );
    });
    this.allEligibleFields = this.allEligibleFields.concat(eligibleItems);
    const itemEligibleItems = eligibleItems.flatMap((elgItem) => this.getEligibleItems(items, elgItem));
    return [...eligibleItems, ...itemEligibleItems];
  }

  checkItemSize(widget) {
    const gridItems = (this.gridsterRef?.grid || []).sort((a, b) => a?.item?.y - b?.item?.y);
    if (widget) {
      const widgetGridItem = gridItems.find((item) => item?.item?.widgetId === widget?.widgetId);
      if (!widgetGridItem) {
        return;
      }
      const eligibleItems = this.getEligibleItems(gridItems, widgetGridItem).filter(
        (thing, index, self) => index === self.findIndex((t) => t?.item?.widgetId === thing?.item?.widgetId)
      );
      if (
        widget?.metaData?.movement === "DOWN" &&
        !eligibleItems.find((elgItem) => elgItem?.item?.y < widget.y + widget.rows)
      ) {
        widgetGridItem.updateOptions();
        widgetGridItem.setSize();
        return;
      }
      const changeGridItemData = widget;
      const hideRows = changeGridItemData?.metaData?.hideRows || 0;
      const collisionItems = [];
      if (eligibleItems.length) {
        widgetGridItem.updateOptions();
        widgetGridItem.setSize();
        eligibleItems.sort((item1, item2) => {
          return parseFloat(item1.item.y) - parseFloat(item2.item.y);
        });
        eligibleItems.forEach((gridItem, index) => {
          const eachGridItem = gridItem.item;
          if (changeGridItemData?.metaData?.movement === "UP") {
            if (!collisionItems.length || collisionItems.find((colItem) => colItem.y >= eachGridItem.y)) {
              eachGridItem.y = eachGridItem.y - changeGridItemData?.metaData?.defaultRows + hideRows;
              const collisionItem = this.checkCollision(eachGridItem, gridItems);
              if (collisionItem) {
                eachGridItem.y = eachGridItem.y + changeGridItemData?.metaData?.defaultRows - hideRows;
                collisionItems.push(eachGridItem);
              }
            }
          } else if (changeGridItemData?.metaData?.movement === "DOWN") {
            eachGridItem.y = eachGridItem.y + changeGridItemData?.metaData?.defaultRows - hideRows;
          }
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

  fillAddressDetails(addressDetails) {
    let ValidationFields = [];
    let widget = addressDetails.widget;
    let widgetIds = widget?.metaData?.linkedWidetIds;
    let address: AddressDetails = addressDetails.address;
    let businessRuleIds = [];
    let ifConditionsIds = [];
    if (address) {
      widget.value.value = address?.streetNumber + " " + address.streetName;

      if (widget.metaData?.businessRuleIds?.length) {
        businessRuleIds.push(...widget.metaData?.businessRuleIds);
      }
      if (widget.metaData?.conditionRuleIds?.length) {
        ifConditionsIds.push(...widget.metaData?.conditionRuleIds);
      }
      if (widgetIds) {
        Object.keys(widgetIds).forEach((element) => {
          let widget: BaseWidget = this.items.find((item) => item?.widgetId == widgetIds[element]);
          ValidationFields.push(widget);
          if (element != "addressLine2" && widget) {
            widget.value.value = address[element];
            if (widget.metaData?.businessRuleIds?.length) {
              businessRuleIds.push(...widget.metaData?.businessRuleIds);
            }
            if (widget.metaData?.conditionRuleIds?.length) {
              ifConditionsIds.push(...widget.metaData?.conditionRuleIds);
            }
          }
        });
      }

      let addressWidget: BaseWidget = JSON.parse(JSON.stringify(widget));
      addressWidget.metaData.businessRuleIds = businessRuleIds;
      this.editorService.onRuleTrigger({ event: addressDetails, data: addressWidget });
      //we need to validte the fields as we change the value of the field
      validateFields(ValidationFields);
      if (ifConditionsIds?.length) {
        const ifConditions = this.editorService.getCoditions(ifConditionsIds);
        if (ifConditions?.length) {
          this.editorService.checkCondition(ifConditions);
        }
      }
    }
  }

  widgetClickHandler($event, item) {
    if (item?.metaData?.widgetType.includes("Container") && this.parent?.metaData?.widgetType.includes("Container")) {
      $event.stopPropagation();
    }
  }
}
