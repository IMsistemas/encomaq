import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { NgForm } from '@angular/forms';
import { ReferralguideService } from '../../../service/referralguide/referralguide.service';
import { LiquidationService } from '../../../service/bliquidation/liquidation.service';
declare var jquery: any;
declare var $: any;
@Component({
  selector: 'app-editliquidation',
  templateUrl: './editliquidation.component.html',
  styleUrls: ['./editliquidation.component.css']
})
export class EditliquidationComponent implements OnInit {
  @Input() tem_edit: any;
  @Output() update_component_father = new EventEmitter<boolean>();
  @Output() refresh_component_father = new EventEmitter<boolean>();
  mensage: any;
  subtotal: any;
  porcentaje = 12;
  iva: any;
  totalprecio: any;
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
  constructor(private referralguide: ReferralguideService, private liquidation: LiquidationService) { }

  ngOnInit() {
    this.getList();
  }
  addliuidation() {
    $('#addliquidationedit').modal('show');
    this.getList();
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
    $('#addliquidationedit').modal('hide');
  }
  close_info() {
    $('#infoerrorsliquidation').modal('hide');
  }
  select_guia(data: any) {
    // biz_referralguide.biz__referralguideitem
    this.close_listguias();
    if (this.tem_edit.biz_referralguideliquidation.length == 0) {
      const aux = {
        idliquidation: this.tem_edit.idliquidation,
        idreferralguide: data.idreferralguide,
        biz_referralguide: data
      };
      this.tem_edit.biz_referralguideliquidation.push(aux);
    } else {
      const resultado = this.tem_edit.biz_referralguideliquidation.find(guia => guia.idreferralguide === data.idreferralguide);
      if (resultado != undefined) {
        $('#infoerrors').modal('show');
        this.mensage = 'La guía de remisión seleccionada ya esta asignada a la liquidación';
      } else {
        const aux = {
          idliquidation: this.tem_edit.idliquidation,
          idreferralguide: data.idreferralguide,
          biz_referralguide: data
        };
        this.tem_edit.biz_referralguideliquidation.push(aux);
      }
    }
    /*for (const i of this.list_guias) {
      for (const e of i.biz__referralguideitem) {
        e.biz_item.price = parseFloat(e.biz_item.price);
      }
    }*/
    this.calcula();
  }
  calcula() {
    this.subtotal = 0;
    this.iva = 0;
    this.totalprecio = 0;
    for (const i of this.tem_edit.biz_referralguideliquidation) {
      for (const e of i.biz_referralguide.biz__referralguideitem) {
        this.subtotal += (parseFloat(e.biz_item.price) * e.quantify);
      }
    }
    if (this.subtotal != 0) {
      this.iva = ((this.subtotal * this.porcentaje) / 100);
    }
    this.totalprecio = this.subtotal + this.iva;
  }
  removerow(data) {
    const posicion = this.tem_edit.biz_referralguideliquidation.indexOf(data);
    this.tem_edit.biz_referralguideliquidation.splice(posicion, 1);
    this.calcula();
  }
  edit_liquidation(data: any, frm: any) {

    data.subtotal = this.subtotal;
    data.iva = this.iva;
    data.total = this.totalprecio;
    this.liquidation.edit_liquidation(data.idliquidation, data).subscribe(
      (response) => {
        if (response.success !== undefined) {
          $('#editliquidation').modal('hide');
          frm.reset();
          this.update_component_father.emit(true);
        } else if (response.error !== undefined) {
          frm.reset();
          this.update_component_father.emit(false);
        }
      },
      (error) => {
        console.log('POST call in error", respons', error);
        $('#editliquidation').modal('hide');
        frm.reset();
        this.update_component_father.emit(false);
      });
  }
  refresh() {
    this.refresh_component_father.emit(false);
  }
}
