import { Component, OnChanges, SimpleChanges, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { NomidentifytyService } from '../../service/identifytype/nomidentifyty.service';
declare var jquery: any;
declare var $: any;
@Component({
  selector: 'app-nom-identifytype',
  templateUrl: './nom-identifytype.component.html',
  styleUrls: ['./nom-identifytype.component.css']
})
export class NomIdentifytypeComponent implements OnInit {
  list_identifytype: Observable<any>;
  info_identifytype_select: any;
  msm_cancel_activate: any;
  tem_cancel_activate: any;
  message_info: any;
  constructor(private identify: NomidentifytyService) { }

  ngOnInit() {
    $('.modal').draggable();
    $('.dropdown-toggle').dropdown();
    this.get_list_identifytype();
  }
  get_list_identifytype() {
    this.list_identifytype = this.identify.get_identifytype();
  }
  new_identifytype() {
    $('#mdl_new_identifytype').modal('show');
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
        this.message_info = 'Ha ocurrido un error al intentar agregar el tipo de identificación o la misma ya existe en el sistema!';
        $('#mdlMessageError').modal('show');
      } else if (type === 'edit') {
        this.message_info = 'Ha ocurrido un error al intentar editar el tipo de identificación o la misma ya existe en el sistema!';
        $('#mdlMessageError').modal('show');
      }
    }
    this.get_list_identifytype();
  }
  init_edit_identifytype(data: any) {
    this.info_identifytype_select = data;
    $('#mdl_edit_identifytype').modal('show');
  }
  cancel_activate_identifytype(data: any) {
    this.tem_cancel_activate = data;
    if ( data.state === 1) {
      this.msm_cancel_activate = 'Esta seguro de anular el tipo ' + data.identifytypename + '?';
    } else {
      this.msm_cancel_activate = 'Esta seguro de activar el tipo ' + data.identifytypename + '?';
    }
    $('#mdl_cancel_identifytype').modal('show');
  }
  ok_cancel_identifytype() {
    this.identify.delete_identifytype(this.tem_cancel_activate.ididentifytype).subscribe(
      (response) => {
        if (response.success !== undefined) {
          $('#mdl_cancel_identifytype').modal('hide');
          this.get_list_identifytype();
        } else if (response.error !== undefined) {
          $('#mdl_cancel_identifytype').modal('hide');
        }
      },
      (error) => {
        console.log('POST call in error", respons', error);
        $('#mdl_cancel_identifytype').modal('hide');
      });
  }
  delete(data: any) {
    this.tem_cancel_activate = data;
    $('#mdl_delete').modal('show');
  }
  ok_delete() {
    this.identify.delete_okidentifytype(this.tem_cancel_activate.ididentifytype).subscribe(
      (response) => {
        if (response.success !== undefined) {
          $('#mdl_delete').modal('hide');
          this.get_list_identifytype();
          this.message_info = 'Se ha eliminado correctamente los datos!';
          $('#mdlMessageSuccess').modal('show');
        } else if (response.error !== undefined) {
          $('#mdl_delete').modal('hide');
          this.message_info = 'Error al eliminar los datos!';
          $('#mdlMessageError').modal('show');
        }
      },
      (error) => {
        console.log('POST call in error", respons', error);
        $('#mdl_delete').modal('hide');
        this.message_info = 'Error al eliminar los datos!';
        $('#mdlMessageError').modal('show');
      });
  }
  refresfather(data: any) {
    this.get_list_identifytype();
  }
}
