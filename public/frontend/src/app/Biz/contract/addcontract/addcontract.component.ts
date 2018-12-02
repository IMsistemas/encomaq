import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ContractService } from '../../../service/bcontract/contract.service';
import { ClienteService } from '../../../service/bclient/cliente.service';
import { ItemService } from '../../../service/bitem/item.service';
import { BperiodService } from '../../../service/bperiod/bperiod.service';
import { BpaymentformService } from '../../../service/bpaymentform/bpaymentform.service';
import { ItemcategoryService } from '../../../service/ncategoryitem/itemcategory.service';
declare var jquery: any;
declare var $: any;
@Component({
  selector: 'app-addcontract',
  templateUrl: './addcontract.component.html',
  styleUrls: ['./addcontract.component.css']
})
export class AddcontractComponent implements OnInit {
  @Output() update_component_father = new EventEmitter<boolean>();
  lis_client = [];
  lis_item = [];
  lis_category = [];
  list_itemcont = [];
  list_period = [];
  list_paymentform = [];
  @Input() nocontract_last: any;
  @Input() id_client: any; //
  @Input() item_select: any;
  constructor(private contract: ContractService, private client: ClienteService,
                private item: ItemService, private period: BperiodService,
                private paymentform: BpaymentformService, private category: ItemcategoryService) { }

  ngOnInit() {
    this.id_client = { idclient: '' };
    this.item_select = { iditem: ''};
    // this.getLastNoContract();
    this.list_clients();
    this.list_periods();
    this.list_paymentforms();
    this.list_category();
    this.list_items();
    $('.auxcliente').prop('disabled' , true);
  }
  list_category() {
    this.lis_category.push({ idcategoryitem: '', categoryitemname: '--Seleccione--' });
    this.category.get_categoryitem_active().subscribe(
      (response) => {
        for (const cat of response) {
          const o = {
            idcategoryitem: cat.idcategoryitem,
            categoryitemname: cat.categoryitemname
          };
          this.lis_category.push(o);
        }
      },
      (error) => {
        console.log('POST call in error", respons', error);
      });
  }
  list_clients() {
    this.lis_client.push({ idclient: '', businessname: '--Seleccione--' });
    this.client.get_client().subscribe(
      (response) => {
        for (const cat of response) {
          const o = {
            idclient: cat.idclient,
            businessname: cat.businessname,
            identify: cat.identify,
            phone: cat.phone,
            address: cat.address
          };
          this.lis_client.push(o);
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
  list_periods() {
    this.list_period.push({ idperiod: '', periodname: '--Seleccione--' });
    this.period.get().subscribe(
      (response) => {
        for (const cat of response) {
          const o = {
            idperiod: cat.idperiod,
            periodname: cat.periodname,
          };
          this.list_period.push(o);
        }
      },
      (error) => {
        console.log('POST call in error", respons', error);
      });
  }
  list_paymentforms() {
    this.paymentform.get().subscribe(
      (response) => {
        for (const cat of response) {
          const o = {
            idpaymentform: cat.idpaymentform,
            paymentformname: cat.paymentformname,
            valor: 0
          };
          this.list_paymentform.push(o);
        }
      },
      (error) => {
        console.log('POST call in error", respons', error);
      });
  }
  /* getLastNoContract() {
    this.contract.getLastNoContract().subscribe(
      (response) => {
        console.log(response);
        this.nocontract_last = response.nocontract;
      },
      (error) => {
        console.log('POST call in error", respons', error);
      });
  } */
  search_client() {
    $('.listclient').modal('show');
  }
  addrwo() {
    const o = {
      iditem: '',
      quantity: 0,
      observation: ''
    };
    this.list_itemcont.push(o);
  }
  removerow(data) {
    const posicion = this.list_itemcont.indexOf(data);
    this.list_itemcont.splice(posicion, 1);
  }
  search_item(fila) {
    $('.listitems').modal('show');
    fila.iditem = this.item_select.iditem;
  }
  compareDate(dateinit, dateend) {

   const inicial: Array<string> = dateinit.split('-');
   const final: Array<string> = dateend.split('-');

   const dateStart: any = new Date(parseInt(inicial[0], 0), ( parseInt(inicial[1], 0) - 1 ), parseInt(inicial[2], 0));
   const dateEnd: any = new Date(parseInt(final[0], 0), (parseInt(final[1], 0) - 1), parseInt(final[2], 0));

   return (dateStart > dateEnd) ? false : true;

  }
  add_contract(data, frm) {

    if (this.compareDate(data.startdate, data.enddate)) {
      const aux = {
        Data: data,
        paymentform: this.list_paymentform,
        list: this.list_itemcont
      };

      this.contract.add_contract(aux).subscribe(
        (response) => {
          this.id_client = { idclient: '' };
          if (response.success !== undefined) {
            $('#addcontract').modal('hide');
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
          $('#addcontract').modal('hide');
          frm.reset();
          this.update_component_father.emit(false);
        });
    } else {
      $('#mdlcompareDateAdd').modal('show');
    }

  }
  closeModalVerifyFecha() {
    $('#mdlcompareDateAdd').modal('hide');
  }
}
