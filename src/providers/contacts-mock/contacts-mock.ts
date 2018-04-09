import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Contacts } from '@ionic-native/contacts';
import { Platform } from 'ionic-angular';

@Injectable()
export class ContactsMockProvider extends Contacts {

  public allContacts: any;

  public getAllContacts(){
    let plt : Platform;
    if (plt.is('cordova')) {
      this.find(['displayName', 'name', 'phoneNumbers', 'emails'], {filter: "", multiple: true})
      .then(data => {
        this.allContacts = data;
      });
    } else {
      console.log("You're testing in browser");
    }
  }

}
