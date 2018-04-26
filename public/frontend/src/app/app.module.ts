import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { NomIdentifytypeComponent } from './nomenclature/nom-identifytype/nom-identifytype.component';
import { NomidentifytyService } from './service/identifytype/nomidentifyty.service';
import { NewIdentifytypeComponent } from './nomenclature/nom-identifytype/new-identifytype/new-identifytype.component';


@NgModule({
  declarations: [
    AppComponent,
    NomIdentifytypeComponent,
    NewIdentifytypeComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [NomidentifytyService],
  bootstrap: [AppComponent]
})
export class AppModule { }
