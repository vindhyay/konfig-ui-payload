import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from "@angular/core";
import { FormControl, Validators } from "@angular/forms";
import { FieldData } from "../model/field-data.model";
import { DataTypes } from "../model/payload-field.model";
import { BaseWidget, Column, NESTED_MIN_COLUMNS, TableMetaData, WidgetTypes } from "../model/create-form.models";
import { getErrorMessages, getFieldFromFields, getValidators, validateFields } from "../../../utils";
import { TaskService } from "../services/task.service";
import { AuthService } from "../../auth/services/auth.service";
import { EditorService } from "../editor.service";
import * as moment from "moment";

@Component({
  selector: "app-payload-form-field",
  templateUrl: "./payload-form-field.component.html",
  styleUrls: ["./payload-form-field.component.scss"]
})
export class PayloadFormFieldComponent implements OnInit,OnDestroy {
  tabActiveIndex = 0;

  _item: BaseWidget = {} as BaseWidget;
  Text: WidgetTypes = WidgetTypes.Text;
  Table: WidgetTypes = WidgetTypes.Table;
  AdvTable: WidgetTypes = WidgetTypes.AdvTable;
  TransactionTable: WidgetTypes = WidgetTypes.TransactionTable;
  Button: WidgetTypes = WidgetTypes.Button;
  CollapseContainer: WidgetTypes = WidgetTypes.CollapseContainer;
  Container: WidgetTypes = WidgetTypes.Container;
  TabContainer: WidgetTypes = WidgetTypes.TabContainer;
  StepperContainer: WidgetTypes = WidgetTypes.StepperContainer;
  Dropdown: WidgetTypes = WidgetTypes.Dropdown;
  RadioGroup: WidgetTypes = WidgetTypes.RadioGroup;
  DatePicker: WidgetTypes = WidgetTypes.DatePicker;
  Header: WidgetTypes = WidgetTypes.Header;
  Footer: WidgetTypes = WidgetTypes.Footer;
  Image: WidgetTypes = WidgetTypes.Image;
  TextInput: WidgetTypes = WidgetTypes.TextInput;
  PasswordInput: WidgetTypes = WidgetTypes.PasswordInput;
  SSNInput: WidgetTypes = WidgetTypes.SSNInput;
  Email: WidgetTypes = WidgetTypes.Email;
  PhonenumberInput: WidgetTypes = WidgetTypes.PhonenumberInput;
  ErrorContainer: WidgetTypes = WidgetTypes.ErrorContainer;
  TextArea: WidgetTypes = WidgetTypes.TextArea;
  Number: WidgetTypes = WidgetTypes.Number;
  Checkbox: WidgetTypes = WidgetTypes.Checkbox;
  Modal: WidgetTypes = WidgetTypes.Modal;
  CheckboxGroup: WidgetTypes = WidgetTypes.CheckboxGroup;
  Upload: WidgetTypes = WidgetTypes.Upload;
  Divider: WidgetTypes = WidgetTypes.Divider;
  Spacer: WidgetTypes = WidgetTypes.Spacer;
  Icon: WidgetTypes = WidgetTypes.Icon;
  NESTED_MIN_COLUMNS: number = NESTED_MIN_COLUMNS;
  activeTabIndexes = {};
  activeStepperIndexes = {};
  modalStatus = {};
  verticalStepIndex:number =1 ;
  completedSteps = {};
  selectedStep = 0;
  transactionStatus = null;
  hide = false;
  disable = false;
  collapseContainerStatus = true;
  constructor(
    private taskService: TaskService,
    private authService: AuthService,
    private editorService: EditorService
  ) {}
  @Input()
  get item() {
    return this._item;
  }
  set item(data: BaseWidget) {
    if (!data.value || typeof data.value != "object" || !data.value.value) {
      data.value = { id: data?.value?.id, value: data?.value?.value ? data.value : null };
    }
    if (data?.metaData?.widgetType === WidgetTypes.Table) {
      const metaData = data.metaData as TableMetaData<Column>;
      data.value = { id: data?.value?.id, value: data?.value?.value?.length ? data.value.value : metaData?.options?.length ? metaData.options : [] };
    }
    if(data?.metaData?.widgetType === WidgetTypes.Checkbox) {
      data.value = {id: data?.value?.id, value: data?.value?.value || false}
    }
    if (data?.validators?.minDate) {
      data.validators.minDate = new Date(data?.validators?.minDate);
    }
    if (data?.validators?.maxDate) {
      data.validators.maxDate = new Date(data?.validators?.maxDate);
    }
    this._item = data;
  }
  @Input() parent: FieldData = {} as FieldData;
  @Input() fieldIndex: number = 0;
  @Input() addMode = true;
  @Input() showEdit = true;
  @Input() viewMode = true;
  @Input() showDelete = true;
  @Input() restrictHeight = true;
  @Input() list = null;
  @Input() customClass = "";
  dataTypes = DataTypes;
  @Output() edit = new EventEmitter();
  @Output() onBtnClick = new EventEmitter();
  @Output() onOptionChange = new EventEmitter();
  @Output() onTableDataChange = new EventEmitter();
  private _payloadFields: any;
  get payloadFields(): any {
    return this._payloadFields;
  }
  transactionDetailsSubscription = null;
  ngOnDestroy() {
    if(this.transactionDetailsSubscription){
      this.transactionDetailsSubscription.unsubscribe();
    }
  }

  isTextInput(widgetType:any):boolean{

    return (widgetType==='TextInput' || widgetType==='Email' );
  }
  isError(item){
    return (item?.errorMessage?.length>0 || item.error===true);
  }
  ngOnInit() {
    this.transactionDetailsSubscription = this.taskService.transactionDetailsSubject.subscribe(value => {
      if (value) {
        this._payloadFields = value.uiPayload;
        this.transactionStatus = value?.transactionStatus || null;
        const { id = "" } = this.authService.getAgentRole() || {};
        if (this.item.permissions && this.item?.permissions[id]) {
          this.hide = this.item?.permissions[id].hide
            ? this.item?.permissions[id].hide.indexOf(this.transactionStatus) > -1
            : false;
          this.disable = this.item?.permissions[id].disable
            ? this.item?.permissions[id].disable.indexOf(this.transactionStatus) > -1
            : false;
          if(this.hide){
            if (this.item.rows) {
              setTimeout(() => {
                this.onCollapse(false, this.item);
              });
            }
          }else{
            if(!this.item?.metaData?.isHidden && !this.item.rows){
              setTimeout(() => {
                this.onCollapse(true, this.item);
              });
            }
          }
        }
      }
    })
    this.transactionDetailsSubscription.unsubscribe();
    this.tabActiveIndex = this.editorService.activeTabIndexes[this.item.metaData.widgetId];
    this.selectedStep = this.editorService.activeStepperIndexes[this.item.metaData.widgetId];
  }

  ngAfterViewInit() {
    if (this.item?.metaData?.movement === "UP") {
      this.collapseContainerStatus = false;
    }
    // Apply conditions based on default value
    setTimeout(() => {
      this.onChange(this.item?.value?.value);
    });
  }
  showControls: boolean = false;
  editMode: boolean = false;
  originalValue: any = "";

  onEdit($event: any, item: any) {
    const {
      value: { value = "" },
      metaData: {}
    } = item;
    this.originalValue = JSON.parse(JSON.stringify(value));
    this.editMode = true;
  }

  onCancel() {
    this.item.errorMsg = "";
    this.item.error = false;
    this.item.value.value = this.originalValue;
    this.editMode = false;
  }

  onSave(item: BaseWidget) {
    const {
      value: { value = "" },
      metaData: {}
    } = item;
    const tempFormControl = new FormControl(value, getValidators(item.validators));
    if (tempFormControl.valid) {
      this.originalValue = JSON.parse(JSON.stringify(value));
      this.editMode = false;
      this.edit.emit(item);
    }
  }

  toggleControls(status: boolean) {
    this.showControls = this.editMode ? true : status;
  }

  addNew(field: any, children: any) {
    const child = JSON.parse(JSON.stringify(children[0]));
    this.clearValue(child);
    children.push(child);
  }
  clearValue(child: any) {
    if (child && (child.type === DataTypes.object || child.type === DataTypes.array)) {
      child.children.forEach((child: any) => {
        this.clearValue(child);
      });
    } else {
      child.value = { id: null, value: "" };
    }
  }
  remove(parent: any) {
    parent.children.splice(this.fieldIndex, 1);
  }
  validateField($event: any, field: any) {
    const { validators = {}, label = "" } = field;
    const tempFormControl = new FormControl($event, getValidators(validators));
    if (tempFormControl.valid) {
      field.value.value = $event;
      field.error = false;
      field.errorMsg = "";
    } else {
      field.error = true;
      field.errorMsg = getErrorMessages(tempFormControl.errors, label);
    }
  }
  btnClick($event, data) {
    this.onBtnClick.emit({ event: $event, data });
  }
  optionChange($event, data) {
    this.onOptionChange.emit({ event: $event, data });
  }
  onTabChange($event) {
    const { index = 0 } = $event;
    this.editorService.activeTabIndexes[this.item.metaData.widgetId] = index;
    this.tabActiveIndex = index;
    window.dispatchEvent(new Event("resize"));
  }
  onColDataChange($event) {
    this.onTableDataChange.emit({ tableData: this.item, event: $event });
  }

  onNext($event, child, stepperRef) {
    const validate = validateFields(child.children);
    if (validate) {
      this.completedSteps[child?.metaData?.widgetId] = true;
      stepperRef.next();
    }
  }
  onPrevClick($event){
    if($event>1){
      this.verticalStepIndex -=1;
    }
  }
  onSelectionClick($event,metaData){
    if(metaData.isFreeflow || (this.verticalStepIndex>$event)){
      this.verticalStepIndex = $event;
    }else{
      const child=this.item.children[this.verticalStepIndex]
      const validate = validateFields(child.children);
      if (validate) {
        this.verticalStepIndex = $event;
      }
    }
  }
  onNextClick($event) {
    const child=this.item.children[this.verticalStepIndex]
    const validate = validateFields(child.children);
    if (validate) {
      this.completedSteps[child?.metaData?.widgetId] = true;
      this.verticalStepIndex +=1;
    }
    if(this.verticalStepIndex>this.item.children.length-1){
      this.verticalStepIndex=this.item.children.length-1;
    }
  }
  onCollapse(status, item) {
    if (!status) {
      this.item.rows = item?.metaData?.hideRows || 0;
      this.item.minItemRows = item?.metaData?.hideRows || 0;
      this.item.metaData.movement = "UP";
    } else {
      this.item.rows = item.metaData?.defaultRows;
      this.item.minItemRows = item.metaData?.defaultMinItemRows;
      this.item.minItemCols = item.metaData?.defaultMinItemCols;
      this.item.metaData.movement = "DOWN";
    }
    this.editorService.widgetChange.next(item);
    this.editorService.setContainerHeight(this.taskService.transactionDetailsSubject.value?.uiPayload);
  }
  onChange($event) {
    const ifConditions = this.item.metaData?.conditions?.ifConditions || [];
    this.taskService.checkCondition(ifConditions);
  }
  calculateFormulaValue(itemMetaData, id) : any{
    let formulaValue = '';
    let formula = [];
    if(itemMetaData?.formula?.length > 0){
      itemMetaData?.formula.forEach(field => {
        if (field?.resourceType === resourceType.PAYLOAD_FIELD) {
          formula.push(getFieldFromFields(this.payloadFields, field?.id));
        }else {
          formula.push(field)
        }
      })
    }
    let firstField = formula.find(field => field?.resourceType === resourceType.PAYLOAD_FIELD);
    switch (firstField?.dataType){
      case 'number':
        let expression = '';
        let values = formula.filter(field => {
          if(field?.resourceType === resourceType.PAYLOAD_FIELD){
            return field?.value?.value;
          }
        })
        if(values.length > 0){
          formula.forEach(field => {
            if (field?.resourceType === resourceType.PAYLOAD_FIELD) {
              expression = expression + ' ' + field?.value?.value;
            }
            if (field?.resourceType === resourceType.BRACKET) {
              expression = expression + ' ' + field?.displayName;
            }
            if (field?.resourceType === resourceType.FUNCTION) {
              expression = expression + ' ' + field?.expression;
            }
          })
          if(eval(expression) === Infinity){
            formulaValue = '∞'
          }else {
            formulaValue = eval(expression);
          }
        }else {
          formulaValue = values[0]?.value?.value || '';
        }
        return formulaValue;
      case 'string':
        formula.forEach(field => {
          if (field?.resourceType === resourceType.PAYLOAD_FIELD) {
            if(field?.value?.value){
              formulaValue = formulaValue + field.value.value;
            }
          }
          if (field?.resourceType === resourceType.FUNCTION) {
            if(field?.separateBy){
              formulaValue = formulaValue + field.separateBy;
            }
          }
        })
        return formulaValue;
      case 'date':
        const dateFunc = formula.filter(field => {
          return field?.resourceType === resourceType.FUNCTION
        })
        let date1;
        let date2;
        const dateIndex = formula.indexOf(dateFunc[0]);
        if(formula[dateIndex - 1].displayName === "Current Date"){
          date1 = new Date();
        }else {
          if(formula[dateIndex - 1]?.value?.value){
            date1 = moment.utc(formula[dateIndex - 1]?.value?.value).toDate();
          }
        }
        if(formula[dateIndex + 1]?.displayName === "Current Date"){
          date2 = new Date();
        }else {
          if(formula[dateIndex + 1]?.value?.value){
            date2 = moment.utc(formula[dateIndex + 1]?.value?.value).toDate();
          }
        }
        let d = moment(date2);
        let years = d.diff(date1, 'years');
        d.add(-years, 'years');
        let months = d.diff(date1, 'months');
        d.add(-months, 'months');
        let days = d.diff(date1, 'days');
        formulaValue = years + " years  " + months + " months  " + days + " days";
        return formulaValue;
      case 'array':
        if(firstField?.metaData?.widgetType === WidgetTypes.CheckboxGroup){
          if(firstField?.value?.value){
            formulaValue = firstField?.value?.value.join(" ");
          }
        }
        if(firstField?.metaData?.widgetType !== WidgetTypes.CheckboxGroup){
          const values = [];
          if(formula[1]?.column?.type === 'Text' || formula[1]?.column?.type === 'string'){
            if(formula[0]?.value?.value){
              formula[0]?.value?.value.forEach(value => {
                values.push(value[formula[1]?.column?.columnId])
              })
              formulaValue = values.join("");
            }
          }
          if(formula[1]?.column?.type === 'Number' || formula[1]?.column?.type === 'number'){
            if(formula[0]?.value?.value){
              formula[0]?.value?.value.forEach(value => {
                if(value[formula[1]?.column?.columnId] !== '' && value[formula[1]?.column?.columnId] !== null){
                  values.push(value[formula[1]?.column?.columnId])
                }
              })
              if(values.length > 1){
                formulaValue = eval(values.join(" + "))
              }else {
                formulaValue = values[0] || ''
              }
            }
          }
        }
        return formulaValue
    }
    const currField = getFieldFromFields(this.payloadFields, id);
    currField.value.value = formulaValue;
    return formulaValue;
  }
  OnStepChange($event){
    const { selectedIndex = 1 } = $event;
    this.editorService.activeStepperIndexes[this.item.metaData.widgetId] = selectedIndex;
    this.selectedStep = selectedIndex;
    window.dispatchEvent(new Event("resize"));
  }
  checkHeight(child?) {
    if (child.children?.length) {
      this.editorService.setAdjustableHeight(child?.children, ".nested-grid-container");
    }
  }
}

export enum resourceType {
  PAYLOAD_FIELD = 'payload-field',
  FUNCTION = 'function',
  BRACKET = 'bracket'
}
