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
  listUser = [];
  user_selected: any;
  username_selected: any;
  message_success: any;
  message_error: any;

  listRole = [];
  search: any = '';
  idrole: any = '';
  state = '1';
  column = 'personname';
  order = 'ASC';
  num_page = 5;
  /* variables para paginar */
  loading = false;
  total = 0;
  page = 1;
  limit = 0;
  from = 0;
  /* variables para paginar */

  constructor(private user: UserService, private role: RoleService) { }

  ngOnInit() {
    this.loadInitJQuery();
    this.getListRole();
    this.getListUser();
  }

  loadInitJQuery() {
    $('.dropdown-toggle').dropdown();
    $('.modal-dialog').draggable();
  }

  getListRole() {

    this.listRole.push({idrole: '', rolename: '-- Seleccione Rol --'});
    this.role.getActiveRole().subscribe(
      (response) => {

        for (let role of response) {
          let obj: Object = {
            idrole: role.idrole,
            rolename: role.rolename
          };
          this.listRole.push(obj);
        }

      },
      (error) => {
        console.log('POST call in error", respons', error);
      });

  }

  getListUser() {

    const o = {
      search: this.search,
      idrole: this.idrole,
      state: this.state,
      column: this.column,
      order: this.order,
      num_page: this.num_page
    };

    this.user.getListUser(this.page, o).subscribe(
      (response) => {
        this.listUser = response.data;
        this.from = response.from;
        this.total = response.total;
        this.loading = false;
      },
      (error) => {
        console.log(error);
      });


  }

  create() {
    $('#mdlCreate').modal('show');
  }

  updateSelectedUser(item: any) {
    item.password = '';
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

  goToPage(n: number): void {
    this.page = n;
    this.getListUser();
  }

  onNext(): void {
    this.page++;
    this.getListUser();
  }

  onPrev(): void {
    this.page--;
    this.getListUser();
  }

  refresfather( data: any ) {
    this.getListUser();
  }

}
