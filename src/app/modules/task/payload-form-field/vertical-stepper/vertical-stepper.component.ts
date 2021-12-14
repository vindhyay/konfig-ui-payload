import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from "@angular/core";
import { getAllFromFields,eligibileReviewField } from "src/app/utils";
import { TextStyles } from "../../model/create-form.models";
import { EditorService } from "../../editor.service";
import { TaskService } from "../../services/task.service";
@Component({
  selector: "app-vertical-stepper",
  templateUrl: "./vertical-stepper.component.html",
  styleUrls: ["./vertical-stepper.component.scss"]
})
export class VerticalStepperComponent implements OnInit {
  constructor(private editorService: EditorService,private taskService: TaskService) {
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
    buttonContainer:{},
    footerBgColor: '#fff',
    conentBgColor: '#fff',
    leftPanelBgColor: '#fff',
    headerHeight:0,
    stepperHeight:0,
  };
  @Output() onNext = new EventEmitter();
  @Output() onPrev = new EventEmitter();
  @Output() onSelect = new EventEmitter();
  @Output() onBtnClick = new EventEmitter();
  @Output() onOptionChange = new EventEmitter();
  @Output() onTableDataChange = new EventEmitter();
  @Input() completedSteps = {};
  @Input() showEdit = false;
  reviewData=[];
  _selectedIndex=0;
  @ViewChild("contentConatiner", { read: ElementRef }) contentConatiner: ElementRef;
  @ViewChild("stepperBody", { read: ElementRef }) stepperBody: ElementRef;
  ngOnInit() {
    setTimeout(()=>{
      this.checkHeight();
      this.scrollTo(this._selectedIndex);
    },100)
    this.taskService.transactionDetailsSubject.subscribe(value => {
      setTimeout(()=>{
        this.checkVisibility();
        this.scrollTo(this._selectedIndex);
      })
    })
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
    setTimeout(()=>{
      this.checkHeight();
      this.checkVisibility();
      this.scrollTo(this._selectedIndex);
      this.contentConatiner.nativeElement.scrollIntoView();
    },100)
  }
  private scrollTo(_index: any) {
    // console.log(this.stepperBody.nativeElement);
    // let elmnt = document.querySelectorAll('.stepper-body>li')[];
    this.stepperBody.nativeElement?.children[this._selectedIndex]?.scrollIntoView({block: "nearest", inline: "nearest"});
    // elmnt?.scrollIntoView({block: "nearest", inline: "nearest"});
  }
  setSelection(item:any) {
    // switch(item.metaData?.onClickConfig?.action){
    //   case 'previousStep':
    //     this.onPrev.emit(this._selectedIndex);
    //     break;
    //   case 'nextStep':
    //     this.onNext.emit(this._selectedIndex);
    //     break;
    //   case 'submit':
    //     this.onBtnClick.emit({data:item});
    //     break;
    //   case 'exit':
    //     break;
    //   case 'save':
    //     this.onBtnClick.emit({data:item});
    //     break;
    // }
    switch(item.data.metaData?.onClickConfig?.action){
      case 'previousStep':
        this.onPrev.emit(this._selectedIndex);
        this.onBtnClick.emit(item);
        break;
      case 'nextStep':
        this.onNext.emit(this._selectedIndex);
        this.onBtnClick.emit(item);
        break;
      case 'submit':
        this.onBtnClick.emit(item);
        break;
      case 'save':
        this.onBtnClick.emit(item);
        break;
    }
  }
  checkVisibility(){
    this.metaData.buttonContainer['children'] = this.metaData.buttonContainer['children'].map((item)=>{
      switch(item.metaData?.onClickConfig?.action){
        case 'previousStep':
           return {...item, metaData:{ ...item.metaData,isHidden:this._selectedIndex<=0}};
        case 'nextStep':
          return {...item, metaData:{ ...item.metaData,isHidden:this._selectedIndex===this.children.length-1}};
        case 'submit':
          return {...item, metaData:{ ...item.metaData,isHidden:this._selectedIndex!==this.children.length-1}};
        default:
          return item;
      }
    })
  }
  checkHeight(containerName?) {
    console.log('parent',this.children[this._selectedIndex].children);
    this.editorService.setAdjustableHeight(this.children[this._selectedIndex].children, ".content");
  }
  onSelectIndexChange = index => {
    this.onSelect.emit(index);
  };
}
