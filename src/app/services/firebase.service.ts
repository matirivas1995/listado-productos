import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import * as firebase from 'firebase';

@Injectable()
export class FirebaseService {
  productos:FirebaseListObservable<any[]>;
  producto:FirebaseObjectObservable<any[]>;
  folder:any;

  constructor(private af: AngularFireDatabase) {
    this.folder = 'productoimages';
   }

  getProductos(){
    this.productos = this.af.list('/productos/') as FirebaseListObservable<Producto>
    return this.productos;
  }

  getProductoDetails(id){
    this.producto = this.af.object('/productos/'+id) as FirebaseObjectObservable<Producto>
    return this.producto;
  }

  addProducto(producto){
    console.log("Paso1");
    let storageRef = firebase.storage().ref();
    console.log("Paso2");
    for(let selectedFile of [(<HTMLInputElement>document.getElementById('productofoto')).files[0]]){
      console.log(selectedFile.name);
      console.log("Paso3");
      let path=`/${this.folder}/${selectedFile.name}`;
      let iRef = storageRef.child(path);
      console.log("Paso4");
      iRef.put(selectedFile).then((snapshot) => {
        producto.foto = selectedFile.name;
        producto.path = path;
        return this.af.database.ref('productos/'+producto.id).set(producto);    
        //return this.productos.push(producto);
      });
    }
  }
}

interface Producto{
  id?:number;
  name?:string;
  descripcion?:string;
  price?:number;
  foto?:string;
  tipo?:string;
  cantidad?:number;
  color?:string;
  dimensiones?:string;
  peso?:string;
  caracteristicas?:string;
}
