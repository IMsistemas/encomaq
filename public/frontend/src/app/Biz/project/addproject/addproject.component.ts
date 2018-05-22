import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { catchError, retry } from 'rxjs/operators';
import { NgForm } from '@angular/forms';
import { ProjectService } from '../../../service/bproject/project.service';
import { ClienteService } from '../../../service/bclient/cliente.service';
declare var jquery: any;
declare var $: any;
@Component({
  selector: 'app-addproject',
  templateUrl: './addproject.component.html',
  styleUrls: ['./addproject.component.css']
})
export class AddprojectComponent implements OnInit {
  @Output() update_component_father = new EventEmitter<boolean>();
  lis_client = [];
  @Input() id_client: any;
  constructor(private project: ProjectService, private client: ClienteService) { }

  ngOnInit() {
    this.id_client = { idclient: ''};
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
  add_project(data) {
    this.project.add_project(data).subscribe(
      (response) => {
        if (response.success !== undefined) {
          $('#addproject').modal('hide');
          this.update_component_father.emit(true);
          this.id_client.idclient = '';
        } else if (response.error !== undefined) {
          $('#addproject').modal('hide');
          this.update_component_father.emit(false);
        }
      },
      (error) => {
        console.log('POST call in error", respons', error);
        $('#addproject').modal('hide');
        this.update_component_father.emit(false);
      });
  }

  search_client() {
    $('.listclient').modal('show');
  }
}
