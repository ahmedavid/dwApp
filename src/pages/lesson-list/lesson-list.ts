import { Component } from '@angular/core';
import { NavParams } from 'ionic-angular';
import {AudioProvider} from "ionic-audio";

@Component({
  selector: 'page-lesson-list',
  templateUrl: 'lesson-list.html',
})
export class LessonListPage {

  module:any;
  myTracks: any[];
  singleTrack: any;
  allTracks: any[];
  selectedTrack: number;

  constructor(private navParams: NavParams,private _audioProvider: AudioProvider) {
  }

  ionViewDidLoad() {
    this.module = this.navParams.get('module');
    console.log(this.module)
  }

  ngAfterContentInit() {
    // get all tracks managed by AudioProvider so we can control playback via the API
    this.allTracks = this._audioProvider.tracks;
  }

  playSelectedTrack() {
    // use AudioProvider to control selected track
    this._audioProvider.tracks.forEach(track => track.stop())
    this._audioProvider.play(this.selectedTrack);
  }

  pauseSelectedTrack() {
    // use AudioProvider to control selected track
    this._audioProvider.pause(this.selectedTrack);
  }

  onTrackFinished(track: any) {
  }

  ionViewWillLeave(){
    this._audioProvider.tracks.forEach(track => track.stop())
  }

}
