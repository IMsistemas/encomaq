import { Component, OnChanges, SimpleChanges, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ProjectService } from '../../service/bproject/project.service';
declare var jquery: any;
declare var $: any;
@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {
  /*variables para paginar*/
  loading = false;
  total = 0;
  page = 1;
  limit = 20;
  from = 0;
  /*variables para paginar*/
  message_info: any;
  list_project = [];
  info_tem_edit: any;
  tem_cancel_activate: any;
  msm_cancel_activate: any;
  descripcion: any = '';
  constructor(private project: ProjectService) { }

  ngOnInit() {
    $('.modal').draggable();
    $('.dropdown-toggle').dropdown();
    this.get_list_project();
  }
  get_list_project() {
    const o = {
      Buscar: this.descripcion,
    };
    this.project.filtro_project(this.page, o).subscribe(
      (response) => {
        this.list_project = response.data;
        this.from = response.from;
        this.total = response.total;
        this.loading = false;
      },
      (error) => {
        console.log(error);
      });
  }
  goToPage(n: number): void {
    this.page = n;
    this.get_list_project();
  }
  onNext(): void {
    this.page++;
    this.get_list_project();
  }
  onPrev(): void {
    this.page--;
    this.get_list_project();
  }
  new_project() {
    $('#addproject').modal('show');
  }
  update_list(evento, type) {
    if (evento === true) {
      if (type === 'create') {
        this.message_info = 'Sea guardado correctamente los datos..!!';
        $('#mdlMessageSuccess').modal('show');
      } else if (type === 'edit') {
        this.message_info = 'Sea editado correctamente los datos..!!';
        $('#mdlMessageSuccess').modal('show');
      }
    } else {
      if (type === 'create') {
        this.message_info = 'Ha ocurrido un error al intentar agregar un pryecto o el mismo ya existe en el sistema..!!';
        $('#mdlMessageError').modal('show');
      } else if (type === 'edit') {
        this.message_info = 'Ha ocurrido un error al intentar editar un pryecto o el mismo ya existe en el sistema..!!';
        $('#mdlMessageError').modal('show');
      }
    }
    this.get_list_project();
  }
  edit_project(data: any) {
    this.info_tem_edit = data;
    $('#editproject').modal('show');
  }
  cancel_activate(data: any) {
    this.tem_cancel_activate = data;
    $('#mdl_cancelactivate').modal('show');
  }
  ok_cancelactivate() {
    this.project.state_project(this.tem_cancel_activate.idproject).subscribe(
      (response) => {
        if (response.success !== undefined) {
          $('#mdl_cancelactivate').modal('hide');
          this.message_info = 'Sea guardado correctamente los datos..!!';
          $('#mdlMessageSuccess').modal('show');
          this.get_list_project();
        } else if (response.error !== undefined) {
          $('#mdl_cancelactivate').modal('hide');
          this.message_info = 'Error al anular los datos..!!';
          $('#mdlMessageError').modal('show');
        }
      },
      (error) => {
        console.log('POST call in error", respons', error);
        this.message_info = 'Error al anular los datos..!!';
        $('#mdlMessageError').modal('show');
        $('#mdl_cancelactivate').modal('hide');
      });
  }
  delete(data: any) {
    this.tem_cancel_activate = data;
    $('#mdl_delete').modal('show');
  }
  ok_delete() {
    this.project.delete_project(this.tem_cancel_activate.idproject).subscribe(
      (response) => {
        if (response.success !== undefined) {
          $('#mdl_delete').modal('hide');
          this.message_info = 'Se elimino correctamente los datos..!!';
          $('#mdlMessageSuccess').modal('show');
          this.get_list_project();
        } else if (response.error !== undefined) {
          $('#mdl_delete').modal('hide');
          this.message_info = 'Error al eliminar los datos..!!';
          $('#mdlMessageError').modal('show');
        }
      },
      (error) => {
        console.log('POST call in error", respons', error);
        this.message_info = 'Error al eliminar los datos..!!';
        $('#mdlMessageError').modal('show');
        $('#mdl_delete').modal('hide');
      });
  }
}
