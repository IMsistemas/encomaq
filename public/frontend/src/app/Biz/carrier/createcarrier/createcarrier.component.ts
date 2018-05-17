import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { catchError, retry } from 'rxjs/operators';
import { NgForm } from '@angular/forms';
import { CarrierService } from './../../../service/carrier/carrier.service';
import { NomidentifytyService } from './../../../service/identifytype/nomidentifyty.service';

declare var jquery: any;
declare var $: any;

@Component({
  selector: 'app-createcarrier',
  templateUrl: './createcarrier.component.html',
  styleUrls: ['./createcarrier.component.css']
})
export class CreatecarrierComponent implements OnInit {
  @Output() update_component_father = new EventEmitter<boolean>();
  listIdentifyType = [];
  message_success: any;
  message_error: any;
  constructor(private carrier: CarrierService, private identifytype: NomidentifytyService) { }

  ngOnInit() {
    this.getListIdentifyType();
  }

  getListIdentifyType() {

    this.listIdentifyType.push({ididentifytype: '', identifytypename: '-- Seleccione --'});
    this.identifytype.get_identifytype_active().subscribe(
      (response) => {

        for (let e of response) {
          let obj: Object = {
            ididentifytype: e.ididentifytype,
            identifytypename: e.identifytypename
          };
          this.listIdentifyType.push(obj);
        }

      },
      (error) => {
        console.log('POST call in error", respons', error);
        $('#mdlCreate').modal('hide');
        this.update_component_father.emit(false);
      });

  }

  create(data) {
    this.carrier.create(data).subscribe(
      (response) => {
        if (response.success === true) {
          $('#mdlCreate').modal('hide');
          this.update_component_father.emit(true);
        } else {
          $('#mdlCreate').modal('hide');
          this.update_component_father.emit(false);
        }
      },
      (error) => {
        console.log('POST call in error", respons', error);
        $('#mdlCreate').modal('hide');
        this.update_component_father.emit(false);
      });
  }

}
