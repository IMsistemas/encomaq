import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { NomIdentifytypeComponent } from './nomenclature/nom-identifytype/nom-identifytype.component';
import { NomidentifytyService } from './service/identifytype/nomidentifyty.service';


@NgModule({
  declarations: [
    AppComponent,
    NomIdentifytypeComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [NomidentifytyService],
  bootstrap: [AppComponent]
})
export class AppModule { }
