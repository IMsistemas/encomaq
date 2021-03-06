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
import { ConfigemailComponent } from './system/configemail/configemail.component';
import { ConfigemailService } from './service/sconfigemail/configemail.service';
import { ClientComponent } from './Biz/client/client.component';
import { AddclientComponent } from './Biz/client/addclient/addclient.component';
import { EditclientComponent } from './Biz/client/editclient/editclient.component';
import { ClienteService } from './service/bclient/cliente.service';
import { PaginationComponent } from './pagination/pagination.component';
import { CarrierComponent } from './Biz/carrier/carrier.component';
import { ProjectComponent } from './Biz/project/project.component';
import { AddprojectComponent } from './Biz/project/addproject/addproject.component';
import { EditprojectComponent } from './Biz/project/editproject/editproject.component';
import { ProjectService } from './service/bproject/project.service';
import { CarrierService } from './service/carrier/carrier.service';
import { CreatecarrierComponent } from './Biz/carrier/createcarrier/createcarrier.component';
import { UpdatecarrierComponent } from './Biz/carrier/updatecarrier/updatecarrier.component';
import { ContractComponent } from './Biz/contract/contract.component';
import { AddcontractComponent } from './Biz/contract/addcontract/addcontract.component';
import { EditcontractComponent } from './Biz/contract/editcontract/editcontract.component';
import { ContractService } from './service/bcontract/contract.service';
import { ListclientComponent } from './Biz/client/listclient/listclient.component';
import { ListitemComponent } from './Biz/item/listitem/listitem.component';
import { ReferralguideComponent } from './Biz/referralguide/referralguide.component';
import { ReferralguideService } from './service/referralguide/referralguide.service';
import { CreatereferralguideComponent } from './Biz/referralguide/createreferralguide/createreferralguide.component';
import { UpdatereferralguideComponent } from './Biz/referralguide/updatereferralguide/updatereferralguide.component';
import { ListcontractComponent } from './Biz/contract/listcontract/listcontract.component';
import { ListcarrierComponent } from './Biz/carrier/listcarrier/listcarrier.component';
import { LiquidationComponent } from './Biz/liquidation/liquidation.component';
import { AddliquidationComponent } from './Biz/liquidation/addliquidation/addliquidation.component';
import { EditliquidationComponent } from './Biz/liquidation/editliquidation/editliquidation.component';
import { LiquidationService } from './service/bliquidation/liquidation.service';
import { PlaceComponent } from './Biz/place/place.component';
import { BplaceService } from './service/bplace/bplace.service';
import { CreatePlaceComponent } from './Biz/place/create-place/create-place.component';
import { EditPlaceComponent } from './Biz/place/edit-place/edit-place.component';
import { ListPlaceComponent } from './Biz/place/list-place/list-place.component';
import { PaymentformComponent } from './Biz/paymentform/paymentform.component';
import { CreatePaymentformComponent } from './Biz/paymentform/create-paymentform/create-paymentform.component';
import { EditPaymentformComponent } from './Biz/paymentform/edit-paymentform/edit-paymentform.component';
import { ItempriceService } from './service/bitemprice/itemprice.service';
import { CreatereferralguidenullComponent } from './Biz/referralguide/createreferralguidenull/createreferralguidenull.component';
import { LiquidationNewComponent } from './Biz/liquidation-new/liquidation-new.component';
import { LiquidationNewService } from './service/bliquidation/liquidation-new.service';

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
    ConfigemailComponent,
    ClientComponent,
    AddclientComponent,
    EditclientComponent,
    PaginationComponent,
    CarrierComponent,
    ProjectComponent,
    AddprojectComponent,
    EditprojectComponent,
    CreatecarrierComponent,
    UpdatecarrierComponent,
    ContractComponent,
    AddcontractComponent,
    EditcontractComponent,
    ListclientComponent,
    ListitemComponent,
    ReferralguideComponent,
    CreatereferralguideComponent,
    UpdatereferralguideComponent,
    ListcontractComponent,
    ListcarrierComponent,
    LiquidationComponent,
    AddliquidationComponent,
    EditliquidationComponent,
    PlaceComponent,
    CreatePlaceComponent,
    EditPlaceComponent,
    ListPlaceComponent,
    PaymentformComponent,
    CreatePaymentformComponent,
    EditPaymentformComponent,
    CreatereferralguidenullComponent,
    LiquidationNewComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(RouterConfig),
  ],
  providers: [
    NomidentifytyService, RoleService, ItemcategoryService, LoginService,
    ReasontransferService, UnittypeService, UserService, WarehouseService,
    BcompanyService, ItemService, ConfigemailService, ClienteService,
    ProjectService, CarrierService, ContractService, ReferralguideService, LiquidationService, BplaceService, ItempriceService,
    LiquidationNewService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
