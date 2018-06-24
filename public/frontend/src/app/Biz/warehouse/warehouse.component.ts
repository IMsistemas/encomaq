import { Component, OnChanges, SimpleChanges, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { WarehouseService } from '../../service/bwarehouse/warehouse.service';
declare var jquery: any;
declare var $: any;
@Component({
  selector: 'app-warehouse',
  templateUrl: './warehouse.component.html',
  styleUrls: ['./warehouse.component.css']
})
export class WarehouseComponent implements OnInit {
  message_info: any;
  list_warehouse: Observable<any>;
  info_tem_edit: any;
  tem_cancel_activate: any;
  msm_cancel_activate: any;
  constructor(private ware: WarehouseService) { }

  ngOnInit() {
    $('.modal').draggable();
    $('.dropdown-toggle').dropdown();
    this.get_list_warehouse();
  }
  get_list_warehouse() {
    this.list_warehouse = this.ware.get_warehouse();
  }
  new_warehouse() {
    $('#addwarehouse').modal('show');
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
        this.message_info = 'Ha ocurrido un error al intentar agregar una bodega o la misma ya existe en el sistema..!!';
        $('#mdlMessageError').modal('show');
      } else if (type === 'edit') {
        this.message_info = 'Ha ocurrido un error al intentar editar una bodega o la misma ya existe en el sistema..!!';
        $('#mdlMessageError').modal('show');
      }
    }
    this.get_list_warehouse();
  }
  edit_warehouse(data: any) {
    this.info_tem_edit = data;
    $('#editwarehouse').modal('show');
  }
  cancel_activate(data: any) {
    this.tem_cancel_activate = data;
    $('#mdl_cancelactivate').modal('show');
  }
  ok_cancelactivate() {
    this.ware.state_warehouse(this.tem_cancel_activate.idwarehouse).subscribe(
      (response) => {
        if (response.success !== undefined) {
          $('#mdl_cancelactivate').modal('hide');
          this.message_info = 'Sea guardado correctamente los datos..!!';
          $('#mdlMessageSuccess').modal('show');
          this.get_list_warehouse();
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
    this.ware.delete_warehouse(this.tem_cancel_activate.idwarehouse).subscribe(
      (response) => {
        if (response.success !== undefined) {
          $('#mdl_delete').modal('hide');
          this.message_info = 'Sea elimino correctamente los datos..!!';
          $('#mdlMessageSuccess').modal('show');
          this.get_list_warehouse();
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
  refresfather(data: any) {
    this.get_list_warehouse();
  }
}
