import {Component, OnInit} from '@angular/core';
import {MenuController, NavController, Platform} from 'ionic-angular';
import { Storage } from '@ionic/storage';
import {DataService} from "../../providers/data-service/data-service";
import {LessonListPage} from "../lesson-list/lesson-list";
import "rxjs/add/operator/map";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit{

  module:any;

  constructor(
    private navCtrl: NavController,
    private dataService:DataService,
    private platform:Platform,
    private storage:Storage,
    private menuCtrl:MenuController
  ) {}

  ngOnInit(){
    this.init()
  }


  async init(){
    await this.platform.ready()
    const result = await this.storage.get('introShown')
    if(!result){
      this.navCtrl.setRoot('IntroPage')
    }
    else{
      this.menuCtrl.enable(true,'menu')
      this.dataService.ModulesObservable.subscribe(()=>{
        this.getModule()
      });
      this.getModule()
    }
  }

  async getModule(){
    const temp = this.dataService.getModule();
    if(temp.length > 0){
      const {title,description,series} = temp[0].module;
      this.module = {
        title,
        description,
        series
      };


      if(this.module){

      }

    }

  }

  openLessonList(chapters,title){
    this.navCtrl.push(LessonListPage,{chapters,title})
  }
}
