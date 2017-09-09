import { Injectable } from '@angular/core';
import { Http }       from '@angular/http';

import { Observable }     from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { Producto }           from './producto';

@Injectable()
export class ProductoSearchService {

  constructor(private http: Http) {}

  search(term: string): Observable<Producto[]> {
    return this.http
               .get(`api/productos/?name=${term}`)
               .map(response => response.json().data as Producto[]);
  }
}
