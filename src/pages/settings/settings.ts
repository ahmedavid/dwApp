import { Component } from '@angular/core';
import {DataService} from "../../providers/data-service/data-service";

@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {

  lang:string;
  langList = [
    {
      code:'en',
      name:'English'
    },
    {
      code:'es',
      name:'Español'
    },
    {
      code:'ru',
      name:'Русский'
    },
    {
      code:'tr',
      name:'Türkçe'
    },
  ];

  constructor(private dataService:DataService) {
    this.lang = this.dataService.currLang;
  }

  onChangeLang(){
    console.log(this.lang)
    this.dataService.setLanguage(this.lang);
  }
}
