import { Component } from '@angular/core';
import {NavController} from 'ionic-angular';
import {HomePage} from "../home/home";

@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {

  constructor(private navCtrl: NavController) {

  }
}
