import { Component } from '@angular/core';
import {NavParams, Platform, ViewController} from 'ionic-angular';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';
import {DocumentViewer, DocumentViewerOptions} from "@ionic-native/document-viewer";
import { InAppBrowser } from '@ionic-native/in-app-browser';

@Component({
  selector: 'page-pdf',
  templateUrl: 'pdf.html',
})
export class PdfPage {

  src:any;
  title:string;
  zoom=1;
  isDevice=false;
  pdf:any;

  constructor(
    private iab: InAppBrowser,
    private transfer: FileTransfer, private file: File,
    private document:DocumentViewer,
    public navParams: NavParams,
    private viewCtrl:ViewController,
    private platform:Platform) {
    this.isDevice = this.platform.is("cordova");
  }

  ionViewDidLoad() {
    this.src=this.navParams.get('src');
    this.title=this.navParams.get('title');

  }

  openPDF(){
    const browser = this.iab.create('http://www.dw.com/downloads/25629156/eng1-01.pdf');
    browser.show();


    const options: DocumentViewerOptions = {
      title: 'My PDF'
    }

    //this.document.viewDocument('assets/myFile.pdf', 'application/pdf', options)
  }

  download() {
    const url = 'http://www.dw.com/downloads/25629156/eng1-01.pdf';
    const fileTransfer: FileTransferObject = this.transfer.create();
    fileTransfer.download(url, this.file.dataDirectory + 'test.pdf').then((entry) => {
      const options: DocumentViewerOptions = {
        title: 'My PDF'
      }

      this.document.viewDocument(entry.toURL(), 'application/pdf', options)
      console.log('download complete: ' + entry.toURL());

    }, (error) => {
      console.log("PDF ERROR:",error)
    });
  }

  onDissmis(){
    this.viewCtrl.dismiss()
  }

  zoomOut(){
    if(this.zoom<2){
      this.zoom+=0.2;
    }
  }
  zoomIn(){
    if(this.zoom>0.5){
      this.zoom-=0.2;
    }
  }

}
