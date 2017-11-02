import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import * as firebase from 'firebase';

@Injectable()
export class FirebaseService {
  productos:FirebaseListObservable<any[]>;
  producto:FirebaseObjectObservable<any[]>;
  ventas:FirebaseListObservable<any[]>;
  folder:any;
  pro:Producto;

  constructor(private af: AngularFireDatabase) {
    this.folder = 'productoimages';
   }

  getVentas(){
    this.ventas = this.af.list('/ventas/') as FirebaseListObservable<Venta[]>
    return this.ventas;
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
    let path=["","","","",""];
    let foto=["","","","",""];
    for(let selectedFiles of [(<HTMLInputElement>document.getElementById('productofoto')).files]){
      //si no se subio ninguna imagen al formulario
      if(selectedFiles.item(0)===null){
        //si el producto no tenia luego ninguna foto antes
        if(!producto.foto) 
        {
          path[0]="/productoimages/default_image.png";
          foto[0]="default_image.png";
          producto.foto = foto;
          producto.path = path;
        }
        return this.af.database.ref('productos/'+producto.id).set(producto);        
      }
      //si se subieron archivos de imagen en el formulario
      else{
        //por cada archivo que se subio
        for(let i=0 ; i<selectedFiles.length ; i++){
          //path de la imagen relativo a la base de datos
          path[i]=`/${this.folder}/${selectedFiles.item(i).name}`;
          //nombre del archivo que contiene la imagen del producto
          foto[i]=selectedFiles.item(i).name;
          let iRef = storageRef.child(path[i]);
          iRef.put(selectedFiles.item(i)).then((snapshot) => {  
            //le agrega al producto los vectores que contienen los nombres de las imagenes y los paths
            producto.foto = foto;
            producto.path = path;
            return this.af.database.ref('productos/'+producto.id).set(producto);  
          });      
        }
      }
    }
  }

  deleteProducto(id){
    this.af.object('/productos/'+id).remove();
  }

  updateProducto(id,pro){
    this.af.object('/productos/'+id).update(pro);
  }

}

interface Producto{
  id?:number;
  name?:string;
  descripcion?:string;
  precio?:number;
  foto?:string[];
  path?:string[];
  tipo?:string;
  cantidad?:number;
  color?:string;
  dimensiones?:string;
  peso?:string;
  caracteristicas?:string;
}

interface Venta{
  id?:number;
  fecha?:number;
  items?:Producto[];
  total?:number;
}
