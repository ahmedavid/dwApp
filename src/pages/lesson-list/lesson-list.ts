import {Component, ViewChild} from '@angular/core';
import {Content, ModalController, NavParams} from 'ionic-angular';
import {AudioProvider, IAudioTrack} from "ionic-audio";
import {PdfPage} from "../pdf/pdf";


@Component({
  selector: 'page-lesson-list',
  templateUrl: 'lesson-list.html',
})
export class LessonListPage {

  @ViewChild(Content) content: Content;
  title:string;
  chapters:any;
  tracks:any;
  current:IAudioTrack;

  constructor(
    private audio:AudioProvider,
    private navParams: NavParams,
    private modalCtrl:ModalController) {}

  ionViewDidLoad() {
   this.chapters = this.navParams.get('chapters');
   this.chapters = this.chapters.filter((item)=>item.media)
   this.title = this.navParams.get('title');



   this.tracks=this.audio.tracks
    .filter((track)=>{
     return this.chapters.find(chapter=>chapter.title === track.title)
    })

    console.log("Current Track is ",this.current)
    console.log("PDF ",this.chapters)
  }

  ionViewWillEnter(){
    this.content.resize();
    this.current = this.audio.tracks[this.audio.current];
  }

  openDoc(index){
    this.modalCtrl.create(PdfPage,{src:this.chapters[index].media.pdf}).present();
  }

  play(track){
    this.content.resize();
    if(track.isPlaying){
      this.audio.tracks.forEach(track=>track.stop())
    }
    else{
      this.audio.tracks.forEach(track=>track.stop())
      this.current = track;
      this.audio.play(this.audio.tracks.indexOf(track))
    }

  }



}
