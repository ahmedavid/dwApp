import {Component, OnInit} from '@angular/core';
import {MenuController, NavController, Platform} from 'ionic-angular';
import { Storage } from '@ionic/storage';
import {DataService} from "../../providers/data-service/data-service";
import {LessonListPage} from "../lesson-list/lesson-list";
import "rxjs/add/operator/map";
import {IntroPage} from "../intro/intro";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit{

  module:any;
  lang:string;

  constructor(
    private navCtrl: NavController,
    private dataService:DataService,
    private platform:Platform,
    private storage:Storage,
    private menuCtrl:MenuController
  ) {}

  ngOnInit(){

    this.platform.ready().then(()=>{
      this.storage.get('introShown').then(result=>{
        if(!result){
          this.navCtrl.setRoot('IntroPage')
        }
        else{

          this.menuCtrl.enable(true,'menu')

          this.dataService.ModulesObservable.subscribe(()=>{
            const temp = this.dataService.getModule();
            const {title,description,series} = temp[0].module;
            this.module = {
              title,
              description,
              series
            };
          });

          const temp = this.dataService.getModule();
          if(temp.length > 0){
            const {title,description,series} = temp[0].module;
            this.module = {
              title,
              description,
              series
            };
          }

          this.lang = this.dataService.currLang;


        }
      })
    })


  }

  openLessonList(chapters,title){
    this.navCtrl.push(LessonListPage,{chapters,title})
  }
}
