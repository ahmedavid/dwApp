import { Injectable } from '@angular/core';
import {AudioProvider, ITrackConstraint} from "ionic-audio";


@Injectable()
export class AudioService {

  public currentTrack: ITrackConstraint;

  public set CurrentTack(track){
    console.log("FUCK U ",track)
    this.currentTrack =  track;
  }
  public get CurrentTack(){
    return this.currentTrack;
  }

  constructor(private _audioProvider: AudioProvider){}




}
