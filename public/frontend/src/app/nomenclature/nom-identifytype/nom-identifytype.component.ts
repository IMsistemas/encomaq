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
  constructor(private identify: NomidentifytyService) { }

  ngOnInit() {
    $('.dropdown-toggle').dropdown();
    this.get_list_identifytype();
  }
  get_list_identifytype() {
    this.list_identifytype = this.identify.get_identifytype();
  }
  new_identifytype() {
    $('#mdl_new_identifytype').modal('show');
  }
  update_list(evento) {
    if (evento === true) {
      this.get_list_identifytype();
    }
  }
  init_edit_identifytype(data: any) {
    this.info_identifytype_select = data;
    $('#mdl_edit_identifytype').modal('show');
  }
  cancel_activate_identifytype(data: any) {
    this.tem_cancel_activate = data;
    if ( data.state === 1) {
      this.msm_cancel_activate = 'Esta seguro de anular el tipo' + data.identifytypename + '?';
    } else {
      this.msm_cancel_activate = 'Esta seguro de activar el tipo' + data.identifytypename + '?';
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
}