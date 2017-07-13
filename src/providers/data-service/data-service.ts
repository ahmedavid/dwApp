import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import * as xml2js from 'xml2js';

@Injectable()
export class DataService {

  moduleUrls = [
    'http://rss.dw.com/xml/DKpodcast_dwn1_en',
    'http://rss.dw.com/xml/DKpodcast_dwn2_en',
    'http://rss.dw.com/xml/DKpodcast_dwn3_en',
    'http://rss.dw.com/xml/DKpodcast_dwn4_en',
  ];

  modulesData = [];

  constructor(public http: Http) {
    this.moduleUrls.forEach((module)=>{
      this.http.get(module)
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
    });
  }

  getModules(){
    return this.modulesData;
  }

}
