import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import {defaultAudioProviderFactory, IonicAudioModule} from "ionic-audio";
import {HttpModule} from "@angular/http";
import { DataService } from '../providers/data-service/data-service';
import {LessonListPage} from "../pages/lesson-list/lesson-list";
import {PdfViewerComponent} from "ng2-pdf-viewer";
import {PdfPage} from "../pages/pdf/pdf";
import {IonicStorageModule} from "@ionic/storage";
import {FileTransfer} from "@ionic-native/file-transfer";
import { File } from '@ionic-native/file';
import {DocumentViewer} from "@ionic-native/document-viewer";
import {InAppBrowser} from "@ionic-native/in-app-browser";
import { AudioService } from '../providers/audio-service/audio-service';

@NgModule({
  declarations: [
    PdfViewerComponent,
    MyApp,
    HomePage,
    LessonListPage,
    PdfPage,
  ],
  imports: [

    HttpModule,
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicAudioModule.forRoot(defaultAudioProviderFactory),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LessonListPage,
    PdfPage,
  ],
  providers: [
    InAppBrowser,
    DocumentViewer,
    FileTransfer,
    File,
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    DataService,
    AudioService
  ]
})
export class AppModule {}
