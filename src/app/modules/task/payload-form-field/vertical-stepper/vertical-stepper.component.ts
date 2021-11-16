import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { getAllFromFields,eligibileReviewField } from "src/app/utils";
import { TextStyles } from "../../model/create-form.models";
import { EditorService } from "../../editor.service";
@Component({
  selector: "app-vertical-stepper",
  templateUrl: "./vertical-stepper.component.html",
  styleUrls: ["./vertical-stepper.component.scss"]
})
export class VerticalStepperComponent implements OnInit {
  constructor(private editorService: EditorService) {
  }
  @Input() children = [];
  @Input() headerContent=[];
  @Input() viewMode = false;
  @Input() metaData = {
    showHeader: false,
    isReviewer: false,
    indicatorPattern: "cicle",
    textStyle: TextStyles.BODY1,
    color: "#000000",
    fontWeight: 400,
    currentStepColor : "#000000",
    completedStepColor : "#000000",
    textDecortation: '',
    fontStyle: '',
    defaultBarColor: '',
    completedBarColor: '',
    buttonContainer:[],
    footerBgColor: '#fff',
    conentBgColor: '#fff',
    leftPanelBgColor: '#fff',
    headerHeight:0,
  };
  @Output() onNext = new EventEmitter();
  @Output() onPrev = new EventEmitter();
  @Output() onSelect = new EventEmitter();
  @Output() onBtnClick = new EventEmitter();
  @Input() completedSteps = {};
  @Input() showEdit = false;
  reviewData=[];
  _selectedIndex=0;

  ngOnInit() {
    setTimeout(()=>{
      this.checkHeight();
    },100)
    console.log(this.children, this.selectedIndex,this.metaData,this.headerContent);
  }

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
  setSelection(item:any) {
    switch(item.metaData?.onClickConfig?.action){
      case 'previousStep':
        this.onPrev.emit(this._selectedIndex);
        break;
      case 'nextStep':
        this.onNext.emit(this._selectedIndex);
        break;
      case 'submit':
        this.onBtnClick.emit({data:item});
        break;
      case 'exit':
        break;
      case 'save':
        this.onBtnClick.emit({data:item});
        break;
    }
  }
  checkVisibility(item:any,index:number):boolean{
    switch(item.metaData?.onClickConfig?.action){
      case 'previousStep':
        return this._selectedIndex>0
      case 'nextStep':
        return this._selectedIndex<this.children.length-1;
      case 'submit':
        return this._selectedIndex===this.children.length-1;
      case 'exit':
      case 'save':
        return true;
    }
    return false;
  }
  checkHeight(containerName?) {
    console.log('parent',this.children[this._selectedIndex].children);
    this.editorService.setAdjustableHeight(this.children[this._selectedIndex].children, ".content");
  }
  onSelectIndexChange = index => {
    this.onSelect.emit(index);
  };
}
