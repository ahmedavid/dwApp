import { Component } from '@angular/core';
import {IonicPage, MenuController, NavController} from 'ionic-angular';
import { Storage } from '@ionic/storage';
import {DataService} from "../../providers/data-service/data-service";
import {HomePage} from "../home/home";

@IonicPage()

@Component({
  selector: 'page-intro',
  templateUrl: 'intro.html',
})
export class IntroPage {

  lang:string;
  selected=false;

  constructor(
    private dataService:DataService,
    private navCtrl:NavController,
    private storage:Storage,
    private menuCtrl:MenuController
  ) {
    this.menuCtrl.enable(false, 'menu');
    this.dataService.ModulesObservable.subscribe();
  }

  async save(){
    await this.storage.set("lang",this.lang);
    await this.storage.set("introShown",true);
    await this.dataService.setLanguage(this.lang)

    this.navCtrl.setRoot(HomePage)
  }

}
