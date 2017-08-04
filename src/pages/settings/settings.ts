import { Component } from '@angular/core';
import {DataService} from "../../providers/data-service/data-service";
import {IonicPage, Platform} from "ionic-angular";

import { FileTransfer, FileTransferObject } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';
import {AudioProvider} from "ionic-audio";

@IonicPage()

@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {

  lang:string;
  counter:number = 0;
  count:number = 0;
  percentage:number = 0;


  constructor(
    private audio:AudioProvider,
    private dataService:DataService,
    private platform:Platform,
    private transfer: FileTransfer, private file: File
  ) {
    this.lang = this.dataService.currLang;
  }

  ionViewDidLoad(){

    this.count = this.dataService.modulesData[0].module.series.reduce(function (prev, next) {
      return prev + next.chapters.length - 6;
    },0)
  }

  onChangeLang(){
    this.dataService.setLanguage(this.lang);
    this.audio.current = null;
    //this.audio.tracks = []
    console.log("Tracks in Provider",this.audio.tracks)

  }

  async getChapter(chapter:any,serie:string){
    const fileTransfer: FileTransferObject = this.transfer.create();
    if(chapter.media){

      const pdfTitle = chapter.media.pdf.split('/').pop();
      const mp3Title = chapter.media.mp3.split('/').pop();

      let pdf:any;
      let mp3:any;

      if(this.platform.is('ios')){
        pdf = await fileTransfer.download(chapter.media.pdf, this.file.dataDirectory + '/'+this.lang+'/' + pdfTitle);
        mp3 = await fileTransfer.download(chapter.media.mp3, this.file.dataDirectory + '/'+this.lang+'/' + mp3Title);
      }
      if(this.platform.is('android')){
        pdf = await fileTransfer.download(chapter.media.pdf, this.file.externalDataDirectory + '/'+this.lang+'/' + pdfTitle);
        mp3 = await fileTransfer.download(chapter.media.mp3, this.file.externalDataDirectory + '/'+this.lang+'/' + mp3Title);
      }



      this.counter++;
      this.percentage = Math.ceil((this.counter/this.count)*100);
      console.log('download complete: ' + pdf.toURL());
      console.log('download complete: ' + mp3.toURL());
    }
  }

  async getChapters(chapters:any[],serie:string){
    for(let i=0;i<chapters.length;i++){
      try {
        await this.getChapter(chapters[i],serie)
      }
      catch (err){
        console.log("ERROR:",err)
      }
    }
  }

  async getSerie(serie){
    const chapters = serie.chapters;
    const serieTitle = serie.title;
    this.getChapters(chapters,serieTitle)
  }

  async getSeries(series){
    for(let i=0;i<series.length;i++){
      try {

        await this.getSerie(series[i])
      }
      catch (err){
        console.log("ERROR:",err)
      }
    }
  }


  async download(){

    this.counter = 0;
    this.percentage = 0;
    const series = this.dataService.modulesData.filter(module=>module.lang === this.dataService.currLang)[0].module.series;
    await this.getSeries(series)
    this.dataService.loadedModules[this.dataService.currLang] = false;
  }
}
