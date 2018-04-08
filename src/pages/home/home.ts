import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { MessagesPage } from '../messages/messages';
import { GroupsPage } from '../groups/groups';
import { ContactsPage } from '../contacts/contacts';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public tab1;
  public tab2;
  public tab3;
  constructor(public navCtrl: NavController) {
    console.log('Loaded Home');
    this.tab1 = MessagesPage;
    this.tab2 = GroupsPage;
    this.tab3 = ContactsPage;
  }

}
