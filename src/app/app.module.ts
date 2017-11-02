import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { HttpModule }    from '@angular/http';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireModule } from 'angularfire2';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent }         from './app.component';
import { TopbarComponent }         from './topbar.component';

import { LoginComponent } from './login/login.component';
import { LoginGuard }     from './guard/login.guard';
import { AdminGuard }      from './guard/admin.guard';

import {ColorPickerModule} from 'angular4-color-picker';

import { FirebaseService }      from './services/firebase.service';
import { AuthService }          from './services/auth.service';
import { CartService }          from './services/cart.service';

import * as firebase from 'firebase';
import { PortalComponent } from './portal/portal.component';

import { CartBaseComponent } from './cart-base.component';
import { CartPopupComponent } from './cart-popup.component';

import { BootstrapModalModule } from 'ng2-bootstrap-modal';
import { FilterPipe } from './pipes/filter.pipe';
import { CategoryPipe } from './pipes/category.pipe';
import { AdminComponent } from './admin/admin.component';

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
    AngularFireAuthModule,

    ColorPickerModule,
    BootstrapModalModule
  ],
  declarations: [
    AppComponent,
    LoginComponent,
    TopbarComponent,
    CartPopupComponent,
    PortalComponent,
    FilterPipe,
    CategoryPipe,
    AdminComponent,
  ],
  providers: [ AdminGuard,LoginGuard,AuthService, FirebaseService ,CartService],
  //Don't forget to add the component to entryComponents section
  entryComponents: [ ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
