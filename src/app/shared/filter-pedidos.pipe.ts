import { Pipe, PipeTransform } from '@angular/core';
import { ModelPedido } from '../model/model.pedido';

@Pipe({
  name: 'filterPedidos'
})
export class FilterPedidosPipe implements PipeTransform {

  transform(value: ModelPedido[], search: string = '', page: number = 0): any {
    // console.log(page);

    const array = [];
    if (search.length == 0) {
      array.push(value.slice(page, page + 5));
      array.push(value.length)
      // console.log(array);

      return array;
    }

    const filteredPedidos = value.filter(pedido => pedido.ped_cab_codigo.toLowerCase().includes(search.toLowerCase()));

    array.push(filteredPedidos.slice(page, page + 5));
    array.push(filteredPedidos.length)
    // console.log(array);
    return array;

    // const resultPosts = [];
    // for (const post of value) {
    //   if (post.ped_cab_codigo.toLowerCase().indexOf(search.toLowerCase()) > -1) {
    //     resultPosts.push(post);
    //   }
    // }
    // return resultPosts;
  }

}
