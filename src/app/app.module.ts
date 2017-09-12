import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { HttpModule }    from '@angular/http';

import { AngularFireDatabaseModule } from 'angularfire2/database'
import { AngularFireModule } from 'angularfire2'


import { AppRoutingModule } from './app-routing.module';

// Imports for loading & configuring the in-memory web api
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService }  from './in-memory-data.service';

import { AppComponent }         from './app.component';
import { ProductosComponent }      from './productos.component';
import { ProductoDetailComponent }  from './producto-detail.component';
import { ProductoService }          from './producto.service';
import { ProductoSearchComponent }  from './producto-search.component';

import { LoginComponent } from './login.component';
import { LoginGuard } from './login.guard';
import { NoLoginGuard } from './no-login.guard';

import {ColorPickerModule} from 'angular4-color-picker';

import { FirebaseService }          from './services/firebase.service'

export const firebaseConfig = {
  apiKey: "AIzaSyBTGY08NdYQq6BuT2JgjuYo4QTnAYm8IJ0",
  authDomain: "productos-angular.firebaseapp.com",
  databaseURL: "https://productos-angular.firebaseio.com",
  projectId: "productos-angular",
  storageBucket: "productos-angular.appspot.com",
  messagingSenderId: "837986261668"
  }

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    InMemoryWebApiModule.forRoot(InMemoryDataService),
    AppRoutingModule,
    AngularFireModule.initializeApp(firebaseConfig,'listado-prodctos'),
    AngularFireDatabaseModule,
    ColorPickerModule
  ],
  declarations: [
    AppComponent,
    ProductoDetailComponent,
    ProductosComponent,
    ProductoSearchComponent,
    LoginComponent
  ],
  providers: [ ProductoService, LoginGuard, NoLoginGuard, FirebaseService ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
