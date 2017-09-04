import {Component, OnInit} from '@angular/core';
import {MenuController, NavController, Platform} from 'ionic-angular';
import { Storage } from '@ionic/storage';
import {DataService} from "../../providers/data-service/data-service";
import {LessonListPage} from "../lesson-list/lesson-list";
import "rxjs/add/operator/map";
import {AdMobFree, AdMobFreeBannerConfig} from "@ionic-native/admob-free";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit{

  module:any;

  constructor(
    private admobFree: AdMobFree,
    private navCtrl: NavController,
    private dataService:DataService,
    private platform:Platform,
    private storage:Storage,
    private menuCtrl:MenuController
  ) {}

  ngOnInit(){
    this.init()
  }

  ionViewDidLoad(){
    const bannerConfig: AdMobFreeBannerConfig = {
      // add your config here
      // for the sake of this example we will just use the test config
      isTesting:false,
      id:"ca-app-pub-9710732367609431/1920963016",
      autoShow: true
    };
    this.admobFree.banner.config(bannerConfig);

    this.admobFree.banner.prepare()
      .then(() => {
        console.log("BANNER READY")
        // banner Ad is ready
        // if we set autoShow to false, then we will need to call the show method here
      })
      .catch(e => {
        console.log(e)
        console.log("BANNER ERROR:",e)
      });
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
    }

  }

  openLessonList(chapters,title){
    this.navCtrl.push(LessonListPage,{chapters,title})
  }
}
