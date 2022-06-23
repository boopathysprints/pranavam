import { Injectable } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  isAuth : boolean = false;
  userData: any;
  isAuthContent = new BehaviorSubject<any>(this.isAuth);    
  isAuthExpose = this.isAuthContent.asObservable();   

  constructor(private angularFireAuth: AngularFireAuth, private _router: Router) {
    this.angularFireAuth.authState.subscribe((user) => {
      if (user) {
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
        this.isAuthContent.next(true);
        this._router.navigate(['mv/dashboard']);
      }else {
        localStorage.removeItem('user');
        this.isAuthContent.next(false);
      }
    });
  }

  isAuthenticated() {
    const user = JSON.parse(localStorage.getItem('user')!);
    return user != null;
  }

  /* Sign in */
  signIn(email, password) {
    this.angularFireAuth
      .signInWithEmailAndPassword(email, password)
      .then(res => {

      })
      .catch(err => {
        console.log('Something is wrong:', err.message);
      });
  }

  /* Sign out */
  SignOut() {
    this.angularFireAuth.signOut().then(() => {
      localStorage.removeItem('user');
      this._router.navigate(['login']);
    });
  }
}
