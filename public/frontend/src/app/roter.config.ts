// tslint:disable-next-line:eofline
import { Route } from '@angular/router';
import { NomIdentifytypeComponent } from './nomenclature/nom-identifytype/nom-identifytype.component';
import { RoleComponent } from './role/role.component';
export const RouterConfig: Route[] = [
    { path: 'identiytype', component: NomIdentifytypeComponent},
    { path: 'role', component: RoleComponent },
];
