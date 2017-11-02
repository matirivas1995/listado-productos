import { Component }          from '@angular/core';
import { Router }             from '@angular/router';
import { AuthService }    from './services/auth.service';



@Component({
  selector: 'my-app',
  templateUrl:'./app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {

  title = 'Lista de Productos';

  constructor(private router: Router, private auth:AuthService){}

  sesionIniciada():boolean{
    if(localStorage.getItem('usuario') === null){
      return false;
    }
    else{
      return true;
    }
  }

  logout(){
    localStorage.removeItem('usuario');
    this.router.navigate(['']);
  }
}
