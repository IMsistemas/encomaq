import { Component, OnChanges, SimpleChanges, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ClienteService } from '../../service/bclient/cliente.service';
import { NomidentifytyService } from '../../service/identifytype/nomidentifyty.service';
import { BcompanyService } from '../../service/bcompany/bcompany.service';

declare var jquery: any;
declare var $: any;
@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit {
  message_info: any;
  list_client = [];
  list_all_client = [];
  info_tem_edit: any;
  tem_cancel_activate: any;
  msm_cancel_activate: any;
  descripcion: any = '';
  ididentifytype: any = '';
  lis_tipoident = [];
  state = '1';
  column = 'businessname';
  order = 'ASC';
  /*variables para paginar*/
  loading = false;
  total = 0;
  page = 1;
  limit = 20;
  from = 0;
  num_page = 5;
  select_data: any = '';
  /*variables para paginar*/
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
  constructor(private client: ClienteService, private tipo: NomidentifytyService, private company: BcompanyService) { }

  ngOnInit() {
    $('.modal').draggable();
    $('.dropdown-toggle').dropdown();
    this.get_list_client();
    this.list_identifytype();
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
  get_list_client() {
    const o = {
      Buscar: this.descripcion,
      ididentifytype: this.ididentifytype,
      state: this.state,
      column: this.column,
      order: this.order,
      num_page: this.num_page
    };
    this.client.filtro_client(this.page, o).subscribe(
      (response) => {
        this.list_client = response.data;
        this.from = response.from;
        this.total = response.total;
        this.loading = false;
      },
      (error) => {
        console.log(error);
      });
  }
  list_identifytype() {
    this.lis_tipoident.push({ ididentifytype: '', identifytypename: '-- Identificación --' });
    this.tipo.get_identifytype().subscribe(
      (response) => {
        for (const idt of response) {
          const o = {
            ididentifytype: idt.ididentifytype,
            identifytypename: idt.identifytypename
          };
          this.lis_tipoident.push(o);
        }
      },
      (error) => {
        console.log('POST call in error", respons', error);
      });
  }
  new_client() {
    $('#addclient').modal('show');
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
        this.message_info = 'Ha ocurrido un error al intentar agregar un cliente o el mismo ya existe en el sistema..!!';
        $('#mdlMessageError').modal('show');
      } else if (type === 'edit') {
        this.message_info = 'Ha ocurrido un error al intentar editar un cliente o el mismo ya existe en el sistema..!!';
        $('#mdlMessageError').modal('show');
      }
    }
    this.get_list_client();
  }
  cancel_activate(data: any) {
    this.tem_cancel_activate = data;
    $('#mdl_cancelactivate').modal('show');
  }
  ok_cancelactivate() {
    this.client.state_client(this.tem_cancel_activate.idclient).subscribe(
      (response) => {
        if (response.success !== undefined) {
          $('#mdl_cancelactivate').modal('hide');
          this.message_info = 'Se ha guardado correctamente los datos!';
          $('#mdlMessageSuccess').modal('show');
          this.get_list_client();
        } else if (response.error !== undefined) {
          $('#mdl_cancelactivate').modal('hide');
          this.message_info = 'Error al anular los datos..!!';
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
    this.client.delete_client(this.tem_cancel_activate.idclient).subscribe(
      (response) => {
        if (response.success !== undefined) {
          $('#mdl_delete').modal('hide');
          this.message_info = 'Se elimino correctamente los datos!';
          $('#mdlMessageSuccess').modal('show');
          this.get_list_client();
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
  edit_client(data: any) {
    this.info_tem_edit = data;
    $('#editclient').modal('show');
  }
  load(data: any) {
    this.select_data = data;
    $('#mdlinfo').modal('show');
  }
  goToPage(n: number): void {
    this.page = n;
    this.get_list_client();
  }
  onNext(): void {
    this.page++;
    this.get_list_client();
  }
  onPrev(): void {
    this.page--;
    this.get_list_client();
  }
  pdf() {
    const o = {
      Buscar: this.descripcion,
      ididentifytype: this.ididentifytype,
      state: this.state,
      column: this.column,
      order: this.order,
      // num_page: this.num_page
    };
    const accion = this.client.filtro_clientexportarpdf(o);
    console.log(accion);
    $('#printtitle').html('Lista de Clientes');
    $('#print').modal('show');
    $('#printbody').html("<object width='100%' height='600' data='" + accion + "'></object>");
  }
  excel () {

    const o = {
      Buscar: this.descripcion,
      ididentifytype: this.ididentifytype,
      state: null,
      column: this.column,
      order: this.order,
      num_page: '1000000000'
    };
    this.client.filtro_client(this.page, o).subscribe(
      (response) => {
        this.list_all_client = response.data;
        this.from = response.from;
        this.total = response.total;
        this.loading = false;
        console.log(this.list_all_client);

        setTimeout(function() {
          $('#list_all_clientes').table2excel({
          exclude: '.noExl',
          filename: 'Lista de Clientes'
        }); }, 3000);

      },
      (error) => {
        console.log(error);
      });
  }
  refresfather(data: any) {
    this.get_list_client();
  }
}
