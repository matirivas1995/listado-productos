import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms'
import { Router } from '@angular/router'

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
  })
  export class LoginComponent implements OnInit{
      constructor(private router: Router){}
      ngOnInit(){}

      login(form: NgForm){
          console.log(form.value);

          if(form.value.username==='admin' && form.value.password==='admin'){
              localStorage.setItem('usuario',form.value.username);
              this.router.navigate(['/portal']);
          }
      }
    }