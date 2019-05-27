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
  enObraObject = [];
  enObra_head_item = [];
  enObra_foot_item = [];

  sobrante = [];

  logistic = [];

  array_item = [];

  client_guiar: any;
  constructor(private referralguide: ReferralguideService, private liquidation: LiquidationService, private project: ProjectService ) { }
  @Input() id_client: any;

  ngOnInit() {
    $('.auxaddidcliente').prop('disabled' , true);
    this.id_client = { idclient: '', biz_contract: {biz_client: {biz__project: []}} };
    this.getListclient_referralguide();
  }

  addliuidation(data: any) {
    if (data.idcliente !== '') {
      this.client_guiar = data.idcliente;
      this.getList(data);
    } else {
      $('#infoerrors').modal('show');
      this.mensage = 'Seleccione un cliente para agregar una guía de remisión';
    }
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
    this.enObraObject = [];
    this.enObra_head_item = [];
    this.enObra_foot_item = [];

    // this.sobrante = [];

    this.logistic = [];

    if (this.sobrante.length > 0) {

      const objectSobrante = {
        idreferralguide: 0,
        datetimereferral: $('#dateinit').val(),
        guidenumber: 'COMP ANTERIOR',
        items: this.sobrante
      };

      this.entrega.push(objectSobrante);

      for (const h of this.sobrante) {
        const oo = {
          iditem: h.iditem,
          name: h.biz_item.itemname + '. ' + h.biz_item.description
        };
        this.entrega_head_item.push(oo);
      }
    }



    for (const e of result) {

      // console.log(e);

      const object = {
        idreferralguide: e.idreferralguide,
        datetimereferral: e.datetimereferral,
        guidenumber: e.guidenumber,
        idproject: e.idproject,
        items: []
      };

      for (const i of e.biz__referralguideitem) {

        const ii = {
          iditem: i.iditem,
          quantify: i.quantify,
          // price: i.biz_item.price
          price: i.price,
          iditemprice: i.iditemprice
        };

        object.items.push(ii);

        if (parseInt(e.nom_transferreason.idtypetransferreason, 0) === 1) {

          const pos = this.entrega_head_item.map(function(a) {
            return parseInt(a.iditem, 0);
          }).indexOf(parseInt(i.iditem, 0));

          if (pos < 0) {
            const oo = {
              idproject: e.idproject,
              iditem: i.iditem,
              name: i.biz_item.itemname + '. ' + i.biz_item.description
            };
            this.entrega_head_item.push(oo);
          }

        } else if (parseInt(e.nom_transferreason.idtypetransferreason, 0) === 2) {

          const pos = this.retiro_head_item.map(function(a) {
            return parseInt(a.iditem, 0);
          }).indexOf(parseInt(i.iditem, 0));

          if (pos < 0) {
            const oo = {
              idproject: e.idproject,
              iditem: i.iditem,
              name: i.biz_item.itemname + '. ' + i.biz_item.description
            };
            this.retiro_head_item.push(oo);
          }

        } else if (parseInt(e.nom_transferreason.idtypetransferreason, 0) === 3) {

        }

      }

      const objectLogistic = {
        date: e.datetimereferral,
        guidenumber: e.guidenumber,
        travel: 1,
        price: e.logisticservicecost,
        description: e.nom_transferreason.transferreasonname
      };

      if (parseInt(e.nom_transferreason.idtypetransferreason, 0) === 1) {
        this.entrega.push(object);
        this.logistic.push(objectLogistic);
      } else if (parseInt(e.nom_transferreason.idtypetransferreason, 0) === 2) {
        this.retiro.push(object);
        this.logistic.push(objectLogistic);
      } /*else if (parseInt(e.nom_transferreason.idtypetransferreason, 0) === 3) {

      }*/

    }

    // -----------------------PARTE DE RESUMEN DE ENTREGA--------------------------------------------------------------

    this.entrega_head_item.sort(function (a, b) {
      if (a.name > b.name) {
        return 1;
      }
      if (a.name < b.name) {
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
          quantify: 0,
          iditemprice: null
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
        quantify: 0,
        iditemprice: null
      });
    }


    for (let i = 0; i < this.entrega.length; i++) {
      for (let j = 0; j < this.entrega[i].items.length; j++) {

        if (parseInt(this.entrega[i].items[j].iditem, 0) !== 0) {
          this.entrega_foot_item[j].iditem = this.entrega[i].items[j].iditem;
          this.entrega_foot_item[j].price = this.entrega[i].items[j].price;
          this.entrega_foot_item[j].iditemprice = this.entrega[i].items[j].iditemprice;
          // tslint:disable-next-line:max-line-length
          this.entrega_foot_item[j].quantify = parseInt(this.entrega_foot_item[j].quantify, 0) + parseInt(this.entrega[i].items[j].quantify, 0);
        }

      }
    }

    // -----------------------PARTE DE RESUMEN DE RETIRO--------------------------------------------------------------

    // this.retiro_head_item = this.entrega_head_item;

    this.retiro_head_item.sort(function (a, b) {
      if (a.name > b.name) {
        return 1;
      }
      if (a.name < b.name) {
        return -1;
      }
      return 0;
    });

    /*for (const z of this.retiro) {
      z.items.sort(function (a, b) {
        if (a.iditem > b.iditem) {
          return 1;
        }
        if (a.iditem < b.iditem) {
          return -1;
        }
        return 0;
      });
    }*/

    for (let j = 0; j < this.retiro.length; j++) {

      const a_t = [];
      for (const ii of this.retiro_head_item) {
        a_t.push({
          iditem: 0,
          price: 0.00,
          quantify: 0,
          iditemprice: null
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
        quantify: 0,
        iditemprice: null
      });
    }

    for (let i = 0; i < this.retiro.length; i++) {
      for (let j = 0; j < this.retiro[i].items.length; j++) {
        this.retiro_foot_item[j].iditem = this.retiro[i].items[j].iditem;
        this.retiro_foot_item[j].price = this.retiro[i].items[j].price;
        this.retiro_foot_item[j].iditemprice = this.retiro[i].items[j].iditemprice;
        this.retiro_foot_item[j].quantify = parseInt(this.retiro_foot_item[j].quantify, 0) + parseInt(this.retiro[i].items[j].quantify, 0);
      }
    }

    // -----------------------PARTE DE RESUMEN DE EN OBRA--------------------------------------------------------------

    this.enObra_head_item = this.entrega_head_item;

    for (let i = 0; i < this.entrega_foot_item.length; i++) {

      let flag = false;

      for (let j = 0; j < this.retiro_foot_item.length; j++) {

          if ( parseInt(this.retiro_foot_item[j].iditem, 0) === parseInt(this.entrega_foot_item[i].iditem, 0) ) {

            flag = true;

            const rest = this.entrega_foot_item[i].quantify - this.retiro_foot_item[j].quantify;

            if (rest > 0) {

              this.enObra.push(rest);

              const o = {
                iditem: this.entrega_foot_item[i].iditem,
                idproject: this.enObra_head_item[i].idproject,
                quantify: rest,
                price: this.entrega_foot_item[i].price,
                iditemprice: this.entrega_foot_item[i].iditemprice
              };

              this.enObraObject.push(o);

            }

          }

      }

      if (flag === false) {

        this.enObra.push(this.entrega_foot_item[i].quantify);

        const o = {
          iditem: this.entrega_foot_item[i].iditem,
          idproject: this.enObra_head_item[i].idproject,
          quantify: this.entrega_foot_item[i].quantify,
          price: this.entrega_foot_item[i].price,
          iditemprice: this.entrega_foot_item[i].iditemprice
        };

        this.enObraObject.push(o);

      }


    }

    
    


    console.log(this.enObra);
    console.log(this.enObraObject);

    this.orderProduct(frm);



  }

  // -----------------------------------------------------------------------------------------------------------------

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
          } else {

            const iditemSearch = c.iditem;
            let flag = false;

            for (const aa of this.entrega_head_item) {
              if (parseInt(aa.iditem, 0) === parseInt(iditemSearch, 0)) {
                flag = true;
              }
            }

            if (flag === false) {

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
      }

      this.array_item.push(o);
    }


    console.log(this.retiro);

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

  }

  // ----------------------------------------------------------------------------------------------------------

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

    if ($('#dateinit').val() !== '') {

      this.liquidation.searchSobrante(o).subscribe(
        (responseSobrante) => {

          // console.log(responseSobrante);

          this.sobrante = responseSobrante;

          this.referralguide.get(this.page, o).subscribe(
            (response) => {

              this.orderReferralGuide(response.data, data);
              this.list_guias = response.data;

              // this.calcula();

              /* this.listReferralGuide = response.data;
              this.from = response.from;
              this.total = response.total;
              this.loading = false; */
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

  // -----------------------------------------------------------------------------------------------

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
      enObraObject: this.enObraObject,
      list: this.list_guias,
      Subtotal: this.subtotal,
      Iva: this.iva,
      Total: this.totalprecio
    };

    console.log(o);

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
