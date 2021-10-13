import { getUniqueId } from "../../../utils";

export const MIN_COLUMNS = 100;
export const HEADER_MIN_COLUMNS = 50;
export const MIN_ROWS = 50;

export const NESTED_MIN_COLUMNS = 60;
export const NESTED_MIN_ROWS = 20;

export enum ButtonTypes {
  primary = "primary",
  info = "info",
  success = "success",
  secondary = "secondary"
}

export enum ButtonVariants {
  raisedButton = "raisedButton",
  roundedButton = "roundedButton",
  raisedTextButton = "raisedTextButton",
  outlinedButton = "outlinedButton"
}

export enum PopulateConfigOptionTypes {
  onload = "onload",
  ontrigger = "ontrigger"
}

export enum ColumnTypes {
  Text = "Text",
  TextArea = "TextArea",
  Number = "Number",
  Date = "Date",
  Data = "Data"
}

export enum ButtonActions {
  none = "none",
  logout = "logout",
  submit = "submit",
  save = "save",
  populate = "populate"
}

export enum PayloadType {
  NEW_PAYLOAD = "NEW_PAYLOAD",
  OLD_PAYLOAD = "OLD_PAYLOAD"
}

export enum AlignTypes {
  TOP = "flex-start",
  BOTTOM = "flex-end",
  CENTER = "center",
  LEFT = "flex-start",
  MIDDLE = "center",
  RIGHT = "flex-end"
}

export enum TextStyles {
  HEADING1 = "h1",
  HEADING2 = "h2",
  HEADING3 = "h3",
  HEADING4 = "h4",
  HEADING5 = "h5",
  HEADING6 = "h6",
  SUBTITLE1 = "subtitle1",
  SUBTITLE2 = "subtitle2",
  BODY1 = "body1",
  BODY2 = "body2"
}

export enum ResourceType {
  PAYLOAD_FIELD = "payload-field"
}

export const PayloadTypes = {
  NEW_PAYLOAD: PayloadType.NEW_PAYLOAD,
  OLD_PAYLOAD: PayloadType.OLD_PAYLOAD
};

export enum DATA_TYPES {
  STRING = "string",
  NUMBER = "number",
  BOOLEAN = "boolean",
  OBJECT = "object",
  ARRAY = "array"
}

export interface WidgetItem {
  cols: number;
  label: string;
  description: string;
  rows: number;
  isViewOnly?: boolean;
  widgetType: WidgetTypes;
  dataType: DATA_TYPES;
}

export enum WidgetTypes {
  Text = "Text",
  Table = "Table",
  ErrorContainer = "ErrorContainer",
  TransactionTable = "SavedTable",
  CollapseContainer = "CollapseContainer",
  Button = "Button",
  Modal = "Modal",
  TextInput = "TextInput",
  Email = "Email",
  TextArea = "TextArea",
  Number = "Number",
  Dropdown = "Dropdown",
  DatePicker = "DatePicker",
  Checkbox = "Checkbox",
  CheckboxGroup = "CheckboxGroup",
  RadioGroup = "RadioGroup",
  Container = "Container",
  TabContainer = "TabContainer",
  StepperContainer = "StepperContainer",
  Image = "Image",
  Header = "Header",
  Footer = "Footer",
  Upload = "Upload"
}
class Validators {
  required: boolean;
  editable: boolean;
  minLength: number;
  maxLength: number;
  minValue: number;
  maxValue: number;
  minDate: Date;
  maxDate: Date;
  pattern: string;
  constructor(validators) {
    const {
      required = false,
      editable = true,
      minLength = null,
      maxLength = null,
      minValue = null,
      maxValue = null,
      minDate = null,
      maxDate = null,
      pattern = null
    } = validators;
    this.required = required;
    this.editable = editable;
    this.minLength = minLength;
    this.maxLength = maxLength;
    this.minValue = minValue;
    this.maxValue = maxValue;
    this.minDate = minDate;
    this.maxDate = maxDate;
    this.pattern = pattern;
  }
}
class TextInputValidators extends Validators {
  minLength: number;
  maxLength: number;
  constructor(validator) {
    super(validator);
    const { minLength = null, maxLength = null } = validator;
    this.minLength = minLength;
    this.maxLength = maxLength;
  }
}

export class MetaData {
  widgetId: string;
  widgetType: WidgetTypes;
  level: number;
  configure: boolean;
  populateTriggerId: string;
  populateResponsePath: string;
  populateConfigType: string;
  datalistId: string;
  dataResourceId: string;
  isHidden: boolean;
  isSessionField: boolean;

  movement: "UP" | "DOWN" | null;
  hideRows: number;
  defaultRows: number;
  defaultMinItemRows: number;
  conditions: any;

  constructor(data) {
    const {
      widgetId,
      widgetType,
      level,
      configure = false,
      datalistId = null,
      dataResourceId = null,
      populateTriggerId = null,
      populateResponsePath = null,
      populateConfigType = PopulateConfigOptionTypes.ontrigger,
      isHidden = false,
      isSessionField = false,
      movement = null,
      defaultRows,
      defaultMinItemRows,
      hideRows,
      conditions
    } = data;
    this.widgetId = widgetId || getUniqueId("widget");
    this.widgetType = widgetType;
    this.level = level;
    this.configure = configure;
    this.populateConfigType = populateConfigType;
    this.populateResponsePath = populateResponsePath;
    this.populateTriggerId = populateTriggerId;
    this.datalistId = datalistId;
    this.dataResourceId = dataResourceId;
    this.isHidden = isHidden;
    this.isSessionField = isSessionField;
    this.movement = movement;
    this.defaultMinItemRows = defaultMinItemRows;
    this.defaultRows = defaultRows;
    this.hideRows = hideRows;
    this.conditions = conditions;
  }
}

export class Column {
  type: DATA_TYPES;
  colType: string;
  columnId: string;
  label: string;
  name: string;
  displayName: string;
  populateResponsePath: string;
  onChange: string;
  resultField: string;
  width?: string;
  editable: boolean;
  validators: Validators;
  constructor(data) {
    const {
      type = DATA_TYPES.STRING,
      colType = ColumnTypes.Text,
      label = "",
      name = "",
      displayName = "",
      populateResponsePath = "",
      columnId = "",
      onChange = null,
      resultField = null,
      width = "100",
      editable = true,
      validators = {}
    } = data;
    this.colType = colType;
    this.type = type;
    this.label = label;
    this.columnId = columnId || getUniqueId("column");
    this.name = name;
    this.displayName = displayName;
    this.populateResponsePath = populateResponsePath;
    this.onChange = onChange;
    this.resultField = resultField;
    this.width = width;
    this.editable = editable;
    this.validators = new Validators(validators);
  }
}
export class TableMetaData extends MetaData {
  columns: Array<Column>;
  populateConfigType: string;
  heading: string;
  sort: boolean;
  filter: boolean;
  pagination: boolean;
  addRows: boolean;
  options: Array<any>;
  color: string;
  bgColor: string;
  constructor(data) {
    super(data);
    const {
      columns = [],
      populateConfigType = PopulateConfigOptionTypes.onload,
      heading = "",
      sort = false,
      filter = false,
      pagination = false,
      addRows = false,
      options = [],
      color = "#000000",
      bgColor = "#ffffff"
    } = data;
    this.columns = columns;
    this.populateConfigType = populateConfigType;
    this.heading = heading;
    this.sort = sort;
    this.filter = filter;
    this.pagination = pagination;
    this.options = options;
    this.color = color;
    this.bgColor = bgColor;
    this.addRows = addRows;
  }
}

export class OptionConfig {
  dataResourceId: string;
  datalistId: string;
  parameters: Array<any>;
  populateConfigType: string;
  populateTriggerId: string;
  optionLabel: string;
  optionValue: string;
  showDisplayField: boolean;
  constructor(data) {
    const {
      dataResourceId = null,
      datalistId = null,
      parameters = [],
      populateConfigType = null,
      populateTriggerId = null,
      optionLabel = "",
      optionValue = "",
      showDisplayField = false
    } = data;
    this.dataResourceId = dataResourceId;
    this.datalistId = datalistId;
    this.parameters = parameters;
    this.populateConfigType = populateConfigType;
    this.populateTriggerId = populateTriggerId;
    this.optionLabel = optionLabel;
    this.optionValue = optionValue;
    this.showDisplayField = showDisplayField;
  }
}

export class OnChangeTriggerConfig {
  action: string;
  dataResourceId: string;
  datalistId: string;
  parameters: Array<any>;
  constructor(data) {
    const { action = "none", dataResourceId = null, datalistId = null, parameters = [] } = data;
    this.action = action;
    this.dataResourceId = dataResourceId;
    this.datalistId = datalistId;
    this.parameters = parameters;
  }
}

export class SavedColumn {
  name: string;
  path: string;
  type: string;
  columnId: string;
}

export class SavedTransactionMetaData extends MetaData {
  color: string;
  bgColor: string;
  heading: string;
  sort: boolean;
  filter: boolean;
  pagination: boolean;
  columns: Array<SavedColumn>;
  statusIds: Array<string>;
  constructor(data) {
    super(data);
    const {
      heading = "",
      sort = false,
      filter = false,
      pagination = false,
      color = "#000000",
      bgColor = "#ffffff",
      columns = [],
      statusIds = []
    } = data;
    this.columns = columns;
    this.heading = heading;
    this.sort = sort;
    this.filter = filter;
    this.pagination = pagination;
    this.color = color;
    this.bgColor = bgColor;
    this.statusIds = statusIds;
  }
}

export class DropdownMetaData extends MetaData {
  tooltip: string;
  placeholder: string;
  options: Array<any>;
  optionLabel: string;
  optionValue: string;
  isLabelAndValue: boolean;
  optionType: string;
  optionPopulateConfig: Array<OptionConfig>;
  onChangeConfig: OnChangeTriggerConfig;
  constructor(data) {
    super(data);
    const {
      placeholder = "Select",
      tooltip = "",
      optionLabel = "",
      optionValue = "",
      options = [],
      optionType = "manual",
      isLabelAndValue = false,
      optionPopulateConfig = [],
      onChangeConfig = {}
    } = data;
    this.placeholder = placeholder;
    this.optionType = optionType;
    this.optionLabel = optionLabel;
    this.optionValue = optionValue;
    this.tooltip = tooltip;
    this.options = options;
    this.isLabelAndValue = isLabelAndValue;
    this.optionPopulateConfig = optionPopulateConfig;
    this.onChangeConfig = new OnChangeTriggerConfig(onChangeConfig);
  }
}

export class TextInputMetaData extends MetaData {
  mask: string;
  icon: string;
  placeholder: string;
  tooltip: string;
  leftIcon: string;
  rightIcon: string;
  isFormulaField: boolean;
  formula = [];
  constructor(data) {
    super(data);
    const { mask = "", icon = "", tooltip = "", placeholder = "", leftIcon = "", rightIcon = "", isFormulaField, formula } = data;
    this.mask = mask;
    this.icon = icon;
    this.tooltip = tooltip;
    this.placeholder = placeholder;
    this.leftIcon = leftIcon;
    this.rightIcon = rightIcon;
    this.isFormulaField = isFormulaField;
    this.formula = formula;
  }
}

export class EmailMetaData extends MetaData {
  mask: string;
  icon: string;
  placeholder: string;
  tooltip: string;
  leftIcon: string;
  rightIcon: string;
  isFormulaField: boolean;
  formula = [];
  pattern:string;
  constructor(data) {
    super(data);
    const { mask = "", icon = "", tooltip = "", placeholder = "example@domain.com", leftIcon = "", rightIcon = "", isFormulaField, formula } = data;
    this.mask = mask;
    this.icon = icon;
    this.tooltip = tooltip;
    this.placeholder = placeholder;
    this.leftIcon = leftIcon;
    this.rightIcon = rightIcon;
    this.isFormulaField = isFormulaField;
    this.formula = formula;
    this.pattern = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$';
  }
}

export class ButtonMetaData extends MetaData {
  icon: string;
  iconPos: string;
  type: ButtonTypes;
  variant: ButtonVariants;
  clickAction: ButtonActions;
  constructor(data) {
    super(data);
    const {
      icon = "",
      iconPos = "left",
      type = ButtonTypes.primary,
      variant = ButtonVariants.raisedButton,
      clickAction = ButtonActions.none
    } = data;
    this.icon = icon;
    this.iconPos = iconPos;
    this.type = type;
    this.variant = variant;
    this.clickAction = clickAction;
  }
}

export class TextAreaMetaData extends MetaData {
  placeholder: string;
  tooltip: string;
  rowsCount: number;
  autoResize: boolean;
  constructor(data) {
    super(data);
    const { tooltip = "", placeholder = "", rowsCount = 3, autoResize = false } = data;
    this.tooltip = tooltip;
    this.placeholder = placeholder;
    this.rowsCount = rowsCount;
    this.autoResize = autoResize;
  }
}

export class DatePickerMetaData extends MetaData {
  viewDateFormat: string;
  returnDateFormat: string;
  placeholder: string;
  tooltip: string;
  constructor(data) {
    super(data);
    const { viewDateFormat = "mm/dd/yy", returnDateFormat = "isoTimestamp", tooltip = "", placeholder = "" } = data;
    this.viewDateFormat = viewDateFormat;
    this.returnDateFormat = returnDateFormat;
    this.tooltip = tooltip;
    this.placeholder = placeholder;
  }
}

export class NumberMetaData extends MetaData {
  format: boolean;
  prefix: string;
  suffix: string;
  placeholder: string;
  tooltip: string;
  isFormulaField: boolean;
  formula = [];
  constructor(data) {
    super(data);
    const { prefix = "", suffix = "", tooltip = "", placeholder = "", format = false, isFormulaField, formula } = data;
    this.format = format;
    this.prefix = prefix;
    this.suffix = suffix;
    this.tooltip = tooltip;
    this.placeholder = placeholder;
    this.isFormulaField = isFormulaField;
    this.formula = formula;
  }
}

export class TextMetaData extends MetaData {
  _value: string;
  textStyle: TextStyles;
  horizontalAlign: AlignTypes;
  verticalAlign: AlignTypes;
  color: string;
  fontWeight: number;
  constructor(data) {
    super(data);
    const {
      _value = "Hello World",
      textStyle = TextStyles.BODY1,
      horizontalAlign = AlignTypes.MIDDLE,
      verticalAlign = AlignTypes.CENTER,
      color = "#000000",
      fontWeight = 400
    } = data;
    this.color = color;
    this.fontWeight = fontWeight;
    this._value = _value;
    this.textStyle = textStyle;
    this.horizontalAlign = horizontalAlign;
    this.verticalAlign = verticalAlign;
  }
}

export class ContainerMetaData extends MetaData {
  title: string;
  icon: string;
  constructor(data) {
    super(data);
    const { title = "", icon = "" } = data;
    this.title = title;
    this.icon = icon;
  }
}

export class ErrorContainerMetadata extends ContainerMetaData {
  constructor(data) {
    super(data);
  }
}

export class CollapseContainerMetaData extends ContainerMetaData {
  constructor(data) {
    super(data);
  }
}

export class Value {
  id: string;
  value: any;
  constructor(data) {
    const { id, value = "" } = data;
    this.id = id;
    this.value = value;
  }
}

export class CheckboxMetaData extends MetaData {
  tooltip: string;
  constructor(data) {
    super(data);
    const { tooltip = "" } = data;
    this.tooltip = tooltip;
  }
}

export class CheckboxGroupMetaData extends CheckboxMetaData {
  tooltip: string;
  options: Array<any>;
  isLabelAndValue: boolean;
  optionType: string;
  optionLabel: string;
  optionValue: string;
  dataResourceId: string;
  datalistId: string;
  constructor(data) {
    super(data);
    const {
      tooltip = "",
      options = [],
      optionType = "manual",
      optionLabel = "name",
      optionValue = "value",
      isLabelAndValue = false,
      dataResourceId = "",
      datalistId = ""
    } = data;
    this.optionType = optionType;
    this.tooltip = tooltip;
    this.options = options;
    this.isLabelAndValue = isLabelAndValue;
    this.optionLabel = optionLabel;
    this.optionValue = optionValue;
    this.datalistId = datalistId;
    this.dataResourceId = dataResourceId;
  }
}

export class RadioGroupMetaData extends CheckboxMetaData {
  tooltip: string;
  options: Array<any>;
  isLabelAndValue: boolean;
  optionType: string;
  optionLabel: string;
  optionValue: string;
  alignOptions: string;
  constructor(data) {
    super(data);
    const {
      tooltip = "",
      options = [],
      optionType = "manual",
      optionLabel = "name",
      optionValue = "value",
      isLabelAndValue = false,
      alignOptions = "Horizontal"
    } = data;
    this.optionType = optionType;
    this.tooltip = tooltip;
    this.options = options;
    this.isLabelAndValue = isLabelAndValue;
    this.optionLabel = optionLabel;
    this.optionValue = optionValue;
    this.alignOptions = alignOptions;
  }
}

export class ImageMetaData extends MetaData {
  url: string;
  constructor(data) {
    super(data);
    const { url = "" } = data;
    this.url = url;
  }
}

export class HeaderMetaData extends MetaData {
  backgroundColor: string;
  constructor(data) {
    super(data);
    const { backgroundColor = "#ffffff" } = data;
    this.backgroundColor = backgroundColor;
  }
}
export class FooterMetaData extends MetaData {
  backgroundColor: string;
  constructor(data) {
    super(data);
    const { backgroundColor = "#fff" } = data;
    this.backgroundColor = backgroundColor;
  }
}
export class UploadMetaData extends MetaData {
  tooltip: string;
  acceptedFileTypes: string;
  acceptedFiles: any[];
  constructor(data) {
    super(data);
    const { tooltip = "", acceptedFileTypes = "", acceptedFiles = [] } = data;
    this.tooltip = tooltip;
    this.acceptedFiles = acceptedFiles;
    this.acceptedFileTypes = acceptedFileTypes;
  }
}

export class ModalMetaData extends MetaData {
  title: string;
  icon: string;
  height: string;
  width: string;
  color: string;
  bgColor: string;
  constructor(data) {
    super(data);
    const { title = "", icon = "", height = "400px", width = "500px", color = "#000000", bgColor = "#ffffff" } = data;
    this.title = title;
    this.icon = icon;
    this.height = height;
    this.width = width;
    this.color = color;
    this.bgColor = bgColor;
  }
}

export class BaseWidget {
  id: any;
  cols: number;
  rows: number;
  x: number;
  y: number;
  widgetName?: any;
  minItemCols: number;
  maxItemCols: number;
  minItemRows: number;
  maxItemRows: number;

  hideRows: number;
  defaultRows: number;
  defaultMinItemRows: number;
  defaultMinItemCols: number;

  isViewOnly: boolean;
  metaData:
    | TextMetaData
    | EmailMetaData
    | ContainerMetaData
    | TextInputMetaData
    | NumberMetaData
    | CheckboxMetaData
    | ImageMetaData
    | HeaderMetaData
    | FooterMetaData
    | CheckboxGroupMetaData
    | DropdownMetaData
    | DatePickerMetaData
    | RadioGroupMetaData
    | TextAreaMetaData
    | ButtonMetaData
    | TableMetaData
    | UploadMetaData
    | CollapseContainerMetaData
    | ErrorContainerMetadata;
  name: string;
  displayName: string;
  label: string;
  dataType: DATA_TYPES;
  // TODO duplicate remove later
  type?: DATA_TYPES;
  resourceType: ResourceType;
  isPrePopulated: boolean;
  status: boolean;
  error?: boolean;
  errorMsg?: string;
  children: BaseWidget[];
  validators: Validators;
  value: Value;
  permissions?: any;
  constructor(data) {
    const {
      id,
      isViewOnly = false,
      displayName = "",
      name = "",
      label = "",
      dataType,
      widgetType,
      isPrePopulated = false,
      status = true,
      resourceType = ResourceType.PAYLOAD_FIELD,
      children,
      error = "",
      metaData,
      validators,
      cols = 5,
      rows = 3,
      x,
      y,
      value,
      minItemCols,
      minItemRows,
      maxItemCols,
      maxItemRows
    } = data;
    if (!metaData) {
      switch (widgetType) {
        case WidgetTypes.Text:
          this.metaData = new TextMetaData(data);
          break;
        case WidgetTypes.Container:
          this.metaData = new ContainerMetaData(data);
          break;
        case WidgetTypes.TextInput:
          this.metaData = new TextInputMetaData(data);
          break;
        case WidgetTypes.Email:
          this.metaData = new EmailMetaData(data);
          break;
        case WidgetTypes.Number:
          this.metaData = new NumberMetaData(data);
          break;
        case WidgetTypes.Checkbox:
          this.metaData = new CheckboxMetaData(data);
          break;
        case WidgetTypes.Image:
          this.metaData = new ImageMetaData(data);
          break;
        case WidgetTypes.Header:
          this.metaData = new HeaderMetaData(data);
          break;
        case WidgetTypes.Footer:
          this.metaData = new FooterMetaData(data);
          break;
        case WidgetTypes.CheckboxGroup:
          this.metaData = new CheckboxGroupMetaData(data);
          break;
        case WidgetTypes.Dropdown:
          this.metaData = new DropdownMetaData(data);
          break;
        case WidgetTypes.DatePicker:
          this.metaData = new DatePickerMetaData(data);
          break;
        case WidgetTypes.RadioGroup:
          this.metaData = new RadioGroupMetaData(data);
          break;
        case WidgetTypes.TextArea:
          this.metaData = new TextAreaMetaData(data);
          break;
        case WidgetTypes.Button:
          this.metaData = new ButtonMetaData(data);
          break;
        case WidgetTypes.Table:
          this.metaData = new TableMetaData(data);
          break;
        case WidgetTypes.Upload:
          this.metaData = new UploadMetaData(data);
          break;
        case WidgetTypes.CollapseContainer:
          this.metaData = new CollapseContainerMetaData(data);
          break;
        case WidgetTypes.ErrorContainer:
          this.metaData = new ErrorContainerMetadata(data);
          break;
        default:
          this.metaData = null;
          break;
      }
    } else {
      this.metaData = metaData;
    }
    this.isViewOnly = isViewOnly;
    this.validators = new Validators(validators || {});
    this.cols = cols;
    this.rows = rows;
    this.x = x;
    this.y = y;
    this.id = id;
    this.displayName = displayName;
    this.name = name;
    this.label = label;
    this.resourceType = resourceType;
    this.isPrePopulated = isPrePopulated;
    this.status = status;
    this.dataType = dataType;
    this.type = dataType;
    this.error = error;
    this.children = children || [];
    this.value = new Value(value || {});
    this.minItemCols = minItemCols;
    this.minItemRows = minItemRows;
    this.maxItemCols = maxItemCols;
    this.maxItemRows = maxItemRows;
  }
}
