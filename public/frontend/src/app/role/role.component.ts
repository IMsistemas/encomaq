import { Component, OnChanges, SimpleChanges, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { RoleService } from './../service/role/role.service';

declare var jquery: any;
declare var $: any;

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.css']
})
export class RoleComponent implements OnInit {
  listRole: Observable<any>;
  role_selected: any;
  message_success: any;
  message_error: any;
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
    $('#mdlConfirmDelete').modal('show');
  }
  delete() {
    this.role.delete(this.role_selected.idrole).subscribe(
      (response) => {
        if (response.success === true) {

          $('#mdlConfirmDelete').modal('hide');
          this.message_success = 'Se ha eliminado satisfactoriamente el Rol seleccionado';
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

      this.getListRole();

    } else {

      if (type === 'create') {

        this.message_error = 'Ha ocurrido un error al intentar agregar un Rol...';

      } else {

        this.message_error = 'Ha ocurrido un error al intentar editar el Rol seleccionado';

      }

      $('#mdlMessageError').modal('show');

    }

  }

}
