import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from "@angular/core";
import { getAllFromFields, eligibileReviewField, validateFields } from "src/app/utils";
import { StepperContainerMetaData } from "../../model/create-form.models";
import { EditorService } from "../../editor.service";
@Component({
  selector: "app-vertical-stepper",
  templateUrl: "./vertical-stepper.component.html",
  styleUrls: ["./vertical-stepper.component.scss"],
})
export class VerticalStepperComponent implements OnInit {
  constructor(private editorService: EditorService) {}
  @Input() children = [];
  @Input() headerContent = [];
  @Input() metaData: StepperContainerMetaData;
  reviewData = [];
  completedSteps = {};
  @ViewChild("contentConatiner", { read: ElementRef }) contentConatiner: ElementRef;
  @ViewChild("stepperBody", { read: ElementRef }) stepperBody: ElementRef;
  isInteract = false;
  ngOnInit() {
    setTimeout(() => {
      this.checkHeight();
      this.scrollTo(this.selectedIndex);
    }, 100);
  }
  _selectedIndex = 0;
  set selectedIndex(number) {
    let reviewArray = [];
    if (this.children && number === this.children.length - 1 && this.metaData?.isReviewer) {
      this.children.forEach((child) => {
        reviewArray.push({ label: child.label, children: getAllFromFields(child.children, eligibileReviewField) });
      });
      reviewArray.pop();
      this.reviewData = reviewArray;
    }
    this._selectedIndex = number;
    setTimeout(() => {
      this.checkHeight();
      this.scrollTo(this._selectedIndex);
    }, 100);
  }

  get selectedIndex() {
    return this._selectedIndex;
  }

  private scrollTo(_index: any) {
    if (this.isInteract)
      this.stepperBody.nativeElement
        ?.querySelectorAll("li")
        [this.selectedIndex]?.scrollIntoView({ block: "nearest", inline: "nearest" });
  }
  setSelection($event) {
    this.isInteract = true;
    const actionName = $event.data.metaData?.onClickConfigs.find(
      (item) => item.action === "previousStep" || item.action === "nextStep"
    );
    switch (actionName?.action) {
      case "previousStep":
        this.onPrevClick($event);
        break;
      case "nextStep":
        this.onNextClick($event);
        break;
      default:
        this.editorService.onBtnClick($event);
        break;
    }
  }
  onPrevClick($event) {
    let index = this.selectedIndex || 1;
    if (index > 0) {
      index -= 1;
    }
    this.selectedIndex = index;
    this.editorService.onBtnClick($event);
  }
  onNextClick($event) {
    let index = this.selectedIndex;
    const child = this.children[index];
    const { result: validate } = validateFields(child.children);
    if (validate) {
      this.completedSteps[child?.metaData?.widgetId] = true;
      index += 1;
      if (index > this.children.length - 1) {
        index = this.children.length - 1;
      }
      this.selectedIndex = index;
      this.editorService.onBtnClick($event);
    }
  }
  checkHeight(containerName?) {
    this.editorService.setAdjustableHeight(
      this.children[this.selectedIndex].children,
      ".content" + this.metaData["widgetId"]
    );
  }
  onSelectIndexChange = (index) => {
    this.isInteract = true;
    if (this.metaData.isFreeFlow || this.selectedIndex > index) {
      this.selectedIndex = index;
    } else {
      let isError = true;
      for (let i = this.selectedIndex; i < index; i++) {
        const child = this.children[i];
        const { result: validate } = validateFields(child.children);
        if (!validate) {
          isError = false;
        }
      }
      if (!isError) {
        this.selectedIndex = index;
      }
    }
  };
}
