import { Component } from '@angular/core';
import {IonicPage, MenuController, NavController, Platform} from 'ionic-angular';
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
    this.dataService.ModulesObservable.subscribe();

    this.storage.get('introShown')
      .then(result=>{
      console.log("INTRO:",result)
      if(result){

        this.navCtrl.setRoot(HomePage)
      }
      else{
        this.menuCtrl.enable(false, 'menu');

      }
    }).catch(err=>console.log(err))

  }


  async save(){
    await this.storage.set("lang",this.lang);
    await this.storage.set("introShown",true);
    await this.dataService.setLanguage(this.lang)

    this.navCtrl.setRoot(HomePage)
  }

}
