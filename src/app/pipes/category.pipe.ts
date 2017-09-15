import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class CategoryPipe implements PipeTransform {

  transform(productos: any, pipeCategory: any): any {
    //check
    if (pipeCategory === undefined) return productos;
    //return filter
    return productos.filter(function(producto){
      if (producto.tipo.toLowerCase().includes(pipeCategory.toLowerCase()))
      return 1;
      else {return 0;}
    })
  }

}