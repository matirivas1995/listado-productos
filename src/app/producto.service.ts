import { Injectable }    from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Producto } from './producto';

@Injectable()
export class ProductoService {

  private headers = new Headers({'Content-Type': 'application/json'});
  private productoUrl = 'api/productos';  // URL to web api

  constructor(private http: Http) { }

  getProductos(): Promise<Producto[]> {
    return this.http.get(this.productoUrl)
               .toPromise()
               .then(response => response.json().data as Producto[])
               .catch(this.handleError);
  }


  getProducto(id: number): Promise<Producto> {
    const url = `${this.productoUrl}/${id}`;
    return this.http.get(url)
      .toPromise()
      .then(response => response.json().data as Producto)
      .catch(this.handleError);
  }

  delete(id: number): Promise<void> {
    const url = `${this.productoUrl}/${id}`;
    return this.http.delete(url, {headers: this.headers})
      .toPromise()
      .then(() => null)
      .catch(this.handleError);
  }

  create(name: string): Promise<Producto> {
    return this.http
      .post(this.productoUrl, JSON.stringify({name: name}), {headers: this.headers})
      .toPromise()
      .then(res => res.json().data as Producto)
      .catch(this.handleError);
  }

  update(producto: Producto): Promise<Producto> {
    const url = `${this.productoUrl}/${producto.id}`;
    return this.http
      .put(url, JSON.stringify(producto), {headers: this.headers})
      .toPromise()
      .then(() => producto)
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}

