import {Component, OnInit} from '@angular/core';
import {NavController} from 'ionic-angular';
import {DataService} from "../../providers/data-service/data-service";
import {LessonListPage} from "../lesson-list/lesson-list";
import "rxjs/add/operator/map";

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
  ) {}

  ngOnInit(){
    this.dataService.ModulesObservable.subscribe(()=>{
      const temp = this.dataService.getModule();
      const {title,description,series} = temp[0].module;
      this.module = {
        title,
        description,
        series
      };
      console.log("MODULES:",this.module);
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

  ionViewWillEnter(){
    console.log("MODULES 2:",this.module);
  }

  openLessonList(chapters,title){
    this.navCtrl.push(LessonListPage,{chapters,title})
  }
}
