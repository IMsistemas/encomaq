import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ClienteService } from '../../../service/bclient/cliente.service';
import { NomidentifytyService } from '../../../service/identifytype/nomidentifyty.service';
declare var jquery: any;
declare var $: any;
@Component({
  selector: 'app-editclient',
  templateUrl: './editclient.component.html',
  styleUrls: ['./editclient.component.css']
})
export class EditclientComponent implements OnInit {
  lis_tipoident = [];
  identifylength = 0;
  @Input() tem_edit: any;
  @Output() update_component_father = new EventEmitter<boolean>();
  @Output() refresh_component_father = new EventEmitter<boolean>();
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
          form.identify = '';
        }

      }
    }
  }
  modify_client(data: any, frmeditclient) {

    let flag = true;

    if (this.identifylength !== 0 && this.identifylength !== 1000) {
      if (String(data.identify).length !== this.identifylength) {
        flag = false;
      }
    }

    if (flag === true) {
      this.client.edit_client(data.idclient, data).subscribe(
        (response) => {
          if (response.success !== undefined) {
            $('#editclient').modal('hide');
            frmeditclient.reset();
            this.update_component_father.emit(true);
          } else if (response.error !== undefined) {
            $('#editclient').modal('hide');
            this.update_component_father.emit(false);
          }
        },
        (error) => {
          console.log('POST call in error", respons', error);
          $('#editclient').modal('hide');
          this.update_component_father.emit(false);
        });
    } else {
      $('#mdl_length1').modal('show');
    }

  }
  refresh() {
    this.refresh_component_father.emit(false);
  }
}
