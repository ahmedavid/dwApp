import { Component } from '@angular/core';
import {ModalController, NavParams} from 'ionic-angular';
import {AudioProvider} from "ionic-audio";
import {PdfPage} from "../pdf/pdf";

@Component({
  selector: 'page-lesson-list',
  templateUrl: 'lesson-list.html',
})
export class LessonListPage {

  module:any;
  tracks:any;

  constructor(
    private navParams: NavParams,
    private _audioProvider: AudioProvider,
    private modalCtrl:ModalController) {}

  ionViewDidLoad() {
    this.module = this.navParams.get('module');

    this.tracks=this.module.map((item)=>{
      return {
        title:item.title,
        src:item.mp3
      }
    });

    console.log('MODUKE:',this.tracks)
  }

  openDoc(index){
    const modal=this.modalCtrl.create(PdfPage,{src:this.module[index].pdf});
    modal.present()
  }

  ionViewWillLeave(){
    this._audioProvider.tracks.forEach(track => track.stop())
  }

  play(){
    this._audioProvider.tracks.forEach(track=>track.pause());
  }

  onTrackFinished(event){

  }

}
