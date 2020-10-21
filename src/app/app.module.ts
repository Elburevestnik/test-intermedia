import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { IconListComponent } from './icon-list/icon-list.component';
import { AccordionComponent } from './accordion/accordion.component';
import {SpinnerComponent} from '../assets/spinner/spinner.component';

@NgModule({
  declarations: [
    AppComponent,
    IconListComponent,
    AccordionComponent,
    SpinnerComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
