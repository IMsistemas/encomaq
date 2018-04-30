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
          this.getListRole();
        } else if (response.success === false) {
          $('#mdlConfirmDelete').modal('hide');
        }
      },
      (error) => {
        console.log('POST call in error", respons', error);
        $('#mdlConfirmDelete').modal('hide');
      });
  }
  updateListRole(event) {
    if (event === true) {
      this.getListRole();
    }
  }

}
