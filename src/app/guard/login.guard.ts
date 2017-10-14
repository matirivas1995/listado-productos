import { Injectable, Component }             from '@angular/core';
import { CanActivate,ActivatedRouteSnapshot, RouterStateSnapshot, Router }    from '@angular/router';
import { Observable }     from 'rxjs/Observable';
import { AuthService }    from '../services/auth.service';


@Injectable()
export class LoginGuard implements CanActivate {
    constructor(private auth:AuthService, private router: Router){}
  canActivate(
    next:  ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean{
        return this.auth.isSignedInStream.map<boolean, boolean>((isSignedIn:boolean)=>{
            if(!isSignedIn){
                console.log('ruteo bloqueado! No ha iniciado sesion');                
                this.router.navigate(['/login']);
            }
            return isSignedIn;
        })
  }
}