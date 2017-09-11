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
  nuevoProducto = {  id: null, name:null,  descripcion: null, price: null,  };

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

  addProducto(){
    this.agregarProducto=true;
  }

  viewProducto(nuevoProducto){
    this.nuevoProducto=nuevoProducto;
    this.agregarProducto=true;    
  }

  createProducto(){
      this.af.database.ref('productos/'+this.nuevoProducto.id).set(this.nuevoProducto);
      this.agregarProducto=false;
      this.nuevoProducto = {  id: null, name:null,  descripcion: null, price: null,  };
  }

  cancel(){
    this.nuevoProducto = {  id: null, name:null,  descripcion: null, price: null,  };    
    this.agregarProducto=false;    
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
