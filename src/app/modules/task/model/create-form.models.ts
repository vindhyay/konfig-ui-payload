import { IIcon } from "finlevit-library/lib/types/types";
import { getUniqueId } from "../../../utils";

export class BaseStyle {
  id: string;
  name: string;
  status: boolean;
  widgetType: string;
  defaultWidget: boolean;
  groupId?: string;
  properties: { [x: string]: string };
  constructor(data) {
    const { id = null, name = "", status, widgetType, defaultWidget, properties, groupId = "" } = data;
    this.id = id;
    this.widgetType = widgetType;
    this.name = name;
    this.status = status;
    this.groupId = groupId;
    this.defaultWidget = defaultWidget;
    this.properties = properties;
  }
}

export const MIN_COLUMNS = 100;
export const MIN_ROWS = 50;
export enum OfficeTypes {
  BackOffice = "BACK_OFFICE",
  FrontOffice = "FRONT_OFFICE",
}

export enum LabelPos {
  Left = "Left",
  Top = "Top",
  Down = "Down",
  Right = "Right",
}

export enum IconTypes {
  PRIMENG = "pi",
  MATERIAL_ICONS_OUTLINED = "material-icons-outlined",
  MATERIAL_ICONS_FILLED = "material-icons",
  MATERIAL_ICONS_ROUND = "material-icons-round",
  MATERIAL_ICONS_TWO_TONE = "material-icons-two-tone",
  MATERIAL_ICONS_SHARP = "material-icons-sharp",
}
export enum RowActionConfigOptionTypes {
  getById = "getById",
  getAll = "getAll",
  delete = "delete",
  update = "update",
}

export enum ButtonActions {
  none = "none",
  logout = "logout",
  submit = "submit",
  save = "save",
  next = "next",
  previous = "previous",
  nextStep = "nextStep",
  previousStep = "previousStep",
  resetFields = "resetFields",
  closeModals = "closeModals",
  openModals = "openModals",
  externalLink = "externalLink",
}

export const UI_ACTIONS = [
  ButtonActions.logout,
  ButtonActions.nextStep,
  ButtonActions.previousStep,
  ButtonActions.openModals,
  ButtonActions.closeModals,
  ButtonActions.externalLink,
];

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

export enum DATA_TYPES {
  STRING = "string",
  NUMBER = "number",
  BOOLEAN = "boolean",
  OBJECT = "object",
  FILE = "file",
  ARRAY = "array",
  DATE = "date",
}
export enum WidgetTypes {
  Text = "Text",
  URL = "URL",
  Table = "Table",
  AdvTable = "AdvTable",
  SavedTable = "SavedTable",
  Button = "Button",
  MultiPageModal = "MultiPageModal",
  Modal = "Modal",
  CollapseContainer = "CollapseContainer",
  TextInput = "TextInput",
  PasswordInput = "PasswordInput",
  Email = "Email",
  PhonenumberInput = "PhonenumberInput",
  SSNInput = "SSNInput",
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
  None = "None",
  Avatar = "Avatar",
  Address = "Address",
}

export class Validators {
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
export class MetaData {
  widgetType: WidgetTypes;
  isHidden: boolean;
  movement: "UP" | "DOWN" | null;
  defaultRows: number;
  defaultMinItemRows: number;
  readOnly: boolean;
  workflowTrigger: boolean;
  alignment?: CELL_ALIGNMENTS_TYPES;
  errorMessage: string;
  linkedWidgetIds: any;
  stylePropertiesId: string;
  widgetEvent: string[];
  hideRows: number;
  isAddressField: boolean;
  ruleIds?: any;
  constructor(data) {
    const {
      widgetType,
      isHidden = false,
      isAddressField = false,
      movement = null,
      defaultRows,
      defaultMinItemRows,
      readOnly = false,
      workflowTrigger = false,
      alignment = CELL_ALIGNMENTS_TYPES.LEFT,
      errorMessage = "",
      linkedWidgetIds = {},
      widgetEvent = [],
      hideRows,
      ruleIds = [],
      stylePropertiesId,
    } = data;
    this.ruleIds = ruleIds;
    this.stylePropertiesId = stylePropertiesId;
    this.hideRows = hideRows;
    this.widgetType = widgetType;
    this.isHidden = isHidden;
    this.movement = movement;
    this.defaultMinItemRows = defaultMinItemRows;
    this.readOnly = readOnly;
    this.defaultRows = defaultRows;
    this.workflowTrigger = workflowTrigger;
    this.alignment = alignment;
    this.errorMessage = errorMessage;
    this.linkedWidgetIds = linkedWidgetIds;
    this.widgetEvent = widgetEvent;
    this.isAddressField = isAddressField;
  }
}

export class TextInputMetaData extends MetaData {
  mask: string;
  placeholder: string;
  tooltip: string;
  leftIcon: IIcon;
  rightIcon: IIcon;
  errorMessage: string;
  showErrorMessage: boolean;

  allowLabelWrapping: boolean;
  showClearButton: boolean;
  prefixText: string;
  suffixText: string;
  constructor(data) {
    super(data);
    const {
      mask = "",
      tooltip = "",
      placeholder = "",
      leftIcon = "",
      rightIcon = "",
      errorMessage = "",
      showErrorMessage = true,
      allowLabelWrapping = false,
      showClearButton = false,
      prefixText = "",
      suffixText = "",
    } = data;
    this.mask = mask;
    this.tooltip = tooltip;
    this.placeholder = placeholder;
    this.leftIcon = leftIcon;
    this.rightIcon = rightIcon;
    this.errorMessage = errorMessage;
    this.showErrorMessage = showErrorMessage;

    this.allowLabelWrapping = allowLabelWrapping;
    this.showClearButton = showClearButton;
    this.prefixText = prefixText;
    this.suffixText = suffixText;
  }
}
export class PasswordInputMetaData extends MetaData {
  mask: string;
  placeholder: string;
  tooltip: string;
  leftIcon: IIcon;
  rightIcon: IIcon;
  showIcon: IIcon;
  hideIcon: IIcon;
  rules: {
    oneLowerCase: boolean;
    oneUpperCase: boolean;
    oneNumber: boolean;
    oneSpecialchar: boolean;
    minLength: number;
  };
  errorMessage: string;
  showErrorMessage: boolean;

  allowLabelWrapping: boolean;
  showClearButton: boolean;
  prefixText: string;
  suffixText: string;
  constructor(data) {
    super(data);
    const {
      mask = "",
      tooltip = "",
      placeholder = "********",
      leftIcon = "",
      rightIcon = "",
      showIcon = { name: "visibility", value: "visibility", type: IconTypes.MATERIAL_ICONS_FILLED },
      hideIcon = { name: "visibility", value: "visibility_off", type: IconTypes.MATERIAL_ICONS_FILLED },
      rules = {
        oneLowerCase: true,
        oneUpperCase: true,
        oneNumber: true,
        oneSpecialchar: true,
        minLength: 8,
      },
      errorMessage = "",
      showErrorMessage = true,

      allowLabelWrapping = false,
      showClearButton = false,
      prefixText = "",
      suffixText = "",
    } = data;
    this.mask = mask;
    this.tooltip = tooltip;
    this.placeholder = placeholder;
    this.leftIcon = leftIcon;
    this.rightIcon = rightIcon;
    this.showIcon = showIcon;
    this.hideIcon = hideIcon;
    this.rules = rules;
    this.errorMessage = errorMessage;
    this.showErrorMessage = showErrorMessage;

    this.allowLabelWrapping = allowLabelWrapping;
    this.showClearButton = showClearButton;
    this.prefixText = prefixText;
    this.suffixText = suffixText;
  }
}
export class EmailMetaData extends MetaData {
  mask: string;
  placeholder: string;
  tooltip: string;
  leftIcon: IIcon;
  rightIcon: IIcon;
  errorMessage: string;
  showErrorMessage: boolean;
  allowLabelWrapping: boolean;
  showClearButton: boolean;
  prefixText: string;
  suffixText: string;

  constructor(data) {
    super(data);
    const {
      mask = "",
      tooltip = "",
      placeholder = "example@domain.com",
      leftIcon = "",
      rightIcon = "",
      errorMessage = "",
      showErrorMessage = true,

      allowLabelWrapping = false,
      showClearButton = false,
      prefixText = "",
      suffixText = "",
    } = data;
    this.mask = mask;
    this.tooltip = tooltip;
    this.placeholder = placeholder;
    this.leftIcon = leftIcon;
    this.rightIcon = rightIcon;
    this.errorMessage = errorMessage;
    this.showErrorMessage = showErrorMessage;

    this.allowLabelWrapping = allowLabelWrapping;
    this.showClearButton = showClearButton;
    this.prefixText = prefixText;
    this.suffixText = suffixText;
  }
}

export class PhoneNumberMetaData extends MetaData {
  mask: string;
  placeholder: string;
  tooltip: string;
  leftIcon: IIcon;
  rightIcon: IIcon;
  errorMessage: string;
  showErrorMessage: boolean;

  allowLabelWrapping: boolean;
  showClearButton: boolean;
  prefixText: string;
  suffixText: string;
  constructor(data) {
    super(data);
    const {
      mask = "000-000-0000",
      tooltip = "",
      placeholder = "000-000-0000",
      leftIcon = "",
      rightIcon = "",
      errorMessage = "",
      showErrorMessage = true,

      allowLabelWrapping = false,
      showClearButton = false,
      prefixText = "",
      suffixText = "",
    } = data;
    this.mask = mask;
    this.tooltip = tooltip;
    this.placeholder = placeholder;
    this.leftIcon = leftIcon;
    this.rightIcon = rightIcon;
    this.errorMessage = errorMessage;
    this.showErrorMessage = showErrorMessage;

    this.allowLabelWrapping = allowLabelWrapping;
    this.showClearButton = showClearButton;
    this.prefixText = prefixText;
    this.suffixText = suffixText;
  }
}
export class SSNInputMetaData extends MetaData {
  mask: string;
  hideMask: string;
  showMask: string;
  icon: string;
  placeholder: string;
  tooltip: string;
  leftIcon: IIcon;
  rightIcon: IIcon;
  showIcon: IIcon;
  hideIcon: IIcon;
  selectedInput: string;
  patterns: any;
  errorMessage: string;
  showErrorMessage: boolean;

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
      showIcon = { name: "visibility", value: "visibility", type: IconTypes.MATERIAL_ICONS_FILLED },
      hideIcon = { name: "visibility", value: "visibility_off", type: IconTypes.MATERIAL_ICONS_FILLED },
      selectedInput = "SSN",
      patterns = {
        SSN: "^(?!000|666)[0-9]{3}([ -]?)(?!00)[0-9]{2}\\1(?!0000)[0-9]{4}$",
        ITIN: "^(9\\d{2})([ -]?)([7]\\d|8[0-8]|6[0-5]|[5]\\d|9[4-9]|9[0-2])([ -]?)(\\d{4})$",
      },
      errorMessage = "",
      showErrorMessage = true,

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
    this.selectedInput = selectedInput;
    this.patterns = patterns;
    this.showMask = showMask;
    this.hideMask = hideMask;
    this.errorMessage = errorMessage;
    this.showErrorMessage = showErrorMessage;

    this.allowLabelWrapping = allowLabelWrapping;
    this.showClearButton = showClearButton;
    this.prefixText = prefixText;
    this.suffixText = suffixText;
  }
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

export class ConfigColumns {
  columnId: string;
  populateResponsePath: string;
  name: string;
  isUnique?: boolean;
  constructor(data) {
    const { columnId, populateResponsePath, name, isUnique = false } = data;
    this.columnId = columnId;
    this.populateResponsePath = populateResponsePath;
    this.name = name;
    this.isUnique = isUnique;
  }
}

export class TablePopulateConfig {
  name: string;
  populateConfigType: string;
  columns: Array<ConfigColumns>;
  parameters: Array<any>;
  populateTriggerId: string;
  populateResponsePath: string;
  datalistId: string;
  dataResourceId: string;
  resourceId: string;
  configId: string;
  constructor(data) {
    const {
      name = "",
      populateConfigType = null,
      columns = [],
      parameters = [],
      populateTriggerId = null,
      populateResponsePath = null,
      datalistId = null,
      dataResourceId = null,
      resourceId = null,
      configId = getUniqueId("config"),
    } = data;
    this.name = name;
    this.populateConfigType = populateConfigType;
    this.columns = columns;
    this.parameters = parameters;
    this.populateTriggerId = populateTriggerId;
    this.populateResponsePath = populateResponsePath;
    this.datalistId = datalistId;
    this.dataResourceId = dataResourceId;
    this.resourceId = resourceId;
    this.configId = configId;
  }
}

export class TableRowActionConfig {
  name: string;
  columns: Array<ConfigColumns>;
  datalistId: string;
  dataResourceId: string;
  mappingId: string;
  resourceId: string;
  operationId: string;
  configType: RowActionConfigOptionTypes;
  parameters: ParamConfigs[];
  constructor(data) {
    const {
      name = "",
      configType = null,
      columns = [],
      parameters = [],
      datalistId = null,
      dataResourceId = null,
      mappingId = "",
      resourceId = "",
      operationId = "",
    } = data;
    this.name = name;
    this.configType = configType;
    this.columns = columns;
    this.parameters = parameters;
    this.datalistId = datalistId;
    this.dataResourceId = dataResourceId;
    this.mappingId = mappingId;
    this.resourceId = resourceId;
    this.operationId = operationId;
  }
}
export class PopulateEvent {
  dataListId: string;
  dataResourceId: string;
  resourceId: string;
  parameters: ParamConfigs[];
  constructor(data) {
    const { dataListId = null, dataResourceId = null, resourceId = null, parameters = [] } = data;
    this.dataListId = dataListId;
    this.dataResourceId = dataResourceId;
    this.resourceId = resourceId;
    this.parameters = parameters;
  }
}
export class SavedColumn {
  name: string;
  path: string;
  type: string;
  columnId: string;
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
export class MultiPageModalMetaData extends MetaData {
  title: string;
  leftIcon: IIcon;
  rightIcon: IIcon;
  height: string;
  width: string;
  footerHeight: number;
  headerHeight: number;
  modalHeader: any;

  constructor(data) {
    super(data);
    const {
      title = "",
      leftIcon = "",
      rightIcon = "",
      height = "400px",
      width = "500px",
      footerHeight = 70,
      headerHeight = 70,
      modalHeader = [],
    } = data;
    this.title = title;
    this.leftIcon = leftIcon;
    this.rightIcon = rightIcon;
    this.height = height;
    this.width = width;
    this.footerHeight = footerHeight;
    this.headerHeight = headerHeight;
    this.modalHeader = modalHeader;
  }
}
export class ModalMetaData extends MetaData {
  leftIcon: IIcon;
  rightIcon: IIcon;
  height: string;
  width: string;
  title: string;
  headerHeight: number;

  constructor(data) {
    super(data);
    const { title = "", leftIcon = "", rightIcon = "", height = "700px", width = "900px", headerHeight = 70 } = data;
    this.title = title;
    this.leftIcon = leftIcon;
    this.rightIcon = rightIcon;
    this.height = height;
    this.width = width;
    this.headerHeight = headerHeight;
  }
}
export class TableMetaData<T> extends ModalMetaData {
  heading: string;
  sort: boolean;
  filter: boolean;
  addRows: boolean;
  hideHeader: boolean;
  horizontalBorder: boolean;
  verticalBorder: boolean;
  actions: TableActions;
  rowEditConfigure: boolean;
  rowDeleteConfigure: boolean;
  optionPopulateConfig: Array<TablePopulateConfig>;
  rowActionsConfig: Array<TableRowActionConfig>;
  options: Array<any>;
  columns: Array<T>;
  overflow: TABLE_OVERFLOW;
  pagination: boolean;
  paginatorPosition: TABLE_PAGINATION_POSITIONS;
  hideFooter: boolean;
  modalStylePropertiesId: string;
  constructor(data) {
    super(data);
    const {
      heading = "",
      sort = false,
      filter = false,
      pagination = false,
      optionsPopulateConfig = [],
      rowDeleteConfigure = false,
      rowEditConfigure = false,
      rowActionsConfig = [],
      columns = [],
      addRows = true,
      hideHeader = false,
      horizontalBorder = true,
      verticalBorder = true,
      actions = {},
      overflow = TABLE_OVERFLOW.PAGINATION,
      paginatorPosition = TABLE_PAGINATION_POSITIONS.BOTTOM,
      hideFooter = false,
      modalStylePropertiesId,
      options = [],
    } = data;
    this.options = options;
    this.columns = columns;
    this.heading = heading;
    this.sort = sort;
    this.filter = filter;
    this.pagination = pagination;
    this.optionPopulateConfig = optionsPopulateConfig;
    this.rowActionsConfig = rowActionsConfig;
    this.rowEditConfigure = rowEditConfigure;
    this.rowDeleteConfigure = rowDeleteConfigure;
    this.addRows = addRows;
    this.hideHeader = hideHeader;
    this.horizontalBorder = horizontalBorder;
    this.verticalBorder = verticalBorder;
    this.actions = new TableActions(actions);
    this.overflow = overflow;
    this.pagination = paginatorPosition;
    this.paginatorPosition = paginatorPosition;
    this.hideFooter = hideFooter;
    this.modalStylePropertiesId = modalStylePropertiesId;
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

export class ButtonMetaData extends MetaData {
  rightIcon: IIcon;
  leftIcon: IIcon;
  onClickConfigs: Array<TriggerEventConfig>;
  status: string;
  isEnable: boolean;

  toastMsg?: string;
  constructor(data) {
    super(data);
    const {
      rightIcon = "",
      leftIcon = "",
      onClickConfig = {},
      status = "",
      isEnable = true,

      toastMsg = "",
    } = data;
    this.rightIcon = rightIcon;
    this.leftIcon = leftIcon;
    this.status = status;
    this.onClickConfigs = [new TriggerEventConfig(onClickConfig)];
    this.isEnable = isEnable;
    this.toastMsg = toastMsg;
  }
}

export class TextAreaMetaData extends MetaData {
  placeholder: string;
  tooltip: string;
  rowsCount: number;
  autoResize: boolean;
  errorMessage: string;
  showErrorMessage: boolean;

  constructor(data) {
    super(data);
    const {
      tooltip = "",
      placeholder = "",
      rowsCount = 3,
      autoResize = false,
      errorMessage = "",
      showErrorMessage = true,
      styleProperties,
    } = data;
    this.tooltip = tooltip;
    this.placeholder = placeholder;
    this.rowsCount = rowsCount;
    this.autoResize = autoResize;
    this.errorMessage = errorMessage;
    this.showErrorMessage = showErrorMessage;
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
  errorMessage: string;
  showErrorMessage: boolean;

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
      errorMessage = "",
      showErrorMessage = true,
      styleProperties,
    } = data;
    this.viewDateFormat = viewDateFormat;
    this.returnDateFormat = returnDateFormat;
    this.tooltip = tooltip;
    this.placeholder = placeholder;
    this.showTime = showTime;
    this.hourFormat = hourFormat;
    this.stepHour = stepHour;
    this.stepMinute = stepMinute;
    this.errorMessage = errorMessage;
    this.showErrorMessage = showErrorMessage;
  }
}

export class NumberMetaData extends MetaData {
  prefix: string;
  suffix: string;
  mode: string;
  currency: string;
  leftIcon: IIcon;
  rightIcon: IIcon;
  minFractionDigits: number;
  maxFractionDigits: number;
  placeholder: string;
  tooltip: string;
  errorMessage: string;
  showErrorMessage: boolean;
  showStepperButtons: boolean;
  step: number;

  allowLabelWrapping: false;
  showClearButton: false;
  prefixText: string;
  suffixText: string;
  thousandsSeparator: boolean;
  constructor(data) {
    super(data);
    const {
      prefix = "",
      suffix = "",
      leftIcon = "",
      rightIcon = "",
      mode,
      currency,
      minFractionDigits,
      maxFractionDigits,
      tooltip = "",
      placeholder = "",
      errorMessage = "",
      showErrorMessage = true,
      showStepperButtons = false,
      step = 1,

      allowLabelWrapping = false,
      showClearButton = false,
      prefixText = "",
      suffixText = "",
      thousandsSeparator = false,
    } = data;
    this.prefix = prefix;
    this.suffix = suffix;
    this.leftIcon = leftIcon;
    this.rightIcon = rightIcon;
    this.mode = mode;
    this.currency = currency;
    this.minFractionDigits = minFractionDigits;
    this.maxFractionDigits = maxFractionDigits;
    this.tooltip = tooltip;
    this.placeholder = placeholder;
    this.errorMessage = errorMessage;
    this.showErrorMessage = showErrorMessage;
    this.showStepperButtons = showStepperButtons;
    this.step = step;

    this.allowLabelWrapping = allowLabelWrapping;
    this.showClearButton = showClearButton;
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
  advanced: boolean;
  constructor(data) {
    super(data);
    const {
      _value = "Hello World",
      textStyle = TextStyles.BODY1,
      horizontalAlign = AlignTypes.LEFT,
      verticalAlign = AlignTypes.CENTER,
      color = "#000000",
      fontWeight = 400,
      advanced = false,
    } = data;
    this.advanced = advanced;
    this.color = color;
    this.fontWeight = fontWeight;
    this._value = _value;
    this.textStyle = textStyle;
    this.horizontalAlign = horizontalAlign;
    this.verticalAlign = verticalAlign;
  }
}

export class URLMetaData extends MetaData {
  horizontalAlign: AlignTypes;
  verticalAlign: AlignTypes;
  color: string;
  fontWeight: number;
  constructor(data) {
    super(data);
    const {
      horizontalAlign = AlignTypes.LEFT,
      verticalAlign = AlignTypes.CENTER,
      color = "#373f51",
      fontWeight = 600,
    } = data;
    this.color = color;
    this.fontWeight = fontWeight;
    this.horizontalAlign = horizontalAlign;
    this.verticalAlign = verticalAlign;
  }
}
export class AvatarMetaData extends MetaData {
  configure: boolean;
  caption: string;

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
      styleProperties = new BaseStyle({
        name: "Avatar Default",
        status: true,
        widgetType: "Avatar",
        defaultWidget: true,
      }),
      configure,
      source = "",
      remoteKey = "",
      tooltip = "",
      imageUrl = "",
      fallbackText = "Admin",
      configureLoginData = false,
    } = data;
    this.configure = configure;
    this.caption = caption;

    this.source = source;
    this.remoteKey = remoteKey;
    this.tooltip = tooltip;
    this.imageUrl = imageUrl;
    this.fallbackText = fallbackText;
    this.configureLoginData = configureLoginData;
  }
}

export class ContainerMetaData extends MetaData {
  title: string;
  icon: IIcon;
  onClickConfigs: Array<TriggerEventConfig>;
  externalLink: string;

  isFooterContainer: boolean;
  isPageContainer: boolean;
  constructor(data) {
    super(data);
    const {
      title = "",
      icon = "",

      onClickConfigs = [],
      externalLink = "",
      isFooterContainer = false,
      isPageContainer = false,
    } = data;
    this.title = title;
    this.icon = icon;

    this.onClickConfigs = onClickConfigs;
    this.externalLink = externalLink;
    this.isFooterContainer = isFooterContainer;
    this.isPageContainer = isPageContainer;
  }
}

export class CollapseContainerMetaData extends ContainerMetaData {
  title: string;
  icon: IIcon;

  constructor(data) {
    super(data);
    const { title = "", icon = "", styleProperties } = data;
    this.title = title;
    this.icon = icon;
  }
}

export class TabContainerMetaData extends MetaData {
  suffixIcon?: string;

  constructor(data) {
    super(data);
    const { suffixIcon, styleProperties } = data;
    this.suffixIcon = suffixIcon;
  }
}

export class StepperContainerMetaData extends MetaData {
  stepperType: string;
  isReviewer: boolean;
  isFreeFlow: boolean;
  showHeader: boolean;
  indicatorPattern: string;
  headerContent: any;
  headerHeight: number;
  stepperHeight?: any;

  constructor(data) {
    super(data);
    const {
      stepperType = "Vertical",
      isReviewer = false,
      isFreeFlow = false,
      indicatorPattern = "circle",
      showHeader = false,
      headerContent = [],
      headerHeight = 0,
      styleProperties,
    } = data;
    this.stepperType = stepperType;
    this.isReviewer = isReviewer;
    this.isFreeFlow = isFreeFlow;
    this.indicatorPattern = indicatorPattern;
    this.showHeader = showHeader;
    this.headerContent = headerContent;
    this.headerHeight = headerHeight;
  }
}

export class CheckboxMetaData extends MetaData {
  tooltip: string;

  errorMessage: string;
  showErrorMessage: boolean;
  constructor(data) {
    super(data);
    const { tooltip = "", errorMessage = "", showErrorMessage = true } = data;
    this.tooltip = tooltip;

    this.errorMessage = errorMessage;
    this.showErrorMessage = showErrorMessage;
  }
}

export class CheckboxGroupMetaData extends CheckboxMetaData {
  tooltip: string;
  options: Array<any>;
  isLabelAndValue: boolean;
  optionType: string;
  optionLabel: string;
  optionValue: string;
  alignOptions: string;
  columns: number;
  allowLabelWrapping: boolean;
  constructor(data) {
    super(data);
    const {
      tooltip = "",
      options = [],
      optionType = "manual",
      optionLabel = "name",
      optionValue = "value",
      isLabelAndValue = false,
      alignOptions = "Horizontal",
      columns = 1,
      allowLabelWrapping = false,
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
  }
}

export class RadioGroupMetaData extends MetaData {
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
      styleProperties,
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
  }
}
export class TriggerEventConfig {
  action: string;
  actionId?: string;
  status?: string;
  name?: string;
  fields?: Array<string>;
  externalLink?: string;
  configId: string;
  constructor(data) {
    const {
      action = "none",
      status = "",
      name = "",
      fields = [],
      actionId = getUniqueId("action"),
      externalLink = "",
      configId = getUniqueId("config"),
    } = data;
    this.configId = configId;
    this.action = action;
    this.status = status;
    this.name = name;
    this.fields = fields;
    this.actionId = actionId;
    this.externalLink = externalLink;
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
  errorMessage: string;
  showErrorMessage: boolean;

  allowLabelWrapping: boolean;
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
      errorMessage = "",
      showErrorMessage = true,

      allowLabelWrapping = false,
    } = data;
    this.placeholder = placeholder || "Select";
    this.optionType = optionType;
    this.optionLabel = optionLabel;
    this.optionValue = optionValue;
    this.tooltip = tooltip;
    this.options = options;
    this.isLabelAndValue = isLabelAndValue;
    this.errorMessage = errorMessage;
    this.showErrorMessage = showErrorMessage;

    this.allowLabelWrapping = allowLabelWrapping;
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

  onClickConfigs: Array<TriggerEventConfig>;
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
      styleProperties,
    } = data;
    this.onClickConfigs = [];
    this.url = url;
    this.altText = altText;
    this.source = source;
    this.remoteKey = remoteKey;
    this.position = position;
    this.horizontalAlign = horizontalAlign;
    this.shorterEdge = shorterEdge;
  }
}

// need to implement global styles for header and footer
export class HeaderMetaData extends MetaData {
  backgroundColor: string;

  constructor(data) {
    super(data);
    const { backgroundColor = "", styleProperties } = data;
    this.backgroundColor = backgroundColor;
  }
}
// need to implement global styles for header and footer
export class FooterMetaData extends MetaData {
  backgroundColor: string;

  constructor(data) {
    super(data);
    const { backgroundColor = "#256e85", styleProperties } = data;
    this.backgroundColor = backgroundColor;
  }
}
export class FormConfig {
  valueType: "ref" | "value" | "formSelect";
  value: string;
  constructor(data) {
    const { valueType = "value", value = "" } = data;
    this.valueType = valueType;
    this.value = value;
  }
}
export class UploadMetaData extends MetaData {
  tooltip: string;
  isOcrForm: boolean;
  formConfig: FormConfig;
  acceptedFileTypes: string;
  acceptedFiles: any[];
  constructor(data) {
    super(data);
    const { tooltip = "", isOcrForm = false, formConfig = {}, acceptedFileTypes = "", acceptedFiles = [] } = data;
    this.isOcrForm = isOcrForm;
    this.tooltip = tooltip;
    this.formConfig = new FormConfig(formConfig);
    this.acceptedFiles = acceptedFiles;
    this.acceptedFileTypes = acceptedFileTypes;
  }
}

export class IconMetaData extends MetaData {
  icon: IIcon;
  horizontalPosition: string;
  verticalPosition: string;
  onClickConfigs: Array<TriggerEventConfig>;
  constructor(data) {
    super(data);
    const {
      icon = {
        type: IconTypes.MATERIAL_ICONS_FILLED,
        value: "logout",
        name: "Logout",
      },
      horizontalPosition = "center",
      verticalPosition = "center",
    } = data;
    this.icon = icon;
    this.horizontalPosition = horizontalPosition;
    this.onClickConfigs = [];
    this.verticalPosition = verticalPosition;
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

export class Value {
  id: string;
  value: any;
  constructor(data) {
    const { id = null, value = null } = data;
    this.id = id;
    this.value = value;
  }
}

export class AddressMetaData extends MetaData {
  mask: string;
  icon: string;
  placeholder: string;
  tooltip: string;
  leftIcon: IIcon;
  rightIcon: IIcon;
  errorMessage: string;
  showErrorMessage: boolean;

  allowLabelWrapping: boolean;
  showClearButton: boolean;
  prefixText: string;
  suffixText: string;
  isAddressField: boolean;
  constructor(data) {
    super(data);
    const {
      mask = "",
      icon = "",
      tooltip = "",
      placeholder = "",
      leftIcon = "",
      rightIcon = "",
      errorMessage = "",
      showErrorMessage = true,
      isAddressField = false,

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
    this.errorMessage = errorMessage;
    this.showErrorMessage = showErrorMessage;

    this.allowLabelWrapping = allowLabelWrapping;
    this.showClearButton = showClearButton;
    this.prefixText = prefixText;
    this.suffixText = suffixText;
    this.isAddressField = isAddressField;
  }
}

export class BaseWidget {
  id: any;
  cols: number;
  rows: number;
  x: number;
  y: number;
  minItemCols: number;
  maxItemCols: number;
  minItemRows: number;
  maxItemRows: number;
  isUnique: boolean;
  isSplitPath: boolean;
  width?: any; // we're using this to set column width
  isMirrorField: boolean;
  officeType: OfficeTypes;
  widgetId: string;
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
    | TabContainerMetaData
    | StepperContainerMetaData
    | TableMetaData<Column>
    | UploadMetaData
    | ModalMetaData
    | MultiPageModalMetaData
    | CollapseContainerMetaData
    | PhoneNumberMetaData
    | SSNInputMetaData
    | DividerMetaData
    | SpacerMetaData
    | IconMetaData
    | AvatarMetaData
    | AddressMetaData
    | URLMetaData;
  displayName: string;
  widgetName: string;
  label: string;
  dataType: DATA_TYPES;
  status: boolean;
  error?: boolean;
  errorMessage?: string;
  children: BaseWidget[];
  validators: Validators;
  value: Value;
  permissions?: { [x: string]: { disable: string[]; hide: string[] } };
  constructor(data) {
    const {
      id,
      widgetId,
      displayName = "",
      widgetName = "",
      label = "",
      dataType,
      widgetType,
      status = true,
      children,
      error = "",
      metaData,
      validators,
      cols = 5,
      rows = 3,
      x,
      y,
      isUnique = false,
      value = {},
      minItemCols,
      minItemRows,
      maxItemCols,
      maxItemRows,
      isSplitPath = false,
      width = 100,
      isMirrorField = false,
      officeType = null,
      permissions = null,
    } = data;
    if (!metaData) {
      switch (widgetType) {
        case WidgetTypes.Text:
          this.metaData = new TextMetaData(data);
          break;
        case WidgetTypes.Container:
          this.metaData = new ContainerMetaData(data);
          break;
        case WidgetTypes.TabContainer:
          this.metaData = new TabContainerMetaData(data);
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
        case WidgetTypes.Email:
          this.metaData = new EmailMetaData(data);
          break;
        case WidgetTypes.PhonenumberInput:
          this.metaData = new PhoneNumberMetaData(data);
          break;
        case WidgetTypes.SSNInput:
          this.metaData = new SSNInputMetaData(data);
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
          this.metaData = new TableMetaData<Column>(data);
          break;
        case WidgetTypes.AdvTable:
          this.metaData = new TableMetaData<BaseWidget>(data);
          break;
        case WidgetTypes.SavedTable:
          this.metaData = new SavedTransactionMetaData({
            ...data,
            addRows: false,
            actions: { editRow: false, deleteRow: false },
          });
          break;
        case WidgetTypes.Upload:
          this.metaData = new UploadMetaData(data);
          break;
        case WidgetTypes.MultiPageModal:
          this.metaData = new MultiPageModalMetaData(data);
          break;
        case WidgetTypes.Modal:
          this.metaData = new ModalMetaData(data);
          break;
        case WidgetTypes.CollapseContainer:
          this.metaData = new CollapseContainerMetaData(data);
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
        case WidgetTypes.Avatar:
          this.metaData = new AvatarMetaData(data);
          break;
        case WidgetTypes.Address:
          this.metaData = new AddressMetaData(data);
          break;
        case WidgetTypes.URL:
          this.metaData = new URLMetaData(data);
          break;
        default:
          this.metaData = null;
          break;
      }
    } else {
      this.metaData = metaData;
    }
    this.widgetId = widgetId || getUniqueId("widget");
    this.officeType = officeType;
    this.validators = new Validators(validators || {});
    this.cols = cols;
    this.rows = rows;
    this.x = x;
    this.y = y;
    this.id = id;
    this.widgetName = widgetName || displayName;
    this.displayName = displayName;
    this.label = label;
    this.status = status;
    this.dataType = dataType;
    this.error = error;
    this.isUnique = isUnique;
    this.children = children || [];
    this.value = new Value(value);
    this.minItemCols = minItemCols;
    this.minItemRows = minItemRows;
    this.maxItemCols = maxItemCols;
    this.maxItemRows = maxItemRows;
    this.isSplitPath = isSplitPath;
    this.width = width;
    this.isMirrorField = isMirrorField;
    this.permissions = permissions;
  }
}
export interface IStyleConfig {
  canvasColor: string;
}
export interface IScreenPayload {
  screenId: string;
  screenName: string;
  screenAlias: string;
  payload: any;
}
export interface ColumnResponseMapping {
  columnId: string;
  name: string;
  populateResponsePath: string;
}
export interface ResponseField {
  value: string;
  name: string;
  widgetType: WidgetTypes;
  dataType: string;
  metaData: any;
}
export class ResponseMappingField {
  widgetId: string;
  isFieldMapping: boolean;
  responsePath: string;
  optionLabel: string;
  optionValue: string;
  defaultValueConfig?: {
    equalValue: string;
    defaultKeyPath: any;
  };
  widgetType: WidgetTypes;
  columns: ColumnResponseMapping[];
  constructor(data) {
    const {
      widgetId = "",
      isFieldMapping = true,
      optionLabel = null,
      optionValue = null,
      responsePath = "",
      defaultValueConfig = { equalValue: "", defaultKeyPath: null },
      columns = [],
      widgetType = "",
    } = data;
    this.widgetId = widgetId;
    this.responsePath = responsePath;
    this.isFieldMapping = isFieldMapping;
    this.optionLabel = optionLabel;
    this.optionValue = optionValue;
    this.defaultValueConfig = defaultValueConfig;
    this.columns = columns;
    this.widgetType = widgetType;
  }
}
const getDataTypeFromWidgetType = (type: WidgetTypes) => {
  switch (type) {
    case WidgetTypes.TextInput:
    case WidgetTypes.TextArea:
      return DATA_TYPES.STRING;
    case WidgetTypes.Number:
      return DATA_TYPES.NUMBER;
    case WidgetTypes.DatePicker:
      return DATA_TYPES.DATE;
    default:
      return DATA_TYPES.STRING;
  }
};

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
      colType = WidgetTypes.TextInput,
      label = "",
      name = "",
      displayName = "",
      widgetName = "",
      populateResponsePath = "",
      columnId = "",
      children = [],
      alignment = CELL_ALIGNMENTS_TYPES.LEFT,
    } = data;
    this.alignment = alignment;
    this.children = children || [];
    this.colType = colType;
    this.type = getDataTypeFromWidgetType(this.colType);
    this.label = label;
    this.columnId = columnId || getUniqueId("column");
    this.name = name;
    this.displayName = displayName;
    this.widgetName = widgetName || displayName;
    this.populateResponsePath = populateResponsePath;
  }
}
export class ServiceProviderConfig {
  dataResourceId: string;
  dataListId: string;
  resourceId: string;
  responseMapping: boolean;
  parameters: ParamConfigs[];
  requestMapping: boolean;
  useResponse: boolean;
  constructor(data) {
    const {
      resourceId = null,
      responseMapping = false,
      requestMapping = false,
      dataResourceId = null,
      dataListId = null,
      parameters = [],
      useResponse = false,
    } = data;
    this.resourceId = resourceId;
    this.dataListId = dataListId;
    this.dataResourceId = dataResourceId;
    this.responseMapping = responseMapping;
    this.parameters = parameters;
    this.requestMapping = requestMapping;
    this.useResponse = useResponse;
  }
}

export class ParamConfigs {
  name: string;
  type: string;
  dataType: string;
  valueType: string;
  value: string;
}

export class OptionPopulateConfig {
  resourceId: string;
  dataResourceId: string;
  dataListId: string;
  parameters: ParamConfigs[];
  responseMappings: FieldMappings[];

  constructor(data) {
    const { resourceId = "", dataResourceId = "", dataListId = "", parameters = [], responseMappings = [] } = data;
    this.resourceId = resourceId;
    this.dataResourceId = dataResourceId;
    this.dataListId = dataListId;
    this.parameters = parameters;
    this.responseMappings = responseMappings;
  }
}

export class FieldMappings {
  widgetId: string;
  optionLabel: string;
  optionValue: string;
  defaultValueConfig?: {
    equalValue: string;
    defaultKeyPath: any;
  };

  constructor(data) {
    const {
      widgetId = "",
      optionLabel = "",
      optionValue = "",
      defaultValueConfig = { equalValue: "", defaultKeyPath: null },
    } = data;
    this.widgetId = widgetId;
    this.optionLabel = optionLabel;
    this.optionValue = optionValue;
    this.defaultValueConfig = defaultValueConfig;
  }
}
