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
import {AboutPage} from "../pages/about/about";
import {SettingsPage} from "../pages/settings/settings";
import {PdfPage} from "../pages/pdf/pdf";

@NgModule({
  declarations: [
    PdfViewerComponent,
    MyApp,
    HomePage,
    AboutPage,
    SettingsPage,
    LessonListPage,
    PdfPage
  ],
  imports: [

    HttpModule,
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicAudioModule.forRoot(defaultAudioProviderFactory)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    AboutPage,
    SettingsPage,
    LessonListPage,
    PdfPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    DataService
  ]
})
export class AppModule {}
