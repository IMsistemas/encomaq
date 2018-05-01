import { Component, OnChanges, SimpleChanges, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ReasontransferService } from '../../service/ntranseferreason/reasontransfer.service';
declare var jquery: any;
declare var $: any;
@Component({
  selector: 'app-transferreason',
  templateUrl: './transferreason.component.html',
  styleUrls: ['./transferreason.component.css']
})
export class TransferreasonComponent implements OnInit {
  message_info: any;
  list_transferreason: Observable<any>;
  info_tem_edit: any;
  tem_cancel_activate: any;
  msm_cancel_activate: any;
  constructor(private transfer: ReasontransferService) { }

  ngOnInit() {
    $('.dropdown-toggle').dropdown();
    this.get_list_transferreason();
  }
  get_list_transferreason() {
    this.list_transferreason = this.transfer.get_transferreason();
  }
  new_transferreason() {
    $('#addtransferreason').modal('show');
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
      this.get_list_transferreason();
    } else {
      if (type === 'create') {
        this.message_info = 'Error al guardar los datos..!!';
        $('#mdlMessageError').modal('show');
      } else if (type === 'edit') {
        this.message_info = 'Error al editar los datos..!!';
        $('#mdlMessageError').modal('show');
      }
    }
  }
  edit_transferreason(data: any) {
    this.info_tem_edit = data;
    $('#edittransferreason').modal('show');
  }
  cancel_activate(data: any) {
    this.tem_cancel_activate = data;
    if (data.state === 1) {
      this.msm_cancel_activate = 'Esta seguro de anular la categoria' + data.transferreasonname + '?';
    } else {
      this.msm_cancel_activate = 'Esta seguro de activar la categoria' + data.transferreasonname + '?';
    }
    $('#mdl_cancelactivate').modal('show');
  }
  ok_cancelactivate() {
    this.transfer.delete_transferreason(this.tem_cancel_activate.idtransferreason).subscribe(
      (response) => {
        if (response.success !== undefined) {
          $('#mdl_cancelactivate').modal('hide');
          this.message_info = 'Sea guardado correctamente los datos..!!';
          $('#mdlMessageSuccess').modal('show');
          this.get_list_transferreason();
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
