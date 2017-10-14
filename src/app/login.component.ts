import { Component, OnInit }    from '@angular/core';
import { NgForm }               from '@angular/forms';
import { Router }               from '@angular/router';
import { FirebaseService }      from './services/firebase.service';
import { AuthService }          from './services/auth.service';


@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
  })
  export class LoginComponent implements OnInit{
      constructor(private authService:AuthService, private firebaseService:FirebaseService, private router: Router){}
      ngOnInit(){}

      login(form: NgForm){
          this.authService.firebaseLogin(form.value.username, form.value.password);
          //this.router.navigate(['/portal']);
                   
      }
    }