import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { User } from '../../app/models/user';
import { RegisterPage } from '../register/register';
import { AuthProvider } from '../../providers/auth/auth';
import { HomePage } from '../home/home';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  loginForm: FormGroup;
  user = {} as User;

  constructor(
    private form: FormBuilder,
    public navCtrl: NavController,
    private authService : AuthProvider,
    public navParams: NavParams,
    private toastContrller: ToastController
    ) {
      let emailRegex = '^[a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,15})$';
      this.loginForm = form.group({
          'email': [null, Validators.compose([Validators.required, Validators.pattern(emailRegex)])],
          'password': [null, Validators.compose([Validators.required, Validators.minLength(5)])],
      });
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad LoginPage');
  }

  ionViewWillLoad() {
    let loginStatus = this.authService.userLoggedIn();
    if(!loginStatus) { this.navCtrl.setRoot(HomePage); }
  }
  // ngOnInit() {
  //   let loginStatus = this.authService.userLoggedIn();
  //   if(!loginStatus) { this.navCtrl.setRoot(HomePage); }
  // }

  showPassword() {
    console.log('asd');
  }

  goToSignupPage() {
    this.navCtrl.push(RegisterPage);
  }

  onLogin(fromData) {
    this.user.email = fromData.email;
    this.user.password = fromData.password;
    this.login(this.user);
  }

  login(user) {
    let authenticated = this.authService.login(user);
    authenticated.then(data => {
      if(data && data.email && data.uid){
        let loginToast = this.toastContrller.create({
          message: `Welcome ${data.displayName}`,
          duration: 2000
        });
        loginToast.present();
        this.navCtrl.setRoot(HomePage);
      }else{
        let loginFailedToast = this.toastContrller.create({
          message: `Login Failed - ${data}`,
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
