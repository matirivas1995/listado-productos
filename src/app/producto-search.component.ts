import { Component, OnInit } from '@angular/core';
import { Router }            from '@angular/router';

import { Observable }        from 'rxjs/Observable';
import { Subject }           from 'rxjs/Subject';

// Observable class extensions
import 'rxjs/add/observable/of';

// Observable operators
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';

import { ProductoSearchService } from './producto-search.service';
import { Producto } from './producto';

@Component({
  selector: 'producto-search',
  templateUrl: './producto-search.component.html',
  styleUrls: [ './producto-search.component.css' ],
  providers: [ProductoSearchService]
})
export class ProductoSearchComponent implements OnInit {
  productos: Observable<Producto[]>;
  private searchTerms = new Subject<string>();

  constructor(
    private productoSearchService: ProductoSearchService,
    private router: Router) {}

  // Push a search term into the observable stream.
  search(term: string): void {
    this.searchTerms.next(term);
  }

  ngOnInit(): void {
    this.productos = this.searchTerms
      .debounceTime(300)        // wait 300ms after each keystroke before considering the term
      .distinctUntilChanged()   // ignore if next search term is same as previous
      .switchMap(term => term   // switch to new observable each time the term changes
        // return the http search observable
        ? this.productoSearchService.search(term)
        // or the observable of empty heroes if there was no search term
        : Observable.of<Producto[]>([]))
      .catch(error => {
        // TODO: add real error handling
        console.log(error);
        return Observable.of<Producto[]>([]);
      });
  }

  gotoDetail(producto: Producto): void {
    let link = ['/detail', producto.id];
    this.router.navigate(link);
  }
}
