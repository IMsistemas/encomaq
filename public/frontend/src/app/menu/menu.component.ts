import { Component, OnChanges, SimpleChanges, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { LoginService } from './../service/login/login.service';
import { RoleService } from '../service/role/role.service';

declare var jquery: any;
declare var $: any;

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  username = 'AA';
  user: any;
  listtemp_permission = [];
  listPermission = [];
  constructor(private login: LoginService, private role: RoleService) { }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('user'));
    this.username = this.user.personname + ' ' + this.user.lastnameperson;
    this.getPermission();
  }

  confirmLogout() {
    $('#mdlConfirmLogout').modal('show');
  }

  logout() {

    localStorage.removeItem('user');

    location.reload();

  }

  getPermission() {
    this.listtemp_permission = [];
    this.role.getPermission(this.user.idrole).subscribe(
      (response) => {
        this.listPermission = [];

        for (const x of response[0]) {
          const obj = {
            permissionname: x.permissionname,
            idpermission: x.idpermission,
            idrole: this.user.idrole,
            state: 0
          };
          this.listPermission.push(obj);
        }

        for (const j of response[1]) {
          const o = {
            permissionname: j.sys_permission.permissionname,
            idpermission: j.idpermission,
            idrole: j.idrole,
            state: 0
          };
          this.listtemp_permission.push(o);
        }
        for (const i of this.listPermission) {
          const pos = this.listtemp_permission.map(function (e) { return e.idpermission; }).indexOf(i.idpermission);
          if (pos >= 0) {
            i.state = 1;
          }
        }
        if (this.user.idrole == 1) { /// administrador
          for (const i of this.listPermission) {
            i.state = 1;
          }
        }

        this.listPermission.sort(function (a, b) {
          if (a.idpermission > b.idpermission) {
            return 1;
          }
          if (a.idpermission < b.idpermission) {
            return -1;
          }
          return 0;
        });

      },
      (error) => {
        console.log('POST call in error", respons', error);
      });
  }


}
