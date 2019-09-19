import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { WimModule } from 'ngx-wim';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, WimModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
