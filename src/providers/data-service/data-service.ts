import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
//import * as xml2js from 'xml2js';

@Injectable()
export class DataService {

  modulesData = [];

  constructor(public http: Http) {

    this.http.get('assets/data.json')
      .subscribe( data => {
        console.log('JSON:',data.json())
        data.json().forEach(d=>{
          this.modulesData.push(d);
        })
      })
  }

  getModules(){
    return this.modulesData;
  }

}
