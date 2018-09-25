import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { catchError, retry } from 'rxjs/operators';
import { NgForm } from '@angular/forms';
import { ClienteService } from '../../../service/bclient/cliente.service';
import { NomidentifytyService } from '../../../service/identifytype/nomidentifyty.service';
declare var jquery: any;
declare var $: any;
@Component({
  selector: 'app-addclient',
  templateUrl: './addclient.component.html',
  styleUrls: ['./addclient.component.css']
})
export class AddclientComponent implements OnInit {
  @Output() update_component_father = new EventEmitter<boolean>();
  lis_tipoident = [];
  identifylength = 0;
  constructor(private client: ClienteService, private tipo: NomidentifytyService) { }

  ngOnInit() {
    this.list_identifytype();
  }
  list_identifytype() {
    this.lis_tipoident.push({ ididentifytype: '', identifytypename: '-- Identificación --' });
    this.tipo.get_identifytype().subscribe(
      (response) => {
        for (const idt of response) {
          const o = {
            ididentifytype: idt.ididentifytype,
            identifytypename: idt.identifytypename,
            identifylength: idt.identifylength
          };
          this.lis_tipoident.push(o);
        }
      },
      (error) => {
        console.log('POST call in error", respons', error);
      });
  }
  changeIdentify(form) {
    if (form.ididentifytype !== '') {
      for (const idt of this.lis_tipoident) {

        if (parseInt(form.ididentifytype, 0) === parseInt(idt.ididentifytype, 0)) {
          if (idt.identifylength !== null && idt.identifylength !== undefined && idt.identifylength !== '') {
            this.identifylength = parseInt(idt.identifylength, 0);
          } else {
            this.identifylength = 1000;
          }
          $('#identify').val('');
        }

      }
    }
  }
  add_client(data, frmclient) {

    let flag = true;

    if (this.identifylength !== 0 && this.identifylength !== 1000) {
      if (String(data.identify).length !== this.identifylength) {
        flag = false;
      }
    }

    if (flag === true) {

      this.client.add_client(data).subscribe(
        (response) => {
          if (response.success !== undefined) {
            $('#addclient').modal('hide');
            this.update_component_father.emit(true);
            frmclient.reset();
          } else if (response.error !== undefined) {
            $('#addclient').modal('hide');
            this.update_component_father.emit(false);
          }
        },
        (error) => {
          console.log('POST call in error", respons', error);
          $('#addclient').modal('hide');
          this.update_component_father.emit(false);
        });

    } else {
      $('#mdl_length').modal('show');
    }

  }
}
