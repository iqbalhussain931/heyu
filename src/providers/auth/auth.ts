import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../../app/models/user';
import { AngularFireAuth } from 'angularfire2/auth';

/*
  Generated class for the AuthProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthProvider {

  constructor(
    public http: HttpClient,
    private afAuth: AngularFireAuth,
  ) {
    console.log('Hello AuthProvider Provider');
  }

  async login(user: User) {
    try{
      const result = await this.afAuth.auth.signInWithEmailAndPassword(user.email, user.password);
      this.setLoggedIn(user);
      return result;
    }
    catch(e) {
      return this.authErrors(e);
    }
  }

  async register(user: User) {
    try{
      const result = await this.afAuth.auth.createUserWithEmailAndPassword(user.email, user.password);
      this.afAuth.authState.subscribe((data) => {
        data.updateProfile({
          displayName: user.name,
          photoURL: ''
        });
      });
      return result;
    }
    catch(e) {
      return this.authErrors(e);
    }
  }

  userLoggedIn() {
    if (localStorage.getItem("loggedIn") != null && localStorage.getItem("loggedIn") != 'true') {
      return true;
    }else{
      return false;
    }
  }

  setLoggedIn(user: User): boolean {
    if (localStorage.getItem("loggedIn") == null) {
      localStorage.setItem('loggedIn', 'true');
      localStorage.setItem('user_name', user.name);
      localStorage.setItem('user_email',user.email);
      return true;
    }
    return false;
  }

  authErrors(error) {
    let message: String = '';
    console.log(error.code);
    switch(error.code) {
      case 'auth/user-not-found': {
        message = 'User Not Found';
        break;
      }
      case 'auth/wrong-password': {
        message = 'Incorrect Password';
        break;
      }
      case 'auth/weak-password': {
        message = 'Password Not Strong';
        break;
      }
      case 'auth/argument-error': {
        message = 'Incorrect Email or Password';
        break;
      }
      case 'auth/email-already-in-use': {
        message = 'Email Already In Use';
        break;
      }
      case 'auth/too-many-requests': {
        message = 'Too Many Request Try After 5 Minutes';
        break;
      }
      case 'auth/user-token-expired': {
        message = 'Token Expried';
        break;
      }
      case 'auth/user-disabled': {
        message = 'Account Is Disabled, Please Contact Support';
        break;
      }
      case 'auth/operation-not-allowed': {
        message = 'Operation Not Allowed';
        break;
      }
      case 'auth/web-storage-unsupported': {
        message = 'Web Stroage Not Supported';
        break;
      }
      default: {
        message = 'Try Again';
        break;
      }
    }
    return message;
  }

}
