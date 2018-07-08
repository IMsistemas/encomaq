import { Component, OnChanges, SimpleChanges, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ContractService } from '../../service/bcontract/contract.service';
declare var jquery: any;
declare var $: any;
@Component({
  selector: 'app-contract',
  templateUrl: './contract.component.html',
  styleUrls: ['./contract.component.css']
})
export class ContractComponent implements OnInit {
  message_info: any;
  list_contract = [];
  info_tem_edit: any;
  tem_cancel_activate: any;
  msm_cancel_activate: any;
  descripcion: any = '';
  idcategory: any = '';
  idunittype: any = '';
  state = '1';
  column = 'biz_contract.nocontract';
  order = 'ASC';
  num_page = 5;
  /*variables para paginar*/
  loading = false;
  total = 0;
  page = 1;
  limit = 0;
  from = 0;
  /*variables para paginar*/
  idcliente_select: any;
  globalitem_select: any;
  info_datacontract: any;
  constructor(private contract: ContractService) { }

  ngOnInit() {
    $('#myTab a').on('click', function (e) {
      e.preventDefault();
      $(this).tab('show');
    });
    $('.modal').draggable();
    $('.dropdown-toggle').dropdown();
    this.get_list_contract();
  }
  get_list_contract() {
    const o = {
      Buscar: this.descripcion,
      idcategoryitem: this.idcategory,
      idunittype: this.idunittype,
      state: this.state,
      column: this.column,
      order: this.order,
      num_page: this.num_page
    };
    this.contract.filtro_contract(this.page, o).subscribe(
      (response) => {
        this.list_contract = response.data;
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
    this.get_list_contract();
  }
  onNext(): void {
    this.page++;
    this.get_list_contract();
  }
  onPrev(): void {
    this.page--;
    this.get_list_contract();
  }
  new_contract() {
    this.idcliente_select = { idclient: '' };
    this.globalitem_select = { iditem: ''};
    $('#addcontract').modal('show');
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
        this.message_info = 'Ha ocurrido un error al intentar agregar un contrato o el mismo ya existe en el sistema!';
        $('#mdlMessageError').modal('show');
      } else if (type === 'edit') {
        this.message_info = 'Ha ocurrido un error al intentar editar un contrato o el mismo ya existe en el sistema!';
        $('#mdlMessageError').modal('show');
      }
    }
    this.get_list_contract();
  }

  idclient_select(n): void {
    this.idcliente_select = n;
  }
  itemglobal_select(n): void {
    this.globalitem_select = n;
  }
  edit_contract (data: any) {
    this.info_tem_edit = data;
    console.log(data);
    this.idcliente_select = data.biz_client;
    $('#editcontract').modal('show');
  }
  cancel_activate(data: any) {
    this.tem_cancel_activate = data;
    $('#mdl_cancelactivate').modal('show');
  }
  ok_cancelactivate() {
    this.contract.state_contract(this.tem_cancel_activate.idcontract).subscribe(
      (response) => {
        if (response.success !== undefined) {
          $('#mdl_cancelactivate').modal('hide');
          this.message_info = 'Se ha guardado correctamente los datos!';
          $('#mdlMessageSuccess').modal('show');
          this.get_list_contract();
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
    this.contract.delete_contract(this.tem_cancel_activate.idcontract).subscribe(
      (response) => {
        if (response.success !== undefined) {
          $('#mdl_delete').modal('hide');
          this.message_info = 'Se elimino correctamente los datos!';
          $('#mdlMessageSuccess').modal('show');
          this.get_list_contract();
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

  pdf() {
    const o = {
      Buscar: this.descripcion,
      idcategoryitem: this.idcategory,
      idunittype: this.idunittype,
      state: this.state,
      column: this.column,
      order: this.order
    };
    const accion = this.contract.filtro_contractexportarpdf(o);
    console.log(accion);
    $('#printtitle').html('Lista de contratos');
    $('#print').modal('show');
    $('#printbody').html("<object width='100%' height='600' data='" + accion + "'></object>");
  }
  excel() {
    $('#list_contract').table2excel({
      exclude: '.noExl',
      filename: 'Lista de contratos'
    });
  }
  refresfather(data: any) {
    this.get_list_contract();
  }
  view_info(data: any) {
    console.log(data);
    this.info_datacontract = data;
    $('#info_datacontract').modal('show');
  }
}
