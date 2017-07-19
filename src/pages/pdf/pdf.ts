import { Component } from '@angular/core';
import {NavController, NavParams, Platform, ViewController} from 'ionic-angular';

@Component({
  selector: 'page-pdf',
  templateUrl: 'pdf.html',
})
export class PdfPage {

  src:any;
  title:string;
  zoom=1;
  isDevice=false;

  constructor(public navCtrl: NavController, public navParams: NavParams,private viewCtrl:ViewController,private platform:Platform) {
    this.isDevice = this.platform.is("cordova");
  }

  ionViewDidLoad() {
    this.src=this.navParams.get('src');
    this.title=this.navParams.get('title');
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
