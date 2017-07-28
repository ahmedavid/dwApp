import { Component } from '@angular/core';
import {DataService} from "../../providers/data-service/data-service";
import {IonicPage} from "ionic-angular";

import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
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


  constructor(
    private dataService:DataService,
    private transfer: FileTransfer, private file: File
  ) {
    this.lang = this.dataService.currLang;
  }

  ionViewDidLoad(){
    this.count = this.dataService.modulesData[0].module.series[0].chapters.filter(chapter=> chapter.media).length;
  }

  onChangeLang(){
    console.log(this.lang)
    this.dataService.setLanguage(this.lang);
  }

  async getChapter(chapter){
    console.log("CHAPTERS:",chapter)
    const fileTransfer: FileTransferObject = this.transfer.create();
    if(chapter.media){
      const entry = await fileTransfer.download(chapter.media.pdf, this.file.externalDataDirectory + chapter.title)
      this.counter++;
      this.percentage = Math.ceil((this.counter/this.count)*100);
      console.log('download complete: ' + entry.toURL());
    }
  }

  async getChapters(chapters){
    for(let i=0;i<chapters.length;i++){
      try {
        await this.getChapter(chapters[i])
      }
      catch (err){
        console.log("ERROR:",err)
      }
    }
  }

  async getSerie(serie){
    const chapters = serie.chapters;
    this.getChapters(chapters)
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
