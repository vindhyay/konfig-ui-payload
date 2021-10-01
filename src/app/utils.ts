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
      if (tempFormControl.valid) {
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