import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
//import * as xml2js from 'xml2js';

@Injectable()
export class DataService {

  moduleUrls = [
    'https://rss.dw.com/xml/DKpodcast_dwn1_en',
    'https://rss.dw.com/xml/DKpodcast_dwn2_en',
    'https://rss.dw.com/xml/DKpodcast_dwn3_en',
    'https://rss.dw.com/xml/DKpodcast_dwn4_en',
  ];

  modulesData = [];

  constructor(public http: Http) {

    //this.http.get('assets/modules.json').subscribe((data)=>console.log(data.json()))

    /*this.moduleUrls.forEach((module)=>{
      this.http.get('assets/modules.json')
        .map((response)=>{
          let json:any = {title:'',image:'',series:[],description:''};
          new xml2js.Parser().parseString(response.text(),(err, result) => {
            json.title = result.rss.channel[0].title[0].split('|')[0].trim();
            json.description = result.rss.channel[0].description[0];
            json.image = result.rss.channel[0].image[0].url[0];
            result.rss.channel[0].item.forEach((episode)=>{
              const ep:any = {};
              ep.title = episode.title[0];
              ep.description = episode.description[0];
              ep.url = episode.enclosure[0].$.url;
              json.series.push(ep)
            })
          });
          return json;
        })
        .subscribe( data => {
          this.modulesData.push(data);
        })
    });*/

    this.http.get('assets/modules.json')
      .subscribe( data => {
        console.log('JSON:',data.json())
        data.json().forEach(d=>{
          this.modulesData.push(d);
        })
      })
  }

  getModules(){
    return this.modulesData;
  }

}
