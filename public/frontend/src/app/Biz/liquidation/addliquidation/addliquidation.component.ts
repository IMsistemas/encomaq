import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ReferralguideService } from '../../../service/referralguide/referralguide.service';
import { LiquidationService } from '../../../service/bliquidation/liquidation.service';
declare var jquery: any;
declare var $: any;
@Component({
  selector: 'app-addliquidation',
  templateUrl: './addliquidation.component.html',
  styleUrls: ['./addliquidation.component.css']
})
export class AddliquidationComponent implements OnInit {
  @Output() update_component_father = new EventEmitter<boolean>();
  message_info: any;

  /*variables para paginar*/
  listReferralGuide = [];
  descripcion: any = '';
  idcategory: any = '';
  idunittype: any = '';
  state = '1';
  column = 'biz_contract.nocontract';
  search: any = '';
  order = 'ASC';
  num_page = 5;
  loading = false;
  total = 0;
  page = 1;
  limit = 0;
  from = 0;
  /*variables para paginar*/
  list_guias = [];
  mensage: any;
  subtotal: any;
  porcentaje = 12;
  iva: any;
  totalprecio: any;
  constructor(private referralguide: ReferralguideService, private liquidation: LiquidationService ) { }
  ngOnInit() {
    this.getList();
  }

  addliuidation() {
    $('#addrwo').modal('show');
  }


  getList() {

    const o = {
      search: this.descripcion,
      state: this.state,
      column: this.column,
      order: this.order,
      num_page: this.num_page
    };

    this.referralguide.get(this.page, o).subscribe(
      (response) => {
        this.listReferralGuide = response.data;
        this.from = response.from;
        this.total = response.total;
        this.loading = false;
      },
      (error) => {
        console.log(error);
      });

  }
  goToPage(n: number): void {
    this.page = n;
    this.getList();
  }

  onNext(): void {
    this.page++;
    this.getList();
  }

  onPrev(): void {
    this.page--;
    this.getList();
  }
  close_listguias() {
    $('#addrwo').modal('hide');
  }
  close_info() {
    $('#infoerrors').modal('hide');
  }
  select_guia(data: any) {
    this.close_listguias();
    if (this.list_guias.length == 0) {
      this.list_guias.push(data);
    } else {
      const resultado = this.list_guias.find(guia => guia.idreferralguide === data.idreferralguide );
      if (resultado != undefined) {
        $('#infoerrors').modal('show');
        this.mensage = 'La guía de remisión seleccionada ya esta asignada a la liquidación';
      } else {
        this.list_guias.push(data);
      }
    }
    for (const i of this.list_guias) {
      for (const e of i.biz__referralguideitem) {
        e.biz_item.price = parseFloat(e.biz_item.price);
      }
    }
    this.calcula();
    console.log(this.list_guias);
  }
  calcula() {
    this.subtotal = 0;
    this.iva = 0;
    this.totalprecio = 0;
    for (const i of this.list_guias) {
      for (const e of i.biz__referralguideitem) {
        this.subtotal   += ( parseFloat(e.biz_item.price) * e.quantify );
      }
    }
    if (this.subtotal != 0) {
      this.iva = (( this.subtotal * this.porcentaje) / 100);
    }
    this.totalprecio =  this.subtotal +  this.iva;
  }

  removerow(data) {
    const posicion = this.list_guias.indexOf(data);
    this.list_guias.splice(posicion, 1);
    this.calcula();
  }
  add_liquidation( data: any, frm: any) {
    const o = {
      Data: data,
      list: this.list_guias,
      Subtotal: this.subtotal,
      Iva: this.iva,
      Total: this.totalprecio
    };
    this.liquidation.add_liquidation(o).subscribe(
      (response) => {
        if (response.success !== undefined) {
          $('#addliquidation').modal('hide');
          frm.reset();
          this.list_guias = [];
          this.calcula();
          this.update_component_father.emit(true);
        } else if (response.error !== undefined) {
          frm.reset();
          this.update_component_father.emit(false);
        }
      },
      (error) => {
        console.log('POST call in error", respons', error);
        $('#addliquidation').modal('hide');
        frm.reset();
        this.update_component_father.emit(false);
      });
  }
}
