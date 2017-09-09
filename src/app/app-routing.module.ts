import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProductosComponent }      from './productos.component';
import { ProductoDetailComponent }  from './producto-detail.component';
import { LoginComponent } from './login.component';
import { LoginGuard } from './login.guard';
import { NoLoginGuard } from './no-login.guard';



const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'detail/:id', component: ProductoDetailComponent, canActivate: [LoginGuard] },
  { path: 'productos',     component: ProductosComponent, canActivate: [LoginGuard] },
  { path: 'login',     component: LoginComponent, canActivate: [NoLoginGuard] },
  
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
