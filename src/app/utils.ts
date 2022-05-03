import ShortUniqueId from "short-unique-id";
import { result } from "./state/model/api-response";
import { FormControl, Validators } from "@angular/forms";
import { ButtonActions, WidgetTypes } from "./modules/task/model/create-form.models";

export const UI_ACTIONS = [
  ButtonActions.logout,
  ButtonActions.nextStep,
  ButtonActions.previousStep,
  ButtonActions.openModals,
  ButtonActions.closeModals,
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
  let errorFields = [];
  fields.forEach((field: any) => {
    // if (field.error) {
    //   result = false;
    //   errorFields.push(field);
    //   return true;
    // }
    if (field?.children && field?.children?.length) {
      const { result: validationStatus, errorFields: errorFieldsData } = validateFields(field.children);
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
      const tempFormControl = new FormControl(value, getValidators(field?.validators || {}));
      if (tempFormControl.valid || field?.rows === 0 || field?.metaData?.isHidden) {
        field.error = false;
        field.errorMessage = "";
      } else {
        field.error = true;
        field.errorMessage = getErrorMessages(
          tempFormControl.errors,
          field?.label || field?.displayName || field?.widgetName
        )[0];
        errorFields.push(field);
        result = false;
      }
    }
  });
  return { result, errorFields };
};
export const getValidators = (validators: any) => {
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
  fields.forEach((field) => {
    if (field?.id === fieldId) {
      paramField = field;
    }
    if (!paramField && field.children && field.children.length) {
      const nestedParamField = getFieldFromFields(field.children, fieldId);
      paramField = nestedParamField || paramField;
    }
  });
  return paramField;
};

export const eligibileReviewField = [
  WidgetTypes.TextArea,
  WidgetTypes.TextInput,
  WidgetTypes.PasswordInput,
  WidgetTypes.SSNInput,
  WidgetTypes.Email,
  WidgetTypes.PhonenumberInput,
  WidgetTypes.Dropdown,
  WidgetTypes.Number,
  WidgetTypes.DatePicker,
  WidgetTypes.Checkbox,
];
export const getAllFromFields = (fields, eligibileField) => {
  let paramField = [];
  fields.forEach((field) => {
    if (field.children && field.children.length) {
      const nestedParamField = getAllFromFields(field.children, eligibileField);
      paramField = [...paramField, ...nestedParamField];
    } else if (eligibileField.indexOf(field.metaData.widgetType) >= 0) {
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
export const addOriginalPosition = (fields) => {
  fields.forEach((field) => {
    field.metaData.originalHeight = field.rows + field.y;
    field.metaData.originalY = field.y;
    if (field.children && field.children.length && field?.metaData?.widgetType !== WidgetTypes.AdvTable) {
      addOriginalPosition(field.children);
    }
  });
};

export const passwordPattern: any = {
  oneLowerCase: "(?=.*[a-z])",
  oneUpperCase: "(?=.*[A-Z])",
  oneNumber: "(?=.*[0-9])",
  oneSpecialchar: "(?=.*[$@$!%*?&])",
  minLength: ".{x,}",
};
export const superClone = (object): any => {
  const cloning = {};
  if (!object) {
    return null;
  }
  Object.keys(object).map((prop) => {
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
      node = data.length > 0 ? data.slice(0) : [];
      node.forEach((e, i) => {
        if ((typeof e === "object" && e !== {}) || (Array.isArray(e) && e.length > 0)) {
          node[i] = DeepCopy.copy(e);
        }
      });
    } else if (data && typeof data === "object") {
      node = data instanceof Date ? data : Object.assign({}, data);
      Object.keys(node).forEach((key) => {
        if ((typeof node[key] === "object" && node[key] !== {}) || (Array.isArray(node[key]) && node[key].length > 0)) {
          node[key] = DeepCopy.copy(node[key]);
        }
      });
    } else {
      node = data;
    }
    return node;
  }
}
export const getValueFromField = (fields, fieldId) => {
  let paramField = null;
  fields.forEach((field) => {
    if (field.children && field.children.length) {
      const nestedParamField = getValueFromField(field.children, fieldId);
      paramField = nestedParamField || paramField;
    } else {
      if (field?.id === fieldId) {
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
