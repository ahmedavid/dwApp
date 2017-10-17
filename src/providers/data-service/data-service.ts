import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Storage } from '@ionic/storage';
import {Observable} from "rxjs/Observable";
import 'rxjs/add/operator/map';
import {File} from "@ionic-native/file";
import {AudioProvider} from "ionic-audio";

@Injectable()
export class DataService {

  ModulesObservable : any;
  ModulesObserver : any;

  modulesData = [];

  currLang:string;
  currSerie:string="";

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
  loadedModules = {};

  constructor(
    private audio:AudioProvider,
    private file:File,
    private http: Http,
    private storage:Storage)
  {

    this.ModulesObservable = Observable.create(observer => {
      this.ModulesObserver = observer;
    });

    this.langList.forEach(lang=>this.loadedModules[lang.code]=false)

    this.init();
  }

  private async init(){
    this.currLang = await this.storage.get('lang') || "en";
    this.http.get('assets/modules.json')
      .subscribe( data => {
        data.json().forEach(d=>this.modulesData.push(d))
        this.ModulesObserver.next();
      })
  }

  getModule(){
    this.getMedia()
    return this.modulesData.filter(module => module.lang === this.currLang);
  }

  private async getMedia(){
    if(this.modulesData.length > 0){
      if(!this.loadedModules[this.currLang]){
        const tracks = this.modulesData.filter(module=>module.lang === this.currLang)[0].module.series
          .reduce((prev,next)=> prev.concat(next.chapters),[])
          .filter(track=>track.media)

        for(let i=0;i<tracks.length;i++){
          try {
            const fileName = tracks[i].media.mp3.split('/').pop();
            const path = this.file.externalDataDirectory + this.currLang + "/";
            const localFound = await this.checkFile(fileName)
            if(localFound){
              this.audio.create({
                src:path + fileName,
                title:tracks[i].title
              })
            }
          }
          catch (err){
            console.log("Local File Not Found falling back to url:",err)

            this.audio.create({
              src:tracks[i].media.mp3,
              title:tracks[i].title
            })
          }

        }

        this.loadedModules[this.currLang] = true;
      }
    }
  }

  async checkFile(fileName){
    const path = this.file.externalDataDirectory + this.currLang + "/";
    return await this.file.checkFile(path,fileName)

  }

  async setLanguage(lang){
    this.currLang = lang;
    await this.storage.set("lang",this.currLang);
  }

}
