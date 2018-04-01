import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { User } from '../../app/models/user';
import { AngularFireAuth } from 'angularfire2/auth';
import { AuthProvider } from '../../providers/auth/auth';
import { HomePage } from '../home/home';

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  registerForm: FormGroup;
  user = {} as User;

  constructor(
    private form: FormBuilder,
    private afAuth: AngularFireAuth,
    public navCtrl: NavController,
    private authService : AuthProvider,
    public navParams: NavParams,
    private toastContrller: ToastController
    ) {
      let emailRegex = '^[a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,15})$';
      this.registerForm = form.group({
          'name': [null, Validators.compose([Validators.required, Validators.minLength(5)])],
          'email': [null, Validators.compose([Validators.required, Validators.pattern(emailRegex)])],
          'password': [null, Validators.compose([Validators.required, Validators.minLength(5)])],
      });
  }

  ionViewDidLoad() {

  }

  goToSigninPage() {
    this.navCtrl.pop();
  }

  onRegister(fromData) {
    this.user.name = fromData.name;
    this.user.email = fromData.email;
    this.user.password = fromData.password;
    this.register(this.user);
  }

  register(user: User) {
    let authenticated = this.authService.register(user);
    authenticated.then(data => {
      if(data && data.email && data.uid){
        let loginToast = this.toastContrller.create({
          message: `Welcome ${data.email}`,
          duration: 2000
        });
        loginToast.present();
        this.navCtrl.setRoot(HomePage);
      }else{
        let loginFailedToast = this.toastContrller.create({
          message: `Register Failed - ${data}`,
          duration: 3000
        });
        loginFailedToast.present();
      }
    }, error => {
      let loginFailedToast = this.toastContrller.create({
        message: error,
        duration: 2000
      });
      loginFailedToast.present();
    });
  }

}
