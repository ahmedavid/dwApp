import { Component } from '@angular/core';
import {DataService} from "../../providers/data-service/data-service";
import {IonicPage, Platform} from "ionic-angular";

import { FileTransfer, FileTransferObject } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';

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

  track = {
    title:"TEST",
    src:'file:///storage/emulated/0/Android/data/io.ionic.dwApp/files/Series%203/DWN_Englisch_Serie3_Lektion05.mp3'
  }


  constructor(
    private dataService:DataService,
    private platform:Platform,
    private transfer: FileTransfer, private file: File
  ) {
    this.lang = this.dataService.currLang;
  }

  ionViewDidLoad(){
    //this.count = this.dataService.modulesData[0].module.series[0].chapters.filter(chapter=> chapter.media).length;

    this.count = this.dataService.modulesData[0].module.series.reduce(function (prev, next) {
      console.log(prev,next)
      return prev + next.chapters.length - 5;
    },0)

    console.log('COUNT :',this.count)
  }

  onChangeLang(){
    console.log(this.lang)
    this.dataService.setLanguage(this.lang);
  }



  async getChapter(chapter:any,serie:string){
    console.log("CHAPTERS:",chapter)
    const fileTransfer: FileTransferObject = this.transfer.create();
    if(chapter.media){

      const pdfTitle = chapter.media.pdf.split('/').pop();
      const mp3Title = chapter.media.mp3.split('/').pop();

      let pdf:any;
      let mp3:any;

      if(this.platform.is('ios')){
        pdf = await fileTransfer.download(chapter.media.pdf, this.file.dataDirectory + '/'+serie+'/' + pdfTitle);
        mp3 = await fileTransfer.download(chapter.media.mp3, this.file.dataDirectory + '/'+serie+'/' + mp3Title);
      }
      if(this.platform.is('android')){
        pdf = await fileTransfer.download(chapter.media.pdf, this.file.externalDataDirectory + '/'+serie+'/' + pdfTitle);
        mp3 = await fileTransfer.download(chapter.media.mp3, this.file.externalDataDirectory + '/'+serie+'/' + mp3Title);
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

    const series = this.dataService.modulesData[0].module.series;

    await this.getSeries(series)





    //
    //   .forEach(async chapter=>{
    //
    //
    //
    //
    //
    //   //   .then((entry) => {
    //   //   console.log('download complete: ' + entry.toURL());
    //   // }, (error) => {
    //   //   console.log("ERROR:",error)
    //   // });
    // })

    // this.dataService.modulesData.forEach(module=>{
    //   console.log('FOLDER NAME:',module.lang)
    //
    //   this.file.checkDir(this.file.externalDataDirectory,module.lang)
    //     .then(exists=>{
    //       console.log("DIRECTORY EXISTS FOR "+module.lang)
    //     })
    //     .catch(err=>{
    //       this.file.createDir(this.file.externalDataDirectory,module.lang,false)
    //         .then(dir=>{
    //           console.log("Creating directory for ",module.lang)
    //         })
    //         .catch(err=>console.log(err))
    //     })
    // })

  }
}
