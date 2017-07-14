import {Component, OnInit} from '@angular/core';
import { NavController } from 'ionic-angular';
import {AudioProvider} from "ionic-audio";
import "rxjs/add/operator/map";
import {DataService} from "../../providers/data-service/data-service";
import {LessonListPage} from "../lesson-list/lesson-list";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit{

  myTracks: any[];
  singleTrack: any;
  allTracks: any[];
  selectedTrack: number;

  modules:any = [];

  pdfSrc = 'assets/pdf.pdf';



  constructor(
    private navCtrl: NavController,
    private _audioProvider: AudioProvider,
    private dataService:DataService
  ) {}

  ngOnInit(){
    this.modules = this.dataService.getModules();
    console.log(this.modules)
  }


  openLessonList(module){
    this.navCtrl.push(LessonListPage,{module:module})
  }

  ngAfterContentInit() {
    // get all tracks managed by AudioProvider so we can control playback via the API
    this.allTracks = this._audioProvider.tracks;
  }

  playSelectedTrack() {
    // use AudioProvider to control selected track
    this._audioProvider.play(this.selectedTrack);
  }

  pauseSelectedTrack() {
    // use AudioProvider to control selected track
    this._audioProvider.pause(this.selectedTrack);
  }

  onTrackFinished(track: any) {
    console.log('Track finished', track)
  }

}
