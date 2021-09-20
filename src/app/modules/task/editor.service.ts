import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { BaseWidget } from "./model/create-form.models";

@Injectable({
  providedIn: "root"
})
export class EditorService {
  constructor() {}

  dragItem: any = null;
  sourceList: any = [];
  dragEvent: any = null;
  unsavedChanges: boolean = false;
  public selectedWidget = new BehaviorSubject<any>(null);
  public selectedWidgetChanged$ = this.selectedWidget.asObservable();

  public widgetConfigTabIndex = new BehaviorSubject<number>(0);
  public widgetConfigTabIndexChange$ = this.widgetConfigTabIndex.asObservable();

  public widgetChange = new BehaviorSubject<any>(null);
  public widgetChange$ = this.widgetChange.asObservable();

  public setSelectedWidget(widget: BaseWidget, source: BaseWidget[] = []) {
    this.selectedWidget.next(widget);
    if (widget) {
      this.setWidgetConfigTab(1);
      this.sourceList = source;
    } else {
      this.unsavedChanges = false;
      this.setWidgetConfigTab(0);
      this.sourceList = [];
    }
  }

  public setWidgetConfigTab(index: number) {
    this.widgetConfigTabIndex.next(index);
  }

  public setContainerHeight(items: any) {
    const container: any = document.querySelector(".gridster-container");
    if (container && container.getClientRects().length) {
      let rows = 30;
      const filterItems = items.filter(item => !item?.metaData?.isHidden);
      filterItems.forEach(item => {
        rows = Math.max(rows, item.y + item.rows);
      });
      container.style.height = rows * 10 + 50 + "px";
    }
  }
}
