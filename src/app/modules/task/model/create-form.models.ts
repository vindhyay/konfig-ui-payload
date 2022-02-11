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
  secondary = "secondary",
}

export enum ButtonVariants {
  raisedButton = "raisedButton",
  roundedButton = "roundedButton",
  raisedTextButton = "raisedTextButton",
  outlinedButton = "outlinedButton",
}

export enum PopulateConfigOptionTypes {
  onload = "onload",
  ontrigger = "ontrigger",
}

export enum ColumnTypes {
  Text = "Text",
  TextInput = "TextInput",
  TextArea = "TextArea",
  Number = "Number",
  DatePicker = "DatePicker",
  Data = "Data",
}

export enum ButtonActions {
  none = "none",
  logout = "logout",
  submit = "submit",
  save = "save",
  populate = "populate",
  serviceProviders = "serviceProviders",
  next = "next",
  previous = "previous",
  nextStep = "nextStep",
  previousStep = "previousStep",
}

export enum PayloadType {
  NEW_PAYLOAD = "NEW_PAYLOAD",
  OLD_PAYLOAD = "OLD_PAYLOAD",
}

export enum AlignTypes {
  TOP = "flex-start",
  BOTTOM = "flex-end",
  CENTER = "center",
  LEFT = "flex-start",
  MIDDLE = "center",
  RIGHT = "flex-end",
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
  BODY2 = "body2",
}

export enum ResourceType {
  PAYLOAD_FIELD = "payload-field",
}

export const PayloadTypes = {
  NEW_PAYLOAD: PayloadType.NEW_PAYLOAD,
  OLD_PAYLOAD: PayloadType.OLD_PAYLOAD,
};

export enum DATA_TYPES {
  STRING = "string",
  NUMBER = "number",
  BOOLEAN = "boolean",
  OBJECT = "object",
  ARRAY = "array",
}

export enum CELL_ALIGNMENTS_TYPES {
  LEFT = "left",
  RIGHT = "right",
  CENTER = "center",
}
export enum TABLE_OVERFLOW {
  PAGINATION = "pagination",
  SCROLL = "scroll",
}
export enum TABLE_PAGINATION_POSITIONS {
  TOP = "top",
  BOTTOM = "bottom",
}

export class TableActions {
  editRow: boolean;
  emitOnEdit: boolean;
  deleteRow: boolean;
  emitOnDelete: boolean;
  width: any;
  label: string;
  alignment: CELL_ALIGNMENTS_TYPES;
  constructor(data) {
    const {
      editRow = true,
      emitOnEdit = false,
      emitOnDelete = false,
      deleteRow = true,
      width = 100,
      label = "Actions",
      align = CELL_ALIGNMENTS_TYPES.LEFT,
    } = data;
    this.editRow = editRow;
    this.deleteRow = deleteRow;
    this.emitOnEdit = emitOnEdit;
    this.emitOnDelete = emitOnDelete;
    this.width = width;
    this.label = label;
    this.alignment = align;
  }
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
  AdvTable = "AdvTable",
  ErrorContainer = "ErrorContainer",
  TransactionTable = "SavedTable",
  CollapseContainer = "CollapseContainer",
  Button = "Button",
  Modal = "Modal",
  TextInput = "TextInput",
  PasswordInput = "PasswordInput",
  SSNInput = "SSNInput",
  Email = "Email",
  PhonenumberInput = "PhonenumberInput",
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
  Upload = "Upload",
  Divider = "Divider",
  Spacer = "Spacer",
  Icon = "Icon",
  Avatar = "Avatar",
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
      pattern = null,
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
  errorMessage: string;
  readOnly?: boolean;
  isEnable?: boolean;
  styleProperties: any;
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
      conditions,
      errorMessage = "",
      readOnly = false,
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
    this.errorMessage = errorMessage;
    this.readOnly = readOnly;
  }
}
export class SubColumn {
  columnId: string;
  populateResponsePath: string;
  name: string;
  constructor(data) {
    const { columnId, populateResponsePath, name } = data;
    this.columnId = columnId;
    this.populateResponsePath = populateResponsePath;
    this.name = name;
  }
}
export class TablePopulateConfig {
  populateConfigType: string;
  columns: Array<SubColumn>;
  parameters: Array<any>;
  populateTriggerId: string;
  populateResponsePath: string;
  datalistId: string;
  dataResourceId: string;
  resourceId: string;
  constructor(data) {
    const {
      populateConfigType = null,
      columns = [],
      parameters = [],
      populateTriggerId = null,
      populateResponsePath = null,
      datalistId = null,
      dataResourceId = null,
      resourceId = null,
    } = data;
    this.populateConfigType = populateConfigType;
    this.columns = columns;
    this.parameters = parameters;
    this.populateTriggerId = populateTriggerId;
    this.populateResponsePath = populateResponsePath;
    this.datalistId = datalistId;
    this.dataResourceId = dataResourceId;
    this.resourceId = resourceId;
  }
}

export class TableMetaData<T> extends MetaData {
  color: string;
  bgColor: string;
  heading: string;
  sort: boolean;
  filter: boolean;
  addRows: boolean;
  hideHeader: boolean;
  horizontalBorder: boolean;
  verticalBorder: boolean;
  tableBorder: boolean;
  borderColor: string;
  actions: TableActions;
  optionPopulateConfig: Array<TablePopulateConfig>;
  columns: Array<T>;
  overflow: TABLE_OVERFLOW;
  options: Array<any>;
  headerFontSize: string;
  headerCellPaddingTop: string;
  headerCellPaddingBottom: string;
  headerCellPaddingLeft: string;
  headerCellPaddingRight: string;
  headerCellBackgroundColor: string;
  paginatorBackgroundColor: string;
  bodyFontSize: string;
  bodyCellColor: string;
  bodyCellBgColor: string;

  pagination: boolean;
  paginatorPosition: TABLE_PAGINATION_POSITIONS;
  paginatorColor: string;
  paginatorBgColor: string;
  hideFooter: boolean;

  constructor(data) {
    super(data);
    const {
      heading = "",
      sort = false,
      filter = false,
      pagination = false,
      color = "#6a6a6a",
      bgColor = "#ededed",
      bodyCellBgColor = "#fff",
      optionsPopulateConfig = [],
      columns = [],
      addRows = true,
      hideHeader = false,
      horizontalBorder = true,
      verticalBorder = true,
      tableBorder = true,
      actions = {},
      overflow = TABLE_OVERFLOW.PAGINATION,
      paginatorPosition = TABLE_PAGINATION_POSITIONS.BOTTOM,
      paginatorBgColor = "#ededed",
      hideFooter = false,
      headerFontSize = "14px",
      headerCellPaddingTop = "11px",
      headerCellPaddingBottom = "11px",
      headerCellPaddingLeft = "11px",
      headerCellPaddingRight = "11px",
      headerCellBackgroundColor = "#f3f6f9",
      bodyFontSize = "14px",
      paginatorColor = "#6a6a6a",
      options = [],
      bodyCellColor = "#373f51",
      borderColor = "#cccccc",
    } = data;
    this.columns = columns;
    this.heading = heading;
    this.sort = sort;
    this.filter = filter;
    this.pagination = pagination;
    this.color = color;
    this.bgColor = bgColor;
    this.optionPopulateConfig = optionsPopulateConfig;
    this.addRows = addRows;
    this.hideHeader = hideHeader;
    this.horizontalBorder = horizontalBorder;
    this.verticalBorder = verticalBorder;
    this.tableBorder = tableBorder;
    this.borderColor = borderColor;

    this.actions = new TableActions(actions);
    this.overflow = overflow;

    this.pagination = paginatorPosition;
    this.paginatorPosition = paginatorPosition;
    this.paginatorBgColor = paginatorBgColor;
    this.paginatorColor = paginatorColor;

    this.bodyCellColor = bodyCellColor;
    this.bodyCellBgColor = bodyCellBgColor;
    this.options = options;
    this.hideFooter = hideFooter;
    this.headerFontSize = headerFontSize;
    this.headerCellPaddingTop = headerCellPaddingTop;
    this.headerCellPaddingBottom = headerCellPaddingBottom;
    this.headerCellPaddingLeft = headerCellPaddingLeft;
    this.headerCellPaddingRight = headerCellPaddingRight;
    this.headerCellBackgroundColor = headerCellBackgroundColor;
    this.bodyFontSize = bodyFontSize;
  }
}

export class SavedTransactionMetaData extends TableMetaData<SavedColumn> {
  statusIds: Array<string>;
  constructor(data) {
    super(data);
    const { statusIds = [] } = data;
    this.statusIds = statusIds;
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
      showDisplayField = false,
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
  onChangeConfigs?: Array<OnChangeTriggerConfig>;
  errorMessage: string;
  showErrorMessage: boolean;
  styleProperties: { id: "" };
  allowLabelWrapping: boolean;
  showFieldDependencyConfig: boolean;
  constructor(data) {
    super(data);
    const {
      placeholder = "Select",
      tooltip = "",
      optionLabel = "name",
      optionValue = "value",
      options = [],
      optionType = "manual",
      isLabelAndValue = false,
      optionPopulateConfig = [],
      onChangeConfig = {},
      errorMessage = "",
      showErrorMessage = true,
      styleProperties = {},
      allowLabelWrapping = false,
      showFieldDependencyConfig = false,
    } = data;
    this.placeholder = placeholder || "Select";
    this.optionType = optionType;
    this.optionLabel = optionLabel;
    this.optionValue = optionValue;
    this.tooltip = tooltip;
    this.options = options;
    this.isLabelAndValue = isLabelAndValue;
    this.optionPopulateConfig = optionPopulateConfig;
    this.onChangeConfig = new OnChangeTriggerConfig(onChangeConfig);
    this.onChangeConfigs = [new OnChangeTriggerConfig(onChangeConfig)];
    this.errorMessage = errorMessage;
    this.showErrorMessage = showErrorMessage;
    this.styleProperties = styleProperties;
    this.allowLabelWrapping = allowLabelWrapping;
    this.showFieldDependencyConfig = showFieldDependencyConfig;
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
  errorMessage: string;
  showErrorMessage: boolean;
  styleProperties: { id: ""; properties: any };
  adornmentBackgroundColor: string;
  allowLabelWrapping: boolean;
  showClearButton: boolean;
  prefixText: string;
  suffixText: string;
  constructor(data) {
    super(data);
    const {
      mask = "",
      icon = "",
      tooltip = "",
      placeholder = "",
      leftIcon = "",
      rightIcon = "",
      isFormulaField,
      formula,
      errorMessage = "",
      showErrorMessage = true,
      styleProperties = {},
      adornmentBackgroundColor = "#ffffff",
      allowLabelWrapping = false,
      showClearButton = false,
      prefixText = "",
      suffixText = "",
    } = data;
    this.mask = mask;
    this.icon = icon;
    this.tooltip = tooltip;
    this.placeholder = placeholder;
    this.leftIcon = leftIcon;
    this.rightIcon = rightIcon;
    this.isFormulaField = isFormulaField;
    this.formula = formula;
    this.errorMessage = errorMessage;
    this.showErrorMessage = showErrorMessage;
    this.styleProperties = styleProperties;
    this.adornmentBackgroundColor = adornmentBackgroundColor;
    this.allowLabelWrapping = allowLabelWrapping;
    this.showClearButton = showClearButton;
    this.prefixText = prefixText;
    this.suffixText = suffixText;
  }
}
export class PasswordInputMetaData extends MetaData {
  mask: string;
  icon: string;
  placeholder: string;
  tooltip: string;
  leftIcon: string;
  rightIcon: string;
  showIcon: string;
  hideIcon: string;
  isFormulaField: boolean;
  formula = [];
  rules: {
    oneLowerCase: boolean;
    oneUpperCase: boolean;
    oneNumber: boolean;
    oneSpecialchar: boolean;
    minLength: number;
  };
  errorMessage: string;
  showErrorMessage: boolean;
  styleProperties: { id: ""; properties: any };
  adornmentBackgroundColor: string;
  allowLabelWrapping: boolean;
  showClearButton: boolean;
  prefixText: string;
  suffixText: string;
  constructor(data) {
    super(data);
    const {
      mask = "",
      icon = "",
      tooltip = "",
      placeholder = "********",
      leftIcon = "",
      rightIcon = "",
      showIcon = "pi pi-eye",
      hideIcon = "pi pi-eye-slash",
      isFormulaField,
      formula,
      rules = {
        oneLowerCase: true,
        oneUpperCase: true,
        oneNumber: true,
        oneSpecialchar: true,
        minLength: 8,
      },
      errorMessage = "",
      showErrorMessage = true,
      styleProperties = {},
      adornmentBackgroundColor = "#ffffff",
      allowLabelWrapping = false,
      showClearButton = false,
      prefixText = "",
      suffixText = "",
    } = data;
    this.mask = mask;
    this.icon = icon;
    this.tooltip = tooltip;
    this.placeholder = placeholder;
    this.leftIcon = leftIcon;
    this.rightIcon = rightIcon;
    this.showIcon = showIcon;
    this.hideIcon = hideIcon;
    this.isFormulaField = isFormulaField;
    this.formula = formula;
    this.rules = rules;
    this.errorMessage = errorMessage;
    this.showErrorMessage = showErrorMessage;
    this.styleProperties = styleProperties;
    this.adornmentBackgroundColor = adornmentBackgroundColor;
    this.allowLabelWrapping = allowLabelWrapping;
    this.showClearButton = showClearButton;
    this.prefixText = prefixText;
    this.suffixText = suffixText;
  }
}

export class TabContainerMetaData extends MetaData {
  suffixIcon?: string;
  constructor(data) {
    super(data);
    const { suffixIcon } = data;
    this.suffixIcon = suffixIcon;
  }
}

export class StepperContainerMetaData extends MetaData {
  sublabel: string;
  stepperType: string;
  isReviewer: boolean;
  isFreeflow: boolean;
  showHeader: boolean;
  indicatorPattern: string;
  color: string;
  currentStepColor: string;
  completedStepColor: string;
  fontWeight: string;
  textStyle: string;
  fontStyle: string;
  textDecortation: string;
  completedBarColor: string;
  defaultBarColor: string;
  buttonContainer: any;
  footerBgColor: string;
  leftPanelBgColor: string;
  conentBgColor: string;
  headerContent: any;
  headerHeight: number;
  stepperHeight?: any;
  constructor(data) {
    super(data);
    const {
      sublabel = "",
      stepperType = "Vertical",
      isReviewer = false,
      isFreeflow = false,
      indicatorPattern = "circle",
      textStyle = TextStyles.BODY1,
      color = "#898585",
      currentStepColor = "#000000",
      completedStepColor = "#898585",
      defaultBarColor = "",
      fontStyle = "",
      textDecortation = "",
      completedBarColor = "",
      fontWeight = 400,
      buttonContainer = {},
      footerBgColor = "#fff",
      leftPanelBgColor = "#fff",
      conentBgColor = "#fff",
      showHeader = false,
      headerContent = [],
      headerHeight = 0,
    } = data;
    this.sublabel = sublabel;
    this.stepperType = stepperType;
    this.isReviewer = isReviewer;
    this.isFreeflow = isFreeflow;
    this.indicatorPattern = indicatorPattern;
    this.textStyle = textStyle;
    this.color = color;
    this.fontWeight = fontWeight;
    this.currentStepColor = currentStepColor;
    this.completedStepColor = completedStepColor;
    this.textDecortation = textDecortation;
    this.fontStyle = fontStyle;
    this.defaultBarColor = defaultBarColor;
    this.completedBarColor = completedBarColor;
    this.buttonContainer = buttonContainer;
    this.footerBgColor = footerBgColor;
    this.leftPanelBgColor = leftPanelBgColor;
    this.conentBgColor = conentBgColor;
    this.showHeader = showHeader;
    this.headerContent = headerContent;
    this.headerHeight = headerHeight;
  }
}
export class SSNInputMetaData extends MetaData {
  mask: string;
  hideMask: string;
  showMask: string;
  icon: string;
  placeholder: string;
  tooltip: string;
  leftIcon: string;
  rightIcon: string;
  showIcon: string;
  hideIcon: string;
  isFormulaField: boolean;
  formula = [];
  selectedInput: string;
  patterns: any;
  errorMessage: string;
  showErrorMessage: boolean;
  styleProperties: { id: "" };
  adornmentBackgroundColor: string;
  allowLabelWrapping: boolean;
  showClearButton: boolean;
  prefixText: string;
  suffixText: string;
  constructor(data) {
    super(data);
    const {
      mask = "XXX-XX-0000",
      hideMask = "XXX-XX-0000",
      showMask = "000-00-0000",
      icon = "",
      tooltip = "",
      placeholder = "***-**-****",
      leftIcon = "",
      rightIcon = "",
      showIcon = "pi pi-eye-slash",
      hideIcon = "pi pi-eye",
      isFormulaField,
      formula,
      selectedInput = "SSN",
      patterns = {
        SSN: "^(?!\\b(\\d)\\1+-(\\d)\\1+-(\\d)\\1+\\b)(?!123-45-6789|219-09-9999|078-05-1120)(?!666|000|9\\d{2})\\d{3}-(?!00)\\d{2}-(?!0{4})\\d{4}$",
        ITIN: "^(9\\d{2})-([7]\\d|8[0-8])-(\\d{4})$",
      },
      errorMessage = "",
      showErrorMessage = true,
      styleProperties = {},
      adornmentBackgroundColor = "#ffffff",
      allowLabelWrapping = false,
      showClearButton = false,
      prefixText = "",
      suffixText = "",
    } = data;
    this.mask = mask;
    this.icon = icon;
    this.tooltip = tooltip;
    this.placeholder = placeholder;
    this.leftIcon = leftIcon;
    this.rightIcon = rightIcon;
    this.showIcon = showIcon;
    this.hideIcon = hideIcon;
    this.isFormulaField = isFormulaField;
    this.formula = formula;
    this.selectedInput = selectedInput;
    this.patterns = patterns;
    this.showMask = showMask;
    this.hideMask = hideMask;
    this.errorMessage = errorMessage;
    this.showErrorMessage = showErrorMessage;
    this.styleProperties = styleProperties;
    this.adornmentBackgroundColor = adornmentBackgroundColor;
    this.allowLabelWrapping = allowLabelWrapping;
    this.showClearButton = showClearButton;
    this.prefixText = prefixText;
    this.suffixText = suffixText;
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
  errorMessage: string;
  showErrorMessage: boolean;
  adornmentBackgroundColor: string;
  allowLabelWrapping: boolean;
  showClearButton: boolean;
  prefixText: string;
  suffixText: string;
  styleProperties: { id: ""; properties: any };
  constructor(data) {
    super(data);
    const {
      mask = "",
      icon = "",
      tooltip = "",
      placeholder = "example@domain.com",
      leftIcon = "",
      rightIcon = "",
      isFormulaField,
      formula,
      errorMessage = "",
      showErrorMessage = true,
      styleProperties = {},
      adornmentBackgroundColor = "#ffffff",
      allowLabelWrapping = false,
      showClearButton = false,
      prefixText = "",
      suffixText = "",
    } = data;
    this.mask = mask;
    this.icon = icon;
    this.tooltip = tooltip;
    this.placeholder = placeholder;
    this.leftIcon = leftIcon;
    this.rightIcon = rightIcon;
    this.isFormulaField = isFormulaField;
    this.formula = formula;
    this.errorMessage = errorMessage;
    this.showErrorMessage = showErrorMessage;
    this.styleProperties = styleProperties;
    this.adornmentBackgroundColor = adornmentBackgroundColor;
    this.allowLabelWrapping = allowLabelWrapping;
    this.showClearButton = showClearButton;
    this.prefixText = prefixText;
    this.suffixText = suffixText;
  }
}

export class PhonenumberInputMetaData extends MetaData {
  mask: string;
  icon: string;
  placeholder: string;
  tooltip: string;
  leftIcon: string;
  rightIcon: string;
  isFormulaField: boolean;
  formula = [];
  errorMessage: string;
  showErrorMessage: boolean;
  styleProperties: { id: ""; properties: any };
  adornmentBackgroundColor: string;
  allowLabelWrapping: boolean;
  showClearButton: boolean;
  prefixText: string;
  suffixText: string;
  constructor(data) {
    super(data);
    const {
      mask = "000-000-0000",
      icon = "",
      tooltip = "",
      placeholder = "000-000-0000",
      leftIcon = "",
      rightIcon = "",
      isFormulaField,
      formula,
      errorMessage = "",
      showErrorMessage = true,
      styleProperties = {},
      adornmentBackgroundColor = "#ffffff",
      allowLabelWrapping = false,
      showClearButton = false,
      prefixText = "",
      suffixText = "",
    } = data;
    this.mask = mask;
    this.icon = icon;
    this.tooltip = tooltip;
    this.placeholder = placeholder;
    this.leftIcon = leftIcon;
    this.rightIcon = rightIcon;
    this.isFormulaField = isFormulaField;
    this.formula = formula;
    this.errorMessage = errorMessage;
    this.showErrorMessage = showErrorMessage;
    this.styleProperties = styleProperties;
    this.adornmentBackgroundColor = adornmentBackgroundColor;
    this.allowLabelWrapping = allowLabelWrapping;
    this.showClearButton = showClearButton;
    this.prefixText = prefixText;
    this.suffixText = suffixText;
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
      clickAction = ButtonActions.none,
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
  showTime: boolean;
  hourFormat: number;
  stepHour: number;
  stepMinute: number;
  constructor(data) {
    super(data);
    const {
      viewDateFormat = "mm/dd/yy",
      returnDateFormat = "isoTimestamp",
      tooltip = "",
      placeholder = "",
      showTime = false,
      hourFormat = 24,
      stepHour = 1,
      stepMinute = 1,
    } = data;
    this.viewDateFormat = viewDateFormat;
    this.returnDateFormat = returnDateFormat;
    this.tooltip = tooltip;
    this.placeholder = placeholder;
    this.showTime = showTime;
    this.hourFormat = hourFormat;
    this.stepHour = stepHour;
    this.stepMinute = stepMinute;
  }
}

export class NumberMetaData extends MetaData {
  prefix: string;
  suffix: string;
  mode: string;
  currency: string;
  minFractionDigits: number;
  maxFractionDigits: number;
  placeholder: string;
  tooltip: string;
  isFormulaField: boolean;
  formula = [];
  errorMessage: string;
  showErrorMessage: boolean;
  showStepperButtons: boolean;
  step: number;
  styleProperties: { id: ""; properties: any };
  allowLabelWrapping: false;
  showClearButton: false;
  adornmentBackgroundColor: "#ffffff";
  prefixText: "";
  suffixText: "";
  thousandsSeparator: boolean;
  constructor(data) {
    super(data);
    const {
      prefix = "",
      suffix = "",
      mode,
      currency,
      minFractionDigits,
      maxFractionDigits,
      tooltip = "",
      placeholder = "",
      isFormulaField,
      formula,
      errorMessage = "",
      showErrorMessage = true,
      showStepperButtons = false,
      step = 1,
      styleProperties = {},
      allowLabelWrapping = false,
      showClearButton = false,
      adornmentBackgroundColor = "#ffffff",
      prefixText = "",
      suffixText = "",
      thousandsSeparator = false
    } = data;
    this.prefix = prefix;
    this.suffix = suffix;
    this.mode = mode;
    this.currency = currency;
    this.minFractionDigits = minFractionDigits;
    this.maxFractionDigits = maxFractionDigits;
    this.tooltip = tooltip;
    this.placeholder = placeholder;
    this.isFormulaField = isFormulaField;
    this.formula = formula;
    this.errorMessage = errorMessage;
    this.showErrorMessage = showErrorMessage;
    this.showStepperButtons = showStepperButtons;
    this.step = step;
    this.styleProperties = styleProperties;
    this.allowLabelWrapping = allowLabelWrapping;
    this.showClearButton = showClearButton;
    this.adornmentBackgroundColor = adornmentBackgroundColor;
    this.prefixText = prefixText;
    this.suffixText = suffixText;
    this.thousandsSeparator = thousandsSeparator;
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
      fontWeight = 400,
    } = data;
    this.color = color;
    this.fontWeight = fontWeight;
    this._value = _value;
    this.textStyle = textStyle;
    this.horizontalAlign = horizontalAlign;
    this.verticalAlign = verticalAlign;
  }
}

export enum ContainerActions {
  none = "none",
  previous = "previous",
  next = "next",
  externalLink = "externalLink",
}

export class ContainerMetaData extends MetaData {
  title: string;
  icon: string;
  header: ContainerHeader;
  onClickConfigs: Array<OnChangeTriggerConfig>;
  externalLink: string;
  styleProperties: { id: ""; properties: any };
  isFooterContainer: boolean;
  constructor(data) {
    super(data);
    const {
      title = "",
      icon = "",
      styleProperties = {},
      onClickConfig = {},
      externalLink = "",
      header = {},
      isFooterContainer = false,
    } = data;
    this.title = title;
    this.icon = icon;
    this.styleProperties = styleProperties;
    this.onClickConfigs = [new OnChangeTriggerConfig(onClickConfig)];
    this.externalLink = externalLink;
    this.header = new ContainerHeader(header);
    this.isFooterContainer = isFooterContainer;
  }
}

export class ErrorContainerMetadata extends ContainerMetaData {
  constructor(data) {
    super(data);
  }
}

export class CollapseContainerMetaData extends ContainerMetaData {
  color: string;
  bgColor: string;
  header: ContainerHeader;
  constructor(data) {
    super(data);
    const { color = "#000000", bgColor = "#ffffff", header = {} } = data;
    this.color = color;
    this.bgColor = bgColor;
    this.header = new ContainerHeader(header);
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
  alignOptions: string;
  columns: number;
  allowLabelWrapping: boolean;
  showFieldDependencyConfig: boolean;
  constructor(data) {
    super(data);
    const {
      tooltip = "",
      options = [],
      optionType = "manual",
      optionLabel = "name",
      optionValue = "value",
      isLabelAndValue = false,
      dataResourceId = null,
      datalistId = null,
      alignOptions = "Horizontal",
      columns = 1,
      allowLabelWrapping = false,
      showFieldDependencyConfig = false,
    } = data;
    this.optionType = optionType;
    this.tooltip = tooltip;
    this.options = options;
    this.isLabelAndValue = isLabelAndValue;
    this.optionLabel = optionLabel;
    this.optionValue = optionValue;
    this.datalistId = datalistId;
    this.dataResourceId = dataResourceId;
    this.alignOptions = alignOptions;
    this.columns = columns;
    this.allowLabelWrapping = allowLabelWrapping;
    this.showFieldDependencyConfig = showFieldDependencyConfig;
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
  columns: number;
  allowLabelWrapping: boolean;
  showErrorMessage: boolean;
  errorMessage: string;
  showFieldDependencyConfig: boolean;
  constructor(data) {
    super(data);
    const {
      tooltip = "",
      options = [],
      optionType = "manual",
      optionLabel = "name",
      optionValue = "value",
      isLabelAndValue = false,
      alignOptions = "Vertical",
      columns = 1,
      allowLabelWrapping = false,
      showErrorMessage = true,
      errorMessage = "",
      showFieldDependencyConfig = false,
    } = data;
    this.optionType = optionType;
    this.tooltip = tooltip;
    this.options = options;
    this.isLabelAndValue = isLabelAndValue;
    this.optionLabel = optionLabel;
    this.optionValue = optionValue;
    this.alignOptions = alignOptions;
    this.columns = columns;
    this.allowLabelWrapping = allowLabelWrapping;
    this.showErrorMessage = showErrorMessage;
    this.errorMessage = errorMessage;
    this.showFieldDependencyConfig = showFieldDependencyConfig;
  }
}

export class ImageMetaData extends MetaData {
  url: string;
  altText: string;
  source: string; // 'Local' or 'Remote'
  remoteKey: string;
  position: string; // 'Cover' or 'Contain'
  horizontalAlign: string;
  shorterEdge: string;
  styleProperties: { id: ""; properties: any };
  constructor(data) {
    super(data);
    const {
      url = "",
      altText = "",
      source = "Local",
      remoteKey = "",
      position = "Contain",
      horizontalAlign = "Center",
      shorterEdge = "height",
      styleProperties = {},
    } = data;
    this.url = url;
    this.altText = altText;
    this.source = source;
    this.remoteKey = remoteKey;
    this.position = position;
    this.horizontalAlign = horizontalAlign;
    this.shorterEdge = shorterEdge;
    this.styleProperties = styleProperties;
  }
}

export class AvatarMetaData extends MetaData {
  caption: string;
  styleProperties: { id: ""; properties: any };
  source: string;
  remoteKey: string;
  tooltip: string;
  imageUrl: string;
  fallbackText: string;
  configureLoginData: boolean;
  constructor(data) {
    super(data);
    const {
      caption = "avatar caption",
      styleProperties = {},
      source = "",
      remoteKey = "",
      tooltip = "",
      imageUrl = "",
      fallbackText = "Admin",
      configureLoginData = false,
    } = data;
    this.caption = caption;
    this.styleProperties = styleProperties;
    this.source = source;
    this.remoteKey = remoteKey;
    this.tooltip = tooltip;
    this.imageUrl = imageUrl;
    this.fallbackText = fallbackText;
    this.configureLoginData = configureLoginData;
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

export class ContainerHeader {
  fontSize: string;
  height: string;
  color: string;
  bgColor: string;
  icon: string;
  constructor(data) {
    const { fontSize = "12", height = "40", color = "#808080", bgColor = "#D3D3D3", icon = "" } = data;
    this.fontSize = fontSize;
    this.height = height;
    this.color = color;
    this.bgColor = bgColor;
    this.icon = icon;
  }
}

export class ModalMetaData extends MetaData {
  title: string;
  icon: string;
  height: string;
  width: string;
  color: string;
  bgColor: string;
  footerbgColor: string;
  button: ContainerHeader;
  iconPos: string;
  type: ButtonTypes;
  variant: ButtonVariants;
  textStyle: string;
  fontStyle: string;
  textDecortation: string;
  fontWeight: number;
  footerContent: any;
  footerHeight: number;
  modalHeader: any;
  modalType: string;
  buttonContainer: any;
  styleProperties: { id: "" };
  constructor(data) {
    super(data);
    const {
      title = "",
      icon = "",
      height = "400px",
      width = "500px",
      color = "#000000",
      bgColor = "#ffffff",
      button = {},
      iconPos = "left",
      type = ButtonTypes.primary,
      variant = ButtonVariants.raisedButton,
      textStyle = TextStyles.BODY1,
      fontStyle = "",
      textDecortation = "",
      fontWeight = 400,
      footerbgColor = "#ffffff",
      footerContent = [],
      footerHeight = 50,
      modalHeader = [],
      buttonContainer = {},
      modalType = "SinglePage",
      styleProperties = {},
    } = data;
    this.title = title;
    this.icon = icon;
    this.height = height;
    this.width = width;
    this.color = color;
    this.bgColor = bgColor;
    this.button = new ContainerHeader(button);
    this.iconPos = iconPos;
    this.type = type;
    this.variant = variant;
    this.fontStyle = fontStyle;
    this.textStyle = textStyle;
    this.textDecortation = textDecortation;
    this.fontWeight = fontWeight;
    this.footerbgColor = footerbgColor;
    this.footerContent = footerContent;
    this.footerHeight = footerHeight;
    this.modalHeader = modalHeader;
    this.modalType = modalType;
    this.buttonContainer = buttonContainer;
    this.styleProperties = styleProperties;
  }
}

export class DividerMetaData extends MetaData {
  align: string;
  layout: string;
  type: string;
  text: string;
  textColor: string;
  borderColor: string;
  borderStyle: string;
  fontFamily: string;
  fontSize: string;
  constructor(data) {
    super(data);
    const {
      align = "center",
      layout = "horizontal",
      type = "dotted",
      text = "",
      textColor = "black",
      borderColor = "#d1d1d1",
      borderStyle = "solid",
      fontFamily = "Helvetica",
      fontSize = "1em",
    } = data;
    this.align = align;
    this.layout = layout;
    this.type = type;
    this.text = text;
    this.textColor = textColor;
    this.borderColor = borderColor;
    this.borderStyle = borderStyle;
    this.fontFamily = fontFamily;
    this.fontSize = fontSize;
  }
}

export class SpacerMetaData extends MetaData {
  constructor(data) {
    super(data);
  }
}

export class IconMetaData extends MetaData {
  iconType: string;
  color: string;
  fontSize: string;
  horizontalPosition: string;
  verticalPosition: string;
  constructor(data) {
    super(data);
    const {
      iconType = "logout",
      color = "black",
      fontSize = "20px",
      horizontalPosition = "center",
      verticalPosition = "center",
    } = data;
    this.iconType = iconType;
    this.color = color;
    this.fontSize = fontSize;
    this.horizontalPosition = horizontalPosition;
    this.verticalPosition = verticalPosition;
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
  width?: any;

  hideRows: number;
  defaultRows: number;
  defaultMinItemRows: number;
  defaultMinItemCols: number;

  isViewOnly: boolean;
  metaData:
    | TextMetaData
    | PasswordInputMetaData
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
    | TableMetaData<Column>
    | UploadMetaData
    | CollapseContainerMetaData
    | ErrorContainerMetadata
    | PhonenumberInputMetaData
    | SSNInputMetaData
    | StepperContainerMetaData
    | DividerMetaData
    | SpacerMetaData
    | AvatarMetaData;
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
  errorMessage?: string;
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
      maxItemRows,
      width = 100,
    } = data;
    if (!metaData) {
      switch (widgetType) {
        case WidgetTypes.Text:
          this.metaData = new TextMetaData(data);
          break;
        case WidgetTypes.Container:
          this.metaData = new ContainerMetaData(data);
          break;
        case WidgetTypes.StepperContainer:
          this.metaData = new StepperContainerMetaData(data);
          break;
        case WidgetTypes.TextInput:
          this.metaData = new TextInputMetaData(data);
          break;
        case WidgetTypes.PasswordInput:
          this.metaData = new PasswordInputMetaData(data);
          break;
        case WidgetTypes.SSNInput:
          this.metaData = new SSNInputMetaData(data);
          break;
        case WidgetTypes.Email:
          this.metaData = new EmailMetaData(data);
          break;
        case widgetType.PhonenumberInput:
          this.metaData = new PhonenumberInputMetaData(data);
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
        case WidgetTypes.Divider:
          this.metaData = new DividerMetaData(data);
          break;
        case WidgetTypes.Spacer:
          this.metaData = new SpacerMetaData(data);
          break;
        case WidgetTypes.Icon:
          this.metaData = new IconMetaData(data);
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
    this.width = width;
  }
}
export class Column extends BaseWidget {
  type: DATA_TYPES;
  colType: WidgetTypes;
  columnId: string;
  name: string;
  populateResponsePath: string;
  alignment: CELL_ALIGNMENTS_TYPES;
  constructor(data) {
    super(data);
    const {
      type = DATA_TYPES.STRING,
      colType = WidgetTypes.TextInput,
      label = "",
      name = "",
      populateResponsePath = "",
      columnId = "",
      children = [],
      alignment = CELL_ALIGNMENTS_TYPES.LEFT,
    } = data;
    this.alignment = alignment;
    this.children = children || [];
    this.colType = colType;
    this.type = type;
    this.label = label;
    this.columnId = columnId || getUniqueId("column");
    this.name = name;
    this.displayName = this.columnId;
    this.populateResponsePath = populateResponsePath;
  }
}
