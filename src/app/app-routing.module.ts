import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PortalComponent } from './portal/portal.component';
import { LoginComponent } from './login.component';
import { LoginGuard } from './login.guard';
import { NoLoginGuard } from './no-login.guard';



const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login',     component: LoginComponent, canActivate: [NoLoginGuard] },
  { path: 'portal',     component: PortalComponent, canActivate: [LoginGuard] },  
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
