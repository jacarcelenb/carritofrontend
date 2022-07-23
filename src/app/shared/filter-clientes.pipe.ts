import { Pipe, PipeTransform } from '@angular/core';
import { ModelCliente } from '../model/model.cliente';

@Pipe({
  name: 'filterClientes'
})
export class FilterClientesPipe implements PipeTransform {

  transform(value: ModelCliente[], cedula: string="", page:number=0): any {

    const array = [];
    if (cedula.length == 0) {
      array.push(value.slice(page, page + 5));
      array.push(value.length)
      // console.log(array);

      return array;
    }

    const filteredClientes = value.filter(cliente => cliente.per_cedula.toLowerCase().includes(cedula.toLowerCase()));

    array.push(filteredClientes.slice(page, page + 5));
    array.push(filteredClientes.length)
    // console.log(array);
    return array;

    
  }

}
