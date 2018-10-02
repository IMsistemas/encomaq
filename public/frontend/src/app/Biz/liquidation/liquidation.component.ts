import { Component, OnChanges, SimpleChanges, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { LiquidationService } from '../../service/bliquidation/liquidation.service';
import { ReferralguideService } from '../../service/referralguide/referralguide.service';
declare var jquery: any;
declare var $: any;
@Component({
  selector: 'app-liquidation',
  templateUrl: './liquidation.component.html',
  styleUrls: ['./liquidation.component.css']
})
export class LiquidationComponent implements OnInit {
  message_info: any;
  list_liquidation = [];
  info_tem_edit: any;
  tem_cancel_activate: any;
  msm_cancel_activate: any;
  /*variables para paginar*/
  descripcion: any = '';
  state = '1';
  column = 'number';
  order = 'ASC';
  num_page = 5;
  loading = false;
  total = 0;
  page = 1;
  limit = 0;
  from = 0;
  /*variables para paginar*/
  idcliente_select: any;
  select_data: any = '';

  /*new*/
  subtotal: any;
  iva: any;
  totalprecio: any;
  listReferralGuide = [];
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

  sobrante = [];

  logistic = [];

  array_item = [];

  constructor(private liquidation: LiquidationService, private referralguide: ReferralguideService) { }

  ngOnInit() {
    $('.auxeditidcliente').prop('disabled' , true);
    $('.auxaddidcliente').prop('disabled' , true);
    this.get_list_liquidation();
  }
  new_liquidation() {
    $('#addliquidation').modal('show');
  }
  get_list_liquidation() {
    const o = {
      Buscar: this.descripcion,
      state: this.state,
      column: this.column,
      order: this.order,
      num_page: this.num_page
    };
    this.liquidation.filtro_liquidation(this.page, o).subscribe(
      (response) => {
        this.list_liquidation = response.data;
        this.from = response.from;
        this.total = response.total;
        this.loading = false;
        // console.log(this.list_liquidation);
      },
      (error) => {
        console.log(error);
      });
  }
  goToPage(n: number): void {
    this.page = n;
    this.get_list_liquidation();
  }
  onNext(): void {
    this.page++;
    this.get_list_liquidation();
  }
  onPrev(): void {
    this.page--;
    this.get_list_liquidation();
  }
  update_list(evento, type) {
    if (evento === true) {
      if (type === 'create') {
        this.message_info = 'Se ha guardado correctamente los datos!';
        $('#mdlMessageSuccess').modal('show');
      } else if (type === 'edit') {
        this.message_info = 'Se ha editado correctamente los datos!';
        $('#mdlMessageSuccess').modal('show');
      }
    } else {
      if (type === 'create') {
        this.message_info = 'Ha ocurrido un error al intentar agregar una liquidacion o la misma ya existe en el sistema!';
        $('#mdlMessageError').modal('show');
      } else if (type === 'edit') {
        this.message_info = 'Ha ocurrido un error al intentar editar una liquidacion o la misma ya existe en el sistema!';
        $('#mdlMessageError').modal('show');
      }
    }
    this.get_list_liquidation();
  }
  edit_liquidation(data: any) {
    this.info_tem_edit = data;
    $('#v-pills-tab a[href="#v-pills-home3"]').tab('show');
    $('#editliquidation').modal('show');
  }
  load(data: any) {
    this.select_data = data;
    console.log(data);
    this.getList(data);
    // $('#mdlinfo').modal('show');
  }
  refresfather(data: any) {
    this.get_list_liquidation();
  }
  cancel_activate(data: any) {
    this.tem_cancel_activate = data;
    $('#mdl_cancelactivate').modal('show');
  }
  ok_cancelactivate() {
    this.liquidation.state_liquidation(this.tem_cancel_activate.idliquidation).subscribe(
      (response) => {
        if (response.success !== undefined) {
          $('#mdl_cancelactivate').modal('hide');
          this.message_info = 'Se ha guardado correctamente los datos!';
          $('#mdlMessageSuccess').modal('show');
          this.get_list_liquidation();
        } else if (response.error !== undefined) {
          $('#mdl_cancelactivate').modal('hide');
          this.message_info = 'Error al anular los datos!';
          $('#mdlMessageError').modal('show');
        }
      },
      (error) => {
        console.log('POST call in error", respons', error);
        this.message_info = 'Error al anular los datos!';
        $('#mdlMessageError').modal('show');
        $('#mdl_cancelactivate').modal('hide');
      });
  }
  delete(data: any) {
    this.tem_cancel_activate = data;
    $('#mdl_delete').modal('show');
  }
  ok_delete() {
    this.liquidation.delete_liquidation(this.tem_cancel_activate.idliquidation).subscribe(
      (response) => {
        if (response.success !== undefined) {
          $('#mdl_delete').modal('hide');
          this.message_info = 'Se elimino correctamente los datos!';
          $('#mdlMessageSuccess').modal('show');
          this.get_list_liquidation();
        } else if (response.error !== undefined) {
          $('#mdl_delete').modal('hide');
          this.message_info = 'Error al eliminar los datos!';
          $('#mdlMessageError').modal('show');
        }
      },
      (error) => {
        console.log('POST call in error", respons', error);
        this.message_info = 'Error al eliminar los datos!';
        $('#mdlMessageError').modal('show');
        $('#mdl_delete').modal('hide');
      });
  }
  excel() {
    $('#list_liquidation').table2excel({
      exclude: '.noExl',
      filename: 'Lista de liquidaciones'
    });
  }
  excelByLiquidation() {
    $('#only_liquidation').table2excel({
      exclude: '.noExl',
      filename: 'liquidacion'
    });
  }
  pdf() {
    const o = {
      Buscar: this.descripcion,
      state: this.state,
      column: this.column,
      order: this.order
    };
    const accion = this.liquidation.filtro_liquidationexportarpdf(o);
    $('#printtitle').html('Lista de Liquidaciones');
    $('#print').modal('show');
    $('#printbody').html("<object width='100%' height='600' data='" + accion + "'></object>");
  }
  exportPDF() {

    const oo = {
      id: this.select_data.idliquidation,
      body: $('#only_liquidation').html()
    };

    this.liquidation.exportPDF(oo).subscribe(
      (response) => {

        const o = {
          name: response.filename
        };
        const pdf = this.liquidation.createPDF(o);
        $('#printtitle').html('Lista de Liquidaciones');
        $('#print').modal('show');
        $('#printbody').html("<object width='100%' height='600' data='" + pdf + "'></object>");

      },
      (error) => {
        console.log('POST call in error", respons', error);
      });
  }

  idclient_select(n): void {
    this.idcliente_select = n;
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

  this.logistic = [];

  if (this.sobrante.length > 0) {

    const objectSobrante = {
      idreferralguide: 0,
      datetimereferral: this.select_data.dateinit,
      guidenumber: 'COMP ANTERIOR',
      items: this.sobrante
    };

    this.entrega.push(objectSobrante);

    for (const h of this.sobrante) {
      const oo = {
        iditem: h.iditem,
        name: h.biz_item.itemname
      };
      this.entrega_head_item.push(oo);
    }
  }

  for (const e of result) {

    const object = {
      idreferralguide: e.idreferralguide,
      datetimereferral: e.datetimereferral,
      guidenumber: e.guidenumber,
      items: []
    };

    for (const i of e.biz__referralguideitem) {
      const ii = {
        iditem: i.iditem,
        quantify: i.quantify,
        // price: i.biz_item.price
        price: i.price
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

    const objectLogistic = {
      date: e.datetimereferral,
      guidenumber: e.guidenumber,
      travel: 1,
      price: e.logisticservicecost,
      description: e.nom_transferreason.transferreasonname
    };

    this.logistic.push(objectLogistic);
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
      // tslint:disable-next-line:max-line-length
      this.entrega_foot_item[j].quantify = parseInt(this.entrega_foot_item[j].quantify, 0) + parseInt(this.entrega[i].items[j].quantify, 0);
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
      // tslint:disable-next-line:max-line-length
      this.retiro_foot_item[j].quantify = parseInt(this.retiro_foot_item[j].quantify, 0) + parseInt(this.retiro[i].items[j].quantify, 0);
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

  // -------------------------------------------------LOGISTICA--------------------------------------------

  let total_logistic = 0;

  for (const b of this.logistic) {
    if (b.price !== null && b.price !== '') {
      total_logistic += parseFloat(b.price);
    }
  }

  this.array_item.push({
    name: 'LOGISTICA',
    totalprice: total_logistic,
    listguide: this.logistic
  });

  this.subtotal = 0;
  this.iva = 0;
  for (const x of this.array_item) {
    this.subtotal += x.totalprice;
  }

  this.iva = ( this.subtotal * 12 ) / 100;

  this.totalprecio = ( this.subtotal + this.iva ).toFixed(2);
  this.subtotal = this.subtotal.toFixed(2);
  this.iva = this.iva.toFixed(2);

  $('#mdlinfo').modal('show');
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

  if (value !== undefined && value !== '') {
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

}

// ------------------------------------------------------------------------------------------------

getList(data: any) {
  const o = {
    search: '',
    state: 1,
    column: 'idreferralguide',
    order: 'asc',
    num_page: 1000,
    client: data.biz_liquidationproject[0].biz_project.idclient,
    dateinit: data.dateinit,
    dateend: data.dateend,
    idprojects: [data.biz_liquidationproject[0].biz_project.idproject],
    idliquidation: this.select_data.idliquidation
  };

  this.liquidation.searchSobrante(o).subscribe(
    (responseSobrante) => {

      // console.log(responseSobrante);

      this.sobrante = responseSobrante;

      this.referralguide.get(this.page, o).subscribe(
        (response) => {

          this.orderReferralGuide(response, data);
          this.list_guias = response;
          this.listReferralGuide = response;
        },
        (error) => {
          console.log(error);
        });

    },
    (error) => {
      console.log(error);
    });

}

}
