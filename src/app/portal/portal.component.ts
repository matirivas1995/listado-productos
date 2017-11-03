import { Component, OnInit } from '@angular/core';
import { FirebaseService }          from '../services/firebase.service';
import { CartService }         from '../services/cart.service';
import * as firebase from 'firebase';
import { CategoryPipe } from '../pipes/category.pipe';
import { FilterPipe } from '../pipes/filter.pipe';
import { Router }               from '@angular/router';



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
  nuevoProducto = {  id: null, name:null,  descripcion: null, precio: null, foto:null, tipo: null, cantidad:null, color: '#FFFFFF', dimensiones:null, peso:null, caracteristicas:null  };  
  quantity: number = 1;  
  constructor(private firebaseService:FirebaseService, private cartService:CartService,private router: Router) { }

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
    this.nuevoProducto = {  id: null, name:null,  descripcion: null, precio: null, foto:null, tipo: null, cantidad:null, color: '#FFFFFF', dimensiones:null, peso:null, caracteristicas:null  };
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

  addToCart(producto,cant){
    console.log(cant);
    this.cartService.addToCart({producto,quantity:this.quantity})
  }

  cancel(){
    this.limpiarFormulario();
    this.mostrarFormulario=false;
  }

  mostrarPopup() {
    var popup = document.getElementById("myPopup");
    popup.classList.toggle("show");
    this.quantity = 1;      
  }

  administrar(){
    this.router.navigate(['/admin'])
  }

  ngOnInit() {
    this.firebaseService.getProductos().subscribe(productos => {
      this.productos = productos;
      //le agrega a cada producto la url de su imagen para ser usada en el HTML 
      this.productos.forEach(element => {
        let storageRef= firebase.storage().ref();
        let spaceRef= storageRef.child(element.path[0]);       
        storageRef.child(element.path[0]).getDownloadURL().then((url) => {
          element.url = url;
        }).catch((error) => {
          console.log(error);
        });
      });
    });
    console.log(this.productos);
  }

}
