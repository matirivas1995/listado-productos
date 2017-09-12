import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';

@Injectable()
export class FirebaseService {
  productos:FirebaseListObservable<any[]>;
  producto:FirebaseObjectObservable<any[]>;
  constructor(private af: AngularFireDatabase) { }

  getProductos(){
    this.productos = this.af.list('/productos/') as FirebaseListObservable<Producto>
    return this.productos
  }

  getProductoDetails(id){
    this.producto = this.af.object('/productos/'+id) as FirebaseObjectObservable<Producto>
    return this.producto
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
