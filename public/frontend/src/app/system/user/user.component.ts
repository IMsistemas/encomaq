import { element } from 'protractor';
import { Component, OnChanges, Output, EventEmitter, SimpleChanges, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { UserService } from './../../service/user/user.service';
import { RoleService } from './../../service/role/role.service';

declare var jquery: any;
declare var $: any;

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  @Output() update_component_father = new EventEmitter<boolean>();
  listUser: Observable<any>;
  user_selected: any;
  username_selected: any;
  message_success: any;
  message_error: any;
  listRoles: Observable<any>;
  constructor(private user: UserService, private role: RoleService) { }

  ngOnInit() {
    $('.dropdown-toggle').dropdown();
    this.getListUser();
    this.getListRole();
  }

  getListUser() {
    this.listUser = this.user.getListUser();
  }

  getListRole() {
    this.listRoles = this.role.getActiveRole();
  }

  create() {
    $('#mdlCreate').modal('show');
  }

  updateSelectedUser(item: any) {
    this.user_selected = item;
    $('#mdlUpdate').modal('show');
  }

  confirmDelete(item: any) {
    this.user_selected = item;
    this.username_selected = item.personname + ' ' + item.lastnameperson;
    $('#mdlConfirmDelete').modal('show');
  }

  delete() {
    this.user.delete(this.user_selected.iduser).subscribe(
      (response) => {
        if (response.success === true) {

          $('#mdlConfirmDelete').modal('hide');
          this.message_success = 'Se ha eliminado satisfactoriamente el Usuario: ' + this.username_selected;
          $('#mdlMessageSuccess').modal('show');
          this.getListUser();

        } else if (response.success === false) {

          $('#mdlConfirmDelete').modal('hide');

          if (response.dependence !== undefined) {

            this.message_error = 'No se puede eliminar el Usuario seleccionado, ya que existen Usuarios asignados';
            $('#mdlMessageError').modal('show');

          } else {

            this.message_error = 'Ha ocurrido un error al intentar eliminar el Usuario seleccionado';
            $('#mdlMessageError').modal('show');

          }

        }
      },
      (error) => {
        console.log('POST call in error", respons', error);
        $('#mdlConfirmDelete').modal('hide');
      });
  }


  confirmSetState(item: any) {
    this.user_selected = item;
    this.username_selected = item.personname + ' ' + item.lastnameperson;
    $('#mdlConfirmSetState').modal('show');
  }

  setState() {
    this.user.updateState(this.user_selected.iduser, this.user_selected).subscribe(
      (response) => {
        if (response.success === true) {
          $('#mdlConfirmSetState').modal('hide');
          this.getListUser();
        } else {
          $('#mdlConfirmSetState').modal('hide');
          this.getListUser();
        }
      },
      (error) => {
        console.log('POST call in error", respons', error);
        $('#mdlUpdate').modal('hide');
        this.getListUser();
      });
  }

  updateListUser(event, type) {
    if (event === true) {

      if (type === 'create') {

        this.message_success = 'Se ha creado satisfactoriamente el Usuario';

      } else {

        this.message_success = 'Se ha editado satisfactoriamente el Usuario seleccionado';

      }

      $('#mdlMessageSuccess').modal('show');


    } else {

      if (type === 'create') {

        this.message_error = 'Ha ocurrido un error al intentar agregar un Usuario o el mismo ya existe en el sistema...';

      } else {

        this.message_error = 'Ha ocurrido un error al intentar editar el Usuario seleccionado o el mismo nombre ya existe en el sistema';

      }

      $('#mdlMessageError').modal('show');

    }

    this.getListUser();

  }

}
