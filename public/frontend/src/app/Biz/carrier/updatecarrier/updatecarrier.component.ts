import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { CarrierService } from './../../../service/carrier/carrier.service';
import { NomidentifytyService } from './../../../service/identifytype/nomidentifyty.service';

declare var jquery: any;
declare var $: any;

@Component({
  selector: 'app-updatecarrier',
  templateUrl: './updatecarrier.component.html',
  styleUrls: ['./updatecarrier.component.css']
})
export class UpdatecarrierComponent implements OnInit {
  @Input() tem_edit_user: any;
  @Output() update_component_father = new EventEmitter<boolean>();
  @Output() refresh_component_father = new EventEmitter<boolean>();
  listIdentifyType = [];
  constructor(private carrier: CarrierService, private identifytype: NomidentifytyService) { }

  ngOnInit() {
    this.getListIdentifyType();
  }

  getListIdentifyType() {

    this.listIdentifyType.push({idrole: '', identifytypename: '-- Seleccione --'});
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

  update(data: any) {
    this.carrier.update(data.idcarrier, data).subscribe(
      (response) => {
        if (response.success === true) {
          $('#mdlUpdate').modal('hide');
          this.update_component_father.emit(true);
        } else {
          $('#mdlUpdate').modal('hide');
          this.update_component_father.emit(false);
        }
      },
      (error) => {
        console.log('POST call in error", respons', error);
        $('#mdlUpdate').modal('hide');
        this.update_component_father.emit(false);
      });
  }
  refresh() {
    this.refresh_component_father.emit(false);
  }
}
