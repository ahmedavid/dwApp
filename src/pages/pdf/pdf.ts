import { Component } from '@angular/core';
import {NavController, NavParams, ViewController} from 'ionic-angular';

@Component({
  selector: 'page-pdf',
  templateUrl: 'pdf.html',
})
export class PdfPage {

  src:any;
  zoom=1;

  constructor(public navCtrl: NavController, public navParams: NavParams,private viewCtrl:ViewController) {
  }

  ionViewDidLoad() {
    this.src=this.navParams.get('src');
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
