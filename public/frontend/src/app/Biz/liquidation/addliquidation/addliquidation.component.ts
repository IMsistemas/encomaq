import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ReferralguideService } from '../../../service/referralguide/referralguide.service';
import { LiquidationService } from '../../../service/bliquidation/liquidation.service';
import { ProjectService } from '../../../service/bproject/project.service';
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
  list_client = [];
  list_project = [];
  client_guiar: any;
  constructor(private referralguide: ReferralguideService, private liquidation: LiquidationService, private project: ProjectService ) { }
  @Input() id_client: any; //
  ngOnInit() {
    $('.auxaddidcliente').prop('disabled' , true);
    this.id_client = { idclient: '', biz_contract: {biz_client: {biz__project: []}} };
    this.getListclient_referralguide();
  }

  addliuidation(data: any) {
    if (data.idcliente != '') {
      this.client_guiar = data.idcliente;
      this.getList(data);
      // $('#addrwo').modal('show');
    } else {
      $('#infoerrors').modal('show');
      this.mensage = 'Seleccione un cliente para agregar una guía de remisión';
    }
    // console.log(data);
  }

  getListclient_referralguide() {
    this.list_client.push({ idclient: '', businessname: '--Seleccione--' });
    this.referralguide.listclient_referralguide().subscribe(
      (response) => {
        console.log(response);
        for (const cat of response) {
          const o = {
            idclient: cat.idclient,
            businessname: cat.businessname,
            identify: cat.identify,
            phone: cat.phone,
            address: cat.address
          };
          this.list_client.push(o);
        }
      },
      (error) => {
        console.log('POST call in error", respons', error);
      });
  }

  projects_client(id: any) {
    this.project.client_project(id).subscribe(
      (response) => {
        this.list_project = response;
      },
      (error) => {
        console.log('POST call in error", respons', error);
    });
  }

  getList(data) {

    const o = {
      search: this.descripcion,
      state: this.state,
      column: this.column,
      order: this.order,
      num_page: this.num_page,
      client: this.client_guiar,
      dateinit: $('#dateinit').val(),
      dateend: $('#dateend').val(),
      idprojects: data.projects
    };
    console.log(o);
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
    if (this.list_guias.length === 0) {
      console.log(data);
      this.list_guias.push(data);
    } else {
      const resultado = this.list_guias.find(guia => guia.idreferralguide === data.idreferralguide );
      if (resultado !== undefined) {
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
          this.list_project = [],
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

  search_client() {
    $('.listclient').modal('show');
  }
}
