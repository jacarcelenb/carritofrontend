import { Pipe, PipeTransform } from '@angular/core';
import { ModelProductos } from '../model/model.productos';

@Pipe({
  name: 'filterProductos'
})
export class FilterProductosPipe implements PipeTransform {

  transform(value: ModelProductos[], search: string = '', page: number = 0): any {
    // console.log(page);

    const array = [];
    if (search.length == 0) {
      array.push(value.slice(page, page + 5));
      array.push(value.length)

      return array;
    }

    const filteredProductos = value.filter(productos => productos.pro_nombre.toLowerCase().includes(search.toLowerCase()));

    array.push(filteredProductos.slice(page, page + 5));
    array.push(filteredProductos.length)
    return array;
  }

}
