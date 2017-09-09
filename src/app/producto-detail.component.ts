import 'rxjs/add/operator/switchMap';
import { Component, OnInit }        from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Location }                 from '@angular/common';

import { Producto }        from './producto';
import { ProductoService } from './producto.service';

@Component({
  selector: 'producto-detail',
  templateUrl: './producto-detail.component.html',
  styleUrls: [ './producto-detail.component.css' ]
})
export class ProductoDetailComponent implements OnInit {
  producto: Producto;

  constructor(
    private productoService: ProductoService,
    private route: ActivatedRoute,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.route.paramMap
      .switchMap((params: ParamMap) => this.productoService.getProducto(+params.get('id')))
      .subscribe(producto => this.producto = producto);
  }

  save(): void {
    this.productoService.update(this.producto)
      .then(() => this.goBack());
  }

  goBack(): void {
    this.location.back();
  }
}
