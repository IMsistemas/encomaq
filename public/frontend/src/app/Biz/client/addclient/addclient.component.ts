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
            identifytypename: idt.identifytypename
          };
          this.lis_tipoident.push(o);
        }
      },
      (error) => {
        console.log('POST call in error", respons', error);
      });
  }
  add_client(data) {
    this.client.add_client(data).subscribe(
      (response) => {
        if (response.success !== undefined) {
          $('#addclient').modal('hide');
          this.update_component_father.emit(true);
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
  }
}
