export interface Event {
  equal: string[] | boolean[];
  type: string;
  toggleControl: string;
  scope: string;
  tabScope?: string;
  dataScope?: string;
}

export interface Conditional {
  show: boolean;
  when: string;
  eq: string[];
}

export interface Option {
  cssClass: string;
  label: string;
  required: boolean;
  name: string;
  type: string;
  nameKey?: string;
  returnKey?: string;
  validators: any;
}

export interface Field {
  name: string;
  required?: boolean;
  hide?: any;
  controlName: string;
  appearance: string;
  type?: string;
  validators?: any;
  defaultValue?: any;
  limitOptions?: any;
  disableNew?: any;
  options?: any;
  events?: Event[];
  conditional?: Conditional;
  addButtonText?: string;
  groupLabel?: string;
  nameKey?: string;
  returnKey?: string;
  toNumber?: boolean;
  noSpaces?: boolean;
  mask?: string;
}

export interface Tab {
  tabName: string;
  key: string;
  type: string;
  hide?: any;
  fields: Field[];
}

interface Values {
  name: string;
  value: string;
}

export interface FieldData {
  value?: {
    value: string;
    id: any;
  };
  error?: boolean;
  errorMsg?: string;
  validators: {
    required: string;
    minValue: string;
    maxValue: string;
    minLength: string;
    maxLength: string;
    editable: boolean;
    minDate: string;
    maxDate: string;
  };
  id: string;
  metaData: {
    id: string;
    type: string;
    viewType: string;
    display: {
      label: string;
      displayName?: string;
      placeholder: string;
      editEligible: string | boolean;
      mask?: string;
    };
    validators: {
      required: string;
      minValue: string;
      maxValue: string;
      minLength: string;
      maxLength: string;
    };
    appearance: {
      appearanceType: string;
      borderType: string;
      layoutType: string;
      bgColor: string;
      color: string;
      shadow?: string | boolean;
      fontSize: string;
      values: Values[];
      keyValuePairs?: boolean | string;
      min: string | number;
      max: string | number;
      width: string | number;
      height: string | number;
      size: string | number;
      columnsCount: number;
      icon: string;
      columns: [
        {
          components: any[];
        }
      ];
    };
  };
  type: string;
  components: [];
  children: FieldData[];
}

export enum PayloadType {
  NEW_PAYLOAD = "NEW_PAYLOAD",
  OLD_PAYLOAD = "OLD_PAYLOAD",
}

// data models
export const PayloadTypes = {
  NEW_PAYLOAD: PayloadType.NEW_PAYLOAD,
  OLD_PAYLOAD: PayloadType.OLD_PAYLOAD,
};
