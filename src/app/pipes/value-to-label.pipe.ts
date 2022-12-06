import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'valueToLabel'
})
export class ValueToLabelPipe implements PipeTransform {

  transform(value: any, optionsList: any, labelAndValue: boolean): any {
    let label : any;
    if (!labelAndValue) {
      return value;
    }
    else {
      optionsList.forEach(option => {
        if (option.value === value){
          console.log(option.name)
          label = option.name
        }
      })
    }
    return label;
  }

}
