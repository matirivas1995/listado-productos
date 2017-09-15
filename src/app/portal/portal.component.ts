import { Component, OnInit } from '@angular/core';
import { FirebaseService }          from '../services/firebase.service';
import { CartService }         from '../services/cart.service';
import * as firebase from 'firebase';
import { CategoryPipe } from '../pipes/category.pipe'


@Component({
  selector: 'app-portal',
  templateUrl: './portal.component.html',
  styleUrls: ['./portal.component.css']
})
export class PortalComponent implements OnInit {
  mostrarGrid=true;
  mostrarLista=false;
  mostrarFormulario=false;
  productos:any;
  nuevoProducto = {  id: null, name:null,  descripcion: null, price: null, foto:null, tipo: null, cantidad:null, color: '#FFFFFF', dimensiones:null, peso:null, caracteristicas:null  };  
  quantity: number = 1;  
  constructor(private firebaseService:FirebaseService, private cartService:CartService) { }

  verGrid(){
    this.mostrarGrid=true;
    this.mostrarLista=false;
  }

  verLista(){
    this.mostrarGrid=false;
    this.mostrarLista=true;
  }

  verFormulario(){
    this.mostrarFormulario=true;
  }

  limpiarFormulario(){
    this.nuevoProducto = {  id: null, name:null,  descripcion: null, price: null, foto:null, tipo: null, cantidad:null, color: null, dimensiones:null, peso:null, caracteristicas:null  };
  }

  createProducto(){
    this.firebaseService.addProducto(this.nuevoProducto);
    this.mostrarFormulario=false;
    this.limpiarFormulario();
  }

  delete(producto): void {
    this.firebaseService.deleteProducto(producto.id);    
  }

  viewProducto(producto){
    this.nuevoProducto=producto;
    this.mostrarFormulario=true;   
  }

  addToCart(producto){
    if(this.quantity) this.cartService.addToCart({producto,quantity:this.quantity})
  }

  cancel(){
    this.limpiarFormulario();
    this.mostrarFormulario=false;
  }

  myFunction() {
    var popup = document.getElementById("myPopup");
    popup.classList.toggle("show");
  }

  ngOnInit() {
    this.firebaseService.getProductos().subscribe(productos => {
      this.productos = productos;
      this.productos.forEach(element => {
        let storageRef= firebase.storage().ref();
        let spaceRef= storageRef.child(element.path);        
        storageRef.child(element.path).getDownloadURL().then((url) => {
          element.url = url;
          console.log(element);

        }).catch((error) => {
          console.log(error);
        });
      });
    });
  }


}
