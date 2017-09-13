import { Component, OnInit } from '@angular/core';
import { FirebaseService }          from '../services/firebase.service'


@Component({
  selector: 'app-portal',
  templateUrl: './portal.component.html',
  styleUrls: ['./portal.component.css']
})
export class PortalComponent implements OnInit {
  productos:any;
  constructor(private firebaseService:FirebaseService) { }

  ngOnInit() {
    this.firebaseService.getProductos().subscribe(productos => {
      console.log(productos);
      this.productos = productos;
    })
  }

}
