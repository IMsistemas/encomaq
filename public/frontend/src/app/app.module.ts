import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { NomIdentifytypeComponent } from './nomenclature/nom-identifytype/nom-identifytype.component';
import { NomidentifytyService } from './service/identifytype/nomidentifyty.service';
import { NewIdentifytypeComponent } from './nomenclature/nom-identifytype/new-identifytype/new-identifytype.component';
import { EditIdentifytypeclearComponent } from './nomenclature/nom-identifytype/edit-identifytypeclear/edit-identifytypeclear.component';
import { RoleComponent } from './system/role/role.component';
import { RoleService } from './service/role/role.service';
import { MenuComponent } from './menu/menu.component';
import { RouterModule } from '@angular/router';
import { RouterConfig } from './roter.config';
import { CategoryitemComponent } from './nomenclature/categoryitem/categoryitem.component';
import { ItemcategoryService } from './service/ncategoryitem/itemcategory.service';
import { CreateComponent } from './system/role/create/create.component';
import { UpdateComponent } from './system/role/update/update.component';
import { LoginService } from './service/login/login.service';
import { LoginComponent } from './login/login.component';
import { TransferreasonComponent } from './nomenclature/transferreason/transferreason.component';
import { AddtransferreasonComponent } from './nomenclature/transferreason/addtransferreason/addtransferreason.component';
import { EdittransferreasonComponent } from './nomenclature/transferreason/edittransferreason/edittransferreason.component';
import { ReasontransferService } from './service/ntranseferreason/reasontransfer.service';
import { UnittypeComponent } from './nomenclature/unittype/unittype.component';
import { AddunittypeComponent } from './nomenclature/unittype/addunittype/addunittype.component';
import { EditunittypeComponent } from './nomenclature/unittype/editunittype/editunittype.component';
import { UnittypeService } from './service/nunittype/unittype.service';
import { AddcategoryitemComponent } from './nomenclature/categoryitem/addcategoryitem/addcategoryitem.component';
import { EditcategoryitemComponent } from './nomenclature/categoryitem/editcategoryitem/editcategoryitem.component';
import { UserComponent } from './system/user/user.component';
import { UserService } from './service/user/user.service';
import { CreateuserComponent } from './system/user/createuser/createuser.component';
import { UpdateuserComponent } from './system/user/updateuser/updateuser.component';
import { WarehouseComponent } from './Biz/warehouse/warehouse.component';
import { AddwarehouseComponent } from './Biz/warehouse/addwarehouse/addwarehouse.component';
import { EditwarehouseComponent } from './Biz/warehouse/editwarehouse/editwarehouse.component';
import { WarehouseService } from './service/bwarehouse/warehouse.service';
import { CompanyComponent } from './Biz/company/company.component';
import { BcompanyService } from './service/bcompany/bcompany.service';
import { ItemComponent } from './Biz/item/item.component';
import { AdditemComponent } from './Biz/item/additem/additem.component';
import { EdititemComponent } from './Biz/item/edititem/edititem.component';
import { ItemService } from './service/bitem/item.service';
import { ProfileComponent } from './system/profile/profile.component';

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
    EdittransferreasonComponent,
    UnittypeComponent,
    AddunittypeComponent,
    EditunittypeComponent,
    AddcategoryitemComponent,
    EditcategoryitemComponent,
    UserComponent,
    CreateuserComponent,
    UpdateuserComponent,
    WarehouseComponent,
    AddwarehouseComponent,
    EditwarehouseComponent,
    CompanyComponent,
    ItemComponent,
    AdditemComponent,
    EdititemComponent,
    ProfileComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(RouterConfig),
  ],
  providers: [NomidentifytyService, RoleService, ItemcategoryService, LoginService,
              ReasontransferService, UnittypeService, UserService, WarehouseService,
              BcompanyService, ItemService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
