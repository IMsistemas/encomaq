// tslint:disable-next-line:eofline
import { Route } from '@angular/router';
import { NomIdentifytypeComponent } from './nomenclature/nom-identifytype/nom-identifytype.component';
import { RoleComponent } from './role/role.component';
import { CategoryitemComponent } from './nomenclature/categoryitem/categoryitem.component';
import { TransferreasonComponent } from './nomenclature/transferreason/transferreason.component';
import { UnittypeComponent } from './nomenclature/unittype/unittype.component';
export const RouterConfig: Route[] = [
    { path: 'identiytype', component: NomIdentifytypeComponent},
    { path: 'role', component: RoleComponent },
    { path: 'categoryitem', component: CategoryitemComponent },
    { path: 'transferreason', component: TransferreasonComponent },
    { path: 'unittype', component: UnittypeComponent },
];
