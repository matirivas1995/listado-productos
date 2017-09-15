import { Component, OnInit } from '@angular/core';
import { Router }            from '@angular/router';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database'
import { FirebaseService }          from './services/firebase.service'
import { Producto }                from './producto';
import { CartService }         from './services/cart.service'
import * as firebase from 'firebase';
import { ConfirmComponent } from './confirm.component';
import { DialogService } from "ng2-bootstrap-modal";
import { FilterPipe } from './filter.pipe';

@Component({
  selector: 'my-productos',
  templateUrl: './productos.component.html',
  styleUrls: [ './productos.component.css' ]
})
@Component({
  selector: 'app',
  template: `
    <div class="container">
      <button class="btn btn-default" (click)=showConfirm()>Show confirm</button>
    </div>
  `,
  styleUrls: [ './popup.css' ]
})
export class ProductosComponent implements OnInit {
  productos: FirebaseListObservable<any[]>;
  selectedProducto: Producto;
  nuevoProducto = {  id: null, name:null,  descripcion: null, precio: null, foto:null, tipo: null, cantidad:null, color: '#FFFFFF', dimensiones:null, peso:null, caracteristicas:null  };
  cart:Producto[];
  

  mostrarTabla:boolean=true;
  mostrarFormulario:boolean=false;
  filtrarProducto:boolean=false;
  quantity: number = 1;

  
  showConfirm() {
    let disposable = this.dialogService.addDialog(ConfirmComponent, {
        title:'Confirm title', 
        message :'Confirm message'})
}

  constructor(
    private router: Router,
    public af : AngularFireDatabase,
    private dialogService:DialogService,
    private firebaseService:FirebaseService, 
    private cartService:CartService,) { 
      this.productos=af.list('/productos');
    }

  getProductos(): void {}

  limpiarFormulario(){
    this.nuevoProducto = {  id: null, name:null,  descripcion: null, precio: null, foto:null, tipo: null, cantidad:null, color: null, dimensiones:null, peso:null, caracteristicas:null  };
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

  addCart(producto: Producto): void {
    if(this.quantity) this.cartService.addToCart({producto,quantity:this.quantity})
  }

  filter(val: string): void {
    this.af.list('/productos/tipos',{
      query: {
        equalTo: '3'
      }
    })
  }
}
