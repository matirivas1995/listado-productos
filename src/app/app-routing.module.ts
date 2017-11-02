import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PortalComponent }      from './portal/portal.component';
import { LoginComponent }       from './login/login.component';
import { AdminComponent }       from './admin/admin.component';
import { LoginGuard }           from './guard/login.guard';
import { AdminGuard }           from './guard/admin.guard';


const routes: Routes = [
  { path: '', redirectTo: '/portal', pathMatch: 'full' },
  { path: 'login',     component: LoginComponent },
  { path: 'portal',     component: PortalComponent, canActivate: [LoginGuard] },
  { path: 'admin',     component: AdminComponent },  
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ],
  providers: [ AdminGuard, LoginGuard ]
})
export class AppRoutingModule {}
