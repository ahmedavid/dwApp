import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Storage } from '@ionic/storage';
import {Observable} from "rxjs/Observable";
import 'rxjs/add/operator/map';

@Injectable()
export class DataService {

  ModulesObservable : any;
  ModulesObserver : any;

  modulesData = [];
  currLang:string;

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

  constructor(public http: Http,private storage:Storage) {
    this.ModulesObservable = Observable.create(observer => {
      this.ModulesObserver = observer;
    });

    this.init();
  }

  async init(){
    this.currLang = await this.storage.get('lang') || "en";
    this.http.get('assets/modules.json')
      .subscribe( data => {
        data.json().forEach(d=>this.modulesData.push(d))
        this.ModulesObserver.next();
      })
  }

  getModule(){
    return this.modulesData.filter(module => module.lang === this.currLang);
  }

  async setLanguage(lang){
    this.currLang = lang;
    await this.storage.set("lang",this.currLang);
  }

}
