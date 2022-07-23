import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value: any[] , filterString: string , propName:string): any[] {
    const result: any = [];
    if (!value || filterString==''|| propName==='') {
      return value;
    }
    console.log(propName)
    console.log(value)
    value.forEach((a:any)=>{
      console.log(a[propName])

      if (a[propName].trim().toLowerCase().includes(filterString.toLowerCase())) {
        result.push(a);
      }
    })
    return result;
  }

}
