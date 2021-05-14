import { getUniqueId } from '../../../utils';

export const MIN_COLUMNS = 36;
export const MIN_ROWS = 30;

export const NESTED_MIN_COLUMNS = 29;
export const NESTED_MIN_ROWS = 12;

export enum ButtonTypes {
  primary = 'primary',
  info = 'info',
  success = 'success',
  secondary = 'secondary'
}

export enum ButtonVariants {
  raisedButton = 'raisedButton',
  roundedButton = 'roundedButton',
  raisedTextButton = 'raisedTextButton',
  outlinedButton = 'outlinedButton'
}

export enum PopulateConfigOptionTypes {
  onload= "onload",
  ontrigger = "ontrigger"
}

export enum ButtonActions {
  none = 'none',
  logout = 'logout',
  submit = 'submit',
  populate = 'populate'
}

export enum PayloadType {
  NEW_PAYLOAD = 'NEW_PAYLOAD',
  OLD_PAYLOAD = 'OLD_PAYLOAD'
}

export enum AlignTypes {
  TOP = 'flex-start',
  BOTTOM = 'flex-end',
  CENTER = 'center',
  LEFT = 'flex-start',
  MIDDLE = 'center',
  RIGHT = 'flex-end'
}

export enum TextStyles {
  HEADING1 = 'h1',
  HEADING2 = 'h2',
  HEADING3 = 'h3',
  HEADING4 = 'h4',
  HEADING5 = 'h5',
  HEADING6 = 'h6',
  SUBTITLE1 = 'subtitle1',
  SUBTITLE2 = 'subtitle2',
  BODY1 = 'body1',
  BODY2 = 'body2'
}

export enum ResourceType {
  PAYLOAD_FIELD = 'payload-field'
}

export const PayloadTypes = {
  NEW_PAYLOAD: PayloadType.NEW_PAYLOAD,
  OLD_PAYLOAD: PayloadType.OLD_PAYLOAD
};

export enum DATA_TYPES {
  STRING = 'string',
  NUMBER = 'number',
  BOOLEAN = 'boolean',
  OBJECT = 'object',
  ARRAY = 'array'
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
  Text = 'Text',
  Table = "Table",
  Button = 'Button',
  TextInput = 'TextInput',
  TextArea = 'TextArea',
  Number = 'Number',
  Dropdown = 'Dropdown',
  DatePicker = 'DatePicker',
  Checkbox = 'Checkbox',
  CheckboxGroup = 'CheckboxGroup',
  RadioGroup = 'RadioGroup',
  Container = 'Container',
  TabContainer = "TabContainer",
  Image = 'Image',
  Header = 'Header',
  Footer = 'Footer'
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
  constructor(validators) {
    const {
      required = false,
      editable = true,
      minLength = null,
      maxLength = null,
      minValue = null,
      maxValue = null,
      minDate = null,
      maxDate = null
    } = validators;
    this.required = required;
    this.editable = editable;
    this.minLength = minLength;
    this.maxLength = maxLength;
    this.minValue = minValue;
    this.maxValue = maxValue;
    this.minDate = minDate;
    this.maxDate = maxDate;
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
  constructor(data) {
    const { widgetId, widgetType, level } = data;
    this.widgetId = widgetId || getUniqueId('widget');
    this.widgetType = widgetType;
    this.level = level;
  }
}

export class Column {
  type: string;
  columnId: string;
  label: string;
  name: string;
  displayName: string;
  populateResponsePath: string;
  constructor(data) {
    const { type = "Text", label = "", name = "", displayName = "", populateResponsePath = "", columnId = "" } = data;
    this.type = type;
    this.label = label;
    this.columnId = columnId || getUniqueId("column");
    this.name = name;
    this.displayName = displayName;
    this.populateResponsePath = populateResponsePath;
  }
}

export class TableMetaData extends MetaData {
  columns: Array<Column>;
  populateConfigType: string;
  heading: string;
  constructor(data) {
    super(data);
    const { columns = [], populateConfigType = PopulateConfigOptionTypes.onload, heading = "" } = data;
    this.columns = columns;
    this.populateConfigType = populateConfigType;
    this.heading = heading;
  }
}

export class DropdownMetaData extends MetaData {
  tooltip: string;
  placeholder: string;
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
      placeholder = 'Select',
      tooltip = '',
      options = [],
      optionType = 'manual',
      optionLabel = 'name',
      optionValue = 'value',
      isLabelAndValue = false,
      dataResourceId = '',
      datalistId = ''
    } = data;
    this.placeholder = placeholder;
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

export class TextInputMetaData extends MetaData {
  mask: string;
  icon: string;
  placeholder: string;
  tooltip: string;
  leftIcon: string;
  rightIcon: string;
  constructor(data) {
    super(data);
    const { mask = '', icon = '', tooltip = '', placeholder = '', leftIcon = '', rightIcon = '' } = data;
    this.mask = mask;
    this.icon = icon;
    this.tooltip = tooltip;
    this.placeholder = placeholder;
    this.leftIcon = leftIcon;
    this.rightIcon = rightIcon;
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
      icon = '',
      iconPos = 'left',
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
    const { tooltip = '', placeholder = '', rowsCount = 3, autoResize = false } = data;
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
    const { viewDateFormat = 'mm/dd/yy', returnDateFormat = 'isoTimestamp', tooltip = '', placeholder = '' } = data;
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
  constructor(data) {
    super(data);
    const { prefix = '', suffix = '', tooltip = '', placeholder = '', format = false } = data;
    this.format = format;
    this.prefix = prefix;
    this.suffix = suffix;
    this.tooltip = tooltip;
    this.placeholder = placeholder;
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
      _value = 'Hello World',
      textStyle = TextStyles.BODY1,
      horizontalAlign = AlignTypes.MIDDLE,
      verticalAlign = AlignTypes.CENTER,
      color = '#000000',
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
  constructor(data) {
    super(data);
    const { title = '' } = data;
    this.title = title;
  }
}

export class Value {
  id: string;
  value: any;
  constructor(data) {
    const { id, value = '' } = data;
    this.id = id;
    this.value = value;
  }
}

export class CheckboxMetaData extends MetaData {
  tooltip: string;
  constructor(data) {
    super(data);
    const { tooltip = '' } = data;
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
      tooltip = '',
      options = [],
      optionType = 'manual',
      optionLabel = 'name',
      optionValue = 'value',
      isLabelAndValue = false,
      dataResourceId = '',
      datalistId = ''
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
  constructor(data) {
    super(data);
    const {
      tooltip = '',
      options = [],
      optionType = 'manual',
      optionLabel = 'name',
      optionValue = 'value',
      isLabelAndValue = false
    } = data;
    this.optionType = optionType;
    this.tooltip = tooltip;
    this.options = options;
    this.isLabelAndValue = isLabelAndValue;
    this.optionLabel = optionLabel;
    this.optionValue = optionValue;
  }
}

export class ImageMetaData extends MetaData {
  url: string;
  constructor(data) {
    super(data);
    const { url = '' } = data;
    this.url = url;
  }
}

export class HeaderMetaData extends MetaData {
  backgroundColor: string;
  constructor(data) {
    super(data);
    const { backgroundColor = '#ffffff' } = data;
    this.backgroundColor = backgroundColor;
  }
}
export class FooterMetaData extends MetaData {
  backgroundColor: string;
  constructor(data) {
    super(data);
    const { backgroundColor = '#fff' } = data;
    this.backgroundColor = backgroundColor;
  }
}

export class BaseWidget {
  id: any;
  cols: number;
  rows: number;
  x: number;
  y: number;
  isViewOnly: boolean;
  metaData:
      | TextMetaData
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
      | ButtonMetaData;
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
  constructor(data) {
    const {
      id,
      isViewOnly = false,
      displayName = '',
      name = '',
      label = '',
      dataType,
      widgetType,
      isPrePopulated = false,
      status = true,
      resourceType = ResourceType.PAYLOAD_FIELD,
      children,
      error = '',
      metaData,
      validators,
      cols = 5,
      rows = 3,
      x,
      y,
      value
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
  }
}
