import ShortUniqueId from "short-unique-id";
import { result } from "./state/model/api-response";
import { FormControl, Validators } from "@angular/forms";

const uid = new ShortUniqueId();
export const getValueFromObjectByPath = (obj: any, path: any) =>
  path.split(".").reduce((acc: any, part: any) => acc && acc[part], obj);
export const getUniqueId = (suffix: any) => {
  return suffix + "_" + uid();
};

export const getErrorMessages = (errors: any, label: any) => {
  const errorMessages: string[] = [];
  Object.keys(errors).forEach(error => {
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
        errorMessages.push(`Expected atleast value ${errors[error].min} but got ${errors[error].actual}`);
        break;
      case "max":
        errorMessages.push(`Expected atleast value ${errors[error].max} but got ${errors[error].actual}`);
        break;
    }
  });
  return errorMessages;
};
export const toCapitalize = (string: string = "") => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};
export const parseApiResponse = (result: result): result => {
  const data = result.data;
  const error = result.error;
  return { data, error };
};
export const validateFields = (fields: any[]) => {
  let result = true;
  fields.forEach((field: any) => {
    if (field.children && field.children.length) {
      if (!validateFields(field.children)) {
        result = false;
      }
    } else {
      const tempFormControl = new FormControl(field.value.value, getValidators(field.validators));
      if (tempFormControl.valid || field?.rows === 0 || field?.metaData?.isHidden) {
        field.error = false;
        field.errorMsg = "";
      } else {
        field.error = true;
        field.errorMsg = getErrorMessages(
          tempFormControl.errors,
          field?.label || field?.displayName || field?.widgetName
        )[0];
        result = false;
      }
    }
  });
  return result;
};
export const getValidators = (validators: any) => {
  const _validators: any = [];
  Object.keys(validators).forEach(validator => {
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
        validators[validator] && _validators.push(Validators.maxLength(validators[validator]));
        break;
      case "pattern":
        validators[validator] && _validators.push(Validators.pattern(validators[validator]));
        break;
      case "required":
        validators[validator] && _validators.push(Validators.required);
        break;
    }
  });
  return _validators;
};

export const getFieldFromFields = (fields, fieldId) => {
  let paramField = null;
  fields.forEach(field => {
    if (field.children && field.children.length) {
      const nestedParamField = getFieldFromFields(field.children, fieldId);
      paramField = nestedParamField || paramField;
    } else {
      if (field?.id === fieldId) {
        paramField = field;
      }
    }
  });
  return paramField;
};
export const scrollToBottom = element => {
  if (!element) {
    return;
  }
  element.scroll({ top: element.scrollHeight, behavior: "smooth" });
};
export const addOriginalPosition = (fields) => {
  fields.forEach(field => {
    field.metaData.originalHeight = field.rows + field.y;
    if (field.children && field.children.length) {
      addOriginalPosition(field.children);
    }
  });
};

export const passwordPattern: any = {
  oneLowerCase: '(?=.*[a-z])',
  oneUpperCase: '(?=.*[A-Z])',
  oneNumber: '(?=.*[0-9])',
  oneSpecialchar: '(?=.*[$@$!%*?&])',
  minLength : '.{x,}',
}
export const superClone = (object): any => {
  const cloning = {};
  if(!object){
    return null;
  }
  Object.keys(object).map(prop => {
    if (Array.isArray(object[prop])) {
      cloning[prop] = [].concat(object[prop]);
    } else if (typeof  object[prop] === "object") {
      cloning[prop] = superClone(object[prop]);
    } else { cloning[prop] = object[prop]; }
  });

  return cloning;
};
export class DeepCopy {

  static copy(data: any) {
    let node;
    if (Array.isArray(data)) {
      node = data.length > 0 ? data.slice(0) : [];
      node.forEach((e, i) => {
        if (
          (typeof e === 'object' && e !== {}) ||
          (Array.isArray(e) && e.length > 0)
        ) {
          node[i] = DeepCopy.copy(e);
        }
      });
    } else if (data && typeof data === 'object') {
      node = data instanceof Date ? data : Object.assign({}, data);
      Object.keys(node).forEach((key) => {
        if (
          (typeof node[key] === 'object' && node[key] !== {}) ||
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