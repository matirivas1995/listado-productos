import { Injectable }           from '@angular/core';
import { AngularFireDatabase }  from 'angularfire2/database';
import { AngularFireAuth }      from 'angularfire2/auth';
import { Router }               from '@angular/router';
import * as firebase            from 'firebase/app';
import {User}                   from '../user';

import { BehaviorSubject }     from 'rxjs/BehaviorSubject';
import { Observable }          from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/switchMap';


@Injectable()
export class AuthService {

  public isSignedInStream:Observable<boolean>;
  user: BehaviorSubject<User> = new BehaviorSubject(null);
  public displayNameStream:Observable<string>; 
  //para usar en el HTML {{authService.displayNameStream | async}}

  constructor(private afAuth:AngularFireAuth,
              private db:AngularFireDatabase,
              private router:Router) { 
      
      this.afAuth.authState
       .switchMap(auth => {
         if(auth) {
           //inicio sesion
           console.log("User is signed in as ", auth.email);
           return this.db.object('profile/'+auth.uid)
         } else {
           //no inicio sesion
           console.log("User is not signed in");
           return Observable.of(null)
         }
       })
       .subscribe(user => {
         this.user.next(user)
       });

       this.isSignedInStream = afAuth.authState
        .map<firebase.User,boolean>((user:firebase.User)=> {
          return user != null;
       });
       this.displayNameStream = this.afAuth.authState
        .map<firebase.User,string>((user:firebase.User)=> {
          if(user){
            return user.displayName;
          }
          return "";
        })
       
  }

  firebaseLogin(email, password){
    this.afAuth.auth.signInWithEmailAndPassword(email,password)
    .then(credential => {
      this.updateUser(credential);
      this.router.navigate(['/']);
    });
     
  }

  firebaseSignOut(){
    this.afAuth.auth.signOut();
    console.log("Finalizo sesion de Firebase");
    this.router.navigate(['/login']);    
  }

  private updateUser(authData){
    const userData = new User(authData)
    const ref = this.db.object('profile/'+authData.uid)
    ref.take(1)
      .subscribe(user => {
        if(!user.roles){
          console.log("No tiene rol")
          ref.update(userData)
        } else{
          console.log("Ya tiene rol")
          console.log(user.roles.usuario)
        }
      })
  }
}
