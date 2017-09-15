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
    this.productos = this.af.list('/productos/') as FirebaseListObservable<Producto[]>
    return this.productos;
  }

  getProductoDetails(id){
    this.producto = this.af.object('/productos/'+id) as FirebaseObjectObservable<Producto[]>
    return this.producto;
  }

  addProducto(producto){
    let storageRef = firebase.storage().ref();
    for(let selectedFile of [(<HTMLInputElement>document.getElementById('productofoto')).files[0]]){
      if(selectedFile)
      {
        console.log("Se asigno imagen");        
        let path=`/${this.folder}/${selectedFile.name}`;
        let iRef = storageRef.child(path);
        iRef.put(selectedFile).then((snapshot) => {
          producto.foto = selectedFile.name;
          producto.path = path;
          return this.af.database.ref('productos/'+producto.id).set(producto);    
        });
      }
      else{
        console.log("No se asigno imagen");
        if(!producto.foto)
        {
          console.log("No tenia luego");
          producto.foto = "default_image.png";
          producto.path = "/productoimages/default_image.png";
          console.log("Se le asigno "+producto.foto);
        }
        else{
          console.log(producto.foto);
        }
        return this.af.database.ref('productos/'+producto.id).set(producto);            
      }
    }
  }

  deleteProducto(id){
    this.af.object('/productos/'+id).remove();
  }
}

interface Producto{
  id?:number;
  name?:string;
  descripcion?:string;
  precio?:number;
  foto?:string;
  tipo?:string;
  cantidad?:number;
  color?:string;
  dimensiones?:string;
  peso?:string;
  caracteristicas?:string;
}
