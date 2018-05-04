// tslint:disable-next-line:eofline
import { RouterModule, Route } from '@angular/router';
import { NomIdentifytypeComponent } from './nomenclature/nom-identifytype/nom-identifytype.component';
import { RoleComponent } from './system/role/role.component';
import { CategoryitemComponent } from './nomenclature/categoryitem/categoryitem.component';
import { TransferreasonComponent } from './nomenclature/transferreason/transferreason.component';
import { UnittypeComponent } from './nomenclature/unittype/unittype.component';
import { UserComponent } from './system/user/user.component';
import { CompanyComponent } from './Biz/company/company.component';
export const RouterConfig: Route[] = [
    { path: 'identiytype', component: NomIdentifytypeComponent},
    { path: 'role', component: RoleComponent },
    { path: 'categoryitem', component: CategoryitemComponent },
    { path: 'transferreason', component: TransferreasonComponent },
    { path: 'unittype', component: UnittypeComponent },
    { path: 'user', component: UserComponent },
    { path: 'company', component: CompanyComponent },
];


