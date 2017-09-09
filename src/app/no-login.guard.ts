import { Injectable, Component }             from '@angular/core';
import { CanActivate,ActivatedRouteSnapshot, RouterStateSnapshot, Router }    from '@angular/router';
import { Observable }     from 'rxjs/Observable';

@Injectable()
export class NoLoginGuard implements CanActivate {
    constructor(private router: Router){}
  canActivate(
    next:  ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean{

    if(localStorage.getItem('usuario') === null){
        return true;
    }
    else{
        this.router.navigate(['/productos']);        
        return false;
    }
  }
}