import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { getAllFromFields,eligibileReviewField } from "src/app/utils";

@Component({
  selector: "app-vertical-stepper",
  templateUrl: "./vertical-stepper.component.html",
  styleUrls: ["./vertical-stepper.component.scss"]
})
export class VerticalStepperComponent implements OnInit {
  constructor() {
  }
  @Input() children = [];
  @Input() viewMode = false;
  @Input() metaData ={ isReviewer: false};
  @Output() onNext = new EventEmitter();
  @Output() onPrev = new EventEmitter();
  @Output() onSelect = new EventEmitter();
  @Output() onBtnClick = new EventEmitter();
  @Input() completedSteps = {};
  reviewData=[];
  _selectedIndex=0;

  @Input() set selectedIndex(number) {
    console.log(number);
    let reviewArray=[];
    if(this.children && number===this.children.length-1 && this.metaData?.isReviewer){
      this.children.forEach(child=>{
        reviewArray.push({label:child.label,children:getAllFromFields(child.children,eligibileReviewField)});
      })
      reviewArray.pop();
      this.reviewData =reviewArray;
      console.log(this.reviewData);
    }
    this._selectedIndex=number;
  }
  ngOnInit() {

  }
  setSelection(index:number) {
    if(index==1){
      this.onNext.emit(this._selectedIndex);
    }else{
      this.onPrev.emit(this._selectedIndex);
    }
  }
  onSelectIndexChange = index => {
    this.onSelect.emit(index);
  };
}
