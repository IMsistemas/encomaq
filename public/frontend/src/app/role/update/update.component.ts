import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { RoleService } from './../../service/role/role.service';
declare var jquery: any;
declare var $: any;
@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {
  @Input() tem_edit_role: any;
  @Output() update_component_father = new EventEmitter<boolean>();
  constructor(private role: RoleService) { }

  ngOnInit() {
  }
  update(data: any) {
    this.role.update(data.idrole, data).subscribe(
      (response) => {
        if (response.success !== undefined) {
          $('#mdlUpdate').modal('hide');
          this.update_component_father.emit(true);
        } else if (response.error !== undefined) {
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
