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

  modules:any = [];

  constructor(
    private navCtrl: NavController,
    private dataService:DataService,
  ) {}

  ngOnInit(){
    this.modules = this.dataService.getModules();
  }

  openLessonList(module){
    this.navCtrl.push(LessonListPage,{module:module})
  }
}
