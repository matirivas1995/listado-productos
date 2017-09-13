import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { HttpModule }    from '@angular/http';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireModule } from 'angularfire2';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent }         from './app.component';
import { ProductosComponent }      from './productos.component';
import { ProductoDetailComponent }  from './producto-detail.component';
import { TopbarComponent }         from './topbar.component';

import { LoginComponent } from './login.component';
import { LoginGuard } from './login.guard';
import { NoLoginGuard } from './no-login.guard';

import {ColorPickerModule} from 'angular4-color-picker';

import { FirebaseService }          from './services/firebase.service';

import { CartService }          from './services/cart.service';

import * as firebase from 'firebase';
import { PortalComponent } from './portal/portal.component';

import { CartBaseComponent } from './cart-base.component';
import { CartPopupComponent } from './cart-popup.component';


export const firebaseConfig = {
  apiKey: "AIzaSyBTGY08NdYQq6BuT2JgjuYo4QTnAYm8IJ0",
  authDomain: "productos-angular.firebaseapp.com",
  databaseURL: "https://productos-angular.firebaseio.com",
  projectId: "productos-angular",
  storageBucket: "productos-angular.appspot.com",
  messagingSenderId: "837986261668"
  }

firebase.initializeApp(firebaseConfig);

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(firebaseConfig,'listado-prodctos'),
    AngularFireDatabaseModule,
    ColorPickerModule
  ],
  declarations: [
    AppComponent,
    ProductoDetailComponent,
    ProductosComponent,
    LoginComponent,
    TopbarComponent,
    CartPopupComponent,
    PortalComponent
  ],
  providers: [ LoginGuard, NoLoginGuard, FirebaseService ,CartService],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
