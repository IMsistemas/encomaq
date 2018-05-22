import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ProjectService } from '../../../service/bproject/project.service';
import { ClienteService } from '../../../service/bclient/cliente.service';
declare var jquery: any;
declare var $: any;
@Component({
  selector: 'app-editproject',
  templateUrl: './editproject.component.html',
  styleUrls: ['./editproject.component.css']
})
export class EditprojectComponent implements OnInit {
  lis_client = [];
  @Input() tem_edit: any;
  @Output() update_component_father = new EventEmitter<boolean>();
  @Input() id_client: any;
  constructor(private project: ProjectService, private client: ClienteService) { }

  ngOnInit() {
    this.id_client = { idclient: '' };
    this.list_clients();
  }
  list_clients() {
    this.lis_client.push({ idclient: '', businessname: '--Seleccione--' });
    this.client.get_client().subscribe(
      (response) => {
        for (const cat of response) {
          const o = {
            idclient: cat.idclient,
            businessname: cat.businessname
          };
          this.lis_client.push(o);
        }
      },
      (error) => {
        console.log('POST call in error", respons', error);
      });
  }
  modify_project(data: any) {
    data.idclient = this.id_client.idclient;
    this.project.edit_project(data.idproject, data).subscribe(
      (response) => {
        if (response.success !== undefined) {
          $('#editproject').modal('hide');
          this.id_client.idclient = data.idclient;
          this.update_component_father.emit(true);
        } else if (response.error !== undefined) {
          $('#editproject').modal('hide');
          this.update_component_father.emit(false);
        }
      },
      (error) => {
        console.log('POST call in error", respons', error);
        $('#editproject').modal('hide');
        this.update_component_father.emit(false);
      });
  }
  search_client() {
    $('.listclient').modal('show');
  }
}
