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
  constructor(private referralguide: ReferralguideService, private liquidation: LiquidationService, private project: ProjectService ) { }
  @Input() id_client: any; //
  ngOnInit() {
    $('.auxaddidcliente').prop('disabled' , true);
    this.id_client = { idclient: '', biz_contract: {biz_client: {biz__project: []}} };
    this.getListclient_referralguide();
  }

  addliuidation(data: any) {
    if (data.idcliente !== '') {
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
        // console.log(response);
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
              price: (parseFloat(c.price) * days).toFixed(2),
              quantify: parseInt(c.quantify, 0),
              total: ( (parseFloat(c.price) * days) * parseInt(c.quantify, 0) ).toFixed(2)
            };

            o.totalquantify += oo.quantify;
            o.totalprice += ( (parseFloat(c.price) * days) * parseInt(c.quantify, 0) );
            o.listguide.push(oo);
          }
        }
      }

      // this.array_item.push(o);

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
              price: (parseFloat(c.price) * days).toFixed(2),
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

  }

  calculateDay(startdate: string, enddate: string): number {

    if (enddate !== '') {

      const fechaInicial: string = startdate;
      const fechaFinal: string = enddate;
      const inicial: Array<string> = fechaInicial.split('-');
      const final: Array<string> = fechaFinal.split('-');

      const dateStart: any = new Date(parseInt(inicial[2], 0), ( parseInt(inicial[1], 0) - 1 ), parseInt(inicial[0], 0));

      const dateEnd: any = new Date(parseInt(final[0], 0), (parseInt(final[1], 0) - 1), parseInt(final[2], 0));

      return Math.floor( ( ( dateEnd - dateStart ) / 86400000 ) / 1000 );
      // const rest: any = dateEnd - dateStart;
      // return Math.floor( rest / (1000 * 60 * 60 * 24));

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
    // console.log(o);
    this.referralguide.get(this.page, o).subscribe(
      (response) => {

        this.orderReferralGuide(response.data, data);

        // this.list_guias = response.data;

        // this.calcula();

        /* this.listReferralGuide = response.data;
        this.from = response.from;
        this.total = response.total;
        this.loading = false; */
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
    $('#addrwo').modal('hide');
  }
  close_info() {
    $('#infoerrors').modal('hide');
  }
  select_guia(data: any) {
    this.close_listguias();
    if (this.list_guias.length === 0) {
      // console.log(data);
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
    // console.log(this.list_guias);
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
    if (this.subtotal !== 0) {
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
