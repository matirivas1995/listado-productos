import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(productos: any, term: any): any {
    //check
    if (term === undefined) return productos;
    //return filter
    return productos.filter(function(producto){
      return producto.name.toLowerCase().includes(term.toLowerCase());
    })
  }

}
