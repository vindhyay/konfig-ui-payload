import ShortUniqueId from "short-unique-id";
import { result } from './state/model/api-response';


const uid = new ShortUniqueId();
export const getValueFromObjectByPath = (obj: any, path: any) => path.split('.').reduce((acc : any, part: any) => acc && acc[part], obj);
export const getUniqueId = (suffix: any) => {
  return suffix + '_' + uid();
};

export const getErrorMessages = (errors: any, label: any) => {
  const errorMessages: string[] = [];
  Object.keys(errors).forEach(error => {
    switch (error) {
      case 'required':
        errorMessages.push(`${label} is required`);
        break;
      case 'minlength':
      case 'maxlength':
        errorMessages.push(
            `Expected atleast length ${errors[error].requiredLength} but got ${errors[error].actualLength}`
        );
        break;
      case 'min':
        errorMessages.push(`Expected atleast value ${errors[error].min} but got ${errors[error].actual}`);
        break;
      case 'max':
        errorMessages.push(`Expected atleast value ${errors[error].max} but got ${errors[error].actual}`);
        break;
    }
  });
  return errorMessages;
};
export const toCapitalize = (string: string = '') => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};
export const parseApiResponse = (result: result): result => {
  const data = result.data;
  const error = result.error;
  return { data, error };
};
