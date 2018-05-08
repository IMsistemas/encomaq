import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { UserService } from './../../../service/user/user.service';
import { RoleService } from './../../../service/role/role.service';

declare var jquery: any;
declare var $: any;

@Component({
  selector: 'app-updateuser',
  templateUrl: './updateuser.component.html',
  styleUrls: ['./updateuser.component.css']
})
export class UpdateuserComponent implements OnInit {
  @Input() tem_edit_user: any;
  @Input() listRole: Observable<any>;
  @Output() update_component_father = new EventEmitter<boolean>();
  // listRole: Observable<any>;
  constructor(private user: UserService, private role: RoleService) { }

  ngOnInit() {
    // this.getListRole();
  }

  /* getListRole() {
    this.listRole = this.role.getActiveRole();
  }*/

  update(data: any) {
    this.user.update(data.iduser, data).subscribe(
      (response) => {
        if (response.success === true) {
          $('#mdlUpdate').modal('hide');
          this.update_component_father.emit(true);
        } else {
          $('#mdlUpdate').modal('hide');
          this.update_component_father.emit(false);
        }
      },
      (error) => {
        console.log('POST call in error", respons', error);
        $('#mdlUpdate').modal('hide');
        this.update_component_father.emit(false);
      });
  }

}
