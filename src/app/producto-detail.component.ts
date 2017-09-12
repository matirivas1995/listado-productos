import { Component, OnInit }        from '@angular/core';
import { FirebaseService }          from './services/firebase.service'
import { Router,ActivatedRoute, Params } from '@angular/router';



@Component({
  selector: 'producto-detail',
  templateUrl: './producto-detail.component.html',
  styleUrls: [ './producto-detail.component.css' ]
})
export class ProductoDetailComponent implements OnInit {
  id:any;
  producto:any;
  
  constructor(
    private firebaseService:FirebaseService,
    private router:Router,
    private route: ActivatedRoute,
  ) {  }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];

    this.firebaseService.getProductoDetails(this.id).subscribe(producto => {
      this.producto = producto;
      console.log(producto);
      
    });
  }

}
