import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { NgForm } from '@angular/forms';
import { ReferralguideService } from '../../../service/referralguide/referralguide.service';
import { LiquidationService } from '../../../service/bliquidation/liquidation.service';
import { ProjectService } from '../../../service/bproject/project.service';
declare var jquery: any;
declare var $: any;
@Component({
  selector: 'app-editliquidation',
  templateUrl: './editliquidation.component.html',
  styleUrls: ['./editliquidation.component.css']
})
export class EditliquidationComponent implements OnInit, OnChanges {
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
  list_client = [];
  list_project = [];
  temp_project = [];

  list_guias = [];

  entrega = [];
  entrega_head_item = [];
  entrega_foot_item = [];
  retiro = [];
  retiro_head_item = [];
  retiro_foot_item = [];
  enObra = [];
  enObra_head_item = [];
  enObra_foot_item = [];
  array_item = [];

  client_guiar: any;
  guiarm: any;
  constructor(private referralguide: ReferralguideService, private liquidation: LiquidationService, private project: ProjectService) { }
  @Input() id_client = { idclient: null, biz_contract: {biz_client: {biz__project: []}} };

  ngOnInit() {
    $('.auxeditidcliente').prop('disabled' , true);
    this.id_client = { idclient: null, biz_contract: {biz_client: {biz__project: []}} };
    this.getListclient_referralguide();
    this.tem_edit = {biz_liquidationproject: [{biz_project: {idclient: ''} }] };

  }
  ngOnChanges () {
    $('.auxeditidcliente').prop('disabled' , true);

    if (this.tem_edit) {
      this.projects_client(this.tem_edit.biz_liquidationproject[0].biz_project.idclient);
    }

    if (this.id_client !== undefined) {

      if (this.id_client.idclient !== null) {
        this.tem_edit.biz_liquidationproject[0].biz_project.idclient = this.id_client.idclient;
        this.projects_client(this.id_client.idclient);
        this.tem_edit.biz_referralguideliquidation = [];
        // this.calcula();
      }

    }
  }
  addliuidation(data: any) {
    if (data.idcliente !== '') {
      this.client_guiar = data.idcliente;
      // this.getList(data);
      $('#addliquidationedit').modal('show');
    } else {
      $('#temperrorsliquidation').modal('show');
      this.mensage = 'Seleccione un cliente para agregar una guía de remisión';
    }
    // console.log(data);
  }
  projects_client(id: any) {
    this.temp_project = [];
    for (const i of this.tem_edit.biz_liquidationproject) {
      this.temp_project.push('' + i.idproject + '');
    }
    // console.log(this.temp_project);
    this.project.client_project(id).subscribe(
      (response) => {
        this.list_project = response;
      },
      (error) => {
        console.log('POST call in error", respons', error);
      });
  }
  getListclient_referralguide() {
    this.list_client = [];
    this.list_client.push({ idclient: '', businessname: '--Seleccione--' });
    this.referralguide.listclient_referralguide().subscribe(
      (response) => {
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

  // -------------------------------------------------NEW--------------------------------------------

  orderReferralGuide(result, frm) {
    this.entrega = [];
    this.entrega_head_item = [];
    this.entrega_foot_item = [];

    this.retiro = [];
    this.retiro_head_item = [];
    this.retiro_foot_item = [];

    this.enObra = [];
    this.enObra_head_item = [];
    this.enObra_foot_item = [];

    for (const e of result) {

      const object = {
        idreferralguide: e.idreferralguide,
        datetimereferral: e.datetimereferral,
        items: []
      };

      for (const i of e.biz__referralguideitem) {
        const ii = {
          iditem: i.iditem,
          quantify: i.quantify,
          price: i.biz_item.price
        };
        object.items.push(ii);

        if (parseInt(e.nom_transferreason.idtypetransferreason, 0) === 1) {

          const pos = this.entrega_head_item.map(function(a) {
            return parseInt(a.iditem, 0);
          }).indexOf(parseInt(i.iditem, 0));

          if (pos < 0) {
            const oo = {
              iditem: i.iditem,
              name: i.biz_item.itemname
            };
            this.entrega_head_item.push(oo);
          }

        } else if (parseInt(e.nom_transferreason.idtypetransferreason, 0) === 2) {

          const pos = this.retiro_head_item.map(function(a) {
            return parseInt(a.iditem, 0);
          }).indexOf(parseInt(i.iditem, 0));

          if (pos < 0) {
            const oo = {
              iditem: i.iditem,
              name: i.biz_item.itemname
            };
            this.retiro_head_item.push(oo);
          }

        } else if (parseInt(e.nom_transferreason.idtypetransferreason, 0) === 3) {

        }

      }

      if (parseInt(e.nom_transferreason.idtypetransferreason, 0) === 1) {
        this.entrega.push(object);
      } else if (parseInt(e.nom_transferreason.idtypetransferreason, 0) === 2) {
        this.retiro.push(object);
      } else if (parseInt(e.nom_transferreason.idtypetransferreason, 0) === 3) {

      }
    }

    // -----------------------PARTE DE RESUMEN DE ENTREGA--------------------------------------------------------------

    this.entrega_head_item.sort(function (a, b) {
      if (a.iditem > b.iditem) {
        return 1;
      }
      if (a.iditem < b.iditem) {
        return -1;
      }
      return 0;
    });

    for (const z of this.entrega) {
      z.items.sort(function (a, b) {
        if (a.iditem > b.iditem) {
          return 1;
        }
        if (a.iditem < b.iditem) {
          return -1;
        }
        return 0;
      });
    }

    for (let j = 0; j < this.entrega.length; j++) {

      const a_t = [];
      for (const ii of this.entrega_head_item) {
        a_t.push({
          iditem: 0,
          price: 0.00,
          quantify: 0
        });
      }

      for (let k = 0; k < this.entrega[j].items.length; k++) {

        for (let i = 0; i < this.entrega_head_item.length; i++) {

          if (parseInt(this.entrega_head_item[i].iditem, 0) === parseInt(this.entrega[j].items[k].iditem, 0)) {

            if (a_t[i].iditem !== 0) {
              a_t[i].quantify += this.entrega[j].items[k].quantify;
            } else {
              a_t[i] = this.entrega[j].items[k];
            }

          }

        }

      }

      this.entrega[j].items = a_t;
    }

    for (const ii of this.entrega_head_item) {
      this.entrega_foot_item.push({
        iditem: 0,
        price: 0.00,
        quantify: 0
      });
    }

    for (let i = 0; i < this.entrega.length; i++) {
      for (let j = 0; j < this.entrega[i].items.length; j++) {
        this.entrega_foot_item[j].iditem = this.entrega[i].items[j].iditem;
        this.entrega_foot_item[j].price = this.entrega[i].items[j].price;
        this.entrega_foot_item[j].quantify += this.entrega[i].items[j].quantify;
      }
    }

    // -----------------------PARTE DE RESUMEN DE RETIRO--------------------------------------------------------------

    this.retiro_head_item = this.entrega_head_item;

    for (const z of this.retiro) {
      z.items.sort(function (a, b) {
        if (a.iditem > b.iditem) {
          return 1;
        }
        if (a.iditem < b.iditem) {
          return -1;
        }
        return 0;
      });
    }

    for (let j = 0; j < this.retiro.length; j++) {

      const a_t = [];
      for (const ii of this.retiro_head_item) {
        a_t.push({
          iditem: 0,
          price: 0.00,
          quantify: 0
        });
      }

      for (let k = 0; k < this.retiro[j].items.length; k++) {

        for (let i = 0; i < this.retiro_head_item.length; i++) {

          if (parseInt(this.retiro_head_item[i].iditem, 0) === parseInt(this.retiro[j].items[k].iditem, 0)) {

            if (a_t[i].iditem !== 0) {
              a_t[i].quantify += this.retiro[j].items[k].quantify;
            } else {
              a_t[i] = this.retiro[j].items[k];
            }

          }

        }

      }

      this.retiro[j].items = a_t;
    }

    for (const ii of this.retiro_head_item) {
      this.retiro_foot_item.push({
        iditem: 0,
        price: 0.00,
        quantify: 0
      });
    }

    for (let i = 0; i < this.retiro.length; i++) {
      for (let j = 0; j < this.retiro[i].items.length; j++) {
        this.retiro_foot_item[j].iditem = this.retiro[i].items[j].iditem;
        this.retiro_foot_item[j].price = this.retiro[i].items[j].price;
        this.retiro_foot_item[j].quantify += this.retiro[i].items[j].quantify;
      }
    }

    // -----------------------PARTE DE RESUMEN DE EN OBRA--------------------------------------------------------------

    this.enObra_head_item = this.entrega_head_item;

    for (let i = 0; i < this.enObra_head_item.length; i++) {
      this.enObra.push(this.entrega_foot_item[i].quantify - this.retiro_foot_item[i].quantify);
    }

    this.orderProduct(frm);

  }

  orderProduct(frm: any) {

    this.array_item = [];

    for (const a of this.entrega_head_item) {

      const o = {
        iditem: a.iditem,
        name: a.name,
        totalquantify: 0,
        totalprice: 0,
        listguide: []
      };

      // -------------------------------------------------ENTREGA--------------------------------------------

      for (const b of this.entrega) {
        for (const c of b.items) {
          if (parseInt(a.iditem, 0) === parseInt(c.iditem, 0)) {

            const dateend: string = frm.dateend;
            const days: number = this.calculateDay(b.datetimereferral, dateend);

            const oo = {
              idreferralguide: b.idreferralguide,
              datetimereferral: b.datetimereferral,
              dateend: dateend,
              days: days,
              price: (parseFloat(c.price) * days).toFixed(3),
              quantify: parseInt(c.quantify, 0),
              total: ( (parseFloat(c.price) * days) * parseInt(c.quantify, 0) ).toFixed(2)
            };

            o.totalquantify += oo.quantify;
            o.totalprice += ( (parseFloat(c.price) * days) * parseInt(c.quantify, 0) );
            o.listguide.push(oo);
          }
        }
      }

      // -------------------------------------------------RETIRO--------------------------------------------

      for (const b of this.retiro) {
        for (const c of b.items) {
          if (parseInt(a.iditem, 0) === parseInt(c.iditem, 0)) {

            const dateend: string = frm.dateend;
            const days: number = this.calculateDay(b.datetimereferral, dateend);

            const oo = {
              idreferralguide: b.idreferralguide,
              datetimereferral: b.datetimereferral,
              dateend: dateend,
              days: days,
              price: (parseFloat(c.price) * days).toFixed(3),
              quantify: -parseInt(c.quantify, 0),
              total: -( (parseFloat(c.price) * days) * parseInt(c.quantify, 0) ).toFixed(2)
            };

            o.totalquantify += oo.quantify;
            o.totalprice -= ( (parseFloat(c.price) * days) * parseInt(c.quantify, 0) );
            o.listguide.push(oo);
          }
        }
      }

      this.array_item.push(o);
    }

    this.subtotal = 0;
    this.iva = 0;
    for (const x of this.array_item) {
      this.subtotal += x.totalprice;
    }

    this.iva = ( this.subtotal * 12 ) / 100;

    this.totalprecio = ( this.subtotal + this.iva ).toFixed(2);
    this.subtotal = this.subtotal.toFixed(2);
    this.iva = this.iva.toFixed(2);
  }

  calculateDay(startdate: string, enddate: string): number {

    if (enddate !== '') {

      const fechaInicial: string = startdate;
      const fechaFinal: string = enddate;
      const inicial: Array<string> = fechaInicial.split('-');
      const final: Array<string> = fechaFinal.split('-');

      const dateStart: any = new Date(parseInt(inicial[0], 0), ( parseInt(inicial[1], 0) - 1 ), parseInt(inicial[2], 0));

      const dateEnd: any = new Date(parseInt(final[0], 0), (parseInt(final[1], 0) - 1), parseInt(final[2], 0));

      return Math.floor( ( ( dateEnd - dateStart ) / 86400 ) / 1000 );

    } else {

      return 0;

    }

  }

  formatMoney(currency, value, decimals) {

    let n = value;
    n = n.toString();
    if (n === '' || n === '.') {
        n = '0.00';
    }

    const patron = [currency, ' ', ','];
    const longitud = patron.length;
    for (let i = 0; i < longitud; i++) {
        n = n.replace(patron[i], '');
    }
    n = n.replace(patron, '');

    n = parseFloat(n);

    let dec = 2;

    if (decimals !== undefined) {
        dec = decimals;
    }

    const multiplicator = Math.pow(10, dec);
    const valor = currency + ' ' + (Math.round(n * multiplicator) / multiplicator).toFixed(dec);

    return valor;
  }

  // ------------------------------------------------------------------------------------------------

  getList(data: any) {

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

    this.referralguide.get(this.page, o).subscribe(
      (response) => {
        this.orderReferralGuide(response.data, data);
        this.list_guias = response.data;
        this.listReferralGuide = response.data;
        /*this.from = response.from;
        this.total = response.total;
        this.loading = false;*/
      },
      (error) => {
        console.log(error);
      });

  }
  goToPage(n: number): void {
    /*this.page = n;
    this.getList();*/
  }

  onNext(): void {
    /*this.page++;
    this.getList();*/
  }

  onPrev(): void {
    /*this.page--;
    this.getList();*/
  }
  close_listguias() {
    $('#addliquidationedit').modal('hide');
  }
  close_info() {
    $('#temperrorsliquidation').modal('hide');
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
        $('#temperrorsliquidation').modal('show');
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
    // this.calcula();
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
    if (this.subtotal !== 0) {
      this.iva = ((this.subtotal * this.porcentaje) / 100).toFixed(2);
    }
    this.totalprecio = (this.subtotal + this.iva).toFixed(2);
  }
  removerow(data) {
    const posicion = this.tem_edit.biz_referralguideliquidation.indexOf(data);
    this.tem_edit.biz_referralguideliquidation.splice(posicion, 1);
    // this.calcula();
  }
  edit_liquidation(data: any, frm: any, datos: any) {

    data.subtotal = this.subtotal;
    data.iva = this.iva;
    data.total = this.totalprecio;
    /* console.log(data);
    console.log(datos); */
    data.biz_liquidationproject[0].biz_project.idclient = datos.idcliente;

    const o = {
      Data: data,
      list: datos,
      listGuide: this.list_guias
    };

    this.liquidation.edit_liquidation(data.idliquidation, o).subscribe(
      (response) => {
        if (response.success !== undefined) {
          this.id_client = { idclient: null, biz_contract: {biz_client: {biz__project: []}} };
          $('#editliquidation').modal('hide');
          frm.reset();
          this.update_component_father.emit(true);
        } else if (response.error !== undefined) {
          frm.reset();
          this.update_component_father.emit(false);
        }
        this.getListclient_referralguide();
        this.tem_edit.biz_liquidationproject[0].biz_project.idclient = String(datos.idcliente);

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
  excel() {
    // $('#tablefinal').html($('#exlliquidation').html() + $('.tbldinamic').html() + $('#fulltotales').html());
    $('#tablefinal').html($('.excel_liq').html());
    $('#tablefinal').table2excel({
      exclude: '.noExl',
      filename: 'Liquidacion',
      fileext: '.xls'
    });
  }
  pdf() {
    const accion = this.liquidation.liquidationexportarpdf(this.tem_edit.idliquidation);
    console.log(accion);
    $('#printtitle').html('Liquidación');
    $('#print').modal('show');
    $('#printbody').html("<object width='100%' height='600' data='" + accion + "'></object>");
  }
  pdfid(id: any) {
    console.log(id);
    const accion = this.referralguide.referraexportarpdf(id.idreferralguide);
    console.log(accion);
    $('#printtitle').html('Guía De Remisión');
    $('#print').modal('show');
    $('#printbody').html("<object width='100%' height='600' data='" + accion + "'></object>");

  }
  excelid(id: any) {
    console.log(id);
    this.guiarm = id;
    $('#guiaremisionliquidacion').table2excel({
      exclude: '.noExl',
      filename: 'Guía de remisión'
    });
  }

  search_client() {
    $('.listclient').modal('show');
  }
}
