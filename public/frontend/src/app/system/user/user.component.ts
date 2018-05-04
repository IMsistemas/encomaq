import { element } from 'protractor';
import { Component, OnChanges, SimpleChanges, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { UserService } from './../../service/user/user.service';

declare var jquery: any;
declare var $: any;

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  listUser: Observable<any>;
  user_selected: any;
  username_selected: any;
  message_success: any;
  message_error: any;
  constructor(private user: UserService) { }

  ngOnInit() {
    $('.dropdown-toggle').dropdown();
    this.getListUser();
  }

  getListUser() {
    this.listUser = this.user.getListUser();
  }

  create() {
    $('#mdlCreate').modal('show');
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
