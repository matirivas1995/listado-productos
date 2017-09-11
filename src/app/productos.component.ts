import { Component, OnInit } from '@angular/core';
import { Router }            from '@angular/router';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database'

import { Producto }                from './producto';
import { ProductoService }         from './producto.service';

@Component({
  selector: 'my-productos',
  templateUrl: './productos.component.html',
  styleUrls: [ './productos.component.css' ]
})
export class ProductosComponent implements OnInit {
  productos: FirebaseListObservable<any[]>;
  selectedProducto: Producto;

  agregarProducto:boolean=false;
  filtrarProducto:boolean=false;

  constructor(
    private productoService: ProductoService,
    private router: Router,
    public af : AngularFireDatabase ) { 
      this.productos=af.list('/productos');
    }

  getProductos(): void {
  }

  add(id:number, name: string,desc:string,price:number,tipo:string): void {
    this.productos.push({
      descripcion:desc,
      id:id,
      name: name,
      price:price,
      tipo:tipo
    })
  }

  delete(producto: Producto): void {
    this.af.object('/productos/'+producto.id).remove();
  }

  ngOnInit(): void {
    this.getProductos();
  }

  onSelect(producto: Producto): void {
    this.selectedProducto = producto;
  }

  gotoDetail(): void {
    this.router.navigate(['/detail', this.selectedProducto.id]);
  }
  filter(val: string): void {
    this.af.list('/productos/tipos',{
      query: {
        equalTo: '3'
      }
    })
  }
}
