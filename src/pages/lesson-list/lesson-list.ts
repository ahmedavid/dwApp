import { Component } from '@angular/core';
import {ModalController, NavParams} from 'ionic-angular';
import {AudioProvider} from "ionic-audio";
import {PdfPage} from "../pdf/pdf";

@Component({
  selector: 'page-lesson-list',
  templateUrl: 'lesson-list.html',
})
export class LessonListPage {

  title:string;
  chapters:any;
  tracks:any;

  constructor(
    private navParams: NavParams,
    private _audioProvider: AudioProvider,
    private modalCtrl:ModalController) {}

  ionViewDidLoad() {
    this.chapters = this.navParams.get('chapters');
    this.title = this.navParams.get('title');

    this.tracks=this.chapters.filter((item)=>item.media).map((item)=>{
      return {
        title:item.title,
        src:item.media ? item.media.mp3 : ""
      }
    });
  }

  openDoc(index){
    const modal=this.modalCtrl.create(PdfPage,{src:this.chapters[index].media.pdf,title:this.chapters[index].title});
    modal.present()
  }

  play(){
    this._audioProvider.tracks.forEach(track=>track.pause());
  }

  onTrackFinished(event){

  }

}
