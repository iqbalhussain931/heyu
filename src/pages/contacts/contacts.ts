import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Platform } from 'ionic-angular';
import { Contacts, ContactFieldType, ContactFindOptions } from '@ionic-native/contacts';

@IonicPage()
@Component({
  selector: 'page-contacts',
  templateUrl: 'contacts.html',
})
export class ContactsPage {
  //public allContacts: any;
  public fakeArray = new Array(3);
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public cont: Contacts,
    public plt: Platform,
  ) {
    // if (this.plt.is('cordova')) {
    //   cont.find(['displayName', 'name', 'phoneNumbers', 'emails'], {filter: "", multiple: true})
    //   .then(data => {
    //     this.allContacts = data
    //   });
    // } else {
    //   console.log("You're testing in browser");
    // }

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ContactsPage');
  }

}
