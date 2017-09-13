import { Component, OnInit } from '@angular/core';
import { FirebaseService }          from '../services/firebase.service';
import * as firebase from 'firebase';


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
      this.productos = productos;
      this.productos.forEach(element => {
        let storageRef= firebase.storage().ref();
        let spaceRef= storageRef.child(element.path);        
        storageRef.child(element.path).getDownloadURL().then((url) => {
          element.url = url;
          console.log(element);

        }).catch((error) => {
          console.log(error);
        });
      });
    });
  }


}
