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
      if (producto.name.toLowerCase().includes(term.toLowerCase()) || producto.descripcion.toLowerCase().includes(term.toLowerCase()))
      return 1;
      else {return 0;}
    })
  }

}
