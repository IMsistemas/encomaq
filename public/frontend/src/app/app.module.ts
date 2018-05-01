import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { NomIdentifytypeComponent } from './nomenclature/nom-identifytype/nom-identifytype.component';
import { NomidentifytyService } from './service/identifytype/nomidentifyty.service';
import { NewIdentifytypeComponent } from './nomenclature/nom-identifytype/new-identifytype/new-identifytype.component';
import { EditIdentifytypeclearComponent } from './nomenclature/nom-identifytype/edit-identifytypeclear/edit-identifytypeclear.component';
import { RoleComponent } from './role/role.component';
import { RoleService } from './service/role/role.service';
import { MenuComponent } from './menu/menu.component';
import { RouterModule } from '@angular/router';
import { RouterConfig } from './roter.config';
import { CategoryitemComponent } from './nomenclature/categoryitem/categoryitem.component';
import { ItemcategoryService } from './service/ncategoryitem/itemcategory.service';
import { CreateComponent } from './role/create/create.component';
import { UpdateComponent } from './role/update/update.component';
import { LoginService } from './service/login/login.service';
import { LoginComponent } from './login/login.component';
import { TransferreasonComponent } from './nomenclature/transferreason/transferreason.component';
import { AddtransferreasonComponent } from './nomenclature/transferreason/addtransferreason/addtransferreason.component';
import { EdittransferreasonComponent } from './nomenclature/transferreason/edittransferreason/edittransferreason.component';
import { ReasontransferService } from './service/ntranseferreason/reasontransfer.service';


@NgModule({
  declarations: [
    AppComponent,
    NomIdentifytypeComponent,
    NewIdentifytypeComponent,
    EditIdentifytypeclearComponent,
    RoleComponent,
    MenuComponent,
    CategoryitemComponent,
    CreateComponent,
    UpdateComponent,
    LoginComponent,
    TransferreasonComponent,
    AddtransferreasonComponent,
    EdittransferreasonComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(RouterConfig),
  ],
  providers: [NomidentifytyService, RoleService, ItemcategoryService, LoginService, ReasontransferService],
  bootstrap: [AppComponent]
})
export class AppModule { }
