import { Component } from '@angular/core';
import {DataService} from "../../providers/data-service/data-service";
import {IonicPage} from "ionic-angular";

@IonicPage()

@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {

  lang:string;


  constructor(private dataService:DataService) {
    this.lang = this.dataService.currLang;
  }

  onChangeLang(){
    console.log(this.lang)
    this.dataService.setLanguage(this.lang);
  }
}
