import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import {Observable} from "rxjs/Observable";
import 'rxjs/add/operator/map';

@Injectable()
export class DataService {

  ModulesObservable : any;
  ModulesObserver : any;

  modulesData = [];
  currLang = "ru";

  constructor(public http: Http) {

    this.ModulesObservable = Observable.create(observer => {
      this.ModulesObserver = observer;
    });

    this.http.get('assets/modules.json')
      .subscribe( data => {

        data.json().forEach(d=>{
          this.modulesData.push(d);
        });

        this.ModulesObserver.next();

      })
  }

  getModule(){
    return this.modulesData.filter(module => {
      return module.lang === this.currLang
    });
  }

  setLanguage(lang){
    this.currLang = lang;
    this.ModulesObserver.next()
  }

}
