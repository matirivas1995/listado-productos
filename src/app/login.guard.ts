import { Injectable, Component }             from '@angular/core';
import { CanActivate,ActivatedRouteSnapshot, RouterStateSnapshot, Router }    from '@angular/router';
import { Observable }     from 'rxjs/Observable';

@Injectable()
export class LoginGuard implements CanActivate {
    constructor(private router: Router){}
  canActivate(
    next:  ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean{

    if(localStorage.getItem('usuario') === null){
        this.router.navigate(['/login']);
        return false;
    }
    else{
        return true;
    }
  }
}