import {AbstractControl} from "@angular/forms";
import ShortUniqueId from 'short-unique-id';

const uid = new ShortUniqueId();

export const hasRequiredField = (abstractControl: AbstractControl): boolean => {
  if (abstractControl.validator) {
    const validator = abstractControl.validator({} as AbstractControl);
    if (validator && validator.required) {
      return true;
    }
  }
  return false;
};
 export enum inputNumberModes{
   decimal= 'decimal',
   currency = 'currency'
 }

 export enum spinnerMode{
   horizontal = 'horizontal',
   vertical = 'vertical'
 }
export const getUniqueId = (suffix: string) => {
    return suffix + '_' + uid();
};
