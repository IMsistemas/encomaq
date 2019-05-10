import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs/Observable';
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
  selector: 'app-editcontract',
  templateUrl: './editcontract.component.html',
  styleUrls: ['./editcontract.component.css']
})
export class EditcontractComponent implements OnInit {
  lis_client = [];
  lis_item = [];
  lis_category = [];
  list_period = [];
  list_paymentform = [];
  counter = 0;
  @Input() tem_edit: any;
  @Output() update_component_father = new EventEmitter<boolean>();
  @Output() refresh_component_father = new EventEmitter<boolean>();
  @Input() id_client: any; //
  @Input() item_select: any;
  constructor(private contract: ContractService, private client: ClienteService,
                private item: ItemService, private period: BperiodService,
                private paymentform: BpaymentformService, private category: ItemcategoryService) { }

  ngOnInit() {
    this.id_client = { idclient: '' };
    this.item_select = { iditem: '' };
    this.list_clients();
    this.list_periods();
    this.list_category();
    // this.list_paymentforms();
    // this.counter = 0;
    this.list_items();
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
            itemname: cat.itemname + ' - ' + cat.description
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

    if (this.tem_edit.idcontract !== null && this.tem_edit.idcontract !== undefined && this.counter === 0) {
      this.counter = 1;
      this.contract.getPFByContract(this.tem_edit.idcontract).subscribe(
        (response) => {

          console.log(response);

          this.list_paymentform = [];

          for (const cat of response) {
            const o = {
              idpaymentform: cat.idpaymentform,
              paymentformname: cat.paymentformname,
              valor: 0
            };

            if (cat.biz_contract_paymentform.length > 0) {
              o.valor = cat.biz_contract_paymentform[0].cost;
            }

            this.list_paymentform.push(o);
            console.log(this.list_paymentform);
          }

          // return true;
        },
        (error) => {
          console.log('POST call in error", respons', error);
        });
    }

    return true;

  }
  search_client() {
    $('.listclient').modal('show');
  }
  addrwo() {
    const o = {
      iditem: '',
      quantity: 0,
      observation: ''
    };
    this.tem_edit.biz_contractitem.push(o);
  }
  removerow(data) {
    const posicion = this.tem_edit.biz_contractitem.indexOf(data);
    this.tem_edit.biz_contractitem.splice(posicion, 1);
  }
  compareDate(dateinit, dateend) {

    const inicial: Array<string> = dateinit.split('-');
    const final: Array<string> = dateend.split('-');

    const dateStart: any = new Date(parseInt(inicial[0], 0), ( parseInt(inicial[1], 0) - 1 ), parseInt(inicial[2], 0));
    const dateEnd: any = new Date(parseInt(final[0], 0), (parseInt(final[1], 0) - 1), parseInt(final[2], 0));

    return (dateStart > dateEnd) ? false : true;

   }
  edit_contract(data, frm) {

    if (this.compareDate(data.startdate, data.enddate)) {
      data.idclient = this.id_client.idclient;
      const aux = {
        Data: data,
        paymentform: this.list_paymentform
      };
      this.contract.edit_contract(data.idcontract , aux).subscribe(
        (response) => {
          if (response.success !== undefined) {
            $('#editcontract').modal('hide');
            this.id_client = data.biz_client;
            frm.reset();
            this.update_component_father.emit(true);
          } else if (response.error !== undefined) {
            $('#editcontract').modal('hide');
            frm.reset();
            this.update_component_father.emit(false);
          }
        },
        (error) => {
          console.log('POST call in error", respons', error);
          $('#editcontract').modal('hide');
          frm.reset();
          this.update_component_father.emit(false);
        });
    } else {
      $('#mdlcompareDateEdit').modal('show');
    }

  }
  refresh() {
    this.refresh_component_father.emit(false);
  }
  excel() {
    $('#exlcontrato').table2excel({
      exclude: '.noExl',
      filename: 'Contrato'
    });
  }
  pdf() {
    const accion = this.contract.contractexportarpdf(this.tem_edit.idcontract);
    console.log(accion);
    $('#printtitle').html('Contrato');
    $('#print').modal('show');
    $('#printbody').html("<object width='100%' height='600' data='" + accion + "'></object>");
  }
  closeModalVerifyFecha() {
    $('#mdlcompareDateEdit').modal('hide');
  }

}
