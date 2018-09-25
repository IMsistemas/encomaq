import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { NgForm } from '@angular/forms';
import { ReasontransferService } from '../../../service/ntranseferreason/reasontransfer.service';
import { ItemService } from '../../../service/bitem/item.service';
import { ReferralguideService } from '../../../service/referralguide/referralguide.service';
import { ItempriceService } from '../../../service/bitemprice/itemprice.service';

declare var jquery: any;
declare var $: any;

@Component({
  selector: 'app-updatereferralguide',
  templateUrl: './updatereferralguide.component.html',
  styleUrls: ['./updatereferralguide.component.css']
})
export class UpdatereferralguideComponent implements OnInit {

  @Output() update_component_father = new EventEmitter<boolean>();
  @Output() refresh_component_father = new EventEmitter<boolean>();
  @Output() field_selected = new EventEmitter<boolean>();
  @Input() tem_edit: any;
  lis_client = [];
  lis_item = [];
  list_itemcont = [];
  fieldPlace = 0;
  @Input() idcontract_s: any; //
  @Input() item_select: any;
  @Input() carrier_select: any;
  @Input() place_select_start: any;
  @Input() place_select_end: any;

  listTransferReason = [];
  constructor(private transferreason: ReasontransferService, private item: ItemService, private referra: ReferralguideService,
    private itemPrice: ItempriceService ) { }

  ngOnInit() {
    this.place_select_start = { idplace: '', placename: ''};
    this.place_select_end = { idplace: '', placename: ''};
    this.getTransferActive();
    this.list_items();
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
  searchPlace(n) {
    this.field_selected.emit(n);
    // this.fieldPlace = n;
    $('#listPlaceShow').modal('show');
  }
  addrwo() {
    const o = {
      iditem: '',
      price: 0,
      biz_item: { biz_price: []},
      quantity: 0,
      observation: ''
    };
    this.tem_edit.biz__referralguideitem.push(o);
  }
  removerow(data) {
    const posicion = this.tem_edit.biz__referralguideitem.indexOf(data);
    this.tem_edit.biz__referralguideitem.splice(posicion, 1);
  }
  edit (data: any) {
    data.idcarrier = this.carrier_select.idcarrier;
    data.idcontract = this.idcontract_s.idcontract;

    if (data.biz_referralguide_place.length !== 0) {
      data.biz_referralguide_place[0].biz_place_start.idplace = this.place_select_start.idplace;
      data.biz_referralguide_place[0].biz_place_start.placename = this.place_select_start.placename;
      data.biz_referralguide_place[0].biz_place_end.idplace = this.place_select_end.idplace;
      data.biz_referralguide_place[0].biz_place_end.placename = this.place_select_end.placename;
    } else {
      const a = {
        biz_place_start: {
          idplace: this.place_select_start.idplace,
          placename: this.place_select_start.placename
        },
        biz_place_end: {
          idplace: this.place_select_end.idplace,
          placename: this.place_select_end.placename
        }
      };
      data.biz_referralguide_place.push(a);
    }

    console.log(data);

    const idplace_start = data.biz_referralguide_place[0].biz_place_start.idplace;
    const idplace_end = data.biz_referralguide_place[0].biz_place_end.idplace;

    if (parseInt(idplace_start, 0) !== parseInt(idplace_end, 0)) {
      this.referra.update(data.idreferralguide, data).subscribe(
        (response) => {
          if (response.success !== undefined) {
            $('#updatereferralguide').modal('hide');
            this.carrier_select.idcarriert = data.biz_carrier;
            this.idcontract_s.idcontract = data.biz_contract;
            this.update_component_father.emit(true);
          } else if (response.error !== undefined) {
            $('#updatereferralguide').modal('hide');
            this.update_component_father.emit(false);
          }
        },
        (error) => {
          console.log('POST call in error", respons', error);
          $('#updatereferralguide').modal('hide');
          this.update_component_father.emit(false);
        });
    } else {
      $('#mdl_equalsplace0').modal('show');
    }

  }
  refresh() {
    this.refresh_component_father.emit(false);
  }
  excel() {
    $('#guiaderemision').table2excel({
      exclude: '.noExl',
      filename: 'Guía de remisión'
    });
  }
  pdf() {
    const accion = this.referra.referraexportarpdf(this.tem_edit.idreferralguide);
    console.log(accion);
    $('#printtitle').html('Guía De Remisión');
    $('#print').modal('show');
    $('#printbody').html("<object width='100%' height='600' data='" + accion + "'></object>");
  }


  getListPrice(item) {
    console.log(item);
    this.itemPrice.price_item(item.iditem).subscribe(
      (response) => {
        console.log(response);
         item.biz_item.biz_price = response;
         if ( response.length > 0 ) {
           item.price = response[0].price;
         }
         console.log(item);
      },
      (error) => {

      });
  }
}
