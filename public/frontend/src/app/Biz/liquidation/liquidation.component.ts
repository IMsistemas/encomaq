import { Component, OnChanges, SimpleChanges, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { LiquidationService } from '../../service/bliquidation/liquidation.service';
declare var jquery: any;
declare var $: any;
@Component({
  selector: 'app-liquidation',
  templateUrl: './liquidation.component.html',
  styleUrls: ['./liquidation.component.css']
})
export class LiquidationComponent implements OnInit {
  message_info: any;
  list_liquidation = [];
  info_tem_edit: any;
  tem_cancel_activate: any;
  msm_cancel_activate: any;
  /*variables para paginar*/
  descripcion: any = '';
  state = '1';
  column = 'number';
  order = 'ASC';
  num_page = 5;
  loading = false;
  total = 0;
  page = 1;
  limit = 0;
  from = 0;
  /*variables para paginar*/
  idcliente_select: any;
  constructor(private liquidation: LiquidationService) { }

  ngOnInit() {
    this.get_list_liquidation();
  }
  new_liquidation() {
    $('#addliquidation').modal('show');
  }
  get_list_liquidation() {
    const o = {
      Buscar: this.descripcion,
      state: this.state,
      column: this.column,
      order: this.order,
      num_page: this.num_page
    };
    this.liquidation.filtro_liquidation(this.page, o).subscribe(
      (response) => {
        this.list_liquidation = response.data;
        this.from = response.from;
        this.total = response.total;
        this.loading = false;
        console.log(this.list_liquidation);
      },
      (error) => {
        console.log(error);
      });
  }
  goToPage(n: number): void {
    this.page = n;
    this.get_list_liquidation();
  }
  onNext(): void {
    this.page++;
    this.get_list_liquidation();
  }
  onPrev(): void {
    this.page--;
    this.get_list_liquidation();
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
        this.message_info = 'Ha ocurrido un error al intentar agregar una liquidacion o la misma ya existe en el sistema!';
        $('#mdlMessageError').modal('show');
      } else if (type === 'edit') {
        this.message_info = 'Ha ocurrido un error al intentar editar una liquidacion o la misma ya existe en el sistema!';
        $('#mdlMessageError').modal('show');
      }
    }
    this.get_list_liquidation();
  }
  edit_liquidation(data: any) {
    this.info_tem_edit = data;
    $('#editliquidation').modal('show');
  }
  refresfather(data: any) {
    this.get_list_liquidation();
  }
  cancel_activate(data: any) {
    this.tem_cancel_activate = data;
    $('#mdl_cancelactivate').modal('show');
  }
  ok_cancelactivate() {
    this.liquidation.state_liquidation(this.tem_cancel_activate.idliquidation).subscribe(
      (response) => {
        if (response.success !== undefined) {
          $('#mdl_cancelactivate').modal('hide');
          this.message_info = 'Se ha guardado correctamente los datos!';
          $('#mdlMessageSuccess').modal('show');
          this.get_list_liquidation();
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
    this.liquidation.delete_liquidation(this.tem_cancel_activate.idliquidation).subscribe(
      (response) => {
        if (response.success !== undefined) {
          $('#mdl_delete').modal('hide');
          this.message_info = 'Se elimino correctamente los datos!';
          $('#mdlMessageSuccess').modal('show');
          this.get_list_liquidation();
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
  excel() {
    $('#list_liquidation').table2excel({
      exclude: '.noExl',
      filename: 'Lista de liquidaciones'
    });
  }
  pdf() {
    const o = {
      Buscar: this.descripcion,
      state: this.state,
      column: this.column,
      order: this.order
    };
    const accion = this.liquidation.filtro_liquidationexportarpdf(o);
    $('#printtitle').html('Lista de Liquidaciones');
    $('#print').modal('show');
    $('#printbody').html("<object width='100%' height='600' data='" + accion + "'></object>");
  }

  idclient_select(n): void {
    this.idcliente_select = n;
  }
}
