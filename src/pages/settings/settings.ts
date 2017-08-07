import { Component } from '@angular/core';
import {DataService} from "../../providers/data-service/data-service";
import {IonicPage, Platform, ToastController} from "ionic-angular";

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
  disabled=false;


  constructor(
    private toast:ToastController,
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
  }

  async getChapter(chapter:any){
    const fileTransfer: FileTransferObject = this.transfer.create();
    if(chapter.media){

      const pdfTitle = chapter.media.pdf.split('/').pop();
      const mp3Title = chapter.media.mp3.split('/').pop();

      let pdf:any;
      let mp3:any;

      try {
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

        return Promise.resolve(chapter.title+" Downloaded")
      }
      catch (err){
        return Promise.reject(chapter.title+" FAILED!!!!")
      }
    }

    return Promise.reject("Nothing to download....")
  }

  async getChapters(chapters:any[]){
    chapters=chapters.filter(chapter=>chapter.media);
    for(let i=0;i<chapters.length;i++){
      try {
        await this.getChapter(chapters[i])
        if(i==chapters.length-1) return Promise.resolve("Chapters downloaded")
      }
      catch (err){
        console.log("ERROR:",err)
        return Promise.reject("Chapters Download Failed")
      }
    }
  }

  async getSeries(series){
    for(let i=0;i<series.length;i++){
      try {
        await this.getChapters(series[i].chapters)
        if(i==series.length-1) return Promise.resolve("Download Complete");
      }
      catch (err){
        console.log("ERROR:",err)
        return Promise.reject("Download Failed");
      }
    }
  }


  async download(){
    this.disabled=true;
    this.counter = 0;
    this.percentage = 0;
    const series = this.dataService.modulesData.filter(module=>module.lang === this.dataService.currLang)[0].module.series;
    try {
      const result=await this.getSeries(series)
      this.toast.create({message:result,duration: 5000}).present()
    }
    catch (err){
      this.toast.create({message:err,duration: 5000}).present()
    }
    this.dataService.loadedModules[this.dataService.currLang] = false;
    this.disabled=false;
  }
}
