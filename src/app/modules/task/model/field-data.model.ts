export interface Event {
  equal: string[];
  type: string;
  toggleControl: string;
  scope: string;
  toggleValidators: any;
  toggleDefaultValue?: any;
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
  validators: any;
}

export interface Field {
  name: string;
  required?: boolean;
  controlName: string;
  appearance: string;
  type?: string;
  validators?: any;
  defaultValue?: any;
  limitOptions?: any;
  options?: any;
  events?: Event[];
  conditional?: Conditional;
  addButtonText?: string;
  groupLabel?: string;
  nameKey?: string;
  returnKey?: string;
}

export interface Tab {
  tabName: string;
  key: string;
  type: string;
  fields: Field[];
}

export interface TabConfig {
  STRING: Tab[];
  NUMBER: Tab[];
  BOOLEAN?: Tab[];
  HR_LINE?: Tab[];
  CARD?: Tab[];
  PANEL?: Tab[];
  FIELDSET?: Tab[];
  WELL?: Tab[];
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
  metaData: {
    type: string;
    viewType: string;
    display: {
      label: string;
      tooltip: string;
      placeholder: string;
      editEligible: string | boolean;
      mask?: string;
    };
    validators: {
      required: boolean;
      minValue: string;
      maxValue: string;
      minLength: string;
      maxLength: string;
      editable: boolean;
    };
    id?: string;
    appearance: {
      appearanceType: string;
      headerPosition: string;
      borderType: string;
      layoutType: string;
      bgColor: string;
      color: string;
      shadow: string | boolean;
      fontSize: string;
      values: Values[];
      min: string | number;
      max: string | number;
      width: string | number;
      height: string | number;
      columnsCount: number;
      keyValuePairs?: boolean;
      icon: string;
      size: string;
      columns: [
        {
          components: any[];
        }
      ];
    };
  };
  validators: {
    required: boolean;
    minValue: string;
    maxValue: string;
    minLength: string;
    maxLength: string;
    minDate: string;
    maxDate: string;
    editable: boolean;
  };
  displayName: string;
  type: string;
  components: [];
  children: FieldData[];
}

export interface searchParams {
  pageNo: any;
  recordNo: any;
  transactionId: any;
  sort: any;
  searchField?: any;
}
