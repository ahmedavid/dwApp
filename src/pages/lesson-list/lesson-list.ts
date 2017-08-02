import { Component } from '@angular/core';
import {ModalController, NavParams} from 'ionic-angular';
import {AudioProvider, ITrackConstraint} from "ionic-audio";
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';
import {InAppBrowser} from "@ionic-native/in-app-browser";
import {DocumentViewer, DocumentViewerOptions} from "@ionic-native/document-viewer";
import {AudioService} from "../../providers/audio-service/audio-service";


@Component({
  selector: 'page-lesson-list',
  templateUrl: 'lesson-list.html',
})
export class LessonListPage {

  title:string;
  chapters:any;
  tracks:any;

  currentIndex: number = -1;

  constructor(
    public audioService:AudioService,
    private _audioProvider:AudioProvider,
    private document: DocumentViewer,
    private iab:InAppBrowser,
    private transfer: FileTransfer, private file: File,
    private navParams: NavParams,
    private modalCtrl:ModalController) {}

  ionViewDidLoad() {
    this.chapters = this.navParams.get('chapters');
    this.title = this.navParams.get('title');

    this.tracks=this.chapters.filter((item)=>item.media).map((item)=>{
      return {
        title:item.title,
        src:item.media.mp3
      }
    });
  }

  show(track){
    console.log("ANANI SIKIIIM:",track)
    console.log("BAJINI SIKIM ",this._audioProvider.tracks)
  }

  play(track){
    console.log(track)
    this.audioService.CurrentTack = track;
  }

  openDoc(index){
    //const modal=this.modalCtrl.create(PdfPage,{src:this.chapters[index].media.pdf,title:this.chapters[index].title});
    //modal.present()
    this.download(index)
  }

  download(index) {
    const fileTransfer: FileTransferObject = this.transfer.create();
    fileTransfer.download(this.chapters[index].media.pdf, this.file.externalDataDirectory + this.chapters[index].title + ".pdf").then((entry) => {
      console.log('download complete: ' + entry.toURL());

      const options: DocumentViewerOptions = {
        title: this.chapters[index].title,
        openWith:{enabled:true}
      }

      this.document.viewDocument(entry.toURL(), 'application/pdf', options)

    }, (error) => {
      console.log("ERROR:",error)
    });
  }

  onTrackFinished(event){

  }

}
