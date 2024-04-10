import ShortUniqueId from "short-unique-id";
import { Result } from "./state/model/api-response";
import { AbstractControl, FormControl, ValidationErrors, ValidatorFn, Validators } from "@angular/forms";
import {
  BaseWidget,
  ButtonActions,
  DATA_TYPES,
  TableMetaData,
  WidgetTypes,
} from "./modules/task/model/create-form.models";
import { isNull } from "lodash";
import * as moment from "moment";

export const UI_ACTIONS = [
  ButtonActions?.logout,
  ButtonActions?.nextStep,
  ButtonActions?.previousStep,
  ButtonActions?.openModals,
  ButtonActions?.closeModals,
  ButtonActions?.externalLink,
];

const uid = new ShortUniqueId();
export const getValueFromObjectByPath = (obj: any, path: any) =>
  path.split(".").reduce((acc: any, part: any) => acc && acc[part], obj);
export const getUniqueId = (suffix: any) => {
  return suffix + "_" + uid();
};

export const getErrorMessages = (errors: any, label: any) => {
  const errorMessages: string[] = [];
  Object.keys(errors).forEach((error) => {
    switch (error) {
      case "required":
        errorMessages.push(`${label} is required`);
        break;
      case "pattern":
        errorMessages.push(`${label} is not valid`);
        break;
      case "minlength":
      case "maxlength":
        errorMessages.push(
          `Expected atleast length ${errors[error].requiredLength} but got ${errors[error].actualLength}`
        );
        break;
      case "min":
        errorMessages.push(`Please enter any value greater than  ${errors[error].min}`);
        break;
      case "max":
        errorMessages.push(`Please enter any value less than ${errors[error].max}`);
        break;
      case "minDate":
        errorMessages.push(` ${errors.minDate}`);
        break;
      case "maxDate":
        errorMessages.push(` ${errors.maxDate}`);
        break;
    }
  });
  return errorMessages;
};
export const toCapitalize = (string: string = "") => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};
export const parseApiResponse = (result: Result): Result => {
  const data = result;
  const error = null;
  return { data, error };
};
export const validateFields = (fields: any[], isPageSubmit = false) => {
  let result = true;
  let errorFields = [];
  fields?.forEach((field: any) => {
    if (field.error && isPageSubmit && !field?.metaData?.isHidden) {
      result = false;
      errorFields.push(field);
      return true;
    }
    if (field?.children && field?.children?.length) {
      const { result: validationStatus, errorFields: errorFieldsData } = validateFields(field.children, isPageSubmit);
      if (!validationStatus) {
        result = false;
        errorFields = errorFields.concat(errorFieldsData);
      }
    } else if (field) {
      let value = field?.value?.value;

      // For validation purpose convert to format but keep real value in field as it is
      if (field?.metaData?.widgetType === WidgetTypes.PhonenumberInput) {
        value = toPhoneFormat(field?.value?.value);
      }
      if (field?.metaData?.widgetType === WidgetTypes.SSNInput) {
        value = toSSNFormat(field?.value?.value);
      }
      //Checking for widget data type and value data type
      const validators = field?.validators || {};
      validators["dataType"] = true;
      const tempFormControl = new FormControl(value, getValidators(field?.validators || {}, field));
      if (field?.metaData?.widgetType == WidgetTypes.Checkbox) {
        if (field.validators?.required && !value) {
          field.error = true;
          field.errorMessage =
            field?.metaData?.errorMessage ||
            getErrorMessages({ required: true }, field?.label || field?.displayName || field?.widgetName)[0];
          errorFields.push(field);
          result = false;
        } else {
          field.error = false;
          field.errorMessage = "";
        }
      } else {
        if (tempFormControl.valid || field?.rows === 0 || field?.metaData?.isHidden) {
          field.error = false;
          field.errorMessage = "";
        } else {
          field.error = true;
          field.errorMessage =
            field?.metaData?.errorMessage ||
            getErrorMessages(tempFormControl.errors, field?.label || field?.displayName || field?.widgetName)[0];
          errorFields.push(field);
          result = false;
        }
      }
    }
  });
  return { result, errorFields };
};
export const getValidators = (validators: any, field) => {
  const _validators: any = [];
  Object.keys(validators).forEach((validator) => {
    switch (validator) {
      case "minValue":
        validators[validator] && _validators.push(Validators.min(validators[validator]));
        break;
      case "minLength":
        validators[validator] && _validators.push(Validators.minLength(validators[validator]));
        break;
      case "maxValue":
        validators[validator] && _validators.push(Validators.max(validators[validator]));
        break;
      case "maxLength":
        if (field?.metaData?.widgetType === WidgetTypes.Number) {
          validators[validator] && _validators.push(CustomValidators.maxLengthNumber(validators[validator]));
        } else {
          validators[validator] && _validators.push(Validators.maxLength(validators[validator]));
        }
        break;
      case "pattern":
        if (field?.metaData?.widgetType === WidgetTypes.DatePicker) {
          validators[validator] && _validators.push(CustomValidators.datePattern(validators[validator]));
        } else {
          validators[validator] && _validators.push(Validators.pattern(validators[validator]));
        }
        break;
      case "required":
        if (field?.metaData?.widgetType === WidgetTypes.Checkbox) {
          validators[validator] && _validators.push(CustomValidators.mustBeTrue(field?.label));
        } else {
          validators[validator] && _validators.push(Validators.required);
        }
        break;
      case "minDate":
        validators[validator] && _validators.push(CustomValidators.dateMinimum(field));
        break;
      case "maxDate":
        validators[validator] && _validators.push(CustomValidators.dateMaximum(field));
        break;
      case "dataType":
        let expectedDataType = field?.dataType;
        if (field?.metaData?.widgetType === WidgetTypes.DatePicker || expectedDataType === DATA_TYPES.DATE) {
          expectedDataType = field?.validators?.pattern === "utcTimestamp" ? "number" : "string";
        }
        validators[validator] && _validators.push(CustomValidators.dataTypeValidator(expectedDataType));
    }
  });
  return _validators;
};
export const getFieldFromFields = (fields, widgetId) => {
  let paramField = null;
  fields.forEach((field) => {
    if (field?.widgetId === widgetId) {
      paramField = field;
    }
    if (!paramField && field.children && field.children.length) {
      const nestedParamField = getFieldFromFields(field.children, widgetId);
      paramField = nestedParamField || paramField;
    }
  });
  return paramField;
};

export const eligibileReviewField = [
  WidgetTypes?.TextArea,
  WidgetTypes?.TextInput,
  WidgetTypes?.PasswordInput,
  WidgetTypes?.SSNInput,
  WidgetTypes?.Email,
  WidgetTypes?.PhonenumberInput,
  WidgetTypes?.Dropdown,
  WidgetTypes?.Number,
  WidgetTypes?.DatePicker,
  WidgetTypes?.Checkbox,
];
export const getAllFromFields = (fields, eligibileField) => {
  let paramField = [];
  fields.forEach((field) => {
    if (field.children && field.children.length) {
      const nestedParamField = getAllFromFields(field.children, eligibileField);
      paramField = [...paramField, ...nestedParamField];
    } else if (field?.length) {
      const nestedParamField = getAllFromFields(field, eligibileField);
      paramField = [...paramField, ...nestedParamField];
    } else if (eligibileField.indexOf(field?.metaData?.widgetType) >= 0) {
      paramField.push({ label: field.label, value: field.value.value });
    }
  });
  return paramField;
};
export const scrollToBottom = (element) => {
  if (!element) {
    return;
  }
  element.scroll({ top: element.scrollHeight, behavior: "smooth" });
};
export const updateTableDataToWidgetStructure = (fields: BaseWidget[]) => {
  fields.forEach((field) => {
    if (field.metaData.widgetType === WidgetTypes.AdvTable) {
      field.children = convertJSONToTableData(field?.value?.value || [], field)?.children || [];
      field.value.value = [];
    } else if (field?.children?.length) {
      updateTableDataToWidgetStructure(field.children);
    }
  });
};
export const addOriginalPosition = (fields) => {
  fields.forEach((field) => {
    field.metaData.originalHeight = field.rows + field.y;
    field.metaData.originalY = field.y;
    if (field.children && field.children.length && field?.metaData?.widgetType !== WidgetTypes.AdvTable) {
      addOriginalPosition(field.children);
    }
  });
};
export const superClone = (object): any => {
  const cloning = {};
  if (!object) {
    return null;
  }
  Object.keys(object).forEach((prop) => {
    if (Array.isArray(object[prop])) {
      cloning[prop] = [].concat(object[prop]);
    } else if (typeof object[prop] === "object") {
      cloning[prop] = superClone(object[prop]);
    } else {
      cloning[prop] = object[prop];
    }
  });

  return cloning;
};
export class DeepCopy {
  static copy(data: any) {
    let node;
    if (Array.isArray(data)) {
      node = getArrayNodes(data);
    } else if (data && typeof data === "object") {
      node = data instanceof Date ? data : Object.assign({}, data);
      Object.keys(node).forEach((key) => {
        if (
          (node[key] && typeof node[key] === "object" && Object.keys(node[key]).length > 0) ||
          (Array.isArray(node[key]) && node[key].length > 0)
        ) {
          node[key] = DeepCopy.copy(node[key]);
        }
      });
    } else {
      node = data;
    }
    return node;
  }
}

export function getArrayNodes(data) {
  let node;
  node = data.length > 0 ? data.slice(0) : [];
  node.forEach((e, i) => {
    if ((typeof e === "object" && Object.keys(e).length > 0) || (Array.isArray(e) && e.length > 0)) {
      node[i] = DeepCopy.copy(e);
    }
  });
  return node;
}
export const getValueFromField = (fields, widgetId) => {
  let paramField = null;
  fields.forEach((field) => {
    if (field.children && field.children.length) {
      const nestedParamField = getValueFromField(field.children, widgetId);
      paramField = nestedParamField || paramField;
    } else {
      if (field?.widgetId === widgetId) {
        paramField = field;
      }
    }
  });
  return paramField;
};

export const getBorderStyle = (style) => {
  const styleProperties = style.properties;
  const {
    independentBorder,
    borderTopStyle,
    borderLeftStyle,
    borderBottomStyle,
    borderRightStyle,
    borderTopLeftRadius,
    borderTopRightRadius,
    borderBottomLeftRadius,
    borderBottomRightRadius,
    borderRadius,
    borderTopColor,
    borderLeftColor,
    borderBottomColor,
    borderRightColor,
    borderColor,
    borderTopWidth,
    borderLeftWidth,
    borderBottomWidth,
    borderRightWidth,
    borderWidth,
    borderStyle,
    shadowStyle,
    horizontalOffset,
    verticalOffset,
    blurRadius,
    spreadRadius,
    boxShadowColor,
  } = styleProperties;
  let styles = {
    "border-top-style": independentBorder ? borderTopStyle : borderStyle,
    "border-left-style": independentBorder ? borderLeftStyle : borderStyle,
    "border-bottom-style": independentBorder ? borderBottomStyle : borderStyle,
    "border-right-style": independentBorder ? borderRightStyle : borderStyle,

    "border-top-left-radius": independentBorder ? borderTopLeftRadius : borderRadius,
    "border-top-right-radius": independentBorder ? borderTopRightRadius : borderRadius,
    "border-bottom-left-radius": independentBorder ? borderBottomLeftRadius : borderRadius,
    "border-bottom-right-radius": independentBorder ? borderBottomRightRadius : borderRadius,

    "border-top-color": independentBorder ? borderTopColor : borderColor,
    "border-left-color": independentBorder ? borderLeftColor : borderColor,
    "border-bottom-color": independentBorder ? borderBottomColor : borderColor,
    "border-right-color": independentBorder ? borderRightColor : borderColor,

    "border-top-width": independentBorder ? borderTopWidth : borderWidth,
    "border-left-width": independentBorder ? borderLeftWidth : borderWidth,
    "border-bottom-width": independentBorder ? borderBottomWidth : borderWidth,
    "border-right-width": independentBorder ? borderRightWidth : borderWidth,
  };
  switch (shadowStyle) {
    case "none":
      break;
    case "inset":
      styles["box-shadow"] =
        horizontalOffset +
        " " +
        verticalOffset +
        " " +
        blurRadius +
        " " +
        spreadRadius +
        " " +
        boxShadowColor +
        " inset";
      break;
    case "outset":
      styles["box-shadow"] =
        horizontalOffset + " " + verticalOffset + " " + blurRadius + " " + spreadRadius + " " + boxShadowColor;
      break;
  }
  return styles;
};

export const toPhoneFormat = (number = "") => {
  let phoneNumber = ("" + number).replace(/\D/g, "");
  let match = phoneNumber.match(/^(\d{3})(\d{3})(\d{4})$/);
  if (match) {
    return match[1] + "-" + match[2] + "-" + match[3];
  }
  return number;
};
export const toSSNFormat = (ssn = "") => {
  let phoneNumber = ("" + ssn).replace(/\D/g, "");
  let match = phoneNumber.match(/^(\d{3})(\d{2})(\d{4})$/);
  if (match) {
    return match[1] + "-" + match[2] + "-" + match[3];
  }
  return ssn;
};
export const scrollTo = (x = 0, y = 0) => {
  window.scrollTo(x, y);
};

export const conditions = {
  STRING: [
    { name: "Starts with", id: "startsWith" },
    { name: "Ends with", id: "endsWith" },
    { name: "Contains", id: "contains" },
    { name: "Equals", id: "equals" },
    { name: "Not equals", id: "notEquals" },
    { name: "Not Includes", id: "notIncludes" },
    { name: "Length equals", id: "lengthEquals" },
    { name: "Length greater", id: "lengthGreater" },
    { name: "Length less", id: "lengthLess" },
    { name: "Length greater or equals", id: "lengthGreaterAndEquals" },
    { name: "Length less or equals", id: "lengthLessAndEquals" },
    { name: "is Empty", id: "isNull" },
    { name: "Is Not Empty", id: "isNotNull" },
  ],
  ARRAY: [
    { name: "Includes", id: "includes" },
    { name: "Not Includes", id: "notIncludes" },
    { name: "Excludes", id: "excludes" },
  ],
  BOOLEAN: [
    { name: "Equals", id: "equals" },
    { name: "Not equals", id: "notEquals" },
  ],
  NUMBER: [
    { name: "Greater than", id: "greaterThan" },
    { name: "Greater than equals", id: "greaterthanEquals" },
    { name: "Less than", id: "lessthan" },
    { name: "Less than equals", id: "lessthanEquals" },
    { name: "Equals", id: "equals" },
    { name: "Not equals", id: "notEquals" },
    { name: "is Empty", id: "isNull" },
    { name: "Is Not Empty", id: "isNotNull" },
  ],
  DATE: [
    { name: "Greater than", id: "greaterThan" },
    { name: "Greater than equals", id: "greaterthanEquals" },
    { name: "Less than", id: "lessthan" },
    { name: "Less than equals", id: "lessthanEquals" },
    { name: "Equals", id: "equals" },
    { name: "Not equals", id: "notEquals" },
    { name: "Is Empty", id: "isNull" },
    { name: "Is Not Empty", id: "isNotNull" },
  ],
  DEFAULT: [
    { name: "Equals", id: "equals" },
    { name: "Not Equals", id: "notEquals" },
  ],
};

export const rulesConditionEvaluation = {
  convertCase: (stringValue): string => {
    return stringValue ? stringValue?.toLowerCase() : "";
  },
  isGreaterThan: (fieldValue: number, value: number): boolean => {
    return fieldValue > value;
  },
  isGreaterThanEqual: (fieldValue: number, value: number): boolean => {
    return fieldValue >= value;
  },
  isLessThan: (fieldValue: number, value: number): boolean => {
    return fieldValue < value;
  },
  isLessThanEqual: (fieldValue: number, value: number): boolean => {
    return fieldValue <= value;
  },
  contains: (fieldValue: string, value: string): boolean => {
    return fieldValue.includes(value);
  },
};

export const conditionValidation = (rule, fieldValue): boolean => {
  let result = false;
  let ruleArray = [];
  let testCondition = false;
  if (rule?.dataType === "string") {
    fieldValue = rulesConditionEvaluation.convertCase(fieldValue);
    rule.value = rulesConditionEvaluation.convertCase(rule?.value);
  }
  switch (rule?.condition) {
    case "includes":
      ruleArray = rule?.value?.split(",");
      testCondition = ruleArray.every((r) => (fieldValue || []).includes(r));
      if (testCondition) {
        result = true;
      }
      break;
    case "startsWith":
      result = String(fieldValue).startsWith(String(rule.value));
      break;
    case "endsWith":
      result = String(fieldValue).endsWith(String(rule.value));
      break;
    case "notIncludes":
      ruleArray = rule?.value?.split(",");
      testCondition = ruleArray.some((r) => (fieldValue || []).includes(r));
      if (!testCondition) {
        result = true;
      }
      break;
    case "excludes":
      if (!(fieldValue || []).includes(rule.value)) {
        result = true;
      }
      break;
    case "contains":
      result = rulesConditionEvaluation.contains(fieldValue, rule.value);
      break;
    case "greaterThan":
      result = rulesConditionEvaluation.isGreaterThan(fieldValue, rule.value);
      break;
    case "greaterthanEquals":
      result = rulesConditionEvaluation.isGreaterThanEqual(fieldValue, rule.value);
      break;
    case "lessthan":
      result = rulesConditionEvaluation.isLessThan(fieldValue, rule.value);
      break;
    case "lessthanEquals":
      result = rulesConditionEvaluation.isLessThanEqual(fieldValue, rule.value);
      break;
    case "equalsIgnoreCase":
      result = String(fieldValue).toLowerCase() == String(rule.value).toLowerCase();
      break;
    case "lengthEquals":
      result = !!fieldValue && String(fieldValue).length == rule.value;
      break;
    case "lengthGreater":
      result = !!fieldValue && rulesConditionEvaluation.isGreaterThan(String(fieldValue).length, rule.value);
      break;
    case "lengthLess":
      result = !!fieldValue && rulesConditionEvaluation.isLessThan(String(fieldValue).length, rule.value);
      break;
    case "lengthGreaterAndEquals":
      result = !!fieldValue && rulesConditionEvaluation.isGreaterThanEqual(String(fieldValue).length, rule.value);
      break;
    case "lengthLessAndEquals":
      result = !!fieldValue && rulesConditionEvaluation.isLessThanEqual(String(fieldValue).length, rule.value);
      break;
    case "notEquals":
      if ((isNull(fieldValue) && String(rule.value) === "none") || String(fieldValue) !== String(rule.value)) {
        result = true;
      }
      break;
    case "isNotNull":
      if (!isNull(fieldValue) && String(rule.value) === "none") {
        result = true;
      }
      break;
    default:
      if (
        ((isNull(fieldValue) || fieldValue === "") && String(rule.value) === "none") ||
        String(fieldValue) == String(rule.value)
      ) {
        result = true;
      }
      break;
  }
  return result;
};

export interface AddressDetails {
  placeID: string;
  name?: string;
  icon?: string;
  displayAddress?: string;
  postalCode?: number;
  streetNumber?: number;
  streetName?: string;
  sublocality?: string;
  postalCodeSuffix?: number;
  locality?: {
    name?: string;
    value?: string;
  };
  state?: {
    name?: string;
    value?: string;
  };
  country?: {
    name?: string;
    value?: string;
  };
  vicinity?: string;
  url?: string;
}

export class CustomValidators {
  static maxLengthNumber(maxNumberOfDigits: number): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (control.value == null) {
        return null;
      }
      const lengthOfDigits = control.value?.toString()?.length;
      return lengthOfDigits <= maxNumberOfDigits
        ? null
        : {
            maxLength: `Expected max length is ${maxNumberOfDigits}, received  :${lengthOfDigits}`,
          };
    };
  }
  static mustBeTrue(label: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (control.value == null) {
        return null;
      }
      return control.value === true
        ? null
        : {
            required: `${label} is required`,
          };
    };
  }

  static datePattern(expectedPattern: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (control.value == null) {
        return null;
      }
      let isValid = true;
      if (expectedPattern === "utcTimestamp") {
        isValid = true;
      } else if (expectedPattern === "isoTimestamp") {
        isValid = moment(control.value, "YYYY-MM-DDTHH:mm:ss.SSSZ", true).isValid();
      } else {
        isValid = moment(control.value, expectedPattern, true).isValid();
      }
      if (isValid) {
        return null;
      }
      return isValid
        ? null
        : {
            pattern: `Invalid date format, does not match the expected format.`,
          };
    };
  }
  static dateMaximum(field: any): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (control.value == null) {
        return null;
      }
      const controlDate = moment(new Date(control.value).toISOString());
      if (!controlDate.isValid()) {
        return null;
      }
      const validationDate = moment(new Date(field.validators.maxDate).toISOString());
      return controlDate.isSameOrBefore(validationDate)
        ? null
        : {
            maxDate: `Max date is ${field.validators.minDate}`,
          };
    };
  }

  static dateMinimum(field: any): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (control.value == null) {
        return null;
      }
      const controlDate = moment(new Date(control.value).toISOString());
      if (!controlDate.isValid()) {
        return null;
      }
      const validationDate = moment(new Date(field.validators.minDate).toISOString());
      return controlDate.isSameOrAfter(validationDate)
        ? null
        : {
            minDate: `Min date is ${field.validators.minDate}`,
          };
    };
  }
  static dataTypeValidator(expectedType: string): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      if (Validators.required(control) !== null) {
        // If the control has no value, return null (no error)
        return null;
      }
      const value = control.value;
      const actualType = Array.isArray(value) ? "array" : typeof value;
      // Check if the data type matches the expected type
      if (actualType !== expectedType) {
        return { dataType: `Invalid data type` };
      }
      // Return null if the validation passes
      return null;
    };
  }
}

export function getOrder(direction) {
  if (direction === "asc") {
    return 1;
  } else if (direction === "desc") {
    return -1;
  } else {
    return 0;
  }
}

// Regex to check possible attacks

const sqlInjectionRegex = /(['";]+)|(--+\s*)/;

// Regular expression to check for potential XSS attack
const xssRegex = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/i;

// Regular expression to check for potential path traversal attack
const pathTraversalRegex = /\.\.\//;

export const checkForSecurityConcerns = (text: string) => {
  return sqlInjectionRegex.test(text) || pathTraversalRegex.test(text) || xssRegex.test(text);
};

export const dynamicEvaluation = (code: string) => {
  if (checkForSecurityConcerns(code)) {
    return code;
  } else {
    return dynamicEvaluation(code);
  }
};

export const convertJSONToTableData = (jsonData: Array<any>, structure: BaseWidget): BaseWidget => {
  if (!jsonData.length) {
    return null;
  }
  const mappedStructure: BaseWidget = { ...structure };

  function mapChild(item, columns: BaseWidget[]) {
    return columns.map((column) => {
      const metaData: TableMetaData<BaseWidget> = column.metaData as TableMetaData<BaseWidget>;
      if (metaData.widgetType === "AdvTable" && Array.isArray(item[column.displayName])) {
        return {
          ...column,
          children: mapChildren(item[column.displayName], metaData.columns),
        };
      } else if (metaData.widgetType === "Modal") {
        return {
          ...column,
          children: mapChildren(item[column.displayName], column.children),
        };
      } else {
        return {
          ...column,
          value: {
            id: null,
            value: item[column.displayName],
          },
        };
      }
    });
  }
  function mapChildren(data, columns) {
    if (Array.isArray(data)) {
      return data.map((item) => {
        return mapChild(item, columns);
      });
    } else {
      return mapChild(data, columns);
    }
  }
  const metaData: TableMetaData<BaseWidget> = structure.metaData as TableMetaData<BaseWidget>;
  mappedStructure.children = mapChildren(jsonData, metaData.columns);
  return mappedStructure;
};
export const convertTableDataToJson = (fields: BaseWidget[]) => {
  if (!fields.length) {
    return fields;
  }
  function convertToValue(fields: BaseWidget[]) {
    const jsonData = {};
    fields.forEach((field) => {
      if (field.metaData.widgetType === WidgetTypes.AdvTable) {
        const tableRows: any = field.children;
        jsonData[field.displayName] = tableRows.map((row: BaseWidget[]) => convertToValue(row));
      } else if (field.children.length) {
        jsonData[field.displayName] = convertToValue(field.children);
      } else {
        jsonData[field.displayName] = field.value.value;
      }
    });
    return jsonData;
  }
  function mapValue(fields: BaseWidget[]) {
    return fields.map((field) => {
      if (field.metaData.widgetType === WidgetTypes.AdvTable) {
        const tableRows: any = field.children;
        field.value.value = tableRows.map((row: BaseWidget[]) => convertToValue(row));
        field.children = [];
      }
      return field;
    });
  }
  return mapValue(fields);
};
