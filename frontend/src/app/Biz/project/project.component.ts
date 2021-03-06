import { Component, OnChanges, SimpleChanges, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ProjectService } from '../../service/bproject/project.service';
import { BcompanyService } from '../../service/bcompany/bcompany.service';

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
  list_all_project = [];
  info_tem_edit: any;
  tem_cancel_activate: any;
  msm_cancel_activate: any;
  descripcion: any = '';
  state = '1';
  column = 'biz_project.projectname';
  order = 'ASC';
  num_page = 5;
  idcliente_select: any;

  companyData = {

    idcompany: 0,
    businessname: '',
    tradename: '',
    identify: '',
    phone: '',
    address: '',
    email: '',
    urlweb: ''

  };

  constructor(private project: ProjectService, private company: BcompanyService) { }

  ngOnInit() {
    $('.modal').draggable();
    $('.dropdown-toggle').dropdown();
    this.get_list_project();
    this.getCompany();
  }
  getCompany() {
    this.company.get().subscribe(
      (response) => {

        if (response.length !== 0) {

          this.companyData = response[0];

        }
      },
      (error) => {
        console.log('POST call in error", respons', error);
      });
  }
  get_list_project() {
    const o = {
      Buscar: this.descripcion,
      state: this.state,
      column: this.column,
      order: this.order,
      num_page: this.num_page
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
    this.idcliente_select = { idclient: ''} ;
    $('#addproject').modal('show');
  }
  update_list(evento, type) {
    if (evento === true) {
      if (type === 'create') {
        this.message_info = 'Se ha guardado correctamente los datos!';
        $('#mdlMessageSuccess').modal('show');
      } else if (type === 'edit') {
        this.message_info = 'Se ha editado correctamente los datos!';
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
    this.idcliente_select = data;
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
          this.message_info = 'Se ha guardado correctamente los datos!';
          $('#mdlMessageSuccess').modal('show');
          this.get_list_project();
        } else if (response.error !== undefined) {
          $('#mdl_cancelactivate').modal('hide');
          this.message_info = 'Error al anular los datos!';
          $('#mdlMessageError').modal('show');
        }
      },
      (error) => {
        console.log('POST call in error", respons', error);
        this.message_info = 'Error al anular los datos!';
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
          this.message_info = 'Se elimino correctamente los datos!';
          $('#mdlMessageSuccess').modal('show');
          this.get_list_project();
        } else if (response.error !== undefined) {
          $('#mdl_delete').modal('hide');
          this.message_info = 'Error al eliminar los datos!';
          $('#mdlMessageError').modal('show');
        }
      },
      (error) => {
        console.log('POST call in error", respons', error);
        this.message_info = 'Error al eliminar los datos!';
        $('#mdlMessageError').modal('show');
        $('#mdl_delete').modal('hide');
      });
  }


  idclient_select(n): void {
    this.idcliente_select = n;
  }

  pdf() {
    const o = {
      Buscar: this.descripcion,
      state: this.state,
      column: this.column,
      order: this.order,
      num_page: this.num_page
    };
    const accion = this.project.filtro_projectexportarpdf(o);
    console.log(accion);
    $('#printtitle').html('Lista de proyectos');
    $('#print').modal('show');
    $('#printbody').html("<object width='100%' height='600' data='" + accion + "'></object>");
  }
  excel() {

    const o = {
      Buscar: this.descripcion,
      state: null,
      column: this.column,
      order: this.order,
      num_page: '1000000000'
    };
    this.project.filtro_project(this.page, o).subscribe(
      (response) => {
        this.list_all_project = response.data;
        this.from = response.from;
        this.total = response.total;
        this.loading = false;
        console.log(this.list_all_project);

        setTimeout(function() {
          $('#list_all_projects').table2excel({
            exclude: '.noExl',
            filename: 'Lista de proyectos'
          }); }, 3000);

      },
      (error) => {
        console.log(error);
      });

  }
  refresfather(data: any) {
    this.get_list_project();
  }
}
