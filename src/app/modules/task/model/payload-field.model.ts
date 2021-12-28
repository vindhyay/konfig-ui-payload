import { PayloadType } from './view-editor.model';
import { getUniqueId, toCapitalize } from '../../../utils';

class Appearance {
  appearanceType: string;
  layoutType?: string;
  keyValuePairs?: boolean;
  values?: any;
  bgColor?: string;
  color?: string;
  fontSize?: number;
  icon?: string;
  size?: number;
  constructor(
    appearanceType = 'input',
    layoutType = 'inline-block',
    keyValuePairs = false,
    values = appearanceType === 'input' ? [] : ['True', 'False'],
    bgColor = '#fff',
    color = '#000',
    fontSize = 20,
    icon = '',
    size = 0
  ) {
    this.appearanceType = appearanceType;
    this.layoutType = layoutType;
    this.keyValuePairs = keyValuePairs;
    this.values = values;
    this.bgColor = bgColor;
    this.color = color;
    this.fontSize = fontSize;
    this.icon = icon;
    this.size = size || getDefaultSize(appearanceType);
  }
}
class Display {
  displayName: string;
  label: string;
  placeholder: string;
  constructor(displayName = '', label = '', placeholder = '') {
    this.displayName = displayName;
    this.label = label || toCapitalize(displayName.replace('_', ' '));
    this.placeholder = placeholder;
  }
}
class Validators {
  minLength: number;
  maxLength: number;
  minValue: number;
  maxValue: number;
  required: boolean;
  editable: boolean;
  minDate: string | number;
  maxDate: string | number;
  constructor(
    minLength = null,
    maxLength = null,
    minValue = null,
    maxValue = null,
    required = false,
    editable = true,
    minDate = null,
    maxDate = null
  ) {
    this.minLength = minLength;
    this.maxLength = maxLength;
    this.minValue = minValue;
    this.maxValue = maxValue;
    this.minDate = minDate;
    this.maxDate = maxDate;
    this.required = required;
    this.editable = editable;
  }
}
const getDefaultSize = (appearanceType: string) => {
  switch (appearanceType.toLowerCase()) {
    case 'card':
    case 'panel':
    case 'fieldset':
    case 'well':
      return 12;
    default:
      return 3;
  }
};
export enum DataTypes {
  string = 'string',
  number = 'number',
  boolean = 'boolean',
  date = 'date',
  object = 'object',
  array = 'array',
  file = 'file'
}
const getDefaultAppearanceType = (type: string) => {
  switch (type.toLowerCase()) {
    case DataTypes.string:
    case DataTypes.number:
      return 'input';
    case DataTypes.boolean:
      return 'radio';
    case DataTypes.date:
      return 'date';
    case DataTypes.object:
      return 'PANEL';
    case DataTypes.array:
      return 'CARD';
    default:
      return type;
  }
};
export class MetaData {
  payloadType: PayloadType;
  level: string;
  type: string;
  viewType: string;
  id: string;
  display?: Display;
  appearance?: Appearance;
  validators?: Validators;
  constructor(props: any) {
    const {
      payloadType,
      level,
      type,
      viewType,
      appearance,
      validators,
      display,
      id = '',
      displayName = '',
      appearanceType = ''
    } = props;
    this.payloadType = payloadType;
    this.level = level;
    this.type = type;
    this.viewType = viewType;
    this.validators = validators || new Validators();
    this.appearance = appearance || new Appearance(appearanceType);
    this.display = display || new Display(displayName);
    this.id = id || getUniqueId('');
  }
}
export class PayloadField {
  id: null;
  displayName: string;
  path: string;
  type: string;
  resourceType: string;
  status: any;
  children?: PayloadField[];
  metaData: MetaData;
  validators?: Validators;
  value?: any;
  error?: string;
  constructor(data: any) {
    const {
      id = null,
      displayName = '',
      appearanceType = '',
      path = '',
      type,
      resourceType,
      payloadType,
      level,
      viewType,
      status = true,
      children,
      metaData,
      value = ''
    } = data;
    this.id = id;
    this.value = '';
    this.displayName = displayName;
    this.path = path;
    this.type = type;
    this.resourceType = resourceType;
    this.status = status;
    this.children = children;
    this.metaData =
      metaData ||
      new MetaData({
        payloadType,
        level,
        type,
        viewType,
        displayName,
        appearanceType: appearanceType || getDefaultAppearanceType(type)
      });
    this.validators = this.metaData.validators;
  }
}
