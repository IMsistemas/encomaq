import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { catchError, retry } from 'rxjs/operators';
import { NgForm } from '@angular/forms';
import { UserService } from './../../../service/user/user.service';
import { RoleService } from './../../../service/role/role.service';

declare var jquery: any;
declare var $: any;

@Component({
  selector: 'app-createuser',
  templateUrl: './createuser.component.html',
  styleUrls: ['./createuser.component.css']
})
export class CreateuserComponent implements OnInit {
  @Output() update_component_father = new EventEmitter<boolean>();
  listRole: Observable<any>;
  constructor(private user: UserService, private role: RoleService) { }

  ngOnInit() {
    this.getListRole();
  }

  getListRole() {
    this.listRole = this.role.getActiveRole();
  }

  create(data) {
    this.user.create(data).subscribe(
      (response) => {
        if (response.success === true) {
          $('#mdlCreate').modal('hide');
          this.update_component_father.emit(true);
        } else {
          $('#mdlCreate').modal('hide');
          this.update_component_father.emit(false);
        }
      },
      (error) => {
        console.log('POST call in error", respons', error);
        $('#mdlCreate').modal('hide');
        this.update_component_father.emit(false);
      });
  }

}
