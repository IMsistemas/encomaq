import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { NgForm } from '@angular/forms';
import { ContractService } from '../../../service/bcontract/contract.service';
import { CarrierService } from '../../../service/carrier/carrier.service';
import { ItemService } from '../../../service/bitem/item.service';
import { ReasontransferService } from '../../../service/ntranseferreason/reasontransfer.service';
import { ReferralguideService } from '../../../service/referralguide/referralguide.service';

declare var jquery: any;
declare var $: any;

@Component({
  selector: 'app-createreferralguide',
  templateUrl: './createreferralguide.component.html',
  styleUrls: ['./createreferralguide.component.css']
})
export class CreatereferralguideComponent implements OnInit {

  @Output() update_component_father = new EventEmitter<boolean>();
  lis_client = [];
  lis_item = [];
  list_itemcont = [];
  listTransferReason = [];
  listContract = [];
  list_carrier = [];

  @Input() idcontract_s: any; //
  @Input() item_select: any;
  @Input() carrier_select: any;

  constructor(
    private contract: ContractService,
    private carrier: CarrierService,
    private item: ItemService,
    private transferreason: ReasontransferService,
    private referra: ReferralguideService
  ) { }

  ngOnInit() {

    this.idcontract_s = { idcontract: '', biz_client: {businessname: ''} };
    this.carrier_select = { idcarrier: '', carriername: '', identify: '', licenseplate: '' };

    this.loadInitJQuery();
    this.getContractActive();
    this.getTransferActive();
    this.getCarrierActive();
    this.list_items();
  }

  loadInitJQuery() {
    $('#myTab a').on('click', function (e) {
      e.preventDefault();
      $(this).tab('show');
    });
    $('.modal').draggable();
    $('.dropdown-toggle').dropdown();
    $('.modal-dialog').draggable();
  }

  getTransferActive() {
    this.listTransferReason.push({ idtransferreason: '', transferreasonname: '--Seleccione--' });
    this.transferreason.getTransferActive().subscribe(
      (response) => {
        for (const cat of response) {
          const o = {
            idtransferreason: cat.idtransferreason,
            transferreasonname: cat.transferreasonname
          };
          this.listTransferReason.push(o);
        }
      },
      (error) => {
        console.log('POST call in error", respons', error);
      });
  }

  getContractActive() {
    this.listContract.push({ idcontract: '', nocontract: '--Seleccione--' });
    this.contract.getContractActive().subscribe(
      (response) => {
        for (const cat of response) {
          const o = {
            idcontract: cat.idcontract,
            nocontract: cat.nocontract
          };
          this.listContract.push(o);
        }
      },
      (error) => {
        console.log('POST call in error", respons', error);
      });
  }

  getCarrierActive() {
    this.list_carrier.push({ idcarrier: '', carriername: '--Seleccione--' });
    this.carrier.get().subscribe(
      (response) => {
        for (const cat of response) {
          const o = {
            idcarrier: cat.idcarrier,
            carriername: cat.carriername
          };
          this.list_carrier.push(o);
        }
      },
      (error) => {
        console.log('POST call in error", respons', error);
      });
  }

  list_items() {
    this.lis_item.push({ iditem: '', itemname: '--Seleccione--' });
    this.item.get_item().subscribe(
      (response) => {
        for (const cat of response) {
          const o = {
            iditem: cat.iditem,
            itemname: cat.itemname
          };
          this.lis_item.push(o);
        }
      },
      (error) => {
        console.log('POST call in error", respons', error);
      });
  }
  searchContract() {
    $('.listcontract').modal('show');
  }
  searchCarrier() {
    $('.listcarrier').modal('show');
  }
  addrwo() {
    console.log(this.list_itemcont);
    const o = {
      iditem: '',
      quantity: 0,
      observation: ''
    };
    this.list_itemcont.push(o);
    console.log(this.list_itemcont);
  }
  removerow(data) {
    const posicion = this.list_itemcont.indexOf(data);
    this.list_itemcont.splice(posicion, 1);
  }
  search_item(fila) {
    $('.listitems').modal('show');
    fila.iditem = this.item_select.iditem;
    console.log(fila);
    console.log(this.item_select);
  }
  add(data, frm) {
    const aux = {
      Data: data,
      list: this.list_itemcont
    };
    this.referra.create(aux).subscribe(
      (response) => {
        console.log(response);
        if (response.success !== undefined) {
          $('#createreferralguide').modal('hide');
          frm.reset();
          this.list_itemcont = [];
          this.update_component_father.emit(true);
        } else if (response.error !== undefined) {
          $('#addclient').modal('hide');
          frm.reset();
          this.update_component_father.emit(false);
        }
      },
      (error) => {
        console.log('POST call in error", respons', error);
        $('#createreferralguide').modal('hide');
        frm.reset();
        this.update_component_father.emit(false);
      });
  }

}
