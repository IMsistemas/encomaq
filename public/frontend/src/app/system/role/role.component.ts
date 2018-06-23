import { element } from 'protractor';
import { Component, OnChanges, SimpleChanges, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { RoleService } from './../../service/role/role.service';

declare var jquery: any;
declare var $: any;

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.css']
})
export class RoleComponent implements OnInit {
  listRole: Observable<any>;
  listPermission: any;
  role_selected: any;
  rolename_selected: any;
  message_success: any;
  message_error: any;

  aux_temprole: any;
  listtemp_permission = [];
  constructor(private role: RoleService) { }

  ngOnInit() {
    $('.dropdown-toggle').dropdown();
    this.getListRole();
  }

  getListRole() {
    this.listRole = this.role.getListRole();
  }

  create() {
    $('#mdlCreate').modal('show');
  }

  updateSelectedRole(item: any) {
    this.role_selected = item;
    $('#mdlUpdate').modal('show');
  }

  confirmDelete(item: any) {
    this.role_selected = item;
    this.rolename_selected = item.rolename;
    $('#mdlConfirmDelete').modal('show');
  }

  getPermission(item: any) {
    this.aux_temprole = item;
    this.listtemp_permission = [];
    this.role.getPermission(item.idrole).subscribe(
      (response) => {
        this.listPermission = [];

        for (const x of response[0] ) {
          const obj = {
            permissionname: x.permissionname,
            idpermission: x.idpermission,
            idrole: item.idrole,
            state: 0
          };
          this.listPermission.push(obj);
        }

        for (const j  of response[1] ) {
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
        $('#mdlPermission').modal('show');

      },
      (error) => {
        console.log('POST call in error", respons', error);
      });
  }

  delete() {
    this.role.delete(this.role_selected.idrole).subscribe(
      (response) => {
        if (response.success === true) {

          $('#mdlConfirmDelete').modal('hide');
          this.message_success = 'Se ha eliminado satisfactoriamente el Rol: ' + this.rolename_selected;
          $('#mdlMessageSuccess').modal('show');
          this.getListRole();

        } else if (response.success === false) {

          $('#mdlConfirmDelete').modal('hide');

          if (response.dependence !== undefined) {

            this.message_error = 'No se puede eliminar el Rol seleccionado, ya que existen Usuarios asignados';
            $('#mdlMessageError').modal('show');

          } else {

            this.message_error = 'Ha ocurrido un error al intentar eliminar el Rol seleccionado';
            $('#mdlMessageError').modal('show');

          }

        }
      },
      (error) => {
        console.log('POST call in error", respons', error);
        $('#mdlConfirmDelete').modal('hide');
      });
  }

  updateListRole(event, type) {
    if (event === true) {

      if (type === 'create') {

        this.message_success = 'Se ha creado satisfactoriamente el Rol';

      } else {

        this.message_success = 'Se ha editado satisfactoriamente el Rol seleccionado';

      }

      $('#mdlMessageSuccess').modal('show');


    } else {

      if (type === 'create') {

        this.message_error = 'Ha ocurrido un error al intentar agregar un Rol o el mismo ya existe en el sistema...';

      } else {

        this.message_error = 'Ha ocurrido un error al intentar editar el Rol seleccionado o el mismo nombre ya existe en el sistema';

      }

      $('#mdlMessageError').modal('show');

    }

    this.getListRole();

  }
  select_permission(item: any) {
    if (this.listtemp_permission.length === 0) {
      this.listtemp_permission.push(item);
    } else {
      const pos = this.listtemp_permission.map(function (e) { return e.idpermission; }).indexOf(item.idpermission);
      if (pos >= 0) {
        this.listtemp_permission.splice(pos, 1);
      } else {
        this.listtemp_permission.push(item);
      }
    }
  }
  init_save_perssion () {
    const data = {
      idrole: this.aux_temprole.idrole,
      listpermission: this.listtemp_permission
    };
    this.role.permission_role(data).subscribe(
      (response) => {
        if (response.success === true) {
          this.message_success = 'Se ha guardado correctamente!';
          $('#mdlMessageSuccess').modal('show');
        } else {
          this.message_error = 'Error al guardar los datos!';
          $('#mdlMessageError').modal('show');
        }
        this.getListRole();
        $('#mdlPermission').modal('hide');
      },
      (error) => {
        console.log('POST call in error", respons', error);
      });
  }
}
