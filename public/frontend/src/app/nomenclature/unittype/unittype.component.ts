import { Component, OnChanges, SimpleChanges, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { UnittypeService } from '../../service/nunittype/unittype.service';
declare var jquery: any;
declare var $: any;
@Component({
  selector: 'app-unittype',
  templateUrl: './unittype.component.html',
  styleUrls: ['./unittype.component.css']
})
export class UnittypeComponent implements OnInit {
  message_info: any;
  list_unittype: Observable<any>;
  info_tem_edit: any;
  tem_cancel_activate: any;
  msm_cancel_activate: any;
  constructor(private unit: UnittypeService) { }

  ngOnInit() {
    $('.dropdown-toggle').dropdown();
    this.get_list_unittype();
  }
  get_list_unittype() {
    this.list_unittype = this.unit.get_unittype();
  }
  new_unittype() {
    $('#addunittype').modal('show');
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
        this.message_info = 'Ha ocurrido un error al intentar agregar un tipo de unidad o la misma ya existe en el sistema..!!';
        $('#mdlMessageError').modal('show');
      } else if (type === 'edit') {
        this.message_info = 'Ha ocurrido un error al intentar editar un tipo de unidad o la misma ya existe en el sistema..!!';
        $('#mdlMessageError').modal('show');
      }
    }
    this.get_list_unittype();
  }
  edit_transferreason(data: any) {
    this.info_tem_edit = data;
    $('#editunittype').modal('show');
  }
  cancel_activate(data: any) {
    this.tem_cancel_activate = data;
    if (data.state === 1) {
      this.msm_cancel_activate = 'Esta seguro de anular la unidad ' + data.unittypename + '?';
    } else {
      this.msm_cancel_activate = 'Esta seguro de activar la unidad ' + data.unittypename + '?';
    }
    $('#mdl_cancelactivate').modal('show');
  }
  ok_cancelactivate() {
    this.unit.delete_unittype(this.tem_cancel_activate.idunittype).subscribe(
      (response) => {
        if (response.success !== undefined) {
          $('#mdl_cancelactivate').modal('hide');
          this.message_info = 'Sea guardado correctamente los datos..!!';
          $('#mdlMessageSuccess').modal('show');
          this.get_list_unittype();
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
}
