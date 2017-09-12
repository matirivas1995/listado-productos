import { Component, OnInit } from '@angular/core';
import { Router }            from '@angular/router';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database'
import { FirebaseService }          from './services/firebase.service'
import { Producto }                from './producto';
import { ProductoService }         from './producto.service';
import * as firebase from 'firebase';


@Component({
  selector: 'my-productos',
  templateUrl: './productos.component.html',
  styleUrls: [ './productos.component.css' ]
})
export class ProductosComponent implements OnInit {
  productos: FirebaseListObservable<any[]>;
  selectedProducto: Producto;
  nuevoProducto = {  id: null, name:null,  descripcion: null, price: null, foto:null, tipo: null, cantidad:null, color: null, dimensiones:null, peso:null, caracteristicas:null  };

  mostrarTabla:boolean=true;
  mostrarFormulario:boolean=false;
  filtrarProducto:boolean=false;
  

  constructor(
    private productoService: ProductoService,
    private router: Router,
    public af : AngularFireDatabase,
    private firebaseService:FirebaseService, ) { 
      this.productos=af.list('/productos');
    }

  getProductos(): void {}

  limpiarFormulario(){
    this.nuevoProducto = {  id: null, name:null,  descripcion: null, price: null, foto:null, tipo: null, cantidad:null, color: null, dimensiones:null, peso:null, caracteristicas:null  };
  }

  addProducto(){
    this.mostrarFormulario=true;
    this.mostrarTabla=false;
  }

  //Pone los datos del formulario para editar
  viewProducto(nuevoProducto){
    this.nuevoProducto=nuevoProducto;
    this.mostrarFormulario=true;   
    this.mostrarTabla=false; 
  }

  createProducto(){
    //this.af.database.ref('productos/'+this.nuevoProducto.id).set(this.nuevoProducto);
    this.firebaseService.addProducto(this.nuevoProducto);
    this.mostrarFormulario=false;
    this.limpiarFormulario();
    this.mostrarTabla=true;
  }

  cancel(){
    this.limpiarFormulario();
    this.mostrarFormulario=false;
    this.mostrarTabla=true;    
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
